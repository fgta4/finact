'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Dept Allocation",
	autoid: true,

	committer: true,

	jsonOverwrite: true,
	commitOverwrite: false,
	uncommitOverwrite: false,
	approvalOverwrite: false,
	xprintOverwrite: false,
	
	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		Alokasi budget berjalan
	`,

	persistent: {
		'mst_budgetdeptalloc' : {
			comment: 'Alokasi Budget departemen',
			primarykeys: ['budgetdeptalloc_id'],
			data: {
				budgetdeptalloc_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true},

				budgetdeptalloc_descr: { text: 'Descr', type: dbtype.varchar(255) },

				budgetdeptalloc_year: {
					text: 'Year', type: dbtype.int(4), null:false, default:0, options: {required: true, invalidMessage:'Tahun harus diisi'} 
				},

				coabudget_id: {
					text: 'Budget', type: dbtype.varchar(20), null:true, 
					options:{required:true,invalidMessage:'Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Budget Dept',
						table: 'mst_coabudget', 
						field_value: 'coabudget_id', field_display: 'coabudget_name', field_display_name: 'coabudget_dept_name',
						api: 'finact/budget/coabudget/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},	

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, 
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Owner Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},

				budgetdeptalloc_value: { 
					text: 'Alocated Value', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true } 
				},

				budgetdeptalloc_apllied: { 
					text: 'Applied Value', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true, disabled: true } 
				},

				owner_dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --', disabled: true},
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

				budgetdeptalloc_version: {
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				budgetdeptalloc_iscommit: { caption:'Status', text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				budgetdeptalloc_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				budgetdeptalloc_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				budgetdeptalloc_isapply: { text: 'Applied', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
			}
		},


		'mst_budgetdeptallocsource' : {
			comment: 'Revisi Budget departemen',
			primarykeys: ['budgetdeptallocsource_id'],
			data: {
				budgetdeptallocsource_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true},
	
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Owner Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},

				coabudget_id: {
					text: 'Budget', type: dbtype.varchar(20), null:true, 
					options:{required:true,invalidMessage:'Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Budget Dept',
						table: 'mst_coabudget', 
						field_value: 'coabudget_id', field_display: 'coabudget_name', field_display_name: 'coabudget_dept_name',
						api: 'finact/budget/coabudget/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},				

				budgetdeptmonth_year: {
					text: 'Year', type: dbtype.int(4), null:false, default:0, options: {required: true, invalidMessage:'Tahun harus diisi'} 
				},

				budgetdeptmonth_month: {
					text: 'Month', type: dbtype.int(2), null:false, default:0, options: {required: true, invalidMessage:'Bulan harus diisi'} 
				},

				budgetdeptallocsource_value: { 
					text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true } 
				},

				budgetdeptallocsource_apllied: { 
					text: 'Applied', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true } 
				},

				owner_dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --', disabled: true},
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

				budgetdeptalloc_id: { text: 'Doc.ID', type: dbtype.varchar(14), null: false, suppresslist: true},
			},

			uniques: {
				'budgetdeptallocsource_pair': ['budgetdeptalloc_id', 'owner_dept_id', 'dept_id', 'coabudget_id', 'budgetdeptmonth_year', 'budgetdeptmonth_month' ]
			},
		}

	},

	schema: {
    	header: 'mst_budgetdeptalloc',
		
    	detils: {
			'source': {
				title: 'Budget Source', table: 'mst_budgetdeptallocsource', form: true, headerview: 'budgetdeptalloc_descr', 
				editorHandler: true,
				listHandler: true
			},

			'selector' : {
				title: 'Select Budget Source', table: 'mst_budgetdeptallocsource', form: false, headerview: 'budgetdeptalloc_descr', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			}
		},

		xtions: {
			apply: {
				buttonname: 'btn_apply',
				buttontext: 'Apply',
			}
		},	
	}
}	