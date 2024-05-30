-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_orderintype`;
-- drop table if exists `mst_orderintyperef`;


CREATE TABLE `mst_orderintype` (
	`orderintype_id` varchar(10) NOT NULL , 
	`orderintype_name` varchar(30)  , 
	`orderintype_descr` varchar(90)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`orderintype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`ppn_taxtype_id` varchar(10)  , 
	`ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_include` tinyint(1) NOT NULL DEFAULT 0, 
	`pph_taxtype_id` varchar(10)  , 
	`pph_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`arunbill_coa_id` varchar(17) NOT NULL , 
	`ar_coa_id` varchar(17) NOT NULL , 
	`ar_coa_isbypartnertype` tinyint(1) NOT NULL DEFAULT 0, 
	`dp_coa_id` varchar(17) NOT NULL , 
	`sales_coa_id` varchar(17) NOT NULL , 
	`salesdisc_coa_id` varchar(17)  , 
	`ppn_coa_id` varchar(17)  , 
	`ppnsubsidi_coa_id` varchar(17)  , 
	`pph_coa_id` varchar(17)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderintype_name` (`orderintype_name`),
	PRIMARY KEY (`orderintype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe-tipe Sales Order';

ALTER TABLE `mst_orderintype` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_orderintype` ADD KEY `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `mst_orderintype` ADD KEY `pph_taxtype_id` (`pph_taxtype_id`);
ALTER TABLE `mst_orderintype` ADD KEY `arunbill_coa_id` (`arunbill_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `ar_coa_id` (`ar_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `dp_coa_id` (`dp_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `sales_coa_id` (`sales_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `salesdisc_coa_id` (`salesdisc_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `ppn_coa_id` (`ppn_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `ppnsubsidi_coa_id` (`ppnsubsidi_coa_id`);
ALTER TABLE `mst_orderintype` ADD KEY `pph_coa_id` (`pph_coa_id`);

ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_taxtype` FOREIGN KEY (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_taxtype_2` FOREIGN KEY (`pph_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa` FOREIGN KEY (`arunbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_2` FOREIGN KEY (`ar_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_3` FOREIGN KEY (`dp_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_4` FOREIGN KEY (`sales_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_5` FOREIGN KEY (`salesdisc_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_6` FOREIGN KEY (`ppn_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_7` FOREIGN KEY (`ppnsubsidi_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_orderintype` ADD CONSTRAINT `fk_mst_orderintype_mst_coa_8` FOREIGN KEY (`pph_coa_id`) REFERENCES `mst_coa` (`coa_id`);





CREATE TABLE `mst_orderintyperef` (
	`orderintyperef_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`orderintyperef_code` varchar(30) NOT NULL , 
	`orderintype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderintyperef_pair` (`orderintype_id`, `interface_id`, `orderintyperef_code`),
	UNIQUE KEY `orderintyperef_code` (`interface_id`, `orderintyperef_code`),
	PRIMARY KEY (`orderintyperef_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi Tipe Orderin untuk keperluan interfacing dengan system lain';

ALTER TABLE `mst_orderintyperef` ADD KEY `interface_id` (`interface_id`);
ALTER TABLE `mst_orderintyperef` ADD KEY `orderintype_id` (`orderintype_id`);

ALTER TABLE `mst_orderintyperef` ADD CONSTRAINT `fk_mst_orderintyperef_mst_interface` FOREIGN KEY (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `mst_orderintyperef` ADD CONSTRAINT `fk_mst_orderintyperef_mst_orderintype` FOREIGN KEY (`orderintype_id`) REFERENCES `mst_orderintype` (`orderintype_id`);





