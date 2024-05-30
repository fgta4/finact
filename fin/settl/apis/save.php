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
 * finact/fin/settl/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header settl (trn_settl)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 30/11/2021
 */
$API = new class extends settlBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_settl';
		$primarykey = 'settl_id';
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
			$obj->settl_date = (\DateTime::createFromFormat('d/m/Y',$obj->settl_date))->format('Y-m-d');



			if ($obj->settl_ref=='') { $obj->settl_ref = '--NULL--'; }


			unset($obj->settl_iscommit);
			unset($obj->settl_commitby);
			unset($obj->settl_commitdate);
			unset($obj->settl_isapprovalprogress);
			unset($obj->settl_isapproved);
			unset($obj->settl_approveby);
			unset($obj->settl_approvedate);
			unset($obj->settl_isdeclined);
			unset($obj->settl_declineby);
			unset($obj->settl_declinedate);
			unset($obj->settl_ispost);
			unset($obj->settl_postby);
			unset($obj->settl_postdate);



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
					, 'settl_id', 'settl_ref', 'periodemo_id', 'settl_date', 'billinpaym_id', 'partner_id', 'settl_descr', 'curr_id'
					, 'adv_valfrg', 'adv_valfrgrate', 'adv_validr', 'rmb_valfrg', 'rmb_valfrgrate', 'rmb_validr', 'ret_valfrg', 'ret_valfrgrate', 'ret_validr'
					, 'inquiry_id', 'paym_jurnal_id', 'paym_jurnaldetil_id', 'adv_coa_id', 'dept_id', 'doc_id', 'settl_version', 'settl_iscommit', 'settl_commitby', 'settl_commitdate', 'settl_isapprovalprogress', 'settl_isapproved', 'settl_approveby', 'settl_approvedate', 'settl_isdeclined', 'settl_declineby', 'settl_declinedate', 'settl_ispost', 'settl_postby', 'settl_postdate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				$billinpaym = \FGTA4\utils\SqlUtility::LookupRow($record['billinpaym_id'], $this->db, 'trn_billinpaym', 'billinpaym_id');
				$jurnal = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id');
				$jurnaldetil = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id');

				
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'settl_date' => date("d/m/Y", strtotime($row['settl_date'])),
					'billinpaym_caption' => "[".$billinpaym['billin_id']."] " . $billinpaym['billinpaym_descr'],
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'paym_jurnal_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id', 'jurnal_descr'),
					'paym_jurnal_caption' => "[".$jurnal['jurnal_id']."] " . $jurnal['jurnal_descr'],

					'paym_jurnaldetil_descr' => \FGTA4\utils\SqlUtility::Lookup($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id', 'jurnaldetil_descr'),
					'paym_jurnaldetil_caption' =>  "[".$jurnaldetil['jurnaldetil_id']."] " . $jurnaldetil['jurnaldetil_descr'],
					
					'adv_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['adv_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'settl_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'settl_postby' => \FGTA4\utils\SqlUtility::Lookup($record['settl_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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
		
			$seqname = 'ST';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};