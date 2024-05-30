-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemmodel`;


CREATE TABLE IF NOT EXISTS `mst_itemmodel` (
	`itemmodel_id` varchar(10) NOT NULL , 
	`itemmodel_name` varchar(90) NOT NULL , 
	`itemmodel_descr` varchar(255)  , 
	`itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_id` varchar(2) NOT NULL , 
	`itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_ismultidept` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30)  , 
	`itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0, 
	`depremodel_id` varchar(10) NOT NULL , 
	`depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_depreage` int(2) NOT NULL DEFAULT 5, 
	`itemmodel_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemmodel_name` (`itemmodel_name`),
	PRIMARY KEY (`itemmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Item';


ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_name` varchar(90) NOT NULL  AFTER `itemmodel_id`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_descr` varchar(255)   AFTER `itemmodel_name`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_descr`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_isintangible`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_issellable`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmanage_id` varchar(2) NOT NULL  AFTER `itemmodel_isnonitem`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_id`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_ismultidept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `itemmodel_ismultidept`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `depremodel_id` varchar(10) NOT NULL  AFTER `itemmodel_ishasmainteinerdept`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0 AFTER `depremodel_id`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_depreage` int(2) NOT NULL DEFAULT 5 AFTER `depremodel_isautocalc`;
ALTER TABLE `mst_itemmodel` ADD COLUMN IF NOT EXISTS  `itemmodel_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1 AFTER `itemmodel_depreage`;


ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_name` varchar(90) NOT NULL  AFTER `itemmodel_id`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_descr` varchar(255)   AFTER `itemmodel_name`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_descr`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_isintangible`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_issellable`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmanage_id` varchar(2) NOT NULL  AFTER `itemmodel_isnonitem`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_id`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_ismultidept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)   AFTER `itemmodel_ismultidept`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `depremodel_id` varchar(10) NOT NULL  AFTER `itemmodel_ishasmainteinerdept`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0 AFTER `depremodel_id`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_depreage` int(2) NOT NULL DEFAULT 5 AFTER `depremodel_isautocalc`;
ALTER TABLE `mst_itemmodel` MODIFY COLUMN IF EXISTS  `itemmodel_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1 AFTER `itemmodel_depreage`;


ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `itemmodel_name` UNIQUE IF NOT EXISTS  (`itemmodel_name`);

ALTER TABLE `mst_itemmodel` ADD KEY IF NOT EXISTS `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_itemmodel` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_itemmodel` ADD KEY IF NOT EXISTS `depremodel_id` (`depremodel_id`);

ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_itemmanage` FOREIGN KEY IF NOT EXISTS  (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_depremodel` FOREIGN KEY IF NOT EXISTS  (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);





