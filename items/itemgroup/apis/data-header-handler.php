<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class itemgroup_headerHandler extends WebAPI  {


	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['itemgroup_isparent'] = " A.itemgroup_isparent = :itemgroup_isparent "; 
	}

	public function sortListOrder(array &$sortData) : void {
		$sortData['itemgroup_path'] = 'ASC';
		$sortData['itemgroup_pathid'] = 'ASC';
	}

}		
		
		
		