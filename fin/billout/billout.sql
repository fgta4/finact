-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_billout`;
-- drop table if exists `trn_billoutdetil`;


CREATE TABLE IF NOT EXISTS `trn_billout` (
	`billout_id` varchar(30) NOT NULL , 
	`billtype_id` varchar(3)  , 
	`billout_ref` varchar(255)  , 
	`billout_descr` varchar(255) NOT NULL , 
	`billout_date` date NOT NULL , 
	`billout_datedue` date NOT NULL , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_id` varchar(30)  , 
	`orderinterm_id` varchar(14)  , 
	`billout_isdp` tinyint(1) NOT NULL DEFAULT 0, 
	`partner_id` varchar(30)  , 
	`billout_value` decimal(16, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`billout_frgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billout_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billout_dppidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`billout_version` int(4) NOT NULL DEFAULT 0, 
	`billout_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_commitby` varchar(14)  , 
	`billout_commitdate` datetime  , 
	`billout_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_postby` varchar(14)  , 
	`billout_postdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tagihan Keluar';


ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billtype_id` varchar(3)   AFTER `billout_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_ref` varchar(255)   AFTER `billtype_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_descr` varchar(255) NOT NULL  AFTER `billout_ref`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_date` date NOT NULL  AFTER `billout_descr`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_datedue` date NOT NULL  AFTER `billout_date`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `billout_datedue`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `orderin_id` varchar(30)   AFTER `billout_isunreferenced`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `orderinterm_id` varchar(14)   AFTER `orderin_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderinterm_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `billout_isdp`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_value` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `partner_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `billout_value`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_frgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billout_frgrate`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billout_valueidr`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_dppidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billout_ppnidr`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `billout_dppidr`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `owner_dept_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_version`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_commitby` varchar(14)   AFTER `billout_iscommit`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_commitdate` datetime   AFTER `billout_commitby`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_commitdate`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_postby` varchar(14)   AFTER `billout_ispost`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_postdate` datetime   AFTER `billout_postby`;


ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billtype_id` varchar(3)    AFTER `billout_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_ref` varchar(255)    AFTER `billtype_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_descr` varchar(255) NOT NULL   AFTER `billout_ref`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_date` date NOT NULL   AFTER `billout_descr`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_datedue` date NOT NULL   AFTER `billout_date`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)    AFTER `billout_datedue`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `orderin_id` varchar(30)    AFTER `billout_isunreferenced`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `orderinterm_id` varchar(14)    AFTER `orderin_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_isdp` tinyint(1) NOT NULL DEFAULT 0  AFTER `orderinterm_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)    AFTER `billout_isdp`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_value` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `partner_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `billout_value`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_frgrate` decimal(14, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billout_frgrate`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billout_valueidr`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_dppidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billout_ppnidr`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30) NOT NULL   AFTER `billout_dppidr`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL   AFTER `owner_dept_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_version` int(4) NOT NULL DEFAULT 0  AFTER `doc_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `billout_version`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_commitby` varchar(14)    AFTER `billout_iscommit`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_commitdate` datetime    AFTER `billout_commitby`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `billout_commitdate`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_postby` varchar(14)    AFTER `billout_ispost`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_postdate` datetime    AFTER `billout_postby`;



ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `billtype_id` (`billtype_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `orderin_id` (`orderin_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `orderinterm_id` (`orderinterm_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_billtype` FOREIGN KEY IF NOT EXISTS  (`billtype_id`) REFERENCES `mst_billtype` (`billtype_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_trn_orderin` FOREIGN KEY IF NOT EXISTS  (`orderin_id`) REFERENCES `trn_orderin` (`orderin_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_trn_orderinterm` FOREIGN KEY IF NOT EXISTS  (`orderinterm_id`) REFERENCES `trn_orderinterm` (`orderinterm_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_billoutdetil` (
	`billoutdetil_id` varchar(14) NOT NULL , 
	`billoutrowtype_id` varchar(3) NOT NULL , 
	`itemclass_id` varchar(14)  , 
	`billoutdetil_descr` varchar(255) NOT NULL , 
	`billoutdetil_value` decimal(16, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`billoutdetil_frgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_valueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billoutdetil_dppidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`coa_id` varchar(17)  , 
	`billout_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billoutdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Bill out Detil';


ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutrowtype_id` varchar(3) NOT NULL  AFTER `billoutdetil_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `billoutrowtype_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_descr` varchar(255) NOT NULL  AFTER `itemclass_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_value` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_descr`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `billoutdetil_value`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_frgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_valueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_frgrate`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_valueidr`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_dppidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_ppnidr`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17)   AFTER `billoutdetil_dppidr`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billout_id` varchar(30) NOT NULL  AFTER `coa_id`;


ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutrowtype_id` varchar(3) NOT NULL   AFTER `billoutdetil_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)    AFTER `billoutrowtype_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_descr` varchar(255) NOT NULL   AFTER `itemclass_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_value` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `billoutdetil_descr`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `billoutdetil_value`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_frgrate` decimal(14, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_valueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billoutdetil_frgrate`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billoutdetil_valueidr`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_dppidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `billoutdetil_ppnidr`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17)    AFTER `billoutdetil_dppidr`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billout_id` varchar(30) NOT NULL   AFTER `coa_id`;



ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `billoutrowtype_id` (`billoutrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `billout_id` (`billout_id`);

ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_billoutrowtype` FOREIGN KEY IF NOT EXISTS  (`billoutrowtype_id`) REFERENCES `mst_billoutrowtype` (`billoutrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_trn_billout` FOREIGN KEY IF NOT EXISTS (`billout_id`) REFERENCES `trn_billout` (`billout_id`);





