'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Bill Row Type",
  autoid: false,

  persistent: {
    'mst_billoutrowtype': {
		comment: 'Daftar tipe baris detil billout',
		primarykeys: ['billoutrowtype_id'],
		data: {
			billoutrowtype_id: { text: 'ID', type: dbtype.varchar(3), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			billoutrowtype_name: { text: 'Type Bill', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Bill harus diisi' } },
		},
		uniques: {
       		'billoutrowtype_name': ['billoutrowtype_name']
      	},
		defaultsearch: ['billoutrowtype_id', 'billoutrowtype_name'],
		values: [
			{billoutrowtype_id:'ITM', billoutrowtype_name:'ITEM'},
			{billoutrowtype_id:'DLV', billoutrowtype_name:'DELIVERY'},
			{billoutrowtype_id:'DPM', billoutrowtype_name:'DOWNPAYMENT'},
		]
    }
  },

  schema: {
    header: 'mst_billoutrowtype',
    detils: {
    }
  }
}