<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
//require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;


class DataSave extends WebAPI {
	function __construct() {
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
	
	public function execute($data, $options) {
		$tablename = 'mst_bankrekening';
		$primarykey = 'bankrekening_id';
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
			$obj->bankrekening_opendate = (\DateTime::createFromFormat('d/m/Y',$obj->bankrekening_opendate))->format('Y-m-d');			$obj->bankrekening_closedate = (\DateTime::createFromFormat('d/m/Y',$obj->bankrekening_closedate))->format('Y-m-d');
			$obj->bankrekening_id = strtoupper($obj->bankrekening_id);
			$obj->bankrekening_name = strtoupper($obj->bankrekening_name);
			$obj->bankrekening_namabuku = strtoupper($obj->bankrekening_namabuku);
			$obj->coa_id = strtoupper($obj->coa_id);







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

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey, 'bankrekening_id', 'bankrekening_name', 'bankrekening_code', 'bankrekening_namabuku', 'bankrekening_isdisabled', 'bankrekening_opendate', 'bankrekening_closedate', 'bankrekening_descr', 'bank_id', 'coa_id', 'curr_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'bankrekening_opendate' => date("d/m/Y", strtotime($row['bankrekening_opendate'])),
				'bankrekening_closedate' => date("d/m/Y", strtotime($row['bankrekening_closedate'])),
				'bank_name' => \FGTA4\utils\SqlUtility::Lookup($data->bank_id, $this->db, 'mst_bank', 'bank_id', 'bank_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($data->coa_id, $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($data->curr_id, $this->db, 'mst_curr', 'curr_id', 'curr_name'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

}

$API = new DataSave();