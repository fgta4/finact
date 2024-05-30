'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Model",
	autoid: false,

	persistent: {
		'mst_coamodel': {
		comment: 'Daftar model COA',
		primarykeys: ['coamodel_id'],
			data: {
				coamodel_id: { text: 'ID', type: dbtype.varchar(10),  null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coamodel_name: { text: 'Model COA', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Model coa harus diisi' } },
				coamodel_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				coamodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				coareport_id: {
					text: 'Report', type: dbtype.varchar(2), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Report harus diisi' },
					comp: comp.Combo({
						table: 'mst_coareport',
						field_value: 'coareport_id',
						field_display: 'coareport_name',
						api: 'finact/master/coareport/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				coareportcol_id: {
					text: 'Column', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Kolom report harus diisi' },
					comp: comp.Combo({
						table: 'mst_coareportcol',
						field_value: 'coareportcol_id',
						field_display: 'coareportcol_name',
						api: 'finact/master/coareport/column-list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},	
				coareport_col: { text: 'Column Code', type: dbtype.varchar(1), suppresslist: true, options: {disabled: true} },
				coa_dk: { 
					text: 'D/K', type: dbtype.varchar(1), suppresslist: true, null: false, 
					tips: 'Saldo Normal (D: Debet, K: Kredit) ',
					tipstype: 'visble',	
					options: { required: true, invalidMessage: 'D/K harus diisi 1 / -1' }, 
				},
				coa_mp: { 
					text: 'Faktor Pengali', type: dbtype.int(1), suppresslist: true, null: false, 
					options: { required: true, invalidMessage: 'Faktor Pengali harus diisi 1 / -1' }, 
				},

				agingmodel_id: {
					text: 'Aging Model', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: false },
					comp: comp.Combo({
						table: 'mst_agingmodel',
						field_value: 'agingmodel_id',
						field_display: 'agingmodel_name',
						api: 'finact/master/agingmodel/list'
					})
				},		
				coamodel_ispartnermandatory: { text: 'Partner Mandatory', type: dbtype.boolean, null: false, default: '0', options:{labelWidth:'150px'} },
			},
			uniques: {
				'coamodel_name': ['coamodel_name']
			},
			defaultsearch: ['coamodel_id', 'coamodel_name'],

			/*
			values: [
				{coamodel_id:'KB', coamodel_name:'KAS & BANK', coareport_id: 'NR'},
				{coamodel_id:'SB', coamodel_name:'SURAT BERHARGA', coareport_id: 'NR'},
				{coamodel_id:'AR', coamodel_name:'PIUTANG', coareport_id: 'NR', coamodel_isaging:'1'},
				{coamodel_id:'PS', coamodel_name:'PERSEDIAAN', coareport_id: 'NR'},
				{coamodel_id:'PL', coamodel_name:'PERLENGKAPAN', coareport_id: 'NR'},
				{coamodel_id:'UM', coamodel_name:'UAMG MUKA', coareport_id: 'NR', coamodel_isaging:'1'},
				{coamodel_id:'HT', coamodel_name:'HARTA TETAP', coareport_id: 'NR'},
				{coamodel_id:'HB', coamodel_name:'HARTA TAK BERWUJUD', coareport_id: 'NR'},
				{coamodel_id:'AP', coamodel_name:'KEWAJIBAN', coareport_id: 'NR', coamodel_isaging:'1'},
				{coamodel_id:'MD', coamodel_name:'MODAL', coareport_id: 'NR'},
				{coamodel_id:'PD', coamodel_name:'PENDAPATAN', coareport_id: 'LR'},
				{coamodel_id:'BN', coamodel_name:'BEBAN', coareport_id: 'LR'},
				{coamodel_id:'CL', coamodel_name:'CLEARING', coareport_id: 'CR'},
			]
			*/
		}
	},

	schema: {
		header: 'mst_coamodel',
		detils: {
		}
	}
}