'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "OrderIn Payment Term Type",
	autoid: false,

	persistent: {
    	'mst_orderintermtype': {
			comment: 'OrderIn Payment Term Type',
			primarykeys: ['orderintermtype_id'],
			data: {

				orderintermtype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				orderintermtype_name: { text: 'Name', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Nama term harus diisi' } },
				orderintermtype_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				orderintermtype_isdp: {text:'Down Payment', type: dbtype.boolean, null:false, default:'0', suppresslist: true},
			},
			uniques: {
				'orderintermtype_name': ['orderintermtype_name']
			},
			defaultsearch: ['orderintermtype_id', 'orderintermtype_name'],
			values: [
				{orderintermtype_id:'DP', orderintermtype_name:'DOWN PAYMENT', orderintermtype_isdp:1},
				{orderintermtype_id:'LS', orderintermtype_name:'PELUNASAN', orderintermtype_isdp:0},
			]
		

    	},


	},

	schema: {
		header: 'mst_orderintermtype',
		detils: {
		}
	}
}