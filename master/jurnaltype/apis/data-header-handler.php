<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class jurnaltype_headerHandler extends WebAPI  {
	private object $options;

	function __construct(object &$options) {
		if (!property_exists($options, 'mode')) {
			$options->mode = null;
		}

		$this->options = $options;
	}

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {

		if ($this->options->mode=='by-jurnalsource') {
			$criteriaValues['jurnalsource_id'] = " C.jurnalsource_id = :jurnalsource_id ";
		}
	}

	public function SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		if ($this->options->mode=='by-jurnalsource') {
			$sqlFromTable = "
					mst_jurnaltype A inner join mst_jurnalsourcetype B on B.jurnaltype_id = A.jurnaltype_id 
            						 inner join mst_jurnalsource C on C.jurnalsource_id = B.jurnalsource_id
			";
		}	
	}


}		
		
		
		