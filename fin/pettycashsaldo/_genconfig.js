'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Saldo Awal Pettycash",
	autoid: true,

	persistent: {
		'trn_pettycashsaldo' : {
			comment: 'Daftar Saldo Pettycash',
			primarykeys: ['pettycashsaldo_id'],
			data: {
				pettycashsaldo_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				pettycashsaldo_date: { text: 'Date', type: dbtype.date, null: false, options: { disabled: true } },
				site_id: {
					text:'Site', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Site Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})
				},	
				pettycashsaldo_awal: { text: 'Saldo Awal', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				pettycashsaldo_mutasi: { text: 'Mutasi', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				pettycashsaldo_akhir: { text: 'Saldo Akhir', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				pettycashsaldo_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
			}

		}

	},

	schema: {
		title: 'Saldo Awal Pettycash',
		header: 'trn_pettycashsaldo',
		detils: {}
	}
}