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
 * finact/procurement/orderout/apis/items-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items orderout (trn_orderoutitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 01/11/2023
 */
$API = new class extends orderoutBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'trn_orderoutitem';
		$primarykey = 'orderoutitem_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_itemsHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_itemsHandler($options);
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
				"orderoutitem_id" => " orderoutitem_id = :orderoutitem_id "
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
				'orderoutitem_id' => 'A.`orderoutitem_id`', 'itemasset_id' => 'A.`itemasset_id`', 'item_id' => 'A.`item_id`', 'itemstock_id' => 'A.`itemstock_id`',
				'partner_id' => 'A.`partner_id`', 'itemclass_id' => 'A.`itemclass_id`', 'orderoutitem_ref' => 'A.`orderoutitem_ref`', 'orderoutitem_descr' => 'A.`orderoutitem_descr`',
				'orderoutitem_qty' => 'A.`orderoutitem_qty`', 'orderoutitem_days' => 'A.`orderoutitem_days`', 'orderoutitem_task' => 'A.`orderoutitem_task`', 'orderoutitem_rate' => 'A.`orderoutitem_rate`',
				'orderoutitem_value' => 'A.`orderoutitem_value`', 'curr_id' => 'A.`curr_id`', 'curr_rate' => 'A.`curr_rate`', 'orderoutitem_idr' => 'A.`orderoutitem_idr`',
				'projbudgetdet_id' => 'A.`projbudgetdet_id`', 'orderoutitem_isoverbudget' => 'A.`orderoutitem_isoverbudget`', 'orderoutitem_isunbudget' => 'A.`orderoutitem_isunbudget`', 'orderoutitem_budgetavailable' => 'A.`orderoutitem_budgetavailable`',
				'orderoutitem_budgetqtyavailable' => 'A.`orderoutitem_budgetqtyavailable`', 'orderoutitem_budgetdaysavailable' => 'A.`orderoutitem_budgetdaysavailable`', 'orderoutitem_budgettaskavailable' => 'A.`orderoutitem_budgettaskavailable`', 'orderoutitem_isuseqty' => 'A.`orderoutitem_isuseqty`',
				'orderoutitem_isusedays' => 'A.`orderoutitem_isusedays`', 'orderoutitem_isusetask' => 'A.`orderoutitem_isusetask`', 'orderoutitem_islimitqty' => 'A.`orderoutitem_islimitqty`', 'orderoutitem_islimitdays' => 'A.`orderoutitem_islimitdays`',
				'orderoutitem_islimittask' => 'A.`orderoutitem_islimittask`', 'orderoutitem_islimitvalue' => 'A.`orderoutitem_islimitvalue`', 'orderoutitem_isallowoverbudget' => 'A.`orderoutitem_isallowoverbudget`', 'orderoutitem_isallowunbudget' => 'A.`orderoutitem_isallowunbudget`',
				'orderoutitem_qtyavailable' => 'A.`orderoutitem_qtyavailable`', 'accbudget_id' => 'A.`accbudget_id`', 'coa_id' => 'A.`coa_id`', 'request_id' => 'A.`request_id`',
				'requestitem_id' => 'A.`requestitem_id`', 'inquiry_id' => 'A.`inquiry_id`', 'inquiryitem_id' => 'A.`inquiryitem_id`', 'orderout_id' => 'A.`orderout_id`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_orderoutitem A";
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
				
				'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
				'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
				'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemstock_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'view_projbudgetdetacc', 'projbudgetdet_id', 'projbudgetdet_descr'),

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