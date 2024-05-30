CREATE TABLE `mst_itemclassgroup` (
	`itemclassgroup_id` varchar(15) NOT NULL , 
	`itemclassgroup_name` varchar(60) NOT NULL , 
	`itemclassgroup_descr` varchar(90)  , 
	`itemclassgroup_parent` varchar(15)  , 
	`itemclassgroup_pathid` varchar(15) NOT NULL , 
	`itemclassgroup_path` varchar(390) NOT NULL , 
	`itemclassgroup_level` int(2) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemclassgroup_name` (`itemclassgroup_name`),
	UNIQUE KEY `itemclassgroup_path` (`itemclassgroup_path`, `itemclassgroup_pathid`),
	PRIMARY KEY (`itemclassgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Klasifikasi';

ALTER TABLE `mst_itemclassgroup` ADD KEY `itemclassgroup_parent` (`itemclassgroup_parent`);

ALTER TABLE `mst_itemclassgroup` ADD CONSTRAINT `fk_mst_itemclassgroup_mst_itemclassgroup` FOREIGN KEY (`itemclassgroup_parent`) REFERENCES `mst_itemclassgroup` (`itemclassgroup_id`);





