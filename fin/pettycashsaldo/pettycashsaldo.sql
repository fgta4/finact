-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_pettycashsaldo`;


CREATE TABLE IF NOT EXISTS `trn_pettycashsaldo` (
	`pettycashsaldo_id` varchar(14) NOT NULL , 
	`pettycashsaldo_date` date NOT NULL , 
	`site_id` varchar(20) NOT NULL , 
	`pettycashsaldo_awal` decimal(14, 2) NOT NULL DEFAULT 0, 
	`pettycashsaldo_mutasi` decimal(14, 2) NOT NULL DEFAULT 0, 
	`pettycashsaldo_akhir` decimal(14, 2) NOT NULL DEFAULT 0, 
	`pettycashsaldo_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`pettycashsaldo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Saldo Pettycash';


ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `pettycashsaldo_date` date NOT NULL  AFTER `pettycashsaldo_id`;
ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `site_id` varchar(20) NOT NULL  AFTER `pettycashsaldo_date`;
ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `pettycashsaldo_awal` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `site_id`;
ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `pettycashsaldo_mutasi` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_awal`;
ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `pettycashsaldo_akhir` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_mutasi`;
ALTER TABLE `trn_pettycashsaldo` ADD COLUMN IF NOT EXISTS  `pettycashsaldo_isclosed` tinyint(1) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_akhir`;


ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `pettycashsaldo_date` date NOT NULL  AFTER `pettycashsaldo_id`;
ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `site_id` varchar(20) NOT NULL  AFTER `pettycashsaldo_date`;
ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `pettycashsaldo_awal` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `site_id`;
ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `pettycashsaldo_mutasi` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_awal`;
ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `pettycashsaldo_akhir` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_mutasi`;
ALTER TABLE `trn_pettycashsaldo` MODIFY COLUMN IF EXISTS  `pettycashsaldo_isclosed` tinyint(1) NOT NULL DEFAULT 0 AFTER `pettycashsaldo_akhir`;



ALTER TABLE `trn_pettycashsaldo` ADD KEY IF NOT EXISTS `site_id` (`site_id`);

ALTER TABLE `trn_pettycashsaldo` ADD CONSTRAINT `fk_trn_pettycashsaldo_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);





