'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tax Model",
	autoid: false,

	persistent: {
		'mst_taxmodel': {
			comment: 'Daftar Model Tax',
			primarykeys: ['taxmodel_id'],
			data: {
				taxmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				taxmodel_name: { text: 'Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model Pajak harus diisi' } },
				taxtmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			},

			uniques: {
				'taxmodel_name': ['taxmodel_name']
			},
			defaultsearch: ['taxmodel_id', 'taxmodel_name'],

			values: [
				{taxmodel_id:'NOTAX', taxmodel_name:'NO TAX'},
				{taxmodel_id:'PPN',  taxmodel_name:'Pajak Pertambahan Nilai'},
				{taxmodel_id:'PPH', taxmodel_name:'Pajak Penghasilan'},
				{taxmodel_id:'PEMDA', taxmodel_name:'Dispenda'}
			]
		},

	},

	schema: {
		header: 'mst_taxmodel',
		detils: {
		}
	}


}