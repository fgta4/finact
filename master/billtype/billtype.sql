CREATE TABLE `mst_billtype` (
	`billtype_id` varchar(3) NOT NULL , 
	`billtype_name` varchar(30)  , 
	`billtype_direction` varchar(3)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `billtype_name` (`billtype_name`),
	PRIMARY KEY (`billtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe bill';




INSERT INTO mst_billtype (`billtype_id`, `billtype_name`, `billtype_direction`, `_createby`, `_createdate`) VALUES ('INV', 'INVOICE', 'IN', 'root', NOW());
INSERT INTO mst_billtype (`billtype_id`, `billtype_name`, `billtype_direction`, `_createby`, `_createdate`) VALUES ('ADV', 'ADVANCE', 'IN', 'root', NOW());
INSERT INTO mst_billtype (`billtype_id`, `billtype_name`, `billtype_direction`, `_createby`, `_createdate`) VALUES ('RMB', 'REIMBURSE', 'IN', 'root', NOW());



