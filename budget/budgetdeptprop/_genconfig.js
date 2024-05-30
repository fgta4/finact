'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Dept Prop",
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
		Budget departemen per tahun yang telah disetujui, untuk digenerate jadi budget yang bisa ditarik
	`,

	persistent: {
		'mst_budgetdeptprop' : {
			comment: 'Budget departemen per tahun',
			primarykeys: ['budgetdeptprop_id'],
			data: {
				budgetdeptprop_id: { text: 'ID', type: dbtype.varchar(14), null: false},

				budgetdeptprop_descr: { text: 'Descr', type: dbtype.varchar(255) },
				budgetdeptprop_year: {
					text: 'Year', type: dbtype.int(4), null:false, default:0, options: {required: true, invalidMessage:'Tahun harus diisi'} 
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

				budgetdeptprop_version: {
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				budgetdeptprop_iscommit: { caption:'Status', text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				budgetdeptprop_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				budgetdeptprop_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				budgetdeptprop_isgenerate: {  text: 'Generate', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				budgetdeptprop_generateby: { text: 'Generate By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				budgetdeptprop_generatedate: { text: 'Generate Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},


			},
			defaultsearch: ['budgetdeptprop_id', 'budgetdeptprop_descr'],
			// uniques: {
			// 	'coabudget_name': ['coabudget_name']
			// }
		},

		'mst_budgetdeptpropitem' : {
			comment: 'Budget detil per bulan departemen per tahun',
			primarykeys: ['budgetdeptpropitem_id'],
			data: {
				budgetdeptpropitem_id: { text: 'ID', type: dbtype.varchar(14), null: false},

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

				budgetdeptpropitem_descr: { text: 'Descr', type: dbtype.varchar(255) },

				budgetdeptmonth_01: { text: 'Jan', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_02: { text: 'Feb', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_03: { text: 'Mar', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_04: { text: 'Apr', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_05: { text: 'May', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_06: { text: 'Jun', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_07: { text: 'Jul', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_08: { text: 'Ags', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_09: { text: 'Sep', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_10: { text: 'Oct', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_11: { text: 'Nov', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				budgetdeptmonth_12: { text: 'Des', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },

				budgetdeptprop_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true},
			},
			//defaultsearch: ['coabudget_id', 'coabudget_name'],
			uniques: {
				'budgetdeptpropitem_pair': ['budgetdeptprop_id', 'coabudget_id', 'dept_id']
			}
		}		
	},

	schema: {
    	header: 'mst_budgetdeptprop',
    	detils: {
			'item': {
				title: 'Budget Items', table: 'mst_budgetdeptpropitem', form: true, headerview: 'budgetdeptprop_descr', 
				editorHandler: true,
				listHandler: true
			}
		},
		xtions: {
			generate: {
				buttonname: 'btn_generate',
				buttontext: 'Generate',
			}
		},	
	}
}	