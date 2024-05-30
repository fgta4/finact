CREATE TABLE `trn_jurnal` (
	`jurnal_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`periodemo_id` varchar(6) NOT NULL , 
	`jurnal_date` date NOT NULL , 
	`billin_id` varchar(14)  , 
	`ap_jurnal_id` varchar(14) NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`partner_id` varchar(30)  , 
	`jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnalsource_id` varchar(10) NOT NULL , 
	`jurnal_version` int(4) NOT NULL DEFAULT 0, 
	`jurnal_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_commitby` varchar(14)  , 
	`jurnal_commitdate` datetime  , 
	`jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_postby` varchar(14)  , 
	`jurnal_postdate` datetime  , 
	`jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';

ALTER TABLE `trn_jurnal` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurnal` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD KEY `jurnaltype_id` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD KEY `jurnalsource_id` (`jurnalsource_id`);

ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnaltype` FOREIGN KEY (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnalsource` FOREIGN KEY (`jurnalsource_id`) REFERENCES `mst_jurnalsource` (`jurnalsource_id`);





CREATE TABLE `trn_jurnaldetil` (
	`jurnaldetil_id` varchar(14) NOT NULL , 
	`billin_id` varchar(14)  , 
	`ap_jurnal_id` varchar(14) NOT NULL , 
	`jurnaldetil_descr` varchar(255) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_outstanding_frg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_outstanding_idr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_id_ref` varchar(14)  , 
	`jurnaldetil_dk` varchar(1) NOT NULL DEFAULT D, 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnaldetil` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





CREATE TABLE `trn_jurnalreferece` (
	`jurnalreferece_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnalreferece_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnalreferece` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnalreferece` ADD CONSTRAINT `fk_trn_jurnalreferece_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





CREATE TABLE `trn_jurnalresponse` (
	`jurnalresponse_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnalresponse_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnalresponse` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnalresponse` ADD CONSTRAINT `fk_trn_jurnalresponse_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





