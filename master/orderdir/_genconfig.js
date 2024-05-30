'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order Direction",
	autoid: false,

	persistent: {
	
		'mst_orderdir': {
			comment: 'Arah Order PO->orderout, SO->orderin',
			primarykeys: ['orderdir_id'],
			data: {
				orderdir_id: { text: 'ID', type: dbtype.varchar(1), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				orderdir_name: { text: 'Direction', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Direction harus diisi' } },
				orderdir_descr: { text: 'Descr', type: dbtype.varchar(255), null: true },
			},

			uniques: {
				'orderdir_name': ['orderdir_name']
			},
		 	defaultsearch: ['orderdir_id', 'orderdir_name'],
		 
			values: [
				{orderdir_id:'I', orderdir_name:'IN (Sales Order)', orderdir_descr:''},
				{orderdir_id:'O', orderdir_name:'OUT (Purchase Order)', orderdir_descr:''},
		 	]
		}	
	},

  schema: {
    header: 'mst_orderdir',
    detils: {
    }
  }
}