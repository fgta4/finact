<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends orderoutBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_orderoutitem';
		$primarykey = 'orderoutitem_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();



			try {

				$obj = new \stdClass;
				$obj->orderoutitem_id	= \uniqid();
				$obj->itemasset_id	=  $data->itemasset_id == '' ? '--NULL--' : $data->itemasset_id;
				$obj->item_id	= $data->item_id == '' ? '--NULL--' : $data->item_id;
				$obj->itemstock_id	= $data->itemstock_id == '' ? '--NULL--' : $data->itemstock_id;
				$obj->partner_id	=  $data->partner_id == '' ? '--NULL--' : $data->partner_id;
				$obj->itemclass_id	= $data->itemclass_id == '' ? '--NULL--' : $data->itemclass_id;
				$obj->orderoutitem_descr	= $data->requestitem_descr ;
				$obj->orderoutitem_qty	= $data->requestitem_qty ;
				$obj->orderoutitem_days	= $data->requestitem_days ;
				$obj->orderoutitem_task	= $data->requestitem_task ;
				$obj->orderoutitem_rate	= $data->requestitem_estrate ;
				$obj->orderoutitem_value	= $data->requestitem_estvalue ;
				$obj->curr_id	= 'IDR' ;
				$obj->curr_rate	= 1;
				$obj->orderoutitem_idr	=  $data->requestitem_estvalue ;
				$obj->projbudgetdet_id	= $data->projbudgetdet_id ;
				$obj->orderoutitem_isunbudget	= $data->requestitem_isunbudget ;
				$obj->orderoutitem_isallowoverbudget	= $data->requestitem_isallowoverbudget ;
				$obj->orderoutitem_budgetavailable	= $data->requestitem_budgetavailable ;
				$obj->orderoutitem_qtyavailable	= $data->requestitem_qtyavailable ;
				$obj->accbudget_id	= $data->accbudget_id ;
				$obj->coa_id	= $data->coa_id ;
				$obj->request_id	= $data->request_id ;
				$obj->requestitem_id	= $data->requestitem_id ;
				$obj->inquiry_id	= $data->inquiry_id ;
				$obj->inquiryitem_id	= $data->inquiryitem_id ;
				$obj->orderout_id	= $data->orderout_id ;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				

				// kontrak
				$sql = "
					select 
					B.ordercontractitem_estrate
					from 
					trn_ordercontract A inner join trn_ordercontractitem B on B.ordercontract_id = A.ordercontract_id
										inner join trn_orderout C on C.partner_id = A.partner_id 
					where
					C.orderout_id = :orderout_id AND B.item_id = :item_id
				";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':orderout_id' => $data->orderout_id ,
					':item_id' => $data->item_id
				]);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				if (count($rows)>0) {
					$contract = $rows[0];
					$obj->orderoutitem_rate = $contract['ordercontractitem_estrate'];
					$obj->orderoutitem_value = $obj->orderoutitem_rate * $obj->orderoutitem_qty * $obj->orderoutitem_days * $obj->orderoutitem_task;
					$obj->orderoutitem_idr = $obj->orderoutitem_value;
				}




				$sql = "select count(*) as n from trn_orderoutitem where orderout_id=:orderout_id and requestitem_id=:requestitem_id";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':orderout_id' => $obj->orderout_id,
					':requestitem_id' => $obj->requestitem_id
				]);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				$n = $rows[0]['n'];
				
				if ($n==0) {
					$this->log($data);
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
					$action = 'NEW';
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
					
				} 

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
			$this->log($ex->getMessage());
			throw $ex;
		}
	}

};

