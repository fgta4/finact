-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_recv`;
-- drop table if exists `trn_recvitem`;
-- drop table if exists `trn_recvitemreg`;


CREATE TABLE `trn_recv` (
	`recv_id` varchar(30) NOT NULL , 
	`unit_id` varchar(30)  , 
	`orderout_id` varchar(30) NOT NULL , 
	`recv_ref` varchar(90) NOT NULL , 
	`recv_descr` varchar(255) NOT NULL , 
	`recv_date` date NOT NULL , 
	`partner_id` varchar(30)  , 
	`site_id` varchar(30)  , 
	`empl_id` varchar(30)  , 
	`recv_dept_id` varchar(30) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquiryselect_id` varchar(1) NOT NULL , 
	`itemmanage_id` varchar(2) NOT NULL , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`orderout_dept_id` varchar(30) NOT NULL , 
	`user_dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30)  , 
	`projecttask_id` varchar(14)  , 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`recv_version` int(4) NOT NULL DEFAULT 0, 
	`recv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`recv_commitby` varchar(14)  , 
	`recv_commitdate` datetime  , 
	`recv_isrecv` tinyint(1) NOT NULL DEFAULT 0, 
	`recv_recvby` varchar(14)  , 
	`recv_recvdate` datetime  , 
	`recv_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`recv_postby` varchar(14)  , 
	`recv_postdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`recv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Penerimaan';

ALTER TABLE `trn_recv` ADD KEY `unit_id` (`unit_id`);
ALTER TABLE `trn_recv` ADD KEY `orderout_id` (`orderout_id`);
ALTER TABLE `trn_recv` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_recv` ADD KEY `site_id` (`site_id`);
ALTER TABLE `trn_recv` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_recv` ADD KEY `recv_dept_id` (`recv_dept_id`);
ALTER TABLE `trn_recv` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_recv` ADD KEY `inquirymodel_id` (`inquirymodel_id`);
ALTER TABLE `trn_recv` ADD KEY `inquiryselect_id` (`inquiryselect_id`);
ALTER TABLE `trn_recv` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `trn_recv` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_recv` ADD KEY `orderout_dept_id` (`orderout_dept_id`);
ALTER TABLE `trn_recv` ADD KEY `user_dept_id` (`user_dept_id`);
ALTER TABLE `trn_recv` ADD KEY `project_id` (`project_id`);
ALTER TABLE `trn_recv` ADD KEY `projecttask_id` (`projecttask_id`);
ALTER TABLE `trn_recv` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_recv` ADD KEY `projbudgettask_id` (`projbudgettask_id`);

ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_trn_orderout` FOREIGN KEY (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_dept` FOREIGN KEY (`recv_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_inquirymodel` FOREIGN KEY (`inquirymodel_id`) REFERENCES `mst_inquirymodel` (`inquirymodel_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_inquiryselect` FOREIGN KEY (`inquiryselect_id`) REFERENCES `mst_inquiryselect` (`inquiryselect_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_dept_2` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_dept_3` FOREIGN KEY (`orderout_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_dept_4` FOREIGN KEY (`user_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_projbudgettask` FOREIGN KEY (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);





CREATE TABLE `trn_recvitem` (
	`recvitem_id` varchar(14) NOT NULL , 
	`itemasset_id` varchar(14)  , 
	`item_id` varchar(14)  , 
	`itemstock_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`recvitem_descr` varchar(90) NOT NULL , 
	`recvitem_qty` int(4) NOT NULL DEFAULT 0, 
	`recvitem_value` int(14) NOT NULL DEFAULT 0, 
	`curr_id` varchar(30)  , 
	`recvitem_idr` int(14) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`orderout_id` varchar(30)  , 
	`orderoutitem_id` varchar(14)  , 
	`request_id` varchar(30)  , 
	`requestitem_id` varchar(14)  , 
	`inquiry_id` varchar(30)  , 
	`inquiryitem_id` varchar(14)  , 
	`recv_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`recvitem_id`)
) 
ENGINE=InnoDB
COMMENT='Item yang di receive';

ALTER TABLE `trn_recvitem` ADD KEY `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_recvitem` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_recvitem` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `trn_recvitem` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_recvitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_recvitem` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_recvitem` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_recvitem` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_recvitem` ADD KEY `orderout_id` (`orderout_id`);
ALTER TABLE `trn_recvitem` ADD KEY `orderoutitem_id` (`orderoutitem_id`);
ALTER TABLE `trn_recvitem` ADD KEY `request_id` (`request_id`);
ALTER TABLE `trn_recvitem` ADD KEY `requestitem_id` (`requestitem_id`);
ALTER TABLE `trn_recvitem` ADD KEY `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_recvitem` ADD KEY `inquiryitem_id` (`inquiryitem_id`);
ALTER TABLE `trn_recvitem` ADD KEY `recv_id` (`recv_id`);

ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_orderout` FOREIGN KEY (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_orderoutitem` FOREIGN KEY (`orderoutitem_id`) REFERENCES `trn_orderoutitem` (`orderoutitem_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_request` FOREIGN KEY (`request_id`) REFERENCES `trn_request` (`request_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_requestitem` FOREIGN KEY (`requestitem_id`) REFERENCES `trn_requestitem` (`requestitem_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_inquirydetil` FOREIGN KEY (`inquiryitem_id`) REFERENCES `trn_inquirydetil` (`inquirydetil_id`);
ALTER TABLE `trn_recvitem` ADD CONSTRAINT `fk_trn_recvitem_trn_recv` FOREIGN KEY (`recv_id`) REFERENCES `trn_recv` (`recv_id`);





CREATE TABLE `trn_recvitemreg` (
	`recvitemreg_id` varchar(14) NOT NULL , 
	`recvitem_descr` varchar(90) NOT NULL , 
	`recvitem_serial` varchar(90)  , 
	`item_id` varchar(14) NOT NULL DEFAULT 0, 
	`itemclass_id` varchar(14) NOT NULL DEFAULT 0, 
	`recvitem_qty` int(4) NOT NULL DEFAULT 0, 
	`recvitem_value` int(14) NOT NULL DEFAULT 0, 
	`recvitem_idr` int(14) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`recvitem_id` varchar(14) NOT NULL,
	`recvitem_seq` int(4) NOT NULL DEFAULT 0,
	`orderout_id` varchar(30)  , 
	`orderoutitem_id` varchar(14)  , 
	`request_id` varchar(30)  , 
	`requestitem_id` varchar(14)  , 
	`inquiry_id` varchar(30)  , 
	`inquiryitem_id` varchar(14)  , 
	`recv_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`recvitemreg_id`)
) 
ENGINE=InnoDB
COMMENT='Item yang di receive';

ALTER TABLE `trn_recvitemreg` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `recvitem_id` (`recvitem_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `recvitem_seq` (`recvitem_seq`);
ALTER TABLE `trn_recvitemreg` ADD KEY `orderout_id` (`orderout_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `orderoutitem_id` (`orderoutitem_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `request_id` (`request_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `requestitem_id` (`requestitem_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `inquiryitem_id` (`inquiryitem_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY `recv_id` (`recv_id`);

ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_recvitem` FOREIGN KEY (`recvitem_id`) REFERENCES `trn_recvitem` (`recvitem_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_orderout` FOREIGN KEY (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_orderoutitem` FOREIGN KEY (`orderoutitem_id`) REFERENCES `trn_orderoutitem` (`orderoutitem_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_request` FOREIGN KEY (`request_id`) REFERENCES `trn_request` (`request_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_requestdetil` FOREIGN KEY (`requestitem_id`) REFERENCES `trn_requestitem` (`requestitem_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_inquirydetil` FOREIGN KEY (`inquiryitem_id`) REFERENCES `trn_inquirydetil` (`inquirydetil_id`);
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_recv` FOREIGN KEY (`recv_id`) REFERENCES `trn_recv` (`recv_id`);





