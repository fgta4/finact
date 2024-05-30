<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-item-handler.php')) {
	require_once __DIR__ .'/data-item-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * finact/budget/budgetdeptprop/apis/item-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel item budgetdeptprop (mst_budgetdeptpropitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/02/2024
 */
$API = new class extends budgetdeptpropBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_budgetdeptpropitem';
		$primarykey = 'budgetdeptpropitem_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\budgetdeptprop_itemHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new budgetdeptprop_itemHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$result = new \stdClass; 

			$criteriaValues = [
				"budgetdeptpropitem_id" => " budgetdeptpropitem_id = :budgetdeptpropitem_id "
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

			$sqlFieldList = [
				'budgetdeptpropitem_id' => 'A.`budgetdeptpropitem_id`', 'coabudget_id' => 'A.`coabudget_id`', 'dept_id' => 'A.`dept_id`', 'budgetdeptpropitem_descr' => 'A.`budgetdeptpropitem_descr`',
				'budgetdeptmonth_01' => 'A.`budgetdeptmonth_01`', 'budgetdeptmonth_02' => 'A.`budgetdeptmonth_02`', 'budgetdeptmonth_03' => 'A.`budgetdeptmonth_03`', 'budgetdeptmonth_04' => 'A.`budgetdeptmonth_04`',
				'budgetdeptmonth_05' => 'A.`budgetdeptmonth_05`', 'budgetdeptmonth_06' => 'A.`budgetdeptmonth_06`', 'budgetdeptmonth_07' => 'A.`budgetdeptmonth_07`', 'budgetdeptmonth_08' => 'A.`budgetdeptmonth_08`',
				'budgetdeptmonth_09' => 'A.`budgetdeptmonth_09`', 'budgetdeptmonth_10' => 'A.`budgetdeptmonth_10`', 'budgetdeptmonth_11' => 'A.`budgetdeptmonth_11`', 'budgetdeptmonth_12' => 'A.`budgetdeptmonth_12`',
				'budgetdeptprop_id' => 'A.`budgetdeptprop_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_budgetdeptpropitem A";
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
				
				'coabudget_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['coabudget_id'], $this->db, 'mst_coabudget', 'coabudget_id', 'coabudget_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),

/*{__LOOKUPUSERMERGE__}*/
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


	


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