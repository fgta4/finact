<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * finact/items/itemmove/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemmove (trn_itemmove)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/03/2022
 */
$API = new class extends itemmoveBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_itemmove';
		$primarykey = 'itemmove_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\itemmove_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new itemmove_headerHandler($data, $options);
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
			$obj->itemmove_dtfr = (\DateTime::createFromFormat('d/m/Y',$obj->itemmove_dtfr))->format('Y-m-d');
			$obj->itemmove_dtto = (\DateTime::createFromFormat('d/m/Y',$obj->itemmove_dtto))->format('Y-m-d');





			unset($obj->itemmove_dtfr);
			unset($obj->itemmove_dtto);
			unset($obj->itemmove_iscommit);
			unset($obj->itemmove_commitby);
			unset($obj->itemmove_commitdate);
			unset($obj->itemmove_issend);
			unset($obj->itemmove_sendby);
			unset($obj->itemmove_senddate);
			unset($obj->itemmove_isrcv);
			unset($obj->itemmove_rcvby);
			unset($obj->itemmove_rcvdate);



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
					, 'itemmove_id', 'itemmvmodel_id', 'itemmove_isunreferenced', 'itemmove_descr', 'itemmove_dtfr', 'itemmove_dtto', 'fr_site_id', 'fr_dept_id', 'to_site_id', 'to_dept_id', 'inquiry_id', 'orderout_id', 'unit_id', 'dept_id', 'itemmove_version', 'itemmove_iscommit', 'itemmove_commitby', 'itemmove_commitdate', 'itemmove_issend', 'itemmove_sendby', 'itemmove_senddate', 'itemmove_isrcv', 'itemmove_rcvby', 'itemmove_rcvdate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'itemmvmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmvmodel_id'], $this->db, 'mst_itemmvmodel', 'itemmvmodel_id', 'itemmvmodel_name'),
					'itemmove_dtfr' => date("d/m/Y", strtotime($row['itemmove_dtfr'])),
					'itemmove_dtto' => date("d/m/Y", strtotime($row['itemmove_dtto'])),
					'fr_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['fr_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'to_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['fr_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'to_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'to_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'orderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_id'], $this->db, 'trn_orderout', 'orderout_id', 'orderout_descr'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'itemmove_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['itemmove_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemmove_sendby' => \FGTA4\utils\SqlUtility::Lookup($record['itemmove_sendby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'itemmove_rcvby' => \FGTA4\utils\SqlUtility::Lookup($record['itemmove_rcvby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
					return uniqid();
	}

};