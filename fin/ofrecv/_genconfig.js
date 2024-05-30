'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Official Receipt",
	autoid: true,
	idprefix: 'OR',
	printing: true,
	committer: true,

	persistent: {
		'trn_tjurnalor': {
			comment: 'Daftar Jurnal',
			primarykeys: ['jurnal_id'],
			data: {
				jurnal_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				jurnaltype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Jurnal Type harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_jurnaltype', 
						field_value: 'jurnaltype_id', field_display: 'jurnaltype_name', field_display_name: 'jurnaltype_name', 
						api: 'finact/master/jurnaltype/list-selector',
						staticfilter: `
				criteria.jurnalmodel_id = 'OR';
						`


					})
				},

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periodemo/list-open'
					})				
				},	
				jurnal_date: { text: 'Date', type: dbtype.date, null: false },


				jurnal_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},
				
				temprecv_id : {
					text: 'Tanda Terima', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_temprecv',
						field_value: 'temprecv_id', field_display: 'temprecv_descr',
						api: 'finact/collection/temprecv/list'
					})
				},

				billout_id : {
					text: 'Tagihan', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr',
						api: 'finact/fin/billout/list-selector',
						staticfilter: `
				criteria.partner_id = form.getValue(obj.cbo_partner_id);		
						`,
						OnSelectedScript: `
				console.log(record);
				form.setValue(obj.txt_jurnal_descr, record.billout_descr)
				form.setValue(obj.txt_jurnal_valfrg, record.billout_payment)
				form.setValue(obj.cbo_curr_id, 'IDR', 'IDR')
				form.setValue(obj.txt_jurnal_valfrgrate, 1)
				form.setValue(obj.txt_jurnal_validr, record.billout_payment)

						`
					})
				},




				jurnal_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },


				jurnal_valfrg: { 
					text: 'Amount', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,   options: { required: true },
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'form_value_recalculate'
						}
					} 
				},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					initialvalue: {id:'IDR', text:'IDR'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				jurnal_valfrgrate: { 
					text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true,   options: { required: true },
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'form_value_recalculate'
						}
					} 
				},
				jurnal_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false,  options: { required: true, disabled: true} },
				

				paymtype_id: {
					section: section.Begin('Penerimaan'),  //, 'defbottomborder'
					text: 'Tipe Pembayaran', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Pembayaran harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_paymtype',
						field_value: 'paymtype_id', field_display: 'paymtype_name',
						api: 'finact/master/paymtype/list'
					})
				},

				bankrekening_id: { 
					text: 'Rekening Bank', type: dbtype.varchar(20), null: true, suppresslist: true, 
					options: { prompt:'NONE'}, 
					comp: comp.Combo({
						table: 'mst_bankrekening',
						field_value: 'bankrekening_id', field_display: 'bankrekening_name',
						api: 'finact/master/bankrekening/list-selector',
						staticfilter: `
				criteria.curr_id = form.getValue(obj.cbo_curr_id);		
						`
					})				
				},					

				paym_gironum: { text: 'No Giro / Cek', type: dbtype.varchar(90), null: true, suppresslist: true },
				paym_girodate: { 
					
					text: 'Tgl Cair Giro', type: dbtype.date, null: false, suppresslist: true 
				},

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:true, suppresslist: true, 
					options: { required: true, invalidMessage: 'COA Penerimaan harus diisi',   prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},

				accfin_id: {
					section: section.End(),
					text: 'Akun Finance', type: dbtype.varchar(20), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Akun Finance harus diisi',   prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accfin',
						field_value: 'accfin_id',
						field_display: 'accfin_name',
						api: 'finact/master/accfin/list'
					})
				},

				
				ar_jurnal_id: {
					section: section.Begin('Jurnal Reference', 'defbottomborder'),
					text: 'AR Jurnal', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr',
						api: 'finact/fin/ofrecv/list-getoutstandingar'
					})
				},


				ar_jurnaldetil_id: {
					section: section.End(),
					text: 'AR Junraldetil', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr',
						api: 'finact/fin/ofrecv/list-getoutstandingar'
					})
				},


				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true,  
					options: { required: true, invalidMessage: 'Dept harus diisi', prompt: '-- PILIH --', disabled: true },
					autobylogin: 'dept',
					// initialvalue: {id:'global.setup.dept_id', text:'global.setup.dept_name'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},	


				jurnalsource_id: {
					text:'Source', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Source harus diisi', prompt:'-- PILIH --', disabled: true},
					initialvalue: {id:'OFRECV', text:'OFFICIAL RECEIPT'},
					comp: comp.Combo({
						table: 'mst_jurnalsource', 
						field_value: 'jurnalsource_id', field_display: 'jurnalsource_name', 
						api: 'finact/master/jurnalsource/list'})
				},


				tjurnalor_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				tjurnalor_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				tjurnalor_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				tjurnalor_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				tjurnalor_ispost: { text: 'Posted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, unset:true, options: { disabled: true } },
				tjurnalor_postby: { text: 'Post By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				tjurnalor_postdate: { text: 'Post Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				
			},
			
			defaultsearch: ['jurnal_id', 'jurnal_descr']
		},


		'trn_tjurnalordetil' : {
			comment: 'Jurnal Detil',
			primarykeys: ['jurnaldetil_id'],		
			data: {
				jurnaldetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},


				jurnaldetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, uppercase: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				jurnaldetil_valfrg: { 
					text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true },
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							fnname: 'form_value_recalculate'
						}
					} 
				},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				jurnaldetil_valfrgrate: { 
					text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true }, 
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'form_value_recalculate'
						}
					} 
				},
				jurnaldetil_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true, disabled: true } },

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Account Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: false,
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},

				jurnaldetil_id_ref: {
					text: 'Ref', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr',
						api: 'finact/fin/ofrecv/list-getoutstandingar'
					})
				},

				jurnal_id: { text: 'Jurnal', type: dbtype.varchar(14), null: false, hidden: true },
			}	
		},


	},




	schema: {
		title: 'Penerimaan',
		header: 'trn_tjurnalor',
		xtions: {
			post: {
				api: 'xtion-post',
				buttonname: 'btn_post',
				buttontext: 'Post'
			},
			unpost: {
				api: 'xtion-unpost',
				buttonname: 'btn_unpost',
				buttontext: 'UnPost'
			}
		},


		detils: {
			'detil': {
				title: 'Detil', table: 'trn_tjurnalordetil', form: true, headerview: 'jurnal_descr', 
				editorHandler: true,
				listHandler: true,
			},
			'newdata' : {
				title: 'New Data', table: 'trn_tjurnalordetil', form: false, headerview: 'jurnal_descr', 
				tabvisible: false, overwrite: false
			}
		}

	}


}

