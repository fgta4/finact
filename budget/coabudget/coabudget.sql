-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coabudget`;
-- drop table if exists `mst_coabudgetdept`;


CREATE TABLE IF NOT EXISTS `mst_coabudget` (
	`coabudget_id` varchar(20) NOT NULL , 
	`coabudget_name` varchar(255) NOT NULL , 
	`coabudget_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coabudget_descr` varchar(255)  , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`coa_id` varchar(17)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coabudget_name` (`coabudget_name`),
	PRIMARY KEY (`coabudget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Account Budget';


ALTER TABLE `mst_coabudget` ADD COLUMN IF NOT EXISTS  `coabudget_name` varchar(255) NOT NULL  AFTER `coabudget_id`;
ALTER TABLE `mst_coabudget` ADD COLUMN IF NOT EXISTS  `coabudget_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `coabudget_name`;
ALTER TABLE `mst_coabudget` ADD COLUMN IF NOT EXISTS  `coabudget_descr` varchar(255)   AFTER `coabudget_isdisabled`;
ALTER TABLE `mst_coabudget` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `coabudget_descr`;
ALTER TABLE `mst_coabudget` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17)   AFTER `owner_dept_id`;


ALTER TABLE `mst_coabudget` MODIFY COLUMN IF EXISTS  `coabudget_name` varchar(255) NOT NULL   AFTER `coabudget_id`;
ALTER TABLE `mst_coabudget` MODIFY COLUMN IF EXISTS  `coabudget_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `coabudget_name`;
ALTER TABLE `mst_coabudget` MODIFY COLUMN IF EXISTS  `coabudget_descr` varchar(255)    AFTER `coabudget_isdisabled`;
ALTER TABLE `mst_coabudget` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30) NOT NULL   AFTER `coabudget_descr`;
ALTER TABLE `mst_coabudget` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17)    AFTER `owner_dept_id`;


ALTER TABLE `mst_coabudget` ADD CONSTRAINT `coabudget_name` UNIQUE IF NOT EXISTS  (`coabudget_name`);

ALTER TABLE `mst_coabudget` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_coabudget` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);

ALTER TABLE `mst_coabudget` ADD CONSTRAINT `fk_mst_coabudget_mst_dept` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_coabudget` ADD CONSTRAINT `fk_mst_coabudget_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);





CREATE TABLE IF NOT EXISTS `mst_coabudgetdept` (
	`coabudgetdept_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`coabudget_id` varchar(20) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `dept_id` (`coabudget_id`, `dept_id`),
	PRIMARY KEY (`coabudgetdept_id`)
) 
ENGINE=InnoDB
COMMENT='Departemen yang beoleh menggunakan coa ini';


ALTER TABLE `mst_coabudgetdept` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `coabudgetdept_id`;
ALTER TABLE `mst_coabudgetdept` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20) NOT NULL  AFTER `dept_id`;


ALTER TABLE `mst_coabudgetdept` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `coabudgetdept_id`;
ALTER TABLE `mst_coabudgetdept` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20) NOT NULL   AFTER `dept_id`;


ALTER TABLE `mst_coabudgetdept` ADD CONSTRAINT `dept_id` UNIQUE IF NOT EXISTS  (`coabudget_id`, `dept_id`);

ALTER TABLE `mst_coabudgetdept` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_coabudgetdept` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);

ALTER TABLE `mst_coabudgetdept` ADD CONSTRAINT `fk_mst_coabudgetdept_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_coabudgetdept` ADD CONSTRAINT `fk_mst_coabudgetdept_mst_coabudget` FOREIGN KEY IF NOT EXISTS (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);





