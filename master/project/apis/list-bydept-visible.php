<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
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
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'dept_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'isdisabled', '0');

			$dept_id = $options->criteria->dept_id;

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.project_id LIKE CONCAT('%', :search, '%') OR A.project_name LIKE CONCAT('%', :search, '%') ",
					"isdisabled" => " A.project_isdisabled = :isdisabled",
					"dept_id" => null,
				]
			);


			/* prepare data */
			$stmt = $this->db->prepare("call project_get_bydept (:dept_id);");
			$stmt->execute([':dept_id' => $dept_id]);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from TEMP_RESULT A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.project_id, A.project_name, A.project_descr, A.project_isdisabled, A.projecttype_id, A.dept_id
					from TEMP_RESULT A
				" 
				. $where->sql 
				. " order by A.project_name "
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
					'projecttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttype_id'], $this->db, 'mst_projecttype', 'projecttype_id', 'projecttype_name'),
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

}

$API = new DataList();