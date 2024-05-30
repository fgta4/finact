<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


class XtionBase extends WebAPI {

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*,
				(select partner_name from mst_partner where partner_id = A.partner_id) as partner_name,
				(select paym_isverify from trn_paym where paym_id = A.paym_id) as paym_isverify 
				from 
				trn_billin A 
				where 
				billin_id = :id 
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
				A.*, 
				B.itemclass_name 
				from 
				trn_billindetil A inner join mst_itemclass B on B.itemclass_id = A.itemclass_id 
				where 
				A.billin_id = :id 
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


	function check_billin_payment($data) {
		try {
			if ($data->header->paym_isverify) {
				throw new \Exception('Data bill in tidak bisa di commit/uncommit/unapprove, karena informasi pembayaran sudah di verifikasi.');
			} else {
				// paym belum di verifikasi, bisa di purge
				debug::log("purge paym no" . $data->header->paym_id);
				$sql = "
					update trn_paym
					set 
					paym_ispurge=1,
					paym_purgeby = :paym_purgeby,
					paym_purgedate = :paym_purgedate
					where
					paym_id = :paym_id 
				";

				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					":paym_id" => $data->header->paym_id,
					":paym_purgeby" =>  $data->currentuser->username,
					":paym_purgedate" => date("Y-m-d H:i:s")
				]);
				

				// kosongkan no paym
				$data->header->paym_id = null;
				
			}
		} catch (\Exception $ex ) {
			throw $ex;
		}
	}	

}