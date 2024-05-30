'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Account Finance",
	autoid: false,

	persistent: {
		'mst_accfin': {

			comment: 'Daftar Account Finance',
			primarykeys: ['accfin_id'],
			data: {
				accfin_id: { text: 'ID', type: dbtype.varchar(20), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				accfin_name: {
					text: 'Nama Account', type: dbtype.varchar(90), uppercase: true, null: false,
					options: {
						required: true, invalidMessage: 'Nama Account harus diisi'
					}
				},
				accfin_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accfin_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				accfin_allowallcoa: { text: 'Allow All Coa', type: dbtype.boolean, null: false, default: '0' },

				accfingroup_id: {
					text: 'Group', type: dbtype.varchar(20), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Group COA harus diisi' },
					comp: comp.Combo({
						table: 'mst_accfingroup',
						field_value: 'accfingroup_id',
						field_display: 'accfingroup_name',
						api: 'finact/master/accfingroup/list'
					})
				},		
			},

			defaultsearch: ['accfin_id', 'accfin_name'],

			uniques: {
				'accfin_name': ['accfin_name']
			}
		},
		

		'mst_accfincoa' : {
			comment: 'COA Finance',
			primarykeys: ['accfincoa_id'],		
			data: {
				accfincoa_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: false, uppercase: true,
					options: { required: true, invalidMessage: 'COA harus diisi', prompt:'-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},
				accfin_id: { text: 'Acccount Finance', type: dbtype.varchar(20), null: false, uppercase: true },
			}	
		}


	},

	schema: {
		header: 'mst_accfin',
		detils: {
			'coafilter': {title: 'Filter COA', table: 'mst_accfincoa', form: true, headerview: 'accfin_name' }
		}
	}
}