<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/apps/finact/acct/jurnal/apis/xtion.jurnal.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


class BilloutXtionBase extends JurnalXtionBase {

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				trn_billout A 
				where 
				billout_id = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_detil_rows($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				trn_billoutdetil A
				where 
				A.billout_id = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$records = [];
			foreach ($rows as $row) {
				$records[] = (object)$row;
			}
			return $records;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function pre_post_check($data, $action) {
		try {

			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}	

}