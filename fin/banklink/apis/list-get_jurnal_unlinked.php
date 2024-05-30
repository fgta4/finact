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

			$options->criteria->unlinked = '';
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.jurnal_id LIKE CONCAT('%', :search, '%') OR A.jurnal_id LIKE CONCAT('%', :search, '%') OR A.jurnal_descr LIKE CONCAT('%', :search, '%') ",
					"bankrekening_id" => " B.bankrekening_id = :bankrekening_id ",
					"unlinked" => " C.jurnal_id is null "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select 
				count(*) as n
				from 
				trn_jurnal A inner join trn_jurextpv B on B.jurnal_id = A.jurnal_id
							left join trn_bankbookdetil C on C.jurnal_id = A.jurnal_id 
				" 
				. $where->sql
			);

			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.jurnal_id , 
				A.jurnal_descr,
				A.jurnal_date,
				B.bankrekening_id,
				B.accfin_id, 
				A.curr_id, 
				(select jurnaldetil_valfrg from trn_jurnaldetil where jurnaldetil_id = B.paym_jurnaldetil_id) as jurnaldetil_valfrg,
				(select jurnaldetil_validr from trn_jurnaldetil where jurnaldetil_id = B.paym_jurnaldetil_id) as jurnaldetil_validr
				from 
				trn_jurnal A inner join trn_jurextpv B on B.jurnal_id = A.jurnal_id
				             left join trn_bankbookdetil C on C.jurnal_id = A.jurnal_id  

				-- union
				-- yang OR

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
					'jurnal_dt' => date("d/m/y", strtotime($record['jurnal_date'])),
					'accfin_name' =>  \FGTA4\utils\SqlUtility::Lookup($record['accfin_id'], $this->db, 'mst_accfin', 'accfin_id', 'accfin_name'),
				 	//'tambahan' => 'dta'
		 
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