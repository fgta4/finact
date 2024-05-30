<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __ROOT_DIR.'/core/sequencer.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;
use FGTA4StandartApproval;
use \FGTA4\StandartApproval;




/**
 * finact/fin/paymentscd/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
$API = new class extends paymentscdBase {

	public function execute($id, $param) {
		$tablename = 'trn_paymentscd';
		$primarykey = 'paymentscd_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

		
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$this->generatepv($currentdata);
				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'paymentscd_dtstart' => date("d/m/Y", strtotime($record['paymentscd_dtstart'])),
					'paymentscd_dtend' => date("d/m/Y", strtotime($record['paymentscd_dtend'])),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'paymentscd_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'paymentscd_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'paymentscd_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'paymentscd_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'COMMIT', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
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


	public function generatepv($currentdata) {
		try {

			$paymentscd_id = $currentdata->header->paymentscd_id;
			$sql = "select * from trn_paymentscdbillin where paymentscd_id = :paymentscd_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":paymentscd_id" => $paymentscd_id
			]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);	
			

			$sql_billin = "select * from trn_billin where billin_id = :billin_id";
			$stmt_billin = $this->db->prepare($sql_billin);

			$sql_billinpaym = "select * from trn_billinpaym where billinpaym_id = :billinpaym_id";
			$stmt_billinpaym = $this->db->prepare($sql_billinpaym);

			foreach ($rows as $row) {
				$billin_id = $row['billin_id'];
				$stmt_billin->execute([':billin_id' => $billin_id]);
				$row_billin = $stmt_billin->fetch(\PDO::FETCH_ASSOC);
			
				$billinpaym_id = $row['billinpaym_id'];
				$stmt_billinpaym->execute([':billinpaym_id' => $billinpaym_id]);
				$row_billinpaym = $stmt_billinpaym->fetch(\PDO::FETCH_ASSOC);
			

				$this->CreatePV((object)[
					'currentdata' => $currentdata,
					'billin' => $row_billin,
					'billinpaym' => $row_billinpaym,
					'row' => $row
				]);

			}


		} catch (Exception $ex) {
			throw $ex;
		}		
	}
	
	
	function CreatePV($data) {
	
		$currentdata = $data->currentdata;
		$billin = $data->billin;
		$billinpaym = $data->billinpaym;
		$row = $data->row;

		try {
			// PV Number	
			$pv_jurnal_id = $billinpaym['pv_jurnal_id'];
			if ($pv_jurnal_id==null) {
				$pv_jurnal_id = $this->NewId([]);
			}

			// Cek apakah PV sudah ada
			$sql_pvjurnal = "select * from trn_jurnal where jurnal_id = :jurnal_id";
			$stmt_pvjurnal = $this->db->prepare($sql_pvjurnal);
			$stmt_pvjurnal->execute([':jurnal_id' => $pv_jurnal_id]);
			$rows = $stmt_pvjurnal->fetchall(\PDO::FETCH_ASSOC);	
			if (count($rows)>0) {
				$this->db->query("SET FOREIGN_KEY_CHECKS=0;");
				$this->db->query("delete from trn_jurextpv where jurnal_id='$pv_jurnal_id'");
				$this->db->query("delete from trn_jurextpvdetil where jurnal_id='$pv_jurnal_id'");
				$this->db->query("delete from trn_jurnaldetil where jurnal_id='$pv_jurnal_id'");
				$this->db->query("delete from trn_jurnal where jurnal_id='$pv_jurnal_id'");
				$this->db->query("SET FOREIGN_KEY_CHECKS=1;");
			}


			$jurnaltype_id = 'PV-APPAYM';
			if ($billin->billtype_id=='ADV') {
				$jurnaltype_id = 'PV-ADVPAYM';
			} 

			// // PV Header
			$obj = new \stdClass;
			$obj->jurnal_id = $pv_jurnal_id;
			$obj->jurnal_ref = $billin['billin_ref'];
			$obj->jurnal_date = $row['billinpaym_datescd'];
			$obj->jurnal_datedue = $row['billinpaym_datescd'];
			$obj->jurnal_descr = $row['billinpaym_descr'];
			$obj->periodemo_id = $currentdata->header->periodemo_id;
			// $obj->coa_id = '';
			$obj->dept_id = $currentdata->header->dept_id;
			$obj->partner_id = $billin['partner_id'];
			$obj->jurnal_valfrg = $row['billinpaym_itemfrg'] + $row['billinpaym_ppnfrg'] - $row['billinpaym_pphfrg'];
			$obj->curr_id = $row['curr_id'];
			$obj->jurnal_valfrgrate = 1;
			$obj->jurnal_validr = $row['billinpaym_itemidr'] + $row['billinpaym_ppnidr'] - $row['billinpaym_pphudr'];
			$obj->jurnaltype_id = $jurnaltype_id;
			$obj->jurnalsource_id = 'PAYMENT';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnal", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);
			

			// PV Detil
			// Payment (Kredit)
			$paym_jurnaldetil_id = \uniqid();	
			$obj = new \stdClass;
			$obj->jurnal_id = $pv_jurnal_id;
			$obj->jurnaldetil_id = $paym_jurnaldetil_id;	
			$obj->jurnaldetil_descr	= $row['billinpaym_descr'];
			$obj->coa_id = '1101021106';
			$obj->coa_nameshort	= 'BNI- ac: 1179550362';
			$obj->dept_id = $currentdata->header->dept_id;
			$obj->partner_id =  $billin['partner_id'];
			$obj->curr_id =$row['curr_id'];
			$obj->jurnaldetil_valfrg =  ($row['billinpaym_itemfrg'] + $row['billinpaym_ppnfrg'] - $row['billinpaym_pphfrg']) * -1;	
			$obj->jurnaldetil_valfrgrate = 1;
			$obj->jurnaldetil_validr =  ($row['billinpaym_itemfrg'] + $row['billinpaym_ppnfrg'] - $row['billinpaym_pphfrg']) * -1;
			$obj->jurnaldetil_dk = 'K';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			// Hutang (Debet)
			$obj = new \stdClass;
			$obj->jurnal_id = $pv_jurnal_id;
			$obj->jurnaldetil_id = \uniqid();		
			$obj->jurnaldetil_descr	= $billin['billin_descr'];
			$obj->coa_id = '2010400001';
			$obj->coa_nameshort	= 'Hutang Operasional Rupiah';
			$obj->dept_id = $currentdata->header->dept_id;
			$obj->partner_id =  $billin['partner_id'];
			$obj->curr_id =$row['curr_id'];
			$obj->jurnaldetil_valfrg =  ($row['billinpaym_itemfrg'] + $row['billinpaym_ppnfrg'] - $row['billinpaym_pphfrg']);	
			$obj->jurnaldetil_valfrgrate = 1;
			$obj->jurnaldetil_validr =  ($row['billinpaym_itemfrg'] + $row['billinpaym_ppnfrg'] - $row['billinpaym_pphfrg']);
			$obj->jurnaldetil_dk = 'D';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);



			
			// // PV Extension
			$obj = new \stdClass;
			$obj->jurnal_id = $pv_jurnal_id;
			$obj->billin_id = $billin['billin_id'];
			$obj->billinpaym_id = $billinpaym['billinpaym_id'];
			// $obj->ap_jurnal_id = ??
			$obj->paymtype_id = $billin['paymtype_id'];
			$obj->partnerbank_id = $billin['partnerbank_id'];
			$obj->paymto_name  = $billin['paymto_name'];     
			$obj->paymto_bankacc = $billin['paymto_bankacc'];    
			$obj->paymto_bankaccname = $billin['paymto_bankaccname'];
			$obj->paymto_bankname = $billin['paymto_bankname'];  
			$obj->partnercontact_id = $billin['partnercontact_id'];
			$obj->paymto_upname = $billin['paymto_upname'];
			$obj->paymto_upposition = $billin['paymto_upposition'];
			$obj->paymto_upphone = $billin['paymto_upphone'];   
			$obj->paym_jurnaldetil_id = $paym_jurnaldetil_id;
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurextpv", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			$obj = new \stdClass;
			$obj->jurnaldetil_id = $paym_jurnaldetil_id;	
			$obj->billin_id = $billin['billin_id'];
			$obj->billinpaym_id = $billinpaym['billinpaym_id'];
			// $obj->ap_jurnal_id = ??
			$obj->jurnal_id = $pv_jurnal_id;
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurextpvdetil", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


		} catch (Exception $ex) {
			throw $ex;
		}	
	}


	public function NewId($param) {
		
		$seqname = 'PV';

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
		
}	
			

};


