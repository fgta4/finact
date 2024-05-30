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
        periodemo_year: { text: 'Year', type: dbtype.int(4), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Tahun harus diisi' } },
        periodemo_month: { text: 'Month', type: dbtype.int(2), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Bulan harus diisi' } },
        periodemo_dtstart: { text: 'Start Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
        periodemo_dtend: { text: 'End Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
		periodemo_id_pref: {
			text: 'Previous', type: dbtype.varchar(6), null: false, uppercase: true, suppresslist: true,
			options: { required: true, invalidMessage: 'Previous periode harus diisi' },
			comp: comp.Combo({
				table: 'mst_periodemo',
				field_value: 'coamodel_id', field_display: 'coamodel_name', 
				api: 'finact/master/coamodel/list'
			})
		},

        periodemo_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
        periodemo_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, null: true, options: { disabled: true } },
        periodemo_closedate: { text: 'Close Date', type: dbtype.date, suppresslist: true, null: true, options: { disabled: true } }
      },
    }
  },

  schema: {
    header: 'mst_periodemo',
    detils: {
    }
  }
}