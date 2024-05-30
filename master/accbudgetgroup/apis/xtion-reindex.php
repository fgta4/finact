<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/billout/apis/xtion-commit.php
 *
 * =======
 * Post
 * =======
 * Post dokumen, masukkan data bill ke jurnal. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 19 April 2021
 */
$API = new class extends accbudgetgroupBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'user' => $userdata
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$sql = "
					set @coagroup_skip_trigger = 1;
					set max_sp_recursion_depth = 10;
					call accbudgetgroup_reindex();
					set max_sp_recursion_depth = 0;
					set @coagroup_skip_trigger = null;
				";
				$this->db->query($sql);


				
				$this->db->commit();
				return (object)[
					'success' => true,
				];
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


