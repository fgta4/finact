-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_inquirymodel`;


CREATE TABLE IF NOT EXISTS `mst_inquirymodel` (
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquirymodel_name` varchar(30) NOT NULL , 
	`inquirymodel_descr` varchar(90)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`inquirymodel_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirymodel_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirymodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirymodel_name` (`inquirymodel_name`),
	PRIMARY KEY (`inquirymodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Inquiry';


ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_name` varchar(30) NOT NULL  AFTER `inquirymodel_id`;
ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_descr` varchar(90)   AFTER `inquirymodel_name`;
ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `inquirymodel_descr`;
ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0 AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirymodel_ispartnerheader`;
ALTER TABLE `mst_inquirymodel` ADD COLUMN IF NOT EXISTS  `inquirymodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0 AFTER `inquirymodel_isqtybreakdown`;


ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `inquirymodel_name` varchar(30) NOT NULL   AFTER `inquirymodel_id`;
ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `inquirymodel_descr` varchar(90)    AFTER `inquirymodel_name`;
ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL   AFTER `inquirymodel_descr`;
ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `inquirymodel_ispartnerheader` tinyint(1) NOT NULL DEFAULT 0  AFTER `trxmodel_id`;
ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `inquirymodel_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirymodel_ispartnerheader`;
ALTER TABLE `mst_inquirymodel` MODIFY COLUMN IF EXISTS  `inquirymodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0  AFTER `inquirymodel_isqtybreakdown`;


ALTER TABLE `mst_inquirymodel` ADD CONSTRAINT `inquirymodel_name` UNIQUE IF NOT EXISTS  (`inquirymodel_name`);

ALTER TABLE `mst_inquirymodel` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);

ALTER TABLE `mst_inquirymodel` ADD CONSTRAINT `fk_mst_inquirymodel_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);





