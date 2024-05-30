-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_ordercontract`;
-- drop table if exists `trn_ordercontractitem`;
-- drop table if exists `trn_ordercontracterm`;
-- drop table if exists `trn_ordercontracattch`;
-- drop table if exists `trn_ordercontractappr`;


CREATE TABLE `trn_ordercontract` (
	`ordercontract_id` varchar(14) NOT NULL , 
	`ordercontract_ref` varchar(255)  , 
	`ordercontract_descr` varchar(255) NOT NULL , 
	`ordercontract_dtstart` date NOT NULL , 
	`ordercontract_dtend` date NOT NULL , 
	`partner_id` varchar(30)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`inquiryselect_id` varchar(1) NOT NULL , 
	`ordercontract_days` int(4) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`ordercontract_selectfield` varchar(6) NOT NULL DEFAULT 000000, 
	`ordercontract_version` int(4) NOT NULL DEFAULT 0, 
	`ordercontract_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontract_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontract_commitby` varchar(14)  , 
	`ordercontract_commitdate` datetime  , 
	`ordercontract_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontract_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontract_approveby` varchar(14)  , 
	`ordercontract_approvedate` datetime  , 
	`ordercontract_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontract_declineby` varchar(14)  , 
	`ordercontract_declinedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ordercontract_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_ordercontract` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_ordercontract` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_ordercontract` ADD KEY `inquiryselect_id` (`inquiryselect_id`);
ALTER TABLE `trn_ordercontract` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_ordercontract` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_inquiryselect` FOREIGN KEY (`inquiryselect_id`) REFERENCES `mst_inquiryselect` (`inquiryselect_id`);
ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_dept` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_ordercontractitem` (
	`ordercontractitem_id` varchar(30) NOT NULL , 
	`item_id` varchar(14)  , 
	`itemstock_id` varchar(14)  , 
	`itemclass_id` varchar(14)  , 
	`ordercontractitem_descr` varchar(90) NOT NULL , 
	`ordercontractitem_qty` int(4) NOT NULL DEFAULT 0, 
	`ordercontractitem_days` int(4) NOT NULL DEFAULT 0, 
	`ordercontractitem_task` int(4) NOT NULL DEFAULT 0, 
	`ordercontractitem_estrate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`ordercontractitem_value` decimal(12, 0) NOT NULL DEFAULT 0, 
	`ordercontract_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ordercontractitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_ordercontractitem` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `ordercontract_id` (`ordercontract_id`);

ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_trn_ordercontract` FOREIGN KEY (`ordercontract_id`) REFERENCES `trn_ordercontract` (`ordercontract_id`);





CREATE TABLE `trn_ordercontracterm` (
	`ordercontracterm_id` varchar(14) NOT NULL , 
	`ordercontracterm_descr` varchar(90) NOT NULL , 
	`ordercontracterm_dt` date NOT NULL , 
	`ordercontracterm_value` decimal(12, 0) NOT NULL DEFAULT 0, 
	`ordercontract_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ordercontracterm_id`)
) 
ENGINE=InnoDB
COMMENT='Detil buku bank';

ALTER TABLE `trn_ordercontracterm` ADD KEY `ordercontract_id` (`ordercontract_id`);

ALTER TABLE `trn_ordercontracterm` ADD CONSTRAINT `fk_trn_ordercontracterm_trn_ordercontract` FOREIGN KEY (`ordercontract_id`) REFERENCES `trn_ordercontract` (`ordercontract_id`);





CREATE TABLE `trn_ordercontracattch` (
	`ordercontracattch_id` varchar(14) NOT NULL , 
	`ordercontracattch_name` varchar(90) NOT NULL , 
	`ordercontracattch_descr` varchar(255)  , 
	`ordercontracattch_order` int(4) NOT NULL DEFAULT 0, 
	`ordercontracattch_file` varchar(90)  , 
	`ordercontract_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `ordercontracattch_name` (`ordercontract_id`, `ordercontracattch_name`),
	PRIMARY KEY (`ordercontracattch_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Attachment dari kontrack';

ALTER TABLE `trn_ordercontracattch` ADD KEY `ordercontract_id` (`ordercontract_id`);

ALTER TABLE `trn_ordercontracattch` ADD CONSTRAINT `fk_trn_ordercontracattch_trn_ordercontract` FOREIGN KEY (`ordercontract_id`) REFERENCES `trn_ordercontract` (`ordercontract_id`);





CREATE TABLE `trn_ordercontractappr` (
	`ordercontractappr_id` varchar(14) NOT NULL , 
	`ordercontractappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontractappr_by` varchar(14)  , 
	`ordercontractappr_date` datetime  , 
	`ordercontract_version` int(4) NOT NULL DEFAULT 0, 
	`ordercontractappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`ordercontractappr_declinedby` varchar(14)  , 
	`ordercontractappr_declineddate` datetime  , 
	`ordercontractappr_notes` varchar(255)  , 
	`ordercontract_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `ordercontract_auth_id` (`ordercontract_id`, `auth_id`),
	PRIMARY KEY (`ordercontractappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_ordercontractappr` ADD KEY `ordercontract_id` (`ordercontract_id`);

ALTER TABLE `trn_ordercontractappr` ADD CONSTRAINT `fk_trn_ordercontractappr_trn_ordercontract` FOREIGN KEY (`ordercontract_id`) REFERENCES `trn_ordercontract` (`ordercontract_id`);





