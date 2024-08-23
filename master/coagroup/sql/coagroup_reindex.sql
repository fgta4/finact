DROP PROCEDURE IF EXISTS coagroup_reindex;

DELIMITER //


CREATE PROCEDURE coagroup_reindex()
BEGIN
	
	declare p_group_id varchar(17);
	declare EOF bool;	

	declare c_data cursor for
	select coagroup_id from mst_coagroup where coagroup_parent is null;

	declare continue handler for not found
	set EOF = true;

	set @coagroup_skip_trigger = 1;
	set max_sp_recursion_depth = 10;


	update mst_coagroup 
	set
	coagroup_isparent = 0,
	coagroup_pathid = rpad(coagroup_id, 17, '-'),
	coagroup_path = '',
	coagroup_level = 0;

	open c_data;
	lp: loop
		fetch c_data into p_group_id;
		if eof is true then
			leave lp;
		end if;
	
		call coagroup_applypath_recursive(p_group_id);
	end loop;
	close c_data;


	
	select
	'ERROR' as message,
	coagroup_id, coagroup_name , coagroup_parent 	
	from 
	mst_coagroup 
	where 
	coagroup_path is null;
	

	set max_sp_recursion_depth = 0;
	set @coagroup_skip_trigger = null;

	
END //



DELIMITER ;