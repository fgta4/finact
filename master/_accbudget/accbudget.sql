CREATE TABLE `mst_accbudget` (
	`accbudget_id` varchar(20) NOT NULL , 
	`accbudget_name` varchar(90) NOT NULL , 
	`accbudget_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudget_descr` varchar(255)  , 
	`accbudgetgroup_id` varchar(17) NOT NULL , 
	`accbudgetmodel_id` varchar(10) NOT NULL , 
	`accbudgettype_id` varchar(10) NOT NULL , 
	`coa_id` varchar(17)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudget_name` (`accbudget_name`),
	PRIMARY KEY (`accbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Account Budget';

ALTER TABLE `mst_accbudget` ADD KEY `accbudgetgroup_id` (`accbudgetgroup_id`);
ALTER TABLE `mst_accbudget` ADD KEY `accbudgetmodel_id` (`accbudgetmodel_id`);
ALTER TABLE `mst_accbudget` ADD KEY `accbudgettype_id` (`accbudgettype_id`);
ALTER TABLE `mst_accbudget` ADD KEY `coa_id` (`coa_id`);

ALTER TABLE `mst_accbudget` ADD CONSTRAINT `fk_mst_accbudget_mst_accbudgetgroup` FOREIGN KEY (`accbudgetgroup_id`) REFERENCES `mst_accbudgetgroup` (`accbudgetgroup_id`);
ALTER TABLE `mst_accbudget` ADD CONSTRAINT `fk_mst_accbudget_mst_accbudgetmodel` FOREIGN KEY (`accbudgetmodel_id`) REFERENCES `mst_accbudgetmodel` (`accbudgetmodel_id`);
ALTER TABLE `mst_accbudget` ADD CONSTRAINT `fk_mst_accbudget_mst_accbudgettype` FOREIGN KEY (`accbudgettype_id`) REFERENCES `mst_accbudgettype` (`accbudgettype_id`);
ALTER TABLE `mst_accbudget` ADD CONSTRAINT `fk_mst_accbudget_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);





CREATE TABLE `mst_accbudgetcoa` (
	`accbudgetcoa_id` varchar(14) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetcoa_coa_id` (`coa_id`),
	PRIMARY KEY (`accbudgetcoa_id`)
) 
ENGINE=InnoDB
COMMENT='Coa Account Budget';

ALTER TABLE `mst_accbudgetcoa` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `mst_accbudgetcoa` ADD KEY `accbudget_id` (`accbudget_id`);

ALTER TABLE `mst_accbudgetcoa` ADD CONSTRAINT `fk_mst_accbudgetcoa_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_accbudgetcoa` ADD CONSTRAINT `fk_mst_accbudgetcoa_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);





