<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;


$API = new class extends WebAPI {
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
	
	public function execute($data, $options) {
		$tablename = 'mst_periodemo';
		$primarykey = 'periodemo_id';
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
			if (!($obj->periodemo_month > 0 && $obj->periodemo_month <13 )){
				throw new \Exception ('invalid month');
			}
			$startPeriod = '01'.'/'.$obj->periodemo_month.'/'.$obj->periodemo_year;          
			$obj->periodemo_dtstart = \DateTime::createFromFormat('d/m/Y', $startPeriod)->format('Y-m-d');
			$obj->periodemo_dtend = \DateTime::createFromFormat('d/m/Y', $startPeriod)->format('Y-m-t');
			$obj->periodemo_name = strtoupper($this->NamaBulan($this->ZeroFill($obj->periodemo_month,2))).' '.$obj->periodemo_year;

			unset($obj->periodemo_closeby);
			unset($obj->periodemo_closedate);
			unset($obj->periodemo_isclosed);

			$assigned_periodemo_id = $this->NewId($obj->periodemo_year, $obj->periodemo_month);


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $assigned_periodemo_id; //$this->NewId($obj->periodemo_year, $obj->periodemo_month);
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

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey, 'periodemo_id', 'periodemo_name', 'periodemo_year', 'periodemo_month', 'periodemo_dtstart', 'periodemo_dtend', 'periodemo_isclosed', 'periodemo_closeby', 'periodemo_closedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'periodemo_dtstart' => date("d/m/Y", strtotime($row['periodemo_dtstart'])),
				'periodemo_dtend' => date("d/m/Y", strtotime($row['periodemo_dtend'])),
				'periodemo_closedate' => date("d/m/Y", strtotime($row['periodemo_closedate'])),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($year, $month) {            
		$mstr = $this->ZeroFill($month, 2);
		$period = $year.$mstr;
		return $period;
	}

	function ZeroFill($value, $fillfactor){        
		$str = str_pad($value, $fillfactor, '0',  STR_PAD_LEFT);
		return $str;
	}

	function NamaBulan($value){
		$bulan = array( '01'=>'Januari', '02'=>'Februari', '03'=>'Maret', '04'=>'April', '05'=>'Mei', '06'=>'Juni', '07'=>'Juli', '08'=>'Agustus', '09'=>'September', '10'=>'Oktober', '11'=>'November','12'=>'Desember');
		return $str = $bulan[$value];
	}
  
};