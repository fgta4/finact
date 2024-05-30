CREATE TABLE `mst_ownershiptype` (
	`ownershiptype_id` varchar(10) NOT NULL , 
	`ownershiptype_name` varchar(30) NOT NULL , 
	`ownershiptype_descr` varchar(90)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `ownershiptype_name` (`ownershiptype_name`),
	PRIMARY KEY (`ownershiptype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Request';

ALTER TABLE `mst_ownershiptype` ADD KEY `trxmodel_id` (`trxmodel_id`);

ALTER TABLE `mst_ownershiptype` ADD CONSTRAINT `fk_mst_ownershiptype_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);


INSERT INTO mst_ownershiptype (`ownershiptype_id`, `ownershiptype_name`, `trxmodel_id`, `_createby`, `_createdate`) VALUES ('REN', 'RENTAL', 'REN', 'root', NOW());
INSERT INTO mst_ownershiptype (`ownershiptype_id`, `ownershiptype_name`, `trxmodel_id`, `_createby`, `_createdate`) VALUES ('OWN', 'OWN', 'PUR', 'root', NOW());



