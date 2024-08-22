<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/procurement/request/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header request (trn_request)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends requestBase {
	
	public function execute($options) {
		$tablename = 'trn_request';
		$primarykey = 'request_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"request_id" => " request_id = :request_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_request A', [
				  'request_id', 'inquiry_id', 'request_isunref', 'inquirytype_id', 'user_dept_id', 'request_descr', 'trxmodel_id'
				, 'request_dtstart', 'request_dtend', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'request_isunbudgetted'
				, 'site_id', 'deliver_siteaddress', 'deliver_city', 'deliver_upname', 'deliver_uptelp', 'inquirymodel_id', 'inquiryselect_id', 'inquiry_selectfield'
				, 'itemmanage_id', 'owner_dept_id', 'request_dept_id'
				, 'orderout_dept_id', 'orderout_doc_id', 'doc_id', 'request_version', 'request_isdateinterval', 'request_iscommit', 'request_commitby', 'request_commitdate', 'request_isapprovalprogress', 'request_isapproved', 'request_approveby', 'request_approvedate', 'request_isdeclined', 'request_declineby', 'request_declinedate', 'request_isclose', 'request_closeby', 'request_closedate', 'request_isautogenerated', 'request_isitemdeptuser', 'request_isitemdeptowner', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'request_dtstart' => date("d/m/Y", strtotime($record['request_dtstart'])),
				'request_dtend' => date("d/m/Y", strtotime($record['request_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
				'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
				'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
				'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'request_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['request_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'request_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['request_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'request_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['request_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'request_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['request_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};