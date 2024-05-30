'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order Model",
	autoid: false,

	persistent: {
	
		'mst_ordermodel': {
			comment: 'Model Order',
			primarykeys: ['ordermodel_id'],
			data: {
				ordermodel_id: { text: 'ID', type: dbtype.varchar(5), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				ordermodel_name: { text: 'Model', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Direction harus diisi' } },
				ordermodel_descr: { text: 'Descr', type: dbtype.varchar(255), null: true },

				orderdir_id: { 
					text: 'Direction', type: dbtype.varchar(1), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Direction harus diisi', disabled: true }, 
					comp: comp.Combo({
						table: 'mst_orderdir',
						field_value: 'orderdir_id', field_display: 'orderdir_name',
						api: 'finact/master/orderdir/list'
					})				
				},
			},

			uniques: {
				'ordermodel_name': ['ordermodel_name']
			},
		 	defaultsearch: ['ordermodel_id', 'ordermodel_name'],
		 
			values: [
				{ordermodel_id:'I01', ordermodel_name:'TFI Sales Order (auto)', orderdir_id:'I'},
				{ordermodel_id:'O01', ordermodel_name:'PO to principal', orderdir_id:'O'},
		 	]
		}	
	},

	schema: {
		header: 'mst_ordermodel',
		detils: {
		}
	}
}