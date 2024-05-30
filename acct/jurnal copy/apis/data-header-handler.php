<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . "/core/sequencer.php";
use \FGTA4\utils\Sequencer;
use \FGTA4\utils\SqlUtility;

class jurnal_headerHandler extends WebAPI  {

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['jurnal_iscommit'] = " A.jurnal_iscommit = :jurnal_iscommit"; 
		$criteriaValues['jurnal_ispost'] = " A.jurnal_ispost = :jurnal_ispost"; 
		$criteriaValues['jurnal_isclose'] = " A.jurnal_isclose = :jurnal_isclose"; 
	}

	public function SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		$sqlFieldList['jurnaldetil_validr'] = '(select sum(jurnaldetil_validr) from trn_jurnaldetil where jurnal_id = A.jurnal_id)';
		$sqlFieldList['jurnaldetil_rowcount'] = '(select count(jurnaldetil_id) from trn_jurnaldetil where jurnal_id = A.jurnal_id)';

		$sqlFieldList['jurnal_islinked'] = "(
			select count(jurnaldetil_id) from trn_jurnaldetil where jurnal_id = A.jurnal_id and jurnaldetil_id_ref is not null
		)";
		
		$sqlFieldList['jurnal_isresponded'] = "(
			select 
			count(F.jurnaldetil_id)
			from 
			trn_jurnaldetil F inner join trn_jurnaldetil G on G.jurnaldetil_id_ref = F.jurnaldetil_id 
			where 
			F.jurnal_id = A.jurnal_id
		)";
		
	}

	public function DataListLooping(array &$record) : void {
		$record['jurnaldetil_validr'] = (float)$record['jurnaldetil_validr'];
		$record['jurnaldetil_rowcount'] = (int)$record['jurnaldetil_rowcount'];
	}

	// Incremental tahunan based on unit_id
	public function CreateNewId(object $obj) : string {
		try {
			$jurnaltype_id = $obj->jurnaltype_id;

			$sql = "select * from mst_jurnaltype where jurnaltype_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$jurnaltype_id]);
			$row = $stmt->fetch();

			$jurnaltype_prefix = $row['jurnaltype_prefix'];

			$seqname = $jurnaltype_prefix;
			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 5, '0', STR_PAD_LEFT);
			return $id;	
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function DataSaving(object &$obj, object &$key) {
		if ($obj->coa_id=='--NULL--') {
			unset($obj->coa_id);
		}
	}

	public function DataOpen(array &$record) : void {
		$jurnal_isindependentsetting = $record['jurnal_isindependentsetting'];
		if ($jurnal_isindependentsetting!=1) {
			$jurnaltype_id = $record['jurnaltype_id'];
			$jurnaltype = SqlUtility::LookupRow($jurnaltype_id, $this->db, 'mst_jurnaltype', 'jurnaltype_id');
			$record['jurnaltype_ishasduedate'] = $jurnaltype['jurnaltype_ishasduedate'];
			$record['jurnaltype_ishasheadvalue'] = $jurnaltype['jurnaltype_ishasheadvalue'];
			$record['jurnaltype_ishasheadaccount'] = $jurnaltype['jurnaltype_ishasheadaccount'];
			$record['jurnaltype_ishasheadunit'] = $jurnaltype['jurnaltype_ishasheadunit'];
			$record['jurnaltype_ishasheaddept'] = $jurnaltype['jurnaltype_ishasheaddept'];
			$record['jurnaltype_ishasheadpartner'] = $jurnaltype['jurnaltype_ishasheadpartner'];
			$record['jurnaltype_ishasdetunit'] = $jurnaltype['jurnaltype_ishasdetunit'];
			$record['jurnaltype_ishasdetdept'] = $jurnaltype['jurnaltype_ishasdetdept'];
			$record['jurnaltype_ishasdetpartner'] = $jurnaltype['jurnaltype_ishasdetpartner'];
		}


		/* ambil total value */
		$jurnal_id = $record['jurnal_id'];
		$record['jurnaldetil_validr']  = $this->getJurnalDetilTotal($jurnal_id);
		
	}

	public function DataSavedSuccess(object &$result) : void {
		$jurnal_id = $result->dataresponse->jurnal_id;

		$jurnaltype_col = $result->dataresponse->jurnaltype_col;
		$addDetil = false;
		$factor = 1;
		if ($jurnaltype_col=='K') {
			$addDetil = true;
			$ord = -1;
			$factor = -1;
		} else if ($jurnaltype_col=='D') {
			$addDetil = true;
			$ord = 1;
			$factor = 1;
		}


		if ($addDetil) {

			$obj = new \stdClass;
			$obj->jurnaldetil_descr = $result->dataresponse->jurnal_descr;
			$obj->jurnaldetil_valfrg = $result->dataresponse->jurnal_valfrg * $factor;
			$obj->curr_id = $result->dataresponse->curr_id;
			$obj->jurnaldetil_valfrgrate = $result->dataresponse->jurnal_valfrgrate;
			$obj->jurnaldetil_validr = $result->dataresponse->jurnal_validr * $factor;
			$obj->coa_id = $result->dataresponse->coa_id;
			$obj->unit_id = $result->dataresponse->unit_id;
			$obj->dept_id = $result->dataresponse->dept_id;
			$obj->partner_id = $result->dataresponse->partner_id;

			$key = new \stdClass;

			// cek dulu apakah sudah ada baris detil berkaitan dengan jurnal ini
			$sql = "select * from trn_jurnaldetil where jurnal_id = :jurnal_id and jurnaldetil_head=1";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$jurnal_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				$obj->jurnaldetil_id = uniqid();
				$obj->jurnaldetil_head = 1;
				$obj->jurnal_id = $result->dataresponse->jurnal_id;
				$obj->_createby = $result->username;
				$obj->_createdate = $result->dataresponse->_createdate;
				$cmd = SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
			} else {
				$obj->jurnaldetil_id = $row['jurnaldetil_id'];
				$obj->_modifyby = $result->username;
				$obj->_modifydate = $result->dataresponse->_modifydate;
				$key->jurnaldetil_id = $obj->jurnaldetil_id;
				$cmd = SqlUtility::CreateSQLUpdate("trn_jurnaldetil", $obj, $key);
			}

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

		}



	}

	public function XtionCommitting(string $id, object &$currentdata) : void {
		try {

			$total = $this->getJurnalDetilTotal($id);
			$count = $this->getJurnalDetilCount($id);

			if ($total!=0) {
				throw new \Exception('Nilai jurnal belum balance');
			}

			if ($count==0) {
				throw new \Exception('Belum ada detil jurnal');
			}

		} catch (\Execption $ex) {
			throw $ex;
		}
	}



	function DocumentDeleting(string $id, array &$tabletodelete) {
		try {
			$sql = "update trn_jurnaldetil set jurnaldetil_head=0 where jurnal_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function getJurnalDetilTotal(string $jurnal_id) : float {
		try {
			$sql = "
				select 
				sum(jurnaldetil_validr) as jurnaldetil_validr
				from trn_jurnaldetil 
				where 
				jurnal_id = :jurnal_id			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$jurnal_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				return 0;
			} else {
				return (float)$row['jurnaldetil_validr'];
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function getJurnalDetilCount(string $jurnal_id) : int {
		try {
			$sql = "
				select 
				count(jurnaldetil_id) as c
				from trn_jurnaldetil 
				where 
				jurnal_id = :jurnal_id			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnal_id'=>$jurnal_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				return 0;
			} else {
				return (int)$row['c'];
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}		
		
		
		