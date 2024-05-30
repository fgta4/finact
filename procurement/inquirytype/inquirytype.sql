-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_inquirytype`;
-- drop table if exists `mst_inquirytypepartnertype`;
-- drop table if exists `mst_inquirytypetrxmodel`;
-- drop table if exists `mst_inquirytypeitemclass`;


CREATE TABLE IF NOT EXISTS `mst_inquirytype` (
	`inquirytype_id` varchar(14) NOT NULL , 
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquirytype_name` varchar(90) NOT NULL , 
	`inquirytype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_descr` varchar(255)  , 
	`inquiryselect_id` varchar(1) NOT NULL , 
	`inquirytype_isperempl` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_id` varchar(2) NOT NULL , 
	`related_dept_id` varchar(30)  , 
	`related_team_id` varchar(14)  , 
	`site_id` varchar(30)  , 
	`room_id` varchar(30)  , 
	`inquirytype_isallowadvance` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isemplaspartner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_maxadvancevalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`owner_dept_id` varchar(30)  , 
	`owner_team_id` varchar(14)  , 
	`orderout_dept_id` varchar(30) NOT NULL , 
	`orderout_team_id` varchar(14)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`inquiry_title_ina` varchar(90)  , 
	`inquiry_title_eng` varchar(90)  , 
	`inquiry_doc_id` varchar(30) NOT NULL , 
	`request_title_ina` varchar(90)  , 
	`request_title_eng` varchar(90)  , 
	`request_doc_id` varchar(30) NOT NULL , 
	`orderout_title_ina` varchar(90)  , 
	`orderout_title_eng` varchar(90)  , 
	`orderout_doc_id` varchar(30) NOT NULL , 
	`inquiryselect_isshowitemasset` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitem` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitemstock` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitemclass` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isitemclassdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isuseqty` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isusedays` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isusetask` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitqty` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitdays` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimittask` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isallowitemunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isallowoverbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptuser` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptowner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptmaintainer` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_istoberequest` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isautorequest` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isautoorder` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_ismovinginit` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytype_name` (`inquirytype_name`),
	PRIMARY KEY (`inquirytype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Inquiry';


ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirymodel_id` varchar(1) NOT NULL  AFTER `inquirytype_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_name` varchar(90) NOT NULL  AFTER `inquirymodel_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_name`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_descr` varchar(255)   AFTER `inquirytype_isdisabled`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_id` varchar(1) NOT NULL  AFTER `inquirytype_descr`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isperempl` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `itemmanage_id` varchar(2) NOT NULL  AFTER `inquirytype_isperempl`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `related_dept_id` varchar(30)   AFTER `itemmanage_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `related_team_id` varchar(14)   AFTER `related_dept_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30)   AFTER `related_team_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `room_id` varchar(30)   AFTER `site_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isallowadvance` tinyint(1) NOT NULL DEFAULT 0 AFTER `room_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isemplaspartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isallowadvance`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_maxadvancevalue` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `inquirytype_isemplaspartner`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `inquirytype_maxadvancevalue`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `owner_team_id` varchar(14)   AFTER `owner_dept_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `orderout_dept_id` varchar(30) NOT NULL  AFTER `owner_team_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `orderout_team_id` varchar(14)   AFTER `orderout_dept_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `orderout_team_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiry_title_ina` varchar(90)   AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiry_title_eng` varchar(90)   AFTER `inquiry_title_ina`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiry_doc_id` varchar(30) NOT NULL  AFTER `inquiry_title_eng`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `request_title_ina` varchar(90)   AFTER `inquiry_doc_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `request_title_eng` varchar(90)   AFTER `request_title_ina`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `request_doc_id` varchar(30) NOT NULL  AFTER `request_title_eng`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `orderout_title_ina` varchar(90)   AFTER `request_doc_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `orderout_title_eng` varchar(90)   AFTER `orderout_title_ina`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `orderout_doc_id` varchar(30) NOT NULL  AFTER `orderout_title_eng`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isshowitemasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderout_doc_id`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isshowitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isshowitemasset`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isshowitemstock` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isshowitem`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isshowpartner` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isshowitemstock`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isshowitemclass` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isshowpartner`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquiryselect_isitemclassdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isshowitemclass`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquiryselect_isitemclassdisabled`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isuseqty` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_ispartnerheader`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isusedays` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isuseqty`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isusetask` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isusedays`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_islimitqty` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isusetask`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_islimitdays` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_islimitqty`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_islimittask` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_islimitdays`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_islimitvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_islimittask`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_islimitvalue`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isallowitemunbudget` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isallowunbudget`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isallowoverbudget` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isallowitemunbudget`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isdeptuser` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isallowoverbudget`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isdeptowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isdeptuser`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isdeptmaintainer` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isdeptowner`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isdeptmaintainer`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_istoberequest` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isqtybreakdown`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isautorequest` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_istoberequest`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isautoorder` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isautorequest`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_ismovinginit` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_isautoorder`;
ALTER TABLE `mst_inquirytype` ADD COLUMN IF NOT EXISTS  `inquirytype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirytype_ismovinginit`;


ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirymodel_id` varchar(1) NOT NULL   AFTER `inquirytype_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_name` varchar(90) NOT NULL   AFTER `inquirymodel_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_name`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_descr` varchar(255)    AFTER `inquirytype_isdisabled`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_id` varchar(1) NOT NULL   AFTER `inquirytype_descr`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isperempl` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `itemmanage_id` varchar(2) NOT NULL   AFTER `inquirytype_isperempl`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `related_dept_id` varchar(30)    AFTER `itemmanage_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `related_team_id` varchar(14)    AFTER `related_dept_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `site_id` varchar(30)    AFTER `related_team_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `room_id` varchar(30)    AFTER `site_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isallowadvance` tinyint(1) NOT NULL DEFAULT 0  AFTER `room_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isemplaspartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isallowadvance`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_maxadvancevalue` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `inquirytype_isemplaspartner`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `inquirytype_maxadvancevalue`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `owner_team_id` varchar(14)    AFTER `owner_dept_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `orderout_dept_id` varchar(30) NOT NULL   AFTER `owner_team_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `orderout_team_id` varchar(14)    AFTER `orderout_dept_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL   AFTER `orderout_team_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiry_title_ina` varchar(90)    AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiry_title_eng` varchar(90)    AFTER `inquiry_title_ina`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiry_doc_id` varchar(30) NOT NULL   AFTER `inquiry_title_eng`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `request_title_ina` varchar(90)    AFTER `inquiry_doc_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `request_title_eng` varchar(90)    AFTER `request_title_ina`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `request_doc_id` varchar(30) NOT NULL   AFTER `request_title_eng`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `orderout_title_ina` varchar(90)    AFTER `request_doc_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `orderout_title_eng` varchar(90)    AFTER `orderout_title_ina`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `orderout_doc_id` varchar(30) NOT NULL   AFTER `orderout_title_eng`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isshowitemasset` tinyint(1) NOT NULL DEFAULT 0  AFTER `orderout_doc_id`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isshowitem` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isshowitemasset`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isshowitemstock` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isshowitem`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isshowpartner` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isshowitemstock`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isshowitemclass` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isshowpartner`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquiryselect_isitemclassdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isshowitemclass`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquiryselect_isitemclassdisabled`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isuseqty` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_ispartnerheader`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isusedays` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isuseqty`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isusetask` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isusedays`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_islimitqty` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isusetask`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_islimitdays` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_islimitqty`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_islimittask` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_islimitdays`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_islimitvalue` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_islimittask`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_islimitvalue`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isallowitemunbudget` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isallowunbudget`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isallowoverbudget` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isallowitemunbudget`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isdeptuser` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isallowoverbudget`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isdeptowner` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isdeptuser`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isdeptmaintainer` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isdeptowner`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isdeptmaintainer`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_istoberequest` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isqtybreakdown`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isautorequest` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_istoberequest`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isautoorder` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isautorequest`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_ismovinginit` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_isautoorder`;
ALTER TABLE `mst_inquirytype` MODIFY COLUMN IF EXISTS  `inquirytype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirytype_ismovinginit`;


ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `inquirytype_name` UNIQUE IF NOT EXISTS  (`inquirytype_name`);

ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `inquirymodel_id` (`inquirymodel_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `inquiryselect_id` (`inquiryselect_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `related_dept_id` (`related_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `related_team_id` (`related_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `site_id` (`site_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `room_id` (`room_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `owner_team_id` (`owner_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `orderout_dept_id` (`orderout_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `orderout_team_id` (`orderout_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `inquiry_doc_id` (`inquiry_doc_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `request_doc_id` (`request_doc_id`);
ALTER TABLE `mst_inquirytype` ADD KEY IF NOT EXISTS `orderout_doc_id` (`orderout_doc_id`);

ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_inquirymodel` FOREIGN KEY IF NOT EXISTS  (`inquirymodel_id`) REFERENCES `mst_inquirymodel` (`inquirymodel_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_inquiryselect` FOREIGN KEY IF NOT EXISTS  (`inquiryselect_id`) REFERENCES `mst_inquiryselect` (`inquiryselect_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_itemmanage` FOREIGN KEY IF NOT EXISTS  (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept` FOREIGN KEY IF NOT EXISTS  (`related_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team` FOREIGN KEY IF NOT EXISTS  (`related_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_room` FOREIGN KEY IF NOT EXISTS  (`room_id`) REFERENCES `mst_room` (`room_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team_2` FOREIGN KEY IF NOT EXISTS  (`owner_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept_3` FOREIGN KEY IF NOT EXISTS  (`orderout_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team_3` FOREIGN KEY IF NOT EXISTS  (`orderout_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc` FOREIGN KEY IF NOT EXISTS  (`inquiry_doc_id`) REFERENCES `mst_doc` (`doc_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc_2` FOREIGN KEY IF NOT EXISTS  (`request_doc_id`) REFERENCES `mst_doc` (`doc_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc_3` FOREIGN KEY IF NOT EXISTS  (`orderout_doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `mst_inquirytypepartnertype` (
	`inquirytypepartnertype_id` varchar(14) NOT NULL , 
	`partnertype_id` varchar(10) NOT NULL , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypepartnertype_pair` (`inquirytype_id`, `partnertype_id`),
	PRIMARY KEY (`inquirytypepartnertype_id`)
) 
ENGINE=InnoDB
COMMENT='Model transaksi yang diapply ke suatu tipe inquiry';


ALTER TABLE `mst_inquirytypepartnertype` ADD COLUMN IF NOT EXISTS  `partnertype_id` varchar(10) NOT NULL  AFTER `inquirytypepartnertype_id`;
ALTER TABLE `mst_inquirytypepartnertype` ADD COLUMN IF NOT EXISTS  `inquirytype_id` varchar(14) NOT NULL  AFTER `partnertype_id`;


ALTER TABLE `mst_inquirytypepartnertype` MODIFY COLUMN IF EXISTS  `partnertype_id` varchar(10) NOT NULL   AFTER `inquirytypepartnertype_id`;
ALTER TABLE `mst_inquirytypepartnertype` MODIFY COLUMN IF EXISTS  `inquirytype_id` varchar(14) NOT NULL   AFTER `partnertype_id`;


ALTER TABLE `mst_inquirytypepartnertype` ADD CONSTRAINT `inquirytypepartnertype_pair` UNIQUE IF NOT EXISTS  (`inquirytype_id`, `partnertype_id`);

ALTER TABLE `mst_inquirytypepartnertype` ADD KEY IF NOT EXISTS `partnertype_id` (`partnertype_id`);
ALTER TABLE `mst_inquirytypepartnertype` ADD KEY IF NOT EXISTS `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypepartnertype` ADD CONSTRAINT `fk_mst_inquirytypepartnertype_mst_partnertype` FOREIGN KEY IF NOT EXISTS  (`partnertype_id`) REFERENCES `mst_partnertype` (`partnertype_id`);
ALTER TABLE `mst_inquirytypepartnertype` ADD CONSTRAINT `fk_mst_inquirytypepartnertype_mst_inquirytype` FOREIGN KEY IF NOT EXISTS (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





CREATE TABLE IF NOT EXISTS `mst_inquirytypetrxmodel` (
	`inquirytypetrxmodel_id` varchar(14) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`orderout_inquirytype_id` varchar(30)  , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypetrxmodel_pair` (`inquirytype_id`, `trxmodel_id`),
	PRIMARY KEY (`inquirytypetrxmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Model transaksi yang diapply ke suatu tipe inquiry';


ALTER TABLE `mst_inquirytypetrxmodel` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `inquirytypetrxmodel_id`;
ALTER TABLE `mst_inquirytypetrxmodel` ADD COLUMN IF NOT EXISTS  `orderout_inquirytype_id` varchar(30)   AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirytypetrxmodel` ADD COLUMN IF NOT EXISTS  `inquirytype_id` varchar(14) NOT NULL  AFTER `orderout_inquirytype_id`;


ALTER TABLE `mst_inquirytypetrxmodel` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL   AFTER `inquirytypetrxmodel_id`;
ALTER TABLE `mst_inquirytypetrxmodel` MODIFY COLUMN IF EXISTS  `orderout_inquirytype_id` varchar(30)    AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirytypetrxmodel` MODIFY COLUMN IF EXISTS  `inquirytype_id` varchar(14) NOT NULL   AFTER `orderout_inquirytype_id`;


ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `inquirytypetrxmodel_pair` UNIQUE IF NOT EXISTS  (`inquirytype_id`, `trxmodel_id`);

ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY IF NOT EXISTS `orderout_inquirytype_id` (`orderout_inquirytype_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY IF NOT EXISTS `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_inquirytype` FOREIGN KEY IF NOT EXISTS  (`orderout_inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_inquirytype` FOREIGN KEY IF NOT EXISTS (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





CREATE TABLE IF NOT EXISTS `mst_inquirytypeitemclass` (
	`inquirytypeitemclass_id` varchar(14) NOT NULL , 
	`itemclass_id` varchar(14) NOT NULL , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypeitemclass_pair` (`inquirytype_id`, `itemclass_id`),
	PRIMARY KEY (`inquirytypeitemclass_id`)
) 
ENGINE=InnoDB
COMMENT='Itemclass yang diapply ke suatu tipe inquiry';


ALTER TABLE `mst_inquirytypeitemclass` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14) NOT NULL  AFTER `inquirytypeitemclass_id`;
ALTER TABLE `mst_inquirytypeitemclass` ADD COLUMN IF NOT EXISTS  `inquirytype_id` varchar(14) NOT NULL  AFTER `itemclass_id`;


ALTER TABLE `mst_inquirytypeitemclass` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14) NOT NULL   AFTER `inquirytypeitemclass_id`;
ALTER TABLE `mst_inquirytypeitemclass` MODIFY COLUMN IF EXISTS  `inquirytype_id` varchar(14) NOT NULL   AFTER `itemclass_id`;


ALTER TABLE `mst_inquirytypeitemclass` ADD CONSTRAINT `inquirytypeitemclass_pair` UNIQUE IF NOT EXISTS  (`inquirytype_id`, `itemclass_id`);

ALTER TABLE `mst_inquirytypeitemclass` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_inquirytypeitemclass` ADD KEY IF NOT EXISTS `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypeitemclass` ADD CONSTRAINT `fk_mst_inquirytypeitemclass_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_inquirytypeitemclass` ADD CONSTRAINT `fk_mst_inquirytypeitemclass_mst_inquirytype` FOREIGN KEY IF NOT EXISTS (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





