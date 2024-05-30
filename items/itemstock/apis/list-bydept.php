<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}



use \FGTA4\exceptions\WebException;

/**
 * finact/items/itemstock/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header itemstock (mst_itemstock)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/04/2022
 */
$API = new class extends itemstockBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemstock_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemstock_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.itemstock_id LIKE CONCAT('%', :search, '%') OR A.itemstock_code LIKE CONCAT('%', :search, '%') OR A.itemstock_name LIKE CONCAT('%', :search, '%') ",
					"dept_id" => null, //" A.dept_id = :dept_id",
					"itemgroup_id" => " B.itemgroup_path LIKE CONCAT('%', :itemgroup_id, '%')  "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_itemstock A left join mst_itemgroup B on B.itemgroup_id=A.itemgroup_id" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.itemstock_id, A.itemstock_code, A.itemstock_name, A.itemstock_nameshort, 
				A.itemstock_ref, A.itemstock_refname, A.itemstock_isdisabled, A.itemstock_ishascompound, 
				A.unitmeasurement_id, A.itemstock_sellprice, 
				A.itemstock_estcost, A.itemstock_lastqty, A.itemstock_lastqtyupdate, A.itemstock_lastrecvid, A.itemstock_lastrecvdate, A.itemstock_lastrecvqty, A.itemstock_lastcost, A.itemstock_lastcostdate, A.itemgroup_id, A.itemctg_id, A.itemclass_id, A.dept_id
				from mst_itemstock A left join mst_itemgroup B on B.itemgroup_id=A.itemgroup_id
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$beforeloopdata = new \stdClass;
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListBeforeLoop')) {
					$beforeloopdata = $hnd->DataListBeforeLoop((object[]));
				}
			}

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						$hnd->DataListLooping($record, $beforeloopdata);
					}
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),
					'itemgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemgroup_id'], $this->db, 'mst_itemgroup', 'itemgroup_id', 'itemgroup_name'),
					'itemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemctg_id'], $this->db, 'mst_itemctg', 'itemctg_id', 'itemctg_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					 
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