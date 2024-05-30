<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


$API = new class extends trxmodelBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'inquirytype_id', '0');


			$inquirytype_id = $options->criteria->inquirytype_id;
			$sql = "
				DROP TABLE IF EXISTS TEMP_TRXMODEL;
				CREATE TEMPORARY TABLE -- IF NOT EXISTS 
					TEMP_TRXMODEL ( INDEX(trxmodel_id) ) 
					ENGINE=MyISAM 
				AS (
					select distinct A.trxmodel_id from (
						select trxmodel_id from mst_inquirytype where inquirytype_id = '$inquirytype_id'
						union
						select trxmodel_id from mst_inquirytypetrxmodel  where inquirytype_id = '$inquirytype_id'
					) A
				);				
			";
			$this->db->query($sql);	


			
			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'pinjam', '0');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.trxmodel_id LIKE CONCAT('%', :search, '%') OR A.trxmodel_name LIKE CONCAT('%', :search, '%') ",
					"inquirytype_id" => null
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n 
					from mst_trxmodel A inner join TEMP_TRXMODEL B on B.trxmodel_id = A.trxmodel_id
				" 
				. $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.trxmodel_id, A.trxmodel_name, A.trxmodel_descr, A.trxmodel_direction, A.ppn_taxtype_id, A.pph_taxtype_id
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_trxmodel A inner join TEMP_TRXMODEL B on B.trxmodel_id = A.trxmodel_id
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					 'pph_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					 
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};