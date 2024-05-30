'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Upload Tagihan Keluar",
	autoid: true,

	persistent: {
		'trn_billout': {
			comment: 'Daftar Tagihan Keluar',
			primarykeys: ['billout_id'],
			data: {
				billout_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				billout_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				billout_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
			},
			
			defaultsearch: ['billout_id', 'billout_descr']
		}
	},
	
	
	schema: {
		header: 'trn_billout',
		detils: {
		}
	}
	
	

}		