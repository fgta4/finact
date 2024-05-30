<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/fin/settl/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header settl (trn_settl)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2021
 */
$API = new class extends settlBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.settl_id LIKE CONCAT('%', :search, '%') OR A.settl_descr LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_settl A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.settl_id, A.settl_ref, A.periodemo_id, A.settl_date, A.billinpaym_id, A.partner_id, A.settl_descr, A.curr_id, A.adv_valfrg, A.adv_valfrgrate, A.adv_validr, A.rmb_valfrg, A.rmb_valfrgrate, A.rmb_validr, A.ret_valfrg, A.ret_valfrgrate, A.ret_validr, A.paym_jurnal_id, A.paym_jurnaldetil_id, A.adv_coa_id, A.dept_id, A.doc_id, A.settl_version, A.settl_iscommit, A.settl_commitby, A.settl_commitdate, A.settl_isapprovalprogress, A.settl_isapproved, A.settl_approveby, A.settl_approvedate, A.settl_isdeclined, A.settl_declineby, A.settl_declinedate, A.settl_ispost, A.settl_postby, A.settl_postdate, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_settl A
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
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'paym_jurnal_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id', 'jurnal_descr'),
					'paym_jurnaldetil_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id', 'jurnaldetil_descr'),
					'adv_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['adv_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'settl_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_postby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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