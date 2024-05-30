-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_bankbook`;
-- drop table if exists `trn_bankbookdetil`;


CREATE TABLE `trn_bankbook` (
	`bankbook_id` varchar(14) NOT NULL , 
	`bankbook_date` date NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`bankrekening_id` varchar(20) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `bankbook_date` (`bankrekening_id`, `bankbook_date`),
	PRIMARY KEY (`bankbook_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar ';

ALTER TABLE `trn_bankbook` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_bankbook` ADD KEY `bankrekening_id` (`bankrekening_id`);
ALTER TABLE `trn_bankbook` ADD KEY `curr_id` (`curr_id`);

ALTER TABLE `trn_bankbook` ADD CONSTRAINT `fk_trn_bankbook_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_bankbook` ADD CONSTRAINT `fk_trn_bankbook_mst_bankrekening` FOREIGN KEY (`bankrekening_id`) REFERENCES `mst_bankrekening` (`bankrekening_id`);
ALTER TABLE `trn_bankbook` ADD CONSTRAINT `fk_trn_bankbook_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);





CREATE TABLE `trn_bankbookdetil` (
	`bankbookdetil_id` varchar(14) NOT NULL , 
	`bankbookdetil_ref` varchar(60) NOT NULL , 
	`bankbookdetil_valfrgd` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_valfrgk` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_valfrgsaldo` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_validrd` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_validrk` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_validrsaldo` decimal(14, 2) NOT NULL DEFAULT 0, 
	`bankbookdetil_notes` varchar(90) NOT NULL , 
	`bankbook_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`bankbookdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Detil buku bank';

ALTER TABLE `trn_bankbookdetil` ADD KEY `bankbook_id` (`bankbook_id`);

ALTER TABLE `trn_bankbookdetil` ADD CONSTRAINT `fk_trn_bankbookdetil_trn_bankbook` FOREIGN KEY (`bankbook_id`) REFERENCES `trn_bankbook` (`bankbook_id`);





