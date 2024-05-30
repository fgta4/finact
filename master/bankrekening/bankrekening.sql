CREATE TABLE `mst_bankrekening` (
	`bankrekening_id` varchar(20) NOT NULL , 
	`bankrekening_name` varchar(90) NOT NULL , 
	`bankrekening_code` varchar(30) NOT NULL , 
	`bankrekening_namabuku` varchar(30) NOT NULL , 
	`bankrekening_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`bankrekening_opendate` date NOT NULL , 
	`bankrekening_closedate` date  , 
	`bankrekening_descr` varchar(255)  , 
	`bank_id` varchar(14)  , 
	`coa_id` varchar(17) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `bankrekening_name` (`bankrekening_name`),
	UNIQUE KEY `bankrekening_code` (`bankrekening_code`),
	PRIMARY KEY (`bankrekening_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Rekening Bank';

ALTER TABLE `mst_bankrekening` ADD KEY `bank_id` (`bank_id`);
ALTER TABLE `mst_bankrekening` ADD KEY `coa_id` (`coa_id`);

ALTER TABLE `mst_bankrekening` ADD CONSTRAINT `fk_mst_bankrekening_mst_bank` FOREIGN KEY (`bank_id`) REFERENCES `mst_bank` (`bank_id`);
ALTER TABLE `mst_bankrekening` ADD CONSTRAINT `fk_mst_bankrekening_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);





