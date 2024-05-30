-- 20210918 1454 agung
alter table `mst_inquirytype` add column if not exists `inquirytype_isdisabled` tinyint(1) NOT NULL DEFAULT 0 after `inquirytype_name`;


-- 20210918 1110 agung
alter table `mst_inquirytype` add column if not exists `inquirytype_isuseqty` tinyint(1) NOT NULL DEFAULT 0 after `inquirytype_isdateinterval`;
alter table `mst_inquirytype` add column if not exists `inquirytype_isusedays` tinyint(1) NOT NULL DEFAULT 0 after `inquirytype_isdateinterval`;
alter table `mst_inquirytype` add column if not exists `inquirytype_isusetask` tinyint(1) NOT NULL DEFAULT 0 after `inquirytype_isdateinterval`;

alter table `mst_inquirytype` add column if not exists `inquirytype_islimitqty` tinyint(1) NOT NULL DEFAULT 0 after `inquirytype_isuseqty`;
alter table `mst_inquirytype` add column if not exists `inquirytype_islimitdays` tinyint(1) NOT NULL DEFAULT 0  after `inquirytype_isuseqty`; 
alter table `mst_inquirytype` add column if not exists `inquirytype_islimittask` tinyint(1) NOT NULL DEFAULT 0  after `inquirytype_isuseqty`;



(`"& A111 &"`, `"& B111 &"`, `"& C111 &"`, `"& D111 &"`, `"& E111 &"`, `"& F111 &"`, `"& G111 &"`, `"& H111 &"`, `"& I111 &"`, `"& J111 &"`, `"& K111 &"`, `"& L111 &"`, `"& M111 &"`, `"& N111 &"`, `"& O111 &"`, `"& P111 &"`, `"& Q111 &"`, `"& R111 &"`, `"& S111 &"`, `"& T111 &"`, `"& U111 &"`, `"& V111 &"`, `"& W111 &"`, `"& X111 &"`, `"& Y111 &"`, `"& Z111 &"`),



('"& A111 &"', '"& B111 &"', '"& C111 &"', '"& D111 &"', '"& E111 &"', '"& F111 &"', '"& G111 &"', '"& H111 &"', '"& I111 &"', '"& J111 &"', '"& K111 &"', '"& L111 &"', '"& M111 &"', '"& N111 &"', '"& O111 &"', '"& P111 &"', '"& Q111 &"', '"& R111 &"', '"& S111 &"', '"& T111 &"', '"& U111 &"', '"& V111 &"', '"& W111 &"', '"& X111 &"', '"& Y111 &"', '"& Z111 &"'),


alter table `mst_inquirytype` add column if not exists `owner_dept_id` varchar(30) after `related_team_id`;
alter table `mst_inquirytype` add column if not exists `owner_team_id` varchar(14) after `owner_dept_id`;

ALTER TABLE `mst_inquirytype` ADD KEY if not exists `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY if not exists `owner_team_id` (`owner_team_id`);

ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept_owner` FOREIGN KEY if not exists (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team_owner` FOREIGN KEY if not exists (`owner_team_id`) REFERENCES `mst_team` (`team_id`);




alter table `mst_inquirytype` add column if not exists `inquirytype_isemplaspartner` tinyint(1) NOT NULL DEFAULT 0  after `inquirytype_isallowadvance`;


alter table `mst_inquirytype` add column if not exists `inquirytype_isperempl` tinyint(1) NOT NULL DEFAULT 0  after `inquiryselect_id`;











