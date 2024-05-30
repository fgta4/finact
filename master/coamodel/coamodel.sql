-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coamodel`;


CREATE TABLE IF NOT EXISTS `mst_coamodel` (
	`coamodel_id` varchar(10) NOT NULL , 
	`coamodel_name` varchar(90) NOT NULL , 
	`coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_descr` varchar(90)  , 
	`coareport_id` varchar(2) NOT NULL , 
	`coareportcol_id` varchar(14) NOT NULL , 
	`coareport_col` varchar(1)  , 
	`coa_dk` varchar(1) NOT NULL , 
	`coa_mp` int(1) NOT NULL , 
	`agingmodel_id` varchar(2)  , 
	`coamodel_ispartnermandatory` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coamodel_name` (`coamodel_name`),
	PRIMARY KEY (`coamodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar model COA';


ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coamodel_name` varchar(90) NOT NULL  AFTER `coamodel_id`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `coamodel_name`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coamodel_descr` varchar(90)   AFTER `coamodel_isdisabled`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coareport_id` varchar(2) NOT NULL  AFTER `coamodel_descr`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coareportcol_id` varchar(14) NOT NULL  AFTER `coareport_id`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coareport_col` varchar(1)   AFTER `coareportcol_id`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coa_dk` varchar(1) NOT NULL  AFTER `coareport_col`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coa_mp` int(1) NOT NULL  AFTER `coa_dk`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `agingmodel_id` varchar(2)   AFTER `coa_mp`;
ALTER TABLE `mst_coamodel` ADD COLUMN IF NOT EXISTS  `coamodel_ispartnermandatory` tinyint(1) NOT NULL DEFAULT 0 AFTER `agingmodel_id`;


ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coamodel_name` varchar(90) NOT NULL  AFTER `coamodel_id`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `coamodel_name`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coamodel_descr` varchar(90)   AFTER `coamodel_isdisabled`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coareport_id` varchar(2) NOT NULL  AFTER `coamodel_descr`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coareportcol_id` varchar(14) NOT NULL  AFTER `coareport_id`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coareport_col` varchar(1)   AFTER `coareportcol_id`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coa_dk` varchar(1) NOT NULL  AFTER `coareport_col`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coa_mp` int(1) NOT NULL  AFTER `coa_dk`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `agingmodel_id` varchar(2)   AFTER `coa_mp`;
ALTER TABLE `mst_coamodel` MODIFY COLUMN IF EXISTS  `coamodel_ispartnermandatory` tinyint(1) NOT NULL DEFAULT 0 AFTER `agingmodel_id`;


ALTER TABLE `mst_coamodel` ADD CONSTRAINT `coamodel_name` UNIQUE IF NOT EXISTS  (`coamodel_name`);

ALTER TABLE `mst_coamodel` ADD KEY IF NOT EXISTS `coareport_id` (`coareport_id`);
ALTER TABLE `mst_coamodel` ADD KEY IF NOT EXISTS `coareportcol_id` (`coareportcol_id`);
ALTER TABLE `mst_coamodel` ADD KEY IF NOT EXISTS `agingmodel_id` (`agingmodel_id`);

ALTER TABLE `mst_coamodel` ADD CONSTRAINT `fk_mst_coamodel_mst_coareport` FOREIGN KEY IF NOT EXISTS  (`coareport_id`) REFERENCES `mst_coareport` (`coareport_id`);
ALTER TABLE `mst_coamodel` ADD CONSTRAINT `fk_mst_coamodel_mst_coareportcol` FOREIGN KEY IF NOT EXISTS  (`coareportcol_id`) REFERENCES `mst_coareportcol` (`coareportcol_id`);
ALTER TABLE `mst_coamodel` ADD CONSTRAINT `fk_mst_coamodel_mst_agingmodel` FOREIGN KEY IF NOT EXISTS  (`agingmodel_id`) REFERENCES `mst_agingmodel` (`agingmodel_id`);





