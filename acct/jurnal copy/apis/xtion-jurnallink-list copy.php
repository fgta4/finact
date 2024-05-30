<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/acct/jurnal/apis/xtion-jurnallink-list.php
 */
$API = new class extends jurnalBase {
	public function execute($options) {
		try {
			$jurnaldetil_id = $options->criteria->jurnaldetil_id;

			/* ambil informasi jurnaldetil */
			$sql = "
				select
					A.jurnal_date,
					B.jurnal_id, B.jurnaldetil_id, B.jurnaldetil_id_ref,
					B.coa_id, B.unit_id, B.dept_id, B.partner_id, B.project_id,
					B.jurnaldetil_validr
				from 
				trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id=A.jurnal_id
				where
					B.jurnaldetil_id = :jurnaldetil_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':jurnaldetil_id'=>$jurnaldetil_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception('jurnal yang akan di link tidak ditemukan');
			}

			$jurnaldetil_id_ref = $row['jurnaldetil_id_ref'];
			if ($jurnaldetil_id_ref!=null) {
				throw new \Exception('jurnal sudah di link');
			}


			$jurnal_date = $row['jurnal_date'];
			$coa_id = $row['coa_id'];
			$unit_id = $row['unit_id'];
			$dept_id = $row['dept_id'];
			$partner_id = $row['partner_id'];
			$project_id = $row['project_id'];
			$jurnaldetil_validr = (float)$row['jurnaldetil_validr'];			


			$param_unit = $unit_id==null ? 'B.unit_id is :unit_id' : 'B.unit_id = :unit_id';
			$param_dept = $dept_id==null ? 'B.dept_id is :dept_id' : 'B.dept_id = :dept_id';
			$param_partner = $partner_id==null ? 'B.partner_id is :partner_id' : 'B.partner_id = :partner_id';
			$param_project = $project_id==null ? 'B.project_id is :project_id' : 'B.project_id = :project_id';

			$sqllink = "
				select 
					  AX.jurnal_id, AX.jurnaldetil_id, AX.jurnal_date, AX.jurnaldetil_descr
					, AX.coa_id, AX.unit_id, AX.dept_id, AX.partner_id, AX.project_id
					, AX.jurnaldetil_valfrg, AX.jurnaldetil_valfrgrate, AX.jurnaldetil_validr, AX.curr_id
					, BX.jurnaldetil_id_ref 
				from (
					select 
					B.jurnal_id, B.jurnaldetil_id, A.jurnal_date, B.jurnaldetil_descr
					, B.coa_id, B.unit_id, B.dept_id, B.partner_id, B.project_id
					, B.jurnaldetil_valfrg, B.jurnaldetil_valfrgrate, B.jurnaldetil_validr, B.curr_id
					from 
					trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id=A.jurnal_id 
					where
						B.coa_id = :coa_id
					and $param_unit
					and $param_dept
					and $param_partner
					and $param_project
					and A.jurnal_date <= :jurnal_date
					and abs(B.jurnaldetil_validr) <= abs(:jurnaldetil_validr)
					and abs(B.jurnaldetil_validr)/B.jurnaldetil_validr <> abs(:jurnaldetil_validr)/:jurnaldetil_validr
				) AX left join trn_jurnaldetil BX on BX.jurnaldetil_id_ref = AX.jurnaldetil_id
				where 
				BX.jurnaldetil_id_ref is null;
			";
			$stmtlink = $this->db->prepare($sqllink);
			
			
			$stmtlink->execute([
				':coa_id' => $coa_id,
				':unit_id' => $unit_id,
				':dept_id' => $dept_id,
				':partner_id' => $partner_id,
				':project_id' => $project_id,
				':jurnal_date' => $jurnal_date,
				':jurnaldetil_validr' => $jurnaldetil_validr
			]);
			

			$rows = $stmtlink->fetchall();

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, $record);
			}

			return (object)[
				'success' => true,
				'records' => $records
			];			

		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};


