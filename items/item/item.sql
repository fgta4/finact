-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_item`;


CREATE TABLE `mst_item` (
	`item_id` varchar(14) NOT NULL , 
	`item_name` varchar(255) NOT NULL , 
	`item_nameshort` varchar(255) NOT NULL , 
	`item_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`item_descr` varchar(255)  , 
	`item_stdcost` decimal(11, 2) NOT NULL DEFAULT 0, 
	`itemgroup_id` varchar(15)  , 
	`itemclass_id` varchar(14)  , 
	`dept_id` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `item_name` (`item_name`),
	PRIMARY KEY (`item_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar  Item';

ALTER TABLE `mst_item` ADD KEY `itemgroup_id` (`itemgroup_id`);
ALTER TABLE `mst_item` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_item` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_itemgroup` FOREIGN KEY (`itemgroup_id`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_item` ADD CONSTRAINT `fk_mst_item_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





