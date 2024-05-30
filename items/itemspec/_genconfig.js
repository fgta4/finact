'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Model Spec",
	autoid: false,

	persistent: {
		'mst_itemspec': {
			comment: 'Daftar Spesifikasi Item',
			primarykeys: ['itemspec_id'],
			data: {
				itemspec_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemspec_name: { text: 'Spesifikasi', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama spesifikasi harus diisi' } },
				itemspec_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				itemspec_isnumber: { text: 'Number', type: dbtype.boolean, null: false, default:0, suppresslist: true },
			},

			uniques: {
				'itemspec_name': ['itemspec_name']
			},
			defaultsearch: ['itemspec_id', 'itemspec_name'],

			values: [
				{itemspec_id:'RAM', itemspec_name:'RAM (Gb)', itemspec_isnumber:1},
				{itemspec_id:'PROC', itemspec_name:'PROCESSOR'},
				{itemspec_id:'CAMF', itemspec_name:'CAM-FRONT'},
				{itemspec_id:'CAMR', itemspec_name:'CAM-REAR'},
				{itemspec_id:'BAT', itemspec_name:'BATTERY'},
			]
		},

	},

	schema: {
		header: 'mst_itemspec',
		detils: {
		}
	}


}