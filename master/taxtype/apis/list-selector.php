<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/master/taxtype/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header taxtype (mst_taxtype)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/05/2021
 */
$API = new class extends taxtypeBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.taxtype_id LIKE CONCAT('%', :search, '%') OR A.taxtype_name LIKE CONCAT('%', :search, '%') ",
					"taxmodel_id" => " A.taxmodel_id = :taxmodel_id  "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_taxtype A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				taxtype_id, taxtype_name, taxtype_include, taxtype_descr, taxtype_value, taxmodel_id, billin_coa_id, billout_coa_id, _createby, _createdate, _modifyby, _modifydate 
				from mst_taxtype A
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
					'taxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxmodel_id'], $this->db, 'mst_taxmodel', 'taxmodel_id', 'taxmodel_name'),
					'billin_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['billin_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'billout_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['billout_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					 
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