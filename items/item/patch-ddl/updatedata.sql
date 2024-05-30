
update mst_item set itemclass_id='302700'  where
itemgroup_id IN (
	
	select itemgroup_id from mst_itemgroup where itemgroup_id IN ( 
	'TG2100116',
	'TG2100118',
	'TG2100129',
	'TG2100135',
	'TG2100137',
	'TG2100140',
	'TG2100144',
	'TG2100176',
	'TG2100178',
	'TG2100217',
	'TG2100166',
	'TG2100165'
	)
	
	union
	
	select itemgroup_id from mst_itemgroup where itemgroup_parent IN ( 
	'TG2100116',
	'TG2100118',
	'TG2100129',
	'TG2100135',
	'TG2100137',
	'TG2100140',
	'TG2100144',
	'TG2100176',
	'TG2100178',
	'TG2100217',
	'TG2100166',
	'TG2100165'
	)
);


update mst_item set dept_id='13103000' where itemclass_id = '302700';



update mst_itemasset set maintainer_dept_id = '12122000';


update mst_itemasset 
set 
itemclass_id = '302700',
owner_dept_id = '13103000',
maintainer_dept_id = '12122000',
location_room_id = 'WHLOG'
where item_id IN (
	select item_id from mst_item where itemclass_id = '302700'
);







