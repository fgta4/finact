<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __ROOT_DIR.'/core/currency.php';
require_once __DIR__ . '/xtion.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

$API = new class extends BilloutXtionBase {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/corpbudget.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}

	public function execute($id, $param) {
		$userdata = $this->auth->session_get_user();


		try {
			$this->CURR = new Currency($this->db);
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'detil'  => $this->get_detil_rows($id),
				'user' => $userdata
			];

			$periodemo_id = $this->get_periode_bydate($currentdata->header->billout_date);

			$this->periode_check($periodemo_id);
			// $this->pre_post_check($currentdata, 'approve');


			$currentdata->header->periodemo_id = $periodemo_id;
			$currentdata->header->curr_id = $this->CURR->getLocalCurrency();
			$currentdata->header->coa_id_debet = '1051000';
			$currentdata->header->coa_id_kredit = '4999999';

			$jurnal = (object)[
				'header' => $this->create_docjurnal_header($currentdata),
				'detil' => $this->create_docjurnal_detil($currentdata)
			];

			$this->save_to_jurnal($jurnal);

			return (object)[
				'success' => true,
			];
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}




	function create_docjurnal_header($currentdata) {
		$header = (object)[
			'jurnal_id' => $currentdata->header->billout_id,
			'jurnal_ref' => '',
			'jurnal_date' => $currentdata->header->billout_date,
			'jurnal_datedue' => $currentdata->header->billout_datedue,
			'jurnal_descr' => "[Tagihan] " .  $currentdata->header->billout_descr,
			'jurnal_ispost' => 1,
			'periodemo_id' => $currentdata->header->periodemo_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnaltype_id' => 'ARTAGIHAN',
			'jurnalsource_id' => 'BILLOUT',
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")
		];
		return $header;
	}


	function create_docjurnal_detil($currentdata) {
		$records = [];

		$total = 0;
		foreach ($currentdata->detil as $detil) {
			// DEBET
			$records[] = (object)[
				'jurnaldetil_id' => $detil->billoutdetil_id,
				'jurnaldetil_descr' =>  "[Tagihan] " .  $detil->billoutdetil_descr,
				'jurnaldetil_valfrg' => $detil->billoutdetil_validr,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' =>  $detil->billoutdetil_validr,
				'coa_id' => $currentdata->header->coa_id_debet,
				'dept_id' => 'COLL',
				'partner_id' => $currentdata->header->partner_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnal_id' => $currentdata->header->billout_id,
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")				
			];
			$total  +=  $detil->billoutdetil_validr;
		}


		// KREDIT
		$records[] = (object)[
			'jurnaldetil_id' => uniqid() ,
			'jurnaldetil_descr' =>  "[Tagihan] " .  $currentdata->header->billout_descr,
			'jurnaldetil_valfrg' => -$total,
			'jurnaldetil_valfrgrate' => 1,
			'jurnaldetil_validr' =>  -$total,
			'coa_id' => $currentdata->header->coa_id_kredit,
			'dept_id' => 'COLL',
			'partner_id' => $currentdata->header->partner_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnal_id' => $currentdata->header->billout_id,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];

		return $records;
	}


};


