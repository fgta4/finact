'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Closing Item Stock",
	autoid: true,

	persistent: {
		'mst_itemstockunitclose': {
			comment: 'Daftar Periode Bulanan',
			primarykeys: ['itemstockunitclose_id'],
			data: {
				itemstockunitclose_id: { text: 'ID', type: dbtype.varchar(15), null: false, options: { disabled: true } },

				periodemo_id: {
					text: 'Periode', type: dbtype.varchar(6), null: false, 
					reference: {table: 'mst_merchitemvar', field_value: 'merchitemvar_id'},
					options: {disabled: true},
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: false, 
					reference: {table: 'mst_unit', field_value: 'unit_id'},
					options: {disabled: true},
				},

				itemstockunit_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				itemstockunit_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, null: true, unset:true, lookup:'user', hidden:true, options: { disabled: true } },
				itemstockunit_closedate: { text: 'Close Date', type: dbtype.date, suppresslist: true, null: true, unset:true, hidden:true, options: { disabled: true } }
			},
			uniques: {
				'itemstockunitclose_unitperiode': ['unit_id', 'periodemo_id']
			},
			defaultsearch : ['itemstockunitclose_id', 'periodemo_id', 'unit_id']

		}
	},

	schema: {
		header: 'mst_itemstockunitclose',
		detils: {
		}
	}
}				