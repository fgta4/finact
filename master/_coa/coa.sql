CREATE TABLE `mst_coa` (
	`coa_id` varchar(17) NOT NULL , 
	`coa_name` varchar(255)  , 
	`coa_nameshort` varchar(255)  , 
	`coa_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coa_descr` varchar(255)  , 
	`coa_dk` int(1) NOT NULL , 
	`coagroup_id` varchar(17) NOT NULL , 
	`coamodel_id` varchar(10) NOT NULL , 
	`coatype_id` varchar(10) NOT NULL , 
	`curr_id` varchar(10), 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coa_name` (`coa_name`),
	PRIMARY KEY (`coa_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar COA akunting';

ALTER TABLE `mst_coa` ADD KEY `coagroup_id` (`coagroup_id`);
ALTER TABLE `mst_coa` ADD KEY `coamodel_id` (`coamodel_id`);
ALTER TABLE `mst_coa` ADD KEY `coatype_id` (`coatype_id`);

ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coagroup` FOREIGN KEY (`coagroup_id`) REFERENCES `mst_coagroup` (`coagroup_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coamodel` FOREIGN KEY (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_coatype` FOREIGN KEY (`coatype_id`) REFERENCES `mst_coatype` (`coatype_id`);


ALTER TABLE `mst_coa` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `mst_coa` ADD CONSTRAINT `fk_mst_coa_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);



