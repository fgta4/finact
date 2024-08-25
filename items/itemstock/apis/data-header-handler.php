<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class itemstock_headerHandler extends WebAPI  {


	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues["dept_id"] = " A.dept_id = :dept_id";
		$criteriaValues["itemgroup_id"] = " B.itemgroup_path LIKE CONCAT('%', :itemgroup_id, '%')  ";
	}


// 	public function SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		

// 		unset($sqlFieldList['itemstock_code']);

// 			/*

// 		$sqlFieldList = [
// 			'itemstock_id' => 'A.`itemstock_id`', 'itemstock_code' => 'A.`itemstock_code`', 
// 			//'itemstock_name' => 'A.`itemstock_name`', 'itemstock_nameshort' => 'A.`itemstock_nameshort`',
	
// 			'itemstock_descr' => 'A.`itemstock_descr`', 'itemstock_picture' => 'A.`itemstock_picture`', 'unitmeasurement_id' => 'A.`unitmeasurement_id`', 'itemstock_isdisabled' => 'A.`itemstock_isdisabled`',
// 			'itemstock_ishascompound' => 'A.`itemstock_ishascompound`', 'itemstock_issellable' => 'A.`itemstock_issellable`', 'itemstock_priceori' => 'A.`itemstock_priceori`', 'itemstock_priceadj' => 'A.`itemstock_priceadj`',
// 			'itemstock_priceadjdate' => 'A.`itemstock_priceadjdate`', 'itemstock_grossprice' => 'A.`itemstock_grossprice`', 'itemstock_isdiscvalue' => 'A.`itemstock_isdiscvalue`', 'itemstock_disc' => 'A.`itemstock_disc`',
// 			'itemstock_discval' => 'A.`itemstock_discval`', 'itemstock_sellprice' => 'A.`itemstock_sellprice`', 'itemstock_estcost' => 'A.`itemstock_estcost`', 'itemstock_weight' => 'A.`itemstock_weight`',
// 			'itemstock_length' => 'A.`itemstock_length`', 'itemstock_width' => 'A.`itemstock_width`', 'itemstock_height' => 'A.`itemstock_height`', 'itemstock_lastqty' => 'A.`itemstock_lastqty`',
// 			'itemstock_lastvalue' => 'A.`itemstock_lastvalue`', 'itemstock_lastqtyupdate' => 'A.`itemstock_lastqtyupdate`', 'itemstock_lastrecvid' => 'A.`itemstock_lastrecvid`', 'itemstock_lastrecvdate' => 'A.`itemstock_lastrecvdate`',
// 			'itemstock_lastrecvqty' => 'A.`itemstock_lastrecvqty`', 'itemstock_lastcost' => 'A.`itemstock_lastcost`', 'itemstock_lastcostdate' => 'A.`itemstock_lastcostdate`', 'itemgroup_id' => 'A.`itemgroup_id`',
// 			'itemctg_id' => 'A.`itemctg_id`', 'itemclass_id' => 'A.`itemclass_id`', 'dept_id' => 'A.`dept_id`', 'itemstock_ref' => 'A.`itemstock_ref`',
// 			'itemstock_refname' => 'A.`itemstock_refname`', 'itemstock_uploadbatchcode' => 'A.`itemstock_uploadbatchcode`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
// 			'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
	
// 		];
// */
// 	}

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}
	
	public function DataOpen(array &$record) : void {
		if (!empty($record['itemstock_couchdbid'])) {
			$file_id = $record['itemstock_couchdbid'];
			try { $record['itemstock_picture_doc'] = $this->caller->cdb->getAttachment($file_id, 'filedata'); } catch (\Exception $ex) {}
		}		
	}

}		
		
		
		