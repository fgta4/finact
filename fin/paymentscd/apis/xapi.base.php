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
 * finact/fin/paymentscd/apis/xapi.base.php
 *
 * paymentscdBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul paymentscd
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
class paymentscdBase extends WebAPI {

	protected $main_tablename = "trn_paymentscd";
	protected $main_primarykey = "paymentscd_id";
	protected $main_field_version = "paymentscd_version";	
	
	protected $field_iscommit = "paymentscd_iscommit";
	protected $field_commitby = "paymentscd_commitby";
	protected $field_commitdate = "paymentscd_commitdate";		
			
	
	protected $fields_isapprovalprogress = "paymentscd_isapprovalprogress";			
	protected $field_isapprove = "paymentscd_isapproved";
	protected $field_approveby = "paymentscd_approveby";
	protected $field_approvedate = "paymentscd_approvedate";
	protected $field_isdecline = "paymentscd_isdeclined";
	protected $field_declineby = "paymentscd_declineby";
	protected $field_declinedate = "paymentscd_declinedate";

	protected $approval_tablename = "trn_paymentscdappr";
	protected $approval_primarykey = "paymentscdappr_id";
	protected $approval_field_approve = "paymentscdappr_isapproved";
	protected $approval_field_approveby = "paymentscdappr_by";
	protected $approval_field_approvedate = "paymentscdappr_date";
	protected $approval_field_decline = "paymentscdappr_isdeclined";
	protected $approval_field_declineby = "paymentscdappr_declinedby";
	protected $approval_field_declinedate = "paymentscdappr_declineddate";
	protected $approval_field_notes = "paymentscdappr_notes";
	protected $approval_field_version = "paymentscd_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*paymentscd*/.txt";
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