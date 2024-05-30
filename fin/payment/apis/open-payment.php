<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/fin/payment/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header payment (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/05/2021
 */
$API = new class extends paymentBase {
	
	public function execute($options) {
		$tablename = 'view_jurnalpv';
		$primarykey = 'jurnal_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"jurnal_id" => " jurnal_id = :jurnal_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('view_jurnalpv A', [
				  'jurnal_id', 'billin_id', 'billinpaym_id',  'partner_id', 'dept_id', 'paymtype_id'
				, 'paymto_name', 'paymto_bankacc', 'paymto_bankaccname', 'paymto_bankname'
				, 'paymto_upname', 'paymto_upposition', 'paymto_upphone'
				, 'paymto_gironum', 'paymto_girodate'
				, 'bankrekening_id', 'accfin_id', 'coa_id'
				, 'curr_id', 'jurnal_valfrg', 'jurnal_valfrgrate', 'jurnal_validr'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'billin_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billin_id'], $this->db, 'trn_billin', 'billin_id', 'billin_descr'),
				'billinpaym_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billinpaym_id'], $this->db, 'trn_billinpaym', 'billinpaym_id', 'billinpaym_descr'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
			]);

		

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};