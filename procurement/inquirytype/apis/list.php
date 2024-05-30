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
 * finact/procurement/inquirytype/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header inquirytype (mst_inquirytype)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/03/2023
 */
$API = new class extends inquirytypeBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquirytype_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquirytype_headerHandler($options);
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
				"search" => " A.inquirytype_id LIKE CONCAT('%', :search, '%') OR A.inquirytype_name LIKE CONCAT('%', :search, '%') "
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
				'inquirytype_id' => 'A.`inquirytype_id`', 'inquirymodel_id' => 'A.`inquirymodel_id`', 'inquirytype_name' => 'A.`inquirytype_name`', 'inquirytype_isdisabled' => 'A.`inquirytype_isdisabled`',
				'inquirytype_descr' => 'A.`inquirytype_descr`', 'inquiryselect_id' => 'A.`inquiryselect_id`', 'inquirytype_isperempl' => 'A.`inquirytype_isperempl`', 'itemmanage_id' => 'A.`itemmanage_id`',
				'related_dept_id' => 'A.`related_dept_id`', 'related_team_id' => 'A.`related_team_id`', 'site_id' => 'A.`site_id`', 'room_id' => 'A.`room_id`',
				'inquirytype_isallowadvance' => 'A.`inquirytype_isallowadvance`', 'inquirytype_isemplaspartner' => 'A.`inquirytype_isemplaspartner`', 'inquirytype_maxadvancevalue' => 'A.`inquirytype_maxadvancevalue`', 'owner_dept_id' => 'A.`owner_dept_id`',
				'owner_team_id' => 'A.`owner_team_id`', 'orderout_dept_id' => 'A.`orderout_dept_id`', 'orderout_team_id' => 'A.`orderout_team_id`', 'trxmodel_id' => 'A.`trxmodel_id`',
				'inquiry_title_ina' => 'A.`inquiry_title_ina`', 'inquiry_title_eng' => 'A.`inquiry_title_eng`', 'inquiry_doc_id' => 'A.`inquiry_doc_id`', 'request_title_ina' => 'A.`request_title_ina`',
				'request_title_eng' => 'A.`request_title_eng`', 'request_doc_id' => 'A.`request_doc_id`', 'orderout_title_ina' => 'A.`orderout_title_ina`', 'orderout_title_eng' => 'A.`orderout_title_eng`',
				'orderout_doc_id' => 'A.`orderout_doc_id`', 'inquiryselect_isshowitemasset' => 'A.`inquiryselect_isshowitemasset`', 'inquiryselect_isshowitem' => 'A.`inquiryselect_isshowitem`', 'inquiryselect_isshowitemstock' => 'A.`inquiryselect_isshowitemstock`',
				'inquiryselect_isshowpartner' => 'A.`inquiryselect_isshowpartner`', 'inquiryselect_isshowitemclass' => 'A.`inquiryselect_isshowitemclass`', 'inquiryselect_isitemclassdisabled' => 'A.`inquiryselect_isitemclassdisabled`', 'inquirytype_ispartnerheader' => 'A.`inquirytype_ispartnerheader`',
				'inquirytype_isuseqty' => 'A.`inquirytype_isuseqty`', 'inquirytype_isusedays' => 'A.`inquirytype_isusedays`', 'inquirytype_isusetask' => 'A.`inquirytype_isusetask`', 'inquirytype_islimitqty' => 'A.`inquirytype_islimitqty`',
				'inquirytype_islimitdays' => 'A.`inquirytype_islimitdays`', 'inquirytype_islimittask' => 'A.`inquirytype_islimittask`', 'inquirytype_islimitvalue' => 'A.`inquirytype_islimitvalue`', 'inquirytype_isallowunbudget' => 'A.`inquirytype_isallowunbudget`',
				'inquirytype_isallowitemunbudget' => 'A.`inquirytype_isallowitemunbudget`', 'inquirytype_isallowoverbudget' => 'A.`inquirytype_isallowoverbudget`', 'inquirytype_isdeptuser' => 'A.`inquirytype_isdeptuser`', 'inquirytype_isdeptowner' => 'A.`inquirytype_isdeptowner`',
				'inquirytype_isdeptmaintainer' => 'A.`inquirytype_isdeptmaintainer`', 'inquirytype_isqtybreakdown' => 'A.`inquirytype_isqtybreakdown`', 'inquirytype_istoberequest' => 'A.`inquirytype_istoberequest`', 'inquirytype_isautorequest' => 'A.`inquirytype_isautorequest`',
				'inquirytype_isautoorder' => 'A.`inquirytype_isautoorder`', 'inquirytype_ismovinginit' => 'A.`inquirytype_ismovinginit`', 'inquirytype_isdateinterval' => 'A.`inquirytype_isdateinterval`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_inquirytype A";
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
					'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
					'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'related_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'related_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'room_name' => \FGTA4\utils\SqlUtility::Lookup($record['room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'inquiry_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'request_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'orderout_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('inquirymodel_name', 'inquirymodel_id', $record, 'mst_inquirymodel', 'inquirymodel_name', 'inquirymodel_id');
				$this->addFields('inquiryselect_name', 'inquiryselect_id', $record, 'mst_inquiryselect', 'inquiryselect_name', 'inquiryselect_id');
				$this->addFields('itemmanage_name', 'itemmanage_id', $record, 'mst_itemmanage', 'itemmanage_name', 'itemmanage_id');
				$this->addFields('related_dept_name', 'related_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('related_team_name', 'related_team_id', $record, 'mst_team', 'team_name', 'team_id');
				$this->addFields('site_name', 'site_id', $record, 'mst_site', 'site_name', 'site_id');
				$this->addFields('room_name', 'room_id', $record, 'mst_room', 'room_name', 'room_id');
				$this->addFields('owner_dept_name', 'owner_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('owner_team_name', 'owner_team_id', $record, 'mst_team', 'team_name', 'team_id');
				$this->addFields('orderout_dept_name', 'orderout_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('owner_team_name', 'orderout_team_id', $record, 'mst_team', 'team_name', 'team_id');
				$this->addFields('trxmodel_name', 'trxmodel_id', $record, 'mst_trxmodel', 'trxmodel_name', 'trxmodel_id');
				$this->addFields('inquiry_doc_name', 'inquiry_doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
				$this->addFields('request_doc_name', 'request_doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
				$this->addFields('orderout_doc_name', 'orderout_doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
					 


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