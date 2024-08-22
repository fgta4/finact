<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR. '/core/sqlutil.php';
require_once __ROOT_DIR. '/core/sequencer.php';

// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;

// use \FGTA4\debug;




/**
 * finact/procurement/inquiry/apis/xapi.base.php
 *
 * inquiryBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul inquiry
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/07/2021
 */
class inquiryBase extends WebAPI {

	protected $main_tablename = "trn_inquiry";
	protected $main_primarykey = "inquiry_id";
	protected $main_field_version = "inquiry_version";	
	
	protected $field_iscommit = "inquiry_iscommit";
	protected $field_commitby = "inquiry_commitby";
	protected $field_commitdate = "inquiry_commitdate";		
			
	
	protected $fields_isapprovalprogress = "inquiry_isapprovalprogress";			
	protected $field_isapprove = "inquiry_isapproved";
	protected $field_approveby = "inquiry_approveby";
	protected $field_approvedate = "inquiry_approvedate";
	protected $field_isdecline = "inquiry_isdeclined";
	protected $field_declineby = "inquiry_declineby";
	protected $field_declinedate = "inquiry_declinedate";

	protected $approval_tablename = "trn_inquiryappr";
	protected $approval_primarykey = "inquiryappr_id";
	protected $approval_field_approve = "inquiryappr_isapproved";
	protected $approval_field_approveby = "inquiryappr_by";
	protected $approval_field_approvedate = "inquiryappr_date";
	protected $approval_field_decline = "inquiryappr_isdeclined";
	protected $approval_field_declineby = "inquiryappr_declinedby";
	protected $approval_field_declinedate = "inquiryappr_declineddate";
	protected $approval_field_notes = "inquiryappr_notes";
	protected $approval_field_version = "inquiry_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*inquiry*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
		
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function generate_request($id,  $userdata) {
		
		try {


			/* */
			$stmt = $this->db->prepare("delete from trn_orderoutitem where request_id=:request_id");
			$stmt->execute([":request_id"=>$id]);
			$stmt = $this->db->prepare("delete from trn_orderout where request_id=:request_id");
			$stmt->execute([":request_id"=>$id]);
			/* */


			$stmt = $this->db->prepare("delete from trn_requestitem where request_id=:request_id");
			$stmt->execute([":request_id"=>$id]);
			$stmt = $this->db->prepare("delete from trn_request where request_id=:request_id");
			$stmt->execute([":request_id"=>$id]);


			$header = $this->get_header_row($id);
			$obj = new \stdClass;
			$obj->request_id = $id ;
			$obj->inquiry_id = $id ;
			$obj->request_isunref = 0 ;
			$obj->inquirytype_id = $header->inquirytype_id ;
			$obj->user_dept_id =  $header->user_dept_id ;
			$obj->request_descr =  $header->inquiry_descr ;
			$obj->trxmodel_id =  $header->trxmodel_id ;
			$obj->request_dtstart =  $header->inquiry_dtstart ;
			$obj->request_dtend =  $header->inquiry_dtend ;
			$obj->project_id =  $header->project_id;
			$obj->projecttask_id =  $header->projecttask_id ;
			$obj->projbudget_id =  $header->projbudget_id ;
			$obj->projbudgettask_id =  $header->projbudgettask_id;
			$obj->request_isunbudgetted = $header->inquiry_isunbudgetted ;
			$obj->site_id = $header->site_id ;
			$obj->deliver_siteaddress =  $header->deliver_siteaddress ;
			$obj->deliver_city =  $header->deliver_city ;
			$obj->deliver_upname =  $header->deliver_upname ;
			$obj->deliver_uptelp =  $header->deliver_uptelp;
			$obj->inquirymodel_id =  $header->inquirymodel_id ;
			$obj->inquiryselect_id =  $header->inquiryselect_id;
			$obj->itemmanage_id =  $header->itemmanage_id ;
			$obj->owner_dept_id =  $header->owner_dept_id ;
			$obj->request_dept_id =  $header->user_dept_id ;
			$obj->orderout_dept_id =  $header->orderout_dept_id ;
			$obj->orderout_doc_id =  $header->orderout_doc_id;
			$obj->doc_id =  $header->request_doc_id ;
			$obj->request_version =  0 ;
			$obj->request_isdateinterval =  $header->inquiry_isdateinterval ;
			$obj->request_iscommit = 1 ;
			$obj->request_commitby =  $header->inquiry_commitby ;
			$obj->request_commitdate =  $header->inquiry_commitdate;
			$obj->request_isapprovalprogress = 1 ;
			$obj->request_isapproved = $header->inquiry_isapproved;
			$obj->request_approveby =  $header->inquiry_approveby ;
			$obj->request_approvedate =  $header->inquiry_approvedate ;
			$obj->request_isdeclined =  0 ;
			$obj->request_isautogenerated =  1;
			$obj->request_isitemdeptuser =  $header->inquiry_isitemdeptuser ;
			$obj->request_isitemdeptowner =  $header->inquiry_isitemdeptowner ;
			$obj->_createby = $header->_createby;
			$obj->_createdate = $header->_createdate;
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_request", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			// Item
			$stmt = $this->db->prepare("select * from trn_inquirydetil where inquiry_id = :inquiry_id");
			$stmt->execute([":inquiry_id"=>$id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$obj = new \stdClass;
				$obj->requestitem_id = \uniqid() ;
				$obj->itemasset_id =  $row['itemasset_id'] ;
				$obj->item_id =  $row['item_id'] ;
				$obj->itemstock_id =  $row['itemstock_id'] ;
				$obj->partner_id = $row['partner_id'] ;
				$obj->itemclass_id =  $row['itemclass_id'] ;
				$obj->requestitem_descr =  $row['inquirydetil_descr'] ;
				$obj->requestitem_qty =  $row['inquirydetil_qty'] ;
				$obj->requestitem_days =  $row['inquirydetil_days'] ;
				$obj->requestitem_task =  $row['inquirydetil_task'] ;
				$obj->requestitem_estrate =  $row['inquirydetil_estrate'] ;
				$obj->requestitem_estvalue =  $row['inquirydetil_estvalue'] ;
				$obj->projbudgetdet_id =  $row['projbudgetdet_id'] ;
				$obj->requestitem_isunbudget =  $row['inquirydetil_isunbudget'] ;
				$obj->requestitem_isallowoverbudget =  $row['inquirydetil_isallowoverbudget'] ;
				$obj->requestitem_isadvproces = $row['inquirydetil_isadvproces'] ;
				$obj->requestitem_value =  $row['inquirydetil_value'] ;
				$obj->requestitem_budgetavailable =  $row['inquirydetil_budgetavailable'] ;
				$obj->requestitem_qtyavailable =  $row['inquirydetil_qtyavailable'] ;
				$obj->accbudget_id =  $row['accbudget_id'] ;
				$obj->coa_id =  $row['coa_id'] ;
				$obj->inquiry_id =  $row['inquiry_id'] ;
				$obj->inquirydetil_id =  $row['inquirydetil_id'] ;
				$obj->request_id =  $id;
				$obj->_createby = $row['_createby'] ;
				$obj->_createdate = $row['_createdate'] ;

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_requestitem", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

			}

			$this->generate_orderout($id, $userdata);
		} catch (\Exception $ex) {
			throw $ex;
		}			
	}

	public function generate_orderout($id,  $userdata) {
		try {
			// $stmt = $this->db->prepare("delete from trn_orderoutitem where request_id=:request_id");
			// $stmt->execute([":request_id"=>$id]);
			$stmt = $this->db->prepare("delete from trn_orderout where request_id=:request_id");
			$stmt->execute([":request_id"=>$id]);
			

			$stmt = $this->db->prepare("select * from trn_request where request_id=:id");
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			$header =  (object)$rows[0];
			$owner_dept_id = $header->owner_dept_id;
			$owner_dept_seqcode = '';


			$breakdown_partner = true;
			if ($breakdown_partner) {
				
				$stmt = $this->db->prepare("
					select distinct partner_id from trn_requestitem where request_id=:id and requestitem_isadvproces=0
					union
					(select partner_id as partner_id from trn_requestitem  where request_id=:id and requestitem_isadvproces=1 limit 1)
				");
				$stmt->execute([":id" => $id]);
				$partnerrows = $stmt->fetchall(\PDO::FETCH_ASSOC);
				foreach ($partnerrows as $partner) {
			
					$stmt = $this->db->prepare("select * from trn_requestitem where request_id=:id and partner_id=:partner_id ");
					$stmt->execute([
						":id" => $id,
						":partner_id" => $partner['partner_id']
					]);
					$itemrows = $stmt->fetchall(\PDO::FETCH_ASSOC);

					foreach ($itemrows as $itemrow) {
						$partner_id = $itemrow['partner_id'];
						$partner =\FGTA4\utils\SqlUtility::LookupRow($partner_id, $this->db, 'mst_partner', 'partner_id');
						


						$orderout_id = $this->NewOrderoutId(['owner_dept_seqcode'=>$owner_dept_seqcode]);

						$obj = new \stdClass;
						$obj->orderout_id = $orderout_id ;
						$obj->request_id = $id ;
						$obj->inquiry_id = $id ;
						$obj->inquirytype_id =  $header->inquirytype_id ;
						$obj->user_dept_id =  $header->user_dept_id ;
						$obj->request_dept_id =  $header->request_dept_id ;
						$obj->orderout_descr =  $header->request_descr . " (" . $partner['partner_name'] . ")";
						$obj->trxmodel_id =  $header->trxmodel_id ;
						$obj->orderout_quot = "";
						$obj->orderout_dtstart =  $header->request_dtstart ;
						$obj->orderout_dtend =  $header->request_dtend ;
						$obj->project_id =  $header->project_id ;
						$obj->projecttask_id =  $header->projecttask_id ;
						$obj->projbudget_id =  $header->projbudget_id ;
						$obj->projbudgettask_id =  $header->projbudgettask_id ;
						$obj->orderout_isunbudgetted =  $header->request_isunbudgetted ;
						$obj->paymtype_id = 'TR';
						$obj->partner_id = $itemrow['partner_id'];
						// $obj->ordercontract_id =  $header ;
						// $obj->partnerbank_id =  $header ;
						$obj->partnerbank_name =  "" ;
						$obj->partnerbank_bankacc =  "" ;
						$obj->partnerbank_bankaccname =  "";
						$obj->partnerbank_bankname =  "" ;
						// $obj->partnercontact_id =  $header ;
						$obj->partnercontact_upname =  "" ;
						$obj->partnercontact_position =  "" ;
						$obj->partnercontact_upphone =  "" ;
						$obj->partnercontact_email =  "";
						$obj->curr_id = 'IDR' ;
						$obj->curr_rate =  1 ;
						// $obj->ppn_taxtype_id =  $header ;
						// $obj->pph_taxtype_id =  $header ;
						$obj->site_id =  $header->site_id ;
						$obj->recv_dept_id =  $header->user_dept_id  ;
						$obj->deliver_siteaddress =  $header->deliver_siteaddress ;
						$obj->deliver_city =  $header->deliver_city ;
						$obj->deliver_upname =  $header->deliver_upname ;
						$obj->deliver_uptelp =  $header->deliver_uptelp ;
						$obj->inquirymodel_id =  $header->inquirymodel_id ;
						$obj->inquiryselect_id =  $header->inquiryselect_id ;
						$obj->itemmanage_id =  $header->itemmanage_id ;
						$obj->owner_dept_id =  $header->owner_dept_id ;
						$obj->orderout_dept_id =  $header->orderout_dept_id ;
						$obj->doc_id =  $header->orderout_doc_id ;
						$obj->orderout_version =  1 ;
						$obj->orderout_isdateinterval =  $header->request_isdateinterval ;
						$obj->orderout_isautogenerated =  1 ;
						$obj->_createby = $header->_createby;
						$obj->_createdate = $header->_createdate;

						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderout", $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);


						// Data Detil

						$obj = new \stdClass;
						$obj->orderoutitem_id = \uniqid();
						$obj->itemasset_id = $itemrow['itemasset_id'];
						$obj->item_id = $itemrow['item_id'];
						$obj->itemstock_id = $itemrow['itemstock_id'];
						$obj->partner_id = $itemrow['partner_id'];
						$obj->itemclass_id = $itemrow['itemclass_id'];
						$obj->orderoutitem_descr = $itemrow['requestitem_descr'];
						$obj->orderoutitem_qty = $itemrow['requestitem_qty'];
						$obj->orderoutitem_days = $itemrow['requestitem_days'];
						$obj->orderoutitem_task = $itemrow['requestitem_task'];
						$obj->orderoutitem_rate = $itemrow['requestitem_estrate'];
						$obj->orderoutitem_value = $itemrow['requestitem_estvalue'];
						$obj->curr_id = 'IDR';
						$obj->curr_rate = 1;
						$obj->orderoutitem_idr = $itemrow['requestitem_estvalue'];
						$obj->projbudgetdet_id = $itemrow['projbudgetdet_id'];
						$obj->orderoutitem_isunbudget = $itemrow['requestitem_isunbudget'];
						$obj->orderoutitem_isallowoverbudget = $itemrow['requestitem_isallowoverbudget'];
						$obj->orderoutitem_budgetavailable = $itemrow['requestitem_budgetavailable'];
						$obj->orderoutitem_qtyavailable = $itemrow['requestitem_qtyavailable'];
						$obj->accbudget_id = $itemrow['accbudget_id'];
						$obj->coa_id = $itemrow['coa_id'];
						$obj->request_id = $itemrow['request_id'];
						$obj->requestitem_id = $itemrow['requestitem_id'];
						$obj->inquiry_id = $itemrow['inquiry_id'];
						$obj->inquiryitem_id = $itemrow['inquiryitem_id'];
						$obj->orderout_id = $orderout_id;
						$obj->_createby = $header->_createby;
						$obj->_createdate = $header->_createdate;

						
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderoutitem", $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);



					}	
				}







			}




			// buat Advance Request
			//  and requestitem_isadvproces=1
			$stmt = $this->db->prepare("select *, (select partner_id from trn_inquiry where inquiry_id=A.request_id) as partner_id from trn_request A where request_id=:id");
			$stmt->execute([
				":id" => $id
			]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			$header =  (object)$rows[0];

			$stmt = $this->db->prepare("delete from trn_billindetil where billin_id=:id");
			$stmt->execute([":id" => $id]);
			$stmt = $this->db->prepare("delete from trn_billin where billin_id=:id");
			$stmt->execute([":id" => $id]);

			$obj = new \stdClass;
			$obj->billin_id	= $id;
			$obj->billtype_id = 'ADV';	
			$obj->billin_descr= $header->request_descr;	
			$obj->periodemo_id = '202110';
			$obj->billin_date = $header->request_dtstart;
			$obj->billin_datedue= $header->request_dtstart;
			$obj->partner_id = $header->partner_id;
			$obj->paymtype_id = 'CA';	
			$obj->curr_id = 'IDR';	
			$obj->project_id = $header->project_id;
			$obj->projecttask_id = $header->projecttask_id ;
			$obj->projbudget_id = $header->projbudget_id ;
			$obj->projbudgettask_id = $header->projbudgettask_id ;
			$obj->trxmodel_id = $header->trxmodel_id ;
			$obj->request_dept_id = $header->request_dept_id;
			$obj->orderout_dept_id = $header->orderout_dept_id;
			$obj->process_dept_id = '12112000';
			$obj->doc_id = 'BILLIN';
			$obj->_createby = $header->_createby;
			$obj->_createdate = $header->_createdate;
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billin", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			$stmt = $this->db->prepare("select * from trn_requestitem where request_id=:id and requestitem_isadvproces=1");
			$stmt->execute([ ":id" => $id ]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$requestitem_value_total = 0; 
			foreach ($rows as $row) {
				$this->log($row);
				$requestitem_value = (float)$row['requestitem_value'];
				$requestitem_value_total += $requestitem_value;

				$obj = new \stdClass;
				$obj->billin_id	= $id;
				$obj->billindetil_id = \uniqid();
				$obj->rowitem_id = 'ITEM';
				$obj->itemclass_id = $row['itemclass_id'];
				$obj->projbudgetdet_id = $row['projbudgetdet_id'];
				$obj->billindetil_descr = $row['requestitem_descr'];
				$obj->billindetil_valfrg = $requestitem_value ;
				$obj->billindetil_valfrgrate = 1;
				$obj->curr_id = 'IDR';
				$obj->billindetil_validr = $requestitem_value ;
				$obj->accbudget_id = $row['accbudget_id'];
				$obj->coa_id = $row['coa_id'];
				$obj->_createby = $header->_createby;
				$obj->_createdate = $header->_createdate;
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

			}			



			// SUM TOTAL
			$stmt = $this->db->prepare("
				update trn_billin
				set
				billin_validr = :billin_validr,
				billin_valfrg = :billin_valfrg,
				billin_valfrgrate = 1
				where
				billin_id=:id
			");
			$stmt->execute([ 
				":id" => $id,  
				":billin_validr" => $requestitem_value_total,
				":billin_valfrg" => $requestitem_value_total,
			]);



		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function NewOrderoutId($param) {
		$seqname = 'PO';
		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
	}


}