-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemassetmovemodel`;


CREATE TABLE IF NOT EXISTS `mst_itemassetmovemodel` (
	`itemassetmovemodel_id` varchar(10) NOT NULL , 
	`itemassetmovemodel_name` varchar(30) NOT NULL , 
	`itemassetmovemodel_descr` varchar(90)  , 
	`inquirymodel_id` varchar(10) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`itemassetmovemodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovemodel_isdept` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovemodel_isemployee` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovemodel_issite` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovemodel_isroom` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemassetmovemodel_name` (`itemassetmovemodel_name`),
	PRIMARY KEY (`itemassetmovemodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Asset Move';


ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_name` varchar(30) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_descr` varchar(90)   AFTER `itemassetmovemodel_name`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_id` varchar(10) NOT NULL  AFTER `itemassetmovemodel_descr`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `inquirymodel_id`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_id`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isdateinterval`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isdept`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isemployee`;
ALTER TABLE `mst_itemassetmovemodel` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_issite`;


ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_name` varchar(30) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_descr` varchar(90)   AFTER `itemassetmovemodel_name`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `inquirymodel_id` varchar(10) NOT NULL  AFTER `itemassetmovemodel_descr`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `inquirymodel_id`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_id`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isdateinterval`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isdept`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_isemployee`;
ALTER TABLE `mst_itemassetmovemodel` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovemodel_issite`;


ALTER TABLE `mst_itemassetmovemodel` ADD CONSTRAINT `itemassetmovemodel_name` UNIQUE IF NOT EXISTS  (`itemassetmovemodel_name`);

ALTER TABLE `mst_itemassetmovemodel` ADD KEY IF NOT EXISTS `inquirymodel_id` (`inquirymodel_id`);
ALTER TABLE `mst_itemassetmovemodel` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);

ALTER TABLE `mst_itemassetmovemodel` ADD CONSTRAINT `fk_mst_itemassetmovemodel_mst_inquirymodel` FOREIGN KEY IF NOT EXISTS  (`inquirymodel_id`) REFERENCES `mst_inquirymodel` (`inquirymodel_id`);
ALTER TABLE `mst_itemassetmovemodel` ADD CONSTRAINT `fk_mst_itemassetmovemodel_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);


INSERT INTO mst_itemassetmovemodel (`itemassetmovemodel_id`, `itemassetmovemodel_name`, `inquirymodel_id`, `trxmodel_id`, `itemassetmovemodel_isdateinterval`, `itemassetmovemodel_isdept`, `itemassetmovemodel_isemployee`, `itemassetmovemodel_issite`, `itemassetmovemodel_isroom`, `_createby`, `_createdate`) VALUES ('M', 'MUTASI', 'M', 'USE', '0', '1', '1', '1', '1', 'root', NOW());
INSERT INTO mst_itemassetmovemodel (`itemassetmovemodel_id`, `itemassetmovemodel_name`, `inquirymodel_id`, `trxmodel_id`, `itemassetmovemodel_isdateinterval`, `itemassetmovemodel_isdept`, `itemassetmovemodel_isemployee`, `itemassetmovemodel_issite`, `itemassetmovemodel_isroom`, `_createby`, `_createdate`) VALUES ('P', 'PEMINJAMAN', 'B', 'USE', '1', '1', '1', '1', '1', 'root', NOW());



