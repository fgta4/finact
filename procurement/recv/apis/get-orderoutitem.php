<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/procurement/orderout/apis/items-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel items orderout (trn_orderout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends recvBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.orderout_id = :id",
					"search" => " A.orderoutitem_descr LIKE CONCAT('%', :search, '%') ",
					"orderout_id" => " A.orderout_id = :orderout_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_orderoutitem A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.orderoutitem_id, A.itemasset_id, A.item_id, A.itemstock_id, A.partner_id, A.itemclass_id, A.orderoutitem_descr, A.orderoutitem_qty, A.orderoutitem_days, A.orderoutitem_task, A.orderoutitem_rate, A.orderoutitem_value, A.curr_id, A.curr_rate, A.orderoutitem_idr, A.projbudgetdet_id, A.orderoutitem_isunbudget, A.orderoutitem_isallowoverbudget, A.orderoutitem_budgetavailable, A.orderoutitem_qtyavailable, A.accbudget_id, A.coa_id, A.request_id, A.requestitem_id, A.inquiry_id, A.inquiryitem_id, A.orderout_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_orderoutitem A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'

					'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
					'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
					'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemstock_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'mst_projbudgetdet', 'projbudgetdet_id', 'projbudgetdet_descr'),
					 
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};