<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


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
	
	public function TestPreview() {
		$id = 'xxx';
		$variancename = '';
		$this->LoadPage($id, $variancename);
	}
	
	public function LoadPage($id, $variancename) {
		$userdata = $this->auth->session_get_user();
		try {
			$this->preloadscripts = [
				'jslibs/qrious.js'
			];

			$this->setup = (object)[
				'id' => $id,
				'variancename' => $variancename				
			];

			// query data, masukkan ke variable setup agar bisa diakses oleh mjs
			$sql = "
				select * from trn_billout where billout_id = :billout_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':billout_id'=>$id]);
			$this->DATA = (object)$stmt->fetch();
			$this->DATA->billout_date = date("d/m/Y", strtotime($this->DATA->billout_date));
			
			$this->setup->total = number_format($this->DATA->billout_value);
			

			$sql = "
				select * from mst_partner where partner_id = :partner_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':partner_id'=>$this->DATA->partner_id]);
			$this->DATA->partner = (object)$stmt->fetch();



			// data detil
			$sql = "
				select * from trn_billoutdetil where billout_id = :billout_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':billout_id'=>$id]);
			$rows = $stmt->fetchall();

			$records = [];
			foreach ($rows as $row) {
				$record = [];

				$record['descr'] = $row['billoutdetil_descr'];
				$record['amount'] = number_format($row['billoutdetil_value']);

				array_push($records, $record);
			}
			$this->DATA->ITEMS = $records;


			// masukkan ke variable setup agar bisa diakses oleh mjs
			$this->setup->DATA = $this->DATA;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};
