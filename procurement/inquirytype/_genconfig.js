'use strict'

const dbtype = global.dbtype;
const comp = global.comp;
const section = global.section;

// onDataLoadingHandler: true,
// onDataLoadedHandler: true,
// onSelectingHandler: true,
// onSelectedHandler: true

module.exports = {
	title: "Inquiry Type",
	autoid: true,

	persistent: {
		'mst_inquirytype': {
			comment: 'Daftar Tipe Inquiry',
			primarykeys: ['inquirytype_id'],
			data: {
				inquirytype_id: {text: 'ID', type: dbtype.varchar(14), null: false},

				inquirymodel_id: {
					text: 'Model', type: dbtype.varchar(1), null: false,
					options: { required: true, invalidMessage: 'Model harus diisi' },
					comp: comp.Combo({
						table: 'mst_inquirymodel',
						field_value: 'inquirymodel_id',
						field_display: 'inquirymodel_name',
						api: 'finact/procurement/inquirymodel/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},

				inquirytype_name: { text: 'Inquiry Type Name', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Nama Tipe harus diisi' } },
				inquirytype_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' } },


				inquirytype_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },



				inquiryselect_id: {
					text: 'Selection', type: dbtype.varchar(1), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Selection harus diisi' },
					comp: comp.Combo({
						table: 'mst_inquiryselect',
						field_value: 'inquiryselect_id',
						field_display: 'inquiryselect_name',
						api: 'finact/procurement/inquiryselect/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},
				inquirytype_isperempl: { text: 'Per Employee', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' } },




				itemmanage_id: {
					text:'Manage As', type: dbtype.varchar(2), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'Order Doc harus diisi' },
					comp: comp.Combo({
						table: 'mst_itemmanage', 
						tips: 'Perlakuan item yang diterima pada saat order diselesaikan.',
						tipstype: 'visible',
						field_value: 'itemmanage_id', field_display: 'itemmanage_name',  field_display_name: 'itemmanage_name',
						api: 'finact/items/itemmanage/list'})
				},


				related_dept_id: {
					text: 'Destination Dept', type: dbtype.varchar(30), null: true, 
					tips: 'inquiry item untuk barang yg dikelola oleh dept ini',
					tipstype: 'visible',
					options: { required: true, invalidMessage: 'Related Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'related_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				related_team_id: {
					text: 'Destination Team', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_team',
						field_value: 'team_id', field_display: 'team_name', field_display_name: 'related_team_name',
						api: 'hrms/master/team/list'
					})
				},


				site_id: {
					text: 'Base Site Cek', type: dbtype.varchar(30), null:true,  suppresslist: true,
					tips: 'Inquiry untuk asset yang tersedia di <b>Site</b> ini',
					tipstype: 'visible',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'site_name', 
						api: 'ent/location/site/list'})				
				},

				room_id: {
					text: 'Base Room Cek', type: dbtype.varchar(30), null:true,  suppresslist: true,
					tips: 'Inquiry untuk asset yang tersedia di <b>room</b> ini',
					tipstype: 'visible',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_room', 
						field_value: 'room_id', field_display: 'room_name', field_display_name: 'room_name', 
						api: 'ent/location/room/list'})				
				},






				inquirytype_isallowadvance: { 
					section: section.Begin('Advance'),
					caption:'Request Advance', text: 'Allowed', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				inquirytype_isemplaspartner: { caption:'AR Partner', text: 'Use Responsible Employee', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				inquirytype_maxadvancevalue: { 
					section: section.End(),
					text: 'Max Value', type: dbtype.decimal(12,0), null: false, default: '0', suppresslist: true },





				owner_dept_id: {
					section: section.Begin('Related Dept'),
					text: 'Item Owner', type: dbtype.varchar(30), null: true, 
					tips: 'Batasi inquiry item hanya untuk barang yg dimiliki oleh dept ini',
					tipstype: 'visible',
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				owner_team_id: {
					text: 'Team of Owner', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_team',
						field_value: 'team_id', field_display: 'team_name', field_display_name: 'owner_team_name',
						api: 'hrms/master/team/list'
					})
				},


				orderout_dept_id: {
					text: 'Order Process By', type: dbtype.varchar(30), null: false, suppresslist: true,
					tips: 'Pembuat PO Apabila inquiry ini ditindaklanjuti order ke vendor/supplier/3rd party',
					tipstype: 'visible',
					options: { required: true, invalidMessage: 'Departemen Pemroses harus diisi' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'orderout_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				orderout_team_id: {
					text: 'Order Team', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE'  },
					comp: comp.Combo({
						table: 'mst_team',
						field_value: 'team_id', field_display: 'team_name', field_display_name: 'owner_team_name',
						api: 'hrms/master/team/list'
					})
				},

				trxmodel_id: { 
					section: section.End(),
					text: 'Transaksi Default', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Default Model Transaksi harus diisi' }, 
					tips: 'Default Followup Transaksi Order yang akan dilakukan, apabila diperlukan',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},


				inquiry_title_ina: { 
					section: section.Begin('Inquiry Document'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Judul Inquiry (1)', type: dbtype.varchar(90), suppresslist: true 
				},
				
				inquiry_title_eng: { 
					text: 'Judul Inquiry (2)', type: dbtype.varchar(90), suppresslist: true 
				},

				inquiry_doc_id: {
					section: section.End(),
					text:'Inquiry Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'Inquiry Doc harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'inquiry_doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},


				request_title_ina: { 
					section: section.Begin('Request Document'),
					text: 'Judul Request (1)', type: dbtype.varchar(90), suppresslist: true 
				},
				
				request_title_eng: { 
					text: 'Judul Request (2)', type: dbtype.varchar(90), suppresslist: true 
				},

				request_doc_id: {
					section: section.End(),
					text:'Request Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'Request Doc harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'request_doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				orderout_title_ina: { 
					section: section.Begin('OrderOut Document', 'defbottomborder'),
					text: 'Judul Orderout (1)', type: dbtype.varchar(90), suppresslist: true 
				},
				
				orderout_title_eng: { 
					text: 'Judul Orderout (2)', type: dbtype.varchar(90), suppresslist: true 
				},

				orderout_doc_id: {
					section: section.End(),
					text:'Order Doc', type: dbtype.varchar(30), null:false, suppresslist: true, 
					options: {required:true, invalidMessage:'Order Doc harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'orderout_doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},



				inquiryselect_isshowitemasset: {caption:'Selection', text: 'Show Itemasset', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{labelWidth:'300px'} },
				inquiryselect_isshowitem: { text: 'Show Item', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{labelWidth:'300px'} },
				inquiryselect_isshowitemstock: { text: 'Show Itemstock', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{labelWidth:'300px'} },
				inquiryselect_isshowpartner: { text: 'Show Partner', type: dbtype.boolean, null: false, default: '0', suppresslist:true,  options:{ labelWidth:'300px'} },
				inquiryselect_isshowitemclass: { text: 'Show Itemclass', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
				inquiryselect_isitemclassdisabled: { text: 'Itemclass Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{labelWidth:'300px'} },

				inquirytype_ispartnerheader: {caption:'Header', text: 'Select Partner at Header', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },

				inquirytype_isuseqty: { caption:'Metrics', text: 'Use Qty', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				inquirytype_isusedays: { text: 'Use Days', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				inquirytype_isusetask: { text: 'Use Task', type: dbtype.boolean, null: false, default: '0' , suppresslist: true},

				inquirytype_islimitqty: { caption:'Restrict To Budget', text: 'Limit Qty by Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				inquirytype_islimitdays: { text: 'Limit Days by Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				inquirytype_islimittask: { text: 'Limit Task by Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				inquirytype_islimitvalue: { text: 'Limit Value By Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				inquirytype_isallowunbudget: { text: 'Allow Request UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				inquirytype_isallowitemunbudget: { text: 'Allow Items UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				inquirytype_isallowoverbudget: { text: 'Allow Request Over Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},


				inquirytype_isdeptuser: { caption:'Item', text: 'Filter by User Dept', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' } },
				inquirytype_isdeptowner: { text: 'Filter to Owner Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px' } },
				inquirytype_isdeptmaintainer: { text: 'Filter by Maintainer Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, hidden:true, options: { labelWidth: '300px' } },
				inquirytype_isqtybreakdown: { text: 'Breakdown Quantity', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },

				inquirytype_istoberequest: { caption:'Followup', text: 'Mark As To be Request', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' } },
				inquirytype_isautorequest: { text: 'Auto create Request when processed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px' } },
				inquirytype_isautoorder: { text: 'Auto create Order when processed', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' } },
				inquirytype_ismovinginit: { text: 'Auto create Moving Init when processed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px' } },
				inquirytype_isdateinterval: { caption:'Range', text: 'Date Interval', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },

			},
		
			defaultsearch: ['inquirytype_id', 'inquirytype_name'],
			uniques: {
				'inquirytype_name': ['inquirytype_name']
			}
		},

		'mst_inquirytypepartnertype' : {
			comment: 'Model transaksi yang diapply ke suatu tipe inquiry',
			primarykeys: ['inquirytypepartnertype_id'],
			data: {
				inquirytypepartnertype_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:false,
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/affiliation/partnertype/list'})					
				
				},

				// itemclass dipindah ke partnertype
				//
				// itemclass_id: {
				// 	text:'Class', type: dbtype.varchar(14), null:false,
				// 	options: { required: true, invalidMessage: 'Class harus diisi' } ,
				// 	comp: comp.Combo({
				// 		table: 'mst_itemclass', 
				// 		field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
				// 		api: 'finact/items/itemclass/list'})					
				// },		
						
				inquirytype_id: {text:'Inquiry Type', type: dbtype.varchar(14), null:false, uppercase: true},
			},
			uniques: {
				'inquirytypepartnertype_pair': ['inquirytype_id', 'partnertype_id']
			},
		},


		'mst_inquirytypetrxmodel' : {
			comment: 'Model transaksi yang diapply ke suatu tipe inquiry',
			primarykeys: ['inquirytypetrxmodel_id'],
			data: {
				inquirytypetrxmodel_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},
				orderout_inquirytype_id: {
					text:'Order Inquiry', type: dbtype.varchar(30), null:true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_inquirytype',
						field_value: 'inquirytype_id', field_display: 'inquirytype_name', field_display_name: 'orderout_inquirytype_name',
						api: 'local:list'
					})				
				},

				inquirytype_id: {text:'Inquiry Type', type: dbtype.varchar(14), null:false},
			},

			uniques: {
				'inquirytypetrxmodel_pair': ['inquirytype_id', 'trxmodel_id']
			},

		},
		
		
		'mst_inquirytypeitemclass' : {
			comment: 'Itemclass yang diapply ke suatu tipe inquiry',
			primarykeys: ['inquirytypeitemclass_id'],
			data: {
				inquirytypeitemclass_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						field_mappings: [
							`{mapping: 'maintainer_dept_name', text: 'Maintainer', style:'width: 200px'}`,
							`{mapping: 'owner_dept_name', text: 'Owner', style:'width: 200px'}`
						],
						api: 'finact/items/itemclass/list-bymaintainer',
						// apicriteria: `criteria.owner_dept_id = form.getValue(obj.cbo_owner_dept_id)`
					})					
				},
				inquirytype_id: {text:'Inquiry Type', type: dbtype.varchar(14), null:false},
			},

			uniques: {
				'inquirytypeitemclass_pair': ['inquirytype_id', 'itemclass_id']
			},

		},		

	},

	schema: {
		header: 'mst_inquirytype',
		detils: {
			'partnertype': {
				title: 'Partner Type', table: 'mst_inquirytypepartnertype', form: true, headerview: 'inquirytype_name' ,
				// editorHandler: true,listHandler: true
			},
			'modeltransaksi': {
				title: 'Model Transaksi', table: 'mst_inquirytypetrxmodel', form: true, headerview: 'inquirytype_name',
				// editorHandler: true,listHandler: true 
			},
			'itemclass': {
				title: 'Item Class', table: 'mst_inquirytypeitemclass', form: true, headerview: 'inquirytype_name' ,
				editorHandler: true,listHandler: true
			},
		}
	}
}