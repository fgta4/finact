<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class jurnaltype_coaHandler extends WebAPI  {

	public function sortListOrder(array &$sortData) : void {
		$sortData['jurnaltypecoa_isdebet'] = 'DESC';
		$sortData['coa_id'] = 'ASC';
	}

}		
		
		
		