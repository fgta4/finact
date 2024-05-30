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
 * finact/fin/pettycash/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header pettycash (trn_pettycash)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/04/2022
 */
$API = new class extends pettycashBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\pettycash_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new pettycash_headerHandler($data, $options);
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
			$options->criteria->pettycash_date = (\DateTime::createFromFormat('d/m/Y', $options->criteria->pettycash_date))->format('Y-m-d');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.pettycash_id LIKE CONCAT('%', :search, '%') ",
					"site_id" => " A.site_id = :site_id ",
					"pettycash_date" => " A.pettycash_date = :pettycash_date "

				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_pettycash A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.pettycash_id, A.pettycash_date, A.site_id, A.accpettycash_id, A.pettycash_descr, A.empl_id, A.cust_id, A.pettycash_amount, A.pettycash_value, A.pettycash_version, A.pettycash_iscommit, A.pettycash_commitby, A.pettycash_commitdate, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_pettycash A
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
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'accpettycash_name' => \FGTA4\utils\SqlUtility::Lookup($record['accpettycash_id'], $this->db, 'mst_accpettycash', 'accpettycash_id', 'accpettycash_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'cust_name' => \FGTA4\utils\SqlUtility::Lookup($record['cust_id'], $this->db, 'mst_cust', 'cust_id', 'cust_name'),
					'pettycash_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['pettycash_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]));




			}


			// ambil total
			$sql = "call pettycash_get_bysite(:site_id, :pettycash_date, @a, @b, @c);";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':site_id' => $options->criteria->site_id,
				':pettycash_date' => $options->criteria->pettycash_date
			]);


			$stmt = $this->db->prepare("select @a as awal, @b as mutasi, @c as akhir");
			$stmt->execute();
			$rowsaldo = $stmt->fetch(\PDO::FETCH_ASSOC);

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			$result->saldo = $rowsaldo;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};