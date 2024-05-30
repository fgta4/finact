'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Saldo Awal Periode",
	autoid: true,

 	 persistent: {
		'mst_periodemo': {
			generatetable: false,
			comment: 'Daftar Periode Bulanan',
			primarykeys: ['periodemo_id'],
			data: {
				periodemo_id: { text: 'ID', type: dbtype.varchar(6), uppercase: true, null: false, options: { disabled: true } },
				periodemo_name: { text: 'Periode Name', type: dbtype.varchar(30), uppercase: true, null: false, options: { disabled: true } },
				periodemo_year: { text: 'Year', type: dbtype.int(4), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Tahun harus diisi' } },
				periodemo_month: { text: 'Month', type: dbtype.int(2), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Bulan harus diisi' } },
				periodemo_dtstart: { text: 'Start Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_dtend: { text: 'End Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
				periodemo_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, null: true, options: { disabled: true } },
				periodemo_closedate: { text: 'Close Date', type: dbtype.date, suppresslist: true, null: true, options: { disabled: true } }
			},
		},


		'trn_jurnalsaldo' : {
			comment: 'Saldo Ledger & Aging Periode Bulanan',
			primarykeys: ['jurnalsaldo_id'],
			data : {

				jurnalsaldo_id: { text: 'ID', type: dbtype.varchar(36), null: false, uppercase: true, suppresslist: true, },
				jurnalsaldo_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },

				/* Untuk saldo AR dan AP, infomrasi jurnal detil harus diisi */
				jurnal_id: { text: 'ID', type: dbtype.varchar(30), null: true },
				jurnal_date: { text: 'Jurnal Date', type: dbtype.date, null: true, suppresslist: true },
				jurnal_duedate: { text: 'DueDate', type: dbtype.date, null: true, suppresslist: true },
				jurnaldetil_id: { text: 'DetilID', type: dbtype.varchar(14), null: true },
				jurnaldetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: true },
				jurnaldetil_valfrg: { text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				jurnaldetil_validr: { text: 'Value (IDR)', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },

				/* Untuk keperluan saldo Ledger, saldo AR dan saldo AP */
				coamodel_id: { 
					text: 'Model', type: dbtype.varchar(10),  null: false,  suppresslist: true,
					reference: {table: 'mst_coamodel', field_value: 'coamodel_id', field_display:'coamodel_name'}
				},

				coa_id: { 
					text: 'Coa', type: dbtype.varchar(17),  null: false,  suppresslist: true,
					reference: {table: 'mst_coa', field_value: 'coa_id', field_display:'coa_name'}
				},

				unit_id: { 
					text: 'Unit', type: dbtype.varchar(10),  null: true,  suppresslist: true,
					reference: {table: 'mst_unit', field_value: 'unit_id', field_display:'unit_name'}
				},

				dept_id: { 
					text: 'Dept', type: dbtype.varchar(30),  null: true,  suppresslist: true,
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name'}
				},

				partner_id: { 
					text: 'Partner', type: dbtype.varchar(14),  null: true,  suppresslist: true,
					reference: {table: 'mst_partner', field_value: 'partner_id', field_display:'partner_name'}
				},

				project_id: { 
					text: 'Project', type: dbtype.varchar(30),  null: true,  suppresslist: true,
					reference: {table: 'mst_project', field_value: 'project_id', field_display:'project_name'}
				},

				curr_id: { 
					text: 'Curr', type: dbtype.varchar(10),  null: true,  suppresslist: true,
					reference: {table: 'mst_curr', field_value: 'curr_id', field_display:'curr_name'}
				},

				saldoawal_frg: { text: 'Saldo Awal Frg', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				saldoawal_idr: { text: 'Saldo Awal IDR', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },

				periodemo_id: { text: 'Periode', type: dbtype.varchar(6), null: false, uppercase: true },				

			},

			uniques: {
				'jurnalsaldo_periode' : ['periodemo_id', 'coa_id', 'unit_id', 'dept_id', 'partner_id', 'project_id', 'curr_id'],
				'jurnalsaldo_aging' : ['periodemo_id', 'jurnaldetil_id']
			}

		},

		'trn_jurnalsummary' : {
			comment: 'Summary Periode Bulanan, terisi pada saat periode sudah close',
			primarykeys: ['jurnalsummary_id'],
			data : {
				jurnalsummary_id: { text: 'ID', type: dbtype.varchar(36), null: false, uppercase: true, suppresslist: true, },

				coamodel_id: { 
					text: 'Model', type: dbtype.varchar(10),  null: false,  suppresslist: true,
					reference: {table: 'mst_coamodel', field_value: 'coamodel_id', field_display:'coamodel_name'}
				},

				coa_id: { 
					text: 'Coa', type: dbtype.varchar(17),  null: false,  suppresslist: true,
					reference: {table: 'mst_coa', field_value: 'coa_id', field_display:'coa_name'}
				},

				unit_id: { 
					text: 'Unit', type: dbtype.varchar(10),  null: true,  suppresslist: true,
					reference: {table: 'mst_unit', field_value: 'unit_id', field_display:'unit_name'}
				},

				dept_id: { 
					text: 'Dept', type: dbtype.varchar(30),  null: true,  suppresslist: true,
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name'}
				},

				partner_id: { 
					text: 'Partner', type: dbtype.varchar(14),  null: true,  suppresslist: true,
					reference: {table: 'mst_partner', field_value: 'partner_id', field_display:'partner_name'}
				},

				project_id: { 
					text: 'Project', type: dbtype.varchar(30),  null: true,  suppresslist: true,
					reference: {table: 'mst_project', field_value: 'project_id', field_display:'project_name'}
				},

				curr_id: { 
					text: 'Curr', type: dbtype.varchar(10),  null: true,  suppresslist: true,
					reference: {table: 'mst_curr', field_value: 'curr_id', field_display:'curr_name'}
				},

				saldoawal_frg: { text: 'Saldo Awal', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				debet_frg: { text: 'Debet', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				kredit_frg: { text: 'Kredit', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				saldoakhir_frg: { text: 'Saldo Akhir', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },

				saldoawal_idr: { text: 'Saldo Awal', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				debet_idr: { text: 'Debet', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				kredit_idr: { text: 'Kredit', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },
				saldoakhir_idr: { text: 'Saldo Akhir', type: dbtype.decimal(16, 2), null: false, default: 0, suppresslist: false },


				periodemo_id: { text: 'Periode', type: dbtype.varchar(6), null: false, uppercase: true },				

			},
			uniques: {
				'periodesummary_periode' : ['periodemo_id', 'coa_id', 'unit_id', 'dept_id', 'partner_id', 'project_id', 'curr_id']
			}
		}

 	 },

	schema: {
		header: 'mst_periodemo',
		detils: {
			'saldo': {title: 'Saldo Awal', table: 'trn_jurnalsaldo', form: true, headerview: 'periodemo_name' },
			'summary': {title: 'Summary', table: 'trn_jurnalsummary', form: true, headerview: 'periodemo_name' }
		}
	}
}