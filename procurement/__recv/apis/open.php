<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/procurement/recv/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header recv (trn_recv)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends recvBase {
	
	public function execute($options) {
		$tablename = 'trn_recv';
		$primarykey = 'recv_id';
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
					"recv_id" => " recv_id = :recv_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_recv A', [
				  'recv_id', 'unit_id', 'orderout_id', 'recv_ref', 'recv_descr', 'recv_date', 'partner_id', 'site_id', 'empl_id', 'recv_dept_id', 'trxmodel_id', 'inquirymodel_id', 'inquiryselect_id', 'itemmanage_id', 'owner_dept_id', 'request_dept_id', 'orderout_dept_id', 'user_dept_id', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', 'recv_version', 'recv_iscommit', 'recv_commitby', 'recv_commitdate', 'recv_isrecv', 'recv_recvby', 'recv_recvdate', 'recv_ispost', 'recv_postby', 'recv_postdate'
				  , 'recvitem_totalvalue', 'curr_id', 'curr_rate', 'recvitem_totalidr'
				  , 'ppn_taxtype_id', 'ppn_value', 'ppn_isinclude', 'pph_taxtype_id', 'pph_value', 'pph_isinclude'
				  , 'recvitem_totalvaluenett', 'recvitem_totalvalueppn', 'recvitem_totalvaluepph', 'recvitem_totalidrnett', 'recvitem_totalidrppn', 'recvitem_totalidrpph'
				  , '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$jurnal = \FGTA4\utils\SqlUtility::LookupRow($record['recv_id'], $this->db, 'trn_jurnal', 'jurnal_id');
			if ($jurnal!=null) {
				$record['recv_ispost'] = 1;
				$record['recv_postby'] = $jurnal['_createby'];
				$record['recv_postdate'] = $jurnal['_createdate'];
			} else {
				$record['recv_ispost'] = 0;
				$record['recv_postby'] = "";
				$record['recv_postdate'] = "";		
			}

			$result->record = array_merge($record, [
				'recv_date' => date("d/m/Y", strtotime($record['recv_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'recv_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'recv_recvby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_recvby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'recv_postby' => \FGTA4\utils\SqlUtility::Lookup($record['recv_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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