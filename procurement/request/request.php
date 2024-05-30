<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


require_once __ROOT_DIR.'/core/sqlutil.php';


/**
 * finact/procurement/request/request.php
 *
 * ===================================================================
 * Entry point Program Module request
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
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
				echo "Kode employee belum di set pada user anda";
				var_dump($userdata);
				throw new \Exception(""); 
			}

			/* cek apakah empoye bisa pilih all dept */
			$empluser = \FGTA4\utils\SqlUtility::LookupRow($userdata->empl_id, $this->db, 'mst_empluser', 'empl_id');	
			

			// parameter=parameter yang bisa diakses langsung dari javascript module
			// dengan memanggil variable global.setup.<namavariable>
			$this->setup = (object)array(
				'print_to_new_window' => false,
				'username' => $userdata->username,
				'dept_id' => $userdata->dept_id,
				'dept_name' => $userdata->dept_name,
				'empl_id' => $userdata->empl_id,
				'empl_name' => $userdata->empl_name,
				'empluser_allowviewalldept' => $empluser['empluser_allowviewalldept'], 
				'doc_id' => 'PURCHASEREQUEST',
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
