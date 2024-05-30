'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Rekening Bank",
  autoid: false,

  persistent: {
    'mst_bankrekening': {
      comment: 'Daftar Rekening Bank',
      primarykeys: ['bankrekening_id'],
      data: {
        bankrekening_id: { text: 'ID', type: dbtype.varchar(20), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
        bankrekening_name: { text: 'Nama Rekening', type: dbtype.varchar(90), uppercase: true, null: false, options: { required: true, invalidMessage: 'Nama Rekening harus diisi' } },
        bankrekening_code: { text: 'Kode Rekening', type: dbtype.varchar(30), null: false, options: {required: true, invalidMessage: 'Kode Rekening harus diisi' } },
        bankrekening_namabuku: { text: 'Nama di buku', type: dbtype.varchar(30),  uppercase: true, null: false, suppresslist: true, options: {required: true, invalidMessage: 'Kode Rekening harus diisi' } },
        bankrekening_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, suppresslist: true, default: '0' },
        bankrekening_opendate: { text: 'Tanggal Pembukaan', type: dbtype.date, null: false, suppresslist: true, options: {required: true, invalidMessage: 'Tanggal buka rekening harus diisi' } },
        bankrekening_closedate: { text: 'Tanggal Tutup', type: dbtype.date, suppresslist: true },
        bankrekening_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
        bank_id: {
          text: 'Bank', type: dbtype.varchar(14), suppresslist: true,
          options: { required: true,  invalidMessage: 'Bank harus diisi' },
          comp: comp.Combo({
            table: 'mst_bank',
            field_value: 'bank_id',
            field_display: 'bank_name',
            api: 'ent/general/bank/list'
          })
        },
        coa_id: {
          text: 'COA', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true,
          options: { required: true, invalidMessage: 'COA harus diisi' },
          comp: comp.Combo({
            table: 'mst_coa',
            field_value: 'coa_id',
            field_display: 'coa_name',
            api: 'finact/master/coa/list'
          })
        }
      },
      defaultsearch: ['bankrekening_id', 'bankrekening_name', 'bankrekening_code', 'coa_id'],
      uniques: {
        'bankrekening_name': ['bankrekening_name'],
        'bankrekening_code': ['bankrekening_code']
      }
    }
  },

  schema: {
    header: 'mst_bankrekening',
    detils: {
    }
  }
}