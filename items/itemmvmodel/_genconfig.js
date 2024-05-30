'use strict'

const dbtype = global.dbtype;
const comp = global.comp;
const section = global.section;

module.exports = {
	title: "Item Move Model",
	autoid: false,

	persistent: {
		'mst_itemmvmodel': {
			comment: 'Daftar Model Moving Item',
			primarykeys: ['itemmvmodel_id'],
			data: {
				itemmvmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemmvmodel_name: { text: 'Move Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Asset Move harus diisi' } },
				itemmvmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				itemmvmodel_factor: { text: 'Factor', type: dbtype.int(1), default:1, suppresslist: true, null: false, options: { required: true, invalidMessage: 'D/K harus diisi 1 / -1' }, },

				itemmvmodel_issitemove: { caption:'', text: 'Move between Site', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemmvmodel_isunitmeasurementchange: { caption:'', text: 'Unit Measurement Changed', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },

			},

			uniques: {
				'itemmvmodel_name': ['itemmvmodel_name']
			},
			
			defaultsearch: ['itemmvmodel_id', 'itemmvmodel_name'],

			values: [
				{itemmvmodel_id:'RV', itemmvmodel_name:'RV'},
				{itemmvmodel_id:'TR', itemmvmodel_name:'TR', itemmvmodel_issitemove:1}
			]

		},
	},

	schema: {
		title: 'Item Move Model',
		header: 'mst_itemmvmodel',
		detils: {
		}
	}


}