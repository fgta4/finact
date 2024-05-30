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
 * finact/fin/billoutupload/apis/xtion-paste.php
 *
 * ======================
 * Paste from SpreadSheet
 * ======================
 * Untuk keperluan upload invoice dari spreadsheet,
 * dengan suatu pattern yang sudah ditentukan
 * Order & Customer Name & Invoice & Brand & Advertiser & Inv Date & Due Date & Amount
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 19 April 2021
 */
$API = new class extends billoutuploadBase {

	public function execute($data) {
		$userdata = $this->auth->session_get_user();
		

		$objBilloutHeadTemplate = (object)[
			'billout_id' => '',
			'billout_descr' => '',
			'billout_date' => '',
			'billout_datedue' => '',
			'billtype_id' => 'BIL',
			'coa_id' => '1051000',  // unbill
			'curr_id' => 'IDR',
			'dept_id' => 'SALES',
			'billout_valfrg' => 0,
			'billout_valfrgrate' => 1,
			'billout_validr' =>  0,			
			'partner_id' => '',
			'trxmodel_id' => 'SAL',
			'doc_id' => 'BILLOUT',
			'_createby' => $userdata->username,
			'_createdate' => date("Y-m-d H:i:s")
 		];
		$cmd_head = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_billout', $objBilloutHeadTemplate);		 
		$stmt_head = $this->db->prepare($cmd_head->sql);

		$objBilloutItemsTemplate = (object)[
			'billoutdetil_id' => '',
			'billrowtype_id' => '',
			'taxtype_id' => null,
			'billoutdetil_descr' => '',
			'curr_id' => 'IDR',
			'billoutdetil_valfrg' => 0,
			'billoutdetil_valfrgrate' => 1,
			'billoutdetil_validr' =>  0,
			'itemclass_id' => 'ADS',
			'coa_id' => '',
			'billout_id' => '',
			'_createby' => $userdata->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];
		$cmd_detil = \FGTA4\utils\SqlUtility::CreateSQLInsert('trn_billoutdetil', $objBilloutItemsTemplate);		 
		$stmt_detil = $this->db->prepare($cmd_detil->sql);

		$coa_piutang = '1051001';
		$coa_piutang_ppn = '1051011';
		$coa_piutang_pph = '1051012';
		$coa_unbill = '1051000';

		$taxtype_pph = 'PPH2302';
		$taxtype_ppn = 'PPN';

		try {
			foreach ($data as $fields) {

				$billout_id = $fields->invoice;
				$this->db->query("delete from trn_billoutdetil where billout_id = '$billout_id' ");
				$this->db->query("delete from trn_billout where billout_id = '$billout_id' ");

				$fields->brand_id = $this->getBrandId($fields->brand);
				$fields->agency_id = $this->getAgencyId($fields->agency);
				$fields->advertiser_id = $this->getAdvertiser($fields->advertiser);
				
				$descr = "Biaya Iklan {$fields->brand} - {$fields->advertiser}";


				$amount = (float)$fields->amount; // 220
				$amount_sales_nett = $amount/1.1; // 200
				$amount_ppn = $amount -  $amount_sales_nett;
				$amount_pph = $amount_sales_nett * (2/100);
				$amount_piutang = $amount_sales_nett - $amount_pph;



				
				$cmd_head->params[':billout_id'] = $fields->invoice;
				$cmd_head->params[':billout_descr'] = $descr;
				$cmd_head->params[':billout_date'] = $fields->invoice_date;
				$cmd_head->params[':billout_datedue'] = $fields->due_date;
				$cmd_head->params[':partner_id'] = $fields->agency_id;
				$cmd_head->params[':billout_valfrg'] = $amount;
				$cmd_head->params[':billout_validr'] = $amount;
				$stmt_head->execute($cmd_head->params);

				$cmd_detil->params[':billoutdetil_id'] = uniqid();
				$cmd_detil->params[':billout_id'] = $fields->invoice;
				$cmd_detil->params[':billrowtype_id'] = 'I';
				$cmd_detil->params[':billoutdetil_descr'] = $descr;
				$cmd_detil->params[':billoutdetil_valfrg'] = $amount_piutang;
				$cmd_detil->params[':billoutdetil_validr'] = $amount_piutang;
				$cmd_detil->params[':coa_id'] = $coa_piutang;
				$stmt_detil->execute($cmd_detil->params);
				

				$cmd_detil->params[':billoutdetil_id'] = uniqid();
				$cmd_detil->params[':billout_id'] = $fields->invoice;
				$cmd_detil->params[':billrowtype_id'] = 'T';
				$cmd_detil->params[':taxtype_id'] = $taxtype_pph;
				$cmd_detil->params[':billoutdetil_descr'] = "PPh " . $descr;
				$cmd_detil->params[':billoutdetil_valfrg'] = $amount_pph;
				$cmd_detil->params[':billoutdetil_validr'] = $amount_pph;
				$cmd_detil->params[':coa_id'] = $coa_piutang_pph;
				$stmt_detil->execute($cmd_detil->params);


				$cmd_detil->params[':billoutdetil_id'] = uniqid();
				$cmd_detil->params[':billout_id'] = $fields->invoice;
				$cmd_detil->params[':billrowtype_id'] = 'T';
				$cmd_detil->params[':taxtype_id'] = $taxtype_ppn;
				$cmd_detil->params[':billoutdetil_descr'] = "PPN " . $descr;
				$cmd_detil->params[':billoutdetil_valfrg'] = $amount_ppn;
				$cmd_detil->params[':billoutdetil_validr'] = $amount_ppn;
				$cmd_detil->params[':coa_id'] = $coa_piutang_ppn;
				$stmt_detil->execute($cmd_detil->params);
			}


			foreach ($data as $fields) {
				$billout_id = $fields->invoice;
				$this->Commit($billout_id);
				$this->Post($billout_id);
			}
			

		} catch (\Exception $ex) {
			throw $ex;
		}

	}


	public function Commit($billout_id) {
		require __DIR__ . '/../../billout/apis/xtion-post.php';
		$API->reqinfo = $this->reqinfo;
		$API->auth = $this->auth;
		$result = $API->execute($billout_id, (object)[]);
	}

	public function Post($billout_id) {
		require __DIR__ . '/../../billout/apis/xtion-commit.php';
		$API->reqinfo = $this->reqinfo;
		$API->auth = $this->auth;
		$result = $API->execute($billout_id, (object)[]);
	}


	public function getBrandId($brandname) {
		$userdata = $this->auth->session_get_user();

		try {
			$sql = "select brand_id from mst_brand where brand_name=:brand_name";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':brand_name'=>$brandname]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			
			if ($row!=null) {
				return $row['brand_id'];
			} else {
				// debug::log("brand $brandname belum ada");
				$obj = (object)[
					"brand_id" => uniqid(),
					"brand_name" => $brandname,
					"_createby" => $userdata->username,
					"_createdate" => date("Y-m-d H:i:s")
				];
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_brand", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				return $obj->brand_id;
			}
		} catch (\Exception $ex) {
			throw $ex;
		}			
	}

	public function getAgencyId($agencyname) {
		$userdata = $this->auth->session_get_user();
		$partnerorg_id = 'PERSH';
		$partnertype_id = 'AGENCY';
		$partner_country = 'ID';

		try {
			$sql = "select partner_id from mst_partner where partner_name=:partner_name";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':partner_name'=>$agencyname]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			
			if ($row!=null) {
				return $row['partner_id'];
			} else {
				// debug::log("agency $agencyname belum ada di data partner");
				$obj = (object)[
					"partner_id" => uniqid(),
					"partner_name" => $agencyname,
					"partner_addressline1" => "",
					"partner_addressline2" => "",
					"partner_postcode" => "",
					"partner_city" => "",
					"partner_country" => $partner_country,
					"partner_mobilephone" => "",
					"partner_phone" => "",
					"partner_email" => "",
					"partnertype_id" => $partnertype_id,
					"partnerorg_id" => $partnerorg_id,
					"_createby" => $userdata->username,
					"_createdate" => date("Y-m-d H:i:s")
				];
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_partner", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				return $obj->partner_id;
			}

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	public function getAdvertiser($advertisername) {
		$userdata = $this->auth->session_get_user();
		$partnerorg_id = 'PERSH';
		$partnertype_id = 'ADVERTISER';
		$partner_country = 'ID';

		try {
			$sql = "select partner_id from mst_partner where partner_name=:partner_name";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':partner_name'=>$advertisername]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			
			if ($row!=null) {
				return $row['partner_id'];
			} else {
				// debug::log("advertiser $advertisername belum ada di data partner");
				$obj = (object)[
					"partner_id" => uniqid(),
					"partner_name" => $advertisername,
					"partner_addressline1" => "",
					"partner_addressline2" => "",
					"partner_postcode" => "",
					"partner_city" => "",
					"partner_country" => $partner_country,
					"partner_mobilephone" => "",
					"partner_phone" => "",
					"partner_email" => "",
					"partnertype_id" => $partnertype_id,
					"partnerorg_id" => $partnerorg_id,
					"_createby" => $userdata->username,
					"_createdate" => date("Y-m-d H:i:s")
				];
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_partner", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				return $obj->partner_id;
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};