<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;



$API = new class extends budgetdeptpropBase {

	public function execute($id, $options) {
		$userdata = $this->auth->session_get_user();
		// apply to tabel budget

		$this->userdata = $userdata;

		try {
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				// clear data dulu
				$this->db->query("delete from mst_budgetdeptmonth where budgetdeptprop_id='$id' ");
				$this->db->query("delete from mst_budgetdeptyear where budgetdeptprop_id='$id' ");

				$sql = "
					select 
					A.budgetdeptprop_id,
					B.budgetdeptpropitem_id,
					B.dept_id,
					B.coabudget_id,
					A.budgetdeptprop_year ,
					A.owner_dept_id,
					@m01:=B.budgetdeptmonth_01 as m01,
					@m02:=B.budgetdeptmonth_02 as m02,
					@m03:=B.budgetdeptmonth_03 as m03,
					@m04:=B.budgetdeptmonth_04 as m04,
					@m05:=B.budgetdeptmonth_05 as m05,
					@m06:=B.budgetdeptmonth_06 as m06,
					@m07:=B.budgetdeptmonth_07 as m07,
					@m08:=B.budgetdeptmonth_08 as m08,
					@m09:=B.budgetdeptmonth_09 as m09,
					@m10:=B.budgetdeptmonth_10 as m10,
					@m11:=B.budgetdeptmonth_11 as m11,
					@m12:=B.budgetdeptmonth_12 as m12,
					(@m01+@m02+@m03+@m04+@m05+@m06+@m07+@m08+@m09+@m10+@m11+@m12) as subtotal,
					A.budgetdeptprop_commitby,
					A.budgetdeptprop_commitdate,
					A._createby,
					A._createdate
					from mst_budgetdeptprop A inner join mst_budgetdeptpropitem B on B.budgetdeptprop_id = A.budgetdeptprop_id 
					where 
					A.budgetdeptprop_id = :budgetdeptprop_id
				";

				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':budgetdeptprop_id' => $id
				]);

				$rows = $stmt->fetchall();
				foreach ($rows as $row) {
					$this->CreateDeptBudget($row);
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
			throw $ex;
		}
	}


	public function CreateDeptBudget(Array $row) : void {
		try {
			// create header
			$head = $this->InsertDeptBudget_Year($row);

			// create footer
			$cols = [
				'm01', 'm02', 'm03', 'm04', 'm05', 'm06',
				'm07', 'm08', 'm09', 'm10', 'm11', 'm12'	
			];


			$budgetdeptyear_id = $head->budgetdeptyear_id;
			$month = 0;
			foreach ($cols as $colname) {
				$month++;
				$this->InsertDeptBudget_Month($row, $budgetdeptyear_id, $colname, $month);
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function InsertDeptBudget_Year(Array $row) : object {
		$userdata = $this->userdata;
		$budgetdeptprop_id = $row['budgetdeptprop_id'];

		try {
			$obj = new \stdClass;
			$obj->budgetdeptyear_id = uniqid();
			$obj->dept_id = $row['dept_id'];
			$obj->coabudget_id = $row['coabudget_id'];
			$obj->budgetdeptyear_year = $row['budgetdeptprop_year'];
			$obj->budgetdeptyear_value = $row['subtotal'];
			$obj->owner_dept_id = $row['owner_dept_id'];
			$obj->budgetdeptprop_id = $row['budgetdeptprop_id'];
			$obj->budgetdeptyear_version = 0;
			$obj->budgetdeptyear_iscommit = 1;
			$obj->budgetdeptyear_commitby = $userdata->username;
			$obj->budgetdeptyear_commitdate = date('Y-m-d H:i:s');
			$obj->budgetdeptyear_isapprove = 1;

			$obj->_createby = $userdata->username;
			$obj->_createdate = date('Y-m-d H:i:s');

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_budgetdeptyear", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			// tulis log ke budgetprop
			\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/budgetdeptprop", "mst_budgetdeptprop", $obj->budgetdeptprop_id, 'GENERATE', $userdata->username, (object)[]);

			// tulis log ke budgetdeptyear
			\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/budgetdept", "mst_budgetdeptyear", $obj->budgetdeptyear_id, 'NEW', $userdata->username, (object)[]);

			return $obj;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function InsertDeptBudget_Month(Array $row, string $budgetdeptyear_id, string $col, int $month) : void {
		$userdata = $this->userdata;


		try {

			$obj = new \stdClass;
			$obj->budgetdeptmonth_id = uniqid();
			$obj->dept_id = $row['dept_id'];
			$obj->coabudget_id = $row['coabudget_id'];
			$obj->budgetdeptmonth_year = $row['budgetdeptprop_year'];
			$obj->budgetdeptmonth_month = $month;
			$obj->budgetdeptmonth_value = $row[$col];
			$obj->owner_dept_id = $row['owner_dept_id'];
			$obj->budgetdeptprop_id = $row['budgetdeptprop_id'];
			$obj->budgetdeptpropitem_id = $row['budgetdeptpropitem_id'];
			$obj->budgetdeptyear_id = $budgetdeptyear_id;
			$obj->_createby = $userdata->username;
			$obj->_createdate = date('Y-m-d H:i:s');

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_budgetdeptmonth", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			// tulis log ke budgetdeptyear
			\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/budgetdept", "mst_budgetdeptmonth", $obj->budgetdeptmonth_id, 'NEW', $userdata->username, (object)[]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};


