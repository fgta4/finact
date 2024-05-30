-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_jurnaltype`;
-- drop table if exists `mst_jurnaltypecoa`;


CREATE TABLE IF NOT EXISTS `mst_jurnaltype` (
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnalmodel_id` varchar(10) NOT NULL , 
	`jurnaltype_name` varchar(30) NOT NULL , 
	`jurnaltype_descr` varchar(90)  , 
	`jurnaltype_prefix` varchar(2) NOT NULL , 
	`jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D', 
	`jurnaltype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnaltype_name` (`jurnaltype_name`),
	PRIMARY KEY (`jurnaltype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe-tipe Jurnal';


ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnalmodel_id` varchar(10) NOT NULL  AFTER `jurnaltype_id`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_name` varchar(30) NOT NULL  AFTER `jurnalmodel_id`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_descr` varchar(90)   AFTER `jurnaltype_name`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_prefix` varchar(2) NOT NULL  AFTER `jurnaltype_descr`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D' AFTER `jurnaltype_prefix`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_col`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_isdisabled`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasduedate`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadvalue`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadaccount`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadunit`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheaddept`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasheadpartner`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasdetunit`;
ALTER TABLE `mst_jurnaltype` ADD COLUMN IF NOT EXISTS  `jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltype_ishasdetdept`;


ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnalmodel_id` varchar(10) NOT NULL   AFTER `jurnaltype_id`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_name` varchar(30) NOT NULL   AFTER `jurnalmodel_id`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_descr` varchar(90)    AFTER `jurnaltype_name`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_prefix` varchar(2) NOT NULL   AFTER `jurnaltype_descr`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_col` varchar(1) NOT NULL DEFAULT 'D'  AFTER `jurnaltype_prefix`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_col`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasduedate` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_isdisabled`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadvalue` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasduedate`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadaccount` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadvalue`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadunit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadaccount`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheaddept` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadunit`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasheadpartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheaddept`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetunit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasheadpartner`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetdept` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasdetunit`;
ALTER TABLE `mst_jurnaltype` MODIFY COLUMN IF EXISTS  `jurnaltype_ishasdetpartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltype_ishasdetdept`;


ALTER TABLE `mst_jurnaltype` ADD CONSTRAINT `jurnaltype_name` UNIQUE IF NOT EXISTS  (`jurnaltype_name`);

ALTER TABLE `mst_jurnaltype` ADD KEY IF NOT EXISTS `jurnalmodel_id` (`jurnalmodel_id`);

ALTER TABLE `mst_jurnaltype` ADD CONSTRAINT `fk_mst_jurnaltype_mst_jurnalmodel` FOREIGN KEY IF NOT EXISTS  (`jurnalmodel_id`) REFERENCES `mst_jurnalmodel` (`jurnalmodel_id`);





CREATE TABLE IF NOT EXISTS `mst_jurnaltypecoa` (
	`jurnaltypecoa_id` varchar(14) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`jurnaltypecoa_isdebet` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltypecoa_iskredit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaltypecoa_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar COA yang dipunyai oleh suatu tipe jurnal';


ALTER TABLE `mst_jurnaltypecoa` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17) NOT NULL  AFTER `jurnaltypecoa_id`;
ALTER TABLE `mst_jurnaltypecoa` ADD COLUMN IF NOT EXISTS  `jurnaltypecoa_isdebet` tinyint(1) NOT NULL DEFAULT 0 AFTER `coa_id`;
ALTER TABLE `mst_jurnaltypecoa` ADD COLUMN IF NOT EXISTS  `jurnaltypecoa_iskredit` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnaltypecoa_isdebet`;
ALTER TABLE `mst_jurnaltypecoa` ADD COLUMN IF NOT EXISTS  `jurnaltype_id` varchar(10) NOT NULL  AFTER `jurnaltypecoa_iskredit`;


ALTER TABLE `mst_jurnaltypecoa` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17) NOT NULL   AFTER `jurnaltypecoa_id`;
ALTER TABLE `mst_jurnaltypecoa` MODIFY COLUMN IF EXISTS  `jurnaltypecoa_isdebet` tinyint(1) NOT NULL DEFAULT 0  AFTER `coa_id`;
ALTER TABLE `mst_jurnaltypecoa` MODIFY COLUMN IF EXISTS  `jurnaltypecoa_iskredit` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnaltypecoa_isdebet`;
ALTER TABLE `mst_jurnaltypecoa` MODIFY COLUMN IF EXISTS  `jurnaltype_id` varchar(10) NOT NULL   AFTER `jurnaltypecoa_iskredit`;



ALTER TABLE `mst_jurnaltypecoa` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `mst_jurnaltypecoa` ADD KEY IF NOT EXISTS `jurnaltype_id` (`jurnaltype_id`);

ALTER TABLE `mst_jurnaltypecoa` ADD CONSTRAINT `fk_mst_jurnaltypecoa_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_jurnaltypecoa` ADD CONSTRAINT `fk_mst_jurnaltypecoa_mst_jurnaltype` FOREIGN KEY IF NOT EXISTS (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);





