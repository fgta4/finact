<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends settlBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();

		try {
		
			
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$this->log($options->criteria);
			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'billtype_id', 'ADV');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billin_id LIKE CONCAT('%', :search, '%') OR A.billin_id LIKE CONCAT('%', :search, '%') ",
					"billtype_id" => " B.billtype_id = :billtype_id "
				]
			);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n from 
					trn_billinpaym A inner join trn_billin B on A.billin_id = B.billin_id
									inner join trn_jurextpv  C on C.billinpaym_id  = A.billinpaym_id 
									inner join trn_jurnaldetil D on D.jurnaldetil_id = C.paym_jurnaldetil_id 					
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
					A.billinpaym_id,
					A.billinpaym_descr,
					A.billinpaym_itemidr + A.billinpaym_ppnidr - A.billinpaym_pphidr as billinpaym_totalidr,
					A.billinpaym_itemfrg + A.billinpaym_ppnfrg - A.billinpaym_pphfrg as billinpaym_totalfrg,
					A.curr_id ,
					A.billinpaym_frgrate as curr_rate,
					B.inquiry_id,
					B.partner_id,
					B.billin_id,
					B.billin_descr,
					C.jurnal_id as paym_jurnal_id ,
					C.paym_jurnaldetil_id,
					D.coa_id,
					(select coa_id from trn_jurnaldetil where jurnal_id=C.jurnal_id and jurnaldetil_dk='D' limit 1) as adv_coa_id 				
				from 
				trn_billinpaym A inner join trn_billin B on A.billin_id = B.billin_id
								inner join trn_jurextpv  C on C.billinpaym_id  = A.billinpaym_id 
								inner join trn_jurnaldetil D on D.jurnaldetil_id = C.paym_jurnaldetil_id 
				" 
				. $where->sql 
				. " order by A.billinpaym_id "
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

				$jurnal = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnal_id'], $this->db, 'trn_jurnal', 'jurnal_id');
				$jurnaldetil = \FGTA4\utils\SqlUtility::LookupRow($record['paym_jurnaldetil_id'], $this->db, 'trn_jurnaldetil', 'jurnaldetil_id');
	
				// 'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'adv_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['adv_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'billinpaym_caption' => "[".$record['billin_id']."] " . $record['billinpaym_descr'],
					'paym_jurnal_caption' => "[".$jurnal['jurnal_id']."] " . $jurnal['jurnal_descr'],
					'paym_jurnaldetil_caption' =>  "[".$jurnaldetil['jurnaldetil_id']."] " . $jurnaldetil['jurnaldetil_descr'],

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