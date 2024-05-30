<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xtion.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends PeriodeXtionBase {
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

			// $lowerinfo = $this->get_periode_lower($id);
			// $upperinfo = $this->get_periode_upper($id);

			// if (!$lowerinfo->exist) {
			// 	throw new \Exception('Periode sebelumnya belum ada');
			// }

			// if ($upperinfo->isclosed) {
			// 	throw new \Exception('Periode setelahnya masih dalam posisi close');
			// }			
			
			$sql = " 
				update mst_periodemo
				set 
				periodemo_isclosed = 0,
				periodemo_closeby = null,
				periodemo_closedate = null
				where
				periodemo_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id
			]);

			return (object)[
				'success' => true,
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};


