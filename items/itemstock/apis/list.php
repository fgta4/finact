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
 * finact/items/itemstock/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header itemstock (mst_itemstock)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/08/2024
 */
$API = new class extends itemstockBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemstock_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemstock_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"search" => " A.itemstock_id LIKE CONCAT('%', :search, '%') OR A.itemstock_code LIKE CONCAT('%', :search, '%') OR A.itemstock_name LIKE CONCAT('%', :search, '%') "
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
				'itemstock_id' => 'A.`itemstock_id`', 'itemgroup_id' => 'A.`itemgroup_id`', 'itemstock_code' => 'A.`itemstock_code`', 'itemstock_name' => 'A.`itemstock_name`',
				'itemstock_nameshort' => 'A.`itemstock_nameshort`', 'itemstock_descr' => 'A.`itemstock_descr`', 'itemstock_couchdbid' => 'A.`itemstock_couchdbid`', 'itemstock_picture' => 'A.`itemstock_picture`',
				'unitmeasurement_id' => 'A.`unitmeasurement_id`', 'dept_id' => 'A.`dept_id`', 'itemclass_id' => 'A.`itemclass_id`', 'unit_id' => 'A.`unit_id`',
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
				if (is_object($options->sortData)) {
					$options->sortData = (array)$options->sortData;
				} else {
					$options->sortData = [];
				}
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
					'itemgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemgroup_id'], $this->db, 'mst_itemgroup', 'itemgroup_id', 'itemgroup_name'),
					'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('itemgroup_name', 'itemgroup_id', $record, 'mst_itemgroup', 'itemgroup_name', 'itemgroup_id');
				$this->addFields('unitmeasurement_name', 'unitmeasurement_id', $record, 'mst_unitmeasurement', 'unitmeasurement_name', 'unitmeasurement_id');
				$this->addFields('dept_name', 'dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('itemclass_name', 'itemclass_id', $record, 'mst_itemclass', 'itemclass_name', 'itemclass_id');
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
					 


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