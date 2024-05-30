-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_periodemo`;


CREATE TABLE IF NOT EXISTS `mst_periodemo` (
	`periodemo_id` varchar(6) NOT NULL , 
	`periodemo_name` varchar(30) NOT NULL , 
	`periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`periodemo_year` int(4) NOT NULL , 
	`periodemo_month` int(2) NOT NULL , 
	`periodemo_dtstart` date NOT NULL , 
	`periodemo_dtend` date NOT NULL , 
	`periodemo_prev` varchar(6) NOT NULL , 
	`periodemo_closeby` varchar(14)  , 
	`periodemo_closedate` date  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `periodemo_prev` (`periodemo_prev`),
	PRIMARY KEY (`periodemo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Periode Bulanan';


ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_name` varchar(30) NOT NULL  AFTER `periodemo_id`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0 AFTER `periodemo_name`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_year` int(4) NOT NULL  AFTER `periodemo_isclosed`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_month` int(2) NOT NULL  AFTER `periodemo_year`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_dtstart` date NOT NULL  AFTER `periodemo_month`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_dtend` date NOT NULL  AFTER `periodemo_dtstart`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_prev` varchar(6) NOT NULL  AFTER `periodemo_dtend`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_closeby` varchar(14)   AFTER `periodemo_prev`;
ALTER TABLE `mst_periodemo` ADD COLUMN IF NOT EXISTS  `periodemo_closedate` date   AFTER `periodemo_closeby`;


ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_name` varchar(30) NOT NULL   AFTER `periodemo_id`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0  AFTER `periodemo_name`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_year` int(4) NOT NULL   AFTER `periodemo_isclosed`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_month` int(2) NOT NULL   AFTER `periodemo_year`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_dtstart` date NOT NULL   AFTER `periodemo_month`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_dtend` date NOT NULL   AFTER `periodemo_dtstart`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_prev` varchar(6) NOT NULL   AFTER `periodemo_dtend`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_closeby` varchar(14)    AFTER `periodemo_prev`;
ALTER TABLE `mst_periodemo` MODIFY COLUMN IF EXISTS  `periodemo_closedate` date    AFTER `periodemo_closeby`;


ALTER TABLE `mst_periodemo` ADD CONSTRAINT `periodemo_prev` UNIQUE IF NOT EXISTS  (`periodemo_prev`);

ALTER TABLE `mst_periodemo` ADD KEY IF NOT EXISTS `periodemo_prev` (`periodemo_prev`);

ALTER TABLE `mst_periodemo` ADD CONSTRAINT `fk_mst_periodemo_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_prev`) REFERENCES `mst_periodemo` (`periodemo_id`);





