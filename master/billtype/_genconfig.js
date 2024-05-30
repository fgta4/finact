'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Bill Type",
  autoid: false,

  persistent: {
    'mst_billtype': {
		comment: 'Daftar tipe bill',
		primarykeys: ['billtype_id'],
		data: {
			billtype_id: { text: 'ID', type: dbtype.varchar(3), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			billtype_name: { text: 'Type Bill', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Bill harus diisi' } },
			billtype_direction: { text: 'Direction', type: dbtype.varchar(3), suppresslist: false },
		},
		uniques: {
       		'billtype_name': ['billtype_name']
      	},
		defaultsearch: ['billtype_id', 'billtype_name'],
		values: [
			{billtype_id:'INV', billtype_name:'INVOICE', billtype_direction:'IN'},
			{billtype_id:'ADV', billtype_name:'ADVANCE', billtype_direction:'IN'},
			{billtype_id:'RMB', billtype_name:'REIMBURSE', billtype_direction:'IN'},
		]
    }
  },

  schema: {
    header: 'mst_billtype',
    detils: {
    }
  }
}