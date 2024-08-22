<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * finact/acct/jurnal/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header jurnal (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2023
 */
$API = new class extends jurnalBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_jurnal';
		$primarykey = 'jurnal_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\jurnal_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new jurnal_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->jurnal_date = (\DateTime::createFromFormat('d/m/Y',$obj->jurnal_date))->format('Y-m-d');
			$obj->jurnal_datedue = (\DateTime::createFromFormat('d/m/Y',$obj->jurnal_datedue))->format('Y-m-d');



			if ($obj->jurnal_ref=='') { $obj->jurnal_ref = '--NULL--'; }


			unset($obj->jurnal_iscommit);
			unset($obj->jurnal_commitby);
			unset($obj->jurnal_commitdate);
			unset($obj->jurnal_ispost);
			unset($obj->jurnal_postby);
			unset($obj->jurnal_postdate);
			unset($obj->jurnal_isclose);
			unset($obj->jurnal_closeby);
			unset($obj->jurnal_closedate);
			unset($obj->jurnal_islinked);
			unset($obj->jurnal_isresponded);
			unset($obj->jurnal_isagingclose);
			unset($obj->jurnal_agingcloseby);
			unset($obj->jurnal_agingclosedate);


			// current user & timestamp	
			if ($datastate=='NEW') {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				if (method_exists(get_class($hnd), 'PreCheckInsert')) {
					// PreCheckInsert($data, &$obj, &$options)
					$hnd->PreCheckInsert($data, $obj, $options);
				}
			} else {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");	
		
				if (method_exists(get_class($hnd), 'PreCheckUpdate')) {
					// PreCheckUpdate($data, &$obj, &$key, &$options)
					$hnd->PreCheckUpdate($data, $obj, $key, $options);
				}
			}

			//handle data sebelum sebelum save
			if (method_exists(get_class($hnd), 'DataSaving')) {
				// ** DataSaving(object &$obj, object &$key)
				$hnd->DataSaving($obj, $key);
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId($hnd, $obj);
					}
					
					// handle data sebelum pada saat pembuatan SQL Insert
					if (method_exists(get_class($hnd), 'RowInserting')) {
						// ** RowInserting(object &$obj)
						$hnd->RowInserting($obj);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';

					// handle data sebelum pada saat pembuatan SQL Update
					if (method_exists(get_class($hnd), 'RowUpdating')) {
						// ** RowUpdating(object &$obj, object &$key))
						$hnd->RowUpdating($obj, $key);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"jurnal_id" => $obj->jurnal_id
				];

				$criteriaValues = [
					"jurnal_id" => " jurnal_id = :jurnal_id "
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

				$sqlFieldList = [
					'jurnal_id' => 'A.`jurnal_id`', 'jurnalsource_id' => 'A.`jurnalsource_id`', 'jurnaltype_id' => 'A.`jurnaltype_id`', 'jurnal_descr' => 'A.`jurnal_descr`',
					'jurnal_ref' => 'A.`jurnal_ref`', 'periodemo_id' => 'A.`periodemo_id`', 'jurnal_date' => 'A.`jurnal_date`', 'jurnal_datedue' => 'A.`jurnal_datedue`',
					'jurnal_valfrg' => 'A.`jurnal_valfrg`', 'curr_id' => 'A.`curr_id`', 'jurnal_valfrgrate' => 'A.`jurnal_valfrgrate`', 'jurnal_validr' => 'A.`jurnal_validr`',
					'coa_id' => 'A.`coa_id`', 'unit_id' => 'A.`unit_id`', 'dept_id' => 'A.`dept_id`', 'partner_id' => 'A.`partner_id`',
					'project_id' => 'A.`project_id`', 'jurnaltype_col' => 'A.`jurnaltype_col`', 'jurnal_isindependentsetting' => 'A.`jurnal_isindependentsetting`', 'jurnaltype_ishasduedate' => 'A.`jurnaltype_ishasduedate`',
					'jurnaltype_ishasheadvalue' => 'A.`jurnaltype_ishasheadvalue`', 'jurnaltype_ishasheadaccount' => 'A.`jurnaltype_ishasheadaccount`', 'jurnaltype_ishasheadunit' => 'A.`jurnaltype_ishasheadunit`', 'jurnaltype_ishasheaddept' => 'A.`jurnaltype_ishasheaddept`',
					'jurnaltype_ishasheadpartner' => 'A.`jurnaltype_ishasheadpartner`', 'jurnaltype_ishasdetunit' => 'A.`jurnaltype_ishasdetunit`', 'jurnaltype_ishasdetdept' => 'A.`jurnaltype_ishasdetdept`', 'jurnaltype_ishasdetpartner' => 'A.`jurnaltype_ishasdetpartner`',
					'jurnal_version' => 'A.`jurnal_version`', 'jurnal_iscommit' => 'A.`jurnal_iscommit`', 'jurnal_commitby' => 'A.`jurnal_commitby`', 'jurnal_commitdate' => 'A.`jurnal_commitdate`',
					'jurnal_ispost' => 'A.`jurnal_ispost`', 'jurnal_postby' => 'A.`jurnal_postby`', 'jurnal_postdate' => 'A.`jurnal_postdate`', 'jurnal_isclose' => 'A.`jurnal_isclose`',
					'jurnal_closeby' => 'A.`jurnal_closeby`', 'jurnal_closedate' => 'A.`jurnal_closedate`', 'jurnal_islinked' => 'A.`jurnal_islinked`', 'jurnal_isresponded' => 'A.`jurnal_isresponded`',
					'jurnal_isagingclose' => 'A.`jurnal_isagingclose`', 'jurnal_agingcloseby' => 'A.`jurnal_agingcloseby`', 'jurnal_agingclosedate' => 'A.`jurnal_agingclosedate`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_jurnal A";
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

				$dataresponse = array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'jurnal_date' => date("d/m/Y", strtotime($row['jurnal_date'])),
					'jurnal_datedue' => date("d/m/Y", strtotime($row['jurnal_datedue'])),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_agingcloseby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_agingcloseby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->username = $userdata->username;
				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
					// DataSavedSuccess(object &$result) : void
					$hnd->DataSavedSuccess($result);
				}

				$this->db->commit();
				return $result;

			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId(object $hnd, object $obj) : string {
		// dipanggil hanya saat $autoid == true;

		$id = null;
		$handled = false;
		if (method_exists(get_class($hnd), 'CreateNewId')) {
			// CreateNewId(object $obj) : string 
			$id = $hnd->CreateNewId($obj);
			$handled = true;
		}

		if (!$handled) {
			$id = uniqid();
		}

		return $id;
	}

};