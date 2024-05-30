-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_trxmodel`;


CREATE TABLE IF NOT EXISTS `mst_trxmodel` (
	`trxmodel_id` varchar(10) NOT NULL , 
	`trxmodel_name` varchar(30) NOT NULL , 
	`trxmodel_descr` varchar(90)  , 
	`trxmodel_direction` varchar(3)  , 
	`ppn_taxtype_id` varchar(10)  , 
	`pph_taxtype_id` varchar(10)  , 
	`trxmodel_isuseqty` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isusedays` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isusetask` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isassetminta` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isassetpinjam` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `trxmodel_name` (`trxmodel_name`),
	PRIMARY KEY (`trxmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Transaksi';


ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_name` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_descr` varchar(90)   AFTER `trxmodel_name`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_direction` varchar(3)   AFTER `trxmodel_descr`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `trxmodel_direction`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `pph_taxtype_id` varchar(10)   AFTER `ppn_taxtype_id`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_isuseqty` tinyint(1) NOT NULL DEFAULT 0 AFTER `pph_taxtype_id`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_isusedays` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isuseqty`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_isusetask` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isusedays`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_isassetminta` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isusetask`;
ALTER TABLE `mst_trxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_isassetpinjam` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isassetminta`;


ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_name` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_descr` varchar(90)   AFTER `trxmodel_name`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_direction` varchar(3)   AFTER `trxmodel_descr`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `trxmodel_direction`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `pph_taxtype_id` varchar(10)   AFTER `ppn_taxtype_id`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_isuseqty` tinyint(1) NOT NULL DEFAULT 0 AFTER `pph_taxtype_id`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_isusedays` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isuseqty`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_isusetask` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isusedays`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_isassetminta` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isusetask`;
ALTER TABLE `mst_trxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_isassetpinjam` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_isassetminta`;


ALTER TABLE `mst_trxmodel` ADD CONSTRAINT `trxmodel_name` UNIQUE IF NOT EXISTS  (`trxmodel_name`);

ALTER TABLE `mst_trxmodel` ADD KEY IF NOT EXISTS `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `mst_trxmodel` ADD KEY IF NOT EXISTS `pph_taxtype_id` (`pph_taxtype_id`);

ALTER TABLE `mst_trxmodel` ADD CONSTRAINT `fk_mst_trxmodel_mst_taxtype` FOREIGN KEY IF NOT EXISTS  (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `mst_trxmodel` ADD CONSTRAINT `fk_mst_trxmodel_mst_taxtype_2` FOREIGN KEY IF NOT EXISTS  (`pph_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);


INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('PUR', 'PURCHASE', 'OUT', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('REN', 'RENTAL', 'OUT', 'PPN', null, '1', '1', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('SAL', 'SALES', 'IN', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('SER', 'SERVICE', 'OUT', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('TAL', 'TALENT', 'OUT', 'PPN', null, '0', '1', '1', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('USE', 'USE', 'USE', 'PPN', null, '1', '1', '1', 'root', NOW());



