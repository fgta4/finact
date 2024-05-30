<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/procurement/orderout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header orderout (trn_orderout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 02/07/2021
 */
$API = new class extends billinBase {

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
					"search" => " A.recv_id LIKE CONCAT('%', :search, '%') OR A.recv_descr LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_recv A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.recv_id, A.unit_id, A.orderout_id, A.recv_ref, A.recv_descr, A.recv_date, A.partner_id, A.site_id, A.empl_id, A.recv_dept_id, A.trxmodel_id, A.inquirymodel_id, A.inquiryselect_id, A.itemmanage_id, A.owner_dept_id, A.orderout_dept_id, A.user_dept_id, A.project_id, A.projecttask_id, A.projbudget_id, A.projbudgettask_id, 
				B.orderout_id, B.unit_id, B.request_id, B.orderout_isunref, B.inquirytype_id, B.trxmodel_id, B.request_dept_id, B.orderout_descr, B.orderout_dtstart, B.orderout_dtend, B.curr_id, B.curr_rate, B.ppn_taxtype_id, B.pph_taxtype_id, B.partner_id, B.ordercontract_id, B.orderout_quot, B.paymtype_id, B.partnerbank_id, B.partnerbank_name, B.partnerbank_bankacc, B.partnerbank_bankaccname, B.partnerbank_bankname, B.partnercontact_id, B.partnercontact_upname, B.partnercontact_position, B.partnercontact_upphone, B.partnercontact_email, B.project_id, B.projecttask_id, B.projbudget_id, B.projbudgettask_id, B.orderout_isunbudgetted, B.site_id, B.user_dept_id, B.recv_dept_id, B.deliver_siteaddress, B.deliver_city, B.deliver_upname, B.deliver_uptelp, B.inquiry_id, B.orderout_ismultirequest, B.inquirymodel_id, B.inquiryselect_id, B.itemmanage_id, B.owner_dept_id, B.orderout_dept_id
				from trn_recv A left join trn_orderout B on B.orderout_id = A.orderout_id
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				$record['periodemo_id'] = date('Ym');
				// $recv = \FGTA4\utils\SqlUtility::LookupRow($record['orderout_id'], $this->db, 'trn_recv', 'orderout_id');

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					 'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					 'request_descr' => \FGTA4\utils\SqlUtility::Lookup($record['request_id'], $this->db, 'trn_request', 'request_id', 'request_descr'),
					 'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					 'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					 'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					 'request_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					 'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					 'ppn_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					 'pph_taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
					 'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					 'ordercontract_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_id'], $this->db, 'trn_ordercontract', 'ordercontract_id', 'ordercontract_descr'),
					 'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					 'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					 'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					 'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					 'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					 'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'view_projbudgettask', 'projbudgettask_id', 'projbudgettask_name'),
					 'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					 'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					 'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					 'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					 'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					 'orderout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 'orderout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 'orderout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 'orderout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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
