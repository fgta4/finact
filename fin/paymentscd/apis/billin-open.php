<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/paymentscd/apis/billin-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel billin} paymentscd (trn_paymentscd)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
$API = new class extends paymentscdBase {

	public function execute($options) {
		$tablename = 'trn_paymentscdbillin';
		$primarykey = 'paymentscdbillin_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"paymentscdbillin_id" => " paymentscdbillin_id = :paymentscdbillin_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_paymentscdbillin A', [
				'paymentscdbillin_id', 'billinpaym_id', 'billinpaym_date', 'billinpaym_datescd', 'billinpaym_descr', 'curr_id'
				, 'billinpaym_frgrate', 'billinpaym_itemfrg', 'billinpaym_itemidr', 'billinpaym_ppnfrg', 'billinpaym_ppnidr', 'billinpaym_pphfrg', 'billinpaym_pphidr'
				, 'bankrekening_id', 'acc_fin'
				, 'billin_id', 'paymentscd_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'billinpaym_date' => date("d/m/Y", strtotime($record['billinpaym_date'])),
				'billinpaym_datescd' => date("d/m/Y", strtotime($record['billinpaym_datescd'])),
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'billinpaym_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billinpaym_id'], $this->db, 'trn_billinpaym', 'billinpaym_id', 'billinpaym_descr'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				
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