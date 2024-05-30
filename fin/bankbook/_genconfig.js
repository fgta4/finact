'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Buku Bank",
	autoid: true,
	idprefix: 'BB',
	printing: true,

	persistent: {
		'trn_bankbook': {
			comment: 'Daftar ',
			primarykeys: ['bankbook_id'],
			data: {
				bankbook_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				bankbook_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), uppercase: true, null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi', prompt:'-- PILIH --' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list'
					})				
				},

				bankrekening_id: { 
					text: 'Rekening Bank', type: dbtype.varchar(20), uppercase: true, null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Rekening Bank harus diisi' , prompt:'-- PILIH --'}, 
					comp: comp.Combo({
						table: 'mst_bankrekening',
						field_value: 'bankrekening_id', field_display: 'bankrekening_name',
						api: 'finact/master/bankrekening/list'
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

			},

			uniques: {
				'bankbook_date': ['bankrekening_id', 'bankbook_date']
			},	
			
			defaultsearch: ['bankbook_id', 'periodemo_id', 'bankbook_date']
		},

		'trn_bankbookdetil' : {
			comment: 'Detil buku bank',
			primarykeys: ['bankbookdetil_id'],		
			data: {
				bankbookdetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				bankbookdetil_ref: { text: 'Ref', type: dbtype.varchar(60), null: false, uppercase: false},
				
				bankbookdetil_valfrgd: { text: 'Valas Debet', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				bankbookdetil_valfrgk: { text: 'Valas Kredit', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				bankbookdetil_valfrgsaldo: { text: 'Valas Saldo', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				bankbookdetil_validrd: { text: 'IDR Debet', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				bankbookdetil_validrk: { text: 'IDR Kredit', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				bankbookdetil_validrsaldo: { text: 'IDR Saldo', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				bankbookdetil_notes: { text: 'Notes', type: dbtype.varchar(90), null: false, uppercase: false},

				bankbook_id: { text: 'BankBook', type: dbtype.varchar(14), null: false, uppercase: true },

			}	
		}
	},

	schema: {
		header: 'trn_bankbook',
		detils: {
			'detil': {title: 'Detil', table: 'trn_bankbookdetil', form: true, headerview: 'bankbook_date' }
		}
	}


}