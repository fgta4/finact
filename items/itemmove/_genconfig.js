'use strict'

const dbtype = global.dbtype;
const comp = global.comp;
const section = global.section;

module.exports = {
	title: "Item Moving",
	autoid: true,
	printing: true,	
	committer: true,


	persistent: {
		'trn_itemmove': {
			comment: 'Daftar Type Moving Item',
			primarykeys: ['itemmove_id'],
			data: {
				itemmove_id: { text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				itemmvmodel_id: {
					text: 'Move Model', type: dbtype.varchar(10), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi', prompt:'-- PILIH --' } ,
					comp: comp.Combo({
						table: 'mst_itemmvmodel',
						field_value: 'itemmvmodel_id', field_display: 'itemmvmodel_name',
						api: 'finact/items/itemmvmodel/list'
					})
				},


				itemmove_isunreferenced: {text:'Unreferenced', type: dbtype.boolean, null:false, default:'1', suppresslist: true, options: {labelWidth:'300px'}},

				itemmove_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Nama Tipe Asset Move harus diisi' } },
				itemmove_dtfr: {text:'Date From', type: dbtype.date, null:false, unset: true, options: {disabled:true}},
				itemmove_dtto: {text:'Date To', type: dbtype.date, null:false, unset: true, options: {disabled:true}},

				fr_site_id: { 
					text:'Site From', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'fr_site_name', 
						api: 'ent/location/site/list'
					})				
				},

				fr_dept_id: {
					text: 'Dept From', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'to_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				to_site_id: { 
					text:'Site To', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'to_site_name', 
						api: 'ent/location/site/list'
					})				
				},

				to_dept_id: {
					text: 'Dept To', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'to_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				inquiry_id: {
					text: 'Inquiry', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_inquiry',
						field_value: 'inquiry_id', field_display: 'inquiry_descr',
						api: 'finact/procurement/inquiry/list'
					})
				},

				orderout_id: {
					text: 'OrderOut', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_orderout',
						field_value: 'orderout_id', field_display: 'orderout_descr',
						api: 'finact/procurement/orderout/list'
					})
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name', field_display_name: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},
				
				itemmove_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				itemmove_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemmove_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemmove_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},

				itemmove_issend: {text:'Send', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemmove_sendby: {text:'SendBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemmove_senddate: {text:'SendDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},
				
				itemmove_isrcv: {text:'Received', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemmove_rcvby: {text:'ReceivedBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemmove_rcvdate: {text:'ReceivedDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true}				


			},

			
			defaultsearch: ['itemmove_id', 'itemmove_descr'],

		},


		'trn_itemmovedetil': {
			comment: 'Daftar Item moving',
			primarykeys: ['itemmovedetil_id'],
			data: {
				itemmovedetil_id: { text: 'ID', type: dbtype.varchar(30), null: false},

				item_id: {
					text:'Item', type: dbtype.varchar(14), null:false, suppresslist: true,
					options: { required: true, invalidMessage: 'Item harus diisi', prompt:'-- PILIH --' } ,
					comp: comp.Combo({
						table: 'mst_item', 
						field_value: 'item_id', field_display: 'item_name', field_display_name: 'item_name', 
						api: 'finact/items/item/list'})					
				},

				item_id: { text: 'Item ID', type: dbtype.varchar(14), null: true, options: { disabled: true } },
				item_name: { text: 'Item Name', type: dbtype.varchar(255), null: true, hidden: true},

				itemmovedetil_qtyprop: { text: 'Qty Prop', type: dbtype.int(4), null:false, default:0},
				itemmovedetil_qtysend: { text: 'Qty Send', type: dbtype.int(4), null:false, default:0},
				itemmovedetil_qtyrecv: { text: 'Qty Recv', type: dbtype.int(4), null:false, default:0},

				itemmove_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true }
			}
		}


	},

	schema: {
		title: 'Item Moving',
		header: 'trn_itemmove',
		detils: {
			'detil': {title: 'Detil', table: 'trn_itemmovedetil', form: true, headerview: 'itemmove_descr' },
		}
	}


}