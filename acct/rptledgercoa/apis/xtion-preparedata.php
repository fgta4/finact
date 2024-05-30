<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


/**
 * finact/acct/jurnal/apis/xtion-preparedata.php
 */
$API = new class extends rptledgercoaBase {

	public function execute($param) {
		$userdata = $this->auth->session_get_user();

		try {
			$cacheid = uniqid();
			$dt = (\DateTime::createFromFormat('d/m/Y',$param->dt))->format('Y-m-d');
			$coa_id = $param->coa_id;

			$optiondata = $param->optiondata;

			$span = $optiondata->span;
			$sp = $optiondata->sp;
			$report = $optiondata->report;
			$filter = $optiondata->filter;
			$filtervalue = $param->filtervalue;

			$sqlparam = [
				':span' => $span,
				':dt' => $dt,
				':coa_id' => $coa_id,
				':cacheid' => $cacheid
			];

			/** Pilih stored procedure yang akan digunakan */
			$sql = "CALL ledger_summarycoa_idr_all(:span, :dt, :coa_id, :cacheid)";
			if ($sp=='perunit') {
				$sql = "CALL ledger_summarycoa_idr_perunit(:unit_id, :span, :dt, :coa_id, :cacheid)";
				$sqlparam[':unit_id'] = $filtervalue;
			} else if ($sp=='perdept') {
				$sql = "CALL ledger_summarycoa_idr_perdept(:dept_id, :span, :dt, :coa_id, :cacheid)";
				$sqlparam[':dept_id'] = $filtervalue;
			} else if ($sp=='download') {
				$sql = "CALL ledger_summarycoa_idr_download(:span, :dt, :cacheid)";
				$sqlparam = [
					':span' => $span,
					':dt' => $dt,
					':cacheid' => $cacheid
				];
			}


			$stmt = $this->db->prepare($sql);
			$stmt->execute($sqlparam);
			$stmt->fetchall();

			$sql = "
				SELECT 
				cache_id, count(cache_id) as n 
				FROM xhc_ledgersummary 
				where cache_id=:cacheid
				group by cache_id;

			"; 
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':cacheid' => $cacheid
			]);
			$row = $stmt->fetch();


			$filenameinsertion = '';
			if ($filter!=null) {
				$filenameinsertion = $filtervalue . '_';
			}


			return (object)[
				'success' => true,
				'cacheid' => $row['cache_id'],
				'totalrows' => $row['n'],
				'recordpagingsize' => 50,
				'report_title' =>  $optiondata->rpttitle,
				'report_subtitle' => $optiondata->rptsubtitle . ' ' . $filtervalue,
				'report_generatedate' => date('Y-m-d H:i:s'),
				'report_sheetname' => $optiondata->rpttitle,
				'report_filename' => str_replace(' ', '', $optiondata->rpttitle) . '_' . $filenameinsertion . $dt . "_" . date('YmdHis') . '.xlsx',
				'report_descr' =>     "generated: " . date('d/m/Y H:i:s') . "\n" 
									. "title: " . $optiondata->rpttitle . "\n"
									. "subtitle: " . $optiondata->rptsubtitle . "\n"
									. "span: " . $span . "\n"
									. "dt: " . $dt . "\n"
									. "filter: " . $filter . "\n" ,

				'report_properties' => (object)[]					
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


