-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accpettycash`;


CREATE TABLE IF NOT EXISTS `mst_accpettycash` (
	`accpettycash_id` varchar(17) NOT NULL , 
	`accpettycash_name` varchar(90) NOT NULL , 
	`accpettycash_descr` varchar(255)  , 
	`accpettycash_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accpettycash_io` int(1) NOT NULL , 
	`coa_id` varchar(17)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accpettycash_name` (`accpettycash_name`),
	PRIMARY KEY (`accpettycash_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Account Pettycash';


ALTER TABLE `mst_accpettycash` ADD COLUMN IF NOT EXISTS  `accpettycash_name` varchar(90) NOT NULL  AFTER `accpettycash_id`;
ALTER TABLE `mst_accpettycash` ADD COLUMN IF NOT EXISTS  `accpettycash_descr` varchar(255)   AFTER `accpettycash_name`;
ALTER TABLE `mst_accpettycash` ADD COLUMN IF NOT EXISTS  `accpettycash_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `accpettycash_descr`;
ALTER TABLE `mst_accpettycash` ADD COLUMN IF NOT EXISTS  `accpettycash_io` int(1) NOT NULL  AFTER `accpettycash_isdisabled`;
ALTER TABLE `mst_accpettycash` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17)   AFTER `accpettycash_io`;


ALTER TABLE `mst_accpettycash` MODIFY COLUMN IF EXISTS  `accpettycash_name` varchar(90) NOT NULL  AFTER `accpettycash_id`;
ALTER TABLE `mst_accpettycash` MODIFY COLUMN IF EXISTS  `accpettycash_descr` varchar(255)   AFTER `accpettycash_name`;
ALTER TABLE `mst_accpettycash` MODIFY COLUMN IF EXISTS  `accpettycash_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `accpettycash_descr`;
ALTER TABLE `mst_accpettycash` MODIFY COLUMN IF EXISTS  `accpettycash_io` int(1) NOT NULL  AFTER `accpettycash_isdisabled`;
ALTER TABLE `mst_accpettycash` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17)   AFTER `accpettycash_io`;


ALTER TABLE `mst_accpettycash` ADD CONSTRAINT `accpettycash_name` UNIQUE IF NOT EXISTS  (`accpettycash_name`);

ALTER TABLE `mst_accpettycash` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);

ALTER TABLE `mst_accpettycash` ADD CONSTRAINT `fk_mst_accpettycash_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);





