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
 * finact/procurement/orderout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header orderout (trn_orderout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 01/11/2023
 */
$API = new class extends orderoutBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_headerHandler($options);
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
				"search" => " A.orderout_id LIKE CONCAT('%', :search, '%') OR A.orderout_descr LIKE CONCAT('%', :search, '%') "
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
				'orderout_id' => 'A.`orderout_id`', 'unit_id' => 'A.`unit_id`', 'request_id' => 'A.`request_id`', 'orderout_isunref' => 'A.`orderout_isunref`',
				'inquirytype_id' => 'A.`inquirytype_id`', 'trxmodel_id' => 'A.`trxmodel_id`', 'request_dept_id' => 'A.`request_dept_id`', 'orderout_descr' => 'A.`orderout_descr`',
				'orderout_dtstart' => 'A.`orderout_dtstart`', 'orderout_dtend' => 'A.`orderout_dtend`', 'curr_id' => 'A.`curr_id`', 'curr_rate' => 'A.`curr_rate`',
				'ppn_taxtype_id' => 'A.`ppn_taxtype_id`', 'pph_taxtype_id' => 'A.`pph_taxtype_id`', 'partner_id' => 'A.`partner_id`', 'ordercontract_id' => 'A.`ordercontract_id`',
				'orderout_quot' => 'A.`orderout_quot`', 'paymtype_id' => 'A.`paymtype_id`', 'partnerbank_id' => 'A.`partnerbank_id`', 'partnerbank_name' => 'A.`partnerbank_name`',
				'partnerbank_bankacc' => 'A.`partnerbank_bankacc`', 'partnerbank_bankaccname' => 'A.`partnerbank_bankaccname`', 'partnerbank_bankname' => 'A.`partnerbank_bankname`', 'partnercontact_id' => 'A.`partnercontact_id`',
				'partnercontact_upname' => 'A.`partnercontact_upname`', 'partnercontact_position' => 'A.`partnercontact_position`', 'partnercontact_upphone' => 'A.`partnercontact_upphone`', 'partnercontact_email' => 'A.`partnercontact_email`',
				'project_id' => 'A.`project_id`', 'projecttask_id' => 'A.`projecttask_id`', 'projbudget_id' => 'A.`projbudget_id`', 'projbudgettask_id' => 'A.`projbudgettask_id`',
				'orderout_isunbudgetted' => 'A.`orderout_isunbudgetted`', 'site_id' => 'A.`site_id`', 'user_dept_id' => 'A.`user_dept_id`', 'recv_dept_id' => 'A.`recv_dept_id`',
				'deliver_siteaddress' => 'A.`deliver_siteaddress`', 'deliver_city' => 'A.`deliver_city`', 'deliver_upname' => 'A.`deliver_upname`', 'deliver_uptelp' => 'A.`deliver_uptelp`',
				'inquiry_id' => 'A.`inquiry_id`', 'orderout_ismultirequest' => 'A.`orderout_ismultirequest`', 'inquirymodel_id' => 'A.`inquirymodel_id`', 'inquiryselect_id' => 'A.`inquiryselect_id`',
				'itemmanage_id' => 'A.`itemmanage_id`', 'owner_dept_id' => 'A.`owner_dept_id`', 'orderout_dept_id' => 'A.`orderout_dept_id`', 'doc_id' => 'A.`doc_id`',
				'ordermodel_id' => 'A.`ordermodel_id`', 'orderout_version' => 'A.`orderout_version`', 'orderout_isdateinterval' => 'A.`orderout_isdateinterval`', 'orderout_iscommit' => 'A.`orderout_iscommit`',
				'orderout_commitby' => 'A.`orderout_commitby`', 'orderout_commitdate' => 'A.`orderout_commitdate`', 'orderout_isapprovalprogress' => 'A.`orderout_isapprovalprogress`', 'orderout_isapproved' => 'A.`orderout_isapproved`',
				'orderout_approveby' => 'A.`orderout_approveby`', 'orderout_approvedate' => 'A.`orderout_approvedate`', 'orderout_isdeclined' => 'A.`orderout_isdeclined`', 'orderout_declineby' => 'A.`orderout_declineby`',
				'orderout_declinedate' => 'A.`orderout_declinedate`', 'orderout_isclose' => 'A.`orderout_isclose`', 'orderout_closeby' => 'A.`orderout_closeby`', 'orderout_closedate' => 'A.`orderout_closedate`',
				'orderout_isadvance' => 'A.`orderout_isadvance`', 'orderout_isautogenerated' => 'A.`orderout_isautogenerated`', 'orderout_isitemdeptuser' => 'A.`orderout_isitemdeptuser`', 'orderout_isitemdeptowner' => 'A.`orderout_isitemdeptowner`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_orderout A";
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
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'request_descr' => \FGTA4\utils\SqlUtility::Lookup($record['request_id'], $this->db, 'trn_request', 'request_id', 'request_descr'),
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'request_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'pph_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'ordercontract_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_id'], $this->db, 'trn_ordercontract', 'ordercontract_id', 'ordercontract_descr'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'ordermodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['ordermodel_id'], $this->db, 'mst_ordermodel', 'ordermodel_id', 'ordermodel_name'),
					'orderout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('request_descr', 'request_id', $record, 'trn_request', 'request_descr', 'request_id');
				$this->addFields('inquirytype_name', 'inquirytype_id', $record, 'mst_inquirytype', 'inquirytype_name', 'inquirytype_id');
				$this->addFields('trxmodel_name', 'trxmodel_id', $record, 'mst_trxmodel', 'trxmodel_name', 'trxmodel_id');
				$this->addFields('request_dept_name', 'request_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('curr_name', 'curr_id', $record, 'mst_curr', 'curr_name', 'curr_id');
				$this->addFields('ppn_taxtype_name', 'ppn_taxtype_id', $record, 'mst_taxtype', 'taxtype_name', 'taxtype_id');
				$this->addFields('pph_taxtype_name', 'pph_taxtype_id', $record, 'mst_taxtype', 'taxtype_name', 'taxtype_id');
				$this->addFields('partner_name', 'partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('ordercontract_descr', 'ordercontract_id', $record, 'trn_ordercontract', 'ordercontract_descr', 'ordercontract_id');
				$this->addFields('paymtype_name', 'paymtype_id', $record, 'mst_paymtype', 'paymtype_name', 'paymtype_id');
				$this->addFields('partnerbank_accnum', 'partnerbank_id', $record, 'mst_partnerbank', 'partnerbank_accnum', 'partnerbank_id');
				$this->addFields('partnercontact_name', 'partnercontact_id', $record, 'mst_partnercontact', 'partnercontact_name', 'partnercontact_id');
				$this->addFields('project_name', 'project_id', $record, 'mst_project', 'project_name', 'project_id');
				$this->addFields('projecttask_name', 'projecttask_id', $record, 'mst_projecttask', 'projecttask_name', 'projecttask_id');
				$this->addFields('projbudget_name', 'projbudget_id', $record, 'mst_projbudget', 'projbudget_name', 'projbudget_id');
				$this->addFields('projecttask_name', 'projbudgettask_id', $record, 'mst_projbudgettask', 'projecttask_name', 'projbudgettask_id');
				$this->addFields('site_name', 'site_id', $record, 'mst_site', 'site_name', 'site_id');
				$this->addFields('user_dept_name', 'user_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('recv_dept_name', 'recv_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('inquiry_descr', 'inquiry_id', $record, 'trn_inquiry', 'inquiry_descr', 'inquiry_id');
				$this->addFields('doc_name', 'doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
				$this->addFields('ordermodel_name', 'ordermodel_id', $record, 'mst_ordermodel', 'ordermodel_name', 'ordermodel_id');
				$this->addFields('orderout_commitby', 'orderout_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('orderout_approveby', 'orderout_approveby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('orderout_declineby', 'orderout_declineby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('orderout_closeby', 'orderout_closeby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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