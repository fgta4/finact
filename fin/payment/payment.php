<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


/**
 * finact/fin/payment/payment.php
 *
 * ===================================================================
 * Entry point Program Module payment
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/05/2021
 */
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


	public function LoadPage() {
		$userdata = $this->auth->session_get_user();


		$periode = $this->getDefaultPeriode();

		// parameter=parameter yang bisa diakses langsung dari javascript module
		// dengan memanggil variable global.setup.<namavariable>
		$this->setup = (object)array(
			'print_to_new_window' => false,
			'username' => $userdata->username,
			'dept_id' => $userdata->dept_id,
			'dept_name' => $userdata->dept_name,
			'jurnalsource_id' => 'PAYMENT',
			'jurnalsource_name' => 'PAYMENT',
			'periodemo_id' => $periode['periodemo_id'],
			'periodemo_name' => $periode['periodemo_name'],
			'jurnal_date' => $periode['bookdate_js'],
			'curr_id' => __LOCAL_CURR,
			'curr_name' => __LOCAL_CURR,
			'curr_rate' => 1
		);

		$variancename = $_GET['variancename'];
		switch ($variancename) {
			default:
				break;
		} 
	
	}


	function getDefaultPeriode() {
		$stmt = $this->db->prepare("
			select
			periodemo_id, periodemo_name, bookdate_js
			from
			view_periodemo_lastest	
		");
		$stmt->execute();
		$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		$row = $rows[0];
		return [
			'periodemo_id' => $row['periodemo_id'],
			'periodemo_name' => $row['periodemo_name'],
			'bookdate_js' => $row['bookdate_js']
		];
	}


};
