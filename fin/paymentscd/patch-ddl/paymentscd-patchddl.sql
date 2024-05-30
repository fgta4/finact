alter table `trn_paymentscdbillin` add column if not exists `bankrekening_id` varchar(20) after `billinpaym_pphidr`;
alter table `trn_paymentscdbillin` add column if not exists `acc_fin` varchar(20) after `bankrekening_id`;


