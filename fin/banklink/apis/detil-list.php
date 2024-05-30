<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/fin/banklink/apis/detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil banklink (trn_bankbook)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/11/2021
 */
$API = new class extends banklinkBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.bankbook_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_bankbookdetil A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.bankbookdetil_id, A.bankbookdetil_ref, A.bankbookdetil_valfrgd, A.bankbookdetil_valfrgk, A.bankbookdetil_valfrgsaldo, A.bankbookdetil_validrd, A.bankbookdetil_validrk, A.bankbookdetil_validrsaldo, A.bankbookdetil_notes, A.jurnal_id, A.acc_fin, A.bankbook_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				, (select bankbook_date from trn_bankbook where bankbook_id=A.bankbook_id) as dt
				from trn_bankbookdetil A
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
					'bankbook_date' => date("d/m/y", strtotime($record['dt'])),
					'jurnal_descr' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id', 'jurnal_descr'),
					'accfin_name' => \FGTA4\utils\SqlUtility::Lookup($record['acc_fin'], $this->db, 'mst_accfin', 'accfin_id', 'accfin_name'),
					 
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