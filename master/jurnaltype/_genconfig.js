'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jurnal Type",
	autoid: false,

	persistent: {
		'mst_jurnaltype': {
			comment: 'Daftar Tipe-tipe Jurnal',
			primarykeys: ['jurnaltype_id'],
			data: {
				jurnaltype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				jurnalmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Jurnal harus diisi' },
					comp: comp.Combo({
						table: 'mst_jurnalmodel',
						field_value: 'jurnalmodel_id',
						field_display: 'jurnalmodel_name',
						api: 'finact/master/jurnalmodel/list'
					})
				},
				jurnaltype_name: { text: 'Type Jurnal', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Jurnal harus diisi' } },
				jurnaltype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				jurnaltype_prefix: { text: 'Prefix', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'Prefix Jurnal harus diisi' } },
				jurnaltype_col: { 
					text: 'Column', type: dbtype.varchar(1), null: false, default:`'D'`, suppresslist: true, options: {},
					tips: 'jiki diisi D atau K, saat jurnal disimpan akan otomatis membuat satu baris di jurnal detil sesuai dengan sub account header.<br>Kosongkan apabila tidak memerlukan fungsi ini.',
					tipstype: 'visible'
				},
				jurnaltype_isdisabled: { caption:'Status',text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				jurnaltype_ishasduedate: { caption:'Setting', text: 'Due Date', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				jurnaltype_ishasheadvalue: {  text: 'Header Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasheadaccount: {  text: 'Header Account', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasheadunit: {  text: 'Header Unit', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasheaddept: {  text: 'Header Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasheadpartner: {  text: 'Header Partner', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasdetunit: {  text: 'Detil Unit', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasdetdept: {  text: 'Detil Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				jurnaltype_ishasdetpartner: {  text: 'Detil Partner', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },


				//jurnaltype_ishasheadaccount: {  text: 'Header Account', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },
				//jurnaltype_ispartnermandatory: {  text: 'Partner Mandatory', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{labelWidth:'150px'} },

			},
			defaultsearch: ['jurnaltype_id', 'jurnaltype_name', 'jurnalmodel_id'],
			uniques: {
				'jurnaltype_name': ['jurnaltype_name']
			}
		},
						
		'mst_jurnaltypecoa': {
			comment: 'Daftar COA yang dipunyai oleh suatu tipe jurnal',
			primarykeys: ['jurnaltypecoa_id'],
			data: {
				jurnaltypecoa_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: false, uppercase: true,
					options: { required: true, invalidMessage: 'COA harus diisi' },
					comp: comp.Combo({
							table: 'mst_coa',
							field_value: 'coa_id',
							field_display: 'coa_name',
							api: 'finact/master/coa/list',
							onDataLoadingHandler: false,
							onDataLoadedHandler: false,
							onSelectingHandler: false,
							onSelectedHandler: true
						})
				},
				jurnaltypecoa_isdebet: { text: 'Debet', type: dbtype.boolean, null: false, default: '0' },
				jurnaltypecoa_iskredit: { text: 'Kredit', type: dbtype.boolean, null: false, default: '0' },
				jurnaltype_id: { text: 'Type Jurnal', type: dbtype.varchar(10), null: false, options: { disabled: true } },
			},

			defaultsearch: ['jurnaltypecoa_id', 'coa_id'],

		}	
	},

	schema: {
		title: "Jurnal Type",
		header: 'mst_jurnaltype',
		detils: {
			'coa': { 
				title: 'Chart of Accounts', table: 'mst_jurnaltypecoa', form: true, headerview: 'jurnaltype_name' ,
				editorHandler: true,
				listHandler: true
			}
		}
	}
}