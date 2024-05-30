<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/fin/settl/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header settl (trn_settl)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2021
 */
$API = new class extends settlBase {
	
	public function execute($options) {
		$tablename = 'trn_settl';
		$primarykey = 'settl_id';
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
					"settl_id" => " settl_id = :settl_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_settl A', [
				  'settl_id', 'settl_ref', 'periodemo_id', 'settl_date', 'billinpaym_id', 'partner_id', 'settl_descr', 'curr_id'
				, 'adv_valfrg', 'adv_valfrgrate', 'adv_validr', 'rmb_valfrg', 'rmb_valfrgrate', 'rmb_validr', 'ret_valfrg', 'ret_valfrgrate', 'ret_validr'
				, 'inquiry_id', 'paym_jurnal_id', 'paym_jurnaldetil_id', 'adv_coa_id', 'dept_id', 'doc_id', 'settl_version', 'settl_iscommit', 'settl_commitby', 'settl_commitdate', 'settl_isapprovalprogress', 'settl_isapproved', 'settl_approveby', 'settl_approvedate', 'settl_isdeclined', 'settl_declineby', 'settl_declinedate', 'settl_ispost', 'settl_postby', 'settl_postdate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
			$billinpaym = \FGTA4\utils\SqlUtility::LookupRow($record['billinpaym_id'], $this->db, 'trn_billinpaym', 'billinpaym_id');
			$jurnal = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id');
			$jurnaldetil = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id');


			$result->record = array_merge($record, [
				'settl_date' => date("d/m/Y", strtotime($record['settl_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'billinpaym_caption' => "[".$billinpaym['billin_id']."] " . $billinpaym['billinpaym_descr'],
				
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'paym_jurnal_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id', 'jurnal_descr'),
				'paym_jurnal_caption' => "[".$jurnal['jurnal_id']."] " . $jurnal['jurnal_descr'],

				'paym_jurnaldetil_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id', 'jurnaldetil_descr'),
				'paym_jurnaldetil_caption' =>  "[".$jurnaldetil['jurnaldetil_id']."] " . $jurnaldetil['jurnaldetil_descr'],

				'adv_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['adv_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'settl_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'settl_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'settl_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'settl_postby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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