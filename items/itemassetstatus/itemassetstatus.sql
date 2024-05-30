-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemassetstatus`;


CREATE TABLE `mst_itemassetstatus` (
	`itemassetstatus_id` varchar(2) NOT NULL , 
	`itemassetstatus_name` varchar(60) NOT NULL , 
	`itemasset_isbroken` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_islost` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemassetstatus_name` (`itemassetstatus_name`),
	PRIMARY KEY (`itemassetstatus_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Status Item Asset';




INSERT INTO mst_itemassetstatus (`itemassetstatus_id`, `itemassetstatus_name`, `_createby`, `_createdate`) VALUES ('OK', 'OK', 'root', NOW());
INSERT INTO mst_itemassetstatus (`itemassetstatus_id`, `itemassetstatus_name`, `itemasset_isbroken`, `_createby`, `_createdate`) VALUES ('PU', 'PARTIALLY BROKEN - USABLE', '1', 'root', NOW());
INSERT INTO mst_itemassetstatus (`itemassetstatus_id`, `itemassetstatus_name`, `itemasset_isbroken`, `_createby`, `_createdate`) VALUES ('PN', 'PARTIALLY BROKEN - NEED REPAIR', '1', 'root', NOW());
INSERT INTO mst_itemassetstatus (`itemassetstatus_id`, `itemassetstatus_name`, `itemasset_isbroken`, `_createby`, `_createdate`) VALUES ('BR', 'TOTAL BROKEN', '1', 'root', NOW());
INSERT INTO mst_itemassetstatus (`itemassetstatus_id`, `itemassetstatus_name`, `itemasset_islost`, `_createby`, `_createdate`) VALUES ('LO', 'LOST', '1', 'root', NOW());



