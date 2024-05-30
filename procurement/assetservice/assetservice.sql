-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_assetservice`;


CREATE TABLE `trn_assetservice` (
	`assetservice_id` varchar(14) NOT NULL , 
	`itemasset_id` varchar(14)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`assetservice_descr` varchar(90) NOT NULL , 
	`assetservice_date` date NOT NULL , 
	`assetservice_dateest` date NOT NULL , 
	`assetservice_datecompletion` date NOT NULL , 
	`partner_id` varchar(30)  , 
	`coa_id` varchar(17)  , 
	`orderout_id` varchar(30)  , 
	`assetservice_isrecv` tinyint(1) NOT NULL DEFAULT 0, 
	`assetservice_recvby` varchar(14)  , 
	`assetservice_recvdate` datetime  , 
	`recv_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`assetservice_id`)
) 
ENGINE=InnoDB
COMMENT='Asset Service';

ALTER TABLE `trn_assetservice` ADD KEY `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_assetservice` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_assetservice` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_assetservice` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_assetservice` ADD KEY `orderout_id` (`orderout_id`);

ALTER TABLE `trn_assetservice` ADD CONSTRAINT `fk_trn_assetservice_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_assetservice` ADD CONSTRAINT `fk_trn_assetservice_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_assetservice` ADD CONSTRAINT `fk_trn_assetservice_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_assetservice` ADD CONSTRAINT `fk_trn_assetservice_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_assetservice` ADD CONSTRAINT `fk_trn_assetservice_trn_orderout` FOREIGN KEY (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);





