<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * finact/procurement/orderout/apis/items-delete.php
 *
 * ============
 * Detil-Delete
 * ============
 * Menghapus satu baris data/record berdasarkan PrimaryKey
 * pada tabel items orderout (trn_orderout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 01/11/2023
 */
$API = new class extends orderoutBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_orderoutitem';
		$primarykey = 'orderoutitem_id';

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\orderout_itemsHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new orderout_itemsHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$key->{$primarykey} = $data->{$primarykey};

			if (method_exists(get_class($hnd), 'PreCheckDelete')) {
				// PreCheckDelete($data, &$key, &$options)
				$hnd->PreCheckDelete($data, $key, $options);
			}


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLDelete($tablename, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				$header_table = 'trn_orderout';
				$header_primarykey = 'orderout_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $data->{$header_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $key->{$primarykey}, 'DELETE', $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $data->{$header_primarykey}, 'DELETE_DETIL', $userdata->username, (object)[]);

				$this->db->commit();

				$result->success = true;
			} catch (\Exception $ex) {
				$result->success = false;
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};