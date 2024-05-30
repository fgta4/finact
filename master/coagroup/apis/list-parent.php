<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/master/coagroup/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header coagroup (mst_coagroup)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/12/2021
 */
$API = new class extends coagroupBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'coagroup_isparent', '1');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'coagroup_isdisabled', '0');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.coagroup_id LIKE CONCAT('%', :search, '%') OR A.coagroup_name LIKE CONCAT('%', :search, '%') ",
					"coagroup_isparent" => " A.coagroup_isparent = :coagroup_isparent ",
					"coagroup_isdisabled" => " A.coagroup_isdisabled = :coagroup_isdisabled ",
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_coagroup A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.coagroup_id
				, A.coagroup_id as coagroup_parent, A.coagroup_name as coagroup_parent_name
				, A.coamodel_id, A.coareport_id 
				from mst_coagroup A
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
					'coamodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['coamodel_id'], $this->db, 'mst_coamodel', 'coamodel_id', 'coamodel_name'),
					'coareport_name' => \FGTA4\utils\SqlUtility::Lookup($record['coareport_id'], $this->db, 'mst_coareport', 'coareport_id', 'coareport_name'),
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