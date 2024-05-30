'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Account Model",
	autoid: false,

	persistent: {
		'mst_accbudgetmodel': {
			comment: 'Daftar Model Account Budget',
			primarykeys: ['accbudgetmodel_id'],
			data: {
				accbudgetmodel_id: {
					text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false,
					options: { required: true, invalidMessage: 'ID harus diisi' }
				},
				accbudgetmodel_name: { text: 'Model Budget', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Model Budget harus diisi' } },
				accbudgetmodel_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				accbudgetmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
			},
			defaultsearch: ['accbudgetmodel_id', 'accbudgetmodel_name'],
			uniques: {
				'accbudgetmodel_name': ['accbudgetmodel_name']
			}
		}
	},

	schema: {
		header: 'mst_accbudgetmodel',
		detils: {
		}
	}
}