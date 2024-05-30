-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemctg`;


CREATE TABLE IF NOT EXISTS `mst_itemctg` (
	`itemctg_id` varchar(30) NOT NULL , 
	`itemctg_name` varchar(90) NOT NULL , 
	`itemctg_group` varchar(90) NOT NULL , 
	`itemmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemctg_name` (`itemctg_name`),
	PRIMARY KEY (`itemctg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Categori Item';


ALTER TABLE `mst_itemctg` ADD COLUMN IF NOT EXISTS  `itemctg_name` varchar(90) NOT NULL  AFTER `itemctg_id`;
ALTER TABLE `mst_itemctg` ADD COLUMN IF NOT EXISTS  `itemctg_group` varchar(90) NOT NULL  AFTER `itemctg_name`;
ALTER TABLE `mst_itemctg` ADD COLUMN IF NOT EXISTS  `itemmodel_id` varchar(10) NOT NULL  AFTER `itemctg_group`;


ALTER TABLE `mst_itemctg` MODIFY COLUMN IF EXISTS  `itemctg_name` varchar(90) NOT NULL  AFTER `itemctg_id`;
ALTER TABLE `mst_itemctg` MODIFY COLUMN IF EXISTS  `itemctg_group` varchar(90) NOT NULL  AFTER `itemctg_name`;
ALTER TABLE `mst_itemctg` MODIFY COLUMN IF EXISTS  `itemmodel_id` varchar(10) NOT NULL  AFTER `itemctg_group`;


ALTER TABLE `mst_itemctg` ADD CONSTRAINT `itemctg_name` UNIQUE IF NOT EXISTS  (`itemctg_name`);

ALTER TABLE `mst_itemctg` ADD KEY IF NOT EXISTS `itemmodel_id` (`itemmodel_id`);

ALTER TABLE `mst_itemctg` ADD CONSTRAINT `fk_mst_itemctg_mst_itemmodel` FOREIGN KEY IF NOT EXISTS  (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);





