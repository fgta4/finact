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
 * finact/items/itemclass/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header itemclass (mst_itemclass)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/08/2024
 */
$API = new class extends itemclassBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemclass_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemclass_headerHandler($options);
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
				"search" => " A.itemclass_id LIKE CONCAT('%', :search, '%') OR A.itemclass_name LIKE CONCAT('%', :search, '%') "
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
				'itemclass_id' => 'A.`itemclass_id`', 'itemmodel_id' => 'A.`itemmodel_id`', 'itemclass_name' => 'A.`itemclass_name`', 'itemclass_isdisabled' => 'A.`itemclass_isdisabled`',
				'itemclass_isadvproces' => 'A.`itemclass_isadvproces`', 'itemclass_descr' => 'A.`itemclass_descr`', 'itemclassgroup_id' => 'A.`itemclassgroup_id`', 'itemmanage_id' => 'A.`itemmanage_id`',
				'owner_unit_id' => 'A.`owner_unit_id`', 'owner_dept_id' => 'A.`owner_dept_id`', 'maintainer_dept_id' => 'A.`maintainer_dept_id`', 'unitmeasurement_id' => 'A.`unitmeasurement_id`',
				'itemclass_minassetvalue' => 'A.`itemclass_minassetvalue`', 'inquiry_accbudget_id' => 'A.`inquiry_accbudget_id`', 'nr_coa_id' => 'A.`nr_coa_id`', 'lr_coa_id' => 'A.`lr_coa_id`',
				'depremodel_id' => 'A.`depremodel_id`', 'itemclass_depreage' => 'A.`itemclass_depreage`', 'itemclass_depreresidu' => 'A.`itemclass_depreresidu`', 'itemclass_isallowoverqty' => 'A.`itemclass_isallowoverqty`',
				'itemclass_isallowoverdays' => 'A.`itemclass_isallowoverdays`', 'itemclass_isallowovertask' => 'A.`itemclass_isallowovertask`', 'itemclass_isallowovervalue' => 'A.`itemclass_isallowovervalue`', 'itemclass_isallowunbudget' => 'A.`itemclass_isallowunbudget`',
				'itemclass_isindependentsetting' => 'A.`itemclass_isindependentsetting`', 'itemmodel_isintangible' => 'A.`itemmodel_isintangible`', 'itemmodel_issellable' => 'A.`itemmodel_issellable`', 'itemmodel_isnonitem' => 'A.`itemmodel_isnonitem`',
				'itemmodel_ishasmainteinerdept' => 'A.`itemmodel_ishasmainteinerdept`', 'itemmanage_isasset' => 'A.`itemmanage_isasset`', 'depremodel_isautocalc' => 'A.`depremodel_isautocalc`', 'itemmanage_isbyassetowner' => 'A.`itemmanage_isbyassetowner`',
				'itemmanage_isbystockowner' => 'A.`itemmanage_isbystockowner`', 'itemmanage_isbynonitemowner' => 'A.`itemmanage_isbynonitemowner`', 'itemmanage_isbypartnerselect' => 'A.`itemmanage_isbypartnerselect`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_itemclass A";
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
					'itemmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmodel_id'], $this->db, 'mst_itemmodel', 'itemmodel_id', 'itemmodel_name'),
					'itemclassgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclassgroup_id'], $this->db, 'mst_itemclassgroup', 'itemclassgroup_id', 'itemclassgroup_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'owner_unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'maintainer_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['maintainer_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),
					'inquiry_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					'settl_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['nr_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'cost_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['lr_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'depremodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['depremodel_id'], $this->db, 'mst_depremodel', 'depremodel_id', 'depremodel_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('itemmodel_name', 'itemmodel_id', $record, 'mst_itemmodel', 'itemmodel_name', 'itemmodel_id');
				$this->addFields('itemclassgroup_name', 'itemclassgroup_id', $record, 'mst_itemclassgroup', 'itemclassgroup_name', 'itemclassgroup_id');
				$this->addFields('itemmanage_name', 'itemmanage_id', $record, 'mst_itemmanage', 'itemmanage_name', 'itemmanage_id');
				$this->addFields('owner_unit_name', 'owner_unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('owner_dept_name', 'owner_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('maintainer_dept_name', 'maintainer_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('unitmeasurement_name', 'unitmeasurement_id', $record, 'mst_unitmeasurement', 'unitmeasurement_name', 'unitmeasurement_id');
				$this->addFields('inquiry_accbudget_name', 'inquiry_accbudget_id', $record, 'mst_accbudget', 'accbudget_name', 'accbudget_id');
				$this->addFields('settl_coa_name', 'nr_coa_id', $record, 'mst_coa', 'coa_name', 'coa_id');
				$this->addFields('cost_coa_name', 'lr_coa_id', $record, 'mst_coa', 'coa_name', 'coa_id');
				$this->addFields('depremodel_name', 'depremodel_id', $record, 'mst_depremodel', 'depremodel_name', 'depremodel_id');
					 


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