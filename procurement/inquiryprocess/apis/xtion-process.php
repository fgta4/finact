<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;

/**
 * finact/procurement/inquiry/apis/xtion-generaterequest.php
 */
$API = new class extends inquiryprocessBase {

	const TRX_PUR = 'PUR';
	const TRX_REN = 'REN';
	const TRX_SER = 'SER';
	const TRX_TAL = 'TAL';
	const TRX_USE = 'USE';
	


	public function execute($id, $param) {
		$userdata = $this->auth->session_get_user();

		try {

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$this->ProcessInquiry($id);
				

				$this->db->commit();
				return (object)[
					'success' => true,
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


	function ProcessInquiry($id) {
		try {
			$this->RemoveResponse($id);
			
			$sql = "
				select A.*
				from trn_inquiry A
				where
				A.inquiry_id = :inquiry_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquiry_id' => $id]);
			$inquiry  = $stmt->fetch(\PDO::FETCH_ASSOC);	

			$this->log($inquiry);

			$sql = "
				select B.* 
				from trn_inquiryitem B 
				where
				B.inquiry_id = :inquiry_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquiry_id' => $id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);	

			$resp_move_item = array();
			$resp_move_asset = array();
			$resp_request_pur = array();
			$resp_request_ren = array();
			$resp_request_ser = array();
			$resp_request_tal = array();
			
			foreach ($rows as $row) {

				$proc_trxmodel_id = $row['proc_trxmodel_id'];
				$proc_qty = $row['inquirydetil_qty_proc'];
				$outs_trxmodel_id = $row['outstd_trxmodel_id'];
				$outs_qty = $row['inquirydetil_qty_outstd'];


				$itemasset_id = $row['itemasset_id'];
				if ($proc_qty>0) {
					if ($proc_trxmodel_id==self::TRX_USE) {
						// ke assetmove atau itemmove
						if ($itemasset_id!=null) {
							$resp_move_asset[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
						} else {
							$resp_move_item[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
						}
					} else if ($proc_trxmodel_id==self::TRX_PUR) {
						$resp_request_pur[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
					} else if ($proc_trxmodel_id==self::TRX_REN) {
						$resp_request_ren[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
					} else if ($proc_trxmodel_id==self::TRX_SER) {
						$resp_request_ser[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
					} else if ($proc_trxmodel_id==self::TRX_TAL) {
						$resp_request_tal[] = (object)['trxmodel_id'=>$proc_trxmodel_id, 'qty'=>$proc_qty, 'row'=>$row]; 
					}
				}

				if ($outs_qty>0) {
					if ($outs_trxmodel_id==self::TRX_USE) {
						// ke assetmove atau itemmove
						if ($itemasset_id!=null) {
							$resp_move_asset[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
						} else {
							$resp_move_item[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
						}
					} else if ($outs_trxmodel_id==self::TRX_PUR) {
						$resp_request_pur[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
					} else if ($outs_trxmodel_id==self::TRX_REN) {
						$resp_request_ren[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
					} else if ($outs_trxmodel_id==self::TRX_SER) {
						$resp_request_ser[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
					} else if ($outs_trxmodel_id==self::TRX_TAL) {
						$resp_request_tal[] = (object)['trxmodel_id'=>$outs_trxmodel_id, 'qty'=>$outs_qty, 'row'=>$row]; 
					}
				}
			}


			// use asset
			if (count($resp_move_asset)>0) {
				$this->CreateAssetMove($inquiry, $resp_request);
			}

			// use items
			if (count($resp_move_item)>0) {
				$this->CreateItemMove($inquiry, $resp_request);
			}

			// purchase
			if (count($resp_request_pur)>0) {
				$this->CreateRequest('PUR', $inquiry, $resp_request_pur);
				$this->CreateItemMove($inquiry, $resp_request_pur);
			}

			// rental
			if (count($resp_request_ren)>0) {
				$this->CreateRequest('REN', $inquiry, $resp_request_ren);
				$this->CreateItemMove($inquiry, $resp_request_ren);
			}

			// service
			if (count($resp_request_ser)>0) {
				$this->CreateRequest('SER', $inquiry, $resp_request_ser);
			}

			// talent
			if (count($resp_request_tal)>0) {
				$this->CreateRequest('TAL', $inquiry, $resp_request_tal);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function CreateRequest($trxmodel_id, $inquiry, $rows) {
		$userdata = $this->auth->session_get_user();

		try {
			// create request header
			$request_id = $this->RequestNewId([]);

			$obj = new \stdClass;
			$obj->request_id = $request_id;
			$obj->inquiry_id = $inquiry['inquiry_id'];
			$obj->inquirytype_id = $inquiry['inquirytype_id'];
			$obj->user_dept_id = $inquiry['user_dept_id'];
			$obj->request_descr = $inquiry['inquiry_descr'];
			$obj->trxmodel_id = $trxmodel_id;
			$obj->request_dtstart = $inquiry['inquiry_dtstart'];
			$obj->request_dtend = $inquiry['inquiry_dtend'];
			$obj->project_id = $inquiry['project_id'];
			$obj->projecttask_id = $inquiry['projecttask_id'];
			$obj->projbudget_id = $inquiry['projbudget_id'];
			$obj->projbudgettask_id = $inquiry['projbudgettask_id'];
			$obj->request_isunbudgetted = $inquiry['inquiry_isunbudgetted'];
			$obj->site_id = $inquiry['site_id'];
			$obj->deliver_siteaddress = $inquiry['deliver_siteaddress'];
			$obj->deliver_city = $inquiry['deliver_city'];
			$obj->deliver_upname = $inquiry['deliver_upname'];	
			$obj->deliver_uptelp = $inquiry['deliver_uptelp'];
			$obj->inquirymodel_id = $inquiry['inquirymodel_id'];
			$obj->inquiryselect_id	= $inquiry['inquiryselect_id'];
			$obj->inquiry_selectfield = $inquiry['inquiry_selectfield'];
			$obj->itemmanage_id	= $inquiry['itemmanage_id'];
			$obj->owner_dept_id	= $inquiry['owner_dept_id'];
			$obj->request_dept_id = $inquiry['request_dept_id'];	
			$obj->orderout_dept_id = $inquiry['orderout_dept_id'];
			$obj->orderout_doc_id = $inquiry['orderout_doc_id'];
			$obj->doc_id = $inquiry['request_doc_id'];
			$obj->request_version = 0;
			$obj->request_isdateinterval = $inquiry['inquiry_isdateinterval'];
			$obj->request_isautogenerated = 1;
			$obj->request_isitemdeptuser = $inquiry['inquiry_isitemdeptuser'];
			$obj->request_isitemdeptowner = $inquiry['inquiry_isitemdeptowner'];
			$obj->_createby = $userdata->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_request", $obj);

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			foreach ($rows as $data) {
				// $this->log($data);
				$qty = $data->qty;

				$row = $data->row;
				$obj = new \stdClass;
				$obj->requestitem_id = \uniqid();
				$obj->itemasset_id = $row['itemasset_id'];
				$obj->item_id = $row['item_id'];
				$obj->itemstock_id = $row['itemstock_id'];
				$obj->partner_id = $row['partner_id'];
				$obj->itemclass_id = $row['itemclass_id'];
				$obj->requestitem_descr = $row['inquirydetil_descr'];
				$obj->requestitem_qty = $qty;
				$obj->requestitem_days = 1;
				$obj->requestitem_task = 1;
				$obj->requestitem_estrate = $row['inquirydetil_estrate'];
				$obj->requestitem_estvalue = $row['inquirydetil_estvalue'];
				$obj->projbudgetdet_id = $row['projbudgetdet_id'];
				$obj->requestitem_isadvproces = 0;
				$obj->requestitem_isunbudget = $row['inquirydetil_isunbudget'];
				$obj->requestitem_isallowoverbudget = $row['inquirydetil_isallowoverbudget'];
				$obj->requestitem_value = $row['inquirydetil_estvalue'];
				$obj->requestitem_budgetavailable = 0;
				$obj->requestitem_qtyavailable = 0;
				$obj->accbudget_id = $row['accbudget_id'];
				$obj->coa_id = $row['coa_id'];
				$obj->inquiry_id = $row['inquiry_id'];
				$obj->inquirydetil_id = $row['inquirydetil_id'];
				$obj->request_id = $request_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_requestitem", $obj);
				// $request_id
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

			}
			
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function RequestNewId($param) {
		$seqname = 'PR';
		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
	}




	function CreateAssetMove($inquiry, $rows) {
		try {


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function CreateItemMove($inquiry, $rows) {
		try {


		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function RemoveResponse($id) {
		try {
			$sql_delete_itemaasetmovedetil = "
				delete A.*, B.* from trn_itemassetmovedetil A
				inner join trn_itemassetmove B on A.itemassetmove_id = B.itemassetmove_id
				where
				B.inquiry_id = :inquiry_id 
			";
			$stmt = $this->db->prepare($sql_delete_itemaasetmovedetil);
			$stmt->execute([':inquiry_id' => $id]);


			$sql_delete_itemassetmove = "
				delete A.*, B.* from trn_requestitem A
				inner join  trn_request B on A.request_id = B.request_id
				where
				B.inquiry_id = :inquiry_id
			";

			$stmt = $this->db->prepare($sql_delete_itemassetmove);
			$stmt->execute([':inquiry_id' => $id]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}
};


