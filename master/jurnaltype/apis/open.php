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
 * finact/master/jurnaltype/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header jurnaltype (mst_jurnaltype)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 23/11/2023
 */
$API = new class extends jurnaltypeBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_jurnaltype';
		$primarykey = 'jurnaltype_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\jurnaltype_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new jurnaltype_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			if (method_exists(get_class($hnd), 'PreCheckOpen')) {
				// PreCheckOpen($data, &$key, &$options)
				$hnd->PreCheckOpen($data, $key, $options);
			}

			$criteriaValues = [
				"jurnaltype_id" => " jurnaltype_id = :jurnaltype_id "
			];
			if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
				// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
				$hnd->buildOpenCriteriaValues($options, $criteriaValues);
			}
			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			$result = new \stdClass; 

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}
			

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}


			$sqlFieldList = [
				'jurnaltype_id' => 'A.`jurnaltype_id`', 'jurnalmodel_id' => 'A.`jurnalmodel_id`', 'jurnaltype_name' => 'A.`jurnaltype_name`', 'jurnaltype_descr' => 'A.`jurnaltype_descr`',
				'jurnaltype_prefix' => 'A.`jurnaltype_prefix`', 'jurnaltype_col' => 'A.`jurnaltype_col`', 'jurnaltype_isdisabled' => 'A.`jurnaltype_isdisabled`', 'jurnaltype_ishasduedate' => 'A.`jurnaltype_ishasduedate`',
				'jurnaltype_ishasheadvalue' => 'A.`jurnaltype_ishasheadvalue`', 'jurnaltype_ishasheadaccount' => 'A.`jurnaltype_ishasheadaccount`', 'jurnaltype_ishasheadunit' => 'A.`jurnaltype_ishasheadunit`', 'jurnaltype_ishasheaddept' => 'A.`jurnaltype_ishasheaddept`',
				'jurnaltype_ishasheadpartner' => 'A.`jurnaltype_ishasheadpartner`', 'jurnaltype_ishasdetunit' => 'A.`jurnaltype_ishasdetunit`', 'jurnaltype_ishasdetdept' => 'A.`jurnaltype_ishasdetdept`', 'jurnaltype_ishasdetpartner' => 'A.`jurnaltype_ishasdetpartner`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_jurnaltype A";
			$sqlWhere = $where->sql;

			if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
				// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);

			
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
			";

			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'jurnalmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalmodel_id'], $this->db, 'mst_jurnalmodel', 'jurnalmodel_id', 'jurnalmodel_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


			

			if (method_exists(get_class($hnd), 'DataOpen')) {
				//  DataOpen(array &$record) : void 
				$hnd->DataOpen($result->record);
			}

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};