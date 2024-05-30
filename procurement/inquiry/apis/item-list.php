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
 * finact/procurement/inquiry/apis/item-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel item inquiry (trn_inquirydetil)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/03/2023
 */
$API = new class extends inquiryBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\inquiry_itemHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquiry_itemHandler($options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"id" => " A.inquiry_id = :id"
			];
			if (method_exists(get_class($hnd), 'buildListCriteriaValues')) {
				// ** buildListCriteriaValues(object &$options, array &$criteriaValues) : void
				//    apabila akan modifikasi parameter2 untuk query
				//    $criteriaValues['fieldname'] = " A.fieldname = :fieldname";  <-- menambahkan field pada where dan memberi parameter value
				//    $criteriaValues['fieldname'] = "--";                         <-- memberi parameter value tanpa menambahkan pada where
				//    $criteriaValues['fieldname'] = null                          <-- tidak memberi efek pada query secara langsung, parameter digunakan untuk keperluan lain 
				//
				//    untuk memberikan nilai default apabila paramter tidak dikirim
				//    // \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
				$hnd->buildListCriteriaValues($options, $criteriaValues);
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (method_exists(get_class($hnd), 'prepareListData')) {
				// ** prepareListData(object $options, array $criteriaValues) : void
				//    misalnya perlu mebuat temporary table,
				//    untuk membuat query komplex dapat dibuat disini	
				$hnd->prepareListData($options, $criteriaValues);
			}
			
			/* Data Query Configuration */
			$sqlFieldList = [
				'inquirydetil_id' => 'A.`inquirydetil_id`', 'itemasset_id' => 'A.`itemasset_id`', 'item_id' => 'A.`item_id`', 'itemstock_id' => 'A.`itemstock_id`',
				'partner_id' => 'A.`partner_id`', 'itemclass_id' => 'A.`itemclass_id`', 'inquirydetil_descr' => 'A.`inquirydetil_descr`', 'inquirydetil_qty' => 'A.`inquirydetil_qty`',
				'inquirydetil_days' => 'A.`inquirydetil_days`', 'inquirydetil_task' => 'A.`inquirydetil_task`', 'inquirydetil_estrate' => 'A.`inquirydetil_estrate`', 'inquirydetil_estvalue' => 'A.`inquirydetil_estvalue`',
				'inquirydetil_ref' => 'A.`inquirydetil_ref`', 'inquirydetil_refname' => 'A.`inquirydetil_refname`', 'projbudgetdet_id' => 'A.`projbudgetdet_id`', 'inquirydetil_isunbudget' => 'A.`inquirydetil_isunbudget`',
				'inquirydetil_isallowoverbudget' => 'A.`inquirydetil_isallowoverbudget`', 'inquirydetil_qtyavailable' => 'A.`inquirydetil_qtyavailable`', 'accbudget_id' => 'A.`accbudget_id`', 'coa_id' => 'A.`coa_id`',
				'inquiry_id' => 'A.`inquiry_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_inquirydetil A";
			$sqlWhere = $where->sql;
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
				// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				//    menambah atau memodifikasi field-field yang akan ditampilkan
				//    apabila akan memodifikasi join table
				//    apabila akan memodifikasi nilai parameter
				$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}

			// filter select columns
			if (!property_exists($options, 'selectFields')) {
				$options->selectFields = [];
			}
			$columsSelected = $this->SelectColumns($sqlFieldList, $options->selectFields);
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($columsSelected);


			/* Sort Configuration */
			if (!property_exists($options, 'sortData')) {
				$options->sortData = [];
			}			
			if (!is_array($options->sortData)) {
				$options->sortData = [];
			}
			if (method_exists(get_class($hnd), 'sortListOrder')) {
				// ** sortListOrder(array &$sortData) : void
				//    jika ada keperluan mengurutkan data
				//    $sortData['fieldname'] = 'ASC/DESC';
				$hnd->sortListOrder($options->sortData);
			}
			$sqlOrders = \FGTA4\utils\SqlUtility::generateSqlSelectSort($options->sortData);


			/* Compose SQL Query */
			$sqlCount = "select count(*) as n from $sqlFromTable $sqlWhere";
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
				$sqlOrders 
				$sqlLimit
			";


			/* Execute Query: Count */
			$stmt = $this->db->prepare($sqlCount );
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			/* Execute Query: Retrieve Data */
			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		

			$handleloop = false;
			if (method_exists(get_class($hnd), 'DataListLooping')) {
				$handleloop = true;
			}
			
			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				/*
				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
					'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
					'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemstock_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'mst_projbudgetdet', 'projbudgetdet_id', 'projbudgetdet_descr'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('itemasset_name', 'itemasset_id', $record, 'mst_itemasset', 'itemasset_name', 'itemasset_id');
				$this->addFields('item_name', 'item_id', $record, 'mst_item', 'item_name', 'item_id');
				$this->addFields('itemstock_name', 'itemstock_id', $record, 'mst_itemstock', 'itemstock_name', 'itemstock_id');
				$this->addFields('partner_name', 'partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('itemclass_name', 'itemclass_id', $record, 'mst_itemclass', 'itemclass_name', 'itemclass_id');
				$this->addFields('projbudgetdet_descr', 'projbudgetdet_id', $record, 'mst_projbudgetdet', 'projbudgetdet_descr', 'projbudgetdet_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records) : void
				//    finalisasi data list
				$hnd->DataListFinal($records);
			}


			// kembalikan hasilnya
			$result = new \stdClass; 
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