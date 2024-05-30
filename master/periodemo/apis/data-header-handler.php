<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class periodemo_headerHandler extends WebAPI  {
	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['periodemo_isclosed'] = " A.periodemo_isclosed = :periodemo_isclosed ";
	}
}		
		
		
		