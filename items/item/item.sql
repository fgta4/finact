-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_item`;


CREATE TABLE IF NOT EXISTS `mst_item` (
	`item_id` varchar(14) NOT NULL , 
	`itemgroup_id` varchar(15) NOT NULL , 
	`itemclass_id` varchar(14) NOT NULL , 
	`item_name` varchar(255) NOT NULL , 
	`item_nameshort` varchar(255) NOT NULL , 
	`item_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`item_descr` varchar(255)  , 
	`dept_id` varchar(30)  , 
	`item_estcost` decimal(11, 2) NOT NULL DEFAULT 0, 
	`item_maxcost` decimal(11, 2) NOT NULL DEFAULT 0, 
	`item_avgcost` decimal(11, 2) NOT NULL DEFAULT 0, 
	`item_mincost` decimal(11, 2) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `item_name` (`item_name`),
	PRIMARY KEY (`item_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar  Item';


ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `itemgroup_id` varchar(15) NOT NULL  AFTER `item_id`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14) NOT NULL  AFTER `itemgroup_id`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_name` varchar(255) NOT NULL  AFTER `itemclass_id`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_nameshort` varchar(255) NOT NULL  AFTER `item_name`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `item_nameshort`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_descr` varchar(255)   AFTER `item_isdisabled`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `item_descr`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_estcost` decimal(11, 2) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_maxcost` decimal(11, 2) NOT NULL DEFAULT 0 AFTER `item_estcost`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_avgcost` decimal(11, 2) NOT NULL DEFAULT 0 AFTER `item_maxcost`;
ALTER TABLE `mst_item` ADD COLUMN IF NOT EXISTS  `item_mincost` decimal(11, 2) NOT NULL DEFAULT 0 AFTER `item_avgcost`;


ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `itemgroup_id` varchar(15) NOT NULL   AFTER `item_id`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14) NOT NULL   AFTER `itemgroup_id`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_name` varchar(255) NOT NULL   AFTER `itemclass_id`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_nameshort` varchar(255) NOT NULL   AFTER `item_name`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `item_nameshort`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_descr` varchar(255)    AFTER `item_isdisabled`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `item_descr`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_estcost` decimal(11, 2) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_maxcost` decimal(11, 2) NOT NULL DEFAULT 0  AFTER `item_estcost`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_avgcost` decimal(11, 2) NOT NULL DEFAULT 0  AFTER `item_maxcost`;
ALTER TABLE `mst_item` MODIFY COLUMN IF EXISTS  `item_mincost` decimal(11, 2) NOT NULL DEFAULT 0  AFTER `item_avgcost`;


ALTER TABLE `mst_item` ADD CONSTRAINT `item_name` UNIQUE IF NOT EXISTS  (`item_name`);

ALTER TABLE `mst_item` ADD KEY IF NOT EXISTS `itemgroup_id` (`itemgroup_id`);
ALTER TABLE `mst_item` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_item` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);

ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_itemgroup` FOREIGN KEY IF NOT EXISTS  (`itemgroup_id`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





