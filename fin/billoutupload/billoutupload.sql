CREATE TABLE `trn_billout` (
	`billout_id` varchar(14) NOT NULL , 
	`billout_descr` varchar(90) NOT NULL , 
	`billout_date` date NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tagihan Keluar';







