-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_ordermodel`;


CREATE TABLE IF NOT EXISTS `mst_ordermodel` (
	`ordermodel_id` varchar(5) NOT NULL , 
	`ordermodel_name` varchar(30) NOT NULL , 
	`ordermodel_descr` varchar(255)  , 
	`orderdir_id` varchar(1) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `ordermodel_name` (`ordermodel_name`),
	PRIMARY KEY (`ordermodel_id`)
) 
ENGINE=InnoDB
COMMENT='Model Order';


ALTER TABLE `mst_ordermodel` ADD COLUMN IF NOT EXISTS  `ordermodel_name` varchar(30) NOT NULL  AFTER `ordermodel_id`;
ALTER TABLE `mst_ordermodel` ADD COLUMN IF NOT EXISTS  `ordermodel_descr` varchar(255)   AFTER `ordermodel_name`;
ALTER TABLE `mst_ordermodel` ADD COLUMN IF NOT EXISTS  `orderdir_id` varchar(1) NOT NULL  AFTER `ordermodel_descr`;


ALTER TABLE `mst_ordermodel` MODIFY COLUMN IF EXISTS  `ordermodel_name` varchar(30) NOT NULL   AFTER `ordermodel_id`;
ALTER TABLE `mst_ordermodel` MODIFY COLUMN IF EXISTS  `ordermodel_descr` varchar(255)    AFTER `ordermodel_name`;
ALTER TABLE `mst_ordermodel` MODIFY COLUMN IF EXISTS  `orderdir_id` varchar(1) NOT NULL   AFTER `ordermodel_descr`;


ALTER TABLE `mst_ordermodel` ADD CONSTRAINT `ordermodel_name` UNIQUE IF NOT EXISTS  (`ordermodel_name`);

ALTER TABLE `mst_ordermodel` ADD KEY IF NOT EXISTS `orderdir_id` (`orderdir_id`);

ALTER TABLE `mst_ordermodel` ADD CONSTRAINT `fk_mst_ordermodel_mst_orderdir` FOREIGN KEY IF NOT EXISTS  (`orderdir_id`) REFERENCES `mst_orderdir` (`orderdir_id`);


INSERT INTO mst_ordermodel (`ordermodel_id`, `ordermodel_name`, `orderdir_id`, `_createby`, `_createdate`) VALUES ('I01', 'TFI Sales Order (auto)', 'I', 'root', NOW());
INSERT INTO mst_ordermodel (`ordermodel_id`, `ordermodel_name`, `orderdir_id`, `_createby`, `_createdate`) VALUES ('O01', 'PO to principal', 'O', 'root', NOW());



