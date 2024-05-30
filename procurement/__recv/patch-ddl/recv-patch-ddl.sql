-- 20210925, agung 
alter table `trn_recvitemreg` add column if not exists `recvitem_id` varchar(14) NOT NULL AFTER `coa_id`;
alter table `trn_recvitemreg` add column if not exists `recvitem_seq` int(4) NOT NULL DEFAULT 0 AFTER `recvitem_id`;


ALTER TABLE `trn_recvitemreg` ADD KEY if not exists `recvitem_id` (`recvitem_id`);
ALTER TABLE `trn_recvitemreg` ADD KEY  if not exists `recvitem_seq` (`recvitem_seq`);


ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_recvitem` FOREIGN KEY  if not exists  (`recvitem_id`) REFERENCES `trn_recvitem` (`recvitem_id`);


ALTER TABLE `trn_recvitemreg` DROP CONSTRAINT if exists`fk_trn_recvitemreg_trn_requestdetil`; 
ALTER TABLE `trn_recvitemreg` ADD CONSTRAINT `fk_trn_recvitemreg_trn_requestdetil` FOREIGN KEY if not exists (`requestitem_id`) REFERENCES `trn_requestitem` (`requestitem_id`);



alter table `trn_recv` add column if not exists `request_dept_id` varchar(30) AFTER `owner_dept_id`;
ALTER TABLE `trn_recv` ADD KEY if not exists `request_dept_id` (`request_dept_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_dept_request` FOREIGN KEY  if not exists (`request_dept_id`) REFERENCES `mst_dept` (`dept_id`);



--- 20211009

alter table `trn_recv` add column if not exists `recvitem_totalvalue` decimal(14,2) not null default 0 AFTER `recv_date`;

alter table `trn_recv` add column if not exists `curr_id` varchar(10) AFTER `orderoutitem_totalvalue`;
ALTER TABLE `trn_recv` ADD KEY if not exists `curr_id` (`curr_id`);
ALTER TABLE `trn_recv` ADD CONSTRAINT `fk_trn_recv_mst_curr` FOREIGN KEY  if not exists (`curr_id`) REFERENCES `mst_curr` (`curr_id`);

alter table `trn_recv` add column if not exists `curr_rate` decimal(12,0) not null default 0 AFTER `curr_id`;

alter table `trn_recv` add column if not exists `recvitem_totalidr` decimal(14,2) not null default 0 AFTER `curr_rate`;

alter table `trn_recv` add column if not exists `ppn_taxtype_id` varchar(10) not null default 0 AFTER `orderoutitem_totalidr`;
alter table `trn_recv` add column if not exists `ppn_value` decimal(4, 2)  not null default 0 AFTER `ppn_taxtype_id`;
alter table `trn_recv` add column if not exists `ppn_isinclude` tinyint(1) not null default 0 AFTER `ppn_value`;

alter table `trn_recv` add column if not exists `pph_taxtype_id` varchar(10) not null default 0 AFTER `ppn_isinclude`;
alter table `trn_recv` add column if not exists `pph_value` decimal(4, 2)  not null default 0 AFTER `ppn_taxtype_id`;
alter table `trn_recv` add column if not exists `pph_isinclude` tinyint(1) not null default 0 AFTER `ppn_value`;


alter table `trn_recv` add column if not exists `recvitem_totalvaluenett` decimal(14,2) not null default 0 AFTER `pph_isinclude`;
alter table `trn_recv` add column if not exists `recvitem_totalvalueppn` decimal(14,2) not null default 0 AFTER `recvitem_totalvaluenett`;
alter table `trn_recv` add column if not exists `recvitem_totalvaluepph` decimal(14,2) not null default 0 AFTER `recvitem_totalvalueppn`;

alter table `trn_recv` add column if not exists `recvitem_totalidrnett` decimal(14,2) not null default 0 AFTER `recvitem_totalvaluepph`;
alter table `trn_recv` add column if not exists `recvitem_totalidrppn` decimal(14,2) not null default 0 AFTER `recvitem_totalidrnett`;
alter table `trn_recv` add column if not exists `recvitem_totalidrpph` decimal(14,2) not null default 0 AFTER `recvitem_totalidrppn`;








