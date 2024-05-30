<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends itemassetmoveBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_itemassetmovedetil';
		$primarykey = 'itemassetmovedetil_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$obj = new \stdClass;
				$obj->itemassetmovedetil_id = \uniqid();
				$obj->itemasset_id = $data->itemasset_id == '' ? '--NULL--' : $data->itemasset_id;
				$obj->itemassetmovedetil_descr = $data->inquirydetil_descr;
				$obj->itemassetmove_id = $data->itemassetmove_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				
				// $sql = "select count(*) as n from trn_requestitem where request_id=:request_id and inquirydetil_id=:inquirydetil_id";
				// $stmt = $this->db->prepare($sql);
				// $stmt->execute([
				// 	':request_id' => $obj->request_id,
				// 	':inquirydetil_id' => $obj->inquirydetil_id
				// ]);
				// $rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				// $n = $rows[0]['n'];
				
				// if ($n==0) {
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
					$action = 'NEW';
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
					$this->log($data);
				// } 

				$this->db->commit();

				$result->_trid = $data->_trid;
				$result->success = true;
			} catch (\Exception $ex) {
				$result->success = false;
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};