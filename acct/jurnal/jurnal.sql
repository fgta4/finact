-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_jurnal`;
-- drop table if exists `trn_jurnaldetil`;


CREATE TABLE IF NOT EXISTS `trn_jurnal` (
	`jurnal_id` varchar(30) NOT NULL , 
	`jurnalsource_id` varchar(10) NOT NULL , 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`periodemo_id` varchar(6)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_datedue` date NOT NULL , 
	`jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`coa_id` varchar(20)  , 
	`unit_id` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30)  , 
	`project_id` varchar(30)  , 
	`jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D', 
	`jurnal_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_version` int(4) NOT NULL DEFAULT 0, 
	`jurnal_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_commitby` varchar(14)  , 
	`jurnal_commitdate` datetime  , 
	`jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_postby` varchar(14)  , 
	`jurnal_postdate` datetime  , 
	`jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_closeby` varchar(14)  , 
	`jurnal_closedate` datetime  , 
	`jurnal_islinked` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isresponded` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_agingcloseby` varchar(14)  , 
	`jurnal_agingclosedate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';


ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnalsource_id` varchar(10) NOT NULL  AFTER `jurnal_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_id` varchar(10) NOT NULL  AFTER `jurnalsource_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_descr` varchar(255) NOT NULL  AFTER `jurnaltype_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_ref` varchar(30)   AFTER `jurnal_descr`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6)   AFTER `jurnal_ref`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_date` date NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_datedue` date NOT NULL  AFTER `jurnal_date`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_datedue`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnal_valfrg`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnal_valfrgrate`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(20)   AFTER `jurnal_validr`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `coa_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `dept_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D' AFTER `project_id`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_col`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_isindependentsetting`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasduedate`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadvalue`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadaccount`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadunit`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheaddept`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadpartner`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasdetunit`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasdetdept`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_version` int(4) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasdetpartner`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_version`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_commitby` varchar(14)   AFTER `jurnal_iscommit`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_commitdate` datetime   AFTER `jurnal_commitby`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_commitdate`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_postby` varchar(14)   AFTER `jurnal_ispost`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_postdate` datetime   AFTER `jurnal_postby`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_postdate`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_closeby` varchar(14)   AFTER `jurnal_isclose`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_closedate` datetime   AFTER `jurnal_closeby`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_islinked` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_closedate`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_isresponded` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_islinked`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnal_isresponded`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_agingcloseby` varchar(14)   AFTER `jurnal_isagingclose`;
ALTER TABLE `trn_jurnal` ADD COLUMN IF NOT EXISTS  `jurnal_agingclosedate` datetime   AFTER `jurnal_agingcloseby`;


ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnalsource_id` varchar(10) NOT NULL   AFTER `jurnal_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_id` varchar(10) NOT NULL   AFTER `jurnalsource_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_descr` varchar(255) NOT NULL   AFTER `jurnaltype_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_ref` varchar(30)    AFTER `jurnal_descr`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6)    AFTER `jurnal_ref`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_date` date NOT NULL   AFTER `periodemo_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_datedue` date NOT NULL   AFTER `jurnal_date`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnal_datedue`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `jurnal_valfrg`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnal_valfrgrate`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `coa_id` varchar(20)    AFTER `jurnal_validr`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `coa_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)    AFTER `dept_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)    AFTER `partner_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D'  AFTER `project_id`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_col`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_isindependentsetting`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasduedate`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadvalue`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadaccount`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadunit`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheaddept`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadpartner`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasdetunit`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasdetdept`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_version` int(4) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasdetpartner`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_version`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_commitby` varchar(14)    AFTER `jurnal_iscommit`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_commitdate` datetime    AFTER `jurnal_commitby`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_commitdate`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_postby` varchar(14)    AFTER `jurnal_ispost`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_postdate` datetime    AFTER `jurnal_postby`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_postdate`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_closeby` varchar(14)    AFTER `jurnal_isclose`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_closedate` datetime    AFTER `jurnal_closeby`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_islinked` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_closedate`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_isresponded` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_islinked`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnal_isresponded`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_agingcloseby` varchar(14)    AFTER `jurnal_isagingclose`;
ALTER TABLE `trn_jurnal` MODIFY COLUMN IF EXISTS  `jurnal_agingclosedate` datetime    AFTER `jurnal_agingcloseby`;



ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `jurnalsource_id` (`jurnalsource_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `jurnaltype_id` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD KEY IF NOT EXISTS `project_id` (`project_id`);

ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnalsource` FOREIGN KEY IF NOT EXISTS  (`jurnalsource_id`) REFERENCES `mst_jurnalsource` (`jurnalsource_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnaltype` FOREIGN KEY IF NOT EXISTS  (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);





CREATE TABLE IF NOT EXISTS `trn_jurnaldetil` (
	`jurnaldetil_id` varchar(14) NOT NULL , 
	`jurnaldetil_isprelinked` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaldetil_descr` varchar(255) NOT NULL , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`coa_id` varchar(20) NOT NULL , 
	`unit_id` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30)  , 
	`project_id` varchar(30)  , 
	`jurnaldetil_outstanding_frg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_outstanding_idr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_id_ref` varchar(14)  , 
	`jurnaldetil_head` int(1) NOT NULL DEFAULT 0, 
	`jurnaldetil_blockorder` int(1) NOT NULL DEFAULT 0, 
	`jurnal_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';


ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_isprelinked` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaldetil_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_descr` varchar(255) NOT NULL  AFTER `jurnaldetil_isprelinked`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_valfrgrate`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(20) NOT NULL  AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `coa_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `dept_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_outstanding_frg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `project_id`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_outstanding_idr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_outstanding_frg`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_id_ref` varchar(14)   AFTER `jurnaldetil_outstanding_idr`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_head` int(1) NOT NULL DEFAULT 0 AFTER `jurnaldetil_id_ref`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnaldetil_blockorder` int(1) NOT NULL DEFAULT 0 AFTER `jurnaldetil_head`;
ALTER TABLE `trn_jurnaldetil` ADD COLUMN IF NOT EXISTS  `jurnal_id` varchar(30) NOT NULL  AFTER `jurnaldetil_blockorder`;


ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_isprelinked` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaldetil_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_descr` varchar(255) NOT NULL   AFTER `jurnaldetil_isprelinked`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnaldetil_valfrgrate`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `coa_id` varchar(20) NOT NULL   AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `coa_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)    AFTER `dept_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)    AFTER `partner_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_outstanding_frg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `project_id`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_outstanding_idr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnaldetil_outstanding_frg`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_id_ref` varchar(14)    AFTER `jurnaldetil_outstanding_idr`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_head` int(1) NOT NULL DEFAULT 0  AFTER `jurnaldetil_id_ref`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnaldetil_blockorder` int(1) NOT NULL DEFAULT 0  AFTER `jurnaldetil_head`;
ALTER TABLE `trn_jurnaldetil` MODIFY COLUMN IF EXISTS  `jurnal_id` varchar(30) NOT NULL   AFTER `jurnaldetil_blockorder`;



ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `project_id` (`project_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS  `jurnaldetil_id_ref` (`jurnaldetil_id_ref`);
ALTER TABLE `trn_jurnaldetil` ADD KEY IF NOT EXISTS `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnaldetil` FOREIGN KEY IF NOT EXISTS (`jurnaldetil_id_ref`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnal` FOREIGN KEY IF NOT EXISTS (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





