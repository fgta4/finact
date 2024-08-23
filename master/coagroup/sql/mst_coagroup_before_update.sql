
DROP TRIGGER IF EXISTS mst_coagroup_before_update;

DELIMITER //

CREATE TRIGGER `mst_coagroup_before_update` BEFORE UPDATE ON `mst_coagroup` FOR EACH ROW BEGIN
	
	DECLARE PATHID VARCHAR(17);
	DECLARE CHILDCOUNT INT;
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);


	SET PATHID = OLD.coagroup_pathid;
	SET NEW.coagroup_id = OLD.coagroup_id;
	SET NEW.coagroup_pathid = OLD.coagroup_pathid;

	IF NEW.coagroup_parent=NEW.coagroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;
	

	if (@coagroup_skip_trigger is null or @coagroup_skip_trigger<=0) then

		IF NEW.coagroup_parent='--NULL--' THEN
	    	SET NEW.coagroup_parent = NULL;
	    END IF;
	
	
		SELECT COUNT(*) 
		INTO CHILDCOUNT
		FROM mst_coagroup WHERE coagroup_parent = NEW.coagroup_id;
		IF NEW.coagroup_parent<>OLD.coagroup_parent AND CHILDCOUNT>0 THEN
			SIGNAL SQLSTATE '45000' SET 
			MESSAGE_TEXT = 'Group yang punya anggota tidak bisa diubah parentnya';	
		END IF;
	
	
		IF NEW.coagroup_parent IS NULL THEN
			SET NEW.coagroup_path = NEW.coagroup_pathid;
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