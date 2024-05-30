<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends inquiryBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();

		try {
		
		
			
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'itemclass_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'projbudget_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'exclude_inquirydetil_id', '');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') ",
					"itemclass_id" => null,
					"projbudget_id" => null,
					"inquiry_id" => null,
					"exclude_inquirydetil_id" => null
				]
			);


			// result to: TEMP_BUDGET_AVAILABLE
			$stmt = $this->db->prepare("call itemclass_get_projbudget_available(:itemclass_id, :projbudget_id, :inquiry_id, :exclude_inquirydetil_id)");
			$stmt->execute([
				':itemclass_id' => $options->criteria->itemclass_id,
				':projbudget_id' => $options->criteria->projbudget_id, 
				':inquiry_id' => $options->criteria->inquiry_id,
				':exclude_inquirydetil_id' =>  $options->criteria->exclude_inquirydetil_id
			]);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;
			$stmt = $this->db->prepare("select count(*) as n from TEMP_BUDGET_AVAILABLE A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.itemclass_id, A.projbudget_id, A.exclude_inquirydetil_id 
				, A.projbudgetdet_id, A.accbudget_id, A.accbudget_name, A.coa_id, A.coa_name
				, A.budget_qty_available, A.budget_days_available, A.budget_task_available, A.budget_available
				, A.inquirytype_isuseqty, A.inquirytype_isusedays, A.inquirytype_isusetask
				, A.inquirytype_islimitqty, A.inquirytype_islimitdays, A.inquirytype_islimittask, A.inquirytype_islimitvalue
				, A.inquirytype_isallowoverbudget, A.inquirytype_isallowunbudget
				, B.itemclass_isadvproces
				from mst_itemclass B left join TEMP_BUDGET_AVAILABLE A on A.itemclass_id = B.itemclass_id
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				// 'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta',
					'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'view_projbudgetdetacc', 'projbudgetdet_id', 'projbudgetdet_descr'),
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