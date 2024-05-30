<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * finact/procurement/recv/apis/xtion-post.php
 *
 */
$API = new class extends recvBase {

	public function execute($id, $param) {
		$tablename = 'trn_recv';
		$primarykey = 'recv_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata,
				'coa' => new \stdClass
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$this->check_coa($id, $currentdata);
				$this->recv_post($id, $currentdata);
				$this->save_and_set_post_flag($id, $currentdata);
			
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
					'recv_date' => date("d/m/Y", strtotime($record['recv_date'])),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'recv_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'recv_recvby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_recvby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'recv_postby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'COMMIT', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
					'dataresponse' => $dataresponse
				];

				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function save_and_set_post_flag($id, $currentdata) {
		try {
			$sql = " 
				update trn_recv
				set 
				recv_ispost = 1,
				recv_postby = :username,
				recv_postdate = :date
				where
				recv_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,
				":username" => $currentdata->user->username,
				":date" => date("Y-m-d H:i:s")
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	


	public function recv_post($id, $currentdata) {
		try {

			$stmt = $this->db->prepare("delete from trn_jurnaldetil where jurnal_id=:jurnal_id");
			$stmt->execute([":jurnal_id"=>$id]);

			$stmt = $this->db->prepare("delete from trn_jurnal where jurnal_id=:jurnal_id");
			$stmt->execute([":jurnal_id"=>$id]);

			$header = $currentdata->header;




			// Get Periode
			$stmt = $this->db->prepare("call periodemo_get_bydate(:date)");
			$stmt->execute([":date" =>  $header->recv_date]);
			$rows=$stmt->fetchall(\PDO::FETCH_ASSOC);
			if (count($rows)==0) {
				throw new \Exception("periode untuk tanggal '$header->recv_date' belum dibuat");
			}

			$periode_id = $rows[0]['periodemo_id'];


			// create header jurnal
			$obj = new \stdClass;
			$obj->jurnal_id = $id;
			$obj->jurnal_ref = $id;
			$obj->jurnal_date = $header->recv_date;
			$obj->jurnal_datedue = $header->recv_date;
			$obj->jurnal_descr = $header->recv_descr;
			$obj->periodemo_id = $periode_id;
			// $obj->coa_id = '';
			$obj->dept_id = $header->owner_dept_id;
			$obj->partner_id = $header->partner_id;
			$obj->jurnal_valfrg = 0;
			$obj->curr_id = 'IDR';
			$obj->jurnal_valfrgrate = 0;
			$obj->jurnal_validr = 0;
			$obj->jurnaltype_id = 'MAN-JV';
			$obj->jurnalsource_id = 'MANUAL';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnal", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			// Detil
			$stmt = $this->db->prepare("select * from trn_recvitem where recv_id = :recv_id");
			$stmt->execute([":recv_id"=>$id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$total_idr = 0;
			$total_value = 0;		
			foreach ($rows as $row) {
				$total_idr +=  $row['recvitem_idr'];
				$total_value +=  $row['recvitem_value'];

				$coa =  \FGTA4\utils\SqlUtility::LookupRow($row['coa_id'], $this->db, 'mst_coa', 'coa_id');
				$obj = new \stdClass;
				$obj->jurnal_id = $id;
				$obj->jurnaldetil_id = \uniqid();	
				$obj->jurnaldetil_descr	= $row['recvitem_descr'];
				$obj->coa_id = $row['coa_id'];
				$obj->coa_nameshort	= $coa['coa_nameshort'];
				$obj->dept_id = $header->user_dept_id;
				$obj->partner_id = $header->partner_id;	
				$obj->curr_id = $row['curr_id'];	
				$obj->jurnaldetil_valfrg = $row['recvitem_value'];	
				$obj->jurnaldetil_valfrgrate = $row['recvitem_value']==0?0: ($row['recvitem_idr']/$row['recvitem_value']);	
				$obj->jurnaldetil_validr = $row['recvitem_idr'];	
				$obj->jurnaldetil_dk = 'D';
				$obj->_createby =  $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}


			$obj = new \stdClass;
			$obj->jurnal_id = $id;
			$obj->jurnaldetil_id = \uniqid();	
			$obj->jurnaldetil_descr	= $header->recv_descr;
			$obj->coa_id = $currentdata->coa->unbill_coa_id;	
			$obj->coa_nameshort	= $currentdata->coa->unbill_coa_nameshort;
			$obj->dept_id = $header->request_dept_id;
			$obj->partner_id = $header->partner_id;	
			$obj->curr_id = 'IDR';	
			$obj->jurnaldetil_valfrg = -1*$total_value;	
			$obj->jurnaldetil_valfrgrate = 0;	
			$obj->jurnaldetil_validr = -1*$total_idr;	
			$obj->jurnaldetil_dk = 'K';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	




};


