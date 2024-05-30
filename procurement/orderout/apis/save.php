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
 * finact/procurement/orderout/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header orderout (trn_orderout)
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
		$tablename = 'trn_orderout';
		$primarykey = 'orderout_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_headerHandler($options);
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
			$obj->orderout_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->orderout_dtstart))->format('Y-m-d');
			$obj->orderout_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->orderout_dtend))->format('Y-m-d');

			$obj->partnerbank_name = strtoupper($obj->partnerbank_name);
			$obj->partnerbank_bankacc = strtoupper($obj->partnerbank_bankacc);
			$obj->partnerbank_bankaccname = strtoupper($obj->partnerbank_bankaccname);
			$obj->partnerbank_bankname = strtoupper($obj->partnerbank_bankname);
			$obj->partnercontact_upname = strtoupper($obj->partnercontact_upname);
			$obj->partnercontact_position = strtoupper($obj->partnercontact_position);
			$obj->partnercontact_upphone = strtoupper($obj->partnercontact_upphone);
			$obj->partnercontact_email = strtolower($obj->partnercontact_email);
			$obj->deliver_city = strtoupper($obj->deliver_city);
			$obj->deliver_upname = strtoupper($obj->deliver_upname);
			$obj->deliver_uptelp = strtoupper($obj->deliver_uptelp);
			$obj->doc_id = strtoupper($obj->doc_id);


			if ($obj->orderout_descr=='') { $obj->orderout_descr = '--NULL--'; }
			if ($obj->orderout_dtstart=='') { $obj->orderout_dtstart = '--NULL--'; }
			if ($obj->orderout_dtend=='') { $obj->orderout_dtend = '--NULL--'; }
			if ($obj->orderout_quot=='') { $obj->orderout_quot = '--NULL--'; }
			if ($obj->partnerbank_name=='') { $obj->partnerbank_name = '--NULL--'; }
			if ($obj->partnerbank_bankacc=='') { $obj->partnerbank_bankacc = '--NULL--'; }
			if ($obj->partnerbank_bankaccname=='') { $obj->partnerbank_bankaccname = '--NULL--'; }
			if ($obj->partnerbank_bankname=='') { $obj->partnerbank_bankname = '--NULL--'; }
			if ($obj->partnercontact_upname=='') { $obj->partnercontact_upname = '--NULL--'; }
			if ($obj->partnercontact_position=='') { $obj->partnercontact_position = '--NULL--'; }
			if ($obj->partnercontact_upphone=='') { $obj->partnercontact_upphone = '--NULL--'; }
			if ($obj->partnercontact_email=='') { $obj->partnercontact_email = '--NULL--'; }
			if ($obj->deliver_siteaddress=='') { $obj->deliver_siteaddress = '--NULL--'; }
			if ($obj->deliver_city=='') { $obj->deliver_city = '--NULL--'; }
			if ($obj->deliver_upname=='') { $obj->deliver_upname = '--NULL--'; }
			if ($obj->deliver_uptelp=='') { $obj->deliver_uptelp = '--NULL--'; }
			if ($obj->inquirymodel_id=='') { $obj->inquirymodel_id = '--NULL--'; }
			if ($obj->inquiryselect_id=='') { $obj->inquiryselect_id = '--NULL--'; }
			if ($obj->itemmanage_id=='') { $obj->itemmanage_id = '--NULL--'; }
			if ($obj->owner_dept_id=='') { $obj->owner_dept_id = '--NULL--'; }
			if ($obj->orderout_dept_id=='') { $obj->orderout_dept_id = '--NULL--'; }


			unset($obj->orderout_iscommit);
			unset($obj->orderout_commitby);
			unset($obj->orderout_commitdate);
			unset($obj->orderout_isapprovalprogress);
			unset($obj->orderout_isapproved);
			unset($obj->orderout_approveby);
			unset($obj->orderout_approvedate);
			unset($obj->orderout_isdeclined);
			unset($obj->orderout_declineby);
			unset($obj->orderout_declinedate);
			unset($obj->orderout_isclose);
			unset($obj->orderout_closeby);
			unset($obj->orderout_closedate);
			unset($obj->orderout_isautogenerated);


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
					"orderout_id" => $obj->orderout_id
				];

				$criteriaValues = [
					"orderout_id" => " orderout_id = :orderout_id "
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
					'orderout_id' => 'A.`orderout_id`', 'unit_id' => 'A.`unit_id`', 'request_id' => 'A.`request_id`', 'orderout_isunref' => 'A.`orderout_isunref`',
					'inquirytype_id' => 'A.`inquirytype_id`', 'trxmodel_id' => 'A.`trxmodel_id`', 'request_dept_id' => 'A.`request_dept_id`', 'orderout_descr' => 'A.`orderout_descr`',
					'orderout_dtstart' => 'A.`orderout_dtstart`', 'orderout_dtend' => 'A.`orderout_dtend`', 'curr_id' => 'A.`curr_id`', 'curr_rate' => 'A.`curr_rate`',
					'ppn_taxtype_id' => 'A.`ppn_taxtype_id`', 'pph_taxtype_id' => 'A.`pph_taxtype_id`', 'partner_id' => 'A.`partner_id`', 'ordercontract_id' => 'A.`ordercontract_id`',
					'orderout_quot' => 'A.`orderout_quot`', 'paymtype_id' => 'A.`paymtype_id`', 'partnerbank_id' => 'A.`partnerbank_id`', 'partnerbank_name' => 'A.`partnerbank_name`',
					'partnerbank_bankacc' => 'A.`partnerbank_bankacc`', 'partnerbank_bankaccname' => 'A.`partnerbank_bankaccname`', 'partnerbank_bankname' => 'A.`partnerbank_bankname`', 'partnercontact_id' => 'A.`partnercontact_id`',
					'partnercontact_upname' => 'A.`partnercontact_upname`', 'partnercontact_position' => 'A.`partnercontact_position`', 'partnercontact_upphone' => 'A.`partnercontact_upphone`', 'partnercontact_email' => 'A.`partnercontact_email`',
					'project_id' => 'A.`project_id`', 'projecttask_id' => 'A.`projecttask_id`', 'projbudget_id' => 'A.`projbudget_id`', 'projbudgettask_id' => 'A.`projbudgettask_id`',
					'orderout_isunbudgetted' => 'A.`orderout_isunbudgetted`', 'site_id' => 'A.`site_id`', 'user_dept_id' => 'A.`user_dept_id`', 'recv_dept_id' => 'A.`recv_dept_id`',
					'deliver_siteaddress' => 'A.`deliver_siteaddress`', 'deliver_city' => 'A.`deliver_city`', 'deliver_upname' => 'A.`deliver_upname`', 'deliver_uptelp' => 'A.`deliver_uptelp`',
					'inquiry_id' => 'A.`inquiry_id`', 'orderout_ismultirequest' => 'A.`orderout_ismultirequest`', 'inquirymodel_id' => 'A.`inquirymodel_id`', 'inquiryselect_id' => 'A.`inquiryselect_id`',
					'itemmanage_id' => 'A.`itemmanage_id`', 'owner_dept_id' => 'A.`owner_dept_id`', 'orderout_dept_id' => 'A.`orderout_dept_id`', 'doc_id' => 'A.`doc_id`',
					'ordermodel_id' => 'A.`ordermodel_id`', 'orderout_version' => 'A.`orderout_version`', 'orderout_isdateinterval' => 'A.`orderout_isdateinterval`', 'orderout_iscommit' => 'A.`orderout_iscommit`',
					'orderout_commitby' => 'A.`orderout_commitby`', 'orderout_commitdate' => 'A.`orderout_commitdate`', 'orderout_isapprovalprogress' => 'A.`orderout_isapprovalprogress`', 'orderout_isapproved' => 'A.`orderout_isapproved`',
					'orderout_approveby' => 'A.`orderout_approveby`', 'orderout_approvedate' => 'A.`orderout_approvedate`', 'orderout_isdeclined' => 'A.`orderout_isdeclined`', 'orderout_declineby' => 'A.`orderout_declineby`',
					'orderout_declinedate' => 'A.`orderout_declinedate`', 'orderout_isclose' => 'A.`orderout_isclose`', 'orderout_closeby' => 'A.`orderout_closeby`', 'orderout_closedate' => 'A.`orderout_closedate`',
					'orderout_isadvance' => 'A.`orderout_isadvance`', 'orderout_isautogenerated' => 'A.`orderout_isautogenerated`', 'orderout_isitemdeptuser' => 'A.`orderout_isitemdeptuser`', 'orderout_isitemdeptowner' => 'A.`orderout_isitemdeptowner`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_orderout A";
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
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'request_descr' => \FGTA4\utils\SqlUtility::Lookup($record['request_id'], $this->db, 'trn_request', 'request_id', 'request_descr'),
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'request_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'orderout_dtstart' => date("d/m/Y", strtotime($row['orderout_dtstart'])),
					'orderout_dtend' => date("d/m/Y", strtotime($row['orderout_dtend'])),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'pph_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'ordercontract_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_id'], $this->db, 'trn_ordercontract', 'ordercontract_id', 'ordercontract_descr'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'ordermodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['ordermodel_id'], $this->db, 'mst_ordermodel', 'ordermodel_id', 'ordermodel_name'),
					'orderout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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