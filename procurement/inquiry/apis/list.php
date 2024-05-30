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
 * finact/procurement/inquiry/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header inquiry (trn_inquiry)
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

		$handlerclassname = "\\FGTA4\\apis\\inquiry_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquiry_headerHandler($options);
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
				"search" => " A.inquiry_id LIKE CONCAT('%', :search, '%') OR A.inquiry_descr LIKE CONCAT('%', :search, '%') ",
					"owner_dept_id" => " A.owner_dept_id = :owner_dept_id ",
					"inquiry_istoberequest" => " A.inquiry_istoberequest = '1' "
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
				'inquiry_id' => 'A.`inquiry_id`', 'inquirytype_id' => 'A.`inquirytype_id`', 'request_dept_id' => 'A.`request_dept_id`', 'inquiry_descr' => 'A.`inquiry_descr`',
				'inquiry_dtstart' => 'A.`inquiry_dtstart`', 'inquiry_dtend' => 'A.`inquiry_dtend`', 'user_dept_id' => 'A.`user_dept_id`', 'empl_id' => 'A.`empl_id`',
				'inquiry_isadvance' => 'A.`inquiry_isadvance`', 'partner_id' => 'A.`partner_id`', 'partner_name' => 'A.`partner_name`', 'paymtype_id' => 'A.`paymtype_id`',
				'paymtype_isviabank' => 'A.`paymtype_isviabank`', 'partnerbank_id' => 'A.`partnerbank_id`', 'paymto_bankacc' => 'A.`paymto_bankacc`', 'paymto_bankaccname' => 'A.`paymto_bankaccname`',
				'paymto_bankname' => 'A.`paymto_bankname`', 'partnercontact_id' => 'A.`partnercontact_id`', 'partnercontact_upname' => 'A.`partnercontact_upname`', 'partnercontact_position' => 'A.`partnercontact_position`',
				'partnercontact_upphone' => 'A.`partnercontact_upphone`', 'partnercontact_email' => 'A.`partnercontact_email`', 'project_id' => 'A.`project_id`', 'projecttask_id' => 'A.`projecttask_id`',
				'inquiry_isunbudgetted' => 'A.`inquiry_isunbudgetted`', 'projbudget_id' => 'A.`projbudget_id`', 'projbudgettask_id' => 'A.`projbudgettask_id`', 'site_id' => 'A.`site_id`',
				'deliver_siteaddress' => 'A.`deliver_siteaddress`', 'deliver_city' => 'A.`deliver_city`', 'deliver_upname' => 'A.`deliver_upname`', 'deliver_uptelp' => 'A.`deliver_uptelp`',
				'doc_id' => 'A.`doc_id`', 'inquiry_version' => 'A.`inquiry_version`', 'inquiry_rejectnotes' => 'A.`inquiry_rejectnotes`', 'inquirymodel_id' => 'A.`inquirymodel_id`',
				'itemmanage_id' => 'A.`itemmanage_id`', 'inquiry_isindependentsetting' => 'A.`inquiry_isindependentsetting`', 'inquiryselect_isshowitemasset' => 'A.`inquiryselect_isshowitemasset`', 'inquiryselect_isshowitem' => 'A.`inquiryselect_isshowitem`',
				'inquiryselect_isshowitemstock' => 'A.`inquiryselect_isshowitemstock`', 'inquiryselect_isshowpartner' => 'A.`inquiryselect_isshowpartner`', 'inquiryselect_isshowitemclass' => 'A.`inquiryselect_isshowitemclass`', 'inquiryselect_isitemclassdisabled' => 'A.`inquiryselect_isitemclassdisabled`',
				'inquirytype_isuseqty' => 'A.`inquirytype_isuseqty`', 'inquirytype_isusedays' => 'A.`inquirytype_isusedays`', 'inquirytype_isusetask' => 'A.`inquirytype_isusetask`', 'inquirytype_isdateinterval' => 'A.`inquirytype_isdateinterval`',
				'inquirytype_istoberequest' => 'A.`inquirytype_istoberequest`', 'inquirytype_isautorequest' => 'A.`inquirytype_isautorequest`', 'inquirytype_isautoorder' => 'A.`inquirytype_isautoorder`', 'inquirytype_ismovinginit' => 'A.`inquirytype_ismovinginit`',
				'inquirytype_islimitqty' => 'A.`inquirytype_islimitqty`', 'inquirytype_islimitdays' => 'A.`inquirytype_islimitdays`', 'inquirytype_islimittask' => 'A.`inquirytype_islimittask`', 'inquirytype_islimitvalue' => 'A.`inquirytype_islimitvalue`',
				'inquirytype_isallowunbudget' => 'A.`inquirytype_isallowunbudget`', 'inquirytype_isallowitemunbudget' => 'A.`inquirytype_isallowitemunbudget`', 'inquirytype_isallowoverbudget' => 'A.`inquirytype_isallowoverbudget`', 'inquirytype_isallowadvance' => 'A.`inquirytype_isallowadvance`',
				'inquirytype_isemplaspartner' => 'A.`inquirytype_isemplaspartner`', 'inquirytype_maxadvancevalue' => 'A.`inquirytype_maxadvancevalue`', 'inquiry_iscommit' => 'A.`inquiry_iscommit`', 'inquiry_commitby' => 'A.`inquiry_commitby`',
				'inquiry_commitdate' => 'A.`inquiry_commitdate`', 'inquiry_isapprovalprogress' => 'A.`inquiry_isapprovalprogress`', 'inquiry_isapproved' => 'A.`inquiry_isapproved`', 'inquiry_approveby' => 'A.`inquiry_approveby`',
				'inquiry_approvedate' => 'A.`inquiry_approvedate`', 'inquiry_isdeclined' => 'A.`inquiry_isdeclined`', 'inquiry_declineby' => 'A.`inquiry_declineby`', 'inquiry_declinedate' => 'A.`inquiry_declinedate`',
				'inquiry_ispreparing' => 'A.`inquiry_ispreparing`', 'inquiry_isprepared' => 'A.`inquiry_isprepared`', 'inquiry_preparedby' => 'A.`inquiry_preparedby`', 'inquiry_prepareddate' => 'A.`inquiry_prepareddate`',
				'inquiry_isreject' => 'A.`inquiry_isreject`', 'inquiry_rejectby' => 'A.`inquiry_rejectby`', 'inquiry_rejectdate' => 'A.`inquiry_rejectdate`', 'inquiry_iscomplete' => 'A.`inquiry_iscomplete`',
				'inquiry_isclose' => 'A.`inquiry_isclose`', 'inquiry_closeby' => 'A.`inquiry_closeby`', 'inquiry_closedate' => 'A.`inquiry_closedate`', 'inquiry_isautogenerated' => 'A.`inquiry_isautogenerated`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_inquiry A";
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
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'request_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'inquiry_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_preparedby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_preparedby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_rejectby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_rejectby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('inquirytype_name', 'inquirytype_id', $record, 'mst_inquirytype', 'inquirytype_name', 'inquirytype_id');
				$this->addFields('request_dept_name', 'request_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('user_dept_name', 'user_dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('empl_name', 'empl_id', $record, 'mst_empl', 'empl_name', 'empl_id');
				$this->addFields('partner_name', 'partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('paymtype_name', 'paymtype_id', $record, 'mst_paymtype', 'paymtype_name', 'paymtype_id');
				$this->addFields('partnerbank_accnum', 'partnerbank_id', $record, 'mst_partnerbank', 'partnerbank_accnum', 'partnerbank_id');
				$this->addFields('partnercontact_name', 'partnercontact_id', $record, 'mst_partnercontact', 'partnercontact_name', 'partnercontact_id');
				$this->addFields('project_name', 'project_id', $record, 'mst_project', 'project_name', 'project_id');
				$this->addFields('projecttask_name', 'projecttask_id', $record, 'mst_projecttask', 'projecttask_name', 'projecttask_id');
				$this->addFields('projbudget_name', 'projbudget_id', $record, 'mst_projbudget', 'projbudget_name', 'projbudget_id');
				$this->addFields('projbudgettask_name', 'projbudgettask_id', $record, 'mst_projbudgettask', 'projecttask_notes', 'projbudgettask_id');
				$this->addFields('site_name', 'site_id', $record, 'mst_site', 'site_name', 'site_id');
				$this->addFields('doc_name', 'doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
				$this->addFields('inquirymodel_name', 'inquirymodel_id', $record, 'mst_inquirymodel', 'inquirymodel_name', 'inquirymodel_id');
				$this->addFields('itemmanage_name', 'itemmanage_id', $record, 'mst_itemmanage', 'itemmanage_name', 'itemmanage_id');
				$this->addFields('inquiry_commitby', 'inquiry_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('inquiry_approveby', 'inquiry_approveby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('inquiry_declineby', 'inquiry_declineby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('inquiry_preparedby', 'inquiry_preparedby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('inquiry_rejectby', 'inquiry_rejectby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('inquiry_closeby', 'inquiry_closeby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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