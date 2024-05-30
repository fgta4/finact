'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In Type",
	autoid: false,

	persistent: {
    	'mst_orderintype': {
			comment: 'Daftar tipe-tipe Sales Order',
			primarykeys: ['orderintype_id'],
			data: {

				orderintype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				orderintype_name: { text: 'Order Type Name', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Sales Order harus diisi' } },
				orderintype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list-selector',
						staticfilter: `
							criteria.trxmodel_direction='IN' 
						`
					})				
				},

				orderintype_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true },


				ppn_taxtype_id: { text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list-selector',
						staticfilter: `
							criteria.taxmodel_id='PPN' 
						`,
						OnSelectedScript: `
				if (record.taxtype_id=='--NULL--') {
					form.setValue(obj.txt_ppn_taxvalue, 0)
					form.setValue(obj.chk_ppn_include, 0)
				} else {
					form.setValue(obj.txt_ppn_taxvalue, record.taxtype_value)
					form.setValue(obj.chk_ppn_include, record.taxtype_include)
				}
						
						`			
					})				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}},


				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list-selector',
						staticfilter: `
							criteria.taxmodel_id='PPH' 
						`,
						OnSelectedScript: `
				if (record.taxtype_id=='--NULL--') {		
					form.setValue(obj.txt_pph_taxvalue, 0)
				} else {
					form.setValue(obj.txt_pph_taxvalue, record.taxtype_value)
				}
						`
					})				
				},
				pph_taxvalue: { text: 'PPH Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
	

				// AR -> Berdasar tipe pembayaran
				// Sales Disc
				// Biaya Administrasi  -> Berdasarkan data cara pembayaran via EDC, online, etc
				// Sales
				// Biaya Subsidi PPN
				// PPN Payable
				// PPH Prepaid
				// Expedisi
				// Expedisi Accru


				arunbill_coa_id: { 
					text: 'COA AR Unbill', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'arunbill_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
				ar_coa_id: { 
					text: 'COA AR', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'AR harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ar_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},
				ar_coa_isbypartnertype: {text:'Override by Partner Type', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { labelWidth: '300px'   }},


				dp_coa_id: { 
					text: 'COA Downpayment', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn COA Downpayment harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'dp_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},

				sales_coa_id: { 
					text: 'COA Sales', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppnsubsidi_coa_id: { 
					text: 'COA Subsidi PPN', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: 'Apabila PPN include COA ini perlu diisi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppnsubsidi_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				pph_coa_id: { 
					text: 'COA PPH Prepaid', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},				



			},
			uniques: {
				'orderintype_name': ['orderintype_name']
			},
			defaultsearch: ['orderintype_id', 'orderintype_name']
		

    	},

		'mst_orderintyperef' : {
			comment: 'Kode referensi Tipe Orderin untuk keperluan interfacing dengan system lain',
			primarykeys: ['orderintyperef_id'],		
			data: {
				orderintyperef_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				orderintyperef_code: {text:'Code', type: dbtype.varchar(30), null:false},			
				orderintype_id: {text:'Partner', type: dbtype.varchar(10), null:false, uppercase: true},
			},
			uniques: {
				'orderintyperef_pair': ['orderintype_id', 'interface_id', 'orderintyperef_code'],
				'orderintyperef_code': ['interface_id', 'orderintyperef_code'],
			},			
		}

	},

	schema: {
		header: 'mst_orderintype',
		detils: {
			'ref' : {title: 'Referensi', table:'mst_orderintyperef', form: true, headerview:'orderintype_name'},
		}
	}
}