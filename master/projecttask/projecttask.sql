CREATE TABLE `mst_projecttask` (
	`projecttask_id` varchar(14) NOT NULL , 
	`projecttask_name` varchar(90) NOT NULL , 
	`projecttask_descr` varchar(255)  , 
	`projecttask_dtstart` date NOT NULL , 
	`projecttask_dtend` date NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projecttask_name` (`projecttask_name`),
	PRIMARY KEY (`projecttask_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Task Project';

ALTER TABLE `mst_projecttask` ADD KEY `project_id` (`project_id`);
ALTER TABLE `mst_projecttask` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE `mst_projecttaskempl` (
	`projecttaskempl_id` varchar(14) NOT NULL , 
	`role_id` varchar(10) NOT NULL , 
	`empl_id` varchar(14) NOT NULL , 
	`projecttask_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`projecttaskempl_id`)
) 
ENGINE=InnoDB
COMMENT='Personil yang mengerjakan project task';

ALTER TABLE `mst_projecttaskempl` ADD KEY `role_id` (`role_id`);
ALTER TABLE `mst_projecttaskempl` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `mst_projecttaskempl` ADD KEY `projecttask_id` (`projecttask_id`);

ALTER TABLE `mst_projecttaskempl` ADD CONSTRAINT `fk_mst_projecttaskempl_fgt_role` FOREIGN KEY (`role_id`) REFERENCES `fgt_role` (`role_id`);
ALTER TABLE `mst_projecttaskempl` ADD CONSTRAINT `fk_mst_projecttaskempl_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `mst_projecttaskempl` ADD CONSTRAINT `fk_mst_projecttaskempl_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);





