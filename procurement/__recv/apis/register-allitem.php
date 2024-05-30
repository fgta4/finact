<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
// require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;


$API = new class extends recvBase {
	
	public function execute($data, $options) {
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 


			$sql = "select * from trn_recvitem where recv_id = :recv_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([ ':recv_id' => $data->recv_id ]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$items = [];
			foreach ($rows as $row) {
				$recvitem_qty = $row['recvitem_qty'];
				for ($i=1; $i<=$recvitem_qty; $i++) {
					$obj = new \stdClass;

					$obj->recvitemreg_id = uniqid();	
					$obj->recvitem_descr = $row['recvitem_descr'];	
					$obj->recvitem_serial = '';	
					$obj->item_id = $row['item_id'];	
					$obj->itemclass_id = $row['itemclass_id'];
					$obj->recvitem_value = $row['recvitem_value'];	
					$obj->recvitem_qty = 1;
					$obj->recvitem_idr = $row['recvitem_idr'];	
					$obj->curr_id = $row['curr_id'];	
					$obj->accbudget_id	= $row['accbudget_id'];
					$obj->coa_id = $row['coa_id'];	
					$obj->inquiry_id = $row['inquiry_id'];
					$obj->inquiryitem_id = $row['inquiryitem_id'];
					$obj->request_id = $row['request_id'];
					$obj->requestitem_id = $row['requestitem_id'];
					$obj->orderout_id = $row['orderout_id'];
					$obj->orderoutitem_id = $row['orderoutitem_id'];
					$obj->recvitem_id = $row['recvitem_id'];
					$obj->recvitem_seq = $i;
					$obj->recv_id = $data->recv_id;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");

					$items[] = $obj;
				}
			}



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$tablename = 'trn_recvitemreg';
				$primarykey = 'recvitemreg_id';
		
				foreach ($items as $obj) {
					$this->log($obj);
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
					$action = 'NEW';
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				}

				$this->db->commit();
				$result->success = true;
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}
			return $result;
		} catch (\Exception $ex) {
			// $this->error($ex->getMessage);
			throw $ex;
		}
	}



};