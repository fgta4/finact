CREATE TABLE `mst_taxmodel` (
	`taxmodel_id` varchar(10) NOT NULL , 
	`taxmodel_name` varchar(30) NOT NULL , 
	`taxtmodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `taxmodel_name` (`taxmodel_name`),
	PRIMARY KEY (`taxmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Tax';




INSERT INTO mst_taxmodel (`taxmodel_id`, `taxmodel_name`, `_createby`, `_createdate`) VALUES ('NOTAX', 'NO TAX', 'root', NOW());
INSERT INTO mst_taxmodel (`taxmodel_id`, `taxmodel_name`, `_createby`, `_createdate`) VALUES ('PPN', 'Pajak Pertambahan Nilai', 'root', NOW());
INSERT INTO mst_taxmodel (`taxmodel_id`, `taxmodel_name`, `_createby`, `_createdate`) VALUES ('PPH', 'Pajak Penghasilan', 'root', NOW());
INSERT INTO mst_taxmodel (`taxmodel_id`, `taxmodel_name`, `_createby`, `_createdate`) VALUES ('PEMDA', 'Dispenda', 'root', NOW());



