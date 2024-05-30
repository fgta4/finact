<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends recvBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_recvitem';
		$primarykey = 'recvitem_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$obj = new \stdClass;
				$obj->recvitem_id	= \uniqid();
				$obj->itemasset_id	=  $data->itemasset_id == '' ? '--NULL--' : $data->itemasset_id;
				$obj->item_id	= $data->item_id == '' ? '--NULL--' : $data->item_id;
				$obj->itemstock_id	= $data->itemstock_id == '' ? '--NULL--' : $data->itemstock_id;
				$obj->partner_id	=  $data->partner_id == '' ? '--NULL--' : $data->partner_id;
				$obj->itemclass_id	= $data->itemclass_id == '' ? '--NULL--' : $data->itemclass_id;
				$obj->recvitem_descr	= $data->orderoutitem_descr ;
				$obj->recvitem_qty = $data->orderoutitem_qty;
				$obj->recvitem_value = $data->orderoutitem_value;
				$obj->curr_id = $data->curr_id;
				$obj->recvitem_idr = $data->orderoutitem_idr;
				$obj->accbudget_id = $data->accbudget_id;
				$obj->coa_id = $data->coa_id;
				$obj->orderout_id = $data->orderout_id;
				$obj->orderoutitem_id = $data->orderoutitem_id;
				$obj->request_id = $data->request_id;
				$obj->requestitem_id = $data->requestitem_id;
				$obj->inquiry_id = $data->inquiry_id;
				$obj->inquiryitem_id = $data->inquiryitem_id;
				$obj->recv_id = $data->recv_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				$sql = "select count(*) as n from trn_recvitem where recv_id=:recv_id and recvitem_id=:recvitem_id";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':recv_id' => $obj->recv_id,
					':recvitem_id' => $obj->recvitem_id
				]);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				$n = $rows[0]['n'];
				
				if ($n==0) {
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

