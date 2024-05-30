<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/sales/orderin/apis/terms-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel terms} orderin (trn_orderin)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/12/2021
 */
$API = new class extends orderinBase {

	public function execute($options) {
		$tablename = 'trn_orderinterm';
		$primarykey = 'orderinterm_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"orderinterm_id" => " orderinterm_id = :orderinterm_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_orderinterm A', [
				'orderinterm_id', 'orderintermtype_id', 'orderinterm_descr', 'orderinterm_days', 'orderinterm_dtfrometa', 'orderinterm_dt', 'orderinterm_isdp', 'orderinterm_paymentpercent', 'orderinterm_payment', 'orderin_totalpayment', 'orderin_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'orderinterm_dtfrometa' => date("d/m/Y", strtotime($record['orderinterm_dtfrometa'])),
				'orderinterm_dt' => date("d/m/Y", strtotime($record['orderinterm_dt'])),
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'orderintermtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderintermtype_id'], $this->db, 'mst_orderintermtype', 'orderintermtype_id', 'orderintermtype_name'),
				
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