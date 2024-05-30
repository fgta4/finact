-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_orderinaddcost`;


CREATE TABLE IF NOT EXISTS `mst_orderinaddcost` (
	`orderinaddcost_id` varchar(10) NOT NULL , 
	`orderinaddcost_name` varchar(30)  , 
	`orderinaddcost_descr` varchar(255)  , 
	`orderinaddcost_ispercent` tinyint(1) NOT NULL DEFAULT 0, 
	`orderinaddcost_percent` decimal(3, 0) NOT NULL DEFAULT 0, 
	`orderinaddcost_fixvalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`addcost_coa_id` varchar(17) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderinaddcost_name` (`orderinaddcost_name`),
	PRIMARY KEY (`orderinaddcost_id`)
) 
ENGINE=InnoDB
COMMENT='Additional Cost for Orderin';


ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `orderinaddcost_name` varchar(30)   AFTER `orderinaddcost_id`;
ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `orderinaddcost_descr` varchar(255)   AFTER `orderinaddcost_name`;
ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `orderinaddcost_ispercent` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderinaddcost_descr`;
ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `orderinaddcost_percent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `orderinaddcost_ispercent`;
ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `orderinaddcost_fixvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `orderinaddcost_percent`;
ALTER TABLE `mst_orderinaddcost` ADD COLUMN IF NOT EXISTS  `addcost_coa_id` varchar(17) NOT NULL  AFTER `orderinaddcost_fixvalue`;


ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `orderinaddcost_name` varchar(30)   AFTER `orderinaddcost_id`;
ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `orderinaddcost_descr` varchar(255)   AFTER `orderinaddcost_name`;
ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `orderinaddcost_ispercent` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderinaddcost_descr`;
ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `orderinaddcost_percent` decimal(3, 0) NOT NULL DEFAULT 0 AFTER `orderinaddcost_ispercent`;
ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `orderinaddcost_fixvalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `orderinaddcost_percent`;
ALTER TABLE `mst_orderinaddcost` MODIFY COLUMN IF EXISTS  `addcost_coa_id` varchar(17) NOT NULL  AFTER `orderinaddcost_fixvalue`;


ALTER TABLE `mst_orderinaddcost` ADD CONSTRAINT `orderinaddcost_name` UNIQUE IF NOT EXISTS  (`orderinaddcost_name`);

ALTER TABLE `mst_orderinaddcost` ADD KEY IF NOT EXISTS `addcost_coa_id` (`addcost_coa_id`);

ALTER TABLE `mst_orderinaddcost` ADD CONSTRAINT `fk_mst_orderinaddcost_mst_coa` FOREIGN KEY IF NOT EXISTS  (`addcost_coa_id`) REFERENCES `mst_coa` (`coa_id`);





