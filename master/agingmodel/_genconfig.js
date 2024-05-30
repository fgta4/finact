'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Aging Model",
	autoid: false,

	persistent: {
		'mst_agingmodel': {
			comment: 'Daftar Model Aging',
			primarykeys: ['agingmodel_id'],
			data: {
				agingmodel_id: { text: 'ID', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				agingmodel_name: { text: 'Aging Model', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Nama Model Aging harus diisi' } },
				agingmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
			},
			uniques: {
				'agingmodel_name': ['agingmodel_name']
			},
			defaultsearch: ['agingmodel_id', 'agingmodel_name'],
			values: [
				{agingmodel_id:'AP', agingmodel_name:'PAYABLE'},
				{agingmodel_id:'AR', agingmodel_name:'RECEIVABLE'}
			]
		}
	},

	schema: {
		header: 'mst_agingmodel',
		detils: {
		}
	}
}