-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_billoutpreprocess`;


CREATE TABLE `mst_billoutpreprocess` (
	`billoutpreprocess_id` varchar(10) NOT NULL , 
	`billoutpreprocess_name` varchar(60) NOT NULL , 
	`billoutpreprocess_descr` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `billoutpreprocess_name` (`billoutpreprocess_name`),
	PRIMARY KEY (`billoutpreprocess_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar pre processs billout';




INSERT INTO mst_billoutpreprocess (`billoutpreprocess_id`, `billoutpreprocess_name`, `billoutpreprocess_descr`, `_createby`, `_createdate`) VALUES ('BL', 'Create Bill', 'Generate bill dari data terkait', 'root', NOW());
INSERT INTO mst_billoutpreprocess (`billoutpreprocess_id`, `billoutpreprocess_name`, `billoutpreprocess_descr`, `_createby`, `_createdate`) VALUES ('DN', 'Buat Debit Note', '', 'root', NOW());
INSERT INTO mst_billoutpreprocess (`billoutpreprocess_id`, `billoutpreprocess_name`, `billoutpreprocess_descr`, `_createby`, `_createdate`) VALUES ('SK', 'Skip', 'Skip generate', 'root', NOW());



