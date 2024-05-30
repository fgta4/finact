'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order Addtional Cost",
	autoid: false,

	persistent: {
    	'mst_orderinaddcost': {
			comment: 'Additional Cost for Orderin',
			primarykeys: ['orderinaddcost_id'],
			data: {

				orderinaddcost_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				orderinaddcost_name: { text: 'Addtional Cost Name', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Sales Order harus diisi' } },
				orderinaddcost_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },

				orderinaddcost_ispercent: { text: 'Using Percentage', type: dbtype.boolean, null: false, default: '0' },
				orderinaddcost_percent: { text: 'Percent', type: dbtype.decimal(3, 0), null:false, default:0},
				orderinaddcost_fixvalue: { text: 'FixValue', type: dbtype.decimal(12,0), null:false, default:0},

				addcost_coa_id: { 
					text: 'COA', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'COA Cost' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'arunbill_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},



			},
			uniques: {
				'orderinaddcost_name': ['orderinaddcost_name']
			},
			defaultsearch: ['orderinaddcost_id', 'orderinaddcost_name']
		

    	},


	},

	schema: {
		header: 'mst_orderinaddcost',
		detils: {
		}
	}
}