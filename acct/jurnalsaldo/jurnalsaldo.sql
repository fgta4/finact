-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_jurnalsaldo`;
-- drop table if exists `trn_jurnalsummary`;


CREATE TABLE IF NOT EXISTS `trn_jurnalsaldo` (
	`jurnalsaldo_id` varchar(36) NOT NULL , 
	`jurnalsaldo_date` date NOT NULL , 
	`jurnal_id` varchar(30)  , 
	`jurnal_date` date  , 
	`jurnal_duedate` date  , 
	`jurnaldetil_id` varchar(14)  , 
	`jurnaldetil_descr` varchar(255)  , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`coamodel_id` varchar(10) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(14)  , 
	`project_id` varchar(30)  , 
	`curr_id` varchar(10)  , 
	`saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0, 
	`saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0, 
	`periodemo_id` varchar(6) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalsaldo_periode` (`periodemo_id`, `coa_id`, `unit_id`, `dept_id`, `partner_id`, `project_id`, `curr_id`),
	UNIQUE KEY `jurnalsaldo_aging` (`periodemo_id`, `jurnaldetil_id`),
	PRIMARY KEY (`jurnalsaldo_id`)
) 
ENGINE=InnoDB
COMMENT='Saldo Ledger & Aging Periode Bulanan';


ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnalsaldo_date` date NOT NULL  AFTER `jurnalsaldo_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnal_id` varchar(30)   AFTER `jurnalsaldo_date`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnal_date` date   AFTER `jurnal_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnal_duedate` date   AFTER `jurnal_date`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnaldetil_id` varchar(14)   AFTER `jurnal_duedate`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnaldetil_descr` varchar(255)   AFTER `jurnaldetil_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `coamodel_id` varchar(10) NOT NULL  AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17) NOT NULL  AFTER `coamodel_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `coa_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14)   AFTER `dept_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10)   AFTER `project_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `saldoawal_frg`;
ALTER TABLE `trn_jurnalsaldo` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `saldoawal_idr`;


ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnalsaldo_date` date NOT NULL   AFTER `jurnalsaldo_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnal_id` varchar(30)    AFTER `jurnalsaldo_date`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnal_date` date    AFTER `jurnal_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnal_duedate` date    AFTER `jurnal_date`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnaldetil_id` varchar(14)    AFTER `jurnal_duedate`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnaldetil_descr` varchar(255)    AFTER `jurnaldetil_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnaldetil_descr`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `jurnaldetil_valfrg`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `coamodel_id` varchar(10) NOT NULL   AFTER `jurnaldetil_validr`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17) NOT NULL   AFTER `coamodel_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)    AFTER `coa_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14)    AFTER `dept_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)    AFTER `partner_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10)    AFTER `project_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `saldoawal_frg`;
ALTER TABLE `trn_jurnalsaldo` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL   AFTER `saldoawal_idr`;


ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `jurnalsaldo_periode` UNIQUE IF NOT EXISTS  (`periodemo_id`, `coa_id`, `unit_id`, `dept_id`, `partner_id`, `project_id`, `curr_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `jurnalsaldo_aging` UNIQUE IF NOT EXISTS  (`periodemo_id`, `jurnaldetil_id`);

ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `coamodel_id` (`coamodel_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `project_id` (`project_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS  `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_coamodel` FOREIGN KEY IF NOT EXISTS (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_coa` FOREIGN KEY IF NOT EXISTS (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_partner` FOREIGN KEY IF NOT EXISTS (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_project` FOREIGN KEY IF NOT EXISTS (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_curr` FOREIGN KEY IF NOT EXISTS (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_periodemo` FOREIGN KEY IF NOT EXISTS (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE IF NOT EXISTS `trn_jurnalsummary` (
	`jurnalsummary_id` varchar(36) NOT NULL , 
	`coamodel_id` varchar(10) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(14)  , 
	`project_id` varchar(30)  , 
	`curr_id` varchar(10)  , 
	`saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0, 
	`debet_frg` decimal(16, 2) NOT NULL DEFAULT 0, 
	`kredit_frg` decimal(16, 2) NOT NULL DEFAULT 0, 
	`saldoakhir_frg` decimal(16, 2) NOT NULL DEFAULT 0, 
	`saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0, 
	`debet_idr` decimal(16, 2) NOT NULL DEFAULT 0, 
	`kredit_idr` decimal(16, 2) NOT NULL DEFAULT 0, 
	`saldoakhir_idr` decimal(16, 2) NOT NULL DEFAULT 0, 
	`periodemo_id` varchar(6) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `periodesummary_periode` (`periodemo_id`, `coa_id`, `unit_id`, `dept_id`, `partner_id`, `project_id`, `curr_id`),
	PRIMARY KEY (`jurnalsummary_id`)
) 
ENGINE=InnoDB
COMMENT='Summary Periode Bulanan, terisi pada saat periode sudah close';


ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `coamodel_id` varchar(10) NOT NULL  AFTER `jurnalsummary_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17) NOT NULL  AFTER `coamodel_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `coa_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14)   AFTER `dept_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10)   AFTER `project_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `debet_frg` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `saldoawal_frg`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `kredit_frg` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `debet_frg`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `saldoakhir_frg` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `kredit_frg`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `saldoakhir_frg`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `debet_idr` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `saldoawal_idr`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `kredit_idr` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `debet_idr`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `saldoakhir_idr` decimal(16, 2) NOT NULL DEFAULT 0 AFTER `kredit_idr`;
ALTER TABLE `trn_jurnalsummary` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `saldoakhir_idr`;


ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `coamodel_id` varchar(10) NOT NULL   AFTER `jurnalsummary_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17) NOT NULL   AFTER `coamodel_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)    AFTER `coa_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14)    AFTER `dept_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)    AFTER `partner_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10)    AFTER `project_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `saldoawal_frg` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `debet_frg` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `saldoawal_frg`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `kredit_frg` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `debet_frg`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `saldoakhir_frg` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `kredit_frg`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `saldoawal_idr` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `saldoakhir_frg`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `debet_idr` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `saldoawal_idr`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `kredit_idr` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `debet_idr`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `saldoakhir_idr` decimal(16, 2) NOT NULL DEFAULT 0  AFTER `kredit_idr`;
ALTER TABLE `trn_jurnalsummary` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL   AFTER `saldoakhir_idr`;


ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `periodesummary_periode` UNIQUE IF NOT EXISTS  (`periodemo_id`, `coa_id`, `unit_id`, `dept_id`, `partner_id`, `project_id`, `curr_id`);

ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `coamodel_id` (`coamodel_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `project_id` (`project_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS  `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnalsummary` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_coamodel` FOREIGN KEY IF NOT EXISTS (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_coa` FOREIGN KEY IF NOT EXISTS (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_partner` FOREIGN KEY IF NOT EXISTS (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_project` FOREIGN KEY IF NOT EXISTS (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_curr` FOREIGN KEY IF NOT EXISTS (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnalsummary` ADD CONSTRAINT `fk_trn_jurnalsummary_mst_periodemo` FOREIGN KEY IF NOT EXISTS (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





