CREATE TABLE `mst_taxtype` (
	`taxtype_id` varchar(10) NOT NULL , 
	`taxtype_name` varchar(30) NOT NULL , 
	`taxtype_include` tinyint(1) NOT NULL DEFAULT 0, 
	`taxtype_descr` varchar(90)  , 
	`taxtype_value` decimal(4, 2) NOT NULL DEFAULT 0, 
	`taxmodel_id` varchar(10) NOT NULL , 
	`billin_coa_id` varchar(20)  , 
	`billout_coa_id` varchar(20)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `taxtype_name` (`taxtype_name`),
	PRIMARY KEY (`taxtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Tax';

ALTER TABLE `mst_taxtype` ADD KEY `taxmodel_id` (`taxmodel_id`);
ALTER TABLE `mst_taxtype` ADD KEY `billin_coa_id` (`billin_coa_id`);
ALTER TABLE `mst_taxtype` ADD KEY `billout_coa_id` (`billout_coa_id`);

ALTER TABLE `mst_taxtype` ADD CONSTRAINT `fk_mst_taxtype_mst_taxmodel` FOREIGN KEY (`taxmodel_id`) REFERENCES `mst_taxmodel` (`taxmodel_id`);
ALTER TABLE `mst_taxtype` ADD CONSTRAINT `fk_mst_taxtype_mst_coa` FOREIGN KEY (`billin_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_taxtype` ADD CONSTRAINT `fk_mst_taxtype_mst_coa_2` FOREIGN KEY (`billout_coa_id`) REFERENCES `mst_coa` (`coa_id`);


INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_value`, `taxmodel_id`, `_createby`, `_createdate`) VALUES ('NOTAX', 'NO TAX', '0', 'NOTAX', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_descr`, `taxtype_name`, `taxtype_value`, `taxmodel_id`, `_createby`, `_createdate`) VALUES ('PPN', 'pembelian barang', 'PPN', '10', 'PPN', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_descr`, `taxtype_value`, `taxmodel_id`, `_createby`, `_createdate`) VALUES ('PPH2315', 'PPh 23 - 15%', 'dividen & hadiah', '15', 'PPH', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_descr`, `taxtype_value`, `taxmodel_id`, `_createby`, `_createdate`) VALUES ('PPH2302', 'PPh 23 - 2%', 'sewa & jasa', '2', 'PPH', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_descr`, `taxtype_value`, `taxmodel_id`, `_createby`, `_createdate`) VALUES ('PB10', 'PB10', 'Pajak Daerah 10%', '2', 'PEMDA', 'root', NOW());



