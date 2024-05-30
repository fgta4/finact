'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Budget Account Type",
  autoid: false,

  persistent: {
    'mst_accbudgettype': {
      comment: 'Daftar Type Account Budget',
      primarykeys: ['accbudgettype_id'],
      data: {
        accbudgettype_id: {
          text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false,
          options: { required: true, invalidMessage: 'ID harus diisi' }
        },
        accbudgettype_name: { text: 'Tipe Budget', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Budget harus diisi' } },
        accbudgettype_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
        accbudgettype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
      },
      defaultsearch: ['accbudgettype_id', 'accbudgettype_name'],
      uniques: {
        'accbudgettype_name': ['accbudgettype_name']
      }
    }
  },

  schema: {
    header: 'mst_accbudgettype',
    detils: {
    }
  }
}