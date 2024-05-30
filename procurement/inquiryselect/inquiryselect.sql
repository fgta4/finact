-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_inquiryselect`;


CREATE TABLE `mst_inquiryselect` (
	`inquiryselect_id` varchar(1) NOT NULL , 
	`inquiryselect_name` varchar(30) NOT NULL , 
	`inquiryselect_descr` varchar(90)  , 
	`inquiryselect_isshowitemasset` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitem` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitemstock` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowpartner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isshowitemclass` tinyint(1) NOT NULL DEFAULT 0, 
	`inquiryselect_isitemclassdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquiryselect_name` (`inquiryselect_name`),
	PRIMARY KEY (`inquiryselect_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Cara Pemilihan Item Inquiry';




INSERT INTO mst_inquiryselect (`inquiryselect_id`, `inquiryselect_name`, `inquiryselect_isshowitemasset`, `inquiryselect_isshowitem`, `inquiryselect_isshowitemstock`, `inquiryselect_isshowpartner`, `inquiryselect_isshowitemclass`, `inquiryselect_isitemclassdisabled`, `_createby`, `_createdate`) VALUES ('A', 'ASSET SELECTION', '1', '0', '0', '0', '1', '1', 'root', NOW());
INSERT INTO mst_inquiryselect (`inquiryselect_id`, `inquiryselect_name`, `inquiryselect_isshowitemasset`, `inquiryselect_isshowitem`, `inquiryselect_isshowitemstock`, `inquiryselect_isshowpartner`, `inquiryselect_isshowitemclass`, `inquiryselect_isitemclassdisabled`, `_createby`, `_createdate`) VALUES ('C', 'CLASS SELECTION', '0', '0', '0', '0', '1', '0', 'root', NOW());
INSERT INTO mst_inquiryselect (`inquiryselect_id`, `inquiryselect_name`, `inquiryselect_isshowitemasset`, `inquiryselect_isshowitem`, `inquiryselect_isshowitemstock`, `inquiryselect_isshowpartner`, `inquiryselect_isshowitemclass`, `inquiryselect_isitemclassdisabled`, `_createby`, `_createdate`) VALUES ('I', 'ITEM SELECTION', '0', '1', '0', '0', '1', '1', 'root', NOW());
INSERT INTO mst_inquiryselect (`inquiryselect_id`, `inquiryselect_name`, `inquiryselect_isshowitemasset`, `inquiryselect_isshowitem`, `inquiryselect_isshowitemstock`, `inquiryselect_isshowpartner`, `inquiryselect_isshowitemclass`, `inquiryselect_isitemclassdisabled`, `_createby`, `_createdate`) VALUES ('P', 'PARTNER SELECTION', '0', '0', '0', '1', '1', '1', 'root', NOW());
INSERT INTO mst_inquiryselect (`inquiryselect_id`, `inquiryselect_name`, `inquiryselect_isshowitemasset`, `inquiryselect_isshowitem`, `inquiryselect_isshowitemstock`, `inquiryselect_isshowpartner`, `inquiryselect_isshowitemclass`, `inquiryselect_isitemclassdisabled`, `_createby`, `_createdate`) VALUES ('S', 'STOCK SELECTION', '0', '0', '1', '0', '1', '1', 'root', NOW());



