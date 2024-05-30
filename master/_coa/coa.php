<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

class COA extends WebModule {
	
	public function LoadPage() {
		$this->coa_name_uppercase = ($this->reqinfo->modulesetting->get('head/coa_name/skip_forceuppercase')===true) ? "false" : "true";

		$userdata = $this->auth->session_get_user();

		// parameter=parameter yang bisa diakses langsung dari javascript module
		// dengan memanggil variable global.setup.<namavariable>
		$this->setup = (object)array(
			'print_to_new_window' => false,
			'username' => $userdata->username,
		);

		$variancename = $_GET['variancename'];
		switch ($variancename) {
			default:
				break;
		} 
	}
}

$MODULE = new COA();



