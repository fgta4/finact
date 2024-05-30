<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/banklink/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} banklink (trn_bankbook)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/11/2021
 */
$API = new class extends banklinkBase {

	public function execute($options) {
		$tablename = 'trn_bankbookdetil';
		$primarykey = 'bankbookdetil_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"bankbookdetil_id" => " bankbookdetil_id = :bankbookdetil_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_bankbookdetil A', [
				'bankbookdetil_id', 'bankbookdetil_ref', 'bankbookdetil_valfrgd', 'bankbookdetil_valfrgk', 'bankbookdetil_valfrgsaldo', 'bankbookdetil_validrd', 'bankbookdetil_validrk', 'bankbookdetil_validrsaldo', 'bankbookdetil_notes', 'jurnal_id', 'acc_fin', 'bankbook_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'jurnal_descr' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id', 'jurnal_descr'),
				'accfin_name' => \FGTA4\utils\SqlUtility::Lookup($record['acc_fin'], $this->db, 'mst_accfin', 'accfin_id', 'accfin_name'),
				
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