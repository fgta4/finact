<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
// require_once __ROOT_DIR.'/core/currency.php';
require_once __ROOT_DIR.'/apps/fgta/framework/fgta4libs/apis/otp.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

/**
 * finact/procurement/inquiry/apis/xtion-approve.php
 *
 * =======
 * Approve
 * =======
 * Melakukan approve/decline dokumen,
 * sesuai dengan authorisasi yang di setting pada modul ent/organisation/doc
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/07/2021
 */
$API = new class extends inquiryBase {

	public function execute($id, $param) {
		$tablename = 'trn_inquiry';
		$primarykey = 'inquiry_id';		
		$userdata = $this->auth->session_get_user();

		$param->approvalsource = [
			'id' => $id,
			'userdata' => $userdata,
			'date' => date("Y-m-d H:i:s"),
			'tablename_head' => $this->main_tablename,
			'tablename_appr' => $this->approval_tablename,
			'field_id' => $this->main_primarykey,
			'field_id_detil' => $this->approval_primarykey,

			'flag_head_isapprovalprogress' => $this->fields_isapprovalprogress,
			'flag_head_approve' => $this->field_isapprove,
			'flag_head_approveby' => $this->field_approveby,
			'flag_head_approvedate' => $this->field_approvedate,
			'flag_head_decline' => $this->field_isdecline,
			'flag_head_declineby' => $this->field_declineby,
			'flag_head_declinedate' => $this->field_declinedate,
			'flag_appr' => $this->approval_field_approve,
			'flag_decl' => $this->approval_field_decline,
			'appr_by' => $this->approval_field_approveby,
			'appr_date' => $this->approval_field_approvedate,
			'decl_by' => $this->approval_field_declineby,
			'decl_date' => $this->approval_field_declinedate,
			'notes' => $this->approval_field_notes,
			'approval_version' => $this->approval_field_version,
			'document_version' => $this->main_field_version
		];


		try {

			$useotp = property_exists($this, 'useotp') ? $this->useotp : true;
			if ($useotp) {
				$otp = \property_exists($param, 'otp') ?	$param->otp : '';
				$otpcode = \property_exists($param, 'otpcode') ? $param->otpcode : ''; 		
				try {
					OTP::Verify($this->db, $otp, $otpcode);
				} catch (\Exception $ex) {
					throw new WebException('OTP yang anda masukkan salah', 403);
				}
			}

			// $this->CURR = new Currency($this->db);
			$currentdata = (object)[
				'id' => $id,
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, $param->approve ? 'approve' : 'decline');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$ret = $this->approve($currentdata, $param, 'user_dept_id');

				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'inquiry_dtstart' => date("d/m/Y", strtotime($record['inquiry_dtstart'])),
					'inquiry_dtend' => date("d/m/Y", strtotime($record['inquiry_dtend'])),
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


				if ( $param->approve) {
					if ($ret->isfinalapproval) {
						$currentdata->dataresponse = $dataresponse;

						// Buat PA apabila request advance
						if ($dataresponse->inquiry_isadvance=='1') {
							$this->generate_advance($currentdata);
						}	
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'FINAL APPROVAL', $userdata->username, (object)[]);
					} else {
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'APPROVE', $userdata->username, (object)[]);
					}
				} else {
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'DECLINE', $userdata->username, (object)[]);
				}


				$this->db->commit();
				return (object)[
					'success' => true,
					'isfinalapproval' => $ret->isfinalapproval,
					'dataresponse' => $dataresponse
				];
				
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



	public function approve($currentdata, $param, $dept_id_field) {
		try {
			StandartApproval::CheckAuthoriryToApprove($this->db, $param, $dept_id_field);	
			StandartApproval::CheckPendingApproval($this->db, $param, $dept_id_field);

			$ret = (object)['isfinalapproval'=>false];
			if ($param->approve) {
				// echo "approving...\r\n";
				$ret = StandartApproval::Approve($this->db, $param, $dept_id_field);
				if ($ret->isfinalapproval) {
					$this->finalize($currentdata, $param, $dept_id_field);
					$this->create_inquiryitem_for_process($currentdata, $param, $dept_id_field);
				}
			} else {
				// echo "declining...\r\n";
				StandartApproval::Decline($this->db, $param, $dept_id_field);
				$this->remove_inquiryitem($currentdata, $param, $dept_id_field);
			}

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}


	function remove_inquiryitem($currentdata, $param, $dept_id_field) {
		try {
			$inquiry_id = $currentdata->header->inquiry_id;
			$sql = "delete from trn_inquiryitem where inquiry_id = :inquiry_id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquiry_id'=>$inquiry_id]);
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	function create_inquiryitem_for_process($currentdata, $param, $dept_id_field) {
		try {
			$this->remove_inquiryitem($currentdata, $param, $dept_id_field);

			// Get inquirytype data
			$inquirytype_id = $currentdata->header->inquirytype_id;
			$sql = "select * from mst_inquirytype where inquirytype_id = :inquirytype_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquirytype_id'=>$inquirytype_id]);
			$inquirytype = (object)$stmt->fetch(\PDO::FETCH_ASSOC);		
			
			$inquirytype_isqtybreakdown = $inquirytype->inquirytype_isqtybreakdown;
			

			$inquiry_id = $currentdata->header->inquiry_id;
			$sql = "select * from trn_inquirydetil where inquiry_id = :inquiry_id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquiry_id'=>$inquiry_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);		

			$itemproc = [];
			foreach ($rows as $row) {
				$inquirydetil_qty = $row['inquirydetil_qty'];
				$objdef = new \stdClass;
				
				$objdef->itemasset_id = $row['itemasset_id'];
				$objdef->item_id = $row['item_id'];
				$objdef->itemstock_id = $row['itemstock_id'];
				$objdef->partner_id = $row['partner_id'];
				$objdef->itemclass_id = $row['itemclass_id'];
				$objdef->inquirydetil_descr = $row['inquirydetil_descr'];
				$objdef->inquirydetil_qty = $row['inquirydetil_qty'];
				$objdef->inquirydetil_days = $row['inquirydetil_days'];
				$objdef->inquirydetil_task = $row['inquirydetil_task'];
				$objdef->inquirydetil_qty_proc = $row['inquirydetil_qty'];
				$objdef->proc_trxmodel_id = $inquirytype->trxmodel_id;
				$objdef->inquirydetil_qty_outstd = 0;
				$objdef->outstd_trxmodel_id = $inquirytype->trxmodel_id;
				$objdef->inquirydetil_estrate = $row['inquirydetil_estrate'];
				$objdef->inquirydetil_estvalue = $row['inquirydetil_estvalue'];
				$objdef->projbudgetdet_id = $row['projbudgetdet_id'];
				$objdef->inquirydetil_isunbudget = $row['inquirydetil_isunbudget'];
				$objdef->inquirydetil_isallowoverbudget = $row['inquirydetil_isallowoverbudget'];
				$objdef->accbudget_id = $row['accbudget_id'];
				$objdef->coa_id = $row['coa_id'];
				$objdef->inquirydetil_id = $row['inquirydetil_id'];
				$objdef->inquiry_id = $row['inquiry_id'];
				$objdef->_createby = $row['_createby'];
				$objdef->_createdate = $row['_createdate'];
				$objdef->_modifyby = $row['_modifyby'];
				$objdef->_modifydate = $row['_modifydate'];
				
				if ($inquirytype_isqtybreakdown==1) {
					for ($i=0; $i<$inquirydetil_qty; $i++) {
						$obj = clone $objdef;
						$obj->inquiryitem_id = \uniqid();
						$obj->inquirydetil_qty = 1;
						$obj->inquirydetil_qty_proc = 1;
						$obj->inquirydetil_qty_outstd = 0;
						$obj->inquirydetil_estvalue = $objdef->inquirydetil_estrate;
						$itemproc[] = $obj;
					}
				} else {
					$obj = clone $objdef;
					$obj->inquiryitem_id = \uniqid();
					$itemproc[] = $obj;
				}
			}


			foreach ($itemproc as $obj) {
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_inquiryitem", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}














	public function finalize($currentdata, $param, $dept_id_field) {

	}



	public function generate_advance($currentdata) {
		try {

			// $this->log('generate advance');

			$inquiry_id =  $currentdata->header->inquiry_id;
			$billin_id = $currentdata->header->inquiry_id;

			$stmt = $this->db->prepare("delete from trn_billindetil where billin_id=:billin_id");
			$stmt->execute([":billin_id"=>$billin_id]);

			$stmt = $this->db->prepare("delete from trn_billinpaym where billin_id=:billin_id");
			$stmt->execute([":billin_id"=>$billin_id]);			

			$stmt = $this->db->prepare("delete from trn_billin where billin_id=:billin_id");
			$stmt->execute([":billin_id"=>$billin_id]);			



			// total inquiry value;
			$sql = "select sum(inquirydetil_estvalue) as total_inquiry_idr from trn_inquirydetil where inquiry_id = :inquiry_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":inquiry_id"=>$inquiry_id]);
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total_inquiry_idr = $row['total_inquiry_idr'];
			

			// $this->log($currentdata->dataresponse);

			// buat header PA
			$obj = new \stdClass;
			$obj->billin_id = $billin_id;
			$obj->billtype_id = 'ADV';
			$obj->inquiry_id = $inquiry_id;
			$obj->billin_descr = $currentdata->dataresponse->inquiry_descr;
			$obj->periodemo_id = date('Ym');
			$obj->billin_date = date('Y-m-d');
			$obj->billin_datedue = date('Y-m-d');
			$obj->partner_id = $currentdata->dataresponse->partner_id;
			$obj->billin_valfrg = $total_inquiry_idr;
			$obj->curr_id = 'IDR';
			$obj->billin_valfrgrate = 1;
			$obj->billin_validr = $total_inquiry_idr;
			$obj->paymtype_id = $currentdata->dataresponse->paymtype_id;
			$obj->paymto_name = $currentdata->dataresponse->paymto_name;
			$obj->partnerbank_id = $currentdata->dataresponse->partnerbank_id;
			$obj->paymto_bankacc = $currentdata->dataresponse->paymto_bankacc;
			$obj->paymto_bankaccname = $currentdata->dataresponse->paymto_bankaccname;
			$obj->paymto_bankname = $currentdata->dataresponse->paymto_bankname;
			$obj->partnercontact_id = $currentdata->dataresponse->partnercontact_id;
			$obj->paymto_upname = $currentdata->dataresponse->paymto_upname;
			$obj->paymto_upposition = $currentdata->dataresponse->paymto_upposition;
			$obj->paymto_upphone = $currentdata->dataresponse->paymto_upphone;
			$obj->project_id = $currentdata->dataresponse->project_id;
			$obj->projecttask_id = $currentdata->dataresponse->projecttask_id;
			$obj->projbudget_id = $currentdata->dataresponse->projbudget_id;
			$obj->projbudgettask_id = $currentdata->dataresponse->projbudgettask_id;
			$obj->trxmodel_id = $currentdata->dataresponse->trxmodel_id;
			$obj->request_dept_id = $currentdata->dataresponse->user_dept_id;
			$obj->orderout_dept_id = $currentdata->dataresponse->user_dept_id;
			$obj->process_dept_id = $currentdata->dataresponse->user_dept_id;
			$obj->doc_id = 'BILLIN';
			$obj->billin_iscommit = 1;
			$obj->billin_isapproved = 1;
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billin", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			// buat payment term PA
			$obj = new \stdClass;
			$obj->billin_id = $billin_id;
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$obj->billinpaym_id = \uniqid();
			$obj->billinpaym_date =  date('Y-m-d');
			$obj->billinpaym_descr = $currentdata->dataresponse->inquiry_descr;
			$obj->curr_id = 'IDR';
			$obj->billinpaym_frgrate = 1;
			$obj->billinpaym_itemfrg = $total_inquiry_idr;
			$obj->billinpaym_itemidr = $total_inquiry_idr;
			$obj->billinpaym_ppnfrg = 0;
			$obj->billinpaym_ppnidr = 0;
			$obj->billinpaym_pphfrg = 0;
			$obj->billinpaym_pphidr = 0;
			$obj->coa_id = '1104020001';
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billinpaym", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			// buat detil PA
			$sql = "select * from trn_inquirydetil where inquiry_id = :inquiry_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":inquiry_id"=>$inquiry_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$obj = new \stdClass;
				$obj->billin_id = $billin_id;
				$obj->_createby =  $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$obj->billindetil_id = \uniqid();
				$obj->rowitem_id = 'ITEM';
				$obj->itemclass_id = $row['itemclass_id'];          
				$obj->projbudgetdet_id = $row['projbudgetdet_id'];
				$obj->billindetil_descr = $row['inquirydetil_descr'];
				$obj->billindetil_valfrg  = $row['inquirydetil_estvalue'];
				$obj->curr_id = 'IDR';
				$obj->billindetil_valfrgrate = 1;
				$obj->billindetil_validr = $row['inquirydetil_estvalue'];
				$obj->projbudget_id  = $currentdata->dataresponse->projbudget_id;   
				$obj->projbudgettask_id = $currentdata->dataresponse->projbudgettask_id;      
				$obj->accbudget_id = $row['accbudget_id'];         
				$obj->coa_id = $row['coa_id']; 
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);         
			}






		} catch (\Exception $ex) {
			$this->log($ex->getMessage());
			throw $ex;
		}
	}



};


