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
 * finact/fin/billin/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header billin (trn_billin)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/05/2021
 */
$API = new class extends billinBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_billin';
		$primarykey = 'billin_id';
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
			$obj->billin_date = (\DateTime::createFromFormat('d/m/Y',$obj->billin_date))->format('Y-m-d');			$obj->billin_datedue = (\DateTime::createFromFormat('d/m/Y',$obj->billin_datedue))->format('Y-m-d');


			// if ($obj->billin_ref=='--NULL--') { unset($obj->billin_ref); }
			// if ($obj->projecttask_id=='--NULL--') { unset($obj->projecttask_id); }
			// if ($obj->trxmodel_id=='--NULL--') { unset($obj->trxmodel_id); }
			// if ($obj->billin_taxcode=='--NULL--') { unset($obj->billin_taxcode); }
			// if ($obj->purchorder_id=='--NULL--') { unset($obj->purchorder_id); }
			// if ($obj->purchrecv_id=='--NULL--') { unset($obj->purchrecv_id); }
			// if ($obj->projbudget_id=='--NULL--') { unset($obj->projbudget_id); }
			// if ($obj->projbudgettask_id=='--NULL--') { unset($obj->projbudgettask_id); }
			// if ($obj->paymto_name=='--NULL--') { unset($obj->paymto_name); }
			// if ($obj->paymto_bankacc=='--NULL--') { unset($obj->paymto_bankacc); }
			// if ($obj->paymto_bankaccname=='--NULL--') { unset($obj->paymto_bankaccname); }
			// if ($obj->paymto_bankname=='--NULL--') { unset($obj->paymto_bankname); }
			// if ($obj->paymto_upname=='--NULL--') { unset($obj->paymto_upname); }
			// if ($obj->paymto_upposition=='--NULL--') { unset($obj->paymto_upposition); }
			// if ($obj->paymto_upphone=='--NULL--') { unset($obj->paymto_upphone); }
			// if ($obj->billin_notes=='--NULL--') { unset($obj->billin_notes); }

			if ($obj->projbudgettask_id=='') { $obj->projbudgettask_id = '--NULL--'; }


			unset($obj->billin_notes);
			unset($obj->billin_version);
			unset($obj->billin_iscommit);
			unset($obj->billin_commitby);
			unset($obj->billin_commitdate);
			unset($obj->billin_isapprovalprogress);
			unset($obj->billin_isapproved);
			unset($obj->billin_approveby);
			unset($obj->billin_approvedate);
			unset($obj->billin_isdeclined);
			unset($obj->billin_declineby);
			unset($obj->billin_declinedate);



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


				$this->AddItem($obj, $userdata);

				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'billin_id', 'billtype_id', 'billin_ref', 'billin_descr', 'project_id', 'projecttask_id', 'periodemo_id', 'billin_date'
					, 'billin_datedue', 'trxmodel_id', 'billin_taxcode', 'orderout_id', 'recv_id', 'dept_id', 'process_dept_id'
					, 'projbudget_id', 'projbudgettask_id', 'partner_id', 'partnerbank_id', 'partnercontact_id', 'paymtype_id', 'paymto_name', 'paymto_bankacc', 'paymto_bankaccname'
					, 'paymto_bankname', 'paymto_upname', 'paymto_upposition', 'paymto_upphone', 'curr_id', 'billin_valfrgrate', 'billin_valfrg'
					, 'billin_validr', 'billin_notes', 'billin_version', 'doc_id', 'billin_iscommit', 'billin_commitby', 'billin_commitdate'
					, 'billin_isapprovalprogress', 'billin_isapproved', 'billin_approveby', 'billin_approvedate', 'billin_isdeclined'
					, 'billin_declineby', 'billin_declinedate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$sel_projecttask_id = \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_id');
				$sel_projecttask_name = \FGTA4\utils\SqlUtility::Lookup($sel_projecttask_id, $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name');

				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
					
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'billin_date' => date("d/m/Y", strtotime($row['billin_date'])),
					'billin_datedue' => date("d/m/Y", strtotime($row['billin_datedue'])),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
					'recv_descr' => \FGTA4\utils\SqlUtility::Lookup($record['purchrecv_id'], $this->db, 'trn_purchrecv', 'purchrecv_id', 'recv_descr'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'process_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['process_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projbudgettask_name' => $sel_projecttask_name,
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum,'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'billin_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['billin_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'billin_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['billin_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'billin_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['billin_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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

	public function NewId($param) {
		
			$seqname = 'PA';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}


	public function AddItem($obj, $userdata) {
		/*pre*/
		$sqlcek = "select billindetil_id from trn_billindetil where rowitem_id ='ITEM' and orderoutitem_id= :orderoutitem_id";
		$stmtcek = $this->db->prepare($sqlcek);
	
		$sqlcek = "select billindetil_id from trn_billindetil where rowitem_id ='PPH' and billin_id = :billin_id";
		$stmtcek_ppn = $this->db->prepare($sqlcek);
		
		$sqlcek = "select billindetil_id from trn_billindetil where rowitem_id ='PPN'  and billin_id = :billin_id";
		$stmtcek_pph = $this->db->prepare($sqlcek);


		$billindetil_valfrgrate = 0;
		
		/*do*/
		$orderout_id = $obj->orderout_id;
		if ($orderout_id==null) {
			return;
		}

		$billin_id = $obj->billin_id;
		$sql = "
			select 
			A.* 
			, (select projbudget_id from mst_projbudgetdet where projbudgetdet_id=A.projbudgetdet_id) as projbudget_id
			from 
			trn_orderoutitem A where A.orderout_id=:orderout_id 
		";
		$stmt = $this->db->prepare($sql);
		$stmt->execute([':orderout_id' => $orderout_id]);
		$orders  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		$billindetil_valfrg_total = 0; 
		foreach ($orders as $order) {
			$orderoutitem_id = $order['orderoutitem_id'];
			$stmtcek->execute([':orderoutitem_id' => $orderoutitem_id]);
			$currentbillindetil  = $stmtcek->fetch(\PDO::FETCH_ASSOC);

			$billindetil = new \stdClass;
			$billindetil->rowitem_id = 'ITEM';
			$billindetil->itemclass_id = $order['itemclass_id'];
			$billindetil->projbudgetdet_id = $order['projbudgetdet_id'];
			$billindetil->billindetil_descr = $order['orderout_descr'];
			$billindetil->billindetil_valfrg = (float)$order['orderout_value'];
			$billindetil->curr_id = $order['curr_id'];
			$billindetil->billindetil_valfrgrate = $order['curr_rate'];
			$billindetil->billindetil_validr = $order['orderout_idr'];
			$billindetil->billindetil_valavailable = $order['orderout_budgetavailable'];
			$billindetil->projbudget_id = $order['projbudget_id'];
			// $billindetil->projbudgettask_id = $order['projbudgettask_id'];
			$billindetil->accbudget_id = $order['accbudget_id'];
			$billindetil->coa_id = $order['coa_id'];
			$billindetil->billin_id = $billin_id;

			$billindetil_valfrg_total += $billindetil->billindetil_valfrg;
			$billindetil_valfrgrate = $billindetil->billindetil_valfrgrate;

			if ($currentbillindetil) {
				$billindetil->billindetil_id = $currentbillindetil['billindetil_id'];
				$billindetil->_modifyby = $userdata->username;
				$billindetil->_modifydate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_billindetil", $billindetil, (object)['billindetil_id'=>$billindetil->billindetil_id]);
			} else {
				$billindetil->billindetil_id = \uniqid();
				$billindetil->orderoutitem_id =  $order['orderoutitem_id']; 
				$billindetil->_createby = $userdata->username;
				$billindetil->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $billindetil);
			}

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

		}

	

		$orderout = \FGTA4\utils\SqlUtility::LookupRow($orderout_id, $this->db, 'trn_orderout', 'orderout_id');
		$ppn_taxtype_id = $orderout['ppn_taxtype_id'];
		$pph_taxtype_id = $orderout['pph_taxtype_id'];

		$billindetil_tax_ppn = 0;
		$billindetil_tax_pph = 0;
		$billindetil_item = $billindetil_valfrg_total;
		

		if ($ppn_taxtype_id!=null) {
			$ppn =  \FGTA4\utils\SqlUtility::LookupRow($ppn_taxtype_id, $this->db, 'mst_taxtype', 'taxtype_id');
			$taxtype_value = (float)$ppn['taxtype_value'];
			$taxtype_coa = $ppn['billin_coa_id'];
			$billindetil_tax_ppn = ($taxtype_value/100) * $billindetil_valfrg_total;

			$billindetil = new \stdClass;
			$billindetil->rowitem_id = 'PPN';
			$billindetil->billindetil_descr = 'PPN';
			$billindetil->billindetil_valfrg = $billindetil_tax_ppn;
			$billindetil->curr_id = $order['curr_id'];
			$billindetil->billindetil_valfrgrate = $order['curr_rate'];
			$billindetil->billindetil_validr = $billindetil_tax_ppn * $billindetil->billindetil_valfrgrate;
			$billindetil->coa_id = $taxtype_coa;
			$billindetil->billin_id = $billin_id;

			$stmtcek_ppn->execute([':billin_id' => $billin_id]);
			$currentbillindetil  = $stmtcek_ppn->fetch(\PDO::FETCH_ASSOC);
			// if ($currentbillindetil) {
			// 	$billindetil->billindetil_id = $currentbillindetil['billindetil_id'];
			// 	$billindetil->_modifyby = $userdata->username;
			// 	$billindetil->_modifydate = date("Y-m-d H:i:s");
			// 	$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_billindetil", $billindetil, (object)['billindetil_id'=>$billindetil->billindetil_id]);
			// } else {
				$billindetil->billindetil_id = \uniqid();
				$billindetil->orderoutitem_id =  $order['orderoutitem_id']; 
				$billindetil->_createby = $userdata->username;
				$billindetil->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $billindetil);
			// }

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);
		}


		if ($pph_taxtype_id!=null) {
			$pph =  \FGTA4\utils\SqlUtility::LookupRow($pph_taxtype_id, $this->db, 'mst_taxtype', 'taxtype_id');
			$taxtype_value = (float)$pph['taxtype_value'];
			$taxtype_coa = $pph['billin_coa_id'];
			$billindetil_tax_pph = ($taxtype_value/100) * $billindetil_valfrg_total;


			$billindetil = new \stdClass;
			$billindetil->rowitem_id = 'PPH';
			$billindetil->billindetil_descr = 'PPh';
			$billindetil->billindetil_valfrg = -$billindetil_tax_pph;
			$billindetil->curr_id = $order['curr_id'];
			$billindetil->billindetil_valfrgrate = $order['curr_rate'];
			$billindetil->billindetil_validr = -$billindetil_tax_pph * $billindetil->billindetil_valfrgrate;
			$billindetil->coa_id = $taxtype_coa;
			$billindetil->billin_id = $billin_id;

			$stmtcek_pph->execute([':billin_id' => $billin_id]);
			$currentbillindetil  = $stmtcek_pph->fetch(\PDO::FETCH_ASSOC);
			// if ($currentbillindetil) {
			// 	$billindetil->billindetil_id = $currentbillindetil['billindetil_id'];
			// 	$billindetil->_modifyby = $userdata->username;
			// 	$billindetil->_modifydate = date("Y-m-d H:i:s");
			// 	$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_billindetil", $billindetil, (object)['billindetil_id'=>$billindetil->billindetil_id]);
			// } else {
				$billindetil->billindetil_id = \uniqid();
				$billindetil->orderoutitem_id =  $order['orderoutitem_id']; 
				$billindetil->_createby = $userdata->username;
				$billindetil->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $billindetil);
			// }

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			$billindetil_item = $billindetil_valfrg_total - $billindetil_tax_pph;
		}



		// paymn
		$sqlcek = "select billin_id from trn_billinpaym where billin_id = :billin_id";
		$stmtcek = $this->db->prepare($sqlcek);
		$stmtcek->execute([':billin_id' => $billin_id]);
		$rows  = $stmtcek->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)==0) {
			$billinpaym = new \stdClass;
			$billinpaym->billinpaym_id = \uniqid();
			$billinpaym->billinpaym_date = $obj->billin_date;
			$billinpaym->billinpaym_descr = $obj->billin_descr;	
			$billinpaym->curr_id = $obj->curr_id;
			$billinpaym->billinpaym_frgrate = $billindetil_valfrgrate;	
			$billinpaym->billinpaym_itemfrg	= $billindetil_item;
			$billinpaym->billinpaym_itemidr	= $billindetil_valfrgrate * $billindetil_item;
			$billinpaym->billinpaym_ppnfrg = $billindetil_tax_ppn;	
			$billinpaym->billinpaym_ppnidr	= $billindetil_valfrgrate * $billindetil_tax_ppn;
			$billinpaym->billinpaym_pphfrg = $billindetil_tax_pph;	
			$billinpaym->billinpaym_pphidr	= $billindetil_valfrgrate * $billindetil_tax_pph;
			$billinpaym->billin_id = $billin_id;	
			$billinpaym->_createby = $userdata->username;
			$billinpaym->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billinpaym", $billinpaym);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);
		}






	}

};