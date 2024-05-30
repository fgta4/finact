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
 * finact/procurement/inquiry-gen/apis/xapi.base.php
 *
 * inquiry-genBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul inquiry-gen
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/10/2021
 */
class inquiry-genBase extends WebAPI {

	protected $main_tablename = "trn_inquiry";
	protected $main_primarykey = "inquiry_id";
	protected $main_field_version = "inquiry_version";	
	
	protected $field_iscommit = "inquiry_iscommit";
	protected $field_commitby = "inquiry_commitby";
	protected $field_commitdate = "inquiry_commitdate";		
			
	
	protected $fields_isapprovalprogress = "inquiry_isapprovalprogress";			
	protected $field_isapprove = "inquiry_isapproved";
	protected $field_approveby = "inquiry_approveby";
	protected $field_approvedate = "inquiry_approvedate";
	protected $field_isdecline = "inquiry_isdeclined";
	protected $field_declineby = "inquiry_declineby";
	protected $field_declinedate = "inquiry_declinedate";

	protected $approval_tablename = "trn_inquiryappr";
	protected $approval_primarykey = "inquiryappr_id";
	protected $approval_field_approve = "inquiryappr_isapproved";
	protected $approval_field_approveby = "inquiryappr_by";
	protected $approval_field_approvedate = "inquiryappr_date";
	protected $approval_field_decline = "inquiryappr_isdeclined";
	protected $approval_field_declineby = "inquiryappr_declinedby";
	protected $approval_field_declinedate = "inquiryappr_declineddate";
	protected $approval_field_notes = "inquiryappr_notes";
	protected $approval_field_version = "inquiry_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*inquiry-gen*/.txt";
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