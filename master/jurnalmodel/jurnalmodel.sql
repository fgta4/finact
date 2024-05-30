-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_jurnalmodel`;


CREATE TABLE IF NOT EXISTS `mst_jurnalmodel` (
	`jurnalmodel_id` varchar(10) NOT NULL , 
	`jurnalmodel_name` varchar(30) NOT NULL , 
	`jurnalmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnalmodel_descr` varchar(90)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalmodel_name` (`jurnalmodel_name`),
	PRIMARY KEY (`jurnalmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Jurnal';


ALTER TABLE `mst_jurnalmodel` ADD COLUMN IF NOT EXISTS  `jurnalmodel_name` varchar(30) NOT NULL  AFTER `jurnalmodel_id`;
ALTER TABLE `mst_jurnalmodel` ADD COLUMN IF NOT EXISTS  `jurnalmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnalmodel_name`;
ALTER TABLE `mst_jurnalmodel` ADD COLUMN IF NOT EXISTS  `jurnalmodel_descr` varchar(90)   AFTER `jurnalmodel_isdisabled`;


ALTER TABLE `mst_jurnalmodel` MODIFY COLUMN IF EXISTS  `jurnalmodel_name` varchar(30) NOT NULL  AFTER `jurnalmodel_id`;
ALTER TABLE `mst_jurnalmodel` MODIFY COLUMN IF EXISTS  `jurnalmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnalmodel_name`;
ALTER TABLE `mst_jurnalmodel` MODIFY COLUMN IF EXISTS  `jurnalmodel_descr` varchar(90)   AFTER `jurnalmodel_isdisabled`;


ALTER TABLE `mst_jurnalmodel` ADD CONSTRAINT `jurnalmodel_name` UNIQUE IF NOT EXISTS  (`jurnalmodel_name`);







