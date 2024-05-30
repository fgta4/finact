<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


/**
 * finact/acct/jurnal/apis/xtion-preparedata.php
 */
$API = new class extends rptledgersummaryBase {

	public function execute($param) {
		$userdata = $this->auth->session_get_user();

		$cacheid = $param->cacheid;
		$limit = $param->limit;
		$offset = $param->offset;

		try {
			$sql = "
				select * from xhc_aging_apar where cache_id=:cacheid order by cache_rownumber limit $offset, $limit
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':cacheid'=>$cacheid]);
			$rows = $stmt->fetchall();

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$records[] = $record; 
			}

			return (object)[
				'success' => true,
				'records' => $records
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


