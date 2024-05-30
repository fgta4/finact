-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_depremodel`;


CREATE TABLE IF NOT EXISTS `mst_depremodel` (
	`depremodel_id` varchar(10) NOT NULL , 
	`depremodel_name` varchar(90) NOT NULL , 
	`depremodel_descr` varchar(255)  , 
	`depremodel_formulaname` varchar(50) NOT NULL , 
	`depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `depremodel_name` (`depremodel_name`),
	PRIMARY KEY (`depremodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model';


ALTER TABLE `mst_depremodel` ADD COLUMN IF NOT EXISTS  `depremodel_name` varchar(90) NOT NULL  AFTER `depremodel_id`;
ALTER TABLE `mst_depremodel` ADD COLUMN IF NOT EXISTS  `depremodel_descr` varchar(255)   AFTER `depremodel_name`;
ALTER TABLE `mst_depremodel` ADD COLUMN IF NOT EXISTS  `depremodel_formulaname` varchar(50) NOT NULL  AFTER `depremodel_descr`;
ALTER TABLE `mst_depremodel` ADD COLUMN IF NOT EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0 AFTER `depremodel_formulaname`;


ALTER TABLE `mst_depremodel` MODIFY COLUMN IF EXISTS  `depremodel_name` varchar(90) NOT NULL  AFTER `depremodel_id`;
ALTER TABLE `mst_depremodel` MODIFY COLUMN IF EXISTS  `depremodel_descr` varchar(255)   AFTER `depremodel_name`;
ALTER TABLE `mst_depremodel` MODIFY COLUMN IF EXISTS  `depremodel_formulaname` varchar(50) NOT NULL  AFTER `depremodel_descr`;
ALTER TABLE `mst_depremodel` MODIFY COLUMN IF EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0 AFTER `depremodel_formulaname`;


ALTER TABLE `mst_depremodel` ADD CONSTRAINT `depremodel_name` UNIQUE IF NOT EXISTS  (`depremodel_name`);




INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `depremodel_isautocalc`, `_createby`, `_createdate`) VALUES ('NO', 'NONE (DIRECT)', 'DIRECT', '0', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `depremodel_isautocalc`, `_createby`, `_createdate`) VALUES ('MN', 'MANUAL', '', '0', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `depremodel_isautocalc`, `_createby`, `_createdate`) VALUES ('SL', 'STRAIGHT LINE', 'STRAIGHTLINE', '1', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `depremodel_isautocalc`, `_createby`, `_createdate`) VALUES ('DD', 'DOUBLE DECLINING BALANCE', '', '1', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `depremodel_isautocalc`, `_createby`, `_createdate`) VALUES ('SY', 'SUM OF YEARS DIGIT', '', '1', 'root', NOW());



