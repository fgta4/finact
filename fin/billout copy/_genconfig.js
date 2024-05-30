'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tagihan Keluar",
	autoid: true,
	idprefix: 'OR',
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
				billout_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-forsalesorder'
					})
				},

				orderin_id: { 
					text: 'Sales Order', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_orderin', 
						field_value: 'orderin_id', field_display: 'orderin_descr', field_display_name: 'orderin_descr', 
						api: 'finact/sales/orderin/list'})				
				
				},

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






				sales_coa_id: { 
					section: section.Begin('Account'),  //section.Begin('Related Dept', 'defbottomborder'),
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
					text: 'COA PPH Prepaid', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},						



				sales_dept_id: {
					section: section.End(), 
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'sales_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},


				billout_totalitem: { text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_payment: { text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },


				billtype_id: {
					text:'Type', type: dbtype.varchar(3), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Type Bill', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_billtype', 
						field_value: 'billtype_id', field_display: 'billtype_name', 
						api: 'finact/master/billtype/list'})
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
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},				
				billout_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				billout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				billout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				billout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				billout_ispost: {text:'Posted', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
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

				billrowtype_id: { text: 'Row Type', type: dbtype.varchar(1), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Row Type' }, 
					comp: comp.Combo({
						table: 'mst_billrowtype', 
						field_value: 'billrowtype_id', field_display: 'billrowtype_name', field_display_name: 'billrowtype_name', 
						api: 'finact/fin/billrowtype/list'})				
				
				},	

				taxtype_id: { text: 'Tax', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},

				billoutdetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, uppercase: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},	

				billoutdetil_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billoutdetil_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				billoutdetil_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				
				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},
				
				coa_id: {
					text: 'Akun Pembayaran', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},			
				
				billout_id: { text: 'Bill ID', type: dbtype.varchar(14), null: false },

			}
		}
		
	},

	schema: {
		header: 'trn_billout',
		detils: {
			'detil': {title: 'Detil', table: 'trn_billoutdetil', form: true, headerview: 'billout_descr' }
		}
	}


}