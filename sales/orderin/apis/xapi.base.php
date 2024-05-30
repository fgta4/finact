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
 * finact/sales/orderin/apis/xapi.base.php
 *
 * orderinBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul orderin
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/12/2021
 */
class orderinBase extends WebAPI {

	protected $main_tablename = "trn_orderin";
	protected $main_primarykey = "orderin_id";
	protected $main_field_version = "orderin_version";	
	
	protected $field_iscommit = "orderin_iscommit";
	protected $field_commitby = "orderin_commitby";
	protected $field_commitdate = "orderin_commitdate";		
			
	
	protected $fields_isapprovalprogress = "orderin_isapprovalprogress";			
	protected $field_isapprove = "orderin_isapproved";
	protected $field_approveby = "orderin_approveby";
	protected $field_approvedate = "orderin_approvedate";
	protected $field_isdecline = "orderin_isdeclined";
	protected $field_declineby = "orderin_declineby";
	protected $field_declinedate = "orderin_declinedate";

	protected $approval_tablename = "trn_orderinappr";
	protected $approval_primarykey = "orderinappr_id";
	protected $approval_field_approve = "orderinappr_isapproved";
	protected $approval_field_approveby = "orderinappr_by";
	protected $approval_field_approvedate = "orderinappr_date";
	protected $approval_field_decline = "orderinappr_isdeclined";
	protected $approval_field_declineby = "orderinappr_declinedby";
	protected $approval_field_declinedate = "orderinappr_declineddate";
	protected $approval_field_notes = "orderinappr_notes";
	protected $approval_field_version = "orderin_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*orderin*/.txt";
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