-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accfin`;
-- drop table if exists `mst_accfincoa`;


CREATE TABLE `mst_accfin` (
	`accfin_id` varchar(20) NOT NULL , 
	`accfin_name` varchar(90) NOT NULL , 
	`accfin_descr` varchar(255)  , 
	`accfin_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accfin_allowallcoa` tinyint(1) NOT NULL DEFAULT 0, 
	`accfingroup_id` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accfin_name` (`accfin_name`),
	PRIMARY KEY (`accfin_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Account Finance';

ALTER TABLE `mst_accfin` ADD KEY `accfingroup_id` (`accfingroup_id`);

ALTER TABLE `mst_accfin` ADD CONSTRAINT `fk_mst_accfin_mst_accfingroup` FOREIGN KEY (`accfingroup_id`) REFERENCES `mst_accfingroup` (`accfingroup_id`);





CREATE TABLE `mst_accfincoa` (
	`accfincoa_id` varchar(14) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`accfin_id` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`accfincoa_id`)
) 
ENGINE=InnoDB
COMMENT='COA Finance';

ALTER TABLE `mst_accfincoa` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `mst_accfincoa` ADD KEY `accfin_id` (`accfin_id`);

ALTER TABLE `mst_accfincoa` ADD CONSTRAINT `fk_mst_accfincoa_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_accfincoa` ADD CONSTRAINT `fk_mst_accfincoa_mst_accfin` FOREIGN KEY (`accfin_id`) REFERENCES `mst_accfin` (`accfin_id`);





