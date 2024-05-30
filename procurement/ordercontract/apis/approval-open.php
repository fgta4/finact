<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/procurement/ordercontract/apis/approval-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel approval} ordercontract (trn_ordercontract)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/11/2021
 */
$API = new class extends ordercontractBase {

	public function execute($options) {
		$tablename = 'trn_ordercontractappr';
		$primarykey = 'ordercontractappr_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"ordercontractappr_id" => " ordercontractappr_id = :ordercontractappr_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_ordercontractappr A', [
				'ordercontractappr_id', 'ordercontractappr_isapproved', 'ordercontractappr_by', 'ordercontractappr_date', 'ordercontract_version', 'ordercontractappr_isdeclined', 'ordercontractappr_declinedby', 'ordercontractappr_declineddate', 'ordercontractappr_notes', 'ordercontract_id', 'docauth_descr', 'docauth_order', 'docauth_value', 'docauth_min', 'authlevel_id', 'authlevel_name', 'auth_id', 'auth_name', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				
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