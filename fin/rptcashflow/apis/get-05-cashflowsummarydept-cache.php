<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


$API = new class extends reportBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();

		try {

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"cache_id" => " A.cache_id = :cache_id"
				]
			);

			$result = new \stdClass; 
			$maxrow = (property_exists($options, 'maxrow')) ? $options->maxrow : 100;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;
			$total = (property_exists($options, 'totalrecord')) ? $options->totalrecord : 0;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					SELECT *
					FROM 
					xhc_cashflowsummary A	" 
				. $where->sql 
				. ' order by A.cache_rownumber asc  ' 
				. $limit
			);
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