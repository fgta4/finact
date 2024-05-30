<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends paymentscdBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_paymentscdbillin';
		$primarykey = 'paymentscdbillin_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$obj = new \stdClass;
				$obj->paymentscdbillin_id = \uniqid();
				$obj->billinpaym_id = $data->billinpaym_id;
				$obj->billinpaym_date = $data->billinpaym_date;
				$obj->billinpaym_datescd = $data->billinpaym_date;
				$obj->billinpaym_descr = $data->billinpaym_descr;
				$obj->curr_id = $data->curr_id;
				$obj->billinpaym_frgrate = $data->billinpaym_frgrate;
				$obj->billinpaym_itemfrg = $data->billinpaym_itemfrg;
				$obj->billinpaym_itemidr = $data->billinpaym_itemidr;
				$obj->billinpaym_ppnfrg = $data->billinpaym_ppnfrg;
				$obj->billinpaym_ppnidr = $data->billinpaym_ppnidr;
				$obj->billinpaym_pphfrg = $data->billinpaym_pphfrg;
				$obj->billinpaym_pphidr = $data->billinpaym_pphidr;
				$obj->billin_id = $data->billin_id;
				$obj->paymentscd_id = $data->paymentscd_id;

				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				$action = 'NEW';
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				// $this->log($data);
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

