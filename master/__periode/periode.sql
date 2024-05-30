CREATE TABLE `mst_periodemo` (
	`periodemo_id` varchar(6) NOT NULL , 
	`periodemo_name` varchar(30) NOT NULL , 
	`periodemo_year` int(4) NOT NULL , 
	`periodemo_month` int(2) NOT NULL , 
	`periodemo_dtstart` date NOT NULL , 
	`periodemo_dtend` date NOT NULL , 
	`periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`periodemo_closeby` varchar(14)  , 
	`periodemo_closedate` date, 
	`periodemo_isadjust` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `periodemo_name` (`periodemo_name`),
	PRIMARY KEY (`periodemo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Periode Bulanan';







