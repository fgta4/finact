<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/items/itemasset/apis/files-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel files} itemasset (mst_itemasset)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/10/2021
 */
$API = new class extends itemassetBase {

	public function execute($options) {
		$tablename = 'trn_inquiryfiles';
		$primarykey = 'inquiryfiles_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"inquiryfiles_id" => " inquiryfiles_id = :inquiryfiles_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_inquiryfiles A', [
				'inquiryfiles_id', 'doctype_id', 'inquiryfiles_descr', 'inquiryfiles_order', 'inquiryfiles_file', 'inquiry_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'doctype_name' => \FGTA4\utils\SqlUtility::Lookup($record['doctype_id'], $this->db, 'mst_doctype', 'doctype_id', 'doctype_name'),
				
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			try { $result->record['inquiryfiles_file_doc'] = $this->cdb->getAttachment($result->record[$primarykey], 'filedata'); } catch (\Exception $ex) {}
	

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};