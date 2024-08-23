



DROP TRIGGER IF EXISTS mst_coagroup_before_insert;

DELIMITER //


CREATE TRIGGER `mst_coagroup_before_insert` BEFORE INSERT ON `mst_coagroup` FOR EACH ROW BEGIN

	DECLARE PATHID VARCHAR(17);
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);

	IF NEW.coagroup_parent=NEW.coagroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;


	if (@coagroup_skip_trigger is null or @coagroup_skip_trigger<=0) then
	
		SET NEW.coagroup_pathid = NEW.coagroup_id;
	
		SET PATHID = RPAD(NEW.coagroup_pathid, 17, '-');
		SET NEW.coagroup_pathid = PATHID;
	
		if NEW.coagroup_parent IS NULL then
			SET NEW.coagroup_path = PATHID;
			SET NEW.coagroup_level = 1;
		ELSE
			SELECT coagroup_pathid, coagroup_path 
			INTO PARENT_PATHID, PARENT_PATH
			FROM mst_coagroup WHERE coagroup_id = NEW.coagroup_parent;	
				
			SET NEW.coagroup_path = CONCAT(PARENT_PATH, PATHID);
			SET NEW.coagroup_level = (LENGTH(NEW.coagroup_path) / 17);
		
		END IF;

	end if;

END //

DELIMITER ;
