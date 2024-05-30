-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_settl`;
-- drop table if exists `trn_settlitem`;
-- drop table if exists `trn_settlappr`;


CREATE TABLE `trn_settl` (
	`settl_id` varchar(14) NOT NULL , 
	`settl_ref` varchar(30)  , 
	`periodemo_id` varchar(6) NOT NULL , 
	`settl_date` date NOT NULL , 
	`billinpaym_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`settl_descr` varchar(255) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`adv_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`adv_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`adv_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`rmb_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`rmb_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`rmb_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`ret_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`ret_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ret_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`paym_jurnal_id` varchar(14)  , 
	`paym_jurnaldetil_id` varchar(14)  , 
	`adv_coa_id` varchar(20)  , 
	`dept_id` varchar(30)  , 
	`doc_id` varchar(30) NOT NULL , 
	`settl_version` int(4) NOT NULL DEFAULT 0, 
	`settl_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`settl_commitby` varchar(14)  , 
	`settl_commitdate` datetime  , 
	`settl_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`settl_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`settl_approveby` varchar(14)  , 
	`settl_approvedate` datetime  , 
	`settl_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`settl_declineby` varchar(14)  , 
	`settl_declinedate` datetime  , 
	`settl_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`settl_postby` varchar(14)  , 
	`settl_postdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`settl_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';

ALTER TABLE `trn_settl` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_settl` ADD KEY `billinpaym_id` (`billinpaym_id`);
ALTER TABLE `trn_settl` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_settl` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_settl` ADD KEY `paym_jurnal_id` (`paym_jurnal_id`);
ALTER TABLE `trn_settl` ADD KEY `paym_jurnaldetil_id` (`paym_jurnaldetil_id`);
ALTER TABLE `trn_settl` ADD KEY `adv_coa_id` (`adv_coa_id`);
ALTER TABLE `trn_settl` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_settl` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_trn_billinpaym` FOREIGN KEY (`billinpaym_id`) REFERENCES `trn_billinpaym` (`billinpaym_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_trn_jurnal` FOREIGN KEY (`paym_jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_trn_jurnaldetil` FOREIGN KEY (`paym_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_coa` FOREIGN KEY (`adv_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_settlitem` (
	`settlitem_id` varchar(14) NOT NULL , 
	`itemasset_id` varchar(14)  , 
	`item_id` varchar(14)  , 
	`itemstock_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`settlitem_descr` varchar(90) NOT NULL , 
	`settlitem_qty` int(4) NOT NULL DEFAULT 0, 
	`settlitem_days` int(4) NOT NULL DEFAULT 0, 
	`settlitem_task` int(4) NOT NULL DEFAULT 0, 
	`settlitem_rate` int(14) NOT NULL DEFAULT 0, 
	`settlitem_value` int(14) NOT NULL DEFAULT 0, 
	`curr_id` varchar(30)  , 
	`settlitem_currrate` int(14) NOT NULL DEFAULT 0, 
	`settlitem_idr` int(14) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`settl_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`settlitem_id`)
) 
ENGINE=InnoDB
COMMENT='Settlement';

ALTER TABLE `trn_settlitem` ADD KEY `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_settlitem` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_settlitem` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `trn_settlitem` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_settlitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_settlitem` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_settlitem` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_settlitem` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_settlitem` ADD KEY `settl_id` (`settl_id`);

ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_settlitem` ADD CONSTRAINT `fk_trn_settlitem_trn_settl` FOREIGN KEY (`settl_id`) REFERENCES `trn_settl` (`settl_id`);





CREATE TABLE `trn_settlappr` (
	`settlappr_id` varchar(14) NOT NULL , 
	`settlappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`settlappr_by` varchar(14)  , 
	`settlappr_date` datetime  , 
	`settl_version` int(4) NOT NULL DEFAULT 0, 
	`settlappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`settlappr_declinedby` varchar(14)  , 
	`settlappr_declineddate` datetime  , 
	`settlappr_notes` varchar(255)  , 
	`settl_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `settl_auth_id` (`settl_id`, `auth_id`),
	PRIMARY KEY (`settlappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_settlappr` ADD KEY `settl_id` (`settl_id`);

ALTER TABLE `trn_settlappr` ADD CONSTRAINT `fk_trn_settlappr_trn_settl` FOREIGN KEY (`settl_id`) REFERENCES `trn_settl` (`settl_id`);





