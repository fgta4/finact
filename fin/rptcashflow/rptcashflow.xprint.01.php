<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/sqlutil.php';


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
	
	
	public function LoadPage($param) {
		$this->preloadsstyles = array(
			'index.php/asset/finact/acct/rptlabarugi/rptlabarugi.xprint.css'
		);

		$userdata = $this->auth->session_get_user();


		// kirim parameter ke phtml dan mjs
		$this->reportparameter = (object)[
			'dt' => $param->dt,
			'rpttype' => $param->rpttype,
			'dept_id' => $param->dept_id,
			'partner_id' => $param->partner_id,
			'project_id' => $param->project_id
		];

		try {

			$this->log($param);

			// get information
			$this->dept_name = \FGTA4\utils\SqlUtility::Lookup($param->dept_id, $this->db, 'mst_dept', 'dept_id', 'dept_name');
			$this->partner_name = \FGTA4\utils\SqlUtility::Lookup($param->partner_id, $this->db, 'mst_partner', 'partner_id', 'partner_name');
			$this->project_name = \FGTA4\utils\SqlUtility::Lookup($param->project_id, $this->db, 'mst_project', 'project_id', 'project_name');
			$this->report_date = $this->reportparameter->dt;

			switch ($param->rpttype) {
				case 'bydept':
					$this->report_title = "By Departemen ($this->dept_name) per $this->report_date"; 
					break;
				case 'bypartner':
					$this->report_title = "By Partner ($this->partner_name) per $this->report_date";
					break;
				case 'byproject':
					$this->report_title = "By Project ($this->project_name) per $this->report_date";
					break;					
				default:
					$this->report_title = "per $this->report_date";
					break;	

			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};

