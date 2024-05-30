'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Ownership Type",
	autoid: false,

	persistent: {
		'mst_ownershiptype': {
			comment: 'Daftar Tipe Request',
			primarykeys: ['ownershiptype_id'],
			data: {
				ownershiptype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				ownershiptype_name: { text: 'Ownership Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Request item harus diisi' } },
				ownershiptype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				trxmodel_id: { 
					text: 'Transaction', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				}
			},

			uniques: {
				'ownershiptype_name': ['ownershiptype_name']
			},
			
			defaultsearch: ['ownershiptype_id', 'ownershiptype_name'],

			values: [
				{ownershiptype_id:'REN', ownershiptype_name:'RENTAL', trxmodel_id:'REN'},
				{ownershiptype_id:'OWN', ownershiptype_name:'OWN', trxmodel_id:'PUR'}
			]
		},

	},

	schema: {
		header: 'mst_ownershiptype',
		detils: {
		}
	}


}