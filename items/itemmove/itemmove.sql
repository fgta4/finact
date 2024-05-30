-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_itemmove`;
-- drop table if exists `trn_itemmovedetil`;


CREATE TABLE IF NOT EXISTS `trn_itemmove` (
	`itemmove_id` varchar(30) NOT NULL , 
	`itemmvmodel_id` varchar(10)  , 
	`itemmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 1, 
	`itemmove_descr` varchar(255) NOT NULL , 
	`itemmove_dtfr` date NOT NULL , 
	`itemmove_dtto` date NOT NULL , 
	`fr_site_id` varchar(30)  , 
	`fr_dept_id` varchar(30)  , 
	`to_site_id` varchar(30)  , 
	`to_dept_id` varchar(30)  , 
	`inquiry_id` varchar(30)  , 
	`orderout_id` varchar(30)  , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`itemmove_version` int(4) NOT NULL DEFAULT 0, 
	`itemmove_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmove_commitby` varchar(14)  , 
	`itemmove_commitdate` datetime  , 
	`itemmove_issend` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmove_sendby` varchar(14)  , 
	`itemmove_senddate` datetime  , 
	`itemmove_isrcv` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmove_rcvby` varchar(14)  , 
	`itemmove_rcvdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemmove_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Type Moving Item';


ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmvmodel_id` varchar(10)   AFTER `itemmove_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 1 AFTER `itemmvmodel_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_descr` varchar(255) NOT NULL  AFTER `itemmove_isunreferenced`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_dtfr` date NOT NULL  AFTER `itemmove_descr`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_dtto` date NOT NULL  AFTER `itemmove_dtfr`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `fr_site_id` varchar(30)   AFTER `itemmove_dtto`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `fr_dept_id` varchar(30)   AFTER `fr_site_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `to_site_id` varchar(30)   AFTER `fr_dept_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `to_dept_id` varchar(30)   AFTER `to_site_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `inquiry_id` varchar(30)   AFTER `to_dept_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `orderout_id` varchar(30)   AFTER `inquiry_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `orderout_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_version` int(4) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_version`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_commitby` varchar(14)   AFTER `itemmove_iscommit`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_commitdate` datetime   AFTER `itemmove_commitby`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_commitdate`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_sendby` varchar(14)   AFTER `itemmove_issend`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_senddate` datetime   AFTER `itemmove_sendby`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_isrcv` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_senddate`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_rcvby` varchar(14)   AFTER `itemmove_isrcv`;
ALTER TABLE `trn_itemmove` ADD COLUMN IF NOT EXISTS  `itemmove_rcvdate` datetime   AFTER `itemmove_rcvby`;


ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmvmodel_id` varchar(10)   AFTER `itemmove_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 1 AFTER `itemmvmodel_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_descr` varchar(255) NOT NULL  AFTER `itemmove_isunreferenced`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_dtfr` date NOT NULL  AFTER `itemmove_descr`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_dtto` date NOT NULL  AFTER `itemmove_dtfr`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `fr_site_id` varchar(30)   AFTER `itemmove_dtto`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `fr_dept_id` varchar(30)   AFTER `fr_site_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `to_site_id` varchar(30)   AFTER `fr_dept_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `to_dept_id` varchar(30)   AFTER `to_site_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `inquiry_id` varchar(30)   AFTER `to_dept_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `orderout_id` varchar(30)   AFTER `inquiry_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)   AFTER `orderout_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_version` int(4) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_version`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_commitby` varchar(14)   AFTER `itemmove_iscommit`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_commitdate` datetime   AFTER `itemmove_commitby`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_commitdate`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_sendby` varchar(14)   AFTER `itemmove_issend`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_senddate` datetime   AFTER `itemmove_sendby`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_isrcv` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmove_senddate`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_rcvby` varchar(14)   AFTER `itemmove_isrcv`;
ALTER TABLE `trn_itemmove` MODIFY COLUMN IF EXISTS  `itemmove_rcvdate` datetime   AFTER `itemmove_rcvby`;



ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `itemmvmodel_id` (`itemmvmodel_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `fr_site_id` (`fr_site_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `fr_dept_id` (`fr_dept_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `to_site_id` (`to_site_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `to_dept_id` (`to_dept_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `orderout_id` (`orderout_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_itemmove` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);

ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_itemmvmodel` FOREIGN KEY IF NOT EXISTS  (`itemmvmodel_id`) REFERENCES `mst_itemmvmodel` (`itemmvmodel_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_site` FOREIGN KEY IF NOT EXISTS  (`fr_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_dept` FOREIGN KEY IF NOT EXISTS  (`fr_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_site_2` FOREIGN KEY IF NOT EXISTS  (`to_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`to_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_trn_inquiry` FOREIGN KEY IF NOT EXISTS  (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_trn_orderout` FOREIGN KEY IF NOT EXISTS  (`orderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_itemmove` ADD CONSTRAINT `fk_trn_itemmove_mst_dept_3` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `trn_itemmovedetil` (
	`itemmovedetil_id` varchar(30) NOT NULL , 
	`item_id` varchar(14)  , 
	`item_name` varchar(255)  , 
	`itemmovedetil_qtyprop` int(4) NOT NULL DEFAULT 0, 
	`itemmovedetil_qtysend` int(4) NOT NULL DEFAULT 0, 
	`itemmovedetil_qtyrecv` int(4) NOT NULL DEFAULT 0, 
	`itemmove_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemmovedetil_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item moving';


ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `item_id` varchar(14)   AFTER `itemmovedetil_id`;
ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `item_name` varchar(255)   AFTER `item_id`;
ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `itemmovedetil_qtyprop` int(4) NOT NULL DEFAULT 0 AFTER `item_name`;
ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `itemmovedetil_qtysend` int(4) NOT NULL DEFAULT 0 AFTER `itemmovedetil_qtyprop`;
ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `itemmovedetil_qtyrecv` int(4) NOT NULL DEFAULT 0 AFTER `itemmovedetil_qtysend`;
ALTER TABLE `trn_itemmovedetil` ADD COLUMN IF NOT EXISTS  `itemmove_id` varchar(30) NOT NULL  AFTER `itemmovedetil_qtyrecv`;


ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `item_id` varchar(14)   AFTER `itemmovedetil_id`;
ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `item_name` varchar(255)   AFTER `item_id`;
ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `itemmovedetil_qtyprop` int(4) NOT NULL DEFAULT 0 AFTER `item_name`;
ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `itemmovedetil_qtysend` int(4) NOT NULL DEFAULT 0 AFTER `itemmovedetil_qtyprop`;
ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `itemmovedetil_qtyrecv` int(4) NOT NULL DEFAULT 0 AFTER `itemmovedetil_qtysend`;
ALTER TABLE `trn_itemmovedetil` MODIFY COLUMN IF EXISTS  `itemmove_id` varchar(30) NOT NULL  AFTER `itemmovedetil_qtyrecv`;



ALTER TABLE `trn_itemmovedetil` ADD KEY IF NOT EXISTS `itemmove_id` (`itemmove_id`);

ALTER TABLE `trn_itemmovedetil` ADD CONSTRAINT `fk_trn_itemmovedetil_trn_itemmove` FOREIGN KEY IF NOT EXISTS (`itemmove_id`) REFERENCES `trn_itemmove` (`itemmove_id`);





