'use strict'

const dbtype = global.dbtype;
const comp = global.comp;
const section = global.section;

module.exports = {
	title: "AsetMove Type",
	autoid: true,

	persistent: {
		'mst_itemassetmovetype': {
			comment: 'Daftar Tipe Asset Move',
			primarykeys: ['itemassetmovetype_id'],
			data: {
				itemassetmovetype_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemassetmovetype_name: { text: 'Asset Move Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Asset Move harus diisi' } },
				itemassetmovetype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },

				itemassetmovemodel_id: { 
					text: 'Asset Move Model', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Asset Move harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemassetmovemodel', 
						field_value: 'itemassetmovemodel_id', field_display: 'itemassetmovemodel_name', field_display_name: 'itemassetmovemodel_name', 
						api: 'finact/items/itemassetmovemodel/list'})				
				
				},

				trxmodel_id: { 
					text: 'Transaction', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},

				itemassetmovetype_isdateinterval: { caption:'Range', text: 'Date Interval', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },

				itemassetmovetype_isdept: { caption:'Mandatory', text: 'Dept', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovetype_isemployee: { text: 'Employee', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovetype_issite: { text: 'Site', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovetype_isroom: { text: 'Room', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
			},

			uniques: {
				'itemassetmovetype_name': ['itemassetmovetype_name']
			},
			
			defaultsearch: ['itemassetmovetype_id', 'itemassetmovetype_name']

		},

	},

	schema: {
		header: 'mst_itemassetmovetype',
		detils: {
		}
	}


}