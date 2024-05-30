<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/procurement/inquirytype/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header inquirytype (mst_inquirytype)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/09/2021
 * 
 * Last Modifed:
 * 18/09/2021 agung
 */
$API = new class extends inquirytypeBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$options->criteria->inquirytype_isdisabled = 0;
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.inquirytype_id LIKE CONCAT('%', :search, '%') OR A.inquirytype_name LIKE CONCAT('%', :search, '%') ",
					"inquirytype_isdisabled" => " A.inquirytype_isdisabled = :inquirytype_isdisabled "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_inquirytype A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.inquirytype_id, A.inquirymodel_id, A.inquirytype_name, A.inquirytype_isdisabled, A.inquirytype_descr
				    , A.inquiryselect_id, A.itemmanage_id, A.inquirytype_isallowadvance, A.inquirytype_isemplaspartner
					, A.inquirytype_maxadvancevalue, A.related_dept_id, A.related_team_id, A.owner_dept_id, A.owner_team_id, A.site_id, A.room_id, A.orderout_dept_id, A.orderout_team_id, A.trxmodel_id, A.inquiry_title_ina, A.inquiry_title_eng, A.inquiry_doc_id, A.request_title_ina, A.request_title_eng, A.request_doc_id, A.orderout_title_ina, A.orderout_title_eng, A.orderout_doc_id, A.inquirytype_isuseqty, A.inquirytype_isusedays, A.inquirytype_isusetask, A.inquirytype_islimitqty, A.inquirytype_islimitdays, A.inquirytype_islimittask, A.inquirytype_islimitvalue, A.inquirytype_isallowoverbudget, A.inquirytype_isdeptuser, A.inquirytype_isdeptowner, A.inquirytype_isdeptmaintainer, A.inquirytype_isqtybreakdown, A.inquirytype_istoberequest, A.inquirytype_isautorequest, A.inquirytype_isautoorder, A.inquirytype_ismovinginit, A.inquirytype_isdateinterval, A._createby, A._createdate, A._modifyby, A._modifydate 
					, B.inquiryselect_isshowitemasset, B.inquiryselect_isshowitem, B.inquiryselect_isshowitemstock, B.inquiryselect_isshowpartner, B.inquiryselect_isshowitemclass, B.inquiryselect_isitemclassdisabled
					from mst_inquirytype A inner join mst_inquiryselect B on B.inquiryselect_id = A.inquiryselect_id
				" 
				. $where->sql 
				. " order by A.inquirytype_name "	
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

				$inquiry_selectfield =   $record['inquiryselect_isshowitemasset'] 
										.$record['inquiryselect_isshowitem']
										.$record['inquiryselect_isshowitemstock']
										.$record['inquiryselect_isshowpartner']
										.$record['inquiryselect_isshowitemclass']
										.$record['inquiryselect_isitemclassdisabled'];


				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
					'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'related_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'related_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'room_name' => \FGTA4\utils\SqlUtility::Lookup($record['room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'inquiry_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'request_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'orderout_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),					
					'inquiry_selectfield' =>  $inquiry_selectfield,
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