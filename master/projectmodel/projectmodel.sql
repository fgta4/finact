-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_projectmodel`;


CREATE TABLE `mst_projectmodel` (
	`projectmodel_id` varchar(10) NOT NULL , 
	`projectmodel_name` varchar(30) NOT NULL , 
	`projectmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`projectmodel_descr` varchar(90)  , 
	`projecttype_id` varchar(10) NOT NULL , 
	`fg_accbudget_id` varchar(20)  , 
	`fg_coa_id` varchar(17)  , 
	`sl_accbudget_id` varchar(20)  , 
	`sl_coa_id` varchar(17)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projectmodel_name` (`projectmodel_name`),
	PRIMARY KEY (`projectmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Project Type';

ALTER TABLE `mst_projectmodel` ADD KEY `projecttype_id` (`projecttype_id`);
ALTER TABLE `mst_projectmodel` ADD KEY `fg_accbudget_id` (`fg_accbudget_id`);
ALTER TABLE `mst_projectmodel` ADD KEY `fg_coa_id` (`fg_coa_id`);
ALTER TABLE `mst_projectmodel` ADD KEY `sl_accbudget_id` (`sl_accbudget_id`);
ALTER TABLE `mst_projectmodel` ADD KEY `sl_coa_id` (`sl_coa_id`);

ALTER TABLE `mst_projectmodel` ADD CONSTRAINT `fk_mst_projectmodel_mst_projecttype` FOREIGN KEY (`projecttype_id`) REFERENCES `mst_projecttype` (`projecttype_id`);
ALTER TABLE `mst_projectmodel` ADD CONSTRAINT `fk_mst_projectmodel_mst_accbudget` FOREIGN KEY (`fg_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_projectmodel` ADD CONSTRAINT `fk_mst_projectmodel_mst_coa` FOREIGN KEY (`fg_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_projectmodel` ADD CONSTRAINT `fk_mst_projectmodel_mst_accbudget_2` FOREIGN KEY (`sl_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_projectmodel` ADD CONSTRAINT `fk_mst_projectmodel_mst_coa_2` FOREIGN KEY (`sl_coa_id`) REFERENCES `mst_coa` (`coa_id`);





