-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemassetmovetype`;


CREATE TABLE IF NOT EXISTS `mst_itemassetmovetype` (
	`itemassetmovetype_id` varchar(14) NOT NULL , 
	`itemassetmovetype_name` varchar(30) NOT NULL , 
	`itemassetmovetype_descr` varchar(90)  , 
	`itemassetmovemodel_id` varchar(10) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`itemassetmovetype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovetype_isdept` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovetype_isemployee` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovetype_issite` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovetype_isroom` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemassetmovetype_name` (`itemassetmovetype_name`),
	PRIMARY KEY (`itemassetmovetype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Asset Move';


ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_name` varchar(30) NOT NULL  AFTER `itemassetmovetype_id`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_descr` varchar(90)   AFTER `itemassetmovetype_name`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_id` varchar(10) NOT NULL  AFTER `itemassetmovetype_descr`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_id`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isdateinterval`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isdept`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isemployee`;
ALTER TABLE `mst_itemassetmovetype` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_issite`;


ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_name` varchar(30) NOT NULL  AFTER `itemassetmovetype_id`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_descr` varchar(90)   AFTER `itemassetmovetype_name`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_id` varchar(10) NOT NULL  AFTER `itemassetmovetype_descr`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_id`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isdateinterval`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isdept`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_isemployee`;
ALTER TABLE `mst_itemassetmovetype` MODIFY COLUMN IF EXISTS  `itemassetmovetype_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmovetype_issite`;


ALTER TABLE `mst_itemassetmovetype` ADD CONSTRAINT `itemassetmovetype_name` UNIQUE IF NOT EXISTS  (`itemassetmovetype_name`);

ALTER TABLE `mst_itemassetmovetype` ADD KEY IF NOT EXISTS `itemassetmovemodel_id` (`itemassetmovemodel_id`);
ALTER TABLE `mst_itemassetmovetype` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);

ALTER TABLE `mst_itemassetmovetype` ADD CONSTRAINT `fk_mst_itemassetmovetype_mst_itemassetmovemodel` FOREIGN KEY IF NOT EXISTS  (`itemassetmovemodel_id`) REFERENCES `mst_itemassetmovemodel` (`itemassetmovemodel_id`);
ALTER TABLE `mst_itemassetmovetype` ADD CONSTRAINT `fk_mst_itemassetmovetype_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);





