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
 * finact/fin/pettycashsaldo/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header pettycashsaldo (trn_pettycashsaldo)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/04/2022
 */
$API = new class extends pettycashsaldoBase {
	
	public function execute($options) {
		$tablename = 'trn_pettycashsaldo';
		$primarykey = 'pettycashsaldo_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\pettycashsaldo_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new pettycashsaldo_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"pettycashsaldo_id" => " pettycashsaldo_id = :pettycashsaldo_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_pettycashsaldo A', [
				'pettycashsaldo_id', 'pettycashsaldo_date', 'site_id', 'pettycashsaldo_awal', 'pettycashsaldo_mutasi', 'pettycashsaldo_akhir', 'pettycashsaldo_isclosed', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'pettycashsaldo_date' => date("d/m/Y", strtotime($record['pettycashsaldo_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};