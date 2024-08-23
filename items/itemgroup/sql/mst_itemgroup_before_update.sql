
DROP TRIGGER IF EXISTS mst_itemgroup_before_update;

DELIMITER $$
$$

CREATE TRIGGER `mst_itemgroup_before_update` BEFORE UPDATE ON `mst_itemgroup` FOR EACH ROW BEGIN

	
	DECLARE PATHID VARCHAR(17);
	DECLARE CHILDCOUNT INT;
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);


	SET PATHID = OLD.itemgroup_pathid;
	SET NEW.itemgroup_id = OLD.itemgroup_id;
	SET NEW.itemgroup_pathid = OLD.itemgroup_pathid;

	IF NEW.itemgroup_parent=NEW.itemgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;
	

	if (@itemgroup_skip_trigger is null or @itemgroup_skip_trigger<=0) then

		IF NEW.itemgroup_parent='--NULL--' THEN
	    	SET NEW.itemgroup_parent = NULL;
	    END IF;
	
	
		SELECT COUNT(*) 
		INTO CHILDCOUNT
		FROM mst_itemgroup WHERE itemgroup_parent = NEW.itemgroup_id;
		IF NEW.itemgroup_parent<>OLD.itemgroup_parent AND CHILDCOUNT>0 THEN
			SIGNAL SQLSTATE '45000' SET 
			MESSAGE_TEXT = 'Group yang punya anggota tidak bisa diubah parentnya';	
		END IF;
	
	
		IF NEW.itemgroup_parent IS NULL THEN
			SET NEW.itemgroup_path = NEW.itemgroup_pathid;
			SET NEW.itemgroup_level = 1;
		ELSE
			SELECT itemgroup_pathid, itemgroup_path 
			INTO PARENT_PATHID, PARENT_PATH
			FROM mst_itemgroup WHERE itemgroup_id = NEW.itemgroup_parent;	
				
			SET NEW.itemgroup_path = CONCAT(PARENT_PATH, PATHID);
			SET NEW.itemgroup_level = (LENGTH(NEW.itemgroup_path) / 17);
		
		END IF;

	end if;

END

$$
DELIMITER ;