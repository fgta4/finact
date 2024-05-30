-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemstockunitclose`;


CREATE TABLE IF NOT EXISTS `mst_itemstockunitclose` (
	`itemstockunitclose_id` varchar(15) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`itemstockunit_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstockunit_closeby` varchar(14)  , 
	`itemstockunit_closedate` date  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemstockunitclose_unitperiode` (`unit_id`, `periodemo_id`),
	PRIMARY KEY (`itemstockunitclose_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Periode Bulanan';


ALTER TABLE `mst_itemstockunitclose` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `itemstockunitclose_id`;
ALTER TABLE `mst_itemstockunitclose` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `mst_itemstockunitclose` ADD COLUMN IF NOT EXISTS  `itemstockunit_isclosed` tinyint(1) NOT NULL DEFAULT 0 AFTER `unit_id`;
ALTER TABLE `mst_itemstockunitclose` ADD COLUMN IF NOT EXISTS  `itemstockunit_closeby` varchar(14)   AFTER `itemstockunit_isclosed`;
ALTER TABLE `mst_itemstockunitclose` ADD COLUMN IF NOT EXISTS  `itemstockunit_closedate` date   AFTER `itemstockunit_closeby`;


ALTER TABLE `mst_itemstockunitclose` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `itemstockunitclose_id`;
ALTER TABLE `mst_itemstockunitclose` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `mst_itemstockunitclose` MODIFY COLUMN IF EXISTS  `itemstockunit_isclosed` tinyint(1) NOT NULL DEFAULT 0 AFTER `unit_id`;
ALTER TABLE `mst_itemstockunitclose` MODIFY COLUMN IF EXISTS  `itemstockunit_closeby` varchar(14)   AFTER `itemstockunit_isclosed`;
ALTER TABLE `mst_itemstockunitclose` MODIFY COLUMN IF EXISTS  `itemstockunit_closedate` date   AFTER `itemstockunit_closeby`;


ALTER TABLE `mst_itemstockunitclose` ADD CONSTRAINT `itemstockunitclose_unitperiode` UNIQUE IF NOT EXISTS  (`unit_id`, `periodemo_id`);

ALTER TABLE `mst_itemstockunitclose` ADD KEY IF NOT EXISTS  `periodemo_id` (`periodemo_id`);
ALTER TABLE `mst_itemstockunitclose` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);

ALTER TABLE `mst_itemstockunitclose` ADD CONSTRAINT `fk_mst_itemstockunitclose_mst_merchitemvar` FOREIGN KEY IF NOT EXISTS (`periodemo_id`) REFERENCES `mst_merchitemvar` (`merchitemvar_id`);
ALTER TABLE `mst_itemstockunitclose` ADD CONSTRAINT `fk_mst_itemstockunitclose_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);





