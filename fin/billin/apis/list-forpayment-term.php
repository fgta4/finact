<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/apps/ent/general/curr/libs/currency.lib.php';



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


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billinpaym_id LIKE CONCAT('%', :search, '%') OR A.billinpaym_descr LIKE CONCAT('%', :search, '%') ",
					'billin_id' => " A.billin_id = :billin_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_billinpaym A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				billinpaym_id,
				curr_id,
				billinpaym_descr,
				billinpaym_itemfrg,
				billinpaym_itemidr,
				billinpaym_ppnfrg,
				billinpaym_pphidr,
				billinpaym_pphfrg,
				billinpaym_pphidr,
				(billinpaym_itemfrg+billinpaym_ppnfrg+billinpaym_pphfrg) as billinpaym_totalfrg,
				(billinpaym_itemidr+billinpaym_ppnidr+billinpaym_pphidr) as billinpaym_totalidr
				from trn_billinpaym A
			" 
			. $where->sql 
			. $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			//print_r(\FGTA4\utils\SqlUtility::sql_debug($stmt->queryString, $where->params));
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'curr_islocal' => $record['curr_id'] == __LOCAL_CURR ? 1 : 0,
					'curr_rate' => $this-> getCurrentRate($record['curr_id'])
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

	function getCurrentRate($curr_id) {
		$curr = new \FGTA4\libs\ent\general\curr\Currency;
		return $curr::getCurrentRate($this->db, $curr_id);
	}

}

$API = new DataList();