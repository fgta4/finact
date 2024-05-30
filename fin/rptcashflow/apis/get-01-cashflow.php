<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends reportBase {
	function __construct() {
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
	}


	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			$totalrecord = 0;

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// // $options->criteria'
			$date = (\DateTime::createFromFormat('d/m/Y',$options->criteria->dt))->format('Y-m-d');
			$cacheid = \uniqid();


			// // Geneate Summary Data into Cache
			$sql = "
				CALL cashflow_summary_idr_all(:date, :cacheid, 'summary', NULL, NULL, NULL)
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':date'=>$date, ':cacheid'=>$cacheid]);		


			$sql = "
				SELECT COUNT(cache_rownumber) as totalrecord
				FROM xhc_cashflowsummary
				WHERE
				cache_id = :cacheid
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':cacheid'=>$cacheid]);		
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
			$totalrecord = $row['totalrecord'];

			
			$records = array();
			$cacheinfo = (object)[
				'totalrecord' => $totalrecord,
				'pagesize' => 100,
				'cacheid' => $cacheid
			];

			// kembalikan hasilnya
			$result->total = 1;
			$result->offset = 1;
			$result->maxrow = 1;
			$result->records = $records;
			$result->cacheinfo = $cacheinfo;

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


