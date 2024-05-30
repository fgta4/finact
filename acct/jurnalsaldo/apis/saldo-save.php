<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-saldo-handler.php')) {
	require_once __DIR__ .'/data-saldo-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * finact/acct/jurnalsaldo/apis/saldo-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel saldo jurnalsaldo (trn_jurnalsaldo)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/08/2023
 */
$API = new class extends jurnalsaldoBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_jurnalsaldo';
		$primarykey = 'jurnalsaldo_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\jurnalsaldo_saldoHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new jurnalsaldo_saldoHandler($data, $options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {
			
			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}
			
			// data yang akan di update dari table
			$sqlUpdateField  = [
					'jurnalsaldo_id', 'jurnalsaldo_date', 'jurnal_id', 'jurnal_date',
					'jurnal_duedate', 'jurnaldetil_id', 'jurnaldetil_descr', 'jurnaldetil_valfrg',
					'jurnaldetil_validr', 'coamodel_id', 'coa_id', 'unit_id',
					'dept_id', 'partner_id', 'project_id', 'curr_id',
					'saldoawal_frg', 'saldoawal_idr', 'periodemo_id'
			];
			if (method_exists(get_class($hnd), 'setUpdateField')) {
				// setUpdateField(&$sqlUpdateField, $data, $options)
				$hnd->setUpdateField($sqlUpdateField, $data, $options);
			}



			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($sqlUpdateField as $fieldname) {
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				if (property_exists($data, $fieldname)) {
					$obj->{$fieldname} = $data->{$fieldname};
				}
			}


			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->jurnalsaldo_date = (\DateTime::createFromFormat('d/m/Y',$obj->jurnalsaldo_date))->format('Y-m-d');
			$obj->jurnal_date = (\DateTime::createFromFormat('d/m/Y',$obj->jurnal_date))->format('Y-m-d');
			$obj->jurnal_duedate = (\DateTime::createFromFormat('d/m/Y',$obj->jurnal_duedate))->format('Y-m-d');

			$obj->jurnalsaldo_id = strtoupper($obj->jurnalsaldo_id);
			$obj->periodemo_id = strtoupper($obj->periodemo_id);


			if ($obj->jurnal_id=='') { $obj->jurnal_id = '--NULL--'; }
			if ($obj->jurnal_date=='') { $obj->jurnal_date = '--NULL--'; }
			if ($obj->jurnal_duedate=='') { $obj->jurnal_duedate = '--NULL--'; }
			if ($obj->jurnaldetil_id=='') { $obj->jurnaldetil_id = '--NULL--'; }
			if ($obj->jurnaldetil_descr=='') { $obj->jurnaldetil_descr = '--NULL--'; }
			if ($obj->unit_id=='') { $obj->unit_id = '--NULL--'; }
			if ($obj->dept_id=='') { $obj->dept_id = '--NULL--'; }
			if ($obj->partner_id=='') { $obj->partner_id = '--NULL--'; }
			if ($obj->project_id=='') { $obj->project_id = '--NULL--'; }
			if ($obj->curr_id=='') { $obj->curr_id = '--NULL--'; }






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
				// ** DataSaving(object &$obj, object &$key) : void
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
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}

				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				
				// Update user & timestamp di header
				$header_table = 'mst_periodemo';
				$header_primarykey = 'periodemo_id';
				$detil_primarykey = 'periodemo_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $obj->{$detil_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$detil_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"jurnalsaldo_id" => $obj->jurnalsaldo_id
				];

				$criteriaValues = [
					"jurnalsaldo_id" => " jurnalsaldo_id = :jurnalsaldo_id "
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
					'jurnalsaldo_id' => 'A.`jurnalsaldo_id`', 'jurnalsaldo_date' => 'A.`jurnalsaldo_date`', 'jurnal_id' => 'A.`jurnal_id`', 'jurnal_date' => 'A.`jurnal_date`',
					'jurnal_duedate' => 'A.`jurnal_duedate`', 'jurnaldetil_id' => 'A.`jurnaldetil_id`', 'jurnaldetil_descr' => 'A.`jurnaldetil_descr`', 'jurnaldetil_valfrg' => 'A.`jurnaldetil_valfrg`',
					'jurnaldetil_validr' => 'A.`jurnaldetil_validr`', 'coamodel_id' => 'A.`coamodel_id`', 'coa_id' => 'A.`coa_id`', 'unit_id' => 'A.`unit_id`',
					'dept_id' => 'A.`dept_id`', 'partner_id' => 'A.`partner_id`', 'project_id' => 'A.`project_id`', 'curr_id' => 'A.`curr_id`',
					'saldoawal_frg' => 'A.`saldoawal_frg`', 'saldoawal_idr' => 'A.`saldoawal_idr`', 'periodemo_id' => 'A.`periodemo_id`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_jurnalsaldo A";
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
					'jurnalsaldo_date' => date("d/m/Y", strtotime($row['jurnalsaldo_date'])),
					'jurnal_date' => date("d/m/Y", strtotime($row['jurnal_date'])),
					'jurnal_duedate' => date("d/m/Y", strtotime($row['jurnal_duedate'])),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}


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

	public function NewId($hnd, $obj) {
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