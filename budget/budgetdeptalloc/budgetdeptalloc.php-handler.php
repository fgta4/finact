<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/sqlutil.php';

class budgetdeptalloc_pageHandler {

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

		$this->setup->owner_dept_id = null;
		$this->setup->owner_dept_name = null;

		try {
			$dept = \FGTA4\utils\SqlUtility::LookupRow($userdata->dept_id, $this->db, 'mst_dept', 'dept_id');	
			if ($dept != null) {
				$dept =  is_array($dept)?$dept:[];
				$this->setup->owner_dept_id = array_key_exists('dept_id', $dept) ? $dept['dept_id'] : '';
				$this->setup->owner_dept_name = array_key_exists('dept_name', $dept) ? $dept['dept_name'] : '';
			}

		} catch (\Exception $ex) {
			throw $ex;			
		}
	}

}