<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/apps/finact/acct/jurnal/apis/xlib-jurnal.php';

require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * finact/fin/billout/apis/xtion-commit.php
 *
 * =======
 * Post
 * =======
 * Post dokumen, masukkan data bill ke jurnal. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 19 April 2021
 */
$API = new class extends billoutBase {

	public function execute($id, $param) {
		$tablename = 'trn_billout';
		$primarykey = 'billout_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'detil' => $this->get_detil_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {



				$this->add_to_jurnal($id, $currentdata);
				$this->save_and_set_post_flag($id, $currentdata);

				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'salesorder_descr' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_id'], $this->db, 'trn_salesorder', 'salesorder_id', 'salesorder_descr'),
					'billout_date' => date("d/m/Y", strtotime($record['billout_date'])),
					'billout_datedue' => date("d/m/Y", strtotime($record['billout_datedue'])),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'cost_coa_id_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'billout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'billout_postby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'POST', $userdata->username, (object)[]);

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
				update trn_billout
				set 
				billout_ispost = 1,
				billout_postby = :username,
				billout_postdate = :date
				where
				billout_id = :id
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


	public function add_to_jurnal($id, $currentdata) {
		try {
			$jur = new \FGTA4\ActJurnal((object)[
				'auth' => $this->auth,
				'reqinfo' => $this->reqinfo,
				'db' => $this->db
			]);

			$jurnal_id = $currentdata->header->billout_id;
			$periodemo_id = $jur->GetPeriodeByDate($currentdata->header->billout_date);	

			$jur->CheckPeriode($periodemo_id);
			$jur->RemoveJurnal($jurnal_id);	


			$obj = (object)[
				'jurnal_id' => $jurnal_id,
				'jurnal_ref' => '',
				'jurnal_date' => $currentdata->header->billout_date,
				'jurnal_datedue' => $currentdata->header->billout_datedue,
				'jurnal_descr' => "[Tagihan][$jurnal_id]  " .  $currentdata->header->billout_descr,
				'jurnal_iscommit' => 1,
				'jurnal_ispost' => 1,
				'periodemo_id' => $periodemo_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnaltype_id' => 'ARTAGIHAN',
				'jurnalsource_id' => 'BILLOUT',
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")				
			];
			$jur->InsertJurnalHeader($obj);


			// Debet
			foreach ($currentdata->detil as $detil) {
				$obj = (object)[
					'jurnaldetil_id' => $detil['billoutdetil_id'],
					'jurnaldetil_descr' =>  $detil['billoutdetil_descr'],
					'jurnaldetil_valfrg' => $detil['billoutdetil_validr'],
					'jurnaldetil_valfrgrate' => 1,
					'jurnaldetil_validr' =>  $detil['billoutdetil_validr'],
					'coa_id' => $detil['coa_id'],
					'dept_id' => $currentdata->header->dept_id,
					'partner_id' => $currentdata->header->partner_id,
					'curr_id' => $currentdata->header->curr_id,
					'jurnal_id' => $jurnal_id,
					'_createby' => $currentdata->user->username,
					'_createdate' => date("Y-m-d H:i:s")
				];
				$jur->InsertJurnalDetil($obj);
			}

			// Kredit
			$obj = (object)[
				'jurnaldetil_id' => uniqid(),
				'jurnaldetil_descr' =>  "[Tagihan] " .  $currentdata->header->billout_descr,
				'jurnaldetil_valfrg' => -$currentdata->header->billout_valfrg,
				'jurnaldetil_valfrgrate' => $currentdata->header->billout_valfrgrate,
				'jurnaldetil_validr' =>  -$currentdata->header->billout_validr,
				'coa_id' => $currentdata->header->coa_id,
				'dept_id' => $currentdata->header->dept_id,
				'partner_id' => $currentdata->header->partner_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnal_id' => $jurnal_id,
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")
			];
			$jur->InsertJurnalDetil($obj);


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}


};


