-- DROP TABLE IF EXISTS `xhc_coa`;
CREATE TABLE `xhc_accfin` (
  `cacheexp` datetime DEFAULT NULL,
  `cacheid` bigint(20) unsigned NOT NULL,
  `cacherownum` int(11) NOT NULL,
  `accfin_id` varchar(20) DEFAULT NULL,
  `accfin_name` varchar(255) DEFAULT NULL,
  `accfin_parent` varchar(20) DEFAULT NULL,
  `accfin_isparent` tinyint(1) DEFAULT NULL,
  `accfin_path` varchar(340) DEFAULT NULL,
  `accfin_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`cacheid`,`cacherownum`),
  KEY `cacheexp` (`cacheexp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Cache Account finance';

