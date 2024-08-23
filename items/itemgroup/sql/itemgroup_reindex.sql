DROP PROCEDURE IF EXISTS itemgroup_reindex;
DELIMITER //
CREATE PROCEDURE itemgroup_reindex()
BEGIN
	
	declare p_group_id varchar(17);
	declare EOF bool;	

	declare c_data cursor for
	select itemgroup_id from mst_itemgroup where itemgroup_parent is null;

	declare continue handler for not found
	set EOF = true;



	update mst_itemgroup 
	set
	itemgroup_isparent = 0,
	itemgroup_pathid = rpad(itemgroup_id, 17, '-'),
	itemgroup_path = '',
	itemgroup_level = 0;

	open c_data;
	lp: loop
		fetch c_data into p_group_id;
		if eof is true then
			leave lp;
		end if;
	
		call itemgroup_applypath_recursive(p_group_id);
	end loop;
	close c_data;


	-- CEK DATA
	select
	'ERROR' as message,
	itemgroup_id, itemgroup_name , itemgroup_parent 	
	from 
	mst_itemgroup 
	where 
	itemgroup_path is null;
	
	
END //
DELIMITER ;