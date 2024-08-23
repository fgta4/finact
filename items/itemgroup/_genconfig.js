'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Group",
	autoid: false,

	persistent: {
		'mst_itemgroup' : {
			primarykeys: ['itemgroup_id'],
			comment: 'Daftar Group Items',
			data: {
				itemgroup_id: {text:'ID', type: dbtype.varchar(17), uppercase: true, null:false, options:{required:true,invalidMessage:'ID Group harus diisi'}},
				itemgroup_name: {text:'Item Group Name', type: dbtype.varchar(60),uppercase: true, null:false, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				itemgroup_nameshort: {text:'Short Name', type: dbtype.varchar(60), null:false, suppresslist: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				itemgroup_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				itemgroup_isparent: { text: 'Parent Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemgroup_parent: {
					text:'Parent', type: dbtype.varchar(15), null:true, suppresslist: true,
					options:{prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_itemgroup', 
						field_value: 'itemgroup_id', field_display: 'itemgroup_name', field_display_name: 'itemgroup_parent_name', 
						api: 'finact/items/itemgroup/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})					
				},
				itemgroup_pathid: {text:'PathId', type: dbtype.varchar(17), null:false, suppresslist: true, options:{disabled:true}},
				itemgroup_path: {text:'Path', type: dbtype.varchar(390), null:true,  suppresslist: true, options:{disabled:true}},
				itemgroup_level: {text:'Level', type: dbtype.int(2), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				itemgroup_isexselect : {
					text:'Exclude From Selection', type: dbtype.boolean, null:false, suppresslist: true, default:'0',
					options:{labelWidth: '200px'}
				},

				itemmodel_id: { 
					text: 'Model', type: dbtype.varchar(10), null: true, 
					options: { required: true, invalidMessage: 'Model harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemmodel', 
						field_value: 'itemmodel_id', field_display: 'itemmodel_name', field_display_name: 'itemmodel_name', 
						api: 'finact/items/itemmodel/list'})
				
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: false,
					tips: 'Owner Dept yang akan manage tipe item ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},					
			},

			defaultsearch: ['itemgroup_id', 'itemgroup_name', 'itemgroup_nameshort'],

			uniques: {
				'itemgroup_name' : ['itemgroup_name'],
				'itemgroup_path' : ['itemgroup_path', 'itemgroup_pathid'],
			},
			
			values : [
			]
			
		},
	},

	schema: {
		title: 'Item Group',
		header: 'mst_itemgroup',
		detils: {}
	}
}



/*



DROP TRIGGER IF EXISTS mst_itemgroup_before_insert;

DELIMITER $$
$$
CREATE DEFINER=`root`@`localhost` TRIGGER mst_itemgroup_before_insert
BEFORE INSERT
   ON mst_itemgroup FOR EACH ROW
   
BEGIN

	DECLARE PATHID VARCHAR(15);
	DECLARE PARENT_PATHID VARCHAR(15);
	DECLARE PARENT_PATH VARCHAR(390);

	IF NEW.itemgroup_parent=NEW.itemgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;

	SET NEW.itemgroup_pathid = NEW.itemgroup_id;

	SET PATHID = RPAD(NEW.itemgroup_pathid, 15, '-');
	SET NEW.itemgroup_pathid = PATHID;

	IF NEW.itemgroup_parent IS NULL THEN
		SET NEW.itemgroup_path = PATHID;
		SET NEW.itemgroup_level = 0;
	ELSE
		SELECT itemgroup_pathid, itemgroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_itemgroup WHERE itemgroup_id = NEW.itemgroup_parent;	
			
		SET NEW.itemgroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.itemgroup_level = (LENGTH(NEW.itemgroup_path) / 15) - 1;
	
	END IF;

END

$$
DELIMITER ;





DROP TRIGGER IF EXISTS mst_itemgroup_before_update;

DELIMITER $$
$$
CREATE DEFINER=`root`@`localhost` TRIGGER `mst_itemgroup_before_update` BEFORE UPDATE ON `mst_itemgroup` FOR EACH ROW BEGIN


	DECLARE PATHID VARCHAR(15);
	DECLARE CHILDCOUNT INT;
	DECLARE PARENT_PATHID VARCHAR(15);
	DECLARE PARENT_PATH VARCHAR(390);


	SET PATHID = OLD.itemgroup_pathid;
	SET NEW.itemgroup_id = OLD.itemgroup_id;
	SET NEW.itemgroup_pathid = OLD.itemgroup_pathid;

	IF NEW.itemgroup_parent=NEW.itemgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;
	

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
		SET NEW.itemgroup_level = 0;
	ELSE
		SELECT itemgroup_pathid, itemgroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_itemgroup WHERE itemgroup_id = NEW.itemgroup_parent;	
			
		SET NEW.itemgroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.itemgroup_level = (LENGTH(NEW.itemgroup_path) / 15) - 1;
	
	END IF;

END

$$
DELIMITER ;


*/