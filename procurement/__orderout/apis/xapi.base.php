<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/couchdbclient.php';
// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;
use \FGTA4\CouchDbClient;



/**
 * finact/procurement/orderout/apis/xapi.base.php
 *
 * orderoutBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul orderout
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/10/2021
 */
class orderoutBase extends WebAPI {

	protected $main_tablename = "trn_orderout";
	protected $main_primarykey = "orderout_id";
	protected $main_field_version = "orderout_version";	
	
	protected $field_iscommit = "orderout_iscommit";
	protected $field_commitby = "orderout_commitby";
	protected $field_commitdate = "orderout_commitdate";		
			
	
	protected $fields_isapprovalprogress = "orderout_isapprovalprogress";			
	protected $field_isapprove = "orderout_isapproved";
	protected $field_approveby = "orderout_approveby";
	protected $field_approvedate = "orderout_approvedate";
	protected $field_isdecline = "orderout_isdeclined";
	protected $field_declineby = "orderout_declineby";
	protected $field_declinedate = "orderout_declinedate";

	protected $approval_tablename = "trn_orderoutappr";
	protected $approval_primarykey = "orderoutappr_id";
	protected $approval_field_approve = "orderoutappr_isapproved";
	protected $approval_field_approveby = "orderoutappr_by";
	protected $approval_field_approvedate = "orderoutappr_date";
	protected $approval_field_decline = "orderoutappr_isdeclined";
	protected $approval_field_declineby = "orderoutappr_declinedby";
	protected $approval_field_declinedate = "orderoutappr_declineddate";
	protected $approval_field_notes = "orderoutappr_notes";
	protected $approval_field_version = "orderout_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*orderout*/.txt";
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

		$this->cdb = new CouchDbClient((object)DB_CONFIG['FGTAFS']);
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