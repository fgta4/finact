'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Account Petty cash",
	autoid: false,

	persistent: {
		'mst_accpettycash': {

			comment: 'Daftar Account Pettycash',
			primarykeys: ['accpettycash_id'],
			data: {
				accpettycash_id: { text: 'ID', type: dbtype.varchar(17), null: false},
				accpettycash_name: {
					text: 'Nama Account', type: dbtype.varchar(90), null: false,
					options: {
						required: true, invalidMessage: 'Nama Account harus diisi'
					}
				},
				accpettycash_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accpettycash_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				accpettycash_io: { text: 'in/out', type: dbtype.int(1), suppresslist: true, null: false, options: { required: true, invalidMessage: 'in/out harus diisi 1 / -1' }, },
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: true,
					options: { required: true, invalidMessage: 'COA harus diisi', prompt:'-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},
			},

			defaultsearch: ['accpettycash_id', 'accpettycash_name'],

			uniques: {
				'accpettycash_name': ['accpettycash_name']
			}
		},
		


	},

	schema: {
		title: 'Account Petty Cash',
		header: 'mst_accpettycash',
		detils: {
		}
	}
}