-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accbudgetmodel`;


CREATE TABLE `mst_accbudgetmodel` (
	`accbudgetmodel_id` varchar(10) NOT NULL , 
	`accbudgetmodel_name` varchar(30) NOT NULL , 
	`accbudgetmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetmodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetmodel_name` (`accbudgetmodel_name`),
	PRIMARY KEY (`accbudgetmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Account Budget';







