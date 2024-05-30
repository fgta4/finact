-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_orderdir`;


CREATE TABLE IF NOT EXISTS `mst_orderdir` (
	`orderdir_id` varchar(1) NOT NULL , 
	`orderdir_name` varchar(30) NOT NULL , 
	`orderdir_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderdir_name` (`orderdir_name`),
	PRIMARY KEY (`orderdir_id`)
) 
ENGINE=InnoDB
COMMENT='Arah Order PO->orderout, SO->orderin';


ALTER TABLE `mst_orderdir` ADD COLUMN IF NOT EXISTS  `orderdir_name` varchar(30) NOT NULL  AFTER `orderdir_id`;
ALTER TABLE `mst_orderdir` ADD COLUMN IF NOT EXISTS  `orderdir_descr` varchar(255)   AFTER `orderdir_name`;


ALTER TABLE `mst_orderdir` MODIFY COLUMN IF EXISTS  `orderdir_name` varchar(30) NOT NULL   AFTER `orderdir_id`;
ALTER TABLE `mst_orderdir` MODIFY COLUMN IF EXISTS  `orderdir_descr` varchar(255)    AFTER `orderdir_name`;


ALTER TABLE `mst_orderdir` ADD CONSTRAINT `orderdir_name` UNIQUE IF NOT EXISTS  (`orderdir_name`);




INSERT INTO mst_orderdir (`orderdir_id`, `orderdir_name`, `orderdir_descr`, `_createby`, `_createdate`) VALUES ('I', 'IN (Sales Order)', '', 'root', NOW());
INSERT INTO mst_orderdir (`orderdir_id`, `orderdir_name`, `orderdir_descr`, `_createby`, `_createdate`) VALUES ('O', 'OUT (Purchase Order)', '', 'root', NOW());



