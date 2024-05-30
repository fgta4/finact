drop table if exists trn_jurextor;


CREATE TABLE `trn_jurextor` (
	`jurnal_id` varchar(14) NOT NULL , 
	`temprecv_id` varchar(14)  ,  
	`ar_jurnaldetil_id` varchar(14) NULL ,	
	`paymtype_id` varchar(6) NULL , 
	`paym_gironum` varchar(90)  , 
	`paym_girodate` date NULL , 
	`bankrekening_id` varchar(20)  , 
	`accfin_id` varchar(20) NULL , 
	`or_jurnaldetil_id` varchar(14) NULL , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel Ekstensi Jurnal untuk keperluan OR';

ALTER TABLE `trn_jurextor` ADD KEY `temprecv_id` (`temprecv_id`);
ALTER TABLE `trn_jurextor` ADD KEY `ar_jurnaldetil_id` (`ar_jurnaldetil_id`);
ALTER TABLE `trn_jurextor` ADD KEY `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_jurextor` ADD KEY `bankrekening_id` (`bankrekening_id`);
ALTER TABLE `trn_jurextor` ADD KEY `accfin_id` (`accfin_id`);
ALTER TABLE `trn_jurextor` ADD KEY `or_jurnaldetil_id` (`or_jurnaldetil_id`);


ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_trn_temprecv` FOREIGN KEY (`temprecv_id`) REFERENCES `trn_temprecv` (`temprecv_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_trn_jurnal_ar_outstanding` FOREIGN KEY (`ar_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_mst_paymtype` FOREIGN KEY (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_mst_bankrekening` FOREIGN KEY (`bankrekening_id`) REFERENCES `mst_bankrekening` (`bankrekening_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_mst_accfin` FOREIGN KEY (`accfin_id`) REFERENCES `mst_accfin` (`accfin_id`);
ALTER TABLE `trn_jurextor` ADD CONSTRAINT `fk_trn_jurextor_mst_jurnaldetil` FOREIGN KEY (`or_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);


