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
 * finact/items/itemassetmove/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2022
 */
$API = new class extends itemassetmoveBase {

	public function execute($id, $param) {
		$tablename = 'trn_itemassetmove';
		$primarykey = 'itemassetmove_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

	
				$this->save_and_set_commit_flag($id, $currentdata);

				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'itemassetmovemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovemodel_id'], $this->db, 'mst_itemassetmovemodel', 'itemassetmovemodel_id', 'itemassetmovemodel_name'),
					'itemassetmovetype_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovetype_id'], $this->db, 'mst_itemassetmovetype', 'itemassetmovetype_id', 'itemassetmovetype_name'),
					'itemassetmove_dtstart' => date("d/m/Y", strtotime($record['itemassetmove_dtstart'])),
					'itemassetmove_dtexpected' => date("d/m/Y", strtotime($record['itemassetmove_dtexpected'])),
					'itemassetmove_dtend' => date("d/m/Y", strtotime($record['itemassetmove_dtend'])),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'from_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'from_room_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'from_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'to_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'to_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'to_room_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'to_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'itemassetmove_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemassetmove_sendby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_sendby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemassetmove_rcvby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_rcvby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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



	public function save_and_set_commit_flag($id, $currentdata) {
		try {
			$sql = " 
				update $this->main_tablename
				set 
				$this->field_iscommit = 1,
				$this->field_commitby = :username,
				$this->field_commitdate = :date
				where
				$this->main_primarykey = :id
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
};


