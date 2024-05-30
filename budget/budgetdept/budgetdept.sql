-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_budgetdeptyear`;
-- drop table if exists `mst_budgetdeptmonth`;


CREATE TABLE IF NOT EXISTS `mst_budgetdeptyear` (
	`budgetdeptyear_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30)  , 
	`coabudget_id` varchar(20)  , 
	`budgetdeptyear_year` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptyear_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptprop_id` varchar(14)  , 
	`budgetdeptyear_version` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptyear_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`budgetdeptyear_commitby` varchar(14)  , 
	`budgetdeptyear_commitdate` datetime  , 
	`budgetdeptyear_isapprove` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetdeptyear_pair` (`budgetdeptyear_year`, `owner_dept_id`, `dept_id`, `coabudget_id`),
	PRIMARY KEY (`budgetdeptyear_id`)
) 
ENGINE=InnoDB
COMMENT='Budget departemen per tahun';


ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `budgetdeptyear_id`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_year` int(4) NOT NULL DEFAULT 0 AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptyear_year`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptyear_value`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_id` varchar(14)   AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_version` int(4) NOT NULL DEFAULT 0 AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptyear_version`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_commitby` varchar(14)   AFTER `budgetdeptyear_iscommit`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_commitdate` datetime   AFTER `budgetdeptyear_commitby`;
ALTER TABLE `mst_budgetdeptyear` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_isapprove` tinyint(1) NOT NULL DEFAULT 0 AFTER `budgetdeptyear_commitdate`;


ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `budgetdeptyear_id`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_year` int(4) NOT NULL DEFAULT 0  AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptyear_year`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptyear_value`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptprop_id` varchar(14)    AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_version` int(4) NOT NULL DEFAULT 0  AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptyear_version`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_commitby` varchar(14)    AFTER `budgetdeptyear_iscommit`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_commitdate` datetime    AFTER `budgetdeptyear_commitby`;
ALTER TABLE `mst_budgetdeptyear` MODIFY COLUMN IF EXISTS  `budgetdeptyear_isapprove` tinyint(1) NOT NULL DEFAULT 0  AFTER `budgetdeptyear_commitdate`;


ALTER TABLE `mst_budgetdeptyear` ADD CONSTRAINT `budgetdeptyear_pair` UNIQUE IF NOT EXISTS  (`budgetdeptyear_year`, `owner_dept_id`, `dept_id`, `coabudget_id`);

ALTER TABLE `mst_budgetdeptyear` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptyear` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptyear` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_budgetdeptyear` ADD KEY IF NOT EXISTS  `budgetdeptprop_id` (`budgetdeptprop_id`);

ALTER TABLE `mst_budgetdeptyear` ADD CONSTRAINT `fk_mst_budgetdeptyear_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptyear` ADD CONSTRAINT `fk_mst_budgetdeptyear_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptyear` ADD CONSTRAINT `fk_mst_budgetdeptyear_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptyear` ADD CONSTRAINT `fk_mst_budgetdeptyear_mst_budgetdeptprop` FOREIGN KEY IF NOT EXISTS (`budgetdeptprop_id`) REFERENCES `mst_budgetdeptprop` (`budgetdeptprop_id`);





CREATE TABLE IF NOT EXISTS `mst_budgetdeptmonth` (
	`budgetdeptmonth_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30)  , 
	`coabudget_id` varchar(20)  , 
	`budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0, 
	`budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`budgetdeptprop_id` varchar(14)  , 
	`budgetdeptpropitem_id` varchar(14)  , 
	`budgetdeptyear_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetdeptmonth_pair` (`budgetdeptmonth_year`, `budgetdeptmonth_month`, `owner_dept_id`, `dept_id`, `coabudget_id`),
	PRIMARY KEY (`budgetdeptmonth_id`)
) 
ENGINE=InnoDB
COMMENT='Budget departemen per tahun';


ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `budgetdeptmonth_id`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `coabudget_id` varchar(20)   AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0 AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `budgetdeptmonth_value`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptprop_id` varchar(14)   AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptpropitem_id` varchar(14)   AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptmonth` ADD COLUMN IF NOT EXISTS  `budgetdeptyear_id` varchar(14) NOT NULL  AFTER `budgetdeptpropitem_id`;


ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `budgetdeptmonth_id`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `coabudget_id` varchar(20)    AFTER `dept_id`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_year` int(4) NOT NULL DEFAULT 0  AFTER `coabudget_id`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_month` int(2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_year`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptmonth_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `budgetdeptmonth_month`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `budgetdeptmonth_value`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptprop_id` varchar(14)    AFTER `owner_dept_id`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptpropitem_id` varchar(14)    AFTER `budgetdeptprop_id`;
ALTER TABLE `mst_budgetdeptmonth` MODIFY COLUMN IF EXISTS  `budgetdeptyear_id` varchar(14) NOT NULL   AFTER `budgetdeptpropitem_id`;


ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `budgetdeptmonth_pair` UNIQUE IF NOT EXISTS  (`budgetdeptmonth_year`, `budgetdeptmonth_month`, `owner_dept_id`, `dept_id`, `coabudget_id`);

ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS `coabudget_id` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS  `budgetdeptprop_id` (`budgetdeptprop_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS  `budgetdeptpropitem_id` (`budgetdeptpropitem_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD KEY IF NOT EXISTS `budgetdeptyear_id` (`budgetdeptyear_id`);

ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_coabudget` FOREIGN KEY IF NOT EXISTS  (`coabudget_id`) REFERENCES `mst_coabudget` (`coabudget_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_budgetdeptprop` FOREIGN KEY IF NOT EXISTS (`budgetdeptprop_id`) REFERENCES `mst_budgetdeptprop` (`budgetdeptprop_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_budgetdeptpropitem` FOREIGN KEY IF NOT EXISTS (`budgetdeptpropitem_id`) REFERENCES `mst_budgetdeptpropitem` (`budgetdeptpropitem_id`);
ALTER TABLE `mst_budgetdeptmonth` ADD CONSTRAINT `fk_mst_budgetdeptmonth_mst_budgetdeptyear` FOREIGN KEY IF NOT EXISTS (`budgetdeptyear_id`) REFERENCES `mst_budgetdeptyear` (`budgetdeptyear_id`);





