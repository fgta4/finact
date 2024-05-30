<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR . "/core/sequencer.php";
use \FGTA4\utils\Sequencer;


class inquiry_headerHandler extends WebAPI  {

	public function CreateNewId(object $obj) : string {
		$seqname = 'NQ';
		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
	}

	public function DataOpen(array &$record) : void {
		$inquiry_isindependentsetting = $record['inquiry_isindependentsetting'];
		if ($inquiry_isindependentsetting!=1) {
			$inquirytype_id = $record['inquirytype_id'];
			$inquirytype = \FGTA4\utils\SqlUtility::LookupRow($inquirytype_id, $this->db, 'mst_inquirytype', 'inquirytype_id');
			$record['inquirymodel_id'] = $inquirytype['inquirymodel_id'];
			$record['itemmanage_id'] = $inquirytype['itemmanage_id'];
			$record['inquiryselect_isshowitemasset'] = $inquirytype['inquiryselect_isshowitemasset'];
			$record['inquiryselect_isshowitem'] = $inquirytype['inquiryselect_isshowitem'];
			$record['inquiryselect_isshowitemstock'] = $inquirytype['inquiryselect_isshowitemstock'];
			$record['inquiryselect_isshowpartner'] = $inquirytype['inquiryselect_isshowpartner'];
			$record['inquiryselect_isshowitemclass'] = $inquirytype['inquiryselect_isshowitemclass'];
			$record['inquiryselect_isitemclassdisabled'] = $inquirytype['inquiryselect_isitemclassdisabled'];
			$record['inquirytype_isuseqty'] = $inquirytype['inquirytype_isuseqty'];
			$record['inquirytype_isusedays'] = $inquirytype['inquirytype_isusedays'];
			$record['inquirytype_isusetask'] = $inquirytype['inquirytype_isusetask'];
			$record['inquirytype_isdateinterval'] = $inquirytype['inquirytype_isdateinterval'];
			$record['inquirytype_istoberequest'] = $inquirytype['inquirytype_istoberequest'];
			$record['inquirytype_isautorequest'] = $inquirytype['inquirytype_isautorequest'];
			$record['inquirytype_isautoorder'] = $inquirytype['inquirytype_isautoorder'];
			$record['inquirytype_ismovinginit'] = $inquirytype['inquirytype_ismovinginit'];
			$record['inquirytype_islimitqty'] = $inquirytype['inquirytype_islimitqty'];
			$record['inquirytype_islimitdays'] = $inquirytype['inquirytype_islimitdays'];
			$record['inquirytype_islimittask'] = $inquirytype['inquirytype_islimittask'];
			$record['inquirytype_islimitvalue'] = $inquirytype['inquirytype_islimitvalue'];
			$record['inquirytype_isallowoverbudget'] = $inquirytype['inquirytype_isallowoverbudget'];
			$record['inquirytype_isallowunbudget'] = $inquirytype['inquirytype_isallowunbudget'];
			$record['inquirytype_isallowitemunbudget'] = $inquirytype['inquirytype_isallowitemunbudget'];
			$record['inquirytype_isallowadvance'] = $inquirytype['inquirytype_isallowadvance'];
			$record['inquirytype_isemplaspartner'] = $inquirytype['inquirytype_isemplaspartner'];
			$record['inquirytype_maxadvancevalue'] = $inquirytype['inquirytype_maxadvancevalue'];
		}

	}
}		





		
		
		