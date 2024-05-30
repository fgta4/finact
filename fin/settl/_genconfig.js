'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Settlement",
	autoid: true,
	idprefix: 'ST',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'SETTL',


	persistent: {
		'trn_settl': {
			comment: 'Daftar Jurnal',
			primarykeys: ['settl_id'],
			data: {
				settl_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				settl_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list'
					})				
				},				

				settl_date: { text: 'Date', type: dbtype.date, null: false },

				billinpaym_id: {
					text: 'Pembayaran', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billinpaym',
						field_value: 'billinpaym_id', field_display: 'billinpaym_caption',
						api: 'local:get-billinpaym'
					})
				},


				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, hidden: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},

				settl_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --', disabled: true},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},


				adv_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,  hidden: true, options: { required: true , disabled: true} },
				adv_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, hidden: true,  options: { required: true , disabled: true} },
				adv_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, hidden: true, options: { required: true , disabled: true} },


				rmb_valfrg: { hidden: true, text: 'Reimburse Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,  hidden: true, options: { required: true , disabled: true} },
				rmb_valfrgrate: { hidden: true, text: 'Reimburse Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, hidden: true,  options: { required: true , disabled: true} },
				rmb_validr: { hidden: true, text: 'Reimburse IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, hidden: true, options: { required: true , disabled: true} },

				ret_valfrg: { hidden: true, text: 'Return Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,  hidden: true, options: { required: true , disabled: true} },
				ret_valfrgrate: { hidden: true, text: 'Return Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, hidden: true,  options: { required: true , disabled: true} },
				ret_validr: { hidden: true, text: 'Return IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, hidden: true, options: { required: true , disabled: true} },




				paym_jurnal_id: {
					text: 'Jurnal Pembayaran', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true },
					comp: comp.Combo({
						table: 'trn_jurnal',
						field_value: 'jurnal_id', field_display: 'jurnal_descr', field_display_name: 'paym_jurnal_descr',
						api: 'local:get-jurnal'
					})
				},

				paym_jurnaldetil_id: {
					text: 'Detil Pembayaran', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr', field_display_name: 'paym_jurnaldetil_descr',
						api: 'local:get-jurnaldetil'
					})
				},

				adv_coa_id: {
					text:'Account', type: dbtype.varchar(20), null:true, suppresslist: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'adv_coa_name', 
						api: 'finact/master/coa/list'})
				},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, hidden: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},				


				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				settl_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				settl_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				settl_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				settl_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				settl_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				settl_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				settl_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				settl_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				settl_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				settl_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				settl_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				settl_ispost: { text: 'Posted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, unset:true, options: { disabled: true } },
				settl_postby: { text: 'Post By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				settl_postdate: { text: 'Post Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
		
			},
			
			defaultsearch: ['settl_id', 'settl_descr']
		},

		'trn_settlitem' : {
			comment: 'Settlement',
			primarykeys: ['settlitem_id'],		
			data: {
				settlitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },

				itemasset_id: { 
					hidden: true,
					text: 'Item Asset', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'local: list-get-itemasset'
					})				
				},

				item_id: { 
					hidden: true,
					text: 'Item', type: dbtype.varchar(14),  null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'local: list-get-item'
					})				
				},

				itemstock_id: { 
					hidden: true,					
					text: 'Item Stock', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'local: list-get-itemstock'
					})				
				},				

				partner_id: {
					hidden: true,
					text:'Partner', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14),  null: false,  suppresslist: true,
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				settlitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				settlitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				settlitem_days: { text: 'Days', type: dbtype.int(4), null:false, default:0},
				settlitem_task: { text: 'Task', type: dbtype.int(4), null:false, default:0},
				settlitem_rate: { text: 'Rate', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				settlitem_value: { text: 'Value', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				curr_id: {
					text:'Currency', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'mst_curr', field_value: 'curr_id'},
					options: {disabled: true}
				},

				settlitem_currrate: { text: 'Curr Rate', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				settlitem_idr: { text: 'IDR', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
			
				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},

				settl_id: { text: 'Settlement', type: dbtype.varchar(14), null: false, hidden: true },
			}	
		},

	},

	schema: {
		header: 'trn_settl',
		detils: {
			'item': {title: 'Detil', table: 'trn_settlitem', form: true, headerview: 'settl_descr' },
		}
	}


}
