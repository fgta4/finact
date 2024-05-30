'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Jurnal Model",
  autoid: false,

  persistent: {
    'mst_jurnalmodel': {
      comment: 'Daftar Model Jurnal',
      primarykeys: ['jurnalmodel_id'],
      data: {
        jurnalmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
        jurnalmodel_name: { text: 'Model Jurnal', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Model jurnal harus diisi' } },
        jurnalmodel_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
        jurnalmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
      },
      defaultsearch: ['jurnalmodel_id', 'jurnalmodel_name'],
      uniques: {
        'jurnalmodel_name': ['jurnalmodel_name']
      }
    }
  },

  schema: {
    header: 'mst_jurnalmodel',
    detils: {
    }
  }
}