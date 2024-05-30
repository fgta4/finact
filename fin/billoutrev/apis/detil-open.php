<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/billoutrev/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} billoutrev (trn_billout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2021
 */
$API = new class extends billoutrevBase {

	public function execute($options) {
		$tablename = 'trn_billoutdetil';
		$primarykey = 'billoutdetil_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"billoutdetil_id" => " billoutdetil_id = :billoutdetil_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_billoutdetil A', [
				'billoutdetil_id', 'billrowtype_id', 'taxtype_id', 'billoutdetil_descr', 'curr_id', 'billoutdetil_valfrg', 'billoutdetil_valfrgrate', 'billoutdetil_validr', 'itemclass_id', 'coa_id', 'billoutdetil_validr_ori', 'billoutdetil_validr_rev', 'billoutdetil_validr_var', 'billoutdetil_rev_descr', 'rev_coa_id', 'periodemo_id', 'billoutdetil_bookdate', 'billout_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$record['periodemo_id'] = date("Ym");
			$record['billoutdetil_bookdate'] =  date("d/m/Y");
			$record['billoutdetil_validr_ori'] = $record['billoutdetil_validr'];


			if (((float)$record['billoutdetil_validr_rev'])==0) {
				$record['billoutdetil_validr_rev'] = $record['billoutdetil_validr'];
			}

			
			$result->record = array_merge($record, [
				'billoutdetil_bookdate' => date("d/m/Y", strtotime($record['billoutdetil_bookdate'])),
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'billrowtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billrowtype_id'], $this->db, 'mst_billrowtype', 'billrowtype_id', 'billrowtype_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'rev_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['rev_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				



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