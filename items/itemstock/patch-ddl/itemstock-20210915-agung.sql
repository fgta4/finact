alter table `mst_itemstock`drop FOREIGN key if exists `fk_mst_itemstock_mst_itemmodel`;
alter table `mst_itemstock` drop column if exists `itemmodel_id`;

