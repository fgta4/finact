<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends itemmoveBase {

	public function execute($param) {

		$DB_CONFIG = DB_CONFIG['FRM2'];
		// $DB_CONFIG['param'] = DB_CONFIG_PARAM['FRM2'];		
		$this->db_frm = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass']
		);


		$userdata = $this->auth->session_get_user();
		$region_id = $param->region_id;
		$ym = $param->ym;


		try {

			$currentdata = (object)[
				'user' => $userdata
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$dept_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];



				$sql = "
					select 
					A.hemoving_id, A.region_id, A.hemoving_date_fr , A.hemoving_date_to,  
					A.hemoving_isprop, A.hemoving_issend, A.hemoving_isrecv, A.hemoving_descr,
					B.heinv_id,
					B.C01, B.C02, B.C03, B.C04, B.C05,
					B.C06, B.C07, B.C08, B.C09, B.C10,
					B.C11, B.C12, B.C13, B.C14, B.C15,
					B.C16, B.C17, B.C18, B.C19, B.C20,
					B.C21, B.C22, B.C23, B.C24, B.C25
					from transaksi_hemoving A inner join transaksi_hemovingdetil B on B.hemoving_id = A.hemoving_id 
					WHERE 
						CONVERT(varchar(7), A.hemoving_date_fr,  120) = :ym
					AND A.hemoving_isrecv = 1
					AND A.region_id = :region_id				
				";

				$stmt = $this->db_frm->prepare($sql);
				$stmt->execute([':region_id' => $region_id, ':ym'=>$ym]);
				$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);		
				foreach ($rows as $row) {
					$this->log($row);

				}


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


