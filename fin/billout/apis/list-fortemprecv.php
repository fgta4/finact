<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/fin/billout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header billout (trn_billout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/04/2021
 */
$API = new class extends billoutBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billout_id LIKE CONCAT('%', :search, '%') OR A.billout_descr LIKE CONCAT('%', :search, '%') ",
					"partner_id" => " A.partner_id = :partner_id  "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;




			// $stmt = $this->db->prepare("select count(*) as n from trn_billout A" . $where->sql);
			$stmt = $this->db->prepare($this->getSql("count(*) as n") . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare(
				  $this->getSql("
				  		  A.billout_id, A.billout_descr, A.billout_validr
				  		, round(B.billout_outstanding_val) as billout_outstanding_val
				  		, round(B.billout_outstanding_tax) as billout_outstanding_tax
				  		, (round(B.billout_outstanding_val) + round(B.billout_outstanding_tax)) as billout_outstanding				 
				  ")	
				. $where->sql 
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
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					// 'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					// 'salesorder_descr' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_id'], $this->db, 'trn_salesorder', 'salesorder_id', 'salesorder_descr'),
					// 'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					// 'cost_coa_id_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					// 'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					// 'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					// 'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					// 'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					// 'billout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					// 'billout_postby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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


	function getSql ($fields) {
		return "
			select
			$fields
			from trn_billout A inner join (


				select 
				AX.billout_id, 
				sum(AX.billout_outstanding_val) as billout_outstanding_val,
				sum(AX.billout_outstanding_tax) as billout_outstanding_tax
				from (
					select 
					X.billout_id, 
					(X.billout_validr/1.1) as billout_outstanding_val, 
					X.billout_validr - (X.billout_validr/1.1) as billout_outstanding_tax
					from trn_billout X
					
					union
					
					select  
					X.billout_id ,
					-(X.cashdiscount_validr/1.1) as billout_outstanding_val, 
					-(X.cashdiscount_validr - (X.cashdiscount_validr/1.1)) as billout_outstanding_tax		
					from 
					trn_cashdiscount X
					
					union
					
					select 
					X.billout_id , 
					-X.colltemprecvdetil_validr  as billout_outstanding_val,
					-X.colltemprecvdetil_taxidr as billout_outstanding_tax
					from 
					trn_colltemprecvdetil X
				) AX
				group by AX.billout_id
				having round(sum(AX.billout_outstanding_val)) > 0 or round(sum(AX.billout_outstanding_tax)) > 0


			) B on B.billout_id = A.billout_id		
		
		";
	}

};