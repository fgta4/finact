-- alter table `trn_billinpaym` add column if not exists `pv_jurnal_id` varchar(14)  AFTER `coa_id`;




alter table `trn_billoutdetil` add column if not exists	`billoutdetil_validr_ori` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `coa_id`;
alter table `trn_billoutdetil` add column if not exists	`billoutdetil_validr_rev` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_validr_ori`;
alter table `trn_billoutdetil` add column if not exists	`billoutdetil_validr_var` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `billoutdetil_validr_rev`;
alter table `trn_billoutdetil` add column if not exists	`rev_coa_id` varchar(17) AFTER `billoutdetil_validr_var`;
alter table `trn_billoutdetil` add column if not exists	`periodemo_id` varchar(6) NOT NULL AFTER `rev_coa_id`;
alter table `trn_billoutdetil` add column if not exists	`billoutdetil_bookdate` date NOT NULL AFTER `periodemo_id`;
alter table `trn_billoutdetil` add column if not exists	`billoutdetil_rev_descr` varchar(255) NOT NULL AFTER `billoutdetil_validr_var`;