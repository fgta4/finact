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

			$jurnaltypecoa_position_query = "";
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'jurnaltypecoa_position', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'jurnaltype_id', 'MAN-JV');
			if ($options->criteria->jurnaltype_id != 'MAN-JV') {
				if (strtoupper($options->criteria->jurnaltypecoa_position)=='K') {
					$options->criteria->jurnaltypecoa_position = 1;
					$jurnaltypecoa_position_query = " A.jurnaltypecoa_iskredit = :jurnaltypecoa_position ";
				} else if (strtoupper($options->criteria->jurnaltypecoa_position)=='D') {
					$options->criteria->jurnaltypecoa_position = 1;
					$jurnaltypecoa_position_query = " A.jurnaltypecoa_isdebet = :jurnaltypecoa_position ";
				} else {
					unset($options->criteria->jurnaltypecoa_position);
				}
			} else {
				unset($options->criteria->jurnaltypecoa_position);
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.coa_id LIKE CONCAT('%', :search, '%') OR A.coa_name LIKE CONCAT('%', :search, '%') ",
					"jurnaltype_id" => " A.jurnaltype_id = :jurnaltype_id ",
					"jurnaltypecoa_position" => $jurnaltypecoa_position_query
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from view_coa_byjurnaltype A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				coa_id, coa_name, coa_isdisabled, coagroup_id, coamodel_id, coatype_id
				from view_coa_byjurnaltype A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			
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
					'coagroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['coagroup_id'], $this->db, 'mst_coagroup', 'coagroup_id', 'coagroup_name'),
					'coamodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['coamodel_id'], $this->db, 'mst_coamodel', 'coamodel_id', 'coamodel_name'),
					'coatype_name' => \FGTA4\utils\SqlUtility::Lookup($record['coatype_id'], $this->db, 'mst_coatype', 'coatype_id', 'coatype_name'),
					 
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