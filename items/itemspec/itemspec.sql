CREATE TABLE `mst_itemspec` (
	`itemspec_id` varchar(10) NOT NULL , 
	`itemspec_name` varchar(90) NOT NULL , 
	`itemspec_descr` varchar(255)  , 
	`itemspec_isnumber` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemspec_name` (`itemspec_name`),
	PRIMARY KEY (`itemspec_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Spesifikasi Item';




INSERT INTO mst_itemspec (`itemspec_id`, `itemspec_name`, `itemspec_isnumber`, `_createby`, `_createdate`) VALUES ('RAM', 'RAM (Gb)', '1', 'root', NOW());
INSERT INTO mst_itemspec (`itemspec_id`, `itemspec_name`, `_createby`, `_createdate`) VALUES ('PROC', 'PROCESSOR', 'root', NOW());
INSERT INTO mst_itemspec (`itemspec_id`, `itemspec_name`, `_createby`, `_createdate`) VALUES ('CAMF', 'CAM-FRONT', 'root', NOW());
INSERT INTO mst_itemspec (`itemspec_id`, `itemspec_name`, `_createby`, `_createdate`) VALUES ('CAMR', 'CAM-REAR', 'root', NOW());
INSERT INTO mst_itemspec (`itemspec_id`, `itemspec_name`, `_createby`, `_createdate`) VALUES ('BAT', 'BATTERY', 'root', NOW());



