<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			// $dept_id = $options->criteria->dept_id;
			// $owner_dept_id = $options->criteria->owner_dept_id;
			// unset($options->criteria->dept_id);
			// unset($options->criteria->owner_dept_id);
			// $inquirytype_id = $options->criteria->inquirytype_id;
			// unset($options->criteria->inquirytype_id);
			

			$itemclass_id = $options->criteria->itemclass_id;
			$location_site_id = $options->criteria->site_id;
			$location_dept_id = $options->criteria->dept_id;
			$itemasset_ismoveable = $options->criteria->itemasset_ismoveable;
			$itemasset_ischeckout = 0;
			$inquiryitemasset_id = $options->criteria->inquiryitemasset_id;
			

			$params = [
				':itemclass_id' => $itemclass_id,
				':site_id' => $location_site_id,
				':dept_id' => $location_dept_id,
				':itemasset_ismoveable' => $itemasset_ismoveable,
				':inquiryitemasset_id' => $inquiryitemasset_id
			];

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(*) as n 
				from mst_itemasset A left join (
					select 
					F.itemasset_id, F.itemasset_name
					from mst_itemasset F inner join trn_inquiryitemasset G on G.itemasset_id = F.itemasset_id
										 inner join trn_inquiry H on H.inquiry_id = G.inquiry_id 
					WHERE 
					
						( F.itemclass_id = :itemclass_id ) 
					AND ( H.inquiry_ispreparing = 1 and H.inquiry_isprepared = 0 )
					AND ( G.inquiryitemasset_id <> :inquiryitemasset_id )
				) B on A.itemasset_id = B.itemasset_id
				WHERE
					A.itemclass_id = :itemclass_id
				AND A.location_site_id = :site_id
				AND A.location_dept_id = :dept_id
				AND B.itemasset_id is NULL
				AND A.itemasset_ismoveable = :itemasset_ismoveable
				AND A.itemasset_ischeckout = 0
			");
			$stmt->execute($params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$sql = "
				select 
				A.itemasset_id, A.itemasset_name, A.itemclass_id, A.itemasset_usevaluerate
				from mst_itemasset A left join (
					select 
					F.itemasset_id, F.itemasset_name
					from mst_itemasset F inner join trn_inquiryitemasset G on G.itemasset_id = F.itemasset_id
										 inner join trn_inquiry H on H.inquiry_id = G.inquiry_id 
					WHERE 
					
					    ( F.itemclass_id = :itemclass_id ) 
					AND ( H.inquiry_ispreparing = 1 and H.inquiry_isprepared = 0 )
					AND ( G.inquiryitemasset_id <> :inquiryitemasset_id )
				) B on A.itemasset_id = B.itemasset_id
				WHERE
					A.itemclass_id = :itemclass_id
				AND A.location_site_id = :site_id
				AND A.location_dept_id = :dept_id
				AND B.itemasset_id is NULL
				AND A.itemasset_ismoveable = :itemasset_ismoveable
				AND A.itemasset_ischeckout = 0
				ORDER BY  A.itemasset_name 
				LIMIT $maxrow OFFSET $offset
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute($params);
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
					// 'itemgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemgroup_id'], $this->db, 'mst_itemgroup', 'itemgroup_id', 'itemgroup_name'),
					// 'itemmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmodel_id'], $this->db, 'mst_itemmodel', 'itemmodel_id', 'itemmodel_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					// 'depremodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['depremodel_id'], $this->db, 'mst_depremodel', 'depremodel_id', 'depremodel_name'),
					// 'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					// 'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					// 'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					// 'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					// 'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					// 'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					// 'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					 
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

}

$API = new DataList();