-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_tjurnalor`;
-- drop table if exists `trn_tjurnalordetil`;


CREATE TABLE IF NOT EXISTS `trn_tjurnalor` (
	`jurnal_id` varchar(14) NOT NULL , 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`jurnal_date` date NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`partner_id` varchar(30)  , 
	`temprecv_id` varchar(14)  , 
	`billout_id` varchar(30)  , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`paymtype_id` varchar(6) NOT NULL , 
	`bankrekening_id` varchar(20)  , 
	`paym_gironum` varchar(90)  , 
	`paym_girodate` date NOT NULL , 
	`coa_id` varchar(20)  , 
	`accfin_id` varchar(20) NOT NULL , 
	`ar_jurnal_id` varchar(14)  , 
	`ar_jurnaldetil_id` varchar(14)  , 
	`dept_id` varchar(30)  , 
	`jurnalsource_id` varchar(10) NOT NULL , 
	`tjurnalor_version` int(4) NOT NULL DEFAULT 0, 
	`tjurnalor_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`tjurnalor_commitby` varchar(14)  , 
	`tjurnalor_commitdate` datetime  , 
	`tjurnalor_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`tjurnalor_postby` varchar(14)  , 
	`tjurnalor_postdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';


ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnaltype_id` varchar(10) NOT NULL  AFTER `jurnal_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `jurnaltype_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_date` date NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_ref` varchar(30)   AFTER `jurnal_date`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `jurnal_ref`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `temprecv_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `billout_id` varchar(30)   AFTER `temprecv_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_descr` varchar(255) NOT NULL  AFTER `billout_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_descr`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnal_valfrg`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_valfrgrate`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `paymtype_id` varchar(6) NOT NULL  AFTER `jurnal_validr`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `bankrekening_id` varchar(20)   AFTER `paymtype_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `paym_gironum` varchar(90)   AFTER `bankrekening_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `paym_girodate` date NOT NULL  AFTER `paym_gironum`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(20)   AFTER `paym_girodate`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `accfin_id` varchar(20) NOT NULL  AFTER `coa_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `ar_jurnal_id` varchar(14)   AFTER `accfin_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `ar_jurnaldetil_id` varchar(14)   AFTER `ar_jurnal_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `ar_jurnaldetil_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `jurnalsource_id` varchar(10) NOT NULL  AFTER `dept_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_version` int(4) NOT NULL DEFAULT 0 AFTER `jurnalsource_id`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `tjurnalor_version`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_commitby` varchar(14)   AFTER `tjurnalor_iscommit`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_commitdate` datetime   AFTER `tjurnalor_commitby`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `tjurnalor_commitdate`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_postby` varchar(14)   AFTER `tjurnalor_ispost`;
ALTER TABLE `trn_tjurnalor` ADD COLUMN IF NOT EXISTS  `tjurnalor_postdate` datetime   AFTER `tjurnalor_postby`;


ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnaltype_id` varchar(10) NOT NULL  AFTER `jurnal_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `jurnaltype_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_date` date NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_ref` varchar(30)   AFTER `jurnal_date`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)   AFTER `jurnal_ref`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `temprecv_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `billout_id` varchar(30)   AFTER `temprecv_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_descr` varchar(255) NOT NULL  AFTER `billout_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_descr`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnal_valfrg`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_valfrgrate`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `paymtype_id` varchar(6) NOT NULL  AFTER `jurnal_validr`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `bankrekening_id` varchar(20)   AFTER `paymtype_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `paym_gironum` varchar(90)   AFTER `bankrekening_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `paym_girodate` date NOT NULL  AFTER `paym_gironum`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `coa_id` varchar(20)   AFTER `paym_girodate`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `accfin_id` varchar(20) NOT NULL  AFTER `coa_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `ar_jurnal_id` varchar(14)   AFTER `accfin_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `ar_jurnaldetil_id` varchar(14)   AFTER `ar_jurnal_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)   AFTER `ar_jurnaldetil_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `jurnalsource_id` varchar(10) NOT NULL  AFTER `dept_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_version` int(4) NOT NULL DEFAULT 0 AFTER `jurnalsource_id`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `tjurnalor_version`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_commitby` varchar(14)   AFTER `tjurnalor_iscommit`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_commitdate` datetime   AFTER `tjurnalor_commitby`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `tjurnalor_commitdate`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_postby` varchar(14)   AFTER `tjurnalor_ispost`;
ALTER TABLE `trn_tjurnalor` MODIFY COLUMN IF EXISTS  `tjurnalor_postdate` datetime   AFTER `tjurnalor_postby`;



ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `jurnaltype_id` (`jurnaltype_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `temprecv_id` (`temprecv_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `billout_id` (`billout_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `bankrekening_id` (`bankrekening_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `accfin_id` (`accfin_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `ar_jurnal_id` (`ar_jurnal_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `ar_jurnaldetil_id` (`ar_jurnaldetil_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_tjurnalor` ADD KEY IF NOT EXISTS `jurnalsource_id` (`jurnalsource_id`);

ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_jurnaltype` FOREIGN KEY IF NOT EXISTS  (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_trn_temprecv` FOREIGN KEY IF NOT EXISTS  (`temprecv_id`) REFERENCES `trn_temprecv` (`temprecv_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_trn_billout` FOREIGN KEY IF NOT EXISTS  (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_paymtype` FOREIGN KEY IF NOT EXISTS  (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_bankrekening` FOREIGN KEY IF NOT EXISTS  (`bankrekening_id`) REFERENCES `mst_bankrekening` (`bankrekening_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_accfin` FOREIGN KEY IF NOT EXISTS  (`accfin_id`) REFERENCES `mst_accfin` (`accfin_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_trn_jurnaldetil` FOREIGN KEY IF NOT EXISTS  (`ar_jurnal_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_trn_jurnaldetil_2` FOREIGN KEY IF NOT EXISTS  (`ar_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_tjurnalor` ADD CONSTRAINT `fk_trn_tjurnalor_mst_jurnalsource` FOREIGN KEY IF NOT EXISTS  (`jurnalsource_id`) REFERENCES `mst_jurnalsource` (`jurnalsource_id`);





CREATE TABLE IF NOT EXISTS `trn_tjurnalordetil` (
	`jurnaldetil_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`jurnaldetil_descr` varchar(255) NOT NULL , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`jurnaldetil_id_ref` varchar(14)  , 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';


ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `jurnaldetil_id`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_descr` varchar(255) NOT NULL  AFTER `partner_id`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_valfrgrate`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(20) NOT NULL  AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `coa_id`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_id_ref` varchar(14)   AFTER `dept_id`;
ALTER TABLE `trn_tjurnalordetil` ADD COLUMN IF NOT EXISTS  `jurnal_id` varchar(14) NOT NULL  AFTER `jurnaldetil_id_ref`;


ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `jurnaldetil_id`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_descr` varchar(255) NOT NULL  AFTER `partner_id`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_valfrgrate`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `coa_id` varchar(20) NOT NULL  AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `coa_id`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_id_ref` varchar(14)   AFTER `dept_id`;
ALTER TABLE `trn_tjurnalordetil` MODIFY COLUMN IF EXISTS  `jurnal_id` varchar(14) NOT NULL  AFTER `jurnaldetil_id_ref`;



ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `jurnaldetil_id_ref` (`jurnaldetil_id_ref`);
ALTER TABLE `trn_tjurnalordetil` ADD KEY IF NOT EXISTS `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_trn_jurnaldetil` FOREIGN KEY IF NOT EXISTS  (`jurnaldetil_id_ref`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_tjurnalordetil` ADD CONSTRAINT `fk_trn_tjurnalordetil_trn_tjurnalor` FOREIGN KEY IF NOT EXISTS (`jurnal_id`) REFERENCES `trn_tjurnalor` (`jurnal_id`);





