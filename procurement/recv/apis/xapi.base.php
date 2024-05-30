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
 * finact/procurement/recv/apis/xapi.base.php
 *
 * recvBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul recv
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
class recvBase extends WebAPI {

	protected $main_tablename = "trn_recv";
	protected $main_primarykey = "recv_id";
	protected $main_field_version = "recv_version";	
	
	protected $field_iscommit = "recv_iscommit";
	protected $field_commitby = "recv_commitby";
	protected $field_commitdate = "recv_commitdate";		
			
	



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*recv*/.txt";
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


	public function check_coa($id, $currentdata) {
		try {
			$partner_id = $currentdata->header->partner_id;
			$partner =  \FGTA4\utils\SqlUtility::LookupRow($partner_id, $this->db, 'mst_partner', 'partner_id');
			$partnertype = \FGTA4\utils\SqlUtility::LookupRow($partner['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id');


			// $this->log($partnertype);
			$unbill_coa_id = $partnertype['unbill_coa_id'];
			$payable_coa_id = $partnertype['payable_coa_id'];
			

			if ($unbill_coa_id=='' || $payable_coa_id ='') {
				$partner_name = $partner['partner_name'];
				$partnertype_name = $partnertype['partnertype_name'];
				throw new \Exception("[ERROR] Coa unbill/payable untuk partner $partner_name ($partnertype_name) belum di set.");
			}

			$currentdata->coa->unbill_coa_id = $unbill_coa_id;
			$currentdata->coa->payable_coa_id = $payable_coa_id;


			$coaunbill =  \FGTA4\utils\SqlUtility::LookupRow($unbill_coa_id, $this->db, 'mst_coa', 'coa_id');
			$coapayable =  \FGTA4\utils\SqlUtility::LookupRow($payable_coa_id, $this->db, 'mst_coa', 'coa_id');
			$currentdata->coa->unbill_coa_nameshort = $coaunbill['coa_nameshort'];
			$currentdata->coa->payable_coa_nameshort = $coapayable['coa_nameshort'];


			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}