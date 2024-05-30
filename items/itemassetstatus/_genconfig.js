'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "ItemAsset Status",
	autoid: false,

	persistent: {
		'mst_itemassetstatus': {
			comment: 'Daftar Status Item Asset',
			primarykeys: ['itemassetstatus_id'],
			data: {
				itemassetstatus_id: { text: 'ID', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemassetstatus_name: { text: 'Asset Status', type: dbtype.varchar(60), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Status Asset harus diisi' } },
				itemasset_isbroken: { text: 'Broken', type: dbtype.boolean, null: false, default: '0' },
				itemasset_islost: { text: 'Lost', type: dbtype.boolean, null: false, default: '0' },
			},

			uniques: {
				'itemassetstatus_name': ['itemassetstatus_name']
			},
			defaultsearch: ['itemassetstatus_id', 'itemassetstatus_name'],

			values: [
				{itemassetstatus_id:'OK', itemassetstatus_name:'OK'},
				{itemassetstatus_id:'PU', itemassetstatus_name:'PARTIALLY BROKEN - USABLE', itemasset_isbroken:1},
				{itemassetstatus_id:'PN', itemassetstatus_name:'PARTIALLY BROKEN - NEED REPAIR', itemasset_isbroken:1},
				{itemassetstatus_id:'BR', itemassetstatus_name:'TOTAL BROKEN',itemasset_isbroken:1},
				{itemassetstatus_id:'LO', itemassetstatus_name:'LOST',itemasset_islost:1},
			]
		},

	},

	schema: {
		header: 'mst_itemassetstatus',
		detils: {
		}
	}


}