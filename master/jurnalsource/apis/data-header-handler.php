<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class jurnalsource_headerHandler extends WebAPI  {


	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['jurnalsource_isallowmanual'] = " A.jurnalsource_isallowmanual = :jurnalsource_isallowmanual"; 
	}
}		
		
		
		