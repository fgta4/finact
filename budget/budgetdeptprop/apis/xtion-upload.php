<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends budgetdeptpropBase {

	public function execute($data, $options) {
		$userdata = $this->auth->session_get_user();

		try {
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$budgetdeptprop_id = $data->budgetdeptprop_id;
				$rows = $data->rows;

				foreach ($rows as $row) {
					$obj = new \stdClass;

					$obj->budgetdeptprop_id = $budgetdeptprop_id;
					$obj->budgetdeptpropitem_id = uniqid();
					$obj->coabudget_id = $row->coabudget_id;
					$obj->dept_id = $row->dept_id;
					$obj->budgetdeptmonth_01 = $row->values->month_01;
					$obj->budgetdeptmonth_02 = $row->values->month_02;
					$obj->budgetdeptmonth_03 = $row->values->month_03;
					$obj->budgetdeptmonth_04 = $row->values->month_04;
					$obj->budgetdeptmonth_05 = $row->values->month_05;
					$obj->budgetdeptmonth_06 = $row->values->month_06;
					$obj->budgetdeptmonth_07 = $row->values->month_07;
					$obj->budgetdeptmonth_08 = $row->values->month_08;
					$obj->budgetdeptmonth_09 = $row->values->month_09;
					$obj->budgetdeptmonth_10 = $row->values->month_10;
					$obj->budgetdeptmonth_11 = $row->values->month_11;
					$obj->budgetdeptmonth_12 = $row->values->month_12;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
	
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_budgetdeptpropitem", $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, "mst_budgetdeptpropitem", $obj->budgetdeptpropitem_id, "UPLOAD", $userdata->username, (object)[]);

				}

				$this->db->commit();
				return (object)[
					'success' => true
				];
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}
		} catch (\Exception $ex) {
			return (object)[
				'success' => false,
				'message' => $ex->getMessage()
			];
		}
	}



};


