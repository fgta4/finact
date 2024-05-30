-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_budgetdeptalloc`;
-- drop table if exists `mst_budgetdeptallocsource`;


CREATE TABLE IF NOT EXISTS `mst_budgetdeptalloc` (
	`budgetdeptalloc_id` varchar(14) NOT NULL , 
	`budgetdeptalloc_descr` varchar(255)  , 
	`budgetdeptalloc_year` int(4) NOT NULL DEFAULT 0, 
	`coabudget_id` varchar(20)  , 
	`dept_id` varchar(30)  , 
	`budgetdeptalloc_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptalloc_apllied` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptalloc_version` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptalloc_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptalloc_commitby` varchar(14)  , 
	`budgetdeptalloc_commitdate` datetime  , 
	`budgetdeptalloc_isapply` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`budgetdeptalloc_id`)
) 
ENGINE=InnoDB
COMMENT='Alokasi Budget departemen';


ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_descr` varchar(255)   AFTER `budgetdeptalloc_id`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_year` int(4) NOT NULL DEFAULT 0 AFTER `budgetdeptalloc_descr`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `budgetdeptalloc_year`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_apllied` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptalloc_value`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptalloc_apllied`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_version` int(4) NOT NULL DEFAULT 0 AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptalloc_version`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_commitby` varchar(14)   AFTER `budgetdeptalloc_iscommit`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_commitdate` datetime   AFTER `budgetdeptalloc_commitby`;
ALTER TABLE `mst_budgetdeptalloc` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_isapply` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptalloc_commitdate`;


ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_descr` varchar(255)    AFTER `budgetdeptalloc_id`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_year` int(4) NOT NULL DEFAULT 0  AFTER `budgetdeptalloc_descr`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `budgetdeptalloc_year`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_apllied` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptalloc_value`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptalloc_apllied`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_version` int(4) NOT NULL DEFAULT 0  AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptalloc_version`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_commitby` varchar(14)    AFTER `budgetdeptalloc_iscommit`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_commitdate` datetime    AFTER `budgetdeptalloc_commitby`;
ALTER TABLE `mst_budgetdeptalloc` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_isapply` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptalloc_commitdate`;



ALTER TABLE `mst_budgetdeptalloc` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptalloc` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptalloc` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);

ALTER TABLE `mst_budgetdeptalloc` ADD CONSTRAINT `fk_mst_budgetdeptalloc_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptalloc` ADD CONSTRAINT `fk_mst_budgetdeptalloc_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptalloc` ADD CONSTRAINT `fk_mst_budgetdeptalloc_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `mst_budgetdeptallocsource` (
	`budgetdeptallocsource_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30)  , 
	`coabudget_id` varchar(20)  , 
	`budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0, 
	`budgetdeptallocsource_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`budgetdeptallocsource_apllied` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptalloc_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetdeptallocsource_pair` (`budgetdeptalloc_id`, `owner_dept_id`, `dept_id`, `coabudget_id`, `budgetdeptmonth_year`, `budgetdeptmonth_month`),
	PRIMARY KEY (`budgetdeptallocsource_id`)
) 
ENGINE=InnoDB
COMMENT='Revisi Budget departemen';


ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `budgetdeptallocsource_id`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0 AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `budgetdeptallocsource_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `budgetdeptallocsource_apllied` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptallocsource_value`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptallocsource_apllied`;
ALTER TABLE `mst_budgetdeptallocsource` ADD COLUMN IF NOT EXISTS  `budgetdeptalloc_id` varchar(14) NOT NULL  AFTER `owner_dept_id`;


ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `budgetdeptallocsource_id`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0  AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `budgetdeptallocsource_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `budgetdeptallocsource_apllied` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptallocsource_value`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptallocsource_apllied`;
ALTER TABLE `mst_budgetdeptallocsource` MODIFY COLUMN IF EXISTS  `budgetdeptalloc_id` varchar(14) NOT NULL   AFTER `owner_dept_id`;


ALTER TABLE `mst_budgetdeptallocsource` ADD CONSTRAINT `budgetdeptallocsource_pair` UNIQUE IF NOT EXISTS  (`budgetdeptalloc_id`, `owner_dept_id`, `dept_id`, `coabudget_id`, `budgetdeptmonth_year`, `budgetdeptmonth_month`);

ALTER TABLE `mst_budgetdeptallocsource` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD KEY IF NOT EXISTS `budgetdeptalloc_id` (`budgetdeptalloc_id`);

ALTER TABLE `mst_budgetdeptallocsource` ADD CONSTRAINT `fk_mst_budgetdeptallocsource_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD CONSTRAINT `fk_mst_budgetdeptallocsource_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD CONSTRAINT `fk_mst_budgetdeptallocsource_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptallocsource` ADD CONSTRAINT `fk_mst_budgetdeptallocsource_mst_budgetdeptalloc` FOREIGN KEY IF NOT EXISTS (`budgetdeptalloc_id`) REFERENCES `mst_budgetdeptalloc` (`budgetdeptalloc_id`);





