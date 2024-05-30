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
 * finact/fin/billin/apis/xapi.base.php
 *
 * billinBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul billin
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/05/2021
 */
class billinBase extends WebAPI {

	protected $main_tablename = "trn_billin";
	protected $main_primarykey = "billin_id";
	protected $main_field_version = "billin_version";	
	
	protected $field_iscommit = "billin_iscommit";
	protected $field_commitby = "billin_commitby";
	protected $field_commitdate = "billin_commitdate";		
			
	
	protected $fields_isapprovalprogress = "billin_isapprovalprogress";			
	protected $field_isapprove = "billin_isapproved";
	protected $field_approveby = "billin_approveby";
	protected $field_approvedate = "billin_approvedate";
	protected $field_isdecline = "billin_isdeclined";
	protected $field_declineby = "billin_declineby";
	protected $field_declinedate = "billin_declinedate";

	protected $approval_tablename = "trn_billinappr";
	protected $approval_primarykey = "billinappr_id";
	protected $approval_field_approve = "billinappr_isapproved";
	protected $approval_field_approveby = "billinappr_by";
	protected $approval_field_approvedate = "billinappr_date";
	protected $approval_field_decline = "billinappr_isdeclined";
	protected $approval_field_declineby = "billinappr_declinedby";
	protected $approval_field_declinedate = "billinappr_declineddate";
	protected $approval_field_notes = "billinappr_notes";
	protected $approval_field_version = "billin_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*billin*/.txt";
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