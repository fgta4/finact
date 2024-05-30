'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Periode Bulanan",
	autoid: true,

	persistent: {
		'mst_periodemo': {
			comment: 'Daftar Periode Bulanan',
			primarykeys: ['periodemo_id'],
			data: {
				periodemo_id: { text: 'ID', type: dbtype.varchar(6), uppercase: true, null: false, options: { disabled: true } },
				periodemo_name: { text: 'Periode Name', type: dbtype.varchar(30), uppercase: true, null: false, options: { disabled: true } },
				periodemo_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				periodemo_year: { text: 'Year', type: dbtype.int(4), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Tahun harus diisi' } },
				periodemo_month: { text: 'Month', type: dbtype.int(2), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Bulan harus diisi' } },
				periodemo_dtstart: { text: 'Start Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_dtend: { text: 'End Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_prev: {
					text: 'Previous', type: dbtype.varchar(6), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Previous periode harus diisi' },
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name', field_display_name:'periodemo_prev_name', 
						api: 'finact/master/periodemo/list'
					})
				},
				periodemo_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, null: true, unset:true, lookup:'user', hidden:true, options: { disabled: true } },
				periodemo_closedate: { text: 'Close Date', type: dbtype.date, suppresslist: true, null: true, unset:true, hidden:true, options: { disabled: true } }
			},

			uniques: {
				'periodemo_prev': ['periodemo_prev']
			},

			defaultsearch: ['periodemo_id', 'periodemo_name']
		}
	},

	schema: {
		header: 'mst_periodemo',
		detils: {
		},
		xtions: {
			addnext: {
				buttonname: 'btn_addnext',
				buttontext: 'Add Next'
			},
			close: {
				buttonname: 'btn_close',
				buttontext: 'Close'
			},
			reopen: {
				buttonname: 'btn_reopen',
				buttontext: 'Reopen'
			}
		},
	}
}