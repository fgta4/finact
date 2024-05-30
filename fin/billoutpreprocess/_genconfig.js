'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Billout Pre Process",
	autoid: false,

	persistent: {
		'mst_billoutpreprocess' : {
			primarykeys: ['billoutpreprocess_id'],
			comment: 'Daftar pre processs billout',
			data: {
				billoutpreprocess_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				billoutpreprocess_name: {text:'Process Type', type: dbtype.varchar(60), null:false, uppercase: true},
				billoutpreprocess_descr: {text:'Descr', type: dbtype.varchar(90), null:false, suppresslist: true},
			},
			
			defaultsearch: ['billoutpreprocess_id', 'billoutpreprocess_name'],
			uniques: {
				'billoutpreprocess_name' : ['billoutpreprocess_name']
			},
			values: [
				{billoutpreprocess_id:'BL', billoutpreprocess_name:'Create Bill', billoutpreprocess_descr:'Generate bill dari data terkait'},
				{billoutpreprocess_id:'CN', billoutpreprocess_name:'Buat Credit Note', billoutpreprocess_descr:''},
				{billoutpreprocess_id:'SK', billoutpreprocess_name:'Skip', billoutpreprocess_descr:'Skip generate'}
			]		

		},
	},

	schema: {
		title: 'Billout Pre Process',
		header: 'mst_billoutpreprocess',
		detils: {}
	}
}

