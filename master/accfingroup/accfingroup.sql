-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accfingroup`;


CREATE TABLE `mst_accfingroup` (
	`accfingroup_id` varchar(17) NOT NULL , 
	`accfingroup_name` varchar(90)  , 
	`accfingroup_descr` varchar(255)  , 
	`accfingroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`accfingroup_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`accfingroup_parent` varchar(17)  , 
	`accfingroup_path` varchar(340) NOT NULL , 
	`accfingroup_pathid` varchar(17) NOT NULL , 
	`accfingroup_level` int(2) NOT NULL DEFAULT 0, 
	`accfingroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accfingroup_name` (`accfingroup_name`),
	UNIQUE KEY `accfingroup_path` (`accfingroup_path`, `accfingroup_pathid`),
	PRIMARY KEY (`accfingroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Grouping COA Finance';

ALTER TABLE `mst_accfingroup` ADD KEY `accfingroup_parent` (`accfingroup_parent`);

ALTER TABLE `mst_accfingroup` ADD CONSTRAINT `fk_mst_accfingroup_mst_accfingroup` FOREIGN KEY (`accfingroup_parent`) REFERENCES `mst_accfingroup` (`accfingroup_id`);





