
alter table `trn_billinpaym` add column if not exists `coa_id` varchar(17)  AFTER `billin_id`;
alter table `trn_billinpaym` add column if not exists `pv_jurnal_id` varchar(14)  AFTER `coa_id`;




ALTER TABLE `trn_billinpaym` ADD KEY if not exists `coa_id` (`coa_id`);
ALTER TABLE `trn_billinpaym` ADD CONSTRAINT `fk_trn_billinpaym_mst_coa` FOREIGN KEY  if not exists (`coa_id`) REFERENCES `mst_coa` (`coa_id`);


ALTER TABLE `trn_billinpaym` ADD KEY if not exists `pv_jurnal_id` (`pv_jurnal_id`);
ALTER TABLE `trn_billinpaym` ADD CONSTRAINT `fk_trn_billinpaym_trn_jurnal` FOREIGN KEY  if not exists (`pv_jurnal_id`) REFERENCES `mst_coa` (`pv_jurnal_id`);







alter table `trn_billin` add column if not exists `inquiry_id` varchar(14)  AFTER `billtype_id`;
ALTER TABLE `trn_billin` ADD KEY if not exists `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_billin` ADD CONSTRAINT `fk_trn_billin_trn_inquiry` FOREIGN KEY  if not exists (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);





