<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class jurnal_detilHandler extends WebAPI  {
	protected float $recordtotalvalue = 0;




	public function DataListLooping(array &$record) : void {
		$record['curr_rate'] = (float)$record['curr_rate'];
		$this->$recordtotalvalue += (float)$record['jurnaldetil_validr'];
	}

	public function DataListFinal(array &$records, object &$result) : void {
		$result->recordtotalvalue = $this->$recordtotalvalue;
	}


	public function SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		$sqlFieldList['coamodel_id'] = ' (select coamodel_id from mst_coa where coa_id = A.coa_id) ';
	}

	public function DataOpen(array &$record) : void {
		if (in_array($record['coamodel_id'], ['AR', 'AP'])) {
			$record['linkallowed'] = true;
		} else {
			$record['linkallowed'] = false;
		}
	}


	public function DataSavedSuccess(object &$result) : void {
		$jurnal_id = $result->dataresponse->jurnal_id;

		// hitung total
		try {
			$sql = "
				select 
				sum(jurnaldetil_validr) as jurnaldetil_validr
				from trn_jurnaldetil 
				where 
				jurnal_id = :jurnal_id			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$jurnal_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				$result->recordtotalvalue = 0;
			} else {
				$result->recordtotalvalue = (float)$row['jurnaldetil_validr'];
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}		
		
		
		