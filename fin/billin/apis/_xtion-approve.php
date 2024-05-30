<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR . "/core/sequencer.php";



use \FGTA4\utils\Sequencer;
use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


class Approve extends WebAPI {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/inquiry.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}

	public function execute($id) {
		$userdata = $this->auth->session_get_user();
		try {


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();
			
			try {
				$this->set_approval_flag($id, $userdata);
				
				$paymdoc = $this->create_paym_doc($id, $userdata);
				$this->save_to_paym($paymdoc);
				
				$this->db->commit();
				return true;
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


	public function set_approval_flag($id, $userdata) {
		try {

			$sql = " 
				update trn_billin
				set 
				billin_isapprove = 1,
				billin_approveby = :user_id,
				billin_approvedate = :date
				where
				billin_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,
				":user_id" => $userdata->username,
				":date" => date("Y-m-d H:i:s")
			]);	

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function save_to_paym($paymdoc) {
		try {

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_paym', $paymdoc->header);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);	

			foreach ($paymdoc->detil as $detil) {
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_paymdetil', $detil);
				$stmt = $this->db->prepare($cmd->sql);	
				$stmt->execute($cmd->params);	
			}

			// print_r($paymdoc);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function create_paym_doc($id, $userdata) {
		try {
			$paymskel = $this->get_payment_skel($id);
			$paymskel->paym_id = $this->paym_newid();

			$paytobank = $this->get_partner_bank($paymskel->partner_id);
			$paymskel->payto_bankacc =  $paytobank->payto_bankacc ;
			$paymskel->payto_bankaccname =  $paytobank->payto_bankaccname ;
			$paymskel->payto_bankname =  $paytobank->payto_bankname ;

			$paytoup = $this->get_partner_contact($paymskel->partner_id);
			$paymskel->payto_upname  = $paytoup->payto_upname;
			$paymskel->payto_upposition = $paytoup->payto_upposition;
			$paymskel->payto_upphone = $paytoup->payto_upphone;

			$paymskel->projbudgettask_id  = $paymskel->projbudgettask_id ? $paymskel->projbudgettask_id : '--NULL--';

			$paymskel->coa_id = '1002104';

			$paymskel->_createby = $userdata->username;
			$paymskel->_createdate = date("Y-m-d H:i:s");


			$paymdetilskel = $this->get_paymdetil_skel($id, $paymskel);

			return (object)[
				'header' => $paymskel,
				'detil' => $paymdetilskel
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function paym_newid() {
		$seqname = 'PV';

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);

		$id = $seqname . $raw['ye'] . $raw['mo'] . \str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;
	}

	public function get_payment_skel($id) {
		try {
			$sql = "
				select 
					'' as paym_id,
					A.billin_ref as paym_ref,
					A.billin_datedue as paym_date,
					A.billin_descr as paym_descr,
					(select sum(billindetil_valfrg) from trn_billindetil where billin_id = A.billin_id) as paym_valfrg,
					1 as paym_valfrgrate,
					(select sum(billindetil_validr) from trn_billindetil where billin_id = A.billin_id) as paym_validr,
					A.billtype_id,
					A.curr_id,
					A.billin_id,
					A.dept_id ,
					A.process_dept_id,
					'PAYM' as doc_id,
					A.partner_id ,
					(select partner_name from mst_partner where partner_id = A.partner_id) as payto_name,
					'' as payto_bankacc,
					'' as payto_bankaccname,
					'' as payto_bankname,
					'' as payto_upname,
					'' as payto_upposition,
					'' as payto_upphone,
					A.projbudget_id,
					A.projbudgettask_id,
					A.periodemo_id,
					A.paymtype_id,
					'' as coa_id
				from
				trn_billin A
				where
				billin_id = :id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			if (count($rows)==0) { throw new \Exception("Data request '$id' tidak ditemukan!"); }

			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}


	public function get_paymdetil_skel($id, $head) {
		try {
			$sql = "
				select 
				'' as paymdetil_id,
				A.billindetil_descr as paymdetil_descr,
				A.billindetil_valfrg as paymdetil_valfrg,
				A.billindetil_valfrgrate as paymdetil_valfrgrate,
				A.billindetil_validr as paymdetil_validr,
				'' as paym_id,
				A.curr_id,
				A.itemclass_id,
				'' as accbudget_id,
				'' as coa_id
				from 
				trn_billindetil A inner join mst_itemclass B on B.itemclass_id = A.itemclass_id 
				where
				billin_id = :id			
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($rows as $row) {
				$obj = (object)$row;
				$obj->paym_id = $head->paym_id;
				$obj->paymdetil_id = uniqid();
				$obj->accbudget_id = '1250200';
				$obj->coa_id = '1220504';
				$obj->_createby = $head->_createby;
				$obj->_createdate = $head->_createdate;			
				$record[] = $obj;
			}

			return $record;

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	public function get_partner_bank($partner_id) {
		$obj = (object)[
			'payto_bankacc' => '',
			'payto_bankaccname' => '',
			'payto_bankname' => ''
		];

		try {

			$sql = "
				select A.*,
				(select bank_name from mst_bank where bank_id = A.bank_id) as bank_name 
				from mst_partnerbank A where A.partner_id = :id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$partner_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			if (count($rows)) {
				$row = $rows[0];
				$obj->payto_bankacc = $row['partnerbank_accnum'];
				$obj->payto_bankaccname = $row['partnerbank_accname'];
				$obj->payto_bankname = $row['bank_name'];
			}

			return $obj;

		} catch (\Exception $ex) {
			throw $ex;
		}			

	}

	public function get_partner_contact($partner_id) {
		$obj = (object)[
			'payto_upname' => '',
			'payto_upposition' => '',
			'payto_upphone' => ''
		];

		try {

			$sql = "
				select A.* 
				from mst_partnercontact A where A.partner_id = :id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$partner_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

			if (count($rows)) {
				$row = $rows[0];
				$obj->payto_upname = $row['partnercontact_name'];
				$obj->payto_upposition = $row['partnercontact_position'];
				$obj->payto_upphone = $row['partnercontact_mobilephone'];
			}

			return $obj;

		} catch (\Exception $ex) {
			throw $ex;
		}			

	}
	
	


	

}


$API = new Approve();

