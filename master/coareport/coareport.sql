-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coareport`;
-- drop table if exists `mst_coareportcol`;


CREATE TABLE IF NOT EXISTS `mst_coareport` (
	`coareport_id` varchar(2) NOT NULL , 
	`coareport_name` varchar(30)  , 
	`coareport_descr` varchar(90)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coareport_name` (`coareport_name`),
	PRIMARY KEY (`coareport_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Report COA';


ALTER TABLE `mst_coareport` ADD COLUMN IF NOT EXISTS  `coareport_name` varchar(30)   AFTER `coareport_id`;
ALTER TABLE `mst_coareport` ADD COLUMN IF NOT EXISTS  `coareport_descr` varchar(90)   AFTER `coareport_name`;


ALTER TABLE `mst_coareport` MODIFY COLUMN IF EXISTS  `coareport_name` varchar(30)   AFTER `coareport_id`;
ALTER TABLE `mst_coareport` MODIFY COLUMN IF EXISTS  `coareport_descr` varchar(90)   AFTER `coareport_name`;


ALTER TABLE `mst_coareport` ADD CONSTRAINT `coareport_name` UNIQUE IF NOT EXISTS  (`coareport_name`);







CREATE TABLE IF NOT EXISTS `mst_coareportcol` (
	`coareportcol_id` varchar(14)  , 
	`coareportcol_name` varchar(30)  , 
	`coareport_col` varchar(1)  , 
	`coa_dk` int(1) NOT NULL , 
	`coareport_id` varchar(2)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coareport_col` (`coareport_id`, `coareport_col`),
	PRIMARY KEY (`coareportcol_id`)
) 
ENGINE=InnoDB
COMMENT='Kolom Report COA';


ALTER TABLE `mst_coareportcol` ADD COLUMN IF NOT EXISTS  `coareportcol_name` varchar(30)   AFTER `coareportcol_id`;
ALTER TABLE `mst_coareportcol` ADD COLUMN IF NOT EXISTS  `coareport_col` varchar(1)   AFTER `coareportcol_name`;
ALTER TABLE `mst_coareportcol` ADD COLUMN IF NOT EXISTS  `coa_dk` int(1) NOT NULL  AFTER `coareport_col`;
ALTER TABLE `mst_coareportcol` ADD COLUMN IF NOT EXISTS  `coareport_id` varchar(2)   AFTER `coa_dk`;


ALTER TABLE `mst_coareportcol` MODIFY COLUMN IF EXISTS  `coareportcol_name` varchar(30)   AFTER `coareportcol_id`;
ALTER TABLE `mst_coareportcol` MODIFY COLUMN IF EXISTS  `coareport_col` varchar(1)   AFTER `coareportcol_name`;
ALTER TABLE `mst_coareportcol` MODIFY COLUMN IF EXISTS  `coa_dk` int(1) NOT NULL  AFTER `coareport_col`;
ALTER TABLE `mst_coareportcol` MODIFY COLUMN IF EXISTS  `coareport_id` varchar(2)   AFTER `coa_dk`;


ALTER TABLE `mst_coareportcol` ADD CONSTRAINT `coareport_col` UNIQUE IF NOT EXISTS  (`coareport_id`, `coareport_col`);

ALTER TABLE `mst_coareportcol` ADD KEY IF NOT EXISTS `coareport_id` (`coareport_id`);

ALTER TABLE `mst_coareportcol` ADD CONSTRAINT `fk_mst_coareportcol_mst_coareport` FOREIGN KEY IF NOT EXISTS (`coareport_id`) REFERENCES `mst_coareport` (`coareport_id`);





