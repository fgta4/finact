<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * finact/procurement/recv/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header recv (trn_recv)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends recvBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_recv';
		$primarykey = 'recv_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->recv_date = (\DateTime::createFromFormat('d/m/Y',$obj->recv_date))->format('Y-m-d');



			if ($obj->project_id=='') { $obj->project_id = '--NULL--'; }
			if ($obj->projecttask_id=='') { $obj->projecttask_id = '--NULL--'; }
			if ($obj->projbudget_id=='') { $obj->projbudget_id = '--NULL--'; }
			if ($obj->projbudgettask_id=='') { $obj->projbudgettask_id = '--NULL--'; }


			unset($obj->recv_iscommit);
			unset($obj->recv_commitby);
			unset($obj->recv_commitdate);
			unset($obj->recv_isrecv);
			unset($obj->recv_recvby);
			unset($obj->recv_recvdate);
			unset($obj->recv_ispost);
			unset($obj->recv_postby);
			unset($obj->recv_postdate);


			unset($obj->recvitem_totalvalue);
			unset($obj->recvitem_totalidr);
			unset($obj->recvitem_totalvaluenett);
			unset($obj->recvitem_totalvalueppn);
			unset($obj->recvitem_totalvaluepph);
			unset($obj->recvitem_totalidrnett);
			unset($obj->recvitem_totalidrppn);
			unset($obj->recvitem_totalidrpph);
			



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'recv_id', 'unit_id', 'orderout_id', 'recv_ref', 'recv_descr', 'recv_date', 'partner_id', 'site_id', 'empl_id', 'recv_dept_id', 'trxmodel_id', 'inquirymodel_id', 'inquiryselect_id', 'itemmanage_id', 'owner_dept_id', 'request_dept_id', 'orderout_dept_id', 'user_dept_id', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'recv_version', 'recv_iscommit', 'recv_commitby', 'recv_commitdate', 'recv_isrecv', 'recv_recvby', 'recv_recvdate', 'recv_ispost', 'recv_postby', 'recv_postdate'
					, 'recvitem_totalvalue', 'curr_id', 'curr_rate', 'recvitem_totalidr'
					, 'ppn_taxtype_id', 'ppn_value', 'ppn_isinclude', 'pph_taxtype_id', 'pph_value', 'pph_isinclude'
					, 'recvitem_totalvaluenett', 'recvitem_totalvalueppn', 'recvitem_totalvaluepph', 'recvitem_totalidrnett', 'recvitem_totalidrppn', 'recvitem_totalidrpph'
					, '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
					'recv_date' => date("d/m/Y", strtotime($row['recv_date'])),
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



				/* Buat Summary */
				$sql = "
				select 
				sum(recvitem_value) as recvitem_value, 
				sum(recvitem_idr) as recvitem_idr 
				from trn_recvitem 
				where 
				recv_id = :recv_id				
				";
				



				$this->db->commit();
				return $result;

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

	public function NewId($param) {
		
			$seqname = 'RV';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};