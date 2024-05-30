'use strict'

const dbtype = global.dbtype;
const comp = global.comp;
const section = global.section;

module.exports = {
	title: "AsetMove Model",
	autoid: false,

	persistent: {
		'mst_itemassetmovemodel': {
			comment: 'Daftar Model Asset Move',
			primarykeys: ['itemassetmovemodel_id'],
			data: {
				itemassetmovemodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemassetmovemodel_name: { text: 'Asset Move Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Asset Move harus diisi' } },
				itemassetmovemodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },

				inquirymodel_id: { 
					text: 'Model Inquiry', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Inquiry harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_inquirymodel', 
						field_value: 'inquirymodel_id', field_display: 'inquirymodel_name', field_display_name: 'inquirymodel_name', 
						api: 'finact/procurement/inquirymodel/list'})				
				
				},

				trxmodel_id: { 
					text: 'Transaction', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},

				itemassetmovemodel_isdateinterval: { caption:'Range', text: 'Date Interval', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovemodel_isdept: { caption:'Mandatory', text: 'Dept', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovemodel_isemployee: { text: 'Employee', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovemodel_issite: { text: 'Site', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
				itemassetmovemodel_isroom: { text: 'Room', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px' } },
			},

			uniques: {
				'itemassetmovemodel_name': ['itemassetmovemodel_name']
			},
			
			defaultsearch: ['itemassetmovemodel_id', 'itemassetmovemodel_name'],

			values: [
				{itemassetmovemodel_id:'M', itemassetmovemodel_name:'MUTASI', inquirymodel_id:'M', trxmodel_id:'USE', itemassetmovemodel_isdateinterval:'0', itemassetmovemodel_isdept:'1', itemassetmovemodel_isemployee:'1', itemassetmovemodel_issite:'1', itemassetmovemodel_isroom:'1'},
				{itemassetmovemodel_id:'P', itemassetmovemodel_name:'PEMINJAMAN', inquirymodel_id:'B', trxmodel_id:'USE', itemassetmovemodel_isdateinterval:'1', itemassetmovemodel_isdept:'1', itemassetmovemodel_isemployee:'1', itemassetmovemodel_issite:'1', itemassetmovemodel_isroom:'1'}
			]

		},

	},

	schema: {
		header: 'mst_itemassetmovemodel',
		detils: {
		}
	}


}