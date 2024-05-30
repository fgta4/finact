'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Permintaan Pembayaran",
	autoid: true,
	icon: "icon-receipt-white.svg",
	backcolor: "#9e4d53",
	idprefix: 'PA',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'BILLIN',


	persistent: {
		'trn_billin': {
			comment: 'Daftar Tagihan Masuk',
			primarykeys: ['billin_id'],
			data: {
				billin_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				billtype_id: {
					text:'Type', type: dbtype.varchar(3), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Type Bill', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_billtype', 
						field_value: 'billtype_id', field_display: 'billtype_name', 
						api: 'finact/master/billtype/list'})
				},	

				purchorder_id: {
					text: 'Order', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'trn_purchorder',
						field_value: 'purchorder_id', field_display: 'purchorder_descr',
						api: 'finact/procurement/order/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_recv_id, '--NULL--', 'NONE')
				form.setValue(obj.cbo_partner_id, '0', '-- PILIH --')
				if (record.recv_id!=null) {
					form.setValue(obj.cbo_recv_id, record.recv_id, record.recv_descr)
				} else {
					obj.cbo_recv_id.reset();
				}
				form.setValue(obj.cbo_project_id, record.project_id, record.project_name)
				form.setValue(obj.txt_billin_descr, record.orderout_descr)
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name)

				if (record.projbudget_id!=null) {
					form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
				} else {
					obj.cbo_projbudget_id.reset();
				}
				if (record.projbudgettask_id!=null) {
					form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_descr)
				} else {
					obj.cbo_projbudgettask_id.reset();
				}
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
				form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_rate)						
						
						`
					})
				},

				recv_id: {
					text: 'Receive', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'trn_recv',
						field_value: 'recv_id', field_display: 'recv_descr',
						api: 'finact/procurement/recv/list'
					})
				},


				billin_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, suppresslist: false },
				billin_taxcode: { text: 'No Faktur Pajak', type: dbtype.varchar(30), null: true, suppresslist: true },
				billin_descr: { text: 'Deskripsi', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				periodemo_id: {
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Periode harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name', field_display_name: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})
				},	

				billin_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				billin_datedue: { text: 'Due Date', type: dbtype.date, null: false, suppresslist: true },



				partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(14), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},


				billin_valfrg: { text: 'Total Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				billin_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				billin_validr: { text: 'Total in IDR', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, hidden: true, options: { disabled: true } },



				// Informasi Pembayaran
				paymtype_id: {
					text: 'Tipe Pembayaran', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Pembayaran harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_paymtype',
						field_value: 'paymtype_id', field_display: 'paymtype_name',
						api: 'finact/master/paymtype/list'
					})
				},

				paymto_name: { text: 'Dibayar Kepada', type: dbtype.varchar(90), null: true, suppresslist: true, hidden: true},
				

				// Bank Info
				partnerbank_id: {
					suppresslist: true,
					options: { prompt: 'NONE'},
					text:'Partner Bank', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_partnerbank', 
						field_value: 'partnerbank_id', field_display: 'partnerbank_name', 
						api: 'ent/affiliation/partner/list',
						OnSelectedScript: `
				form.setValue(obj.txt_paymto_bankacc, record.partnerbank_accnum)
				form.setValue(obj.txt_paymto_bankaccname, record.partnerbank_accname)
				form.setValue(obj.txt_paymto_bankname, record.bank_name)						
						`
					
					})
				},
				paymto_bankacc: { text: 'Account', type: dbtype.varchar(90), null: true, suppresslist: true },
				paymto_bankaccname: { text: 'Nama Account', type: dbtype.varchar(90), null: true, suppresslist: true },
				paymto_bankname: { text: 'Nama Bank', type: dbtype.varchar(90), null: true, suppresslist: true },
				

				// Contact Info
				partnercontact_id: {
					suppresslist: true,
					options: { prompt: 'NONE'},
					text:'Partner Contact', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_partnercontact', 
						field_value: 'partnercontact_id', field_display: 'partnercontact_name', 
						api: 'ent/affiliation/partner/list',
						OnSelectedScript: `
				form.setValue(obj.txt_paymto_upname, record.partnercontact_name)
				form.setValue(obj.txt_paymto_upposition, record.partnercontact_position)
				form.setValue(obj.txt_paymto_upphone, record.partnercontact_mobilephone)						
						`
					}),
				},
				paymto_upname: { text: 'UP', type: dbtype.varchar(90), null: true , suppresslist: true},
				paymto_upposition: { text: 'Jabatan', type: dbtype.varchar(90), null: true, suppresslist: true },
				paymto_upphone: { text: 'Phone', type: dbtype.varchar(90), null: true, suppresslist: true },
				







				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,suppresslist: true,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				projecttask_id: {
					text: 'Project Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},	


				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name', field_display_name: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_name',  field_display_name: 'projecttask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},

				trxmodel_id: { 
					text: 'Model Transaksi', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},


				// dept sesuai dengan user yang membuat bill
				process_dept_id: {
					text: 'Process', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Process Departemen harus diisi', disabled:false },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'process_dept_name',
						api: 'ent/organisation/dept/list'
					})
				}, // kalau tipenya advance/reimburse, diisi sesuai dept_id


				billin_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true },
				billin_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },

				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				billin_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				billin_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				billin_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				billin_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				billin_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				billin_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				billin_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				billin_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				billin_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				billin_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				billin_isveryfied: { text: 'Verified', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				billin_verifyby: { text: 'Verified By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				billin_verifydate: { text: 'Verified Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


			},
			
			defaultsearch: ['billin_id', 'billin_descr']
		},


		'trn_billindetil' : {
			comment: 'Bill in Detil',
			primarykeys: ['billindetil_id'],		
			data: {
				billindetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				rowitem_id: {
					text:'Row Type', type: dbtype.varchar(5), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Row Type', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_rowtype', 
						field_value: 'rowtype_id', field_display: 'rowtype_name', 
						api: 'ent/general/rowtype/list'})
				},				

				taxtype_id: { text: 'Tax', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},

				projbudgetdet_id: {
					text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgetdet',
						field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
						api: 'finact/budget/projbudget/list-accbudget-byitemclass'
					})
				},

				billindetil_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				billindetil_valfrg: { text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				billindetil_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				billindetil_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },



				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name', field_display_name: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_name',  field_display_name: 'projecttask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},


				accbudget_id: {
					text:'Budget Account', type: dbtype.varchar(20), null:true,suppresslist: true,
					options: { prompt:'NONE' } ,
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},				

				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: true,suppresslist: true,
					options: { prompt:'NONE' } ,
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id',
						field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},				

				billin_id: { text: 'Bill', type: dbtype.varchar(14), null: false },

			}	
		},


		// jadwal pembayaran
		'trn_billinpaym' : {
			comment: 'Jadwal pembayaran tagihan',
			primarykeys: ['billinpaym_id'],		
			data: {
				billinpaym_id: { text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, },

				billinpaym_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				billinpaym_descr: { text: 'Descr', type: dbtype.varchar(255), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				billinpaym_frgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },


				billinpaym_itemfrg: { text: 'Item Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_itemidr: { text: 'Item IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billinpaym_ppnfrg: { text: 'PPN Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_ppnidr: { text: 'PPN IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billinpaym_pphfrg: { text: 'PPh Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_pphidr: { text: 'PPh IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billin_id: { text: 'Jurnal', type: dbtype.varchar(14), null: false },
		
			}	
		},
		
	},

	schema: {
		header: 'trn_billin',
		detils: {
			'detil': {title: 'Detil', table: 'trn_billindetil', form: true, headerview: 'billin_descr' },
			'paym': {title: 'Jadwal Pembayaran', table: 'trn_billinpaym', form: true, headerview: 'billin_descr' }
		}
	}


}