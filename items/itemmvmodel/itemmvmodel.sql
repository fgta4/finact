-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemmvmodel`;


CREATE TABLE IF NOT EXISTS `mst_itemmvmodel` (
	`itemmvmodel_id` varchar(10) NOT NULL , 
	`itemmvmodel_name` varchar(30) NOT NULL , 
	`itemmvmodel_descr` varchar(90)  , 
	`itemmvmodel_factor` int(1) NOT NULL DEFAULT 1, 
	`itemmvmodel_issitemove` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmvmodel_isunitmeasurementchange` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemmvmodel_name` (`itemmvmodel_name`),
	PRIMARY KEY (`itemmvmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Moving Item';


ALTER TABLE `mst_itemmvmodel` ADD COLUMN IF NOT EXISTS  `itemmvmodel_name` varchar(30) NOT NULL  AFTER `itemmvmodel_id`;
ALTER TABLE `mst_itemmvmodel` ADD COLUMN IF NOT EXISTS  `itemmvmodel_descr` varchar(90)   AFTER `itemmvmodel_name`;
ALTER TABLE `mst_itemmvmodel` ADD COLUMN IF NOT EXISTS  `itemmvmodel_factor` int(1) NOT NULL DEFAULT 1 AFTER `itemmvmodel_descr`;
ALTER TABLE `mst_itemmvmodel` ADD COLUMN IF NOT EXISTS  `itemmvmodel_issitemove` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmvmodel_factor`;
ALTER TABLE `mst_itemmvmodel` ADD COLUMN IF NOT EXISTS  `itemmvmodel_isunitmeasurementchange` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmvmodel_issitemove`;


ALTER TABLE `mst_itemmvmodel` MODIFY COLUMN IF EXISTS  `itemmvmodel_name` varchar(30) NOT NULL  AFTER `itemmvmodel_id`;
ALTER TABLE `mst_itemmvmodel` MODIFY COLUMN IF EXISTS  `itemmvmodel_descr` varchar(90)   AFTER `itemmvmodel_name`;
ALTER TABLE `mst_itemmvmodel` MODIFY COLUMN IF EXISTS  `itemmvmodel_factor` int(1) NOT NULL DEFAULT 1 AFTER `itemmvmodel_descr`;
ALTER TABLE `mst_itemmvmodel` MODIFY COLUMN IF EXISTS  `itemmvmodel_issitemove` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmvmodel_factor`;
ALTER TABLE `mst_itemmvmodel` MODIFY COLUMN IF EXISTS  `itemmvmodel_isunitmeasurementchange` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmvmodel_issitemove`;


ALTER TABLE `mst_itemmvmodel` ADD CONSTRAINT `itemmvmodel_name` UNIQUE IF NOT EXISTS  (`itemmvmodel_name`);




INSERT INTO mst_itemmvmodel (`itemmvmodel_id`, `itemmvmodel_name`, `_createby`, `_createdate`) VALUES ('RV', 'RV', 'root', NOW());
INSERT INTO mst_itemmvmodel (`itemmvmodel_id`, `itemmvmodel_name`, `itemmvmodel_issitemove`, `_createby`, `_createdate`) VALUES ('TR', 'TR', '1', 'root', NOW());



