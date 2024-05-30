<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class coareport_columnHandler extends WebAPI  {
	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['coareport_id'] = " A.coareport_id = :coareport_id";
	}
}		
		
		
		