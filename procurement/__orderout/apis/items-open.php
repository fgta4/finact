<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/procurement/orderout/apis/items-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items} orderout (trn_orderout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/10/2021
 */
$API = new class extends orderoutBase {

	public function execute($options) {
		$tablename = 'trn_orderoutitem';
		$primarykey = 'orderoutitem_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"orderoutitem_id" => " orderoutitem_id = :orderoutitem_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_orderoutitem A', [
				'orderoutitem_id', 'itemasset_id', 'item_id', 'itemstock_id', 'partner_id', 'itemclass_id', 'orderoutitem_descr', 'orderoutitem_qty', 'orderoutitem_days', 'orderoutitem_task', 'orderoutitem_rate', 'orderoutitem_value', 'curr_id', 'curr_rate', 'orderoutitem_idr', 'projbudgetdet_id', 'orderoutitem_isoverbudget', 'orderoutitem_isunbudget', 'orderoutitem_budgetavailable', 'orderoutitem_budgetqtyavailable', 'orderoutitem_budgetdaysavailable', 'orderoutitem_budgettaskavailable', 'orderoutitem_isuseqty', 'orderoutitem_isusedays', 'orderoutitem_isusetask', 'orderoutitem_islimitqty', 'orderoutitem_islimitdays', 'orderoutitem_islimittask', 'orderoutitem_islimitvalue', 'orderoutitem_isallowoverbudget', 'orderoutitem_isallowunbudget', 'orderoutitem_qtyavailable', 'accbudget_id', 'coa_id', 'request_id', 'requestitem_id', 'inquiry_id', 'inquiryitem_id', 'orderout_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
				'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
				'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemstock_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'view_projbudgetdetacc', 'projbudgetdet_id', 'projbudgetdet_descr'),
				
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