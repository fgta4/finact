'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'SO', 
	printing: true,	
	committer: true,
	approval: true,
	doc_id: 'ORDERIN',		

	persistent: {
		'trn_orderin': {
			comment: 'Daftar Order Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['orderin_id'],
			data: {
				orderin_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},

				owner_dept_id: {
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				orderintype_id: {
					text:'Order Type', type: dbtype.varchar(10), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Order Type Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_orderintype', 
						field_value: 'orderintype_id', field_display: 'orderintype_name',  field_display_name: 'orderintype_name',
						api: 'finact/sales/orderintype/list'
					})
				},

				
				orderin_ref: { text: 'Ref', type: dbtype.varchar(90), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderin_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderin_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				orderin_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},
				orderin_dteta: {text:'Date ETA', type: dbtype.date, null:false, suppresslist: true},


				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},


				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departemen harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				},	

				trxmodel_id: { 
					text: 'Model Trx', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_trxmodel',
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'
					})				
				},

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				orderin_ishasdp: {
					section: section.Begin('Down Payment'),  //section.Begin('Related Dept', 'defbottomborder'),
					caption:'Down Payment', text:'has down payment', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'}},
				orderin_dpvalue: { 
					section: section.End(),
					text: 'Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true 
				},

				ppn_taxtype_id: { 
					section: section.Begin('Tax'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}},


				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
			
				},

				pph_taxvalue: { 
					section: section.End(),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPH Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},

				arunbill_coa_id: { 
					section: section.Begin('Chart of Accounts'),  // , 'defbottomborder'
					text: 'COA AR Unbill', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'arunbill_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
				ar_coa_id: { 
					text: 'COA AR', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ar_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},

	
				dp_coa_id: { 
					text: 'COA Downpayment', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn COA Downpayment harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'dp_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},

				sales_coa_id: { 
					text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppnsubsidi_coa_id: { 
					text: 'COA Subsidi PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: 'Apabila PPN include COA ini perlu diisi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppnsubsidi_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				pph_coa_id: { 
					section: section.End(),
					text: 'COA PPH Prepaid', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},						




				orderin_totalitem: { 
					section: section.Begin('Amount Summary'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },

				orderin_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_payment: { 
					section: section.End(),
					text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				orderin_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				orderin_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				orderin_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				orderin_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				orderin_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				orderin_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				orderin_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				orderin_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				orderin_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				orderin_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				orderin_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				orderin_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				orderin_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				orderin_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				orderin_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				orderin_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
			},
			
			defaultsearch: ['orderin_id', 'orderin_descr']
		},

		'trn_orderinitem' : {
			comment: 'Item yang di request',
			primarykeys: ['orderinitem_id'],		
			data: {
				orderinitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				orderinitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderinitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, suppresslist: true},
				orderinitem_price: { text: 'Price', type: dbtype.decimal(12,0), null:false, default:0},
				orderinitem_pricediscpercent: { text: 'Disc (%)', type: dbtype.decimal(12,0), null:false, default:0},
				orderinitem_pricediscvalue: { text: 'Disc Value', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},
				orderinitem_subtotal: { text: 'Subtotal', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, suppresslist: true, options: {disabled: true}},

				accbudget_id: {
					text: 'Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true} ,
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},

				coa_id: {
					text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true } ,
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/accbudget/list'
					})
				},

				orderin_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			}
		},

		'trn_orderinterm' : {
			comment: 'Term permbayaran orderin',
			primarykeys: ['orderinterm_id'],		
			data: {
				orderinterm_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				orderintermtype_id: {
					text: 'Type', type: dbtype.varchar(17), null: true, 
					options: {required:true, invalidMessage:'Type harus diisi' },
					comp: comp.Combo({
						table: 'mst_orderintermtype',
						field_value: 'orderintermtype_id', field_display: 'orderintermtype_name'  , field_display_name: 'orderintermtype_name',
						api: 'finact/sales/orderintermtype/list',
						OnSelectedScript: `
				form.setValue(obj.chk_merchorderinterm_isdp, record.orderintermtype_isdp)		
						`
					})
				},

				orderinterm_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderinterm_days: {text:'Days', type: dbtype.int(4), default: 0, null:false},
				orderinterm_dtfrometa: {text:'Date Due (ETA)', type: dbtype.date, null:false, suppresslist: true},
				orderinterm_dt: {text:'Date Due (Actual)', type: dbtype.date, null:false, suppresslist: true},
				orderinterm_isdp: {text:'Down Payment', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
				orderinterm_paymentpercent: { text: 'Value', type: dbtype.decimal(3,0), null: false, default:0, suppresslist: true },
				orderinterm_payment: { text: 'Value', type: dbtype.decimal(16,0), null: false, default:0},
				orderin_totalpayment: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, hidden: true, suppresslist: true, options: { disabled: true }},
				orderin_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			}
		}

	},

	schema: {
		header: 'trn_orderin',
		detils: {
			'items' : {title: 'Items', table: 'trn_orderinitem', form: true, headerview: 'orderin_descr' },
			'terms' : {title: 'Payment Terms', table: 'trn_orderinterm', form: true, headerview: 'orderin_descr' },



			// 'request' : {title: 'Request', table: 'trn_orderoutreq', form: true, headerview: 'orderout_descr' },
		}
	}


}