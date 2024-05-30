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

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'item_isdisabled', '0');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.item_id LIKE CONCAT('%', :search, '%') OR A.item_name LIKE CONCAT('%', :search, '%') ",
					"item_isdisabled" => " A.item_isdisabled = :item_isdisabled  " ,
					"dept_id" => " A.dept_id = :dept_id ",
					"inquirytype_id" => null
				]
			);

			$this->log($options->criteria);

			$inquirytype_id = $options->criteria->inquirytype_id;
			$this->db->query("
				DROP TABLE IF EXISTS TEMP_INQUIRYITEMCLASS;
				CREATE TEMPORARY TABLE -- IF NOT EXISTS 
					TEMP_INQUIRYITEMCLASS ( INDEX(itemclass_id) ) 
					ENGINE=MyISAM 
				AS (
					select
					itemclass_id
					from
					mst_inquirytypeitemclass
					where
					inquirytype_id = '$inquirytype_id'
				);	
			");

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n from 
					mst_item A inner join TEMP_INQUIRYITEMCLASS B on B.itemclass_id = A.itemclass_id
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.item_id, A.item_name,  A.item_stdcost,  A.itemclass_id
					from mst_item A inner join TEMP_INQUIRYITEMCLASS B on B.itemclass_id = A.itemclass_id
				" 
				. $where->sql 
				. " order by A.item_name "
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