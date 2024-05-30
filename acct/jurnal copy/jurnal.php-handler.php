<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class jurnal_pageHandler {
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
		try {

			if (property_exists($jurnalsource_id = $this->setup->variancedata, "jurnalsource")) {
				$jurnalsource_id = $this->setup->variancedata->jurnalsource->id;
				$sql = "select * from mst_jurnalsource where jurnalsource_id = :id";
		
				$stmt = $this->db->prepare($sql);
				$stmt->execute([':id'=>$jurnalsource_id]);
				$row = $stmt->fetch();
		
				if ($row==null) {
					throw new \Exception("JurnalSourceId '$jurnalsource_id' tidak ditemukan");
				}
	
				$jurnalsource_name = $row['jurnalsource_name'];
				$this->setup->variancedata->jurnalsource->text = $jurnalsource_name;
			} 

		} catch (\Exception $ex) {
			throw $ex;
		}

	

	}
}