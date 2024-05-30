<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	
require_once __ROOT_DIR.'/core/sqlutil.php';

define ('DEF_USER', '5effbb0a0f7d1');


console::class(new class($args) extends clibase {
	function __construct() {
		$this->debugoutput = false;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}

	function execute() {
		$filename = 'datainvoice_oss.csv';
		$this->ProcessData($filename);
	}

	function ProcessData($filename) {
		try {
			$fp = fopen(__DIR__.'/'.$filename, "r");
			while (!feof($fp)) {
				$line = fgets($fp, 255);
				if ($line=='') continue;
				$fields = explode("|", $line);
				$this->ProcessLine($fields);
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function ProcessLine($fields) {
		$data = (object)[
			'customer_id' => trim($fields[0]),
			'customer_name' => trim($fields[1]),
			'invoice_id' => trim($fields[3]),
			'invoice_descr' => trim($fields[3]),
			'invoice_date' => trim($fields[4]),
			'brand_name' => trim($fields[5]),
			'advertiser_name' => trim($fields[6]),
			'value' => trim($fields[7]),
			'coa_id' => '1051000',
			'sales_coa_id' => '1002101',
			'dept_id' => 'COLL',
			
		];
		
		$data->invoice_descr = $data->invoice_id . ' ' . $data->brand_name;

		try {
			
			$data->customer_id = $this->CreatePartner($data->customer_name, $data->customer_id, 'AGENCY');
			$data->advertiser_id = $this->CreatePartner($data->advertiser_name, null, 'ADVERTISER');
			$data->brand_id = $this->CreateBrand($data->brand_name, null);
			$data->partner_id = $data->customer_id;

			print_r($data);

			$this->CreateJurnal($data);

			$this->CreateSaldo('202102', '2020-02-28', $data, false);
			$this->CreateSaldo('202103', '2020-03-01', $data);

			$this->CreateSaldo('202101', '2020-01-31', $data, false);
			$this->CreateSaldo('202102', '2020-02-01', $data);

			$this->db->query("delete from trn_jurnalsaldo where jurnal_date>'2021-01-31' and periodemo_id= '202101' ");
			$this->db->query("delete from trn_jurnalsaldo where jurnal_date>'2021-01-31' and periodemo_id= '202102' ");


		} catch (\Exception $ex) {
			throw $ex;
		}


	}




	function CreateSaldo($periodemo_id, $saldo_date, $data, $issaldoawal=true) {
		try {
			$jurnal_id = $data->invoice_id;
			$this->db->query("delete from trn_jurnalsaldo where jurnal_id = '$jurnal_id' and periodemo_id= '$periodemo_id' ");

			if ($issaldoawal) {
				$obj = (object)[
					'jurnalsaldo_id' => uniqid(),
					'coa_id' => $data->coa_id,
					'dept_id' => $data->dept_id,
					'partner_id' => $data->partner_id,
					'jurnalsaldo_date' => $saldo_date,
					'jurnalsaldo_awal' => $data->value,
					'jurnalsaldo_mutasi' => 0,
					'jurnalsaldo_akhir' => 0,
					'periodemo_id' => $periodemo_id,
					'jurnal_date' => $data->invoice_date,
					'jurnal_duedate' => $data->invoice_date,
					'jurnal_id' => $data->invoice_id,
					'_createby' => DEF_USER
				];
			} else {
				$obj = (object)[
					'jurnalsaldo_id' => uniqid(),
					'coa_id' => $data->coa_id,
					'dept_id' => $data->dept_id,
					'partner_id' => $data->partner_id,
					'jurnalsaldo_date' => $saldo_date,
					'jurnalsaldo_awal' => 0,
					'jurnalsaldo_mutasi' => 0,
					'jurnalsaldo_akhir' => $data->value,
					'periodemo_id' => $periodemo_id,
					'jurnal_date' => $data->invoice_date,
					'jurnal_duedate' => $data->invoice_date,
					'jurnal_id' => $data->invoice_id,
					'_createby' => DEF_USER
				];
			}

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnalsaldo', $obj);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function CreateBillOut($data) {
		try {
			$billout_id = $data->invoice_id;

			$this->db->query("delete from trn_billouttax where billout_id = '$billout_id'");
			$this->db->query("delete from trn_billoutdetil where billout_id = '$billout_id'");
			$this->db->query("delete from trn_billout where billout_id = '$billout_id'");
		} catch (\Exception $ex) {
			throw new $ex;
		}
	}

	function CreateJurnal($data) {
		try {
			$jurnal_id = $data->invoice_id;
			$jurnal_date = $data->invoice_date;
			$jurnal_datedue = $data->invoice_date;

			$objdt = \DateTime::createFromFormat('Y-m-d', $jurnal_date);
			$periodemo_id = $objdt->format('Ym');

			$this->db->query("delete from trn_jurnaldetil where jurnal_id = '$jurnal_id'");
			$this->db->query("delete from trn_jurnal where jurnal_id = '$jurnal_id'");

			$obj = (object)[
				'jurnal_id' => $jurnal_id,
				'jurnal_date' => $jurnal_date,
				'jurnal_datedue' => $jurnal_date,
				'jurnal_descr' => $data->invoice_descr ,
				'jurnal_iscommit' => 1,
				'jurnal_commitby' => DEF_USER,
				'jurnal_commitdate' => date('Y-m-d'),
				'jurnal_ispost' => 1,
				'jurnal_postby' => DEF_USER,
				'jurnal_postdate' => date('Y-m-d'),
				'periodemo_id' => $periodemo_id,
				'curr_id' => 'IDR',
				'jurnaltype_id' => 'MANUAL',
				'jurnalsource_id' => 'MANUAL',
				'_createby' => DEF_USER
			];

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnal', $obj);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);


			// Detil Debet
			$obj = (object)[
				'jurnal_id' => $jurnal_id,
				'jurnaldetil_id' => uniqid(),
				'jurnaldetil_descr' => $data->invoice_descr ,
				'coa_id' => $data->coa_id,
				'dept_id' => $data->dept_id,
				'partner_id' => $data->partner_id,
				'curr_id' => 'IDR',
				'jurnaldetil_valfrg' => $data->value,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' => $data->value,
				'_createby' => DEF_USER
			];
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnaldetil', $obj);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);

			// Detil Kredit
			/*
			$obj = (object)[
				'jurnal_id' => $jurnal_id,
				'jurnaldetil_id' => uniqid(),
				'jurnaldetil_descr' => $data->invoice_descr ,
				'coa_id' => $data->sales_coa_id,
				'dept_id' => $data->dept_id,
				'partner_id' => $data->partner_id,
				'curr_id' => 'IDR',
				'jurnaldetil_valfrg' => -$data->value,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' => -$data->value,
				'_createby' => DEF_USER
			];
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_jurnaldetil', $obj);
			$stmt = $this->db->prepare($cmd->sql);	
			$stmt->execute($cmd->params);
			*/
			

		} catch (\Exception $ex) {
			throw new $ex;
		}
	}



	function CreateBrand($brand_name, $brand_id) {
		$brand_name = str_replace("'", "", $brand_name);
		try {
			$sql = "select * from mst_brand where brand_name = '$brand_name' ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			if (!$row) {
				$brand_id  = $brand_id ? $brand_id : uniqid();
				$obj = (object)[
					'brand_id' => $brand_id ? $brand_id : uniqid(),
					'brand_name' => $brand_name,
					'_createby' => DEF_USER
				];
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_brand', $obj);
				$stmt = $this->db->prepare($cmd->sql);	
				$stmt->execute($cmd->params);
			} else {
				$brand_id = $row['brand_id'];
			}
			return $brand_id;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function CreatePartner($partner_name, $partner_id, $partnertype_id) {
		$partner_name = str_replace("'", "", $partner_name);
		try {
			$sql = "select * from mst_partner where partner_name = '$partner_name' ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			if (!$row) {
				$partner_id = $partner_id ? $partner_id : uniqid();
				$obj = (object)[
					'partner_id' => $partner_id ,
					'partner_name' => $partner_name,
					'partner_addressline1' => '',
					'partner_addressline2' => '',
					'partner_postcode' => '',
					'partner_city' => '',
					'partner_country' => 'ID',
					'partner_phone' => '',
					'partner_mobilephone' => '',
					'partner_email' => '',
					'partnerorg_id' => 'PERSH',
					'partnertype_id' => $partnertype_id,
					'_createby' => DEF_USER
				];

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_partner', $obj);
				$stmt = $this->db->prepare($cmd->sql);	
				$stmt->execute($cmd->params);

			} else {
				$partner_id = $row['partner_id'];
			}

			// echo "\r\n========================\r\n";
			// print_r($partner_id);
			// echo "\r\n========================\r\n";
			return $partner_id;
		} catch (\Excetion $ex) {
			
			throw $ex;
		}
	}
});



