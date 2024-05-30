-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_billoutrowtype`;


CREATE TABLE IF NOT EXISTS `mst_billoutrowtype` (
	`billoutrowtype_id` varchar(3) NOT NULL , 
	`billoutrowtype_name` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `billoutrowtype_name` (`billoutrowtype_name`),
	PRIMARY KEY (`billoutrowtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe baris detil billout';


ALTER TABLE `mst_billoutrowtype` ADD COLUMN IF NOT EXISTS  `billoutrowtype_name` varchar(30)   AFTER `billoutrowtype_id`;


ALTER TABLE `mst_billoutrowtype` MODIFY COLUMN IF EXISTS  `billoutrowtype_name` varchar(30)   AFTER `billoutrowtype_id`;


ALTER TABLE `mst_billoutrowtype` ADD CONSTRAINT `billoutrowtype_name` UNIQUE IF NOT EXISTS  (`billoutrowtype_name`);




INSERT INTO mst_billoutrowtype (`billoutrowtype_id`, `billoutrowtype_name`, `_createby`, `_createdate`) VALUES ('ITM', 'ITEM', 'root', NOW());
INSERT INTO mst_billoutrowtype (`billoutrowtype_id`, `billoutrowtype_name`, `_createby`, `_createdate`) VALUES ('DLV', 'DELIVERY', 'root', NOW());
INSERT INTO mst_billoutrowtype (`billoutrowtype_id`, `billoutrowtype_name`, `_createby`, `_createdate`) VALUES ('DPM', 'DWNPAYMENT', 'root', NOW());



