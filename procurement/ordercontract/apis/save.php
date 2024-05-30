<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * finact/procurement/ordercontract/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header ordercontract (trn_ordercontract)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/11/2021
 */
$API = new class extends ordercontractBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_ordercontract';
		$primarykey = 'ordercontract_id';
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
			$obj->ordercontract_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->ordercontract_dtstart))->format('Y-m-d');
			$obj->ordercontract_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->ordercontract_dtend))->format('Y-m-d');



			if ($obj->ordercontract_ref=='') { $obj->ordercontract_ref = '--NULL--'; }


			unset($obj->ordercontract_iscommit);
			unset($obj->ordercontract_commitby);
			unset($obj->ordercontract_commitdate);
			unset($obj->ordercontract_isapprovalprogress);
			unset($obj->ordercontract_isapproved);
			unset($obj->ordercontract_approveby);
			unset($obj->ordercontract_approvedate);
			unset($obj->ordercontract_isdeclined);
			unset($obj->ordercontract_declineby);
			unset($obj->ordercontract_declinedate);



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
					, 'ordercontract_id', 'ordercontract_ref', 'ordercontract_descr', 'ordercontract_dtstart', 'ordercontract_dtend', 'partner_id', 'trxmodel_id', 'inquiryselect_id', 'ordercontract_days', 'owner_dept_id', 'doc_id', 'ordercontract_selectfield', 'ordercontract_version', 'ordercontract_isdateinterval', 'ordercontract_iscommit', 'ordercontract_commitby', 'ordercontract_commitdate', 'ordercontract_isapprovalprogress', 'ordercontract_isapproved', 'ordercontract_approveby', 'ordercontract_approvedate', 'ordercontract_isdeclined', 'ordercontract_declineby', 'ordercontract_declinedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'ordercontract_dtstart' => date("d/m/Y", strtotime($row['ordercontract_dtstart'])),
				'ordercontract_dtend' => date("d/m/Y", strtotime($row['ordercontract_dtend'])),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
				'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'ordercontract_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'ordercontract_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'ordercontract_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
					return uniqid();
	}

};