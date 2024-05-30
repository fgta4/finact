-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_orderintermtype`;


CREATE TABLE IF NOT EXISTS `mst_orderintermtype` (
	`orderintermtype_id` varchar(10) NOT NULL , 
	`orderintermtype_name` varchar(30)  , 
	`orderintermtype_descr` varchar(255)  , 
	`orderintermtype_isdp` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `orderintermtype_name` (`orderintermtype_name`),
	PRIMARY KEY (`orderintermtype_id`)
) 
ENGINE=InnoDB
COMMENT='OrderIn Payment Term Type';


ALTER TABLE `mst_orderintermtype` ADD COLUMN IF NOT EXISTS  `orderintermtype_name` varchar(30)   AFTER `orderintermtype_id`;
ALTER TABLE `mst_orderintermtype` ADD COLUMN IF NOT EXISTS  `orderintermtype_descr` varchar(255)   AFTER `orderintermtype_name`;
ALTER TABLE `mst_orderintermtype` ADD COLUMN IF NOT EXISTS  `orderintermtype_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderintermtype_descr`;


ALTER TABLE `mst_orderintermtype` MODIFY COLUMN IF EXISTS  `orderintermtype_name` varchar(30)   AFTER `orderintermtype_id`;
ALTER TABLE `mst_orderintermtype` MODIFY COLUMN IF EXISTS  `orderintermtype_descr` varchar(255)   AFTER `orderintermtype_name`;
ALTER TABLE `mst_orderintermtype` MODIFY COLUMN IF EXISTS  `orderintermtype_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderintermtype_descr`;


ALTER TABLE `mst_orderintermtype` ADD CONSTRAINT `orderintermtype_name` UNIQUE IF NOT EXISTS  (`orderintermtype_name`);




INSERT INTO mst_orderintermtype (`orderintermtype_id`, `orderintermtype_name`, `orderintermtype_isdp`, `_createby`, `_createdate`) VALUES ('DP', 'DOWN PAYMENT', '1', 'root', NOW());
INSERT INTO mst_orderintermtype (`orderintermtype_id`, `orderintermtype_name`, `orderintermtype_isdp`, `_createby`, `_createdate`) VALUES ('LS', 'PELUNASAN', '0', 'root', NOW());



