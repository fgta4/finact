-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_pettycash`;


CREATE TABLE IF NOT EXISTS `trn_pettycash` (
	`pettycash_id` varchar(14) NOT NULL , 
	`pettycash_date` date NOT NULL , 
	`site_id` varchar(20) NOT NULL , 
	`accpettycash_id` varchar(17) NOT NULL , 
	`pettycash_descr` varchar(255)  , 
	`empl_id` varchar(30)  , 
	`cust_id` varchar(14)  , 
	`pettycash_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`pettycash_version` int(4) NOT NULL DEFAULT 0, 
	`pettycash_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`pettycash_commitby` varchar(14)  , 
	`pettycash_commitdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`pettycash_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Transaksi Pettycash';


ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_date` date NOT NULL  AFTER `pettycash_id`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `site_id` varchar(20) NOT NULL  AFTER `pettycash_date`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `accpettycash_id` varchar(17) NOT NULL  AFTER `site_id`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_descr` varchar(255)   AFTER `accpettycash_id`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `empl_id` varchar(30)   AFTER `pettycash_descr`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14)   AFTER `empl_id`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `cust_id`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_version` int(4) NOT NULL DEFAULT 0 AFTER `pettycash_value`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `pettycash_version`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_commitby` varchar(14)   AFTER `pettycash_iscommit`;
ALTER TABLE `trn_pettycash` ADD COLUMN IF NOT EXISTS  `pettycash_commitdate` datetime   AFTER `pettycash_commitby`;


ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_date` date NOT NULL  AFTER `pettycash_id`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `site_id` varchar(20) NOT NULL  AFTER `pettycash_date`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `accpettycash_id` varchar(17) NOT NULL  AFTER `site_id`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_descr` varchar(255)   AFTER `accpettycash_id`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `empl_id` varchar(30)   AFTER `pettycash_descr`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14)   AFTER `empl_id`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `cust_id`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_version` int(4) NOT NULL DEFAULT 0 AFTER `pettycash_value`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `pettycash_version`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_commitby` varchar(14)   AFTER `pettycash_iscommit`;
ALTER TABLE `trn_pettycash` MODIFY COLUMN IF EXISTS  `pettycash_commitdate` datetime   AFTER `pettycash_commitby`;



ALTER TABLE `trn_pettycash` ADD KEY IF NOT EXISTS `site_id` (`site_id`);
ALTER TABLE `trn_pettycash` ADD KEY IF NOT EXISTS `accpettycash_id` (`accpettycash_id`);
ALTER TABLE `trn_pettycash` ADD KEY IF NOT EXISTS `empl_id` (`empl_id`);
ALTER TABLE `trn_pettycash` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `trn_pettycash` ADD CONSTRAINT `fk_trn_pettycash_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_pettycash` ADD CONSTRAINT `fk_trn_pettycash_mst_accpettycash` FOREIGN KEY IF NOT EXISTS  (`accpettycash_id`) REFERENCES `mst_accpettycash` (`accpettycash_id`);
ALTER TABLE `trn_pettycash` ADD CONSTRAINT `fk_trn_pettycash_mst_empl` FOREIGN KEY IF NOT EXISTS  (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_pettycash` ADD CONSTRAINT `fk_trn_pettycash_mst_cust` FOREIGN KEY IF NOT EXISTS  (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





