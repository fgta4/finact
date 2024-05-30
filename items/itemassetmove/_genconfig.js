'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Asset Move",
	autoid: true,
	backcolor : "#dd9a49",
	idprefix: 'MV', 
	printing: true,	
	committer: true,
	doc_id: 'ASTMOVE',

	persistent: {
		'trn_itemassetmove': {
			comment: 'Perubahan Lokasi Asset',
			primarykeys: ['itemassetmove_id'],
			data: {
				itemassetmove_id: { text: 'ID', type: dbtype.varchar(30), null: false},

				inquiry_id: {
					text: 'Inquiry', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_inquiry',
						field_value: 'inquiry_id', field_display: 'inquiry_descr',
						//api: 'finact/procurement/inquiry/list'
						api: '`${global.modulefullname}/get-inquiry`'
					})
				},

				itemassetmove_isunreferenced: {text:'Unreferenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'}},

				itemassetmovemodel_id: {
					text: 'Asset Move Model', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model asset move harus diisi' },
					comp: comp.Combo({
						table: 'mst_itemassetmovemodel',
						field_value: 'itemassetmovemodel_id', field_display: 'itemassetmovemodel_name',
						api: 'finact/items/itemassetmovemodel/list'					
					}),
					

				},

				itemassetmovetype_id: {
					text: 'Asset Move Type', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'tipe asset move harus diisi' },
					comp: comp.Combo({
						table: 'mst_itemassetmovetype',
						field_value: 'itemassetmovetype_id', field_display: 'itemassetmovetype_name',
						api: 'finact/items/itemassetmovetype/list-selector'					
					}),
					

				},

				itemassetmove_dtstart: {text:'Start Date', type: dbtype.date, null:false},
				itemassetmove_dtexpected: {text:'Expected Date', type: dbtype.date, null:false, suppresslist: true},
				itemassetmove_dtend: {text:'End Date ', type: dbtype.date, null:false, suppresslist: true},

				itemassetmove_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				user_dept_id: {
					section: section.Begin('Sender Information'), 
					text: 'User Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				from_site_id: { 
					text:'From Site', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'from_site_name', 
						api: 'ent/location/site/list'
					})				
				},

				from_room_id: {
					text:'From Room', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Room harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_room', 
						field_value: 'room_id', field_display: 'room_name', field_display_name: 'from_room_name', 
						api: 'ent/location/room/list'
					})				
				},

				from_empl_id: {
					section: section.End(),
					text:'Responsible Empl', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'from_empl_name',
						api: 'hrms/master/empl/list'
					})
				},


				to_dept_id: {
					section: section.Begin('Recipient Information'), 
					text: 'To Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen penerima harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'to_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				to_site_id: {
					text:'To Site', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site penerima harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'to_site_name', 
						api: 'ent/location/site/list'
					})				
				},

				to_room_id: {
					text:'To Room', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Room harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_room', 
						field_value: 'room_id', field_display: 'room_name', field_display_name: 'to_room_name', 
						api: 'ent/location/room/list'
					})				
				},
			
				to_empl_id: {
					section: section.End(),
					text:'Responsible Empl', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'to_empl_name',
						api: 'hrms/master/empl/list'
					})
				},

				
				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {disabled:true, required:true, invalidMessage:'ID harus diisi' },
					initialvalue: {id: 'ASTMOVE', text: 'ASTMOVE'},
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				itemassetmove_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				itemassetmove_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },

				itemassetmove_isdept: { text: 'Dept', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled: true, labelWidth: '300px' } },
				itemassetmove_isemployee: { text: 'Employee', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled: true, labelWidth: '300px' } },
				itemassetmove_issite: { text: 'Site', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled: true, labelWidth: '300px' } },
				itemassetmove_isroom: { text: 'Room', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled: true, labelWidth: '300px' } },

				itemassetmove_isreturn: { text: 'Return', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },

				itemassetmove_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemassetmove_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemassetmove_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},

				itemassetmove_issend: {text:'Send', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemassetmove_sendby: {text:'SendBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemassetmove_senddate: {text:'SendDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},

				itemassetmove_isrcv: {text:'Received', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				itemassetmove_rcvby: {text:'ReceivedBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				itemassetmove_rcvdate: {text:'ReceivedDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true}				

				
			},
			
			defaultsearch: ['itemassetmove_id', 'itemassetmove_descr']
		},


		'trn_itemassetmovedetil': {
			comment: 'Daftar Request Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['itemassetmovedetil_id'],
			data: {
				itemassetmovedetil_id: { text: 'ID', type: dbtype.varchar(30), null: false},
				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Item Asset harus diisi', prompt:'-- PILIH --'  }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'finact/items/itemasset/list'
					})				
				},
				
				item_id: {
					text:'Item', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { disabled: true, prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_item', 
						field_value: 'item_id', field_display: 'item_name', field_display_name: 'item_name', 
						api: 'finact/items/item/list'})					
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { disabled: true, prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},

				itemassetmovedetil_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0 },

				send_itemassetstatus_id: {
					text:'Send Status', type: dbtype.varchar(2), null:false,
					options: { required: true, invalidMessage: 'Send Status harus diisi', prompt:'-- PILIH --' } ,
					comp: comp.Combo({
						table: 'mst_itemassetstatus', 
						field_value: 'itemassetstatus_id', field_display: 'itemassetstatus_name', field_display_name: 'send_itemassetstatus_name', 
						api: 'finact/items/itemassetstatus/list'})					
				},

				itemassetmovedetil_senddescr: { text: 'Send Descr', type: dbtype.varchar(255), suppresslist: true },

				recv_itemassetstatus_id: {
					text:'Recv Status', type: dbtype.varchar(2), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_itemassetstatus', 
						field_value: 'itemassetstatus_id', field_display: 'itemassetstatus_name', field_display_name: 'recv_itemassetstatus_name', 
						api: 'finact/items/itemassetstatus/list'})					
				},

				itemassetmovedetil_recvdescr: { text: 'Receive Descr', type: dbtype.varchar(255), suppresslist: true },


				itemassetmove_id: { text: 'Asset Move ID', type: dbtype.varchar(30), null: false },
			}
		},		

	},

	schema: {
		header: 'trn_itemassetmove',
		detils: {
			'items' : {title: 'Items', table: 'trn_itemassetmovedetil', form: true, headerview: 'itemassetmove_descr' },
			//'multiadd' : {title: 'Items', table: 'trn_itemassetmovedetil', form: false, headerview: 'itemassetmove_descr' },
		}
	}


}
