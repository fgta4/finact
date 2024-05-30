-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_agingmodel`;


CREATE TABLE IF NOT EXISTS `mst_agingmodel` (
	`agingmodel_id` varchar(2) NOT NULL , 
	`agingmodel_name` varchar(30)  , 
	`agingmodel_descr` varchar(90)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `agingmodel_name` (`agingmodel_name`),
	PRIMARY KEY (`agingmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Aging';


ALTER TABLE `mst_agingmodel` ADD COLUMN IF NOT EXISTS  `agingmodel_name` varchar(30)   AFTER `agingmodel_id`;
ALTER TABLE `mst_agingmodel` ADD COLUMN IF NOT EXISTS  `agingmodel_descr` varchar(90)   AFTER `agingmodel_name`;


ALTER TABLE `mst_agingmodel` MODIFY COLUMN IF EXISTS  `agingmodel_name` varchar(30)   AFTER `agingmodel_id`;
ALTER TABLE `mst_agingmodel` MODIFY COLUMN IF EXISTS  `agingmodel_descr` varchar(90)   AFTER `agingmodel_name`;


ALTER TABLE `mst_agingmodel` ADD CONSTRAINT `agingmodel_name` UNIQUE IF NOT EXISTS  (`agingmodel_name`);




INSERT INTO mst_agingmodel (`agingmodel_id`, `agingmodel_name`, `_createby`, `_createdate`) VALUES ('AP', 'PAYABLE', 'root', NOW());
INSERT INTO mst_agingmodel (`agingmodel_id`, `agingmodel_name`, `_createby`, `_createdate`) VALUES ('AR', 'RECEIVABLE', 'root', NOW());



