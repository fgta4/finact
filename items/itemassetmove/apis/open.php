<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * finact/items/itemassetmove/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemassetmove (trn_itemassetmove)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2022
 */
$API = new class extends itemassetmoveBase {
	
	public function execute($options) {
		$tablename = 'trn_itemassetmove';
		$primarykey = 'itemassetmove_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemassetmove_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemassetmove_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"itemassetmove_id" => " itemassetmove_id = :itemassetmove_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_itemassetmove A', [
				'itemassetmove_id', 'inquiry_id', 'itemassetmove_isunreferenced', 'itemassetmovemodel_id', 'itemassetmovetype_id', 'itemassetmove_dtstart', 'itemassetmove_dtexpected', 'itemassetmove_dtend', 'itemassetmove_descr', 'user_dept_id', 'from_site_id', 'from_room_id', 'from_empl_id', 'to_dept_id', 'to_site_id', 'to_room_id', 'to_empl_id', 'doc_id', 'itemassetmove_version', 'itemassetmove_isdateinterval', 'itemassetmove_isdept', 'itemassetmove_isemployee', 'itemassetmove_issite', 'itemassetmove_isroom', 'itemassetmove_isreturn', 'itemassetmove_iscommit', 'itemassetmove_commitby', 'itemassetmove_commitdate', 'itemassetmove_issend', 'itemassetmove_sendby', 'itemassetmove_senddate', 'itemassetmove_isrcv', 'itemassetmove_rcvby', 'itemassetmove_rcvdate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'itemassetmove_dtstart' => date("d/m/Y", strtotime($record['itemassetmove_dtstart'])),
				'itemassetmove_dtexpected' => date("d/m/Y", strtotime($record['itemassetmove_dtexpected'])),
				'itemassetmove_dtend' => date("d/m/Y", strtotime($record['itemassetmove_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
				'itemassetmovemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovemodel_id'], $this->db, 'mst_itemassetmovemodel', 'itemassetmovemodel_id', 'itemassetmovemodel_name'),
				'itemassetmovetype_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovetype_id'], $this->db, 'mst_itemassetmovetype', 'itemassetmovetype_id', 'itemassetmovetype_name'),
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

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};