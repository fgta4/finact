<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



class inquiryprocess_itemHandler extends WebAPI  {

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}	

	public function DataOpen(&$record) {
		try {

			$inquiry_id = $record['inquiry_id'];

			$sql = "
				select 
				B.inquirytype_isqtybreakdown, B.inquiryselect_id, B.itemmanage_id,  A.inquirytype_id
				from trn_inquiry A inner join mst_inquirytype B on B.inquirytype_id=A.inquirytype_id
				where
				A.inquiry_id = :inquiry_id
			";
			
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':inquiry_id' => $inquiry_id]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record['inquirytype_isqtybreakdown'] = $row['inquirytype_isqtybreakdown'];
			$record['inquiryselect_id'] = $row['inquiryselect_id'];
			$record['inquirytype_id'] = $row['inquirytype_id'];
			$record['itemmanage_id'] = $row['itemmanage_id'];
			

			$inquiryselect = \FGTA4\utils\SqlUtility::LookupRow($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id');
			$inquiry_selectfield =   $inquiryselect['inquiryselect_isshowitemasset'] 
									.$inquiryselect['inquiryselect_isshowitem']
									.$inquiryselect['inquiryselect_isshowitemstock']
									.$inquiryselect['inquiryselect_isshowpartner']
									.$inquiryselect['inquiryselect_isshowitemclass']
									.$inquiryselect['inquiryselect_isitemclassdisabled'];

			$record['inquiry_selectfield']= $inquiry_selectfield;						


		} catch (\Exception $ex) {
			throw $ex;
		}
		

	}
}		
		
		
		