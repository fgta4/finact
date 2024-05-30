<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/acct/jurnal/apis/xtion-jurnallink-list.php
 */
$API = new class extends jurnalBase {
	public function execute($options) {
		try {
			$jurnaldetil_id = $options->criteria->jurnaldetil_id;

			/* ambil informasi jurnaldetil */
			$sql = "
				call jurnal_link_list(:jurnaldetil_id)
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnaldetil_id'=>$jurnaldetil_id]);
			$rows = $stmt->fetchall();

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				array_push($records, $record);
			}

			return (object)[
				'success' => true,
				'records' => $records
			];			

		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};


