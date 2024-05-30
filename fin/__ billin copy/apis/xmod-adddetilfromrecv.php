<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



/*
pada save,
require:
require_once __DIR__.'/xmod-adddetilfromrecv.php';

tambahkan setelah save execute:
$xmodbillfromorder = new XmodBillFromOrder($this->db, $userdata);
$xmodbillfromorder->process($obj->{$primarykey}, $obj->purchrecv_id);

*/
class XmodBillFromOrder {

	function __construct($db, $userdata) {
		$this->db = $db;
		$this->userdata = $userdata;
	}

	public function process($billin_id,  $purchrecv_id, $billin_date, $billin_descr) {
		$userdata = $this->userdata;

		try {
			$this->db->query("delete from trn_billindetil where billin_id='$billin_id'");
			$stmt = $this->db->prepare("
					select 
					B.itemclass_id, C.taxtype_id , 'IDR' as curr_id, A.dept_id,
					B.purchrecvitem_descr, C.purchorderitem_price, C.purchorderitem_tax, C.purchorderitem_pricesubtotal, C.purchorderitem_qty, B.purchrecvitem_qty 
					from
					trn_purchrecv  A inner join trn_purchrecvitem B on B.purchrecv_id = A.purchrecv_id
									inner join trn_purchorderitem C on C.purchorderitem_id  = B.purchorderitem_id 
									inner join trn_purchorder D on D.purchorder_id = C.purchorder_id 
									inner join mst_itemclass E on E.itemclass_id = B.itemclass_id
									inner join mst_taxtype F on F.taxtype_id = C.taxtype_id 
					-- 				 inner join mst_itemclasstrxmodel F on F.itemclass_id = B.itemclass_id and F.trxmodel_id = D.trxmodel_id 
					
					where
					A.purchrecv_id = :purchrecv_id
			");
			$stmt->execute([
				':purchrecv_id' => $purchrecv_id
			]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$totalhutang = 0;
			$jurnals = [];
			foreach ($rows as $row) {
					$obj = new \stdClass;
					$obj->billindetil_id = uniqid();
					$obj->billindetil_descr = $row['purchrecvitem_descr'];
					$obj->itemclass_id = $row['itemclass_id'];
					$obj->curr_id = $row['curr_id'];
					$obj->billindetil_valfrg = $row['purchorderitem_pricesubtotal'];
					$obj->billindetil_valfrgrate = 1;
					$obj->billindetil_validr = $row['purchorderitem_pricesubtotal'];
					$obj->billin_id = $billin_id;					
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s"); 
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_billindetil", $obj);
					$stmtins = $this->db->prepare($cmd->sql);
					$stmtins->execute($cmd->params);

					$jurnals[] = [
						'jurnal_id' => $obj->billin_id,
						'jurnaldetil_descr' => $obj->billindetil_descr,
						'coa_id' => '100',
						'dept_id' => $row['dept_id'],
						'curr_id' => $row['curr_id'],
						'jurnaldetil_valfrg' => $obj->billindetil_valfrg,
						'jurnaldetil_valfrgrate' => $obj->billindetil_valfrgrate,
						'jurnaldetil_validr' => $obj->billindetil_validr
					];

					$totalhutang += $obj->billindetil_validr;
			}

			$jurnals[] = [
				'jurnal_id' => $obj->billin_id,
				'jurnaldetil_descr' => $billin_descr,
				'coa_id' => '200',
				'dept_id' => $row['dept_id'],
				'curr_id' => $row['curr_id'],
				'jurnaldetil_valfrg' => -$totalhutang,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' => -$totalhutang				
			];

			$this->create_jurnal($billin_id, $billin_date, $billin_descr, $jurnals);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function create_jurnal($billin_id, $billin_date, $billin_descr, $jurnals) {
		$userdata = $this->userdata;

		try {
			$dtfirst = new \DateTime(date("Y-m-d", strtotime($billin_date)));
			$periodemo_id = $dtfirst->format('Ym');


			$this->db->query("delete from trn_jurnaldetil where jurnal_id='$billin_id'");
			$this->db->query("delete from trn_jurnal where jurnal_id='$billin_id'");

			
			$objh = new \stdClass;
			$objh->jurnal_id = $billin_id;
			$objh->jurnal_ref = '';
			$objh->jurnal_date = $billin_date;
			$objh->jurnal_descr = $billin_descr;
			$objh->jurnal_isposted = '0';
			$objh->periodemo_id = $periodemo_id;				
			$objh->_createby = $userdata->username;
			$objh->_createdate = date("Y-m-d H:i:s"); 
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnal", $objh);
			$stmtins = $this->db->prepare($cmd->sql);
			$stmtins->execute($cmd->params);



			foreach ($jurnals as $row) {
				$obj = new \stdClass;
				$obj->jurnaldetil_id = uniqid();
				$obj->jurnaldetil_descr = $row['jurnaldetil_descr'];
				$obj->coa_id = $row['coa_id'];
				$obj->dept_id = $row['dept_id'];
				$obj->curr_id = $row['curr_id'];
				$obj->jurnaldetil_valfrg = $row['jurnaldetil_valfrg'];
				$obj->jurnaldetil_valfrgrate = $row['jurnaldetil_valfrgrate'];
				$obj->jurnaldetil_validr = $row['jurnaldetil_validr'];
				$obj->jurnal_id = $objh->jurnal_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s"); 
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
				$stmtins = $this->db->prepare($cmd->sql);
				$stmtins->execute($cmd->params);				
			}



		} catch (\Exception $ex) {
			throw $ex;
		}		
	}

}