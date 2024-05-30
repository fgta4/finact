'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "COA",
  autoid: false,

  persistent: {
    'mst_coa': {
      comment: 'Daftar COA akunting',
      primarykeys: ['coa_id'],
      data: {
        coa_id: { text: 'ID', type: dbtype.varchar(17), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
        coa_name: { text: 'COA', type: dbtype.varchar(90), uppercase: true, options: { required: true, invalidMessage: 'Nama COA harus diisi' } },
        coa_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
        coa_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
        coa_dk: { text: 'D/K', type: dbtype.int(1), suppresslist: true, null: false, options: { required: true, invalidMessage: 'D/K harus diisi 1 / -1' }, },
        coagroup_id: {
          text: 'Group', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true,
          options: { required: true, invalidMessage: 'Group COA harus diisi' },
          comp: comp.Combo({
            table: 'mst_coagroup',
            field_value: 'coagroup_id',
            field_display: 'coagroup_name',
            api: 'finact/master/coagroup/list'
          })
        },
        coamodel_id: {
          text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
          options: { required: true, invalidMessage: 'Model COA harus diisi' },
          comp: comp.Combo({
            table: 'mst_coamodel',
            field_value: 'coamodel_id',
            field_display: 'coamodel_name',
            api: 'finact/master/coamodel/list'
          })
        },
        coatype_id: {
          text: 'Type', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
          options: { required: true, invalidMessage: 'Tipe COA harus diisi' },
          comp: comp.Combo({
            table: 'mst_coatype',
            field_value: 'coatype_id',
            field_display: 'coatype_name',
            api: 'finact/master/coatype/list'
          })
        }
      },
      defaultsearch: ['coa_id', 'coa_name'],
      uniques: {
        'coa_name': ['coa_name']
      }
    }
  },

  schema: {
    header: 'mst_coa',
    detils: {
    }
  }
}