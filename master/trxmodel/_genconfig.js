'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Transaction Model",
	autoid: false,

	persistent: {
		'mst_trxmodel': {
			comment: 'Daftar Model Transaksi',
			primarykeys: ['trxmodel_id'],
			data: {
				trxmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				trxmodel_name: { text: 'Trx Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model Transaksi harus diisi' } },
				trxmodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				trxmodel_direction: { text: 'Direction', type: dbtype.varchar(3), suppresslist: false },
				ppn_taxtype_id: { text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				},
				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				},

				trxmodel_isuseqty: { text: 'Use Qty', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				trxmodel_isusedays: { text: 'Use Days', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				trxmodel_isusetask: { text: 'Use Task', type: dbtype.boolean, null: false, default: '0' , suppresslist: true},

				trxmodel_isassetminta: { text: 'Followup Minta Asset', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'300px'} },
				trxmodel_isassetpinjam: { text: 'Followup Pinjam Asset', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'300px'} }
			},

			uniques: {
				'trxmodel_name': ['trxmodel_name']
			},

			defaultsearch: ['trxmodel_id', 'trxmodel_name'],

			values: [
				{trxmodel_id:'PUR', trxmodel_name:'PURCHASE', trxmodel_direction:'OUT', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'1', trxmodel_isusedays:'0', trxmodel_isusetask:'0', _createby:'5effbb0a0f7d1'},
				{trxmodel_id:'REN', trxmodel_name:'RENTAL', trxmodel_direction:'OUT', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'1', trxmodel_isusedays:'1', trxmodel_isusetask:'0', _createby:'5effbb0a0f7d1'},
				{trxmodel_id:'SAL', trxmodel_name:'SALES', trxmodel_direction:'IN', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'1', trxmodel_isusedays:'0', trxmodel_isusetask:'0', _createby:'5effbb0a0f7d1'},
				{trxmodel_id:'SER', trxmodel_name:'SERVICE', trxmodel_direction:'OUT', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'1', trxmodel_isusedays:'0', trxmodel_isusetask:'0', _createby:'5effbb0a0f7d1'},
				{trxmodel_id:'TAL', trxmodel_name:'TALENT', trxmodel_direction:'OUT', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'0', trxmodel_isusedays:'1', trxmodel_isusetask:'1', _createby:'5effbb0a0f7d1'},
				{trxmodel_id:'USE', trxmodel_name:'USE', trxmodel_direction:'USE', ppn_taxtype_id:'PPN', pph_taxtype_id:null , trxmodel_isuseqty:'1', trxmodel_isusedays:'1', trxmodel_isusetask:'1', _createby:'5effbb0a0f7d1'},
			]
		},

	},

	schema: {
		header: 'mst_trxmodel',
		detils: {
		}
	}


}