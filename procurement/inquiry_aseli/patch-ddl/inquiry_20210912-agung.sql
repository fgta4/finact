
alter table `trn_inquiry` add column if not exists `paymto_upphone` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_upposition` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_upname` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `partnercontact_id` varchar(14)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_bankname` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_bankaccname` varchar(90)   AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_bankacc` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymto_name` varchar(90)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `partnerbank_id` varchar(14)  AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `paymtype_id` varchar(6) AFTER `inquiry_isadvance`;
alter table `trn_inquiry` add column if not exists `partner_id` varchar(30) AFTER `inquiry_isadvance`;

-- 
ALTER TABLE `trn_inquiry` ADD KEY if not exists `partner_id` (`partner_id`);
ALTER TABLE `trn_inquiry` ADD KEY if not exists `partnercontact_id` (`partnercontact_id`);
ALTER TABLE `trn_inquiry` ADD KEY if not exists `partnerbank_id` (`partnerbank_id`);
ALTER TABLE `trn_inquiry` ADD KEY if not exists `paymtype_id` (`paymtype_id`);
-- 
-- 
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_partner` FOREIGN KEY  if not exists (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_partnercontact` FOREIGN KEY if not exists (`partnercontact_id`) REFERENCES `mst_partnercontact` (`partnercontact_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_partnerbank` FOREIGN KEY if not exists (`partnerbank_id`) REFERENCES `mst_partnerbank` (`partnerbank_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_paymtype` FOREIGN KEY if not exists (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
-- 



alter table `trn_inquirydetil` add column if not exists `item_id` varchar(14)  AFTER `inquiry_id`;
ALTER TABLE `trn_inquirydetil` ADD KEY if not exists `item_id` (`item_id`);
ALTER TABLE `trn_inquirydetil` ADD CONSTRAINT `fk_trn_inquirydetil_mst_item` FOREIGN KEY  if not exists (`item_id`) REFERENCES `mst_item` (`item_id`);

alter table `trn_inquirydetil` add column if not exists `inquirydetil_budgetavailable` decimal(14, 0) not null default 0  AFTER `inquirydetil_qtyavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_value` decimal(14, 0) not null default 0  AFTER `inquirydetil_estvalue`;
alter table `trn_inquirydetil` modify column if exists `inquirydetil_estvalue` decimal(14, 0) not null default 0;



-- agung, 20210916
alter table `trn_inquirydetil` add column if not exists `projbudgetdet_id` varchar(14) not null AFTER `inquirydetil_budgetavailable`;
ALTER TABLE `trn_inquirydetil` ADD KEY if not exists `projbudgetdet_id` (`projbudgetdet_id`);
ALTER TABLE `trn_inquirydetil` ADD CONSTRAINT `fk_trn_inquirydetil_mst_projbudgetdet` FOREIGN KEY  if not exists (`projbudgetdet_id`) REFERENCES `mst_projbudgetdet` (`projbudgetdet_id`);


-- agung, 20210917
alter table `trn_inquiry` modify column if exists `inquirydetil_id` varchar(30) not null;
alter table `trn_inquirydetil` modify column if exists `inquirydetil_id` varchar(30) not null;


-- agung, 20210918
alter table `trn_inquiry` add column if not exists `inquiry_selectfield` varchar(6) NOT NULL DEFAULT '000000' after `doc_id`;




-- agung 20211009
alter table `trn_inquirydetil` add column if not exists `inquirydetil_budgettaskavailable` int(6) not null default 0  AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_budgetdaysavailable` int(6) not null default 0  AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_budgetqtyavailable` int(6) not null default 0  AFTER `inquirydetil_budgetavailable`;

alter table `trn_inquirydetil` add column if not exists `inquirydetil_islimitvalue` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_islimittask` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_islimitdays` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_islimitqty` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_isusetask` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_isusedays` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;
alter table `trn_inquirydetil` add column if not exists `inquirydetil_isuseqty` tinyint(1) not null default 0 AFTER `inquirydetil_budgetavailable`;




alter table `trn_inquiry` add column if not exists `request_dept_id` varchar(30) AFTER `owner_dept_id`;
ALTER TABLE `trn_inquiry` ADD KEY if not exists `request_dept_id` (`request_dept_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_dept_request` FOREIGN KEY  if not exists (`request_dept_id`) REFERENCES `mst_dept` (`dept_id`);




-- agung, 20211027
alter table `trn_inquirydetil` add column if not exists `inquirydetil_isadvproces` tinyint(1) not null default 0 AFTER `inquirydetil_value`;



alter table `trn_inquiry` add column if not exists `partner_id`  varchar(30)   AFTER `doc_id`;
alter table `trn_inquiry` add column if not exists `inquiry_isemplaspartner` tinyint(1) not null default 0 AFTER `partner_id`;

ALTER TABLE `trn_inquiry` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);


--- agung, 20211108
alter table `trn_inquirydetil` add column if not exists `empl_id` varchar(30) not null default 0 AFTER `itemclass_id`;
alter table `trn_inquirydetil` add column if not exists `hrgrd_id` varchar(10) not null default 0 AFTER `empl_id`;

