-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_paymentscd`;
-- drop table if exists `trn_paymentscdbillin`;
-- drop table if exists `trn_paymentscdappr`;


CREATE TABLE `trn_paymentscd` (
	`paymentscd_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`paymentscd_dtstart` date NOT NULL , 
	`paymentscd_dtend` date NOT NULL , 
	`paymentscd_descr` varchar(255) NOT NULL , 
	`dept_id` varchar(30)  , 
	`paymentscd_notes` varchar(255)  , 
	`paymentscd_version` int(4) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`paymentscd_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscd_commitby` varchar(14)  , 
	`paymentscd_commitdate` datetime  , 
	`paymentscd_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscd_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscd_approveby` varchar(14)  , 
	`paymentscd_approvedate` datetime  , 
	`paymentscd_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscd_declineby` varchar(14)  , 
	`paymentscd_declinedate` datetime  , 
	`paymentscd_isveryfied` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscd_verifyby` varchar(14)  , 
	`paymentscd_verifydate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`paymentscd_id`)
) 
ENGINE=InnoDB
COMMENT='Jadwal pembayaran';

ALTER TABLE `trn_paymentscd` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_paymentscd` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_paymentscd` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_paymentscd` ADD CONSTRAINT `fk_trn_paymentscd_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_paymentscd` ADD CONSTRAINT `fk_trn_paymentscd_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_paymentscd` ADD CONSTRAINT `fk_trn_paymentscd_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_paymentscdbillin` (
	`paymentscdbillin_id` varchar(14) NOT NULL , 
	`billinpaym_id` varchar(14) NOT NULL , 
	`billinpaym_date` date NOT NULL , 
	`billinpaym_datescd` date NOT NULL , 
	`billinpaym_descr` varchar(255) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`billinpaym_frgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billinpaym_itemfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_itemidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billin_id` varchar(14) NOT NULL , 
	`paymentscd_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`paymentscdbillin_id`)
) 
ENGINE=InnoDB
COMMENT='Jadwal pembayaran tagihan';

ALTER TABLE `trn_paymentscdbillin` ADD KEY `billinpaym_id` (`billinpaym_id`);
ALTER TABLE `trn_paymentscdbillin` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_paymentscdbillin` ADD KEY `paymentscd_id` (`paymentscd_id`);

ALTER TABLE `trn_paymentscdbillin` ADD CONSTRAINT `fk_trn_paymentscdbillin_trn_billinpaym` FOREIGN KEY (`billinpaym_id`) REFERENCES `trn_billinpaym` (`billinpaym_id`);
ALTER TABLE `trn_paymentscdbillin` ADD CONSTRAINT `fk_trn_paymentscdbillin_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_paymentscdbillin` ADD CONSTRAINT `fk_trn_paymentscdbillin_trn_paymentscd` FOREIGN KEY (`paymentscd_id`) REFERENCES `trn_paymentscd` (`paymentscd_id`);





CREATE TABLE `trn_paymentscdappr` (
	`paymentscdappr_id` varchar(14) NOT NULL , 
	`paymentscdappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscdappr_by` varchar(14)  , 
	`paymentscdappr_date` datetime  , 
	`paymentscd_version` int(4) NOT NULL DEFAULT 0, 
	`paymentscdappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`paymentscdappr_declinedby` varchar(14)  , 
	`paymentscdappr_declineddate` datetime  , 
	`paymentscdappr_notes` varchar(255)  , 
	`paymentscd_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `paymentscd_auth_id` (`paymentscd_id`, `auth_id`),
	PRIMARY KEY (`paymentscdappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_paymentscdappr` ADD KEY `paymentscd_id` (`paymentscd_id`);

ALTER TABLE `trn_paymentscdappr` ADD CONSTRAINT `fk_trn_paymentscdappr_trn_paymentscd` FOREIGN KEY (`paymentscd_id`) REFERENCES `trn_paymentscd` (`paymentscd_id`);





