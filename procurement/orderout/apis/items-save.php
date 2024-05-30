<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * finact/procurement/orderout/apis/items-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items orderout (trn_orderoutitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 01/11/2023
 */
$API = new class extends orderoutBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_orderoutitem';
		$primarykey = 'orderoutitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_itemsHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_itemsHandler($data, $options);
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
					'orderoutitem_id', 'itemasset_id', 'item_id', 'itemstock_id',
					'partner_id', 'itemclass_id', 'orderoutitem_ref', 'orderoutitem_descr',
					'orderoutitem_qty', 'orderoutitem_days', 'orderoutitem_task', 'orderoutitem_rate',
					'orderoutitem_value', 'curr_id', 'curr_rate', 'orderoutitem_idr',
					'projbudgetdet_id', 'orderoutitem_isoverbudget', 'orderoutitem_isunbudget', 'orderoutitem_budgetavailable',
					'orderoutitem_budgetqtyavailable', 'orderoutitem_budgetdaysavailable', 'orderoutitem_budgettaskavailable', 'orderoutitem_isuseqty',
					'orderoutitem_isusedays', 'orderoutitem_isusetask', 'orderoutitem_islimitqty', 'orderoutitem_islimitdays',
					'orderoutitem_islimittask', 'orderoutitem_islimitvalue', 'orderoutitem_isallowoverbudget', 'orderoutitem_isallowunbudget',
					'orderoutitem_qtyavailable', 'accbudget_id', 'coa_id', 'request_id',
					'requestitem_id', 'inquiry_id', 'inquiryitem_id', 'orderout_id'
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

			$obj->itemasset_id = strtoupper($obj->itemasset_id);
			$obj->item_id = strtoupper($obj->item_id);
			$obj->itemstock_id = strtoupper($obj->itemstock_id);
			$obj->itemclass_id = strtoupper($obj->itemclass_id);


			if ($obj->orderoutitem_ref=='') { $obj->orderoutitem_ref = '--NULL--'; }
			if ($obj->orderoutitem_descr=='') { $obj->orderoutitem_descr = '--NULL--'; }
			if ($obj->accbudget_id=='') { $obj->accbudget_id = '--NULL--'; }
			if ($obj->coa_id=='') { $obj->coa_id = '--NULL--'; }
			if ($obj->request_id=='') { $obj->request_id = '--NULL--'; }
			if ($obj->requestitem_id=='') { $obj->requestitem_id = '--NULL--'; }
			if ($obj->inquiry_id=='') { $obj->inquiry_id = '--NULL--'; }
			if ($obj->inquiryitem_id=='') { $obj->inquiryitem_id = '--NULL--'; }






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
				$header_table = 'trn_orderout';
				$header_primarykey = 'orderout_id';
				$detil_primarykey = 'orderout_id';
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
					"orderoutitem_id" => $obj->orderoutitem_id
				];

				$criteriaValues = [
					"orderoutitem_id" => " orderoutitem_id = :orderoutitem_id "
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
					'orderoutitem_id' => 'A.`orderoutitem_id`', 'itemasset_id' => 'A.`itemasset_id`', 'item_id' => 'A.`item_id`', 'itemstock_id' => 'A.`itemstock_id`',
					'partner_id' => 'A.`partner_id`', 'itemclass_id' => 'A.`itemclass_id`', 'orderoutitem_ref' => 'A.`orderoutitem_ref`', 'orderoutitem_descr' => 'A.`orderoutitem_descr`',
					'orderoutitem_qty' => 'A.`orderoutitem_qty`', 'orderoutitem_days' => 'A.`orderoutitem_days`', 'orderoutitem_task' => 'A.`orderoutitem_task`', 'orderoutitem_rate' => 'A.`orderoutitem_rate`',
					'orderoutitem_value' => 'A.`orderoutitem_value`', 'curr_id' => 'A.`curr_id`', 'curr_rate' => 'A.`curr_rate`', 'orderoutitem_idr' => 'A.`orderoutitem_idr`',
					'projbudgetdet_id' => 'A.`projbudgetdet_id`', 'orderoutitem_isoverbudget' => 'A.`orderoutitem_isoverbudget`', 'orderoutitem_isunbudget' => 'A.`orderoutitem_isunbudget`', 'orderoutitem_budgetavailable' => 'A.`orderoutitem_budgetavailable`',
					'orderoutitem_budgetqtyavailable' => 'A.`orderoutitem_budgetqtyavailable`', 'orderoutitem_budgetdaysavailable' => 'A.`orderoutitem_budgetdaysavailable`', 'orderoutitem_budgettaskavailable' => 'A.`orderoutitem_budgettaskavailable`', 'orderoutitem_isuseqty' => 'A.`orderoutitem_isuseqty`',
					'orderoutitem_isusedays' => 'A.`orderoutitem_isusedays`', 'orderoutitem_isusetask' => 'A.`orderoutitem_isusetask`', 'orderoutitem_islimitqty' => 'A.`orderoutitem_islimitqty`', 'orderoutitem_islimitdays' => 'A.`orderoutitem_islimitdays`',
					'orderoutitem_islimittask' => 'A.`orderoutitem_islimittask`', 'orderoutitem_islimitvalue' => 'A.`orderoutitem_islimitvalue`', 'orderoutitem_isallowoverbudget' => 'A.`orderoutitem_isallowoverbudget`', 'orderoutitem_isallowunbudget' => 'A.`orderoutitem_isallowunbudget`',
					'orderoutitem_qtyavailable' => 'A.`orderoutitem_qtyavailable`', 'accbudget_id' => 'A.`accbudget_id`', 'coa_id' => 'A.`coa_id`', 'request_id' => 'A.`request_id`',
					'requestitem_id' => 'A.`requestitem_id`', 'inquiry_id' => 'A.`inquiry_id`', 'inquiryitem_id' => 'A.`inquiryitem_id`', 'orderout_id' => 'A.`orderout_id`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_orderoutitem A";
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
					'itemasset_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_id'], $this->db, 'mst_itemasset', 'itemasset_id', 'itemasset_name'),
					'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
					'itemstock_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemstock_id'], $this->db, 'mst_itemstock', 'itemstock_id', 'itemstock_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'projbudgetdet_descr' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetdet_id'], $this->db, 'mst_projbudgetdet', 'projbudgetdet_id', 'projbudgetdet_descr'),

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