<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * finact/items/itemasset/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemasset (mst_itemasset)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/10/2021
 */
$API = new class extends itemassetBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_itemasset';
		$primarykey = 'itemasset_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->itemasset_purchasedate = (\DateTime::createFromFormat('d/m/Y',$obj->itemasset_purchasedate))->format('Y-m-d');
			$obj->itemasset_lastsupportdate = (\DateTime::createFromFormat('d/m/Y',$obj->itemasset_lastsupportdate))->format('Y-m-d');
			$obj->itemasset_currentvalue_date = (\DateTime::createFromFormat('d/m/Y',$obj->itemasset_currentvalue_date))->format('Y-m-d');



			if ($obj->itemasset_serial=='') { $obj->itemasset_serial = '--NULL--'; }


			unset($obj->itemasset_writeoffby);
			unset($obj->itemasset_writeoffdate);
			unset($obj->itemasset_writeoffref);



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'itemasset_id', 'itemasset_name', 'itemasset_serial', 'item_id', 'itemassetstatus_id', 'itemasset_statusnote', 'itemasset_ischeckout', 'itemasset_ismoveable', 'itemasset_isdisabled', 'itemasset_iswrittenof', 'itemasset_descr', 'itemasset_merk', 'itemasset_type', 'itemclass_id', 'itemasset_baselocation', 'site_id', 'owner_dept_id', 'maintainer_dept_id', 'location_dept_id', 'location_site_id', 'location_room_id', 'location_empl_id', 'partner_id', 'itemasset_purchasedate', 'itemasset_lastsupportdate', 'itemasset_purchasevalue', 'curr_id', 'itemasset_purchasevalue_idr', 'asset_coa_id', 'depremodel_id', 'cost_coa_id', 'itemasset_depreage', 'itemasset_depreresidu', 'itemasset_currentvalue_idr', 'itemasset_currentvalue_date', 'itemasset_usevaluerate', 'itemasset_writeoffby', 'itemasset_writeoffdate', 'itemasset_writeoffref', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
				'item_name' => \FGTA4\utils\SqlUtility::Lookup($record['item_id'], $this->db, 'mst_item', 'item_id', 'item_name'),
				'itemassetstatus_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetstatus_id'], $this->db, 'mst_itemassetstatus', 'itemassetstatus_id', 'itemassetstatus_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'maintainer_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['maintainer_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'location_room_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['location_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'itemasset_purchasedate' => date("d/m/Y", strtotime($row['itemasset_purchasedate'])),
				'itemasset_lastsupportdate' => date("d/m/Y", strtotime($row['itemasset_lastsupportdate'])),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'asset_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['asset_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'depremodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['depremodel_id'], $this->db, 'mst_depremodel', 'depremodel_id', 'depremodel_name'),
				'cost_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['cost_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'itemasset_currentvalue_date' => date("d/m/Y", strtotime($row['itemasset_currentvalue_date'])),
				'itemasset_writeoffby' => \FGTA4\utils\SqlUtility::Lookup($record['itemasset_writeoffby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);



				$this->db->commit();
				return $result;

			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

};