'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Account Group",
	autoid: false,

	persistent: {
		'mst_accbudgetgroup': {
			comment: 'Daftar Grouping Budget Account',
			primarykeys: ['accbudgetgroup_id'],
			data: {
				accbudgetgroup_id: { text: 'ID', type: dbtype.varchar(17), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				accbudgetgroup_name: { text: 'Group Budget Accout', type: dbtype.varchar(90), options: { required: true, invalidMessage: 'Nama Group COA harus diisi' } },
				accbudgetgroup_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accbudgetgroup_isparent: { text: 'Parent Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				accbudgetgroup_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				accbudgetgroup_parent: {
					text: 'Parent', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudgetgroup',
						field_value: 'accbudgetgroup_id',
						field_display: 'accbudgetgroup_name',
						field_display_name: 'accbudgetgroup_parent_name',
						api: 'finact/master/accbudgetgroup/list'
					})
				},

				accbudgetmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi' },
					comp: comp.Combo({
						table: 'mst_accbudgetmodel',
						field_value: 'accbudgetmodel_id',
						field_display: 'accbudgetmodel_name',
						api: 'finact/master/accbudgetmodel/list'
					})
				},

				accbudgetgroup_path: { text: 'Path', type: dbtype.varchar(340), null: false, suppresslist: true, options: { disabled: true } },
				accbudgetgroup_pathid: { text: 'PathId', type: dbtype.varchar(17), null: false, suppresslist: true, options: { disabled: true } },
				accbudgetgroup_level: { text: 'Level', type: dbtype.int(2), null: false, default: '0', suppresslist: true, options: { disabled: true } },
				accbudgetgroup_isexselect: { text: 'Exclude from Select', type: dbtype.boolean, null: false, default: '0', suppresslist: true }
			},
			uniques: {
				'accbudgetgroup_name': ['accbudgetgroup_name'],
				'accbudgetgroup_path': ['accbudgetgroup_path', 'accbudgetgroup_pathid']
			},
			defaultsearch: ['accbudgetgroup_id', 'accbudgetgroup_name']
		}
	},

	schema: {
		title: 'Budget Account Group',
		header: 'mst_accbudgetgroup',
		detils: {
		}
	}
}