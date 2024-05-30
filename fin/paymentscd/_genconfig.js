'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jadwal Pembayaran",
	autoid: true,
	// icon: "icon-receipt-white.svg",
	// backcolor: "#9e4d53",
	idprefix: 'PS',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'BILLIN',


	persistent: {
	
		// jadwal pembayaran
		'trn_paymentscd' : {
			comment: 'Jadwal pembayaran',
			primarykeys: ['paymentscd_id'],		
			data: {
				paymentscd_id: { text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, },
				periodemo_id: {
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false,
					options: { required: true, invalidMessage: 'Periode harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name', field_display_name: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})
				},
				paymentscd_dtstart: { text: 'Start Date', type: dbtype.date, null: false, suppresslist: true },
				paymentscd_dtend: { text: 'End Date', type: dbtype.date, null: false, suppresslist: true },
				paymentscd_descr: { text: 'Descr', type: dbtype.varchar(255), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },



				// dept sesuai dengan user yang membuat bill
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Process Departemen harus diisi', disabled:false },
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				}, // kalau tipenya advance/reimburse, diisi sesuai dept_id


				paymentscd_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true },
				paymentscd_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },

				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				paymentscd_iscommit: { 
					section: section.Begin('Status'),  
					text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } 
				
				},
				paymentscd_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				paymentscd_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				paymentscd_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				paymentscd_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				paymentscd_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				paymentscd_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				paymentscd_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				paymentscd_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				paymentscd_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				paymentscd_isveryfied: { text: 'Verified', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				paymentscd_verifyby: { text: 'Verified By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				paymentscd_verifydate: { 
					section: section.End(),
					text: 'Verified Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
		
			}	
		},


		// jadwal pembayaran
		'trn_paymentscdbillin' : {
			comment: 'Jadwal pembayaran tagihan',
			primarykeys: ['paymentscdbillin_id'],		
			data: {
				paymentscdbillin_id: { text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, },


				billinpaym_id: { 
					text:'Bill', type: dbtype.varchar(14), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Bill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'trn_billinpaym', 
						field_value: 'billinpaym_id', field_display: 'billinpaym_descr', 
						api: 'finact/fin/billin/paym-list'})
				},

				billinpaym_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				billinpaym_datescd: { text: 'Schedule To', type: dbtype.date, null: false, suppresslist: false },

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

				billin_id: { text: 'Bill', type: dbtype.varchar(14), null: false },
				paymentscd_id: { text: 'Schedule', type: dbtype.varchar(14), null: false, hidden: true },
		
			}	
		},


		
	},

	schema: {
		header: 'trn_paymentscd',
		detils: {
			'billin': { title: 'Bills', table: 'trn_paymentscdbillin', form: true, headerview: 'paymentscd_descr' },
			'multiadd' : { title: 'Select Bills', table: 'trn_paymentscdbillin', form: false },			
		}
	}


}