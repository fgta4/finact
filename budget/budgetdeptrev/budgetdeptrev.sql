-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_budgetdeptrev`;
-- drop table if exists `mst_budgetdeptrevitem`;


CREATE TABLE IF NOT EXISTS `mst_budgetdeptrev` (
	`budgetdeptrev_id` varchar(14) NOT NULL , 
	`budgetdeptyear_year` int(4) NOT NULL DEFAULT 0, 
	`coabudget_id` varchar(20)  , 
	`dept_id` varchar(30)  , 
	`budgetdeptrev_descr` varchar(255)  , 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptrev_version` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptrev_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptrev_commitby` varchar(14)  , 
	`budgetdeptrev_commitdate` datetime  , 
	`budgetdeptrev_isapprove` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptrev_approveby` varchar(14)  , 
	`budgetdeptrev_approvedate` datetime  , 
	`budgetdeptrev_isapply` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`budgetdeptrev_id`)
) 
ENGINE=InnoDB
COMMENT='Revisi Budget departemen';


ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_year` int(4) NOT NULL DEFAULT 0 AFTER `budgetdeptrev_id`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `budgetdeptyear_year`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_descr` varchar(255)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptrev_descr`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_version` int(4) NOT NULL DEFAULT 0 AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptrev_version`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_commitby` varchar(14)   AFTER `budgetdeptrev_iscommit`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_commitdate` datetime   AFTER `budgetdeptrev_commitby`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_isapprove` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptrev_commitdate`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_approveby` varchar(14)   AFTER `budgetdeptrev_isapprove`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_approvedate` datetime   AFTER `budgetdeptrev_approveby`;
ALTER TABLE `mst_budgetdeptrev` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_isapply` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptrev_approvedate`;


ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptyear_year` int(4) NOT NULL DEFAULT 0  AFTER `budgetdeptrev_id`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `budgetdeptyear_year`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_descr` varchar(255)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptrev_descr`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_version` int(4) NOT NULL DEFAULT 0  AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptrev_version`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_commitby` varchar(14)    AFTER `budgetdeptrev_iscommit`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_commitdate` datetime    AFTER `budgetdeptrev_commitby`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_isapprove` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptrev_commitdate`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_approveby` varchar(14)    AFTER `budgetdeptrev_isapprove`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_approvedate` datetime    AFTER `budgetdeptrev_approveby`;
ALTER TABLE `mst_budgetdeptrev` MODIFY COLUMN IF EXISTS  `budgetdeptrev_isapply` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptrev_approvedate`;



ALTER TABLE `mst_budgetdeptrev` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptrev` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptrev` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);

ALTER TABLE `mst_budgetdeptrev` ADD CONSTRAINT `fk_mst_budgetdeptrev_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptrev` ADD CONSTRAINT `fk_mst_budgetdeptrev_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptrev` ADD CONSTRAINT `fk_mst_budgetdeptrev_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `mst_budgetdeptrevitem` (
	`budgetdeptrevitem_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30)  , 
	`coabudget_id` varchar(20)  , 
	`budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptrev_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetdeptrevitem_pair` (`budgetdeptrev_id`, `owner_dept_id`, `dept_id`, `coabudget_id`, `budgetdeptmonth_year`, `budgetdeptmonth_month`),
	PRIMARY KEY (`budgetdeptrevitem_id`)
) 
ENGINE=InnoDB
COMMENT='Revisi Budget departemen';


ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `budgetdeptrevitem_id`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0 AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptmonth_value`;
ALTER TABLE `mst_budgetdeptrevitem` ADD COLUMN IF NOT EXISTS  `budgetdeptrev_id` varchar(14) NOT NULL  AFTER `owner_dept_id`;


ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `budgetdeptrevitem_id`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0  AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptmonth_value`;
ALTER TABLE `mst_budgetdeptrevitem` MODIFY COLUMN IF EXISTS  `budgetdeptrev_id` varchar(14) NOT NULL   AFTER `owner_dept_id`;


ALTER TABLE `mst_budgetdeptrevitem` ADD CONSTRAINT `budgetdeptrevitem_pair` UNIQUE IF NOT EXISTS  (`budgetdeptrev_id`, `owner_dept_id`, `dept_id`, `coabudget_id`, `budgetdeptmonth_year`, `budgetdeptmonth_month`);

ALTER TABLE `mst_budgetdeptrevitem` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD KEY IF NOT EXISTS `budgetdeptrev_id` (`budgetdeptrev_id`);

ALTER TABLE `mst_budgetdeptrevitem` ADD CONSTRAINT `fk_mst_budgetdeptrevitem_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD CONSTRAINT `fk_mst_budgetdeptrevitem_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD CONSTRAINT `fk_mst_budgetdeptrevitem_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptrevitem` ADD CONSTRAINT `fk_mst_budgetdeptrevitem_mst_budgetdeptrev` FOREIGN KEY IF NOT EXISTS (`budgetdeptrev_id`) REFERENCES `mst_budgetdeptrev` (`budgetdeptrev_id`);





