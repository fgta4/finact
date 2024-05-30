-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_billin`;
-- drop table if exists `trn_billindetil`;
-- drop table if exists `trn_billinpaym`;
-- drop table if exists `trn_billinappr`;


CREATE TABLE `trn_billin` (
	`billin_id` varchar(14) NOT NULL , 
	`billtype_id` varchar(3) NOT NULL , 
	`recv_id` varchar(30)  , 
	`orderout_id` varchar(30)  , 
	`billin_ref` varchar(30)  , 
	`billin_taxcode` varchar(30)  , 
	`billin_descr` varchar(255) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`billin_date` date NOT NULL , 
	`billin_datedue` date NOT NULL , 
	`partner_id` varchar(14) NOT NULL , 
	`partnercontact_id` varchar(30)  , 
	`paymto_upname` varchar(90)  , 
	`paymto_upposition` varchar(90)  , 
	`paymto_upphone` varchar(90)  , 
	`billin_valfrg` decimal(14, 0) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`billin_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billin_validr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ppn_taxtype_id` varchar(10)  , 
	`pph_taxtype_id` varchar(10)  , 
	`paymtype_id` varchar(6) NOT NULL , 
	`paymto_name` varchar(90)  , 
	`partnerbank_id` varchar(30)  , 
	`paymto_bankacc` varchar(90)  , 
	`paymto_bankaccname` varchar(90)  , 
	`paymto_bankname` varchar(90)  , 
	`project_id` varchar(30) NOT NULL , 
	`projecttask_id` varchar(14)  , 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`trxmodel_id` varchar(10)  , 
	`request_dept_id` varchar(30) NOT NULL , 
	`orderout_dept_id` varchar(30) NOT NULL , 
	`process_dept_id` varchar(30)  , 
	`billin_notes` varchar(255)  , 
	`billin_version` int(4) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`billin_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`billin_commitby` varchar(14)  , 
	`billin_commitdate` datetime  , 
	`billin_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`billin_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`billin_approveby` varchar(14)  , 
	`billin_approvedate` datetime  , 
	`billin_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`billin_declineby` varchar(14)  , 
	`billin_declinedate` datetime  , 
	`billin_isveryfied` tinyint(1) NOT NULL DEFAULT 0, 
	`billin_verifyby` varchar(14)  , 
	`billin_verifydate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billin_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tagihan Masuk';

ALTER TABLE `trn_billin` ADD KEY `billtype_id` (`billtype_id`);
ALTER TABLE `trn_billin` ADD KEY `recv_id` (`recv_id`);
ALTER TABLE `trn_billin` ADD KEY `orderout_id` (`orderout_id`);
ALTER TABLE `trn_billin` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_billin` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_billin` ADD KEY `partnercontact_id` (`partnercontact_id`);
ALTER TABLE `trn_billin` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_billin` ADD KEY `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `trn_billin` ADD KEY `pph_taxtype_id` (`pph_taxtype_id`);
ALTER TABLE `trn_billin` ADD KEY `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_billin` ADD KEY `partnerbank_id` (`partnerbank_id`);
ALTER TABLE `trn_billin` ADD KEY `project_id` (`project_id`);
ALTER TABLE `trn_billin` ADD KEY `projecttask_id` (`projecttask_id`);
ALTER TABLE `trn_billin` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_billin` ADD KEY `projbudgettask_id` (`projbudgettask_id`);
ALTER TABLE `trn_billin` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_billin` ADD KEY `request_dept_id` (`request_dept_id`);
ALTER TABLE `trn_billin` ADD KEY `orderout_dept_id` (`orderout_dept_id`);
ALTER TABLE `trn_billin` ADD KEY `process_dept_id` (`process_dept_id`);
ALTER TABLE `trn_billin` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_billtype` FOREIGN KEY (`billtype_id`) REFERENCES `mst_billtype` (`billtype_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_trn_recv` FOREIGN KEY (`recv_id`) REFERENCES `trn_recv` (`recv_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_trn_orderout` FOREIGN KEY (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_partnercontact` FOREIGN KEY (`partnercontact_id`) REFERENCES `mst_partnercontact` (`partnercontact_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_taxtype` FOREIGN KEY (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_taxtype_2` FOREIGN KEY (`pph_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_paymtype` FOREIGN KEY (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_partnerbank` FOREIGN KEY (`partnerbank_id`) REFERENCES `mst_partnerbank` (`partnerbank_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_projbudgettask` FOREIGN KEY (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_dept` FOREIGN KEY (`request_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_dept_2` FOREIGN KEY (`orderout_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_dept_3` FOREIGN KEY (`process_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_billindetil` (
	`billindetil_id` varchar(14) NOT NULL , 
	`rowitem_id` varchar(5) NOT NULL , 
	`taxtype_id` varchar(10)  , 
	`itemclass_id` varchar(14)  , 
	`projbudgetdet_id` varchar(30)  , 
	`billindetil_descr` varchar(90) NOT NULL , 
	`billindetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`billindetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billindetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`billin_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billindetil_id`)
) 
ENGINE=InnoDB
COMMENT='Bill in Detil';

ALTER TABLE `trn_billindetil` ADD KEY `rowitem_id` (`rowitem_id`);
ALTER TABLE `trn_billindetil` ADD KEY `taxtype_id` (`taxtype_id`);
ALTER TABLE `trn_billindetil` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_billindetil` ADD KEY `projbudgetdet_id` (`projbudgetdet_id`);
ALTER TABLE `trn_billindetil` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_billindetil` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_billindetil` ADD KEY `projbudgettask_id` (`projbudgettask_id`);
ALTER TABLE `trn_billindetil` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_billindetil` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_billindetil` ADD KEY `billin_id` (`billin_id`);

ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_rowtype` FOREIGN KEY (`rowitem_id`) REFERENCES `mst_rowtype` (`rowtype_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_taxtype` FOREIGN KEY (`taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_projbudgetdet` FOREIGN KEY (`projbudgetdet_id`) REFERENCES `mst_projbudgetdet` (`projbudgetdet_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_projbudgettask` FOREIGN KEY (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billindetil` ADD CONSTRAINT `fk_trn_billindetil_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);





CREATE TABLE `trn_billinpaym` (
	`billinpaym_id` varchar(14) NOT NULL , 
	`billinpaym_date` date NOT NULL , 
	`billinpaym_descr` varchar(255) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`billinpaym_frgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billinpaym_itemfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_itemidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billin_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billinpaym_id`)
) 
ENGINE=InnoDB
COMMENT='Jadwal pembayaran tagihan';

ALTER TABLE `trn_billinpaym` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_billinpaym` ADD KEY `billin_id` (`billin_id`);

ALTER TABLE `trn_billinpaym` ADD CONSTRAINT `fk_trn_billinpaym_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billinpaym` ADD CONSTRAINT `fk_trn_billinpaym_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);





CREATE TABLE `trn_billinappr` (
	`billinappr_id` varchar(14) NOT NULL , 
	`billinappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`billinappr_by` varchar(14)  , 
	`billinappr_date` datetime  , 
	`billin_version` int(4) NOT NULL DEFAULT 0, 
	`billinappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`billinappr_declinedby` varchar(14)  , 
	`billinappr_declineddate` datetime  , 
	`billinappr_notes` varchar(255)  , 
	`billin_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `billin_auth_id` (`billin_id`, `auth_id`),
	PRIMARY KEY (`billinappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_billinappr` ADD KEY `billin_id` (`billin_id`);

ALTER TABLE `trn_billinappr` ADD CONSTRAINT `fk_trn_billinappr_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);





