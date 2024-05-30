<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * finact/items/itemassetmove/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemassetmove (trn_itemassetmove)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/01/2022
 */
$API = new class extends itemassetmoveBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_itemassetmove';
		$primarykey = 'itemassetmove_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemassetmove_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemassetmove_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


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
			$obj->itemassetmove_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->itemassetmove_dtstart))->format('Y-m-d');
			$obj->itemassetmove_dtexpected = (\DateTime::createFromFormat('d/m/Y',$obj->itemassetmove_dtexpected))->format('Y-m-d');
			$obj->itemassetmove_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->itemassetmove_dtend))->format('Y-m-d');





			unset($obj->itemassetmove_iscommit);
			unset($obj->itemassetmove_commitby);
			unset($obj->itemassetmove_commitdate);
			unset($obj->itemassetmove_issend);
			unset($obj->itemassetmove_sendby);
			unset($obj->itemassetmove_senddate);
			unset($obj->itemassetmove_isrcv);
			unset($obj->itemassetmove_rcvby);
			unset($obj->itemassetmove_rcvdate);



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
					, 'itemassetmove_id', 'inquiry_id', 'itemassetmove_isunreferenced', 'itemassetmovemodel_id', 'itemassetmovetype_id', 'itemassetmove_dtstart', 'itemassetmove_dtexpected', 'itemassetmove_dtend', 'itemassetmove_descr', 'user_dept_id', 'from_site_id', 'from_room_id', 'from_empl_id', 'to_dept_id', 'to_site_id', 'to_room_id', 'to_empl_id', 'doc_id', 'itemassetmove_version', 'itemassetmove_isdateinterval', 'itemassetmove_isdept', 'itemassetmove_isemployee', 'itemassetmove_issite', 'itemassetmove_isroom', 'itemassetmove_isreturn', 'itemassetmove_iscommit', 'itemassetmove_commitby', 'itemassetmove_commitdate', 'itemassetmove_issend', 'itemassetmove_sendby', 'itemassetmove_senddate', 'itemassetmove_isrcv', 'itemassetmove_rcvby', 'itemassetmove_rcvdate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'itemassetmovemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovemodel_id'], $this->db, 'mst_itemassetmovemodel', 'itemassetmovemodel_id', 'itemassetmovemodel_name'),
					'itemassetmovetype_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmovetype_id'], $this->db, 'mst_itemassetmovetype', 'itemassetmovetype_id', 'itemassetmovetype_name'),
					'itemassetmove_dtstart' => date("d/m/Y", strtotime($row['itemassetmove_dtstart'])),
					'itemassetmove_dtexpected' => date("d/m/Y", strtotime($row['itemassetmove_dtexpected'])),
					'itemassetmove_dtend' => date("d/m/Y", strtotime($row['itemassetmove_dtend'])),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'from_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'from_room_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'from_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'to_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'to_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'to_room_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'to_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'itemassetmove_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemassetmove_sendby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_sendby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemassetmove_rcvby' => \FGTA4\utils\SqlUtility::Lookup($record['itemassetmove_rcvby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

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
		
			$seqname = 'MV';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};