<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\utils\SqlUtility;


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

			
			// header
			$sql = "
				select * from trn_jurnal where jurnal_id = :jurnal_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$id]);
			$this->DATA = (object)$stmt->fetch();
			$this->DATA->jurnal_date = date("d/m/Y", strtotime($this->DATA->jurnal_date));
			$this->DATA->periodemo_name = SqlUtility::Lookup($this->DATA->periodemo_id, $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name');

	
			// detils
			$sql = "
				select *
				from (
					(select *, 1 as dk, abs(jurnaldetil_validr) as abv from trn_jurnaldetil where jurnal_id = :jurnal_id and jurnaldetil_validr >= 0) 
					union all
					(select *, 2 as dk, abs(jurnaldetil_validr) as abv from trn_jurnaldetil where jurnal_id = :jurnal_id and jurnaldetil_validr < 0)
				) X
				order by dk, abv desc;
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$id]);
			$rows = $stmt->fetchall();
			
			
			$records = [];
			$total_jurnaldetil_validr = 0;
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$record['partner_name'] = SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name');
				$record['coa_name'] = SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name');
				$record['jurnaldetil_validr'] = (float)$record['jurnaldetil_validr'];

				$total_jurnaldetil_validr += (float)$record['jurnaldetil_validr'];
				array_push($records, $record);
			}
			$this->DATA->ITEMS = $records;
			$this->DATA->total_jurnaldetil_validr = $total_jurnaldetil_validr;


			// masukkan ke variable setup agar bisa diakses oleh mjs
			$this->setup->DATA = $this->DATA;

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};
