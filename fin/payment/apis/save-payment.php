<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * finact/fin/payment/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header payment (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/05/2021
 */
$API = new class extends paymentBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_jurnal';
		$primarykey = 'jurnal_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
			}

			$objA = new \stdClass;
			$objA->jurnal_id = $data->jurnal_id;
			$objA->jurnal_valfrg = $data->jurnal_valfrg;
			$objA->jurnal_valfrgrate = $data->jurnal_valfrgrate;
			$objA->jurnal_validr = $data->jurnal_validr;
			$objA->curr_id = $data->curr_id;
			$objA->coa_id = $data->coa_id;
			$objA->dept_id = $data->dept_id;
	

			$objB = new \stdClass;
			$objB->jurnal_id = $data->jurnal_id;
			$objB->paymtype_id = $data->paymtype_id;
			$objB->paymto_name = $data->paymto_name;



			$objB->paymto_bankacc = $data->paymto_bankacc;
			$objB->paymto_bankaccname = $data->paymto_bankaccname;
			$objB->paymto_bankname = $data->paymto_bankname;
			$objB->paymto_upname = $data->paymto_upname;
			$objB->paymto_upposition = $data->paymto_upposition;
			$objB->paymto_upphone = $data->paymto_upphone;
			$objB->paymto_gironum = $data->paymto_gironum;
			$objB->paymto_girodate = $data->paymto_girodate;
			$objB->bankrekening_id = $data->bankrekening_id;
			$objB->accfin_id = $data->accfin_id;			


			if ($data->paymtype_id=='TR') {
				$objB->paymto_gironum = '--NULL--';
				$objB->paymto_girodate = '--NULL--';
			} else if ($data->paymtype_id=='GI') {
				$objB->paymto_bankacc = '--NULL--';
				$objB->paymto_bankaccname = '--NULL--';
				$objB->paymto_bankname = '--NULL--';
			} else {
				$objB->paymto_gironum = '--NULL--';
				$objB->paymto_girodate = '--NULL--';
				$objB->paymto_bankacc = '--NULL--';
				$objB->paymto_bankaccname = '--NULL--';
				$objB->paymto_bankname = '--NULL--';
			}


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$action = 'MODIFY';

				// update trn_jurexpv
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_jurextpv", $objB, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				// update trn_jurnal
				$objA->_modifyby = $userdata->username;
				$objA->_modifydate = date("Y-m-d H:i:s");				
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_jurnal", $objA, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, "trn_jurnal", $objA->{$primarykey}, $action, $userdata->username, (object)[]);



				$this->Update_JurnalDetil_K($data, $userdata);


				// result -> view_jurnalpv
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select("view_jurnalpv" , [
					$primarykey
					, 'jurnal_id', 'jurnal_ref', 'periodemo_id', 'jurnal_date', 'billin_id', 'ap_jurnal_id', 'jurnal_descr', 'partner_id', 'jurnal_valfrg', 'curr_id', 'jurnal_valfrgrate', 'jurnal_validr', 'jurnaltype_id', 'jurnalsource_id', 'jurnal_version', 'jurnal_iscommit', 'jurnal_commitby', 'jurnal_commitdate', 'jurnal_ispost', 'jurnal_postby', 'jurnal_postdate', 'jurnal_isclose', 'jurnal_isagingclose', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'jurnal_date' => date("d/m/Y", strtotime($row['jurnal_date'])),
					'billin_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billin_id'], $this->db, 'trn_billin', 'billin_id', 'billin_descr'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
	
					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

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


	function Update_JurnalDetil_K($data, $userdata) {
		try {
			// cek existing data
			$stmt = $this->db->prepare("
				select
				  A.paym_jurnaldetil_id
				, (select jurnal_descr from trn_jurnal where jurnal_id = A.jurnal_id) as jurnal_descr
				, (select jurnaldetil_id from trn_jurnaldetil where jurnaldetil_id = A.paym_jurnaldetil_id  ) as jurnaldetil_id
				, (select jurnaldetil_id from trn_jurextpvdetil where jurnaldetil_id = A.paym_jurnaldetil_id  ) as jurextpvdetil_jurnaldetil_id
				, (select jurnaldetil_id from trn_jurnaldetil where jurnal_id = A.jurnal_id and jurnaldetil_dk='K' and jurnaldetil_id<>A.paym_jurnaldetil_id limit 1 ) as k_jurnaldetil_id
				, (select count(jurnaldetil_id) from trn_jurnaldetil where jurnal_id = A.jurnal_id and jurnaldetil_dk='K') as kcount
				from 
				trn_jurextpv A
				where
				A.jurnal_id = :jurnal_id
			");
			$stmt->execute([":jurnal_id" => $data->jurnal_id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);	


			$key = new \stdClass;
			$key->jurnaldetil_id = '';

			if (count($rows)>0) {
				$row = $rows[0];
				$paym_jurnaldetil_id = $row['paym_jurnaldetil_id'];
				$jurextpvdetil_jurnaldetil_id = $row['jurextpvdetil_jurnaldetil_id'];


				$objD = new \stdClass;
				$objD->jurnal_id = $data->jurnal_id;
				$objD->jurnaldetil_descr = $row['jurnal_descr'];
				$objD->coa_id = $data->coa_id;
				$objD->dept_id = $data->dept_id;
				$objD->partner_id = $data->partner_id;
				$objD->curr_id = $data->curr_id;
				$objD->jurnaldetil_valfrg = -1 * $data->jurnal_valfrg;
				$objD->jurnaldetil_valfrgrate = $data->jurnal_valfrgrate;
				$objD->jurnaldetil_validr = -1 * $data->jurnal_validr;
				$objD->jurnaldetil_dk = 'K';


				// $objE = new \stdClass;
				// $objE->jurnal_id = $data->jurnal_id;
				// $objE->billin_id = $data->billin_id;
				

				$action = '';
				if ($paym_jurnaldetil_id) {
					$action = 'MODIFY';
					$objD->jurnaldetil_id = $paym_jurnaldetil_id;
					$objD->_modifyby = $userdata->username;
					$objD->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_jurnaldetil", $objD, $key);

					$stmtext = $this->db->prepare("select jurnaldetil_id from trn_jurextpvdetil where jurnaldetil_id = :jurnaldetil_id");
					$stmtext->execute([':jurnaldetil_id'=>$objD->jurnaldetil_id]);
					$rows  = $stmtext->fetchall(\PDO::FETCH_ASSOC);

					// $objE->jurnaldetil_id = $objD->jurnaldetil_id;
					// if (count($rows)>0) {
					// 	$cmd_ext = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_jurextpvdetil", $objE, $key);
					// } else {
					// 	$cmd_ext = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurextpvdetil", $objE);
					// }	


				} else {
					$action = 'NEW';
					$objD->jurnaldetil_id = uniqid();
					$objD->_createby = $userdata->username;
					$objD->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $objD);

					// $objE->jurnaldetil_id = $objD->jurnaldetil_id;
					// $cmd_ext = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurextpvdetil", $objE);

				}	
				
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				// $stmt = $this->db->prepare($cmd_ext->sql);
				// $stmt->execute($cmd_ext->params);
				
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, "trn_jurnaldetil", $objD->jurnaldetil_id, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, "trn_jurnal", $objD->jurnal_id, $action . "_DETIL", $userdata->username, (object)[]);






				// update referensi header paym_jurnaldetil_id
				$stmt = $this->db->prepare("update trn_jurextpv set paym_jurnaldetil_id = :paym_jurnaldetil_id where jurnal_id = :jurnal_id ");
				$stmt->execute([':paym_jurnaldetil_id' => $objD->jurnaldetil_id, ':jurnal_id' => $objD->jurnal_id ]);
				
			}



		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};