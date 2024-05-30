'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "COA Type",
  autoid: false,

  persistent: {
    'mst_coatype': {
		comment: 'Daftar tipe-tipe COA',
		primarykeys: ['coatype_id'],
		data: {
			coatype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			coatype_name: { text: 'Type COA', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe coa harus diisi' } },
			coatype_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
			coatype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			coatype_order: { text: 'Order', type: dbtype.int(1), null:false, default:0},
			coareport_id: {
				text: 'Report', type: dbtype.varchar(2), null: false, uppercase: true, suppresslist: true,
				options: { required: true, invalidMessage: 'Report harus diisi' },
				comp: comp.Combo({
					table: 'mst_coareport',
					field_value: 'coareport_id',
					field_display: 'coareport_name',
					api: 'finact/master/coareport/list'
				})
			},			
		},
		uniques: {
       		'coatype_name': ['coatype_name']
      	},
    	defaultsearch: ['coatype_id', 'coatype_name']
    }
  },

  schema: {
    header: 'mst_coatype',
    detils: {
    }
  }
}