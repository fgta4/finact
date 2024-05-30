'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project Type",
	icon : "icon-projecttype-white.svg",  
	autoid: false,

	persistent: {
		'mst_projecttype': {
			comment: 'Daftar Project Type',
			primarykeys: ['projecttype_id'],
			data: {
				projecttype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				projecttype_name: { text: 'Type Project', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Project harus diisi' } },
				projecttype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			},
			defaultsearch: ['projecttype_id', 'projecttype_name'],
			uniques: {
				'projecttype_name': ['projecttype_name']
			},
			values: [
				{projecttype_id:'CAP', projecttype_name: 'CAPITAL EXPENSE'},
				{projecttype_id:'EVT', projecttype_name: 'EVENT'},
				{projecttype_id:'PRO', projecttype_name: 'PRODUCTION'},
				{projecttype_id:'SVC', projecttype_name: 'SERVICE'},
			]
		}

	},

	schema: {
		header: 'mst_projecttype',
		detils: {
		}
	}
}