<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__.'/xtion.base.php';

use \FGTA4\utils\Sequencer;
use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends XtionBase {

	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/billin-verify.txt";
		// debug::disable();
		debug::start($logfilepath, "w");

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
		// debug::printtoscreen();

		$userdata = $this->auth->session_get_user();
		try {
			$data = (object)[
				'header' => $this->get_header_row($id),
				'detil'  => $this->get_detil_rows($id),
				'currentuser' => $userdata
			];


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {


				$this->pre_approve_check($data);

				$final_approve = true;				
				if ($final_approve) {
					$data->header->paym_id = $this->get_paym_newid();
					$data->header->billin_approveby = $userdata->username;
					$data->header->billin_approvedate = date("Y-m-d H:i:s");
	
					$paym = (object)[
						'header' => $this->create_docpaym_header($data),
						'detil' => $this->create_docpaym_detil($data),
						'currentuser' => $userdata
					];

					debug::log($paym->header);

					$this->save_to_paym($paym);
					$this->update_and_set_approve_flag($data);

					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, 'trn_billin', $data->header->billin_id, 'APPROVE FINAL', $userdata->username, (object)[]);
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, 'trn_billin', $data->header->billin_id, 'GENERATE PV', $userdata->username, 
						(object)['note'=>$paym->header->paym_id]
					);

					\FGTA4\utils\SqlUtility::WriteLog($this->db, 'finact/acct/paym', 'trn_paym', $paym->header->paym_id, 'GENERATED FROM BILL', $userdata->username, 
						(object)['note'=>$data->header->billin_id]
					);

				} else {
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, 'trn_billin', $data->header->billin_id, 'APPROVE PARTIAL', $userdata->username, (object)[]);
				}


				debug::log('approve berhasil');
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


	function create_docpaym_header($data) {
		$parnerbank = $this->get_partner_bank($data->header->partner_id);
		$parnercontact = $this->get_partner_contact($data->header->partner_id);
		
		$header = (object)[
			'paym_id' => $data->header->paym_id,
			'paym_ref' => $data->header->billin_ref,
			'paym_date' => $data->header->billin_datedue,
			'paym_descr' => $data->header->billin_descr,
			'paym_valfrg' => $data->header->billin_valfrg,
			'paym_valfrgrate' => 1,
			'paym_validr' => $data->header->billin_validr,
			'billtype_id' => $data->header->billtype_id,
			'curr_id' => $data->header->curr_id,
			'billin_id' => $data->header->billin_id,
			'dept_id' => $data->header->dept_id,
			'process_dept_id' => $data->header->process_dept_id,
			'doc_id' => 'PAYM',
			'partner_id' => $data->header->partner_id ,
			'payto_name' => $data->header->partner_name,
			'payto_bankacc' => $parnerbank->payto_bankacc,
			'payto_bankaccname' => $parnerbank->payto_bankaccname,
			'payto_bankname' => $parnerbank->payto_bankname,
			'payto_upname' => $parnercontact->payto_upname,
			'payto_upposition' => $parnercontact->payto_upposition,
			'payto_upphone' => $parnercontact->payto_upphone,
			'projbudget_id' => $data->header->projbudget_id,
			'projbudgettask_id' => $data->header->projbudgettask_id == '' ? '--NULL--' : $data->header->projbudgettask_id, 
			'periodemo_id' => $data->header->periodemo_id,
			'paymtype_id' => $data->header->paymtype_id,
			'coa_id' => $data->header->coa_id,
			'_createby' => $data->currentuser->username,
			'_createdate' => date("Y-m-d H:i:s")
		];

		
		return $header;
	}

	function create_docpaym_detil($data) {
		$record = [];
		foreach ($data->detil as $detil) {
			$record[] = (object)[
				'paymdetil_id' => uniqid(),
				'paymdetil_descr' => $detil->billindetil_descr,
				'paymdetil_valfrg' => (float) $detil->billindetil_valfrg,
				'paymdetil_valfrgrate' => (float) $detil->billindetil_valfrgrate,
				'paymdetil_validr' => (float) $detil->billindetil_validr,
				'paym_id' => $data->header->paym_id,
				'curr_id' => $detil->curr_id,
				'itemclass_id' => $detil->itemclass_id,
				'accbudget_id' => $detil->accbudget_id,
				'coa_id' => $detil->coa_id,
				'_createby' => $data->header->_createby,
				'_createdate' => $data->header->_createdate,
			];
		}
		return $record;
	}

	function get_paym_newid() {
		$seqname = 'PV';

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);

		$id = $seqname . $raw['ye'] . $raw['mo'] . \str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;
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
	


	function save_to_paym($paym) {
		try {

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_paym', $paym->header);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);	


			foreach ($paym->detil as $detil) {
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_paymdetil', $detil);
				$stmt = $this->db->prepare($cmd->sql);	
				$stmt->execute($cmd->params);	
			}

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}


	function update_and_set_approve_flag($data) {
		try {
			$sql = " 
				update trn_billin
				set 
				paym_id = :paym_id,
				billin_isapprove = 1,
				billin_approveby = :approveby,
				billin_approvedate = :approvedate
				where
				billin_id = :billin_id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":billin_id" => $data->header->billin_id,
				":paym_id" => $data->header->paym_id,
				":approveby" => $data->header->billin_approveby,
				":approvedate" => $data->header->billin_approvedate
			]);
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	

	function pre_approve_check($data) {
		// cek $data billin sebelum di approve
		try {

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};