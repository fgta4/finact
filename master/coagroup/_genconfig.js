'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Group",
	autoid: false,

	persistent: {
		'mst_coagroup': {
		comment: 'Daftar Grouping COA',
		primarykeys: ['coagroup_id'],
		data: {
			coagroup_id: { text: 'ID', type: dbtype.varchar(17), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			coagroup_name: { text: 'Group COA', type: dbtype.varchar(90), uppercase: true, options: { required: true, invalidMessage: 'Nama Group COA harus diisi' } },
			coagroup_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
			coagroup_isparent: { text: 'Parent Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
			coagroup_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
			coagroup_parent: {
				text: 'Parent', type: dbtype.varchar(17), null: true, suppresslist: true,
				options: { prompt: '-- PILIH --' },
				comp: comp.Combo({
					table: 'mst_coagroup',
					field_value: 'coagroup_id',
					field_display: 'coagroup_name',
					field_display_name: 'coagroup_parent_name',
					api: 'finact/master/coagroup/list-parent'
				})
			},

			coamodel_id: {
				text: 'Model', type: dbtype.varchar(10), null: false,  suppresslist: true,
				options: { required: true, invalidMessage: 'Model harus diisi', disabled: true },
				comp: comp.Combo({
					table: 'mst_coamodel',
					field_value: 'coamodel_id',
					field_display: 'coamodel_name',
					api: 'finact/master/coamodel/list'
				})
			},

			coareport_id: {
				text: 'Report', type: dbtype.varchar(2), null: false, suppresslist: true,
				options: { required: true, invalidMessage: 'Report harus diisi', disabled: true },
				comp: comp.Combo({
					table: 'mst_coareport',
					field_value: 'coareport_id',
					field_display: 'coareport_name',
					api: 'finact/master/coareport/list'
				})
			},	

			coagroup_path: { text: 'Path', type: dbtype.varchar(340), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
			coagroup_pathid: { text: 'PathId', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
			coagroup_level: { text: 'Level', type: dbtype.int(2), null: false, default: '0', suppresslist: true, options: { disabled: true } },
			coagroup_isexselect: { text: 'Exclude from Select', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px'} }
		},
		uniques: {
			'coagroup_name': ['coagroup_name'],
			'coagroup_path': ['coagroup_path', 'coagroup_pathid']
		},
		defaultsearch: ['coagroup_id', 'coagroup_name']
		}
	},

	schema: {
		title: 'COA Group',
		header: 'mst_coagroup',
		detils: {
		}
	}
}



/*

DROP TRIGGER IF EXISTS fgtadb.mst_coagroup_before_insert;

DELIMITER $$
$$


CREATE DEFINER=`root`@`localhost` TRIGGER `mst_coagroup_before_insert` BEFORE INSERT ON `mst_coagroup` FOR EACH ROW BEGIN

	DECLARE PATHID VARCHAR(17);
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);

	IF NEW.coagroup_parent=NEW.coagroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;

	SET NEW.coagroup_pathid = NEW.coagroup_id;

	SET PATHID = RPAD(NEW.coagroup_pathid, 17, '-');
	SET NEW.coagroup_pathid = PATHID;

	IF NEW.coagroup_parent IS NULL THEN
		SET NEW.coagroup_path = PATHID;
		SET NEW.coagroup_level = 0;
	ELSE
		SELECT coagroup_pathid, coagroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_coagroup WHERE coagroup_id = NEW.coagroup_parent;	
			
		SET NEW.coagroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.coagroup_level = (LENGTH(NEW.coagroup_path) / 13) - 1;
	
	END IF;

END


$$
DELIMITER ;



DROP TRIGGER IF EXISTS fgtadb.mst_coagroup_before_update;

DELIMITER $$
$$

CREATE DEFINER=`root`@`localhost` TRIGGER `mst_coagroup_before_update` BEFORE UPDATE ON `mst_coagroup` FOR EACH ROW BEGIN

	
	DECLARE PATHID VARCHAR(17);
	DECLARE CHILDCOUNT INT;
	DECLARE PARENT_PATHID VARCHAR(17);
	DECLARE PARENT_PATH VARCHAR(390);


	SET PATHID = OLD.coagroup_pathid;
	SET NEW.coagroup_id = OLD.coagroup_id;
	SET NEW.coagroup_pathid = OLD.coagroup_pathid;

	IF NEW.coagroup_parent=NEW.coagroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;
	

	IF NEW.coagroup_parent='--NULL--' THEN
    	SET NEW.coagroup_parent = NULL;
    END IF;


	SELECT COUNT(*) 
	INTO CHILDCOUNT
	FROM mst_coagroup WHERE coagroup_parent = NEW.coagroup_id;
	IF NEW.coagroup_parent<>OLD.coagroup_parent AND CHILDCOUNT>0 THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Group yang punya anggota tidak bisa diubah parentnya';	
	END IF;


	IF NEW.coagroup_parent IS NULL THEN
		SET NEW.coagroup_path = NEW.coagroup_pathid;
		SET NEW.coagroup_level = 0;
	ELSE
		SELECT coagroup_pathid, coagroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_coagroup WHERE coagroup_id = NEW.coagroup_parent;	
			
		SET NEW.coagroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.coagroup_level = (LENGTH(NEW.coagroup_path) / 17) - 1;
	
	END IF;

END

$$
DELIMITER ;
*/