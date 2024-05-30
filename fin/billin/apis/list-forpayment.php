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


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billin_id LIKE CONCAT('%', :search, '%') OR A.billin_descr LIKE CONCAT('%', :search, '%') ",
					"billin_iscommit" => " A.billin_iscommit = :billin_iscommit",
					"billin_isapproved" => " A.billin_isapproved = :billin_isapproved",
					"billtype_id" => " A.billtype_id = :billtype_id",					
					"dept_id" => " A.dept_id = :dept_id",
					"billtype_exc" => " A.billtype_id <> :billtype_exc",
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_billin A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				billin_id, billin_ref, billin_date, billin_datedue, billin_descr, billin_iscommit,
				billin_isapproved, billtype_id, curr_id, recv_id, orderout_id, 
				dept_id, process_dept_id, doc_id, partner_id, 
				periodemo_id, projbudget_id, projbudgettask_id, trxmodel_id,
				(select sum(billindetil_validr) from trn_billindetil where billin_id = A.billin_id) as billin_validr,
				(select sum(billindetil_valfrg) from trn_billindetil where billin_id = A.billin_id) as billin_valfrg
				from trn_billin A
			" 
			. $where->sql 
			. "order by A.billin_id desc"
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
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'recv_descr' => \FGTA4\utils\SqlUtility::Lookup($record['recv_id'], $this->db, 'trn_recv', 'recv_id', 'recv_descr'),
					'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'process_dept_id' => \FGTA4\utils\SqlUtility::Lookup($record['process_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'view_projbudgettask', 'projbudgettask_id', 'projbudgettask_name'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
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
		if ($curr_id==__LOCAL_CURR) {
			return 1;
		}

		$stmt = $this->db->prepare("
			select currrate_value 
			from mst_currrate 
			where curr_id=:curr_id
			order by currrate_date desc
			limit 1
		");
		$stmt->execute([
			':curr_id' => $curr_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)) {
			return $rows[0]['currrate_value'];
		} else {
			return 1;
		}

	}

}

$API = new DataList();