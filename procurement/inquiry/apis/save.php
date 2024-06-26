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
 * finact/procurement/inquiry/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header inquiry (trn_inquiry)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/03/2023
 */
$API = new class extends inquiryBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_inquiry';
		$primarykey = 'inquiry_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquiry_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new inquiry_headerHandler($options);
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
			$obj->inquiry_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->inquiry_dtstart))->format('Y-m-d');
			$obj->inquiry_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->inquiry_dtend))->format('Y-m-d');

			$obj->partnercontact_upname = strtoupper($obj->partnercontact_upname);
			$obj->partnercontact_position = strtoupper($obj->partnercontact_position);
			$obj->partnercontact_upphone = strtoupper($obj->partnercontact_upphone);
			$obj->partnercontact_email = strtoupper($obj->partnercontact_email);
			$obj->deliver_city = strtoupper($obj->deliver_city);
			$obj->deliver_upname = strtoupper($obj->deliver_upname);
			$obj->deliver_uptelp = strtoupper($obj->deliver_uptelp);


			if ($obj->paymto_bankacc=='') { $obj->paymto_bankacc = '--NULL--'; }
			if ($obj->paymto_bankaccname=='') { $obj->paymto_bankaccname = '--NULL--'; }
			if ($obj->paymto_bankname=='') { $obj->paymto_bankname = '--NULL--'; }
			if ($obj->deliver_siteaddress=='') { $obj->deliver_siteaddress = '--NULL--'; }
			if ($obj->deliver_city=='') { $obj->deliver_city = '--NULL--'; }
			if ($obj->deliver_upname=='') { $obj->deliver_upname = '--NULL--'; }
			if ($obj->deliver_uptelp=='') { $obj->deliver_uptelp = '--NULL--'; }
			if ($obj->inquiry_rejectnotes=='') { $obj->inquiry_rejectnotes = '--NULL--'; }


			unset($obj->inquiry_rejectnotes);
			unset($obj->inquiry_iscommit);
			unset($obj->inquiry_commitby);
			unset($obj->inquiry_commitdate);
			unset($obj->inquiry_isapprovalprogress);
			unset($obj->inquiry_isapproved);
			unset($obj->inquiry_approveby);
			unset($obj->inquiry_approvedate);
			unset($obj->inquiry_isdeclined);
			unset($obj->inquiry_declineby);
			unset($obj->inquiry_declinedate);
			unset($obj->inquiry_ispreparing);
			unset($obj->inquiry_isprepared);
			unset($obj->inquiry_preparedby);
			unset($obj->inquiry_prepareddate);
			unset($obj->inquiry_isreject);
			unset($obj->inquiry_rejectby);
			unset($obj->inquiry_rejectdate);
			unset($obj->inquiry_iscomplete);
			unset($obj->inquiry_isclose);
			unset($obj->inquiry_closeby);
			unset($obj->inquiry_closedate);
			unset($obj->inquiry_isautogenerated);


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
					"inquiry_id" => $obj->inquiry_id
				];

				$criteriaValues = [
					"inquiry_id" => " inquiry_id = :inquiry_id "
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
					'inquiry_id' => 'A.`inquiry_id`', 'inquirytype_id' => 'A.`inquirytype_id`', 'request_dept_id' => 'A.`request_dept_id`', 'inquiry_descr' => 'A.`inquiry_descr`',
					'inquiry_dtstart' => 'A.`inquiry_dtstart`', 'inquiry_dtend' => 'A.`inquiry_dtend`', 'user_dept_id' => 'A.`user_dept_id`', 'empl_id' => 'A.`empl_id`',
					'inquiry_isadvance' => 'A.`inquiry_isadvance`', 'partner_id' => 'A.`partner_id`', 'partner_name' => 'A.`partner_name`', 'paymtype_id' => 'A.`paymtype_id`',
					'paymtype_isviabank' => 'A.`paymtype_isviabank`', 'partnerbank_id' => 'A.`partnerbank_id`', 'paymto_bankacc' => 'A.`paymto_bankacc`', 'paymto_bankaccname' => 'A.`paymto_bankaccname`',
					'paymto_bankname' => 'A.`paymto_bankname`', 'partnercontact_id' => 'A.`partnercontact_id`', 'partnercontact_upname' => 'A.`partnercontact_upname`', 'partnercontact_position' => 'A.`partnercontact_position`',
					'partnercontact_upphone' => 'A.`partnercontact_upphone`', 'partnercontact_email' => 'A.`partnercontact_email`', 'project_id' => 'A.`project_id`', 'projecttask_id' => 'A.`projecttask_id`',
					'inquiry_isunbudgetted' => 'A.`inquiry_isunbudgetted`', 'projbudget_id' => 'A.`projbudget_id`', 'projbudgettask_id' => 'A.`projbudgettask_id`', 'site_id' => 'A.`site_id`',
					'deliver_siteaddress' => 'A.`deliver_siteaddress`', 'deliver_city' => 'A.`deliver_city`', 'deliver_upname' => 'A.`deliver_upname`', 'deliver_uptelp' => 'A.`deliver_uptelp`',
					'doc_id' => 'A.`doc_id`', 'inquiry_version' => 'A.`inquiry_version`', 'inquiry_rejectnotes' => 'A.`inquiry_rejectnotes`', 'inquirymodel_id' => 'A.`inquirymodel_id`',
					'itemmanage_id' => 'A.`itemmanage_id`', 'inquiry_isindependentsetting' => 'A.`inquiry_isindependentsetting`', 'inquiryselect_isshowitemasset' => 'A.`inquiryselect_isshowitemasset`', 'inquiryselect_isshowitem' => 'A.`inquiryselect_isshowitem`',
					'inquiryselect_isshowitemstock' => 'A.`inquiryselect_isshowitemstock`', 'inquiryselect_isshowpartner' => 'A.`inquiryselect_isshowpartner`', 'inquiryselect_isshowitemclass' => 'A.`inquiryselect_isshowitemclass`', 'inquiryselect_isitemclassdisabled' => 'A.`inquiryselect_isitemclassdisabled`',
					'inquirytype_isuseqty' => 'A.`inquirytype_isuseqty`', 'inquirytype_isusedays' => 'A.`inquirytype_isusedays`', 'inquirytype_isusetask' => 'A.`inquirytype_isusetask`', 'inquirytype_isdateinterval' => 'A.`inquirytype_isdateinterval`',
					'inquirytype_istoberequest' => 'A.`inquirytype_istoberequest`', 'inquirytype_isautorequest' => 'A.`inquirytype_isautorequest`', 'inquirytype_isautoorder' => 'A.`inquirytype_isautoorder`', 'inquirytype_ismovinginit' => 'A.`inquirytype_ismovinginit`',
					'inquirytype_islimitqty' => 'A.`inquirytype_islimitqty`', 'inquirytype_islimitdays' => 'A.`inquirytype_islimitdays`', 'inquirytype_islimittask' => 'A.`inquirytype_islimittask`', 'inquirytype_islimitvalue' => 'A.`inquirytype_islimitvalue`',
					'inquirytype_isallowunbudget' => 'A.`inquirytype_isallowunbudget`', 'inquirytype_isallowitemunbudget' => 'A.`inquirytype_isallowitemunbudget`', 'inquirytype_isallowoverbudget' => 'A.`inquirytype_isallowoverbudget`', 'inquirytype_isallowadvance' => 'A.`inquirytype_isallowadvance`',
					'inquirytype_isemplaspartner' => 'A.`inquirytype_isemplaspartner`', 'inquirytype_maxadvancevalue' => 'A.`inquirytype_maxadvancevalue`', 'inquiry_iscommit' => 'A.`inquiry_iscommit`', 'inquiry_commitby' => 'A.`inquiry_commitby`',
					'inquiry_commitdate' => 'A.`inquiry_commitdate`', 'inquiry_isapprovalprogress' => 'A.`inquiry_isapprovalprogress`', 'inquiry_isapproved' => 'A.`inquiry_isapproved`', 'inquiry_approveby' => 'A.`inquiry_approveby`',
					'inquiry_approvedate' => 'A.`inquiry_approvedate`', 'inquiry_isdeclined' => 'A.`inquiry_isdeclined`', 'inquiry_declineby' => 'A.`inquiry_declineby`', 'inquiry_declinedate' => 'A.`inquiry_declinedate`',
					'inquiry_ispreparing' => 'A.`inquiry_ispreparing`', 'inquiry_isprepared' => 'A.`inquiry_isprepared`', 'inquiry_preparedby' => 'A.`inquiry_preparedby`', 'inquiry_prepareddate' => 'A.`inquiry_prepareddate`',
					'inquiry_isreject' => 'A.`inquiry_isreject`', 'inquiry_rejectby' => 'A.`inquiry_rejectby`', 'inquiry_rejectdate' => 'A.`inquiry_rejectdate`', 'inquiry_iscomplete' => 'A.`inquiry_iscomplete`',
					'inquiry_isclose' => 'A.`inquiry_isclose`', 'inquiry_closeby' => 'A.`inquiry_closeby`', 'inquiry_closedate' => 'A.`inquiry_closedate`', 'inquiry_isautogenerated' => 'A.`inquiry_isautogenerated`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_inquiry A";
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
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'request_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'inquiry_dtstart' => date("d/m/Y", strtotime($row['inquiry_dtstart'])),
					'inquiry_dtend' => date("d/m/Y", strtotime($row['inquiry_dtend'])),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'inquiry_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_preparedby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_preparedby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_rejectby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_rejectby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'inquiry_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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