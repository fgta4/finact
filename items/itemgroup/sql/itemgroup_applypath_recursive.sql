DROP PROCEDURE IF EXISTS itemgroup_applypath_recursive;

DELIMITER //

CREATE PROCEDURE itemgroup_applypath_recursive(
	IN in_itemgroup_id varchar(17)
)
BEGIN
	
	declare p_group_id varchar(17);
	declare EOF bool;	

	declare c_data cursor for
	select itemgroup_id from mst_itemgroup where itemgroup_parent=in_itemgroup_id;

	declare continue handler for not found
	set EOF = true;


	set p_group_id = in_itemgroup_id;
	call itemgroup_applypath(p_group_id);

	open c_data;
	lp: loop
		fetch c_data into p_group_id;
		if eof is true then
			leave lp;
		end if;
	
		call itemgroup_applypath_recursive(p_group_id);
	end loop;
	close c_data;


END //

DELIMITER ;