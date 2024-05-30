-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemmanage`;


CREATE TABLE IF NOT EXISTS `mst_itemmanage` (
	`itemmanage_id` varchar(2) NOT NULL , 
	`itemmanage_name` varchar(20) NOT NULL , 
	`itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemmanage_name` (`itemmanage_name`),
	PRIMARY KEY (`itemmanage_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Manage Item';


ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_name` varchar(20) NOT NULL  AFTER `itemmanage_id`;
ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_name`;
ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbyassetowner`;
ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbystockowner`;
ALTER TABLE `mst_itemmanage` ADD COLUMN IF NOT EXISTS  `itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbynonitemowner`;


ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_name` varchar(20) NOT NULL  AFTER `itemmanage_id`;
ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_name`;
ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbyassetowner`;
ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbystockowner`;
ALTER TABLE `mst_itemmanage` MODIFY COLUMN IF EXISTS  `itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbynonitemowner`;


ALTER TABLE `mst_itemmanage` ADD CONSTRAINT `itemmanage_name` UNIQUE IF NOT EXISTS  (`itemmanage_name`);







