<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends paymentBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();

		try {
		
			
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$this->log($options->criteria);
			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'item_isdisabled', '0');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billin_id LIKE CONCAT('%', :search, '%') OR A.billin_id LIKE CONCAT('%', :search, '%') ",
					"billtype_id" => " B.billtype_id = :billtype_id "
				]
			);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n from 
					trn_billinpaym A inner join trn_billin B on A.billin_id = B.billin_id
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.billinpaym_id,
				A.billinpaym_descr,
				A.billinpaym_itemidr + A.billinpaym_ppnidr - A.billinpaym_pphidr as billinpaym_total,
				A.billinpaym_itemfrg + A.billinpaym_ppnfrg - A.billinpaym_pphfrg as billinpaym_totalfrg,
				A.curr_id ,
				A.billinpaym_frgrate as curr_rate,
				B.partner_id,
				B.billin_id,
				B.billin_descr
				from 
				trn_billinpaym A inner join trn_billin B on A.billin_id = B.billin_id
				" 
				. $where->sql 
				. " order by A.billinpaym_id "
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

				// 'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
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