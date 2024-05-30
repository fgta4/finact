<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/billin/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} billin (trn_billin)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/05/2021
 */
$API = new class extends billinBase {

	public function execute($options) {
		$tablename = 'trn_billindetil';
		$primarykey = 'billindetil_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			






			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"billindetil_id" => " billindetil_id = :billindetil_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_billindetil A', [
				  'billindetil_id', 'rowitem_id', 'taxtype_id', 'itemclass_id', 'projbudgetdet_id', 'billindetil_descr', 'billindetil_valfrg', 'curr_id'
				, 'billindetil_valfrgrate', 'billindetil_validr', 'billindetil_valavailable', 'projbudget_id', 'projbudgettask_id', 'accbudget_id'
				, 'coa_id', 'billin_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$projbudget_id = $record['projbudget_id'];
			$in_exclude_billingdetil_id =  $record['billindetil_id'];
			$stmt = $this->db->prepare("call projbudget_get_available(:projbudget_id, :in_exclude_billingdetil_id)");
			$stmt->execute([
				':projbudget_id' => $projbudget_id,
				':in_exclude_billingdetil_id' => $in_exclude_billingdetil_id
			]);

			$result->record = array_merge($record, [
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'rowtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['rowitem_id'], $this->db, 'mst_rowtype', 'rowtype_id', 'rowtype_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'view_projbudgetacc', 'projbudgetdet_id', 'projbudgetdet_descr'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
				'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_name'),
				'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'billindetil_valavailable' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'TEMP_PROJBUDGET_AVAILABLE', 'projbudgetdet_id', 'projbudgetdet_available'),

				
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