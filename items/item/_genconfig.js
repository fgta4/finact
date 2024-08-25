'use strict'

const dbtype = global.dbtype;
const comp = global.comp;


module.exports = {
	title: "Item",
	autoid: true,


	// sementara
	persistent: {
		'mst_item': {
			comment: 'Daftar  Item',
			primarykeys: ['item_id'],
			data: {
				item_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				itemgroup_id: {
					text:'Item Group', type: dbtype.varchar(15), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Item Group harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_itemgroup', 
						field_value: 'itemgroup_id', field_display: 'itemgroup_name', field_display_name: 'itemgroup_name', 
						field_mappings: [
							`{mapping: 'itemgroup_id', text: 'ID', hidden: true, style: 'width: 100px'}`,
							`{mapping: 'itemgroup_name', text: 'Item Group', style: 'width: auto; padding-left: 10px'}`,
							`{mapping: '_id', text: 'ID', style: 'width: 100px'}`,
						],
						api: 'finact/items/itemgroup/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					
					})					
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},

				item_name: { text: 'Item Name', type: dbtype.varchar(255), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Item item harus diisi' } },
				item_nameshort: { text: 'Short Name', type: dbtype.varchar(255), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Pendek item harus diisi' } },
				item_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				item_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: false,
					tips: 'Owner Dept yang akan manage tipe item ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list'
					})				
				},		
				
				item_estcost: { text: 'Estimated Cost', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true },
				item_maxcost: { text: 'Max Cost', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, hidden: true, options:{disabled: true} },
				item_avgcost: { text: 'Avg Cost', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, hidden: true, options:{disabled: true} },
				item_mincost: { text: 'Min Cost', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, hidden: true, options:{disabled: true} },

			},

			uniques: {
				'item_name': ['item_name']
			},

			defaultsearch: ['item_id', 'item_name', 'item_nameshort']
		},
	},

	schema: {
		header: 'mst_item',
		detils: {
		}
	}


}