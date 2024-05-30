<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class itemstock_positionHandler extends WebAPI  {

	public function sortOrder($sortdata) {
		return " ";
		// return "
		// 	ORDER BY merchsea_year DESC, merchseagroup_id
		// ";
	}

	public function buildCriteriaValues($options, &$criteriaValues) {
		// $criteriaValues['brand_id'] = " A.brand_id = :brand_id ";
	}	

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}	
}		
		
		
		