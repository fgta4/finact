<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

use \FGTA4\utils\SqlUtility;

class coa_headerHandler extends WebAPI  {

	// public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
	// 	$criteriaValues['curr_id'] = " A.curr_id = :curr_id"; 
	// }

	function __construct(object &$options) {
		if (!property_exists($options, 'mode')) {
			$options->mode = null;
		}

		$this->options = $options;
	}


	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {

		$criteriaValues['curr_id'] = " (A.curr_id = :curr_id or A.curr_id is null)"; 
		$criteriaValues['coa_isdisabled'] = " A.coa_isdisabled = :coa_isdisabled"; 

		if ($this->options->mode=='by-jurnaltype') {
			$criteriaValues['jurnaltype_id'] = " B.jurnaltype_id = :jurnaltype_id ";

			$jurnaltype_col = $options->criteria->jurnaltype_col;
			$criteriaValues['jurnaltype_col'] = null;
			if ($jurnaltype_col=='D') {
				SqlUtility::setDefaultCriteria($options->criteria, 'jurnaltypecoa_isdebet', 1);
				$criteriaValues['jurnaltypecoa_isdebet'] = " B.jurnaltypecoa_isdebet = :jurnaltypecoa_isdebet ";
			} else if ($jurnaltype_col=='K') {
				SqlUtility::setDefaultCriteria($options->criteria, 'jurnaltypecoa_iskredit', 1);
				$criteriaValues['jurnaltypecoa_iskredit'] = " B.jurnaltypecoa_iskredit = :jurnaltypecoa_iskredit ";
			} 
		}
	}

	public function SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		if ($this->options->mode=='by-jurnaltype') {
			$sqlFromTable = "
				mst_coa A inner join mst_jurnaltypecoa B on B.coa_id = A.coa_id
			";
		}	
	}
}		
		
		
		