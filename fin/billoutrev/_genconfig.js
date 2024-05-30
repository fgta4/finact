'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Revisi Tagihan Keluar",
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

				salesorder_id: { 
					text: 'Sales Order', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_salesorder', 
						field_value: 'salesorder_id', field_display: 'salesorder_descr', field_display_name: 'salesorder_descr', 
						api: 'finact/sales/order/list'})				
				
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

				coa_id: {
					text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						field_display_name: 'cost_coa_id_name', 
						api: 'finact/master/coa/list'
					})
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				billout_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billout_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				billout_validr: { text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },

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
				


				billoutdetil_validr_ori: { text: 'Nilai Tagihan Awal', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				billoutdetil_validr_rev: { text: 'Nilai Tagihan Baru', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				billoutdetil_validr_var: { text: 'Variance', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billoutdetil_rev_descr: { text: 'Keterangan', type: dbtype.varchar(255), null: false, uppercase: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				rev_coa_id: {
					text: 'Coa Variance', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'rev_coa_name',
						api: 'finact/master/coa/list'
					})
				},
				periodemo_id: {
					text: 'Periode Buku', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Periode harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name', field_display_name: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})
				},	
				billoutdetil_bookdate: { text: 'BookDate', type: dbtype.date, null: false, suppresslist: false },



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