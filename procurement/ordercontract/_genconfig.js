'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Contract",
	autoid: true,
	dept_id_field: 'owner_dept_id',
	doc_id: 'CONTRACT',
	committer: true,
	approval: true,
	

	persistent: {

		'trn_ordercontract': {
			comment: 'Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['ordercontract_id'],
			data: {
				ordercontract_id: { text: 'ID', type: dbtype.varchar(14), null:false },
				ordercontract_ref: { text: 'Ref', type: dbtype.varchar(255), null:true },
				ordercontract_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				ordercontract_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				ordercontract_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

				trxmodel_id: { 
					text: 'Transaksi Default', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Default Model Transaksi harus diisi' }, 
					tips: 'Default Followup Transaksi Order yang akan dilakukan, apabila diperlukan',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},				

				inquiryselect_id: {
					text: 'Selection', type: dbtype.varchar(1), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Selection harus diisi' },
					comp: comp.Combo({
						table: 'mst_inquiryselect',
						field_value: 'inquiryselect_id',
						field_display: 'inquiryselect_name',
						api: 'finact/procurement/inquiryselect/list'
					})
				},

				ordercontract_days: { text: 'Term Bayar (hari)', type: dbtype.int(4), null:false, default:0, suppresslist: true},

				owner_dept_id: {
					// section: section.Begin('Owner', 'defbottomborder'),
					text: 'Owner / Maintainer', type: dbtype.varchar(30), null: false, 
					options: { required: true, invalidMessage: 'Owner Departemen harus diisi' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},
	
				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},
				
				
				ordercontract_selectfield: {text:'Select Field', type: dbtype.varchar(6), null:false, default:'000000', suppresslist: true, options:{disabled:true}},
				ordercontract_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				ordercontract_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				ordercontract_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				ordercontract_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				ordercontract_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				ordercontract_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				ordercontract_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				ordercontract_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				ordercontract_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				ordercontract_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				ordercontract_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				ordercontract_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


			},
			defaultsearch: ['ordercontract_id', 'ordercontract_descr']
		},


		'trn_ordercontractitem': {
			comment: 'Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['ordercontractitem_id'],
			data: {
				ordercontractitem_id: { text: 'ID', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },

				item_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'finact/items/item/list',
						OnSelectedScript: `
							form.setValue(obj.txt_ordercontractitem_descr, record.item_name)
						`
					})				
				},

				itemstock_id: { 
					text: 'Item Stock', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'finact/items/itemstock/list',
						OnSelectedScript: `
							form.setValue(obj.txt_ordercontractitem_descr, record.itemstock_name)
						`						
					})				
				},				

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'finact/items/itemclass/list',
						OnSelectedScript: `
							form.setValue(obj.txt_ordercontractitem_descr, record.itemclass_name)
						`							
					})				
				},

				ordercontractitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				ordercontractitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				ordercontractitem_days: { text: 'Days', type: dbtype.int(4), null:false, default:0},
				ordercontractitem_task: { text: 'Task', type: dbtype.int(4), null:false, default:0},
				ordercontractitem_estrate: { text: 'Est.Rate', type: dbtype.decimal(12,0), null:false, default:0},
				ordercontractitem_value: { text: 'Value', type: dbtype.decimal(12,0), null:false, default:0},

				ordercontract_id: { text: 'ID', type: dbtype.varchar(30), null:false },

			},

			defaultsearch: ['ordercontractitem_id', 'ordercontractitem_descr']
		},


		'trn_ordercontracterm' : {
			comment: 'Detil buku bank',
			primarykeys: ['ordercontracterm_id'],		
			data: {
				ordercontracterm_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				ordercontracterm_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				ordercontracterm_dt: {text:'Tanggal Pembayaran', type: dbtype.date, null:false},
				ordercontracterm_value: { text: 'Value', type: dbtype.decimal(12,0), null:false, default:0},
				ordercontract_id: { text: 'ID', type: dbtype.varchar(14), null: false },
			}
		},


		'trn_ordercontracattch' : {
			primarykeys: ['ordercontracattch_id'],
			comment: 'Daftar Attachment dari kontrack',
			data: {
				ordercontracattch_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				ordercontracattch_name: {text:'Name', type: dbtype.varchar(90), null:false, options: {required:true,invalidMessage:'Nama harus diisi'}},	
				ordercontracattch_descr: {text:'Descr', type: dbtype.varchar(255), null:true},	
				ordercontracattch_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				ordercontracattch_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox()},   //, options: { accept: 'image/*' }
				ordercontract_id: { text: 'ID', type: dbtype.varchar(30), null:false },
			},
			defaultsearch: ['sitepic_id', 'sitepic_descr'],
			uniques: {
				'ordercontracattch_name' : ['ordercontract_id', 'ordercontracattch_name']
			}
		},



	},

	schema: {
		header: 'trn_ordercontract',
		detils: {
			'item': {title: 'Item', table: 'trn_ordercontractitem', form: true, headerview: 'ordercontract_descr' },
			'term' :  {title: 'Term', table: 'trn_ordercontracterm', form: true, headerview: 'ordercontract_descr' },
			'attach': {title: 'Attachment', table: 'trn_ordercontracattch', form: true, headerview: 'ordercontract_descr' },
		}
	}

}