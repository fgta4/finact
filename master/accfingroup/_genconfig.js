'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Finance Group",
	autoid: false,

	persistent: {
		'mst_accfingroup': {
			comment: 'Daftar Grouping COA Finance',
			primarykeys: ['accfingroup_id'],
			data: {
				accfingroup_id: { text: 'ID', type: dbtype.varchar(17), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				accfingroup_name: { text: 'Group COA', type: dbtype.varchar(90), uppercase: true, options: { required: true, invalidMessage: 'Nama Group COA harus diisi' } },
				accfingroup_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accfingroup_isparent: { text: 'Parent Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				accfingroup_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				accfingroup_parent: {
					text: 'Parent', type: dbtype.varchar(17), null: true, uppercase: true, suppresslist: true,
					options: { prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accfingroup',
						field_value: 'accfingroup_id',
						field_display: 'accfingroup_name',
						field_display_name: 'accfingroup_parent_name',
						api: 'finact/master/accfingroup/list'
					})
				},
				accfingroup_path: { text: 'Path', type: dbtype.varchar(340), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				accfingroup_pathid: { text: 'PathId', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				accfingroup_level: { text: 'Level', type: dbtype.int(2), null: false, default: '0', suppresslist: true, options: { disabled: true } },
				accfingroup_isexselect: { text: 'Exclude from Select', type: dbtype.boolean, null: false, default: '0', suppresslist: true }
			},
			uniques: {
				'accfingroup_name': ['accfingroup_name'],
				'accfingroup_path': ['accfingroup_path', 'accfingroup_pathid']
			},
			defaultsearch: ['accfingroup_id', 'accfingroup_name']
		}
	},

	schema: {
		title: 'COA Finance Group',
		header: 'mst_accfingroup',
		detils: {
		}
	}
}