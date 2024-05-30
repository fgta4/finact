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
 * finact/fin/ofrecv/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header ofrecv (trn_tjurnalor)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/12/2021
 */
$API = new class extends ofrecvBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\ofrecv_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new ofrecv_headerHandler($data, $options);
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
					"search" => " A.jurnal_id LIKE CONCAT('%', :search, '%') OR A.jurnal_descr LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_tjurnalor A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.jurnal_id, A.jurnaltype_id, A.periodemo_id, A.jurnal_date, A.jurnal_ref, A.partner_id, A.temprecv_id, A.billout_id, A.jurnal_descr, A.jurnal_valfrg, A.curr_id, A.jurnal_valfrgrate, A.jurnal_validr, A.paymtype_id, A.bankrekening_id, A.paym_gironum, A.paym_girodate, A.coa_id, A.accfin_id, A.ar_jurnal_id, A.ar_jurnaldetil_id, A.dept_id, A.jurnalsource_id, A.tjurnalor_version, A.tjurnalor_iscommit, A.tjurnalor_commitby, A.tjurnalor_commitdate, A.tjurnalor_ispost, A.tjurnalor_postby, A.tjurnalor_postdate, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_tjurnalor A
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
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'temprecv_descr' => \FGTA4\utils\SqlUtility::Lookup($record['temprecv_id'], $this->db, 'trn_temprecv', 'temprecv_id', 'temprecv_descr'),
					'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'bankrekening_name' => \FGTA4\utils\SqlUtility::Lookup($record['bankrekening_id'], $this->db, 'mst_bankrekening', 'bankrekening_id', 'bankrekening_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'accfin_name' => \FGTA4\utils\SqlUtility::Lookup($record['accfin_id'], $this->db, 'mst_accfin', 'accfin_id', 'accfin_name'),
					'jurnaldetil_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ar_jurnal_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id', 'jurnaldetil_descr'),
					'jurnaldetil_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ar_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id', 'jurnaldetil_descr'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'tjurnalor_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['tjurnalor_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'tjurnalor_postby' => \FGTA4\utils\SqlUtility::Lookup($record['tjurnalor_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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