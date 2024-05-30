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
 * finact/procurement/orderout/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header orderout (trn_orderout)
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
		$tablename = 'trn_orderout';
		$primarykey = 'orderout_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_headerHandler($options);
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
				"orderout_id" => " orderout_id = :orderout_id "
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


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'orderout_dtstart' => date("d/m/Y", strtotime($record['orderout_dtstart'])),
				'orderout_dtend' => date("d/m/Y", strtotime($record['orderout_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
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


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
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