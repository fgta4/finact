<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/master/projectmodel/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header projectmodel (mst_projectmodel)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 05/12/2021
 */
$API = new class extends projectmodelBase {
	
	public function execute($options) {
		$tablename = 'mst_projectmodel';
		$primarykey = 'projectmodel_id';
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
					"projectmodel_id" => " projectmodel_id = :projectmodel_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_projectmodel A', [
				'projectmodel_id', 'projectmodel_name', 'projectmodel_isdisabled', 'projectmodel_descr', 'projecttype_id', 'fg_accbudget_id', 'fg_coa_id', 'sl_accbudget_id', 'sl_coa_id', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				
				'projecttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttype_id'], $this->db, 'mst_projecttype', 'projecttype_id', 'projecttype_name'),
				'fg_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['fg_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'fg_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['fg_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'sl_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['sl_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'sl_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['sl_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),


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