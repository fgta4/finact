'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Class Group",
	autoid: false,

	persistent: {
		'mst_itemclassgroup' : {
			primarykeys: ['itemclassgroup_id'],
			comment: 'Daftar Group Klasifikasi',
			data: {
				itemclassgroup_id: {text:'ID', type: dbtype.varchar(15), null:false, uppercase: true, options:{required:true,invalidMessage:'ID Group harus diisi'}},
				itemclassgroup_name: {text:'Group Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				itemclassgroup_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				itemclassgroup_parent: {
					text:'Parent', type: dbtype.varchar(15), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_itemclassgroup', 
						field_value: 'itemclassgroup_id', field_display: 'itemclassgroup_name', field_display_name: 'itemclassgroup_parent_name', 
						api: 'finact/items/itemclassgroup/list'})					
				},
				itemclassgroup_pathid: {text:'PathId', type: dbtype.varchar(15), null:false, uppercase: false, suppresslist: true, options:{disabled:true}},
				itemclassgroup_path: {text:'Path', type: dbtype.varchar(390), null:false, uppercase: false, suppresslist: true, options:{disabled:true}},
				itemclassgroup_level: {text:'Level', type: dbtype.int(2), null:false, default:'0', uppercase: false, suppresslist: true, options:{disabled:true}},
			},

			defaultsearch: ['itemclassgroup_id', 'itemclassgroup_name'],

			uniques: {
				'itemclassgroup_name' : ['itemclassgroup_name'],
				'itemclassgroup_path' : ['itemclassgroup_path', 'itemclassgroup_pathid'],
			},
			
			values : [
			]
			
		},
	},

	schema: {
		title: 'Item Class Group',
		header: 'mst_itemclassgroup',
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