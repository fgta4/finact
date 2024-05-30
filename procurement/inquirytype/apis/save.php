<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * finact/procurement/inquirytype/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header inquirytype (mst_inquirytype)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/03/2023
 */
$API = new class extends inquirytypeBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'mst_inquirytype';
		$primarykey = 'inquirytype_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquirytype_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new inquirytype_headerHandler($options);
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
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"inquirytype_id" => $obj->inquirytype_id
				];

				$criteriaValues = [
					"inquirytype_id" => " inquirytype_id = :inquirytype_id "
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
					'inquirytype_id' => 'A.`inquirytype_id`', 'inquirymodel_id' => 'A.`inquirymodel_id`', 'inquirytype_name' => 'A.`inquirytype_name`', 'inquirytype_isdisabled' => 'A.`inquirytype_isdisabled`',
					'inquirytype_descr' => 'A.`inquirytype_descr`', 'inquiryselect_id' => 'A.`inquiryselect_id`', 'inquirytype_isperempl' => 'A.`inquirytype_isperempl`', 'itemmanage_id' => 'A.`itemmanage_id`',
					'related_dept_id' => 'A.`related_dept_id`', 'related_team_id' => 'A.`related_team_id`', 'site_id' => 'A.`site_id`', 'room_id' => 'A.`room_id`',
					'inquirytype_isallowadvance' => 'A.`inquirytype_isallowadvance`', 'inquirytype_isemplaspartner' => 'A.`inquirytype_isemplaspartner`', 'inquirytype_maxadvancevalue' => 'A.`inquirytype_maxadvancevalue`', 'owner_dept_id' => 'A.`owner_dept_id`',
					'owner_team_id' => 'A.`owner_team_id`', 'orderout_dept_id' => 'A.`orderout_dept_id`', 'orderout_team_id' => 'A.`orderout_team_id`', 'trxmodel_id' => 'A.`trxmodel_id`',
					'inquiry_title_ina' => 'A.`inquiry_title_ina`', 'inquiry_title_eng' => 'A.`inquiry_title_eng`', 'inquiry_doc_id' => 'A.`inquiry_doc_id`', 'request_title_ina' => 'A.`request_title_ina`',
					'request_title_eng' => 'A.`request_title_eng`', 'request_doc_id' => 'A.`request_doc_id`', 'orderout_title_ina' => 'A.`orderout_title_ina`', 'orderout_title_eng' => 'A.`orderout_title_eng`',
					'orderout_doc_id' => 'A.`orderout_doc_id`', 'inquiryselect_isshowitemasset' => 'A.`inquiryselect_isshowitemasset`', 'inquiryselect_isshowitem' => 'A.`inquiryselect_isshowitem`', 'inquiryselect_isshowitemstock' => 'A.`inquiryselect_isshowitemstock`',
					'inquiryselect_isshowpartner' => 'A.`inquiryselect_isshowpartner`', 'inquiryselect_isshowitemclass' => 'A.`inquiryselect_isshowitemclass`', 'inquiryselect_isitemclassdisabled' => 'A.`inquiryselect_isitemclassdisabled`', 'inquirytype_ispartnerheader' => 'A.`inquirytype_ispartnerheader`',
					'inquirytype_isuseqty' => 'A.`inquirytype_isuseqty`', 'inquirytype_isusedays' => 'A.`inquirytype_isusedays`', 'inquirytype_isusetask' => 'A.`inquirytype_isusetask`', 'inquirytype_islimitqty' => 'A.`inquirytype_islimitqty`',
					'inquirytype_islimitdays' => 'A.`inquirytype_islimitdays`', 'inquirytype_islimittask' => 'A.`inquirytype_islimittask`', 'inquirytype_islimitvalue' => 'A.`inquirytype_islimitvalue`', 'inquirytype_isallowunbudget' => 'A.`inquirytype_isallowunbudget`',
					'inquirytype_isallowitemunbudget' => 'A.`inquirytype_isallowitemunbudget`', 'inquirytype_isallowoverbudget' => 'A.`inquirytype_isallowoverbudget`', 'inquirytype_isdeptuser' => 'A.`inquirytype_isdeptuser`', 'inquirytype_isdeptowner' => 'A.`inquirytype_isdeptowner`',
					'inquirytype_isdeptmaintainer' => 'A.`inquirytype_isdeptmaintainer`', 'inquirytype_isqtybreakdown' => 'A.`inquirytype_isqtybreakdown`', 'inquirytype_istoberequest' => 'A.`inquirytype_istoberequest`', 'inquirytype_isautorequest' => 'A.`inquirytype_isautorequest`',
					'inquirytype_isautoorder' => 'A.`inquirytype_isautoorder`', 'inquirytype_ismovinginit' => 'A.`inquirytype_ismovinginit`', 'inquirytype_isdateinterval' => 'A.`inquirytype_isdateinterval`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_inquirytype A";
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
					'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
					'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'related_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'related_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'room_name' => \FGTA4\utils\SqlUtility::Lookup($record['room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'inquiry_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'request_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'orderout_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
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