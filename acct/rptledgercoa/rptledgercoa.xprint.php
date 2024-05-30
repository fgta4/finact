<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


$MODULE = new class extends WebModule {
	function __construct() {
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
	
	public function TestPreview() {
		$param = (object) [
			'dt' => '2022-01-01'
		];
		$this->LoadPage($param );
	}
	
	public function LoadPage(object $param) {
		$userdata = $this->auth->session_get_user();
		try {
			$this->reporttitle = $param->optiondata->rpttitle;
			$this->reportsubtitle = '<b>' . $param->coa_name . ' ('. $param->coa_id .')</b><br>' .  $param->optiondata->rptsubtitle ;
			if ($param->optiondata->filter!=null) {
				$this->reportsubtitle = $param->optiondata->rptsubtitle . ' (' . $param->filtervalue . ')';
			}

			$this->reportdate = $param->dt;
			$this->setup = (object)[
				'param' => $param
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};
