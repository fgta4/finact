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
 * finact/procurement/inquiryprocess/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header inquiryprocess (trn_inquiry)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 16/01/2022
 */
$API = new class extends inquiryprocessBase {
	
	public function execute($options) {
		$tablename = 'trn_inquiry';
		$primarykey = 'inquiry_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquiryprocess_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquiryprocess_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"inquiry_id" => " inquiry_id = :inquiry_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_inquiry A', [
				'inquiry_id', 'inquirytype_id', 'inquiry_descr', 'inquiry_dtstart', 'inquiry_dtend', 'user_dept_id', 'empl_id', 'inquiry_isadvance', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'inquiry_isunbudgetted', 'site_id', 'deliver_siteaddress', 'deliver_city', 'deliver_upname', 'deliver_uptelp', 'inquirymodel_id', 'inquiryselect_id', 'request_dept_id', 'owner_dept_id', 'request_doc_id', 'orderout_dept_id', 'orderout_doc_id', 'trxmodel_id', 'itemmanage_id', 'inquiry_rejectnotes', 'doc_id', 'inquiry_selectfield', 'inquiry_version', 'inquiry_isdateinterval', 'inquiry_maxadvancevalue', 'inquiry_isallowadvance', 'inquiry_iscommit', 'inquiry_commitby', 'inquiry_commitdate', 'inquiry_isapprovalprogress', 'inquiry_isapproved', 'inquiry_approveby', 'inquiry_approvedate', 'inquiry_isdeclined', 'inquiry_declineby', 'inquiry_declinedate', 'inquiry_ispreparing', 'inquiry_isprepared', 'inquiry_preparedby', 'inquiry_prepareddate', 'inquiry_isreject', 'inquiry_rejectby', 'inquiry_rejectdate', 'inquiry_iscomplete', 'inquiry_isclose', 'inquiry_closeby', 'inquiry_closedate', 'inquiry_isautogenerated', 'inquiry_isitemdeptuser', 'inquiry_isitemdeptowner', 'inquiry_istoberequest', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'inquiry_dtstart' => date("d/m/Y", strtotime($record['inquiry_dtstart'])),
				'inquiry_dtend' => date("d/m/Y", strtotime($record['inquiry_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
				'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
				'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'inquiry_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'inquiry_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'inquiry_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'inquiry_preparedby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_preparedby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'inquiry_rejectby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_rejectby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'inquiry_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};