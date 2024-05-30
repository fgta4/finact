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

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'partner_isdisabled', '0');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'inquirytype_id', '0');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.partner_id LIKE CONCAT('%', :search, '%') OR A.partner_name LIKE CONCAT('%', :search, '%') ",
					"partner_isdisabled" => " A.partner_isdisabled = :partner_isdisabled  " ,
					"inquirytype_id" => " C.inquirytype_id = :inquirytype_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n 
					from mst_inquirytype C inner join mst_inquirytypepartnertype B on B.inquirytype_id = C.inquirytype_id 
										   inner join mst_partner A on A.partnertype_id = B.partnertype_id  
										   inner join mst_partnertype D on D.partnertype_id = A.partnertype_id 					
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.partner_id , A.partner_name, D.itemclass_id 
					, A.partnertype_id
					from mst_inquirytype C inner join mst_inquirytypepartnertype B on B.inquirytype_id = C.inquirytype_id 
										   inner join mst_partner A on A.partnertype_id = B.partnertype_id  
										   inner join mst_partnertype D on D.partnertype_id = A.partnertype_id 
					
				" 
				. $where->sql 
				. " order by A.partner_name "
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
					 'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					 'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
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