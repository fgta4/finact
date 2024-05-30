'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Budget",
	autoid: false,

	persistent: {
		'mst_coabudget': {
			comment: 'Daftar Account Budget',
			primarykeys: ['coabudget_id'],
			data: {
				coabudget_id: { text: 'ID', type: dbtype.varchar(20), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coabudget_name: {
					text: 'Account Budget', type: dbtype.varchar(255), null: false,
					uppercase: true, 
					options: {
						required: true, invalidMessage: 'Nama Account Budget harus diisi'
					}
				},
				coabudget_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				coabudget_descr: { 
					text: 'Descr', type: dbtype.varchar(255), suppresslist: true 
				},


				owner_dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null:false,  suppresslist: true,
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Owner Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},

				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: true,
					options: { prompt: 'NONE' },
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				}
      		},
    		defaultsearch: ['coabudget_id', 'coabudget_name'],
			uniques: {
				'coabudget_name': ['coabudget_name']
			}
		},


		'mst_coabudgetdept' : {
			comment: 'Departemen yang beoleh menggunakan coa ini',
			primarykeys: ['coabudgetdept_id'],		
			data: {
				coabudgetdept_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false,  
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},
				coabudget_id: { text: 'Acccount Budget', type: dbtype.varchar(20), null: false, uppercase: true },
			},
			uniques: {
				'dept_id': ['coabudget_id', 'dept_id']
			}				
	
		}
  	},

  	schema: {
    	header: 'mst_coabudget',
    	detils: {
			'dept': {
				title: 'Dept', table: 'mst_coabudgetdept', form: true, headerview: 'coabudget_name', 
				editorHandler: true,
				listHandler: true
			}
		}
	}
}