<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\utils\SqlUtility;
use \FGTA4\exceptions\WebException;


$API = new class extends jurnalBase {

	public function execute($id) {
		$userdata = $this->auth->session_get_user();

		try {
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			$success = false;
			$message = '';


			try {

				$tablename = 'trn_jurnaldetil';
				$jurnaldetil_id = $id;

				$obj = (object)[
					'jurnaldetil_id' => $jurnaldetil_id,
					'jurnaldetil_id_ref' => null,
					'_modifyby' => $userdata->username,
					'_modifydate' => date("Y-m-d H:i:s"),
				];

				$key = (object)[
					'jurnaldetil_id' => $obj->jurnaldetil_id
				];

				$cmd = SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
				
				SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $jurnaldetil_id, 'UNLINK', $userdata->username, (object)[]);

				$success = true;

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

			return (object)[
				'success' => $success,
				'message' => $message
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};


