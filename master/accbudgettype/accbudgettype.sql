CREATE TABLE `mst_accbudgettype` (
	`accbudgettype_id` varchar(10) NOT NULL , 
	`accbudgettype_name` varchar(30) NOT NULL , 
	`accbudgettype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgettype_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgettype_name` (`accbudgettype_name`),
	PRIMARY KEY (`accbudgettype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Type Account Budget';







