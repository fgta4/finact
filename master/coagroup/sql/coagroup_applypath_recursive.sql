DROP PROCEDURE IF EXISTS coagroup_applypath_recursive;

DELIMITER //


CREATE PROCEDURE coagroup_applypath_recursive(
	IN in_coagroup_id varchar(17)
)
BEGIN
	
	declare p_group_id varchar(17);
	declare EOF bool;	

	declare c_data cursor for
	select coagroup_id from mst_coagroup where coagroup_parent=in_coagroup_id;

	declare continue handler for not found
	set EOF = true;


	set p_group_id = in_coagroup_id;
	call coagroup_applypath(p_group_id);

	open c_data;
	lp: loop
		fetch c_data into p_group_id;
		if eof is true then
			leave lp;
		end if;
	
		call coagroup_applypath_recursive(p_group_id);
	end loop;
	close c_data;




END //


DELIMITER ;