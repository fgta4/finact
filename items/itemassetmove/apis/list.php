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
 * finact/items/itemassetmove/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header itemassetmove (trn_itemassetmove)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2022
 */
$API = new class extends itemassetmoveBase {

	public function execute($options) {

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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.itemassetmove_id LIKE CONCAT('%', :search, '%') OR A.itemassetmove_descr LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_itemassetmove A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.itemassetmove_id, A.inquiry_id, A.itemassetmove_isunreferenced, A.itemassetmovemodel_id, A.itemassetmovetype_id, A.itemassetmove_dtstart, A.itemassetmove_dtexpected, A.itemassetmove_dtend, A.itemassetmove_descr, A.user_dept_id, A.from_site_id, A.from_room_id, A.from_empl_id, A.to_dept_id, A.to_site_id, A.to_room_id, A.to_empl_id, A.doc_id, A.itemassetmove_version, A.itemassetmove_isdateinterval, A.itemassetmove_isdept, A.itemassetmove_isemployee, A.itemassetmove_issite, A.itemassetmove_isroom, A.itemassetmove_isreturn, A.itemassetmove_iscommit, A.itemassetmove_commitby, A.itemassetmove_commitdate, A.itemassetmove_issend, A.itemassetmove_sendby, A.itemassetmove_senddate, A.itemassetmove_isrcv, A.itemassetmove_rcvby, A.itemassetmove_rcvdate, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_itemassetmove A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$beforeloopdata = new \stdClass;
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListBeforeLoop')) {
					$beforeloopdata = $hnd->DataListBeforeLoop((object[]));
				}
			}

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						$hnd->DataListLooping($record, $beforeloopdata);
					}
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
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
					 
				]));




			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};