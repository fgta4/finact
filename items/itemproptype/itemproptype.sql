-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemproptype`;


CREATE TABLE IF NOT EXISTS `mst_itemproptype` (
	`itemproptype_id` varchar(20) NOT NULL , 
	`itemproptype_name` varchar(30) NOT NULL , 
	`itemproptype_group` varchar(20) NOT NULL , 
	`itemproptype_descr` varchar(90)  , 
	`itemproptype_order` int(7)  DEFAULT 0, 
	`itemproptype_isitem` tinyint(1) NOT NULL DEFAULT 0, 
	`itemproptype_isitemstock` tinyint(1) NOT NULL DEFAULT 0, 
	`itemproptype_isitemasset` tinyint(1) NOT NULL DEFAULT 0, 
	`itemproptype_ispropitemdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemproptype_ispropitemstockdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemproptype_ispropitemassetdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemproptype_name` (`itemproptype_name`),
	PRIMARY KEY (`itemproptype_id`)
) 
ENGINE=InnoDB
COMMENT='Properties Type, utnuk Item, Item Stock dan Item Asset';


ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_name` varchar(30) NOT NULL  AFTER `itemproptype_id`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_group` varchar(20) NOT NULL  AFTER `itemproptype_name`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_descr` varchar(90)   AFTER `itemproptype_group`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_order` int(7)  DEFAULT 0 AFTER `itemproptype_descr`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_isitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_order`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_isitemstock` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitem`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_isitemasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitemstock`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_ispropitemdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitemasset`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_ispropitemstockdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_ispropitemdisabled`;
ALTER TABLE `mst_itemproptype` ADD COLUMN IF NOT EXISTS  `itemproptype_ispropitemassetdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_ispropitemstockdisabled`;


ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_name` varchar(30) NOT NULL  AFTER `itemproptype_id`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_group` varchar(20) NOT NULL  AFTER `itemproptype_name`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_descr` varchar(90)   AFTER `itemproptype_group`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_order` int(7)  DEFAULT 0 AFTER `itemproptype_descr`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_isitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_order`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_isitemstock` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitem`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_isitemasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitemstock`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_ispropitemdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_isitemasset`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_ispropitemstockdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_ispropitemdisabled`;
ALTER TABLE `mst_itemproptype` MODIFY COLUMN IF EXISTS  `itemproptype_ispropitemassetdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemproptype_ispropitemstockdisabled`;


ALTER TABLE `mst_itemproptype` ADD CONSTRAINT `itemproptype_name` UNIQUE IF NOT EXISTS  (`itemproptype_name`);







