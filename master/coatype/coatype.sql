CREATE TABLE `mst_coatype` (
	`coatype_id` varchar(10) NOT NULL , 
	`coatype_name` varchar(30)  , 
	`coatype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coatype_descr` varchar(90)  , 
	`coatype_order` int(1) NOT NULL DEFAULT 0, 
	`coareport_id` varchar(2) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coatype_name` (`coatype_name`),
	PRIMARY KEY (`coatype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe-tipe COA';

ALTER TABLE `mst_coatype` ADD KEY `coareport_id` (`coareport_id`);

ALTER TABLE `mst_coatype` ADD CONSTRAINT `fk_mst_coatype_mst_coareport` FOREIGN KEY (`coareport_id`) REFERENCES `mst_coareport` (`coareport_id`);





