
alter table `mst_project` add column if not exists `projectmodel_id` varchar(10) AFTER `projecttype_id`;
update `mst_project` set `projectmodel_id` = 'IH';

alter table `mst_project` modify column if exists `projectmodel_id` varchar(10) not null;

ALTER TABLE `mst_project` ADD KEY if not exists `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_projectmodel` FOREIGN KEY if not exists (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);



--- 20210919
-- tambah kolom untuk refernsi ke orderin (salesorder)

alter table `mst_project` add column if not exists `orderin_id` varchar(30) AFTER `projectmodel_id`;
ALTER TABLE `mst_project` ADD KEY if not exists `orderin_id` (`orderin_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_trn_orderin` FOREIGN KEY if not exists (`orderin_id`) REFERENCES `trn_orderin` (`orderin_id`);






