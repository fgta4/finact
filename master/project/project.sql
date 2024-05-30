-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_project`;
-- drop table if exists `mst_projectdept`;
-- drop table if exists `mst_projecttask`;


CREATE TABLE IF NOT EXISTS `mst_project` (
	`project_id` varchar(30) NOT NULL , 
	`projectmodel_id` varchar(10) NOT NULL , 
	`project_name` varchar(90) NOT NULL , 
	`project_descr` varchar(255)  , 
	`dept_id` varchar(30) NOT NULL , 
	`project_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`project_isallowalldept` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_id` varchar(30)  , 
	`projecttype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `project_name` (`project_name`),
	PRIMARY KEY (`project_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Project';


ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `projectmodel_id` varchar(10) NOT NULL  AFTER `project_id`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `project_name` varchar(90) NOT NULL  AFTER `projectmodel_id`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `project_descr` varchar(255)   AFTER `project_name`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `project_descr`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `project_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `project_isallowalldept` tinyint(1) NOT NULL DEFAULT 0 AFTER `project_isdisabled`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `orderin_id` varchar(30)   AFTER `project_isallowalldept`;
ALTER TABLE `mst_project` ADD COLUMN IF NOT EXISTS  `projecttype_id` varchar(10) NOT NULL  AFTER `orderin_id`;


ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `projectmodel_id` varchar(10) NOT NULL  AFTER `project_id`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `project_name` varchar(90) NOT NULL  AFTER `projectmodel_id`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `project_descr` varchar(255)   AFTER `project_name`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `project_descr`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `project_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `project_isallowalldept` tinyint(1) NOT NULL DEFAULT 0 AFTER `project_isdisabled`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `orderin_id` varchar(30)   AFTER `project_isallowalldept`;
ALTER TABLE `mst_project` MODIFY COLUMN IF EXISTS  `projecttype_id` varchar(10) NOT NULL  AFTER `orderin_id`;


ALTER TABLE `mst_project` ADD CONSTRAINT `project_name` UNIQUE IF NOT EXISTS  (`project_name`);

ALTER TABLE `mst_project` ADD KEY IF NOT EXISTS `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_project` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_project` ADD KEY IF NOT EXISTS `orderin_id` (`orderin_id`);
ALTER TABLE `mst_project` ADD KEY IF NOT EXISTS `projecttype_id` (`projecttype_id`);

ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_projectmodel` FOREIGN KEY IF NOT EXISTS  (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_trn_orderin` FOREIGN KEY IF NOT EXISTS  (`orderin_id`) REFERENCES `trn_orderin` (`orderin_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_projecttype` FOREIGN KEY IF NOT EXISTS  (`projecttype_id`) REFERENCES `mst_projecttype` (`projecttype_id`);





CREATE TABLE IF NOT EXISTS `mst_projectdept` (
	`projectdept_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projectdept_pair` (`project_id`, `dept_id`),
	PRIMARY KEY (`projectdept_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar dept yang bisa akses suatu project';


ALTER TABLE `mst_projectdept` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `projectdept_id`;
ALTER TABLE `mst_projectdept` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30) NOT NULL  AFTER `dept_id`;


ALTER TABLE `mst_projectdept` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `projectdept_id`;
ALTER TABLE `mst_projectdept` MODIFY COLUMN IF EXISTS  `project_id` varchar(30) NOT NULL  AFTER `dept_id`;


ALTER TABLE `mst_projectdept` ADD CONSTRAINT `projectdept_pair` UNIQUE IF NOT EXISTS  (`project_id`, `dept_id`);

ALTER TABLE `mst_projectdept` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_projectdept` ADD KEY IF NOT EXISTS `project_id` (`project_id`);

ALTER TABLE `mst_projectdept` ADD CONSTRAINT `fk_mst_projectdept_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_projectdept` ADD CONSTRAINT `fk_mst_projectdept_mst_project` FOREIGN KEY IF NOT EXISTS (`project_id`) REFERENCES `mst_project` (`project_id`);





CREATE TABLE IF NOT EXISTS `mst_projecttask` (
	`projecttask_id` varchar(14) NOT NULL , 
	`projecttask_name` varchar(90) NOT NULL , 
	`projecttask_descr` varchar(255)  , 
	`projecttask_dtstart` date NOT NULL , 
	`projecttask_dtend` date NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projecttask_name` (`project_id`, `projecttask_name`),
	PRIMARY KEY (`projecttask_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Task Project';


ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `projecttask_name` varchar(90) NOT NULL  AFTER `projecttask_id`;
ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `projecttask_descr` varchar(255)   AFTER `projecttask_name`;
ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `projecttask_dtstart` date NOT NULL  AFTER `projecttask_descr`;
ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `projecttask_dtend` date NOT NULL  AFTER `projecttask_dtstart`;
ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `projecttask_dtend`;
ALTER TABLE `mst_projecttask` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30) NOT NULL  AFTER `dept_id`;


ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `projecttask_name` varchar(90) NOT NULL  AFTER `projecttask_id`;
ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `projecttask_descr` varchar(255)   AFTER `projecttask_name`;
ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `projecttask_dtstart` date NOT NULL  AFTER `projecttask_descr`;
ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `projecttask_dtend` date NOT NULL  AFTER `projecttask_dtstart`;
ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `projecttask_dtend`;
ALTER TABLE `mst_projecttask` MODIFY COLUMN IF EXISTS  `project_id` varchar(30) NOT NULL  AFTER `dept_id`;


ALTER TABLE `mst_projecttask` ADD CONSTRAINT `projecttask_name` UNIQUE IF NOT EXISTS  (`project_id`, `projecttask_name`);

ALTER TABLE `mst_projecttask` ADD KEY IF NOT EXISTS `project_id` (`project_id`);

ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_project` FOREIGN KEY IF NOT EXISTS (`project_id`) REFERENCES `mst_project` (`project_id`);





