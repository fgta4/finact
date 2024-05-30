-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_jurnalsource`;
-- drop table if exists `mst_jurnalsourcetype`;


CREATE TABLE IF NOT EXISTS `mst_jurnalsource` (
	`jurnalsource_id` varchar(10) NOT NULL , 
	`jurnalsource_name` varchar(30) NOT NULL , 
	`jurnalsource_descr` varchar(90)  , 
	`jurnalsource_isallowmanual` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalsource_name` (`jurnalsource_name`),
	PRIMARY KEY (`jurnalsource_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Sumber Jurnal';


ALTER TABLE `mst_jurnalsource` ADD COLUMN IF NOT EXISTS  `jurnalsource_name` varchar(30) NOT NULL  AFTER `jurnalsource_id`;
ALTER TABLE `mst_jurnalsource` ADD COLUMN IF NOT EXISTS  `jurnalsource_descr` varchar(90)   AFTER `jurnalsource_name`;
ALTER TABLE `mst_jurnalsource` ADD COLUMN IF NOT EXISTS  `jurnalsource_isallowmanual` tinyint(1) NOT NULL DEFAULT 0 AFTER `jurnalsource_descr`;


ALTER TABLE `mst_jurnalsource` MODIFY COLUMN IF EXISTS  `jurnalsource_name` varchar(30) NOT NULL   AFTER `jurnalsource_id`;
ALTER TABLE `mst_jurnalsource` MODIFY COLUMN IF EXISTS  `jurnalsource_descr` varchar(90)    AFTER `jurnalsource_name`;
ALTER TABLE `mst_jurnalsource` MODIFY COLUMN IF EXISTS  `jurnalsource_isallowmanual` tinyint(1) NOT NULL DEFAULT 0  AFTER `jurnalsource_descr`;


ALTER TABLE `mst_jurnalsource` ADD CONSTRAINT `jurnalsource_name` UNIQUE IF NOT EXISTS  (`jurnalsource_name`);







CREATE TABLE IF NOT EXISTS `mst_jurnalsourcetype` (
	`jurnalsourcetype_id` varchar(14)  , 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnalsource_id` varchar(10)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalsourcetype_pair` (`jurnalsource_id`, `jurnaltype_id`),
	PRIMARY KEY (`jurnalsourcetype_id`)
) 
ENGINE=InnoDB
COMMENT='Tipe2 jurnal yang diperbolehkan dari source';


ALTER TABLE `mst_jurnalsourcetype` ADD COLUMN IF NOT EXISTS  `jurnaltype_id` varchar(10) NOT NULL  AFTER `jurnalsourcetype_id`;
ALTER TABLE `mst_jurnalsourcetype` ADD COLUMN IF NOT EXISTS  `jurnalsource_id` varchar(10)   AFTER `jurnaltype_id`;


ALTER TABLE `mst_jurnalsourcetype` MODIFY COLUMN IF EXISTS  `jurnaltype_id` varchar(10) NOT NULL   AFTER `jurnalsourcetype_id`;
ALTER TABLE `mst_jurnalsourcetype` MODIFY COLUMN IF EXISTS  `jurnalsource_id` varchar(10)    AFTER `jurnaltype_id`;


ALTER TABLE `mst_jurnalsourcetype` ADD CONSTRAINT `jurnalsourcetype_pair` UNIQUE IF NOT EXISTS  (`jurnalsource_id`, `jurnaltype_id`);

ALTER TABLE `mst_jurnalsourcetype` ADD KEY IF NOT EXISTS `jurnaltype_id` (`jurnaltype_id`);
ALTER TABLE `mst_jurnalsourcetype` ADD KEY IF NOT EXISTS `jurnalsource_id` (`jurnalsource_id`);

ALTER TABLE `mst_jurnalsourcetype` ADD CONSTRAINT `fk_mst_jurnalsourcetype_mst_jurnaltype` FOREIGN KEY IF NOT EXISTS  (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);
ALTER TABLE `mst_jurnalsourcetype` ADD CONSTRAINT `fk_mst_jurnalsourcetype_mst_jurnalsource` FOREIGN KEY IF NOT EXISTS (`jurnalsource_id`) REFERENCES `mst_jurnalsource` (`jurnalsource_id`);





