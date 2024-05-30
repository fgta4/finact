<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/sqlutil.php';

class inquiry_pageHandler {

	function __construct() {
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
	}

	public function LoadPage() {
		$userdata = $this->userdata;

		$this->setup->partner_id = null;
		$this->setup->partner_name = null;


		try {
			$partner = \FGTA4\utils\SqlUtility::LookupRow($userdata->empl_id, $this->db, 'mst_partner', 'empl_id');	
			if ($partner != null) {
				$partner =  is_array($partner)?$partner:[];
				$this->setup->partner_id = array_key_exists('partner_id', $partner) ? $partner['partner_id'] : '';
				$this->setup->partner_name = array_key_exists('partner_id', $partner) ? $partner['partner_name'] : '';
			}

		} catch (\Exception $ex) {
			throw $ex;			
		}
	}

}