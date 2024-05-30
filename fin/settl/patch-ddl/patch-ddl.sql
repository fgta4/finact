
alter table `trn_settl` add column if not exists `inquiry_id` varchar(14)  AFTER `ret_validr`;
ALTER TABLE `trn_settl` ADD KEY if not exists `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_settl` ADD CONSTRAINT `fk_trn_settl_trn_inquiry` FOREIGN KEY  if not exists (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);


