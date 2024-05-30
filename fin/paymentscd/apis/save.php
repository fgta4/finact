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
 * finact/fin/paymentscd/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header paymentscd (trn_paymentscd)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
$API = new class extends paymentscdBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_paymentscd';
		$primarykey = 'paymentscd_id';
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
			$obj->paymentscd_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->paymentscd_dtstart))->format('Y-m-d');
			$obj->paymentscd_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->paymentscd_dtend))->format('Y-m-d');



			if ($obj->paymentscd_notes=='') { $obj->paymentscd_notes = '--NULL--'; }


			unset($obj->paymentscd_notes);
			unset($obj->paymentscd_version);
			unset($obj->paymentscd_iscommit);
			unset($obj->paymentscd_commitby);
			unset($obj->paymentscd_commitdate);
			unset($obj->paymentscd_isapprovalprogress);
			unset($obj->paymentscd_isapproved);
			unset($obj->paymentscd_approveby);
			unset($obj->paymentscd_approvedate);
			unset($obj->paymentscd_isdeclined);
			unset($obj->paymentscd_declineby);
			unset($obj->paymentscd_declinedate);
			unset($obj->paymentscd_isveryfied);
			unset($obj->paymentscd_verifyby);
			unset($obj->paymentscd_verifydate);



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
					, 'paymentscd_id', 'periodemo_id', 'paymentscd_dtstart', 'paymentscd_dtend', 'paymentscd_descr', 'dept_id', 'paymentscd_notes', 'paymentscd_version', 'doc_id', 'paymentscd_iscommit', 'paymentscd_commitby', 'paymentscd_commitdate', 'paymentscd_isapprovalprogress', 'paymentscd_isapproved', 'paymentscd_approveby', 'paymentscd_approvedate', 'paymentscd_isdeclined', 'paymentscd_declineby', 'paymentscd_declinedate', 'paymentscd_isveryfied', 'paymentscd_verifyby', 'paymentscd_verifydate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'paymentscd_dtstart' => date("d/m/Y", strtotime($row['paymentscd_dtstart'])),
				'paymentscd_dtend' => date("d/m/Y", strtotime($row['paymentscd_dtend'])),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'paymentscd_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'paymentscd_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'paymentscd_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'paymentscd_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['paymentscd_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
		
			$seqname = 'PS';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};