<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/sqlutil.php';

/**
 * finact/fin/pettycash/pettycash.php
 *
 * ===================================================================
 * Entry point Program Module pettycash
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 07/04/2022
 */
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


		try {

			


			if (!\property_exists($userdata, 'empl_id')) {
				echo "Pettycash tidak dapat dibuka. Kode employee belum di set pada user anda";
				var_dump($userdata);
				throw new \Exception(""); 
			}
		
			$empl = \FGTA4\utils\SqlUtility::LookupRow($userdata->empl_id, $this->db, 'mst_empl', 'empl_id');	
			$site_id = $empl['site_id'];
			$site_name = \FGTA4\utils\SqlUtility::Lookup($site_id, $this->db, 'mst_site', 'site_id', 'site_name');	
		
			// parameter=parameter yang bisa diakses langsung dari javascript module
			// dengan memanggil variable global.setup.<namavariable>
			$this->setup = (object)array(
				'print_to_new_window' => false,
				'username' => $userdata->username,
				'site_id' => $site_id,
				'site_name' => $site_name
			);
		

			$variancename = $_GET['variancename'];
			switch ($variancename) {
				default:
					break;
			} 

		} catch (\Exception $ex) {
			$this->error($ex->getMessage());
		}			
	
	}


};
