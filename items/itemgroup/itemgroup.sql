-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemgroup`;


CREATE TABLE IF NOT EXISTS `mst_itemgroup` (
	`itemgroup_id` varchar(17) NOT NULL , 
	`itemgroup_name` varchar(60) NOT NULL , 
	`itemgroup_nameshort` varchar(60) NOT NULL , 
	`itemgroup_descr` varchar(90)  , 
	`itemgroup_parent` varchar(15)  , 
	`itemmodel_id` varchar(10)  , 
	`itemgroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`itemgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`itemgroup_pathid` varchar(17) NOT NULL , 
	`itemgroup_path` varchar(390)  , 
	`itemgroup_level` int(2) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemgroup_name` (`itemgroup_name`),
	UNIQUE KEY `itemgroup_path` (`itemgroup_path`, `itemgroup_pathid`),
	PRIMARY KEY (`itemgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Items';


ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_name` varchar(60) NOT NULL  AFTER `itemgroup_id`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_nameshort` varchar(60) NOT NULL  AFTER `itemgroup_name`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_descr` varchar(90)   AFTER `itemgroup_nameshort`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_parent` varchar(15)   AFTER `itemgroup_descr`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemmodel_id` varchar(10)   AFTER `itemgroup_parent`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_isparent` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_id`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemgroup_isparent`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_pathid` varchar(17) NOT NULL  AFTER `itemgroup_isexselect`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_path` varchar(390)   AFTER `itemgroup_pathid`;
ALTER TABLE `mst_itemgroup` ADD COLUMN IF NOT EXISTS  `itemgroup_level` int(2) NOT NULL DEFAULT 0 AFTER `itemgroup_path`;


ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_name` varchar(60) NOT NULL   AFTER `itemgroup_id`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_nameshort` varchar(60) NOT NULL   AFTER `itemgroup_name`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_descr` varchar(90)    AFTER `itemgroup_nameshort`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_parent` varchar(15)    AFTER `itemgroup_descr`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemmodel_id` varchar(10)    AFTER `itemgroup_parent`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_isparent` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmodel_id`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemgroup_isparent`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_pathid` varchar(17) NOT NULL   AFTER `itemgroup_isexselect`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_path` varchar(390)    AFTER `itemgroup_pathid`;
ALTER TABLE `mst_itemgroup` MODIFY COLUMN IF EXISTS  `itemgroup_level` int(2) NOT NULL DEFAULT 0  AFTER `itemgroup_path`;


ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `itemgroup_name` UNIQUE IF NOT EXISTS  (`itemgroup_name`);
ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `itemgroup_path` UNIQUE IF NOT EXISTS  (`itemgroup_path`, `itemgroup_pathid`);

ALTER TABLE `mst_itemgroup` ADD KEY IF NOT EXISTS `itemgroup_parent` (`itemgroup_parent`);
ALTER TABLE `mst_itemgroup` ADD KEY IF NOT EXISTS `itemmodel_id` (`itemmodel_id`);

ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `fk_mst_itemgroup_mst_itemgroup` FOREIGN KEY IF NOT EXISTS  (`itemgroup_parent`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `fk_mst_itemgroup_mst_itemmodel` FOREIGN KEY IF NOT EXISTS  (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);





