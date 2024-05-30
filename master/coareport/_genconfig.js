'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Report",
	autoid: false,

	persistent: {
		'mst_coareport': {
			comment: 'Daftar Report COA',
			primarykeys: ['coareport_id'],
			data: {
				coareport_id: { text: 'ID', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coareport_name: { text: 'Nama Report', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Nama Report harus diisi' } },
				coareport_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
			},
			uniques: {
				'coareport_name': ['coareport_name']
			},
			defaultsearch: ['coareport_id', 'coareport_name'],
			/*
			values: [
				{coareport_id:'NR', coareport_name:'NERACA'},
				{coareport_id:'LR', coareport_name:'LABARUGI'},
				{coareport_id:'OF', coareport_name:'MANUAL'},
			]
			*/
		},

		'mst_coareportcol' : {
			comment: 'Kolom Report COA',
			primarykeys: ['coareportcol_id'],
			data: {
				coareportcol_id: { text: 'ID', type: dbtype.varchar(14) },
				coareportcol_name: { text: 'Nama Report', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Nama Kolom harus diisi' } },
				coareport_col: { text: 'Column Code', type: dbtype.varchar(1), suppresslist: true },
				coa_dk: { text: 'D/K', type: dbtype.int(1), suppresslist: true, null: false, options: { required: true, invalidMessage: 'D/K harus diisi 1 / -1' }, },
				coareport_id: { text: 'Report', type: dbtype.varchar(2) },
			},
			uniques: {
				'coareport_col': ['coareport_id', 'coareport_col'],
			},
		}
	},

	schema: {
		header: 'mst_coareport',
		detils: {
			'column': { 
				title: 'Columns', table: 'mst_coareportcol', form: true, headerview: 'coareport_name' ,
				// editorHandler: true,
				// listHandler: true
			}
		}
	}
}