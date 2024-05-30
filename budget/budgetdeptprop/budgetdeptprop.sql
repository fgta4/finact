-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_budgetdeptprop`;
-- drop table if exists `mst_budgetdeptpropitem`;


CREATE TABLE IF NOT EXISTS `mst_budgetdeptprop` (
	`budgetdeptprop_id` varchar(14) NOT NULL , 
	`budgetdeptprop_descr` varchar(255)  , 
	`budgetdeptprop_year` int(4) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptprop_version` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptprop_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptprop_commitby` varchar(14)  , 
	`budgetdeptprop_commitdate` datetime  , 
	`budgetdeptprop_isgenerate` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptprop_generateby` varchar(14)  , 
	`budgetdeptprop_generatedate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`budgetdeptprop_id`)
) 
ENGINE=InnoDB
COMMENT='Budget departemen per tahun';


ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_descr` varchar(255)   AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_year` int(4) NOT NULL DEFAULT 0 AFTER `budgetdeptprop_descr`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptprop_year`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_version` int(4) NOT NULL DEFAULT 0 AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptprop_version`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_commitby` varchar(14)   AFTER `budgetdeptprop_iscommit`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_commitdate` datetime   AFTER `budgetdeptprop_commitby`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_isgenerate` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptprop_commitdate`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_generateby` varchar(14)   AFTER `budgetdeptprop_isgenerate`;
ALTER TABLE `mst_budgetdeptprop` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_generatedate` datetime   AFTER `budgetdeptprop_generateby`;


ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_descr` varchar(255)    AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_year` int(4) NOT NULL DEFAULT 0  AFTER `budgetdeptprop_descr`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptprop_year`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_version` int(4) NOT NULL DEFAULT 0  AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptprop_version`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_commitby` varchar(14)    AFTER `budgetdeptprop_iscommit`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_commitdate` datetime    AFTER `budgetdeptprop_commitby`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_isgenerate` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptprop_commitdate`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_generateby` varchar(14)    AFTER `budgetdeptprop_isgenerate`;
ALTER TABLE `mst_budgetdeptprop` MODIFY COLUMN IF EXISTS  `budgetdeptprop_generatedate` datetime    AFTER `budgetdeptprop_generateby`;



ALTER TABLE `mst_budgetdeptprop` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);

ALTER TABLE `mst_budgetdeptprop` ADD CONSTRAINT `fk_mst_budgetdeptprop_mst_dept` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `mst_budgetdeptpropitem` (
	`budgetdeptpropitem_id` varchar(14) NOT NULL , 
	`coabudget_id` varchar(20)  , 
	`dept_id` varchar(30)  , 
	`budgetdeptpropitem_descr` varchar(255)  , 
	`budgetdeptmonth_01` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_02` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_03` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_04` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_05` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_06` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_07` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_08` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_09` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_10` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_11` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_12` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptprop_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetdeptpropitem_pair` (`budgetdeptprop_id`, `coabudget_id`, `dept_id`),
	PRIMARY KEY (`budgetdeptpropitem_id`)
) 
ENGINE=InnoDB
COMMENT='Budget detil per bulan departemen per tahun';


ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `budgetdeptpropitem_id`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptpropitem_descr` varchar(255)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_01` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptpropitem_descr`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_02` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_01`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_03` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_02`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_04` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_03`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_05` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_04`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_06` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_05`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_07` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_06`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_08` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_07`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_09` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_08`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_10` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_09`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_11` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_10`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_12` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_11`;
ALTER TABLE `mst_budgetdeptpropitem` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_id` varchar(14) NOT NULL  AFTER `budgetdeptmonth_12`;


ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `budgetdeptpropitem_id`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptpropitem_descr` varchar(255)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_01` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptpropitem_descr`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_02` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_01`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_03` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_02`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_04` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_03`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_05` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_04`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_06` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_05`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_07` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_06`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_08` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_07`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_09` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_08`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_10` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_09`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_11` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_10`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_12` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_11`;
ALTER TABLE `mst_budgetdeptpropitem` MODIFY COLUMN IF EXISTS  `budgetdeptprop_id` varchar(14) NOT NULL   AFTER `budgetdeptmonth_12`;


ALTER TABLE `mst_budgetdeptpropitem` ADD CONSTRAINT `budgetdeptpropitem_pair` UNIQUE IF NOT EXISTS  (`budgetdeptprop_id`, `coabudget_id`, `dept_id`);

ALTER TABLE `mst_budgetdeptpropitem` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptpropitem` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptpropitem` ADD KEY IF NOT EXISTS `budgetdeptprop_id` (`budgetdeptprop_id`);

ALTER TABLE `mst_budgetdeptpropitem` ADD CONSTRAINT `fk_mst_budgetdeptpropitem_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptpropitem` ADD CONSTRAINT `fk_mst_budgetdeptpropitem_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptpropitem` ADD CONSTRAINT `fk_mst_budgetdeptpropitem_mst_budgetdeptprop` FOREIGN KEY IF NOT EXISTS (`budgetdeptprop_id`) REFERENCES `mst_budgetdeptprop` (`budgetdeptprop_id`);





