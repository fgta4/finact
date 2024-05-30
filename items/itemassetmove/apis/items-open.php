<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * finact/items/itemassetmove/apis/items-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items} itemassetmove (trn_itemassetmove)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2022
 */
$API = new class extends itemassetmoveBase {

	public function execute($options) {
		$tablename = 'trn_itemassetmovedetil';
		$primarykey = 'itemassetmovedetil_id';
		$userdata = $this->auth->session_get_user();
		

		$handlerclassname = "\\FGTA4\\apis\\itemassetmove_itemsHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemassetmove_itemsHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"itemassetmovedetil_id" => " itemassetmovedetil_id = :itemassetmovedetil_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_itemassetmovedetil A', [
				'itemassetmovedetil_id', 'itemasset_id', 'item_id', 'itemclass_id', 'itemassetmovedetil_qty', 'send_itemassetstatus_id', 'itemassetmovedetil_senddescr', 'recv_itemassetstatus_id', 'itemassetmovedetil_recvdescr', 'itemassetmove_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
				'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'send_itemassetstatus_name' => \FGTA4\utils\SqlUtility::Lookup($record['send_itemassetstatus_id'], $this->db, 'mst_itemassetstatus', 'itemassetstatus_id', 'itemassetstatus_name'),
				'recv_itemassetstatus_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_itemassetstatus_id'], $this->db, 'mst_itemassetstatus', 'itemassetstatus_id', 'itemassetstatus_name'),
				
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