'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Model",
	autoid: false,

	persistent: {
		'mst_itemmodel': {
			comment: 'Daftar Model Item',
			primarykeys: ['itemmodel_id'],
			data: {
				itemmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemmodel_name: { text: 'Item Model', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama model harus diisi' } },
				itemmodel_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				
				itemmodel_isintangible: { text: 'Intangiable', type: dbtype.boolean, null: false, default:0, suppresslist: true },
				itemmodel_issellable: { text: 'Sellable', type: dbtype.boolean, null: false, default:0, suppresslist: true },
				itemmodel_isnonitem: { text: 'Non Item', type: dbtype.boolean, null: false, default:0, suppresslist: true },

				itemmanage_id: { 
					text: 'Manage As', type: dbtype.varchar(2), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Manage As harus diisi' } ,
					comp: comp.Combo({
						title: 'Item akan di Manage sebagai',
						table: 'mst_itemmanage', 
						field_value: 'itemmanage_id', field_display: 'itemmanage_name', field_display_name: 'itemmanage_name', 
						api: 'finact/items/itemmanage/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})					
				},
				itemmanage_isasset: { 
					hidden: true,
					text: 'Manage As Asset ', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled: true, labelWidth:'300px'}},

				itemmodel_ismultidept: { text: 'Own By Multidept', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Item Manager Departemen',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})				
				},
				itemmodel_ishasmainteinerdept: { text: 'Has Maintainer Dept', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},

				depremodel_id: { 

					text: 'Depresiasi', 
					type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Depre Model harus diisi' } ,
					comp: comp.Combo({
						title: 'Pilih Model Depresiasi',
						table: 'mst_depremodel', 
						field_value: 'depremodel_id', field_display: 'depremodel_name', field_display_name: 'depremodel_name', 
						api: 'finact/master/depremodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})				
				},
				depremodel_isautocalc: { 
					hidden: true,
					text: 'Auto Calculation', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled: true, labelWidth:'300px'}
				},
				itemmodel_depreage: { 
					class: 'deprevaluepanel deprevaluepanel-hidden',
					text: 'Depre Age', type: dbtype.int(2), null:false, default:5, suppresslist: true 
				},
				itemmodel_depreresidu: { 
					class: 'deprevaluepanel deprevaluepanel-hidden',
					text: 'Depre Residu', type: dbtype.decimal(11,2), null:false, default:1, suppresslist: true 
				},

			},

			uniques: {
				'itemmodel_name': ['itemmodel_name']
			},
			defaultsearch: ['itemmodel_id', 'itemmodel_name'],

			// values: [
			// 	{itemmodel_id:'TAN', itemmodel_name:'TANAH', itemmanage_id:'AS', depremodel_id:'MN'},
			// 	{itemmodel_id:'BGN', itemmodel_name:'BANGUNAN', itemmanage_id:'AS', depremodel_id:'SL'},
			// 	{itemmodel_id:'PKM', itemmodel_name:'PERALATAN - KOMPUTER', itemmanage_id:'AS', depremodel_id:'SL'},
			// 	{itemmodel_id:'PPM', itemmodel_name:'PERALATAN - PRODUKSI - MEDIA', itemmanage_id:'AS', depremodel_id:'SL'},
			// 	{itemmodel_id:'SLC', itemmodel_name:'SOFTWARE - LISENSI', itemmanage_id:'AS', itemmodel_isintangible:1, depremodel_id:'SL'},
			// 	{itemmodel_id:'SHC', itemmodel_name:'SOFTWARE - HAK CIPTA / PATEN', itemmanage_id:'AS', itemmodel_isintangible:1, depremodel_id:'SL'},
			// 	{itemmodel_id:'PAC', itemmodel_name:'PROGRAM ACARA', itemmanage_id:'AS', itemmodel_isintangible:1, depremodel_id:'MN'},
			// 	{itemmodel_id:'OFS', itemmodel_name:'OFFICE SUPPLIES', itemmanage_id:'ST', itemmodel_isintangible:0, depremodel_id:'MN', itemmodel_issupplies:1},
			// 	{itemmodel_id:'MER', itemmodel_name:'MERCHANDISE', itemmanage_id:'ST', itemmodel_isintangible:0, depremodel_id:'MN', itemmodel_issupplies:0, itemmodel_issellable:1},
			// 	{itemmodel_id:'CON', itemmodel_name:'CONSUMABLE GOODS', itemmanage_id:'ST', itemmodel_isintangible:0, depremodel_id:'NO', itemmodel_issupplies:1, itemmodel_issellable:1},
			// 	{itemmodel_id:'VDC', itemmodel_name:'VISUAL DISPLAY ITEMS', itemmanage_id:'AS', itemmodel_isintangible:0, depremodel_id:'NO', itemmodel_issupplies:0, itemmodel_issellable:0}
			// ]
		},

	},

	schema: {
		header: 'mst_itemmodel',
		detils: {
		}
	}


}