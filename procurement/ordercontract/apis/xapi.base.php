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
 * finact/procurement/ordercontract/apis/xapi.base.php
 *
 * ordercontractBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul ordercontract
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/11/2021
 */
class ordercontractBase extends WebAPI {

	protected $main_tablename = "trn_ordercontract";
	protected $main_primarykey = "ordercontract_id";
	protected $main_field_version = "ordercontract_version";	
	
	protected $field_iscommit = "ordercontract_iscommit";
	protected $field_commitby = "ordercontract_commitby";
	protected $field_commitdate = "ordercontract_commitdate";		
			
	
	protected $fields_isapprovalprogress = "ordercontract_isapprovalprogress";			
	protected $field_isapprove = "ordercontract_isapproved";
	protected $field_approveby = "ordercontract_approveby";
	protected $field_approvedate = "ordercontract_approvedate";
	protected $field_isdecline = "ordercontract_isdeclined";
	protected $field_declineby = "ordercontract_declineby";
	protected $field_declinedate = "ordercontract_declinedate";

	protected $approval_tablename = "trn_ordercontractappr";
	protected $approval_primarykey = "ordercontractappr_id";
	protected $approval_field_approve = "ordercontractappr_isapproved";
	protected $approval_field_approveby = "ordercontractappr_by";
	protected $approval_field_approvedate = "ordercontractappr_date";
	protected $approval_field_decline = "ordercontractappr_isdeclined";
	protected $approval_field_declineby = "ordercontractappr_declinedby";
	protected $approval_field_declinedate = "ordercontractappr_declineddate";
	protected $approval_field_notes = "ordercontractappr_notes";
	protected $approval_field_version = "ordercontract_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*ordercontract*/.txt";
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