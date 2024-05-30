'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In Deliver",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'DO', 
	printing: true,	
	committer: true,

	persistent: {
		'trn_orderindelv': {
			comment: 'Daftar pemenuhan orderin (delivery ke customer, dan yang semacamnya)',
			primarykeys: ['orderindelv_id'],
			data: {
				orderindelv_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
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
				
	
				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},
				
				
				orderin_id: { 
					text: 'Order in', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Order In Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'trn_orderin', 
						field_value: 'orderin_id', field_display: 'orderin_descr', field_display_name: 'orderin_descr', 
						api: 'finact/sales/orderin/list-selector',
						staticfilter: `
				criteria.dept_id = form.getValue(obj.cbo_dept_id);
				criteria.partner_id = form.getValue(obj.cbo_partner_id);
				criteria.unit_id = form.getValue(obj.cbo_unit_id);
						`,
						OnSelectedScript: `
				console.log(record);
				form.setValue(obj.txt_orderindelv_descr, record.orderin_descr);
				form.setValue(obj.cbo_orderintype_id, record.orderintype_id, record.orderintype_name);
				form.setValue(obj.cbo_ae_empl_id, record.ae_empl_id, record.ae_empl_name);
				form.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.owner_dept_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);
				
				
				form.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id==null?'--NULL--':record.ppn_taxtype_id, record.ppn_taxtype_name);
				form.setValue(obj.txt_ppn_taxvalue, record.ppn_taxvalue);
				form.setValue(obj.chk_ppn_include, record.ppn_include);
				form.setValue(obj.cbo_pph_taxtype_id, record.pph_taxtype_id==null?'--NULL--':record.pph_taxtype_id, record.pph_taxtype_name);
				form.setValue(obj.txt_pph_taxvalue, record.pph_taxvalue);
				
				form.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id==null?'--NULL--':record.arunbill_coa_id, record.arunbill_coa_name);
				form.setValue(obj.cbo_ar_coa_id, record.ar_coa_id==null?'--NULL--':record.ar_coa_id, record.ar_coa_name);
				form.setValue(obj.cbo_dp_coa_id, record.dp_coa_id==null?'--NULL--':record.dp_coa_id, record.dp_coa_name);
				form.setValue(obj.cbo_sales_coa_id, record.sales_coa_id==null?'--NULL--':record.sales_coa_id, record.sales_coa_name);
				form.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id==null?'--NULL--':record.salesdisc_coa_id, record.salesdisc_coa_name);
				form.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id==null?'--NULL--':record.ppn_coa_id, record.ppn_coa_name);
				form.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id==null?'--NULL--':record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name);
				form.setValue(obj.cbo_pph_coa_id, record.pph_coa_id==null?'--NULL--':record.pph_coa_id, record.pph_coa_name);


					`
					})				
				},		
	
				orderindelv_descr: { text: 'Descr', type: dbtype.varchar(255), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderindelv_dt: {text:'Deliver Date', type: dbtype.date, null:false},
	
				site_id: {
					text:'From', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name',  field_display_name: 'site_name',
						api: 'ent/location/site/list'
					})
				},
	
				orderintype_id: {
					section: section.Begin('OrderIn'),  //section.Begin('Related Dept', 'defbottomborder'),
					text:'Order Type', type: dbtype.varchar(10), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Order Type Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_orderintype', 
						field_value: 'orderintype_id', field_display: 'orderintype_name',  field_display_name: 'orderintype_name',
						api: 'finact/sales/orderintype/list'
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
	
				owner_dept_id: {
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
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
					section: section.End(),
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true, hidden: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},
	
				ppn_taxtype_id: { 
					section: section.Begin('Tax'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true}, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}},
	
	
				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true }, 
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
					options: { required: true, invalidMessage: 'AR harus diisi', disabled: true }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'arunbill_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
				ar_coa_id: { 
					text: 'COA AR', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi', disabled: true }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ar_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
	
	
				dp_coa_id: { 
					text: 'COA Downpayment', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn COA Downpayment harus diisi' , disabled: true}, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'dp_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
	
				sales_coa_id: { 
					text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi', disabled: true }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},
	
				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true}, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},
	
				ppnsubsidi_coa_id: { 
					text: 'COA Subsidi PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true}, 
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
					options: { prompt: 'NONE' , disabled: true}, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},						
	
				orderindelv_totalitem: { 
					section: section.Begin('Amount Summary'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindevl_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
	
				orderindelv_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderindelv_payment: { 
					section: section.End(),
					text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},

				orderindelv_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				orderindelv_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				orderindelv_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				orderindelv_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				orderindelev_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },



			},

			defaultsearch: ['orderin_id', 'orderin_descr']

		},

		'trn_orderindelvitem' : {
			comment: 'Item yang di request',
			primarykeys: ['orderindelvitem_id'],		
			data: {
				orderindelvitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'finact/items/itemclass/list',
						OnSelectedScript: `
				console.log(record);		
				form.setValue(obj.cbo_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name)
				form.setValue(obj.cbo_coa_id, record.settl_coa_id, record.settl_coa_name)		
						`
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

				orderindelv_id: { text: 'ID', type: dbtype.varchar(30), null: false, hidden: true },
			}
		},
		

	},


	schema: {
		header: 'trn_orderindelv',
		detils: {
			'items' : {title: 'Items', table: 'trn_orderindelvitem', form: true, headerview: 'orderindelv_descr' },
		},
		xtions: {
			post: {
				api: 'xtion-post',
				buttonname: 'btn_post',
				buttontext: 'Post'
			}
		}
	}	
}