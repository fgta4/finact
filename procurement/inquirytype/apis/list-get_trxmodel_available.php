<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/items/inquirytype/apis/list-get_trxmodel_available.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel trxmodel (mst_trxmodel)
 * yang tersedia pada suatu inquirytype
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 */
$API = new class extends inquirytypeBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'inquirytype_id', '');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.trxmodel_id LIKE CONCAT('%', :search, '%') OR A.trxmodel_name LIKE CONCAT('%', :search, '%') ",
					"inquirytype_id" => '--'
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(A.trxmodel_id) as n 
				from mst_trxmodel A inner join (
					select trxmodel_id, orderout_doc_id from mst_inquirytype where inquirytype_id = :inquirytype_id 
					union
					select trxmodel_id, orderout_doc_id from mst_inquirytypetrxmodel where inquirytype_id = :inquirytype_id 
				) B on B.trxmodel_id = A.trxmodel_id 
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.trxmodel_id, A.trxmodel_name, A.trxmodel_isdateinterval, B.orderout_doc_id
					from mst_trxmodel A inner join (
						select trxmodel_id, orderout_doc_id from mst_inquirytype where inquirytype_id = :inquirytype_id 
						union
						select trxmodel_id, orderout_doc_id from mst_inquirytypetrxmodel where inquirytype_id = :inquirytype_id 
					) B on B.trxmodel_id = A.trxmodel_id 
				" 
				. $where->sql 
				. " order by A.trxmodel_name "
				. $limit
			);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
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