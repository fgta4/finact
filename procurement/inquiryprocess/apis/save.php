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
 * finact/procurement/inquiryprocess/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header inquiryprocess (trn_inquiry)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 16/01/2022
 */
$API = new class extends inquiryprocessBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_inquiry';
		$primarykey = 'inquiry_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquiryprocess_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquiryprocess_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
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

			$obj->deliver_city = strtoupper($obj->deliver_city);
			$obj->deliver_upname = strtoupper($obj->deliver_upname);
			$obj->deliver_uptelp = strtoupper($obj->deliver_uptelp);


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



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					  $primarykey
					, 'inquiry_id', 'inquirytype_id', 'inquiry_descr', 'inquiry_dtstart', 'inquiry_dtend', 'user_dept_id', 'empl_id', 'inquiry_isadvance', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'inquiry_isunbudgetted', 'site_id', 'deliver_siteaddress', 'deliver_city', 'deliver_upname', 'deliver_uptelp', 'inquirymodel_id', 'inquiryselect_id', 'request_dept_id', 'owner_dept_id', 'request_doc_id', 'orderout_dept_id', 'orderout_doc_id', 'trxmodel_id', 'itemmanage_id', 'inquiry_rejectnotes', 'doc_id', 'inquiry_selectfield', 'inquiry_version', 'inquiry_isdateinterval', 'inquiry_maxadvancevalue', 'inquiry_isallowadvance', 'inquiry_iscommit', 'inquiry_commitby', 'inquiry_commitdate', 'inquiry_isapprovalprogress', 'inquiry_isapproved', 'inquiry_approveby', 'inquiry_approvedate', 'inquiry_isdeclined', 'inquiry_declineby', 'inquiry_declinedate', 'inquiry_ispreparing', 'inquiry_isprepared', 'inquiry_preparedby', 'inquiry_prepareddate', 'inquiry_isreject', 'inquiry_rejectby', 'inquiry_rejectdate', 'inquiry_iscomplete', 'inquiry_isclose', 'inquiry_closeby', 'inquiry_closedate', 'inquiry_isautogenerated', 'inquiry_isitemdeptuser', 'inquiry_isitemdeptowner', 'inquiry_istoberequest', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'inquiry_dtstart' => date("d/m/Y", strtotime($row['inquiry_dtstart'])),
					'inquiry_dtend' => date("d/m/Y", strtotime($row['inquiry_dtend'])),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
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

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
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

	public function NewId($param) {
		
			$seqname = 'NQ';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};