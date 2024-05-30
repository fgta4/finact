<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';



use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends periodemoBase {

	public function execute($id, $param) {
		$tablename = 'mst_periodemo';
		$primarykey = 'periodemo_id';
		$userdata = $this->auth->session_get_user();

		try {

			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();
			
			
			try {
				
				// close periode
				$sql = "call periodemo_close(1, :id, :username)";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					":id" => $id,
					":username" => $currentdata->user->username
				]);


				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'CLOSE', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'dataresponse' => $dataresponse
				];
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



};


