<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/master/accbudget/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header accbudget (mst_accbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/04/2021
 */
$API = new class extends accbudgetBase {
	
	public function execute($options) {
		$tablename = 'mst_accbudget';
		$primarykey = 'accbudget_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"accbudget_id" => " accbudget_id = :accbudget_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_accbudget A', [
				'accbudget_id', 'accbudget_name', 'accbudget_nameshort', 'accbudget_isdisabled', 'accbudget_descr', 'accbudgetgroup_id', 'accbudgetmodel_id', 'accbudgettype_id', 'coa_id', 'coa_nameshort'
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'accbudgetgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetgroup_id'], $this->db, 'mst_accbudgetgroup', 'accbudgetgroup_id', 'accbudgetgroup_name'),
				'accbudgetmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetmodel_id'], $this->db, 'mst_accbudgetmodel', 'accbudgetmodel_id', 'accbudgetmodel_name'),
				'accbudgettype_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgettype_id'], $this->db, 'mst_accbudgettype', 'accbudgettype_id', 'accbudgettype_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};