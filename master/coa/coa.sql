-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coa`;


CREATE TABLE IF NOT EXISTS `mst_coa` (
	`coa_id` varchar(17) NOT NULL , 
	`coagroup_id` varchar(17) NOT NULL , 
	`coa_name` varchar(255)  , 
	`coa_nameshort` varchar(255)  , 
	`curr_id` varchar(10)  , 
	`coa_dk` varchar(1) NOT NULL , 
	`coa_mp` int(1) NOT NULL DEFAULT 1, 
	`coa_descr` varchar(255)  , 
	`coa_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_id` varchar(10) NOT NULL , 
	`coareport_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coa_name` (`coa_name`),
	PRIMARY KEY (`coa_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar COA akunting';


ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coagroup_id` varchar(17) NOT NULL  AFTER `coa_id`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_name` varchar(255)   AFTER `coagroup_id`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_nameshort` varchar(255)   AFTER `coa_name`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10)   AFTER `coa_nameshort`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_dk` varchar(1) NOT NULL  AFTER `curr_id`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_mp` int(1) NOT NULL DEFAULT 1 AFTER `coa_dk`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_descr` varchar(255)   AFTER `coa_mp`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coa_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `coa_descr`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coamodel_id` varchar(10) NOT NULL  AFTER `coa_isdisabled`;
ALTER TABLE `mst_coa` ADD COLUMN IF NOT EXISTS  `coareport_id` varchar(10) NOT NULL  AFTER `coamodel_id`;


ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coagroup_id` varchar(17) NOT NULL   AFTER `coa_id`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_name` varchar(255)    AFTER `coagroup_id`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_nameshort` varchar(255)    AFTER `coa_name`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10)    AFTER `coa_nameshort`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_dk` varchar(1) NOT NULL   AFTER `curr_id`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_mp` int(1) NOT NULL DEFAULT 1  AFTER `coa_dk`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_descr` varchar(255)    AFTER `coa_mp`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coa_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `coa_descr`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coamodel_id` varchar(10) NOT NULL   AFTER `coa_isdisabled`;
ALTER TABLE `mst_coa` MODIFY COLUMN IF EXISTS  `coareport_id` varchar(10) NOT NULL   AFTER `coamodel_id`;


ALTER TABLE `mst_coa` ADD CONSTRAINT `coa_name` UNIQUE IF NOT EXISTS  (`coa_name`);

ALTER TABLE `mst_coa` ADD KEY IF NOT EXISTS `coagroup_id` (`coagroup_id`);
ALTER TABLE `mst_coa` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `mst_coa` ADD KEY IF NOT EXISTS `coamodel_id` (`coamodel_id`);
ALTER TABLE `mst_coa` ADD KEY IF NOT EXISTS `coareport_id` (`coareport_id`);

ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coagroup` FOREIGN KEY IF NOT EXISTS  (`coagroup_id`) REFERENCES `mst_coagroup` (`coagroup_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coamodel` FOREIGN KEY IF NOT EXISTS  (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coareport` FOREIGN KEY IF NOT EXISTS  (`coareport_id`) REFERENCES `mst_coareport` (`coareport_id`);





