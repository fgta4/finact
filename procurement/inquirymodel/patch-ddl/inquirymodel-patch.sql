-- 2021 09 18 0235 agung

alter table `mst_inquirymodel` add column if not exists `inquirymodel_isdownbreakqty` tinyint(1) NOT NULL DEFAULT 0 after `inquirymodel_descr`; 
update `mst_inquirymodel` set
`inquirymodel_isdownbreakqty` = 1
where
`inquirymodel_id` IN ('B', 'M');

