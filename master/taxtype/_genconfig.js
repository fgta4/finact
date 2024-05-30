'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tax Type",
	autoid: false,

	persistent: {
		'mst_taxtype': {
			comment: 'Daftar Tipe Tax',
			primarykeys: ['taxtype_id'],
			data: {
				taxtype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				taxtype_name: { text: 'Tax Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Tax item harus diisi' } },
				taxtype_include: {text:'Include', type: dbtype.boolean, null:false, default:'0'},
				taxtype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				taxtype_value: { text: 'Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { required: true, invalidMessage: 'Value harus diisi' } },
				taxmodel_id: {
					text: 'Tax Model', type: dbtype.varchar(10), null: false,
					options: { required: true, invalidMessage: 'Model Tax harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_taxmodel',
						field_value: 'taxmodel_id', field_display: 'taxmodel_name',
						api: 'finact/master/taxmodel/list'
					})
				},

				billin_coa_id: {
					text:'Account IN', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'Account Tax IN harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'billin_coa_name', 
						api: 'finact/master/coa/list'})
				},

				billout_coa_id: {
					text:'Account OUT', type: dbtype.varchar(20), null:true,  suppresslist: true,
					options: {required:true, invalidMessage:'Account Tax OUT harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'billout_coa_name', 
						api: 'finact/master/coa/list'})
				},

			},

			uniques: {
				'taxtype_name': ['taxtype_name']
			},
			defaultsearch: ['taxtype_id', 'taxtype_name'],

			values: [
				{taxtype_id:'NOTAX', taxtype_name:'NO TAX', taxtype_value: 0, taxmodel_id:'NOTAX'},
				{taxtype_id:'PPN',  taxtype_descr:'pembelian barang', taxtype_name:'PPN', taxtype_value: 10, taxmodel_id:'PPN' },
				{taxtype_id:'PPH2315', taxtype_name:'PPh 23 - 15%', taxtype_descr:'dividen & hadiah', taxtype_value: 15, taxmodel_id:'PPH'},
				{taxtype_id:'PPH2302', taxtype_name:'PPh 23 - 2%', taxtype_descr:'sewa & jasa', taxtype_value: 2, taxmodel_id:'PPH'},
				{taxtype_id:'PB10', taxtype_name:'PB10', taxtype_descr:'Pajak Daerah 10%', taxtype_value: 2, taxmodel_id:'PEMDA'},

			]
		},

	},

	schema: {
		header: 'mst_taxtype',
		detils: {
		}
	}


}