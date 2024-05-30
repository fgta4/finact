<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class extends WebModule {

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
		$userdata = $this->auth->session_get_user();

		$this->preloadscripts = [
			'jslibs/tabletoexcel.js'
		];

		$optionlist_tag = '#lapkeu';
		$optionlist_id = '--NULL--';
		$optionlist_name = 'NONE';
		$optionlist_data = "{}";

		$sql = "
			select 
			optionlist_id, optionlist_name, optionlist_data
			from fgt_optionlist 
			where 
			optionlist_tag like concat('%', :optionlist_tag, '%') 
			order by optionlist_order asc 
			limit 1
		";
		$stmt = $this->db->prepare($sql);
		$stmt->execute([':optionlist_tag'=>$optionlist_tag]);
		$row = $stmt->fetch();
		if ($row!=null) {
			$optionlist_id = $row['optionlist_id'];
			$optionlist_name = $row['optionlist_name'];
			$optionlist_data = $row['optionlist_data'];
		}

		$this->setup = (object)[
			'defaultDate' => date('d/m/Y'),
			'defaultReportType' => [$optionlist_id, $optionlist_name, $optionlist_data],
			'optionlist_tag' => $optionlist_tag,
			'userfullname' => $userdata->userfullname,
			'companyname' => __COMPANY_NAME__
		];
	}
};
