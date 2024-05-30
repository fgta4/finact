-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemasset`;
-- drop table if exists `mst_itemassetspec`;
-- drop table if exists `trn_inquiryfiles`;
-- drop table if exists `mst_itemassetdepre`;
-- drop table if exists `mst_itemassetbooking`;
-- drop table if exists `log_itemassetmoving`;
-- drop table if exists `log_itemassetmaintenace`;
-- drop table if exists `log_itemassetfail`;


CREATE TABLE `mst_itemasset` (
	`itemasset_id` varchar(14) NOT NULL , 
	`itemasset_name` varchar(150) NOT NULL , 
	`itemasset_serial` varchar(30)  , 
	`item_id` varchar(14)  , 
	`itemassetstatus_id` varchar(2) NOT NULL , 
	`itemasset_statusnote` varchar(255)  , 
	`itemasset_ischeckout` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_ismoveable` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_iswrittenof` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_descr` varchar(255)  , 
	`itemasset_merk` varchar(255)  , 
	`itemasset_type` varchar(255)  , 
	`itemclass_id` varchar(14)  , 
	`itemasset_baselocation` varchar(255)  , 
	`site_id` varchar(30)  , 
	`owner_dept_id` varchar(30)  , 
	`maintainer_dept_id` varchar(30)  , 
	`location_dept_id` varchar(30)  , 
	`location_site_id` varchar(30)  , 
	`location_room_id` varchar(30)  , 
	`location_empl_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`itemasset_purchasedate` date NOT NULL , 
	`itemasset_lastsupportdate` date NOT NULL , 
	`itemasset_purchasevalue` decimal(11, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10)  , 
	`itemasset_purchasevalue_idr` decimal(11, 2) NOT NULL DEFAULT 0, 
	`asset_coa_id` varchar(20)  , 
	`depremodel_id` varchar(10)  , 
	`cost_coa_id` varchar(20)  , 
	`itemasset_depreage` int(2) NOT NULL DEFAULT 5, 
	`itemasset_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1, 
	`itemasset_currentvalue_idr` decimal(11, 2) NOT NULL DEFAULT 0, 
	`itemasset_currentvalue_date` date NOT NULL DEFAULT NOW(), 
	`itemasset_usevaluerate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`itemasset_writeoffby` varchar(14)  , 
	`itemasset_writeoffdate` datetime  , 
	`itemasset_writeoffref` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemasset_serial` (`itemasset_serial`),
	PRIMARY KEY (`itemasset_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Asset';

ALTER TABLE `mst_itemasset` ADD KEY `item_id` (`item_id`);
ALTER TABLE `mst_itemasset` ADD KEY `itemassetstatus_id` (`itemassetstatus_id`);
ALTER TABLE `mst_itemasset` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_itemasset` ADD KEY `site_id` (`site_id`);
ALTER TABLE `mst_itemasset` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_itemasset` ADD KEY `maintainer_dept_id` (`maintainer_dept_id`);
ALTER TABLE `mst_itemasset` ADD KEY `location_dept_id` (`location_dept_id`);
ALTER TABLE `mst_itemasset` ADD KEY `location_site_id` (`location_site_id`);
ALTER TABLE `mst_itemasset` ADD KEY `location_room_id` (`location_room_id`);
ALTER TABLE `mst_itemasset` ADD KEY `location_empl_id` (`location_empl_id`);
ALTER TABLE `mst_itemasset` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `mst_itemasset` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `mst_itemasset` ADD KEY `asset_coa_id` (`asset_coa_id`);
ALTER TABLE `mst_itemasset` ADD KEY `depremodel_id` (`depremodel_id`);
ALTER TABLE `mst_itemasset` ADD KEY `cost_coa_id` (`cost_coa_id`);

ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_itemassetstatus` FOREIGN KEY (`itemassetstatus_id`) REFERENCES `mst_itemassetstatus` (`itemassetstatus_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_dept` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_dept_2` FOREIGN KEY (`maintainer_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_dept_3` FOREIGN KEY (`location_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_site_2` FOREIGN KEY (`location_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_room` FOREIGN KEY (`location_room_id`) REFERENCES `mst_room` (`room_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_empl` FOREIGN KEY (`location_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_coa` FOREIGN KEY (`asset_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_depremodel` FOREIGN KEY (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);
ALTER TABLE `mst_itemasset` ADD CONSTRAINT `fk_mst_itemasset_mst_coa_2` FOREIGN KEY (`cost_coa_id`) REFERENCES `mst_coa` (`coa_id`);





CREATE TABLE `mst_itemassetspec` (
	`itemassetspec_id` varchar(14) NOT NULL , 
	`itemassetspec_value` varchar(90) NOT NULL , 
	`itemspec_id` varchar(10) NOT NULL , 
	`itemspec_isnumber` tinyint(1) NOT NULL DEFAULT 0, 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetspec_id`)
) 
ENGINE=InnoDB
COMMENT='Spesifikasi item asset';

ALTER TABLE `mst_itemassetspec` ADD KEY `itemspec_id` (`itemspec_id`);
ALTER TABLE `mst_itemassetspec` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `mst_itemassetspec` ADD CONSTRAINT `fk_mst_itemassetspec_mst_itemspec` FOREIGN KEY (`itemspec_id`) REFERENCES `mst_itemspec` (`itemspec_id`);
ALTER TABLE `mst_itemassetspec` ADD CONSTRAINT `fk_mst_itemassetspec_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





CREATE TABLE `trn_inquiryfiles` (
	`inquiryfiles_id` varchar(14) NOT NULL , 
	`doctype_id` varchar(10) NOT NULL , 
	`inquiryfiles_descr` varchar(90) NOT NULL , 
	`inquiryfiles_order` int(4) NOT NULL DEFAULT 0, 
	`inquiryfiles_file` varchar(90)  , 
	`inquiry_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquiryfiles_doc` (`inquiry_id`, `doctype_id`),
	PRIMARY KEY (`inquiryfiles_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar FIle Inquiry';

ALTER TABLE `trn_inquiryfiles` ADD KEY `doctype_id` (`doctype_id`);

ALTER TABLE `trn_inquiryfiles` ADD CONSTRAINT `fk_trn_inquiryfiles_mst_doctype` FOREIGN KEY (`doctype_id`) REFERENCES `mst_doctype` (`doctype_id`);





CREATE TABLE `mst_itemassetdepre` (
	`itemassetdepre_id` varchar(14) NOT NULL , 
	`itemassetdepre_date` date NOT NULL , 
	`itemassetdepre_value` decimal(11, 2) NOT NULL DEFAULT 0, 
	`itemassetdepre_ref` varchar(30)  , 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetdepre_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Depresiasi Item Asset';

ALTER TABLE `mst_itemassetdepre` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `mst_itemassetdepre` ADD CONSTRAINT `fk_mst_itemassetdepre_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





CREATE TABLE `mst_itemassetbooking` (
	`itemassetbooking_id` varchar(14) NOT NULL , 
	`itemassetbooking_date` date NOT NULL , 
	`assetbooking_id` varchar(14)  , 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetbooking_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Booking';

ALTER TABLE `mst_itemassetbooking` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `mst_itemassetbooking` ADD CONSTRAINT `fk_mst_itemassetbooking_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





CREATE TABLE `log_itemassetmoving` (
	`itemassetmoving_id` varchar(14) NOT NULL , 
	`itemassetmoving_date` date NOT NULL , 
	`itemassetmoving_ref` varchar(30)  , 
	`itemassetmoving_typename` varchar(150)  , 
	`dept_name` varchar(150)  , 
	`site_name` varchar(150)  , 
	`empl_name` varchar(150)  , 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmoving_id`)
) 
ENGINE=InnoDB
COMMENT='Log Moving Item Asset';

ALTER TABLE `log_itemassetmoving` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `log_itemassetmoving` ADD CONSTRAINT `fk_log_itemassetmoving_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





CREATE TABLE `log_itemassetmaintenace` (
	`itemassetmaintenace_id` varchar(14) NOT NULL , 
	`itemassetmaintenace_date` date NOT NULL , 
	`itemassetmaintenace_ref` varchar(30)  , 
	`itemassetmaintenace_typename` varchar(150)  , 
	`itemassetmaintenace_status` varchar(150)  , 
	`partner_name` varchar(150)  , 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmaintenace_id`)
) 
ENGINE=InnoDB
COMMENT='Log Maintenance Item Asset';

ALTER TABLE `log_itemassetmaintenace` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `log_itemassetmaintenace` ADD CONSTRAINT `fk_log_itemassetmaintenace_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





CREATE TABLE `log_itemassetfail` (
	`itemassetfail_id` varchar(14) NOT NULL , 
	`itemassetfail_date` date NOT NULL , 
	`itemassetfail_ref` varchar(30)  , 
	`itemassetfail_descr` varchar(150)  , 
	`empl_name` varchar(150)  , 
	`itemasset_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetfail_id`)
) 
ENGINE=InnoDB
COMMENT='Log Failure Item Asset';

ALTER TABLE `log_itemassetfail` ADD KEY `itemasset_id` (`itemasset_id`);

ALTER TABLE `log_itemassetfail` ADD CONSTRAINT `fk_log_itemassetfail_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);





