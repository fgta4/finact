<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;




/**
 * finact/procurement/request/apis/xapi.base.php
 *
 * requestBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul request
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
class requestBase extends WebAPI {

	protected $main_tablename = "trn_request";
	protected $main_primarykey = "request_id";
	protected $main_field_version = "request_version";	
	
	protected $field_iscommit = "request_iscommit";
	protected $field_commitby = "request_commitby";
	protected $field_commitdate = "request_commitdate";		
			
	
	protected $fields_isapprovalprogress = "request_isapprovalprogress";			
	protected $field_isapprove = "request_isapproved";
	protected $field_approveby = "request_approveby";
	protected $field_approvedate = "request_approvedate";
	protected $field_isdecline = "request_isdeclined";
	protected $field_declineby = "request_declineby";
	protected $field_declinedate = "request_declinedate";

	protected $approval_tablename = "trn_requestappr";
	protected $approval_primarykey = "requestappr_id";
	protected $approval_field_approve = "requestappr_isapproved";
	protected $approval_field_approveby = "requestappr_by";
	protected $approval_field_approvedate = "requestappr_date";
	protected $approval_field_decline = "requestappr_isdeclined";
	protected $approval_field_declineby = "requestappr_declinedby";
	protected $approval_field_declinedate = "requestappr_declineddate";
	protected $approval_field_notes = "requestappr_notes";
	protected $approval_field_version = "request_version";

			



	function __construct($param=null) {

		// $logfilepath = __LOCALDB_DIR . "/output//*request*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		

		$this->db = new \PDO(
			$DB_CONFIG['DSN'], 
			$DB_CONFIG['user'], 
			$DB_CONFIG['pass'], 
			$DB_CONFIG['param']
		);

	
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	// public function generate_orderout($id) {
	// 	$this->log('Generate Orderout from request');
	// 	try {
	// 		// $stmt = $this->db->prepare("delete from trn_orderoutitem where orderout_id=:orderout_id");
	// 		// $stmt->execute([":orderout_id"=>$id]);
	// 		// $stmt = $this->db->prepare("delete from trn_orderout where orderout_id=:orderout_id");
	// 		// $stmt->execute([":orderout_id"=>$id]);

	// 	} catch (\Exception $ex) {
	// 		throw $ex;
	// 	}
	// }

}