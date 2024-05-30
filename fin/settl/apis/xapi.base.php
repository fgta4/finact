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
 * finact/fin/settl/apis/xapi.base.php
 *
 * settlBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul settl
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2021
 */
class settlBase extends WebAPI {

	protected $main_tablename = "trn_settl";
	protected $main_primarykey = "settl_id";
	protected $main_field_version = "settl_version";	
	
	protected $field_iscommit = "settl_iscommit";
	protected $field_commitby = "settl_commitby";
	protected $field_commitdate = "settl_commitdate";		
			
	
	protected $fields_isapprovalprogress = "settl_isapprovalprogress";			
	protected $field_isapprove = "settl_isapproved";
	protected $field_approveby = "settl_approveby";
	protected $field_approvedate = "settl_approvedate";
	protected $field_isdecline = "settl_isdeclined";
	protected $field_declineby = "settl_declineby";
	protected $field_declinedate = "settl_declinedate";

	protected $approval_tablename = "trn_settlappr";
	protected $approval_primarykey = "settlappr_id";
	protected $approval_field_approve = "settlappr_isapproved";
	protected $approval_field_approveby = "settlappr_by";
	protected $approval_field_approvedate = "settlappr_date";
	protected $approval_field_decline = "settlappr_isdeclined";
	protected $approval_field_declineby = "settlappr_declinedby";
	protected $approval_field_declinedate = "settlappr_declineddate";
	protected $approval_field_notes = "settlappr_notes";
	protected $approval_field_version = "settl_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*settl*/.txt";
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

}