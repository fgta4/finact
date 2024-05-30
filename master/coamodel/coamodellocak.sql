CREATE TABLE `lck_coamodel` (
  `coamodel_id` varchar(10) NOT NULL,
  PRIMARY KEY (`coamodel_id`),
  CONSTRAINT `fk_lck_coamodel_mst_coamodel` FOREIGN KEY (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Coa Model yang tidak bleh dihapus'