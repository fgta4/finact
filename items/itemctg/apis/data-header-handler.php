<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class itemctg_headerHandler extends WebAPI  {

	public function sortOrder($sortdata) {
		return "
			ORDER BY itemctg_group, itemctg_name
		";
	}

	public function buildCriteriaValues($options, &$criteriaValues) {
		// $criteriaValues['brand_id'] = " A.brand_id = :brand_id ";
	}	

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}	
}		
		
		
		