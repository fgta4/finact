alter table `trn_request` modify column if exists `inquiry_id` varchar(30) not null;


alter table `trn_requestitem` add column if not exists `inquiry_id` varchar(30) not null after `projbudgetdet_id`;
ALTER TABLE `trn_requestitem` ADD KEY if not exists `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_trn_inquiry` FOREIGN KEY  if not exists (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);




alter table `trn_request` add column if not exists `request_dept_id` varchar(30) AFTER `owner_dept_id`;
ALTER TABLE `trn_request` ADD KEY if not exists `request_dept_id` (`request_dept_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_dept_request` FOREIGN KEY  if not exists (`request_dept_id`) REFERENCES `mst_dept` (`dept_id`);




-- agung, 20211027
alter table `trn_requestitem` add column if not exists `requestitem_isadvproces` tinyint(1) not null default 0 AFTER `projbudgetdet_id`;



