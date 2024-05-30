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
 * finact/acct/jurnal/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header jurnal (trn_jurnal)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/12/2023
 */
$API = new class extends jurnalBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\jurnal_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new jurnal_headerHandler($options);
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
				"search" => " A.jurnal_id LIKE CONCAT('%', :search, '%') OR A.jurnal_descr LIKE CONCAT('%', :search, '%') "
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
				'jurnal_id' => 'A.`jurnal_id`', 'jurnalsource_id' => 'A.`jurnalsource_id`', 'jurnaltype_id' => 'A.`jurnaltype_id`', 'jurnal_descr' => 'A.`jurnal_descr`',
				'jurnal_ref' => 'A.`jurnal_ref`', 'periodemo_id' => 'A.`periodemo_id`', 'jurnal_date' => 'A.`jurnal_date`', 'jurnal_datedue' => 'A.`jurnal_datedue`',
				'jurnal_valfrg' => 'A.`jurnal_valfrg`', 'curr_id' => 'A.`curr_id`', 'jurnal_valfrgrate' => 'A.`jurnal_valfrgrate`', 'jurnal_validr' => 'A.`jurnal_validr`',
				'coa_id' => 'A.`coa_id`', 'unit_id' => 'A.`unit_id`', 'dept_id' => 'A.`dept_id`', 'partner_id' => 'A.`partner_id`',
				'project_id' => 'A.`project_id`', 'jurnaltype_col' => 'A.`jurnaltype_col`', 'jurnal_isindependentsetting' => 'A.`jurnal_isindependentsetting`', 'jurnaltype_ishasduedate' => 'A.`jurnaltype_ishasduedate`',
				'jurnaltype_ishasheadvalue' => 'A.`jurnaltype_ishasheadvalue`', 'jurnaltype_ishasheadaccount' => 'A.`jurnaltype_ishasheadaccount`', 'jurnaltype_ishasheadunit' => 'A.`jurnaltype_ishasheadunit`', 'jurnaltype_ishasheaddept' => 'A.`jurnaltype_ishasheaddept`',
				'jurnaltype_ishasheadpartner' => 'A.`jurnaltype_ishasheadpartner`', 'jurnaltype_ishasdetunit' => 'A.`jurnaltype_ishasdetunit`', 'jurnaltype_ishasdetdept' => 'A.`jurnaltype_ishasdetdept`', 'jurnaltype_ishasdetpartner' => 'A.`jurnaltype_ishasdetpartner`',
				'jurnal_version' => 'A.`jurnal_version`', 'jurnal_iscommit' => 'A.`jurnal_iscommit`', 'jurnal_commitby' => 'A.`jurnal_commitby`', 'jurnal_commitdate' => 'A.`jurnal_commitdate`',
				'jurnal_ispost' => 'A.`jurnal_ispost`', 'jurnal_postby' => 'A.`jurnal_postby`', 'jurnal_postdate' => 'A.`jurnal_postdate`', 'jurnal_isclose' => 'A.`jurnal_isclose`',
				'jurnal_closeby' => 'A.`jurnal_closeby`', 'jurnal_closedate' => 'A.`jurnal_closedate`', 'jurnal_islinked' => 'A.`jurnal_islinked`', 'jurnal_isresponded' => 'A.`jurnal_isresponded`',
				'jurnal_isagingclose' => 'A.`jurnal_isagingclose`', 'jurnal_agingcloseby' => 'A.`jurnal_agingcloseby`', 'jurnal_agingclosedate' => 'A.`jurnal_agingclosedate`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_jurnal A";
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
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_agingcloseby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_agingcloseby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('jurnalsource_name', 'jurnalsource_id', $record, 'mst_jurnalsource', 'jurnalsource_name', 'jurnalsource_id');
				$this->addFields('jurnaltype_name', 'jurnaltype_id', $record, 'mst_jurnaltype', 'jurnaltype_name', 'jurnaltype_id');
				$this->addFields('periodemo_name', 'periodemo_id', $record, 'mst_periodemo', 'periodemo_name', 'periodemo_id');
				$this->addFields('curr_name', 'curr_id', $record, 'mst_curr', 'curr_name', 'curr_id');
				$this->addFields('coa_name', 'coa_id', $record, 'mst_coa', 'coa_name', 'coa_id');
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('dept_name', 'dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('partner_name', 'partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('project_name', 'project_id', $record, 'mst_project', 'project_name', 'project_id');
				$this->addFields('jurnal_commitby', 'jurnal_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('jurnal_postby', 'jurnal_postby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('jurnal_closeby', 'jurnal_closeby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('jurnal_agingcloseby', 'jurnal_agingcloseby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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