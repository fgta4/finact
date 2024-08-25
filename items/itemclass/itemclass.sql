-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemclass`;
-- drop table if exists `mst_itemclassaccbudget`;
-- drop table if exists `mst_itemclassfiles`;


CREATE TABLE IF NOT EXISTS `mst_itemclass` (
	`itemclass_id` varchar(14) NOT NULL , 
	`itemmodel_id` varchar(10) NOT NULL , 
	`itemmanage_id` varchar(2) NOT NULL , 
	`itemclass_name` varchar(30) NOT NULL , 
	`itemclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isadvproces` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_descr` varchar(90)  , 
	`itemclassgroup_id` varchar(17)  , 
	`owner_unit_id` varchar(10)  , 
	`owner_dept_id` varchar(30)  , 
	`maintainer_dept_id` varchar(30)  , 
	`unitmeasurement_id` varchar(10) NOT NULL , 
	`itemclass_minassetvalue` decimal(11, 2) NOT NULL DEFAULT 0, 
	`inquiry_accbudget_id` varchar(20)  , 
	`nr_coa_id` varchar(17)  , 
	`lr_coa_id` varchar(17)  , 
	`depremodel_id` varchar(10)  , 
	`itemclass_depreage` int(2) NOT NULL DEFAULT 5, 
	`itemclass_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1, 
	`itemclass_isallowoverqty` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowoverdays` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowovertask` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowovervalue` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0, 
	`depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemclass_name` (`itemclass_name`),
	PRIMARY KEY (`itemclass_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Klasifikasi Item';


ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmodel_id` varchar(10) NOT NULL  AFTER `itemclass_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_id` varchar(2) NOT NULL  AFTER `itemmodel_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_name` varchar(30) NOT NULL  AFTER `itemmanage_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_name`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isadvproces` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isdisabled`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_descr` varchar(90)   AFTER `itemclass_isadvproces`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclassgroup_id` varchar(17)   AFTER `itemclass_descr`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `owner_unit_id` varchar(10)   AFTER `itemclassgroup_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30)   AFTER `owner_unit_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `maintainer_dept_id` varchar(30)   AFTER `owner_dept_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `unitmeasurement_id` varchar(10) NOT NULL  AFTER `maintainer_dept_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_minassetvalue` decimal(11, 2) NOT NULL DEFAULT 0 AFTER `unitmeasurement_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `inquiry_accbudget_id` varchar(20)   AFTER `itemclass_minassetvalue`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `nr_coa_id` varchar(17)   AFTER `inquiry_accbudget_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `lr_coa_id` varchar(17)   AFTER `nr_coa_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `depremodel_id` varchar(10)   AFTER `lr_coa_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_depreage` int(2) NOT NULL DEFAULT 5 AFTER `depremodel_id`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1 AFTER `itemclass_depreage`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isallowoverqty` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_depreresidu`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isallowoverdays` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isallowoverqty`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isallowovertask` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isallowoverdays`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isallowovervalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isallowovertask`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isallowovervalue`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemclass_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isallowunbudget`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_isindependentsetting`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_isintangible`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_issellable`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_isnonitem`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmodel_ishasmainteinerdept`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `depremodel_isautocalc`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbyassetowner`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbystockowner`;
ALTER TABLE `mst_itemclass` ADD COLUMN IF NOT EXISTS  `itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemmanage_isbynonitemowner`;


ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmodel_id` varchar(10) NOT NULL   AFTER `itemclass_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_id` varchar(2) NOT NULL   AFTER `itemmodel_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_name` varchar(30) NOT NULL   AFTER `itemmanage_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_name`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isadvproces` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isdisabled`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_descr` varchar(90)    AFTER `itemclass_isadvproces`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclassgroup_id` varchar(17)    AFTER `itemclass_descr`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `owner_unit_id` varchar(10)    AFTER `itemclassgroup_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30)    AFTER `owner_unit_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `maintainer_dept_id` varchar(30)    AFTER `owner_dept_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `unitmeasurement_id` varchar(10) NOT NULL   AFTER `maintainer_dept_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_minassetvalue` decimal(11, 2) NOT NULL DEFAULT 0  AFTER `unitmeasurement_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `inquiry_accbudget_id` varchar(20)    AFTER `itemclass_minassetvalue`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `nr_coa_id` varchar(17)    AFTER `inquiry_accbudget_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `lr_coa_id` varchar(17)    AFTER `nr_coa_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `depremodel_id` varchar(10)    AFTER `lr_coa_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_depreage` int(2) NOT NULL DEFAULT 5  AFTER `depremodel_id`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1  AFTER `itemclass_depreage`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isallowoverqty` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_depreresidu`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isallowoverdays` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isallowoverqty`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isallowovertask` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isallowoverdays`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isallowovervalue` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isallowovertask`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isallowovervalue`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemclass_isindependentsetting` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isallowunbudget`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemclass_isindependentsetting`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmodel_isintangible`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmodel_issellable`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmodel_ishasmainteinerdept` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmodel_isnonitem`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_isasset` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmodel_ishasmainteinerdept`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `depremodel_isautocalc` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmanage_isasset`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_isbyassetowner` tinyint(1) NOT NULL DEFAULT 0  AFTER `depremodel_isautocalc`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_isbystockowner` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmanage_isbyassetowner`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_isbynonitemowner` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmanage_isbystockowner`;
ALTER TABLE `mst_itemclass` MODIFY COLUMN IF EXISTS  `itemmanage_isbypartnerselect` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemmanage_isbynonitemowner`;


ALTER TABLE `mst_itemclass` ADD CONSTRAINT `itemclass_name` UNIQUE IF NOT EXISTS  (`itemclass_name`);

ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `itemmodel_id` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `itemclassgroup_id` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `owner_unit_id` (`owner_unit_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `maintainer_dept_id` (`maintainer_dept_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `unitmeasurement_id` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `inquiry_accbudget_id` (`inquiry_accbudget_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `nr_coa_id` (`nr_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `lr_coa_id` (`lr_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY IF NOT EXISTS `depremodel_id` (`depremodel_id`);

ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmodel` FOREIGN KEY IF NOT EXISTS  (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmanage` FOREIGN KEY IF NOT EXISTS  (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemclassgroup` FOREIGN KEY IF NOT EXISTS  (`itemclassgroup_id`) REFERENCES `mst_itemclassgroup` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_unit` FOREIGN KEY IF NOT EXISTS  (`owner_unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_dept` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`maintainer_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_unitmeasurement` FOREIGN KEY IF NOT EXISTS  (`unitmeasurement_id`) REFERENCES `mst_unitmeasurement` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`inquiry_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa` FOREIGN KEY IF NOT EXISTS  (`nr_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa_2` FOREIGN KEY IF NOT EXISTS  (`lr_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_depremodel` FOREIGN KEY IF NOT EXISTS  (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);





CREATE TABLE IF NOT EXISTS `mst_itemclassaccbudget` (
	`itemclassaccbudget_id` varchar(14) NOT NULL , 
	`projectmodel_id` varchar(10)  , 
	`inquiry_accbudget_id` varchar(20) NOT NULL , 
	`nr_coa_id` varchar(17)  , 
	`lr_coa_id` varchar(17)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemclassaccbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Account yang direlasikan ke itemclass ini';


ALTER TABLE `mst_itemclassaccbudget` ADD COLUMN IF NOT EXISTS  `projectmodel_id` varchar(10)   AFTER `itemclassaccbudget_id`;
ALTER TABLE `mst_itemclassaccbudget` ADD COLUMN IF NOT EXISTS  `inquiry_accbudget_id` varchar(20) NOT NULL  AFTER `projectmodel_id`;
ALTER TABLE `mst_itemclassaccbudget` ADD COLUMN IF NOT EXISTS  `nr_coa_id` varchar(17)   AFTER `inquiry_accbudget_id`;
ALTER TABLE `mst_itemclassaccbudget` ADD COLUMN IF NOT EXISTS  `lr_coa_id` varchar(17)   AFTER `nr_coa_id`;
ALTER TABLE `mst_itemclassaccbudget` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14) NOT NULL  AFTER `lr_coa_id`;


ALTER TABLE `mst_itemclassaccbudget` MODIFY COLUMN IF EXISTS  `projectmodel_id` varchar(10)    AFTER `itemclassaccbudget_id`;
ALTER TABLE `mst_itemclassaccbudget` MODIFY COLUMN IF EXISTS  `inquiry_accbudget_id` varchar(20) NOT NULL   AFTER `projectmodel_id`;
ALTER TABLE `mst_itemclassaccbudget` MODIFY COLUMN IF EXISTS  `nr_coa_id` varchar(17)    AFTER `inquiry_accbudget_id`;
ALTER TABLE `mst_itemclassaccbudget` MODIFY COLUMN IF EXISTS  `lr_coa_id` varchar(17)    AFTER `nr_coa_id`;
ALTER TABLE `mst_itemclassaccbudget` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14) NOT NULL   AFTER `lr_coa_id`;



ALTER TABLE `mst_itemclassaccbudget` ADD KEY IF NOT EXISTS `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY IF NOT EXISTS `inquiry_accbudget_id` (`inquiry_accbudget_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY IF NOT EXISTS `nr_coa_id` (`nr_coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY IF NOT EXISTS `lr_coa_id` (`lr_coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);

ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_projectmodel` FOREIGN KEY IF NOT EXISTS  (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`inquiry_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_coa` FOREIGN KEY IF NOT EXISTS  (`nr_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_coa_2` FOREIGN KEY IF NOT EXISTS  (`lr_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_itemclass` FOREIGN KEY IF NOT EXISTS (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);





CREATE TABLE IF NOT EXISTS `mst_itemclassfiles` (
	`itemclassfiles_id` varchar(14) NOT NULL , 
	`doctype_id` varchar(10) NOT NULL , 
	`itemclassfiles_descr` varchar(90) NOT NULL , 
	`itemclassfiles_order` int(4) NOT NULL DEFAULT 0, 
	`itemclassfiles_file` varchar(90)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemclassfiles_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar FIle Inquiry';


ALTER TABLE `mst_itemclassfiles` ADD COLUMN IF NOT EXISTS  `doctype_id` varchar(10) NOT NULL  AFTER `itemclassfiles_id`;
ALTER TABLE `mst_itemclassfiles` ADD COLUMN IF NOT EXISTS  `itemclassfiles_descr` varchar(90) NOT NULL  AFTER `doctype_id`;
ALTER TABLE `mst_itemclassfiles` ADD COLUMN IF NOT EXISTS  `itemclassfiles_order` int(4) NOT NULL DEFAULT 0 AFTER `itemclassfiles_descr`;
ALTER TABLE `mst_itemclassfiles` ADD COLUMN IF NOT EXISTS  `itemclassfiles_file` varchar(90)   AFTER `itemclassfiles_order`;
ALTER TABLE `mst_itemclassfiles` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14) NOT NULL  AFTER `itemclassfiles_file`;


ALTER TABLE `mst_itemclassfiles` MODIFY COLUMN IF EXISTS  `doctype_id` varchar(10) NOT NULL   AFTER `itemclassfiles_id`;
ALTER TABLE `mst_itemclassfiles` MODIFY COLUMN IF EXISTS  `itemclassfiles_descr` varchar(90) NOT NULL   AFTER `doctype_id`;
ALTER TABLE `mst_itemclassfiles` MODIFY COLUMN IF EXISTS  `itemclassfiles_order` int(4) NOT NULL DEFAULT 0  AFTER `itemclassfiles_descr`;
ALTER TABLE `mst_itemclassfiles` MODIFY COLUMN IF EXISTS  `itemclassfiles_file` varchar(90)    AFTER `itemclassfiles_order`;
ALTER TABLE `mst_itemclassfiles` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14) NOT NULL   AFTER `itemclassfiles_file`;



ALTER TABLE `mst_itemclassfiles` ADD KEY IF NOT EXISTS `doctype_id` (`doctype_id`);
ALTER TABLE `mst_itemclassfiles` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);

ALTER TABLE `mst_itemclassfiles` ADD CONSTRAINT `fk_mst_itemclassfiles_mst_doctype` FOREIGN KEY IF NOT EXISTS  (`doctype_id`) REFERENCES `mst_doctype` (`doctype_id`);
ALTER TABLE `mst_itemclassfiles` ADD CONSTRAINT `fk_mst_itemclassfiles_mst_itemclass` FOREIGN KEY IF NOT EXISTS (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);





