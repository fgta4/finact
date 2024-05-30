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

			$obj = new \stdClass;
			$obj->jurnal_id = $data->jurnal_id;
			$obj->jurnal_ref = $data->jurnal_ref;
			$obj->periodemo_id = $data->periodemo_id;	
			$obj->jurnal_date = (\DateTime::createFromFormat('d/m/Y',$data->jurnal_date))->format('Y-m-d');
			$obj->jurnal_datedue = $obj->jurnal_date;
			$obj->jurnal_descr = $data->jurnal_descr;
			$obj->partner_id = $data->partner_id;
			$obj->jurnal_valfrg = $data->jurnal_valfrg;
			$obj->jurnal_valfrgrate = $data->jurnal_valfrgrate;
			$obj->jurnal_validr = $data->jurnal_validr;
			$obj->curr_id = $data->curr_id;
			$obj->jurnaltype_id = $data->jurnaltype_id;
			$obj->jurnalsource_id = $data->jurnalsource_id;	


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

				
				$extdata = $this->Update_JurnalExtended($obj, $data, $key);
				$this->Update_Pembayaran($obj, $data, $key, $extdata, $userdata);



				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);



				// result -> view_jurnalpv
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select("view_jurnalpv" , [
					$primarykey
					, 'jurnal_id', 'jurnal_ref', 'periodemo_id', 'jurnal_date', 'billin_id', 'billinpaym_id', 'ap_jurnal_id', 'jurnal_descr', 'partner_id', 'jurnal_valfrg', 'curr_id', 'jurnal_valfrgrate', 'jurnal_validr', 'jurnaltype_id', 'jurnalsource_id', 'jurnal_version', 'jurnal_iscommit', 'jurnal_commitby', 'jurnal_commitdate', 'jurnal_ispost', 'jurnal_postby', 'jurnal_postdate', 'jurnal_isclose', 'jurnal_isagingclose', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'billinpaym_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billinpaym_id'], $this->db, 'trn_billinpaym', 'billinpaym_id', 'billinpaym_descr'),
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


	public function getBillinInfo($billin_id) {
		try {
			$stmt = $this->db->prepare("
				select 
					  *
					, (select partner_name from mst_partner where partner_id=A.partner_id) as partner_name 
				from trn_billin A 
				where billin_id = :billin_id
			");
			$stmt->execute([":billin_id" => $billin_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			if (count($rows)==0) {
				return null;
			} else {
				return $rows[0];
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function getParnerInfo($partner_id) {
		try {
			$stmt = $this->db->prepare("
				select 
					  *
				from mst_partner A 
				where partner_id = :partner_id
			");
			$stmt->execute([":partner_id" => $partner_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			if (count($rows)==0) {
				return null;
			} else {
				return $rows[0];
			}
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	public function Update_JurnalExtended($jurnal, $data, $key) {
		try {
			$tablename = "trn_jurextpv";

			// cek apakah data sudah ada
			$stmt = $this->db->prepare("select jurnal_id from {$tablename} where jurnal_id = :jurnal_id");
			$stmt->execute([":jurnal_id" => $jurnal->jurnal_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			if (count($rows)==0) {

				// Data Jurnal Extended
				$obj = new \stdClass;
				$obj->jurnal_id = $jurnal->jurnal_id;

				$billinfo = $this->getBillinInfo($data->billin_id);
				if ($billinfo!=null) {
					$obj->billin_id = $data->billin_id;
					$obj->billinpaym_id = $data->billinpaym_id;
					$obj->paymtype_id =  $billinfo['paymtype_id'];
					$obj->partnerbank_id = $billinfo['partnerbank_id'];
					$obj->paymto_name = $billinfo['partner_name'];
					$obj->paymto_bankacc = $billinfo['paymto_bankacc'];
					$obj->paymto_bankaccname = $billinfo['paymto_bankaccname'];
					$obj->paymto_bankname = $billinfo['paymto_bankname'];
					$obj->paymto_upname = $billinfo['paymto_upname'];
					$obj->paymto_upposition = $billinfo['paymto_upposition'];
					$obj->paymto_upphone = $billinfo['paymto_upphone'];
				} else {
					$partner = $this->getParnerInfo($data->partner_id);
					if ($partner!=null) {
						$obj->paymto_name = $partner['partner_name'];
					}
				}

				$key = new \stdClass;
				$key->jurnal_id = $jurnal->jurnal_id;


				// $stmt_cekext = $this->db->prepare("select jurnal_id from {$tablename} where jurnal_id = :jurnal_id");
				// $stmt_cekext->execute([":jurnal_id" => $obj->jurnal_id]);
				// $rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	

				// Insert data baru
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function Update_Pembayaran($jurnal, $data, $key, $extdata, $userdata) {
		try {
			switch ($jurnal->jurnaltype_id) {
				case 'PV-ADVPAYM' :
					$this->Update_Pembayaran_Adv($jurnal, $data, $key, $extdata, $userdata); // Debet
					break;

				case 'PV-APPAYM' :
					$this->Update_Pembayaran_AP($jurnal, $data, $key, $extdata, $userdata);
					break;	
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function Update_Pembayaran_Adv($jurnal, $data, $key, $extdata, $userdata) {
		try {
			$billin_id = $data->billin_id;

			$stmt_cek = $this->db->prepare("
				select * from trn_jurextpvdetil where jurnal_id=:jurnal_id and billinpaym_id = :billinpaym_id
			");

			$sql = "
				select
				  B.billinpaym_id,	
				  B.billinpaym_id as jurnaldetil_id
				, B.billinpaym_descr as jurnaldetil_descr
				, B.coa_id
				, A.request_dept_id as dept_id
				, A.partner_id as partner_id
				, B.curr_id as curr_id
				, (select sum(billinpaym_itemfrg) + sum(billinpaym_ppnfrg) from trn_billinpaym where billin_id=A.billin_id and (billinpaym_itemfrg<>0 or billinpaym_ppnfrg<>0)) as jurnaldetil_valfrg
				, B.billinpaym_frgrate
				, (select sum(billinpaym_itemidr) + sum(billinpaym_ppnidr) from trn_billinpaym where billin_id=A.billin_id and (billinpaym_itemfrg<>0 or billinpaym_ppnfrg<>0)) as jurnaldetil_validr
				, (select sum(billinpaym_itemfrg) + sum(billinpaym_ppnfrg) from trn_billinpaym where billin_id=A.billin_id and (billinpaym_itemfrg<>0 or billinpaym_ppnfrg<>0)) as jurnaldetil_outstanding_frg
				, (select sum(billinpaym_itemidr) + sum(billinpaym_ppnidr) from trn_billinpaym where billin_id=A.billin_id and (billinpaym_itemfrg<>0 or billinpaym_ppnfrg<>0)) as jurnaldetil_outstanding_idr
				from
				trn_billin A inner join trn_billinpaym B on B.billin_id = A.billin_id
				where 
				A.billin_id = :billin_id and B.billinpaym_itemfrg <> 0
				limit 1			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":billin_id" => $billin_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$billinpaym_id = $row['billinpaym_id'];
				$stmt_cek->execute([':jurnal_id'=>$jurnal->jurnal_id, ':billinpaym_id'=>$billinpaym_id]);
				$rows_cek = $stmt_cek->fetchAll(\PDO::FETCH_ASSOC);
				if (count($rows_cek)==0) {
					$obj = new \stdClass;
					$obj->jurnaldetil_id = $row['jurnaldetil_id'];
					$obj->jurnaldetil_descr = $row['jurnaldetil_descr'];
					$obj->coa_id = $row['coa_id'];
					$obj->dept_id = $row['dept_id'];
					$obj->partner_id = $row['partner_id'];
					$obj->curr_id = $row['curr_id'];
					$obj->jurnaldetil_valfrg = $row['jurnaldetil_valfrg'];
					$obj->jurnaldetil_valfrgrate = $row['billinpaym_frgrate'];
					$obj->jurnaldetil_validr = $row['jurnaldetil_validr'];
					$obj->jurnaldetil_outstanding_frg = $row['jurnaldetil_outstanding_frg'];
					$obj->jurnaldetil_outstanding_frg = $row['jurnaldetil_outstanding_frg'];
					$obj->jurnaldetil_dk = 'D';
					$obj->jurnal_id = $jurnal->jurnal_id;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnaldetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

					$obj = new \stdClass;
					$obj->jurnaldetil_id = $row['jurnaldetil_id'];
					$obj->billin_id	= $billin_id;
					$obj->billinpaym_id	= $billinpaym_id;
					$obj->jurnal_id = $jurnal->jurnal_id;

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurextpvdetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}
			}			


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function Update_Pembayaran_AP($jurnal, $data, $key, $extdata, $userdata) {
		try {
			$billin_id = $data->billin_id;


			$stmt_cek = $this->db->prepare("
				select * from trn_jurnaldetil where jurnal_id=:jurnal_id and jurnaldetil_id_ref = :jurnaldetil_id_ref
			");


			$sql = "
				select 
				C.jurnal_id as jurnal_id_ref,
				C.jurnaldetil_id as jurnaldetil_id_ref,
				C.jurnaldetil_descr ,
				C.coa_id ,
				C.dept_id ,
				C.partner_id ,
				C.curr_id ,
				C.jurnaldetil_valfrg ,
				C.jurnaldetil_valfrgrate ,
				C.jurnaldetil_validr
				from
				trn_billin A inner join trn_jurextap B on B.billin_id = A.billin_id
							inner join trn_jurnaldetil C on C.jurnal_id = B.jurnal_id and C.jurnaldetil_dk = 'K'
				where 
				A.billin_id = 'PA21070004'			
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([":billin_id" => $billin_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$jurnal_id_ref = $row['jurnal_id_ref'];
				$jurnaldetil_id_ref = $row['jurnaldetil_id_ref'];
				$stmt_cek->execute([':jurnal_id'=>$jurnal->jurnal_id, ':jurnaldetil_id_ref'=>$jurnaldetil_id_ref]);
				$rows_cek = $stmt_cek->fetchAll(\PDO::FETCH_ASSOC);
				if (count($rows_cek)==0) {
					$jurnaldetil_id = \uniqid();

					$obj = new \stdClass;
					$obj->jurnaldetil_id = $jurnaldetil_id;
					$obj->jurnaldetil_descr = $row['jurnaldetil_descr'];
					$obj->coa_id = $row['coa_id'];
					$obj->dept_id = $row['dept_id'];
					$obj->partner_id = $row['partner_id'];
					$obj->curr_id = $row['curr_id'];
					$obj->jurnaldetil_valfrg = $row['jurnaldetil_valfrg'];
					$obj->jurnaldetil_valfrgrate = $row['jurnaldetil_valfrgrate'];
					$obj->jurnaldetil_validr = $row['jurnaldetil_validr'];
					$obj->jurnaldetil_id_ref = $jurnaldetil_id_ref;
					$obj->jurnaldetil_dk = 'D';
					$obj->jurnal_id = $jurnal->jurnal_id;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnaldetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

					$obj = new \stdClass;
					$obj->jurnaldetil_id = $jurnaldetil_id;
					$obj->billin_id	= $billin_id;
					$obj->billinpaym_id	= $data->billinpaym_id;
					$obj->ap_jurnal_id = $jurnal_id_ref;
					$obj->jurnal_id = $jurnal->jurnal_id;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurextpvdetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

				}

			}
			

		} catch (\Exception $ex) {
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


	public function AddDebet($obj, $userdata) {

	}

};