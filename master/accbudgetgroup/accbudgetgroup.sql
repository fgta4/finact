-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accbudgetgroup`;


CREATE TABLE `mst_accbudgetgroup` (
	`accbudgetgroup_id` varchar(17) NOT NULL , 
	`accbudgetgroup_name` varchar(90)  , 
	`accbudgetgroup_descr` varchar(255)  , 
	`accbudgetgroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetgroup_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetgroup_parent` varchar(17)  , 
	`accbudgetmodel_id` varchar(10)  , 
	`accbudgetgroup_path` varchar(340) NOT NULL , 
	`accbudgetgroup_pathid` varchar(17) NOT NULL , 
	`accbudgetgroup_level` int(2) NOT NULL DEFAULT 0, 
	`accbudgetgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetgroup_name` (`accbudgetgroup_name`),
	UNIQUE KEY `accbudgetgroup_path` (`accbudgetgroup_path`, `accbudgetgroup_pathid`),
	PRIMARY KEY (`accbudgetgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Grouping Budget Account';

ALTER TABLE `mst_accbudgetgroup` ADD KEY `accbudgetgroup_parent` (`accbudgetgroup_parent`);
ALTER TABLE `mst_accbudgetgroup` ADD KEY `accbudgetmodel_id` (`accbudgetmodel_id`);

ALTER TABLE `mst_accbudgetgroup` ADD CONSTRAINT `fk_mst_accbudgetgroup_mst_accbudgetgroup` FOREIGN KEY (`accbudgetgroup_parent`) REFERENCES `mst_accbudgetgroup` (`accbudgetgroup_id`);
ALTER TABLE `mst_accbudgetgroup` ADD CONSTRAINT `fk_mst_accbudgetgroup_mst_accbudgetmodel` FOREIGN KEY (`accbudgetmodel_id`) REFERENCES `mst_accbudgetmodel` (`accbudgetmodel_id`);





