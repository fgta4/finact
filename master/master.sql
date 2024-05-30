CREATE TABLE `mst_coatype` (
	`coatype_id` varchar(10) NOT NULL , 
	`coatype_name` varchar(30)  , 
	`coatype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coatype_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coatype_name` (`coatype_name`),
	PRIMARY KEY (`coatype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe-tipe COA';




CREATE TABLE `mst_coamodel` (
	`coamodel_id` varchar(10) NOT NULL , 
	`coamodel_name` varchar(30) NOT NULL , 
	`coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coamodel_name` (`coamodel_name`),
	PRIMARY KEY (`coamodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar model COA';










