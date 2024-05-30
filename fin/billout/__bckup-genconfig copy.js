'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tagihan Keluar",
	autoid: true,
	idprefix: 'AR',
	printing: true,
	icon: "icon-billout-white.svg",
	backcolor: "#7d7aa9",
	committer: true,
	doc_id: 'BILLOUT',

	persistent: {
		'trn_billout': {
			comment: 'Daftar Tagihan Keluar',
			primarykeys: ['billout_id'],
			data: {
				billout_id: { text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				billtype_id: {
					text:'Type', type: dbtype.varchar(3), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Type Bill', prompt:'-- PILIH --'},
					initialvalue: {id: 'BIL', text: 'BILL'},
					comp: comp.Combo({
						table: 'mst_billtype', 
						field_value: 'billtype_id', field_display: 'billtype_name', 
						api: 'finact/master/billtype/list-selector',
						staticfilter: `
				criteria.billtype_direction = 'OUT'		
						`
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},


				billout_isunreferenced: {text:'Unreferenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'}},


				orderin_id: { 
					text: 'Order in', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Orderin harus diisi' }, 
					comp: comp.Combo({
						table: 'trn_orderin', 
						field_value: 'orderin_id', field_display: 'orderin_descr', field_display_name: 'orderin_descr', 
						api: 'finact/sales/orderin/list-selector',
						
					})				
				},

				orderinterm_id: { 
					text: 'Term', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Term Orderin harus diisi' }, 
					comp: comp.Combo({
						table: 'trn_orderinterm', 
						field_value: 'orderinterm_id', field_display: 'orderinterm_descr', field_display_name: 'orderinterm_descr', 
						api: 'finact/sales/orderin/terms-list',
						staticfilter: `
				criteria.id = form.getValue(obj.cbo_orderin_id);	
						`,
						OnSelectedScript: `
				console.log(record);
				form.setValue(obj.chk_billout_isdp, record.orderinterm_isdp=='1' ? true : false);

						`
					})				
				},
				billout_isdp: {text:'Is Down Payment Bill', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'}},

				billout_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				billout_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: true,},
				billout_datedue: { text: 'Due Date', type: dbtype.date, null: false},

				partner_id: {
					text:'Customer', type: dbtype.varchar(30), null:false,  suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},	

				billout_payment: { text: 'Outstanding Payment', type: dbtype.decimal(16,0), null: false, default:0, options: { disabled: true} },

				// curr_id: {
				// 	text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
				// 	options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
				// 	comp: comp.Combo({
				// 		table: 'mst_curr', 
				// 		field_value: 'curr_id', field_display: 'curr_name', 
				// 		api: 'ent/general/curr/list'})
				// },

				// billout_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				// billout_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				// billout_validr: { text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },


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






				billout_totalitem: { 
					section: section.Begin('Amount Summary', 'defbottomborder'),
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totaladdcost: { 
					text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_dp: { 
					section: section.End(),
					text: 'Paid', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true}  },



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
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'sales_dept_name',
						api: 'ent/organisation/dept/list-selector'
					})
				},

				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), null: false, suppresslist: true, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},


				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					initialvalue: {id: 'BILLOUT', text: 'BILLOUT'},
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},				

				billout_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				billout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				billout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				billout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				billout_ispost: {text:'Posted', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				billout_postby: {text:'Posted By', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				billout_postdate: {text:'Posted Date', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			},
			
			defaultsearch: ['billout_id', 'billout_descr']
		},


		'trn_billoutdetil' : {
			comment: 'Bill out Detil',
			primarykeys: ['billoutdetil_id'],		
			data: {
				billoutdetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				billoutrowtype_id: { text: 'Row Type', type: dbtype.varchar(3), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Row Type' }, 
					comp: comp.Combo({
						table: 'mst_billoutrowtype', 
						field_value: 'billoutrowtype_id', field_display: 'billoutrowtype_name', field_display_name: 'billoutrowtype_name', 
						api: 'finact/fin/billoutrowtype/list'})				
				
				},	

				orderindelv_id: {
					text:'Deliver', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'trn_orderindelv', 
						field_value: 'orderindelv_id', field_display: 'orderindelv_descr', field_display_name: 'orderindelv_descr', 
						api: 'finact/sales/orderindelv/list'
					})

				},
				
				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:true,  suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list',
						OnSelectedScript: `
				console.log(record);

				form.setValue(obj.txt_billoutdetil_descr, record.itemclass_name);

				form.setValue(obj.cbo_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name );
				form.setValue(obj.cbo_coa_id, record.settl_coa_id, record.settl_coa_name );
							
						`					
					
					})					
				},


				billoutdetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },



				billoutdetil_totalitem: { 
					text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true },
				billoutdetil_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true},
				billoutdetil_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				billoutdetil_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },
				
				billoutdetil_dp: { text: 'Paid', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true },

				billoutdetil_payment: { 
					// section: section.End(),
					text: 'Payment Outstanding', type: dbtype.decimal(16,0), null: false, default:0 
				},


				accbudget_id: {
					section: section.Begin('Item Accounts'),  // , 'defbottomborder'
					text: 'Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true} ,
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},

				coa_id: {
					section: section.End(),
					text: 'Item COA', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt:'NONE', disabled: true },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},			
				
				billout_id: { text: 'Bill ID', type: dbtype.varchar(30), null: false, hidden: true },

			}
		}
		
	},

	schema: {
		header: 'trn_billout',
		detils: {
			'detil': {title: 'Detil', table: 'trn_billoutdetil', form: true, headerview: 'billout_descr' },
		},
		xtions: {
			'post': {
				api: 'xtion-post'
			}
		}
	}


}


/*
staticfilter: `
				criteria.dept_id = form.getValue(obj.cbo_dept_id);	
						`,
						OnSelectedScript: `
				console.log(record);
				form.setValue(obj.txt_billout_descr, record.orderin_descr);
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name);

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


				form.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name);
				form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);




						`

						OnSelectedScript: `
				console.log(record);

				if (record.orderindelv_id=='--NULL--')	{

					record.orderindelv_descr = '';
					record.orderindelv_totalitem = 0
					record.orderindevl_totalqty = 0
					record.orderindelv_salesgross = 0
					record.orderindelv_discount = 0
					record.orderindelv_subtotal = 0
					record.orderindelv_pph = 0
					record.orderindelv_nett = 0
					record.orderindelv_ppn = 0
					record.orderindelv_total = 0
					record.orderindelv_totaladdcost = 0
					record.orderindelv_payment = 0

				}	

				form.setValue(obj.txt_billoutdetil_descr, record.orderindelv_descr);


				form.setValue(obj.txt_billoutdetil_totalitem, record.orderindelv_totalitem);
				form.setValue(obj.txt_billoutdetil_totalqty, record.orderindevl_totalqty);
				form.setValue(obj.txt_billoutdetil_salesgross, record.orderindelv_salesgross);
				form.setValue(obj.txt_billoutdetil_discount, record.orderindelv_discount);
				form.setValue(obj.txt_billoutdetil_subtotal, record.orderindelv_subtotal);
				form.setValue(obj.txt_billoutdetil_pph, record.orderindelv_pph);
				form.setValue(obj.txt_billoutdetil_nett, record.orderindelv_nett);
				form.setValue(obj.txt_billoutdetil_ppn, record.orderindelv_ppn);
				form.setValue(obj.txt_billoutdetil_total, record.orderindelv_total);
				form.setValue(obj.txt_billoutdetil_totaladdcost, record.orderindelv_totaladdcost);
				form.setValue(obj.txt_billoutdetil_payment, record.orderindelv_payment);
				
						`
					})	
*/