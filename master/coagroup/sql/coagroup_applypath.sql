DROP PROCEDURE IF EXISTS coagroup_applypath;

DELIMITER //


CREATE PROCEDURE coagroup_applypath (
	IN in_coagroup_id varchar(17)
)
BEGIN
	
	declare p_group_id varchar(17);
	declare p_group_parent varchar(17);
	declare p_group_pathid varchar(17);
	declare p_group_path varchar(390);
	declare p_group_level int(2);
	declare p_group_isparent tinyint(1);
	declare p_parent_pathid varchar(17);
	declare p_parent_path varchar(390);
	declare p_parent_level int(2);
	declare p_child_count int(4);
	declare p_message varchar(255);

	set p_group_id = in_coagroup_id;

	select coagroup_parent
	into p_group_parent
	from
	mst_coagroup 
	where 
	coagroup_id = p_group_id;

	if p_group_parent=p_group_id then
		set p_message = concat('Kode parent accbudget ', p_group_id, ' invalid, merefer ke diri sendiri');
		signal sqlstate '45000' set MESSAGE_TEXT = p_message;
	end if;



	set p_group_pathid = rpad(p_group_id, 17, '-');

	if p_group_parent is null then
		set p_group_path = p_group_pathid;
		set p_group_level = 1;
	else
		set p_parent_pathid = null;
		select coagroup_pathid, coagroup_path, coagroup_level
		into p_parent_pathid, p_parent_path, p_parent_level
		from mst_coagroup
		where 
		coagroup_id = p_group_parent;
	
		set p_group_path = concat(p_parent_path, p_group_pathid);
		set p_group_level = p_parent_level + 1;
	end if;
	

	if p_group_path is null then
		set p_message = concat('Kode parent coa ', p_group_parent, ' invalid, tidak ditemukan');
		signal sqlstate '45000' set MESSAGE_TEXT = p_message;
	end if;	


	
	select count(coagroup_id) as n 
	into p_child_count
	from mst_coagroup where coagroup_parent = p_group_id;
	
	if p_child_count > 0 then 
		set p_group_isparent = 1;
	else
		set p_group_isparent = 0;
	end if;
	


	update mst_coagroup 
	set
	coagroup_isparent = p_group_isparent,
	coagroup_pathid = p_group_pathid,
	coagroup_path = p_group_path,
	coagroup_level = p_group_level
	where
	coagroup_id = p_group_id;
	
END //


DELIMITER ;