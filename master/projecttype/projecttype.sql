-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_projecttype`;


CREATE TABLE `mst_projecttype` (
	`projecttype_id` varchar(10) NOT NULL , 
	`projecttype_name` varchar(30) NOT NULL , 
	`projecttype_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projecttype_name` (`projecttype_name`),
	PRIMARY KEY (`projecttype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Project Type';




INSERT INTO mst_projecttype (`projecttype_id`, `projecttype_name`, `_createby`, `_createdate`) VALUES ('CAP', 'CAPITAL EXPENSE', 'root', NOW());
INSERT INTO mst_projecttype (`projecttype_id`, `projecttype_name`, `_createby`, `_createdate`) VALUES ('EVT', 'EVENT', 'root', NOW());
INSERT INTO mst_projecttype (`projecttype_id`, `projecttype_name`, `_createby`, `_createdate`) VALUES ('PRO', 'PRODUCTION', 'root', NOW());
INSERT INTO mst_projecttype (`projecttype_id`, `projecttype_name`, `_createby`, `_createdate`) VALUES ('SVC', 'SERVICE', 'root', NOW());



