-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_billout`;
-- drop table if exists `trn_billoutdetil`;


CREATE TABLE `trn_billout` (
	`billout_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30)  , 
	`salesorder_id` varchar(10)  , 
	`billout_descr` varchar(255) NOT NULL , 
	`billout_date` date NOT NULL , 
	`billout_datedue` date NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`coa_id` varchar(17)  , 
	`curr_id` varchar(10) NOT NULL , 
	`billout_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billout_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billtype_id` varchar(3) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`billout_version` int(4) NOT NULL DEFAULT 0, 
	`billout_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_commitby` varchar(14)  , 
	`billout_commitdate` datetime  , 
	`billout_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_postby` varchar(14)  , 
	`billout_postdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tagihan Keluar';

ALTER TABLE `trn_billout` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_billout` ADD KEY `salesorder_id` (`salesorder_id`);
ALTER TABLE `trn_billout` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_billout` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_billout` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_billout` ADD KEY `billtype_id` (`billtype_id`);
ALTER TABLE `trn_billout` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_billout` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_trn_salesorder` FOREIGN KEY (`salesorder_id`) REFERENCES `trn_salesorder` (`salesorder_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_billtype` FOREIGN KEY (`billtype_id`) REFERENCES `mst_billtype` (`billtype_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_billoutdetil` (
	`billoutdetil_id` varchar(14) NOT NULL , 
	`billrowtype_id` varchar(1) NOT NULL , 
	`taxtype_id` varchar(10)  , 
	`billoutdetil_descr` varchar(255) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`billoutdetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`itemclass_id` varchar(14) NOT NULL , 
	`coa_id` varchar(17)  , 
	`billoutdetil_validr_ori` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_validr_rev` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_validr_var` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_rev_descr` varchar(255) NOT NULL , 
	`rev_coa_id` varchar(17)  , 
	`periodemo_id` varchar(6) NOT NULL , 
	`billoutdetil_bookdate` date NOT NULL , 
	`billout_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billoutdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Bill out Detil';

ALTER TABLE `trn_billoutdetil` ADD KEY `billrowtype_id` (`billrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `taxtype_id` (`taxtype_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `rev_coa_id` (`rev_coa_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY `billout_id` (`billout_id`);

ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_billrowtype` FOREIGN KEY (`billrowtype_id`) REFERENCES `mst_billrowtype` (`billrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_taxtype` FOREIGN KEY (`taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_coa_2` FOREIGN KEY (`rev_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);





