<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


$API = new class extends billinBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {


			$projbudget_id = $options->criteria->projbudget_id;
			$in_exclude_billingdetil_id =  $options->criteria->in_exclude_billingdetil_id;

			$stmt = $this->db->prepare("call projbudget_get_available(:projbudget_id, :in_exclude_billingdetil_id)");
			$stmt->execute([
				':projbudget_id' => $projbudget_id,
				':in_exclude_billingdetil_id' => $in_exclude_billingdetil_id
			]);

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.projbudgetdet_id LIKE CONCAT('%', :search, '%') OR A.projbudgetdet_descr LIKE CONCAT('%', :search, '%') ",
					"projbudget_id" => " A.projbudget_id = :projbudget_id",
					"itemclass_id" => " A.accbudget_id IN (select accbudget_id from mst_itemclass where itemclass_id = :itemclass_id)  " ,
					"in_exclude_billingdetil_id" => null
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_projbudgetdet A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  projbudgetdet_id, projbudgetdet_descr, projbudgetdet_qty, projbudgetdet_days, projbudgetdet_task, projbudgetdet_rate
				, projbudgetdet_value, accbudget_id 
				from mst_projbudgetdet A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$accbudget = \FGTA4\utils\SqlUtility::LookupRow($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id');
				
				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'projbudgetdet_descr' => $accbudget['accbudget_name'],
					'projbudgetdet_available' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'TEMP_PROJBUDGET_AVAILABLE', 'projbudgetdet_id', 'projbudgetdet_available'),
					'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudgeT_id', 'accbudget_name'),
					'coa_id' => $accbudget['coa_id'],
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($accbudget['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
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