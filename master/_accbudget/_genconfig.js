'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Account",
	autoid: false,

	persistent: {
		'mst_accbudget': {
			comment: 'Daftar Account Budget',
			primarykeys: ['accbudget_id'],
			data: {
				accbudget_id: { text: 'ID', type: dbtype.varchar(20), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				accbudget_name: {
					text: 'Account Budget', type: dbtype.varchar(255), null: false,
					options: {
						required: true, invalidMessage: 'Nama Account Budget harus diisi'
					}
				},

				accbudget_nameshort: {
					text: 'Nama Pendek', type: dbtype.varchar(255), null: false,
					options: {
						required: true, invalidMessage: 'Nama Pendek Budget harus diisi'
					}
				},

				accbudget_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				accbudget_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accbudgetgroup_id: {
					text: 'Group', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_accbudgetgroup',
						field_value: 'accbudgetgroup_id',
						field_display: 'accbudgetgroup_name',
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
				accbudgettype_id: {
					text: 'Type', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe harus diisi' },
					comp: comp.Combo({
						table: 'mst_accbudgettype',
						field_value: 'accbudgettype_id',
						field_display: 'accbudgettype_name',
						api: 'finact/master/accbudgettype/list'
					})
				},
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: true,
					options: { prompt: 'NONE' },
					tips: 'COA yang direferensi oleh account budget ini.<br>Apabila satu budget terdiri dari banyak COA,<br>field ini bisa diisi NONE, dan isi COA pada bagian detil',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				}
      		},
    		defaultsearch: ['accbudget_id', 'accbudget_name'],
			uniques: {
				'accbudget_name': ['accbudget_name']
			}
		},
		
		'mst_accbudgetcoa' : {
			comment: 'Coa Account Budget',
			primarykeys: ['accbudgetcoa_id'],		
			data: {
				accbudgetcoa_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: false, 
					options: { required: true, invalidMessage: 'COA harus diisi', prompt:'-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},
				accbudget_id: { text: 'Acccount Budget', type: dbtype.varchar(20), null: false, uppercase: true },
			},
			uniques: {
				'accbudgetcoa_coa_id': ['coa_id']
			}				
	
		}
  	},

  	schema: {
    	header: 'mst_accbudget',
    	detils: {
			'coa': {title: 'COA', table: 'mst_accbudgetcoa', form: true, headerview: 'accbudget_name' }
		}
	}
}