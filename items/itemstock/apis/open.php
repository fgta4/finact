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
 * finact/items/itemstock/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemstock (mst_itemstock)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/08/2024
 */
$API = new class extends itemstockBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_itemstock';
		$primarykey = 'itemstock_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemstock_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new itemstock_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			if (method_exists(get_class($hnd), 'PreCheckOpen')) {
				// PreCheckOpen($data, &$key, &$options)
				$hnd->PreCheckOpen($data, $key, $options);
			}

			$criteriaValues = [
				"itemstock_id" => " itemstock_id = :itemstock_id "
			];
			if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
				// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
				$hnd->buildOpenCriteriaValues($options, $criteriaValues);
			}
			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			$result = new \stdClass; 

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}
			

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}


			$sqlFieldList = [
				'itemstock_id' => 'A.`itemstock_id`', 'itemgroup_id' => 'A.`itemgroup_id`', 'itemclass_id' => 'A.`itemclass_id`', 'itemstock_code' => 'A.`itemstock_code`',
				'itemstock_name' => 'A.`itemstock_name`', 'itemstock_nameshort' => 'A.`itemstock_nameshort`', 'itemstock_descr' => 'A.`itemstock_descr`', 'dept_id' => 'A.`dept_id`',
				'unit_id' => 'A.`unit_id`', 'unitmeasurement_id' => 'A.`unitmeasurement_id`', 'itemstock_couchdbid' => 'A.`itemstock_couchdbid`', 'itemstock_picture' => 'A.`itemstock_picture`',
				'itemstock_isdisabled' => 'A.`itemstock_isdisabled`', 'itemstock_ishascompound' => 'A.`itemstock_ishascompound`', 'itemstock_issellable' => 'A.`itemstock_issellable`', 'itemstock_priceori' => 'A.`itemstock_priceori`',
				'itemstock_priceadj' => 'A.`itemstock_priceadj`', 'itemstock_priceadjdate' => 'A.`itemstock_priceadjdate`', 'itemstock_grossprice' => 'A.`itemstock_grossprice`', 'itemstock_isdiscvalue' => 'A.`itemstock_isdiscvalue`',
				'itemstock_disc' => 'A.`itemstock_disc`', 'itemstock_discval' => 'A.`itemstock_discval`', 'itemstock_sellprice' => 'A.`itemstock_sellprice`', 'itemstock_estcost' => 'A.`itemstock_estcost`',
				'itemstock_weight' => 'A.`itemstock_weight`', 'itemstock_length' => 'A.`itemstock_length`', 'itemstock_width' => 'A.`itemstock_width`', 'itemstock_height' => 'A.`itemstock_height`',
				'itemstock_lastqty' => 'A.`itemstock_lastqty`', 'itemstock_lastvalue' => 'A.`itemstock_lastvalue`', 'itemstock_lastqtyupdate' => 'A.`itemstock_lastqtyupdate`', 'itemstock_isupdating' => 'A.`itemstock_isupdating`',
				'itemstock_updatebatch' => 'A.`itemstock_updatebatch`', 'itemstock_lastrecvid' => 'A.`itemstock_lastrecvid`', 'itemstock_lastrecvdate' => 'A.`itemstock_lastrecvdate`', 'itemstock_lastrecvqty' => 'A.`itemstock_lastrecvqty`',
				'itemstock_lastcost' => 'A.`itemstock_lastcost`', 'itemstock_lastcostdate' => 'A.`itemstock_lastcostdate`', 'itemstock_ref' => 'A.`itemstock_ref`', 'itemstock_refname' => 'A.`itemstock_refname`',
				'itemstock_uploadbatchcode' => 'A.`itemstock_uploadbatchcode`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_itemstock A";
			$sqlWhere = $where->sql;

			if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
				// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);

			
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
			";

			$stmt = $this->db->prepare($sqlData);
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
				
				'itemgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemgroup_id'], $this->db, 'mst_itemgroup', 'itemgroup_id', 'itemgroup_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


			$file_id = "$tablename/" . $result->record[$primarykey];
			try { $result->record['itemstock_picture_doc'] = $this->cdb->getAttachment($file_id, 'filedata'); } catch (\Exception $ex) {}
			

			if (method_exists(get_class($hnd), 'DataOpen')) {
				//  DataOpen(array &$record) : void 
				$hnd->DataOpen($result->record);
			}

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};