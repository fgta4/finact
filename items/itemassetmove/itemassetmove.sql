-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_itemassetmove`;
-- drop table if exists `trn_itemassetmovedetil`;


CREATE TABLE IF NOT EXISTS `trn_itemassetmove` (
	`itemassetmove_id` varchar(30) NOT NULL , 
	`inquiry_id` varchar(14)  , 
	`itemassetmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmovemodel_id` varchar(14) NOT NULL , 
	`itemassetmovetype_id` varchar(14) NOT NULL , 
	`itemassetmove_dtstart` date NOT NULL , 
	`itemassetmove_dtexpected` date NOT NULL , 
	`itemassetmove_dtend` date NOT NULL , 
	`itemassetmove_descr` varchar(90) NOT NULL , 
	`user_dept_id` varchar(30) NOT NULL , 
	`from_site_id` varchar(30) NOT NULL , 
	`from_room_id` varchar(30) NOT NULL , 
	`from_empl_id` varchar(30)  , 
	`to_dept_id` varchar(30) NOT NULL , 
	`to_site_id` varchar(30) NOT NULL , 
	`to_room_id` varchar(30)  , 
	`to_empl_id` varchar(30)  , 
	`doc_id` varchar(30) NOT NULL , 
	`itemassetmove_version` int(4) NOT NULL DEFAULT 0, 
	`itemassetmove_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_isdept` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_isemployee` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_issite` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_isroom` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_isreturn` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_commitby` varchar(14)  , 
	`itemassetmove_commitdate` datetime  , 
	`itemassetmove_issend` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_sendby` varchar(14)  , 
	`itemassetmove_senddate` datetime  , 
	`itemassetmove_isrcv` tinyint(1) NOT NULL DEFAULT 0, 
	`itemassetmove_rcvby` varchar(14)  , 
	`itemassetmove_rcvdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmove_id`)
) 
ENGINE=InnoDB
COMMENT='Perubahan Lokasi Asset';


ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `inquiry_id` varchar(14)   AFTER `itemassetmove_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiry_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmovemodel_id` varchar(14) NOT NULL  AFTER `itemassetmove_isunreferenced`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmovetype_id` varchar(14) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_dtstart` date NOT NULL  AFTER `itemassetmovetype_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_dtexpected` date NOT NULL  AFTER `itemassetmove_dtstart`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_dtend` date NOT NULL  AFTER `itemassetmove_dtexpected`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_descr` varchar(90) NOT NULL  AFTER `itemassetmove_dtend`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `user_dept_id` varchar(30) NOT NULL  AFTER `itemassetmove_descr`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `from_site_id` varchar(30) NOT NULL  AFTER `user_dept_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `from_room_id` varchar(30) NOT NULL  AFTER `from_site_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `from_empl_id` varchar(30)   AFTER `from_room_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `to_dept_id` varchar(30) NOT NULL  AFTER `from_empl_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `to_site_id` varchar(30) NOT NULL  AFTER `to_dept_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `to_room_id` varchar(30)   AFTER `to_site_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `to_empl_id` varchar(30)   AFTER `to_room_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `to_empl_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_version`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isdateinterval`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isdept`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isemployee`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_issite`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isreturn` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isroom`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isreturn`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_commitby` varchar(14)   AFTER `itemassetmove_iscommit`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_commitdate` datetime   AFTER `itemassetmove_commitby`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_commitdate`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_sendby` varchar(14)   AFTER `itemassetmove_issend`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_senddate` datetime   AFTER `itemassetmove_sendby`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_isrcv` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_senddate`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_rcvby` varchar(14)   AFTER `itemassetmove_isrcv`;
ALTER TABLE `trn_itemassetmove` ADD COLUMN IF NOT EXISTS  `itemassetmove_rcvdate` datetime   AFTER `itemassetmove_rcvby`;


ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `inquiry_id` varchar(14)   AFTER `itemassetmove_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiry_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmovemodel_id` varchar(14) NOT NULL  AFTER `itemassetmove_isunreferenced`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmovetype_id` varchar(14) NOT NULL  AFTER `itemassetmovemodel_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_dtstart` date NOT NULL  AFTER `itemassetmovetype_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_dtexpected` date NOT NULL  AFTER `itemassetmove_dtstart`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_dtend` date NOT NULL  AFTER `itemassetmove_dtexpected`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_descr` varchar(90) NOT NULL  AFTER `itemassetmove_dtend`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `user_dept_id` varchar(30) NOT NULL  AFTER `itemassetmove_descr`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `from_site_id` varchar(30) NOT NULL  AFTER `user_dept_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `from_room_id` varchar(30) NOT NULL  AFTER `from_site_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `from_empl_id` varchar(30)   AFTER `from_room_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `to_dept_id` varchar(30) NOT NULL  AFTER `from_empl_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `to_site_id` varchar(30) NOT NULL  AFTER `to_dept_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `to_room_id` varchar(30)   AFTER `to_site_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `to_empl_id` varchar(30)   AFTER `to_room_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `to_empl_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_version`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isdateinterval`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isemployee` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isdept`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_issite` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isemployee`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isroom` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_issite`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isreturn` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isroom`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_isreturn`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_commitby` varchar(14)   AFTER `itemassetmove_iscommit`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_commitdate` datetime   AFTER `itemassetmove_commitby`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_issend` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_commitdate`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_sendby` varchar(14)   AFTER `itemassetmove_issend`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_senddate` datetime   AFTER `itemassetmove_sendby`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_isrcv` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemassetmove_senddate`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_rcvby` varchar(14)   AFTER `itemassetmove_isrcv`;
ALTER TABLE `trn_itemassetmove` MODIFY COLUMN IF EXISTS  `itemassetmove_rcvdate` datetime   AFTER `itemassetmove_rcvby`;



ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `itemassetmovemodel_id` (`itemassetmovemodel_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `itemassetmovetype_id` (`itemassetmovetype_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `user_dept_id` (`user_dept_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `from_site_id` (`from_site_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `from_room_id` (`from_room_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `from_empl_id` (`from_empl_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `to_dept_id` (`to_dept_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `to_site_id` (`to_site_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `to_room_id` (`to_room_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `to_empl_id` (`to_empl_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_trn_inquiry` FOREIGN KEY IF NOT EXISTS  (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_itemassetmovemodel` FOREIGN KEY IF NOT EXISTS  (`itemassetmovemodel_id`) REFERENCES `mst_itemassetmovemodel` (`itemassetmovemodel_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_itemassetmovetype` FOREIGN KEY IF NOT EXISTS  (`itemassetmovetype_id`) REFERENCES `mst_itemassetmovetype` (`itemassetmovetype_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_dept` FOREIGN KEY IF NOT EXISTS  (`user_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_site` FOREIGN KEY IF NOT EXISTS  (`from_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_room` FOREIGN KEY IF NOT EXISTS  (`from_room_id`) REFERENCES `mst_room` (`room_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_empl` FOREIGN KEY IF NOT EXISTS  (`from_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`to_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_site_2` FOREIGN KEY IF NOT EXISTS  (`to_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_room_2` FOREIGN KEY IF NOT EXISTS  (`to_room_id`) REFERENCES `mst_room` (`room_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_empl_2` FOREIGN KEY IF NOT EXISTS  (`to_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_itemassetmovedetil` (
	`itemassetmovedetil_id` varchar(30) NOT NULL , 
	`itemasset_id` varchar(14) NOT NULL , 
	`item_id` varchar(14)  , 
	`itemclass_id` varchar(14)  , 
	`itemassetmovedetil_qty` int(4) NOT NULL DEFAULT 0, 
	`send_itemassetstatus_id` varchar(2) NOT NULL , 
	`itemassetmovedetil_senddescr` varchar(255)  , 
	`recv_itemassetstatus_id` varchar(2)  , 
	`itemassetmovedetil_recvdescr` varchar(255)  , 
	`itemassetmove_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmovedetil_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Request Pembelian, Sewa, Service, Talent, dll';


ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemasset_id` varchar(14) NOT NULL  AFTER `itemassetmovedetil_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `item_id` varchar(14)   AFTER `itemasset_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `item_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemassetmovedetil_qty` int(4) NOT NULL DEFAULT 0 AFTER `itemclass_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `send_itemassetstatus_id` varchar(2) NOT NULL  AFTER `itemassetmovedetil_qty`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemassetmovedetil_senddescr` varchar(255)   AFTER `send_itemassetstatus_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `recv_itemassetstatus_id` varchar(2)   AFTER `itemassetmovedetil_senddescr`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemassetmovedetil_recvdescr` varchar(255)   AFTER `recv_itemassetstatus_id`;
ALTER TABLE `trn_itemassetmovedetil` ADD COLUMN IF NOT EXISTS  `itemassetmove_id` varchar(30) NOT NULL  AFTER `itemassetmovedetil_recvdescr`;


ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemasset_id` varchar(14) NOT NULL  AFTER `itemassetmovedetil_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `item_id` varchar(14)   AFTER `itemasset_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)   AFTER `item_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemassetmovedetil_qty` int(4) NOT NULL DEFAULT 0 AFTER `itemclass_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `send_itemassetstatus_id` varchar(2) NOT NULL  AFTER `itemassetmovedetil_qty`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemassetmovedetil_senddescr` varchar(255)   AFTER `send_itemassetstatus_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `recv_itemassetstatus_id` varchar(2)   AFTER `itemassetmovedetil_senddescr`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemassetmovedetil_recvdescr` varchar(255)   AFTER `recv_itemassetstatus_id`;
ALTER TABLE `trn_itemassetmovedetil` MODIFY COLUMN IF EXISTS  `itemassetmove_id` varchar(30) NOT NULL  AFTER `itemassetmovedetil_recvdescr`;



ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `item_id` (`item_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `send_itemassetstatus_id` (`send_itemassetstatus_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `recv_itemassetstatus_id` (`recv_itemassetstatus_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY IF NOT EXISTS `itemassetmove_id` (`itemassetmove_id`);

ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_itemasset` FOREIGN KEY IF NOT EXISTS  (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_item` FOREIGN KEY IF NOT EXISTS  (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_itemassetstatus` FOREIGN KEY IF NOT EXISTS  (`send_itemassetstatus_id`) REFERENCES `mst_itemassetstatus` (`itemassetstatus_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_itemassetstatus_2` FOREIGN KEY IF NOT EXISTS  (`recv_itemassetstatus_id`) REFERENCES `mst_itemassetstatus` (`itemassetstatus_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_trn_itemassetmove` FOREIGN KEY IF NOT EXISTS (`itemassetmove_id`) REFERENCES `trn_itemassetmove` (`itemassetmove_id`);





