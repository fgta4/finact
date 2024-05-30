'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jurnal Source",
	autoid: false,

	persistent: {
		'mst_jurnalsource': {
			comment: 'Daftar Sumber Jurnal',
			primarykeys: ['jurnalsource_id'],
			data: {
				jurnalsource_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				jurnalsource_name: { text: 'Type Jurnal', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Jurnal harus diisi' } },
				jurnalsource_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				jurnalsource_isallowmanual: { caption:'Setting', text: 'Allow Manual Input', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'150px'} },
			},
			defaultsearch: ['jurnalsource_id', 'jurnalsource_name'],
			uniques: {
				'jurnalsource_name': ['jurnalsource_name']
			}
		},

		'mst_jurnalsourcetype' : {
			comment: 'Tipe2 jurnal yang diperbolehkan dari source',
			primarykeys: ['jurnalsourcetype_id'],
			data: {
				jurnalsourcetype_id: { text: 'ID', type: dbtype.varchar(14) },
				jurnaltype_id: {
					text:'Type', type: dbtype.varchar(10), null:false,
					options:{required:true,invalidMessage:'Jurnal Type harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_jurnaltype', 
						field_value: 'jurnaltype_id', field_display: 'jurnaltype_name', 
						api: 'finact/master/jurnaltype/list'})
				},	
				jurnalsource_id: { text: 'Source', type: dbtype.varchar(10) },
			},
			uniques: {
				'jurnalsourcetype_pair': ['jurnalsource_id', 'jurnaltype_id']
			}
		}
	},

	schema: {
		title: "Jurnal Source",
		header: 'mst_jurnalsource',
		detils: {
			'jurnaltype': {
				title: 'Jurnal Type', table: 'mst_jurnalsourcetype', form: true, headerview: 'jurnalsource_name', 
				editorHandler: true,
				listHandler: true
			}
		}
	}
}