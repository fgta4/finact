'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project Model",
	// icon : "icon-projectmodel-white.svg",  
	autoid: false,

	persistent: {
		'mst_projectmodel': {
			comment: 'Daftar Project Type',
			primarykeys: ['projectmodel_id'],
			data: {
				projectmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				projectmodel_name: { text: 'Model Project', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Project harus diisi' } },
				projectmodel_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				projectmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },

				projecttype_id: {
					text: 'Type', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Type Project harus diisi' },
					comp: comp.Combo({
						table: 'mst_projecttype', field_value: 'projecttype_id', field_display: 'projecttype_name',
						api: 'finact/master/projecttype/list'
					})
				},

				// hasil akhir / finish good  //
				fg_accbudget_id: {
					section: section.Begin('Production Result'),  // , 'defbottomborder'
					text: 'FG Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					tips: 'Budget persediaan sebagai result pada saat project ini dikerjakan (manufactur/inhouse)',
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'fg_accbudget_name',
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_fg_coa_id, record.coa_id, record.coa_name)		
						`
					})
				},

				fg_coa_id: {
					section: section.End(),
					text: 'FG COA', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					tips: 'Account persediaan sebagai result pada saat project ini dikerjakan (manufactur/inhouse)',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'fg_coa_name',
						api: 'finact/master/coa/list'
					})
				},
				

				// Custom Sales Account //
				sl_accbudget_id: {
					section: section.Begin('Custom Sales Account'),  // , 'defbottomborder'
					text: 'SL Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					tips: 'Budget sales pada saat hasil dari project ini terjual',
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'sl_accbudget_name',
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_sl_coa_id, record.coa_id, record.coa_name)		
						`
					})
				},

				sl_coa_id: {
					section: section.End(),
					text: 'SL COA', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					tips: 'Account sales pada saat hasil dari project ini terjual',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sl_coa_name',
						api: 'finact/master/coa/list'
					})
				},				

			},
			defaultsearch: ['projectmodel_id', 'projectmodel_name'],
			uniques: {
				'projectmodel_name': ['projectmodel_name']
			}
		}
	
	},

	schema: {
		header: 'mst_projectmodel',
		detils: {
		}
	}
}