CREATE TABLE `trn_jurextpv` (
	`jurnal_id` varchar(14) NOT NULL , 
	`billin_id` varchar(14)  ,  
	`ap_jurnal_id` varchar(14) NULL ,	
	`paymtype_id` varchar(6) NULL , 
	`paymto_name` varchar(90)  , 
	`paymto_bankacc` varchar(90)  , 
	`paymto_bankaccname` varchar(90)  , 
	`paymto_bankname` varchar(90)  , 
	`paymto_upname` varchar(90)  , 
	`paymto_upposition` varchar(90)  , 
	`paymto_upphone` varchar(90)  , 
	`paymto_gironum` varchar(90)  , 
	`paymto_girodate` date NULL , 
	`bankrekening_id` varchar(20)  , 
	`accfin_id` varchar(20) NULL , 
	`paym_jurnaldetil_id` varchar(14) NULL , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel Ekstensi Jurnal untuk keperluan PV';

ALTER TABLE `trn_jurextpv` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurextpv` ADD KEY `ap_jurnal_id` (`ap_jurnal_id`);
ALTER TABLE `trn_jurextpv` ADD KEY `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_jurextpv` ADD KEY `bankrekening_id` (`bankrekening_id`);
ALTER TABLE `trn_jurextpv` ADD KEY `accfin_id` (`accfin_id`);
ALTER TABLE `trn_jurextpv` ADD KEY `paym_jurnaldetil_id` (`paym_jurnaldetil_id`);


ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_trn_jurnal_ap` FOREIGN KEY (`ap_jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_mst_paymtype` FOREIGN KEY (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_mst_bankrekening` FOREIGN KEY (`bankrekening_id`) REFERENCES `mst_bankrekening` (`bankrekening_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_mst_accfin` FOREIGN KEY (`accfin_id`) REFERENCES `mst_accfin` (`accfin_id`);
ALTER TABLE `trn_jurextpv` ADD CONSTRAINT `fk_trn_jurextpv_mst_jurnaldetil` FOREIGN KEY (`paym_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);




CREATE TABLE `trn_jurextpvdetil` (
	`jurnaldetil_id` varchar(14) NOT NULL ,
	`billin_id` varchar(14)  ,  
	`ap_jurnal_id` varchar(14) NULL ,
	`jurnal_id` varchar(14) NOT NULL ,  
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel Ekstensi Jurnal untuk keperluan PV';

ALTER TABLE `trn_jurextpvdetil` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurextpvdetil` ADD KEY `ap_jurnal_id` (`ap_jurnal_id`);
ALTER TABLE `trn_jurextpvdetil` ADD KEY `jurnal_id` (`jurnal_id`);


ALTER TABLE `trn_jurextpvdetil` ADD CONSTRAINT `fk_trn_jurextpvdetil_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurextpvdetil` ADD CONSTRAINT `fk_trn_jurextpvdetil_trn_jurnal_ap` FOREIGN KEY (`ap_jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurextpvdetil` ADD CONSTRAINT `fk_trn_jurextpvdetil_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);



