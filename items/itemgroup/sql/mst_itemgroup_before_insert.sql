DROP TRIGGER IF EXISTS mst_itemgroup_before_insert;

DELIMITER $$
$$


CREATE DEFINER=`root`@`localhost` TRIGGER `mst_itemgroup_before_insert` BEFORE INSERT ON `mst_itemgroup` FOR EACH ROW BEGIN

	DECLARE PATHID VARCHAR(17);
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);

	IF NEW.itemgroup_parent=NEW.itemgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;


	if (@itemgroup_skip_trigger is null or @itemgroup_skip_trigger<=0) then
	
		SET NEW.itemgroup_pathid = NEW.itemgroup_id;
	
		SET PATHID = RPAD(NEW.itemgroup_pathid, 17, '-');
		SET NEW.itemgroup_pathid = PATHID;
	
		IF NEW.itemgroup_parent IS NULL THEN
			SET NEW.itemgroup_path = PATHID;
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
