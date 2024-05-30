'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Dept",
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
		Budget departemen per tahun yang telah disetujui
	`,

	persistent: {
		'mst_budgetdeptyear' : {
			comment: 'Budget departemen per tahun',
			primarykeys: ['budgetdeptyear_id'],
			data: {
				budgetdeptyear_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true},

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

				budgetdeptyear_year: {
					text: 'Year', type: dbtype.int(4), null:false, default:0, options: {required: true, invalidMessage:'Tahun harus diisi'} 
				},

				budgetdeptyear_value: { 
					text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0,
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


				budgetdeptprop_id: {
					text: 'Propose Doc', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_budgetdeptprop', field_value: 'budgetdeptprop_id'}
				},

				budgetdeptyear_version: {
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				budgetdeptyear_iscommit: { caption:'Status', text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				budgetdeptyear_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				budgetdeptyear_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				budgetdeptyear_isapprove: { caption:'', text: 'Approved', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },

			},
			defaultsearch: ['dept_id', 'coabudget_id', 'budgetdeptyear_year'],
			uniques: {
				'budgetdeptyear_pair': ['budgetdeptyear_year', 'owner_dept_id', 'dept_id', 'coabudget_id']
			}
		},

		'mst_budgetdeptmonth' : {
			comment: 'Budget departemen per tahun',
			primarykeys: ['budgetdeptmonth_id'],
			data: {
				budgetdeptmonth_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true},
	
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

				budgetdeptmonth_value: { 
					text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0,
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

				budgetdeptprop_id: {
					text: 'Propose Doc', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_budgetdeptprop', field_value: 'budgetdeptprop_id'}
				},

				budgetdeptpropitem_id: {
					text: 'Propose Doc.Item', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_budgetdeptpropitem', field_value: 'budgetdeptpropitem_id'}
				},


				budgetdeptyear_id: { text: 'Doc.ID', type: dbtype.varchar(14), null: false, suppresslist: true},
			},

			uniques: {
				'budgetdeptmonth_pair': ['budgetdeptmonth_year', 'budgetdeptmonth_month', 'owner_dept_id', 'dept_id', 'coabudget_id']
			}
		}

	},

	schema: {
    	header: 'mst_budgetdeptyear',
    	detils: {
			'month': {
				title: 'Month', table: 'mst_budgetdeptmonth', form: true, headerview: 'dept_id', 
				editorHandler: true,
				listHandler: true
			}
		}
	}
}	