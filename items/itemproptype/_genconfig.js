'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Properties Type",
	autoid: false,

	persistent: {
		'mst_itemproptype' : {
			primarykeys: ['itemproptype_id'],
			comment: 'Properties Type, utnuk Item, Item Stock dan Item Asset',
			data: {
				itemproptype_id: {text:'ID', type: dbtype.varchar(20), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				itemproptype_name: {text:'Nama', type: dbtype.varchar(30), null:false, uppercase: false, options:{required:true,invalidMessage:'Nama Tipe Properti harus diisi'}},
				itemproptype_group: {text:'Group', type: dbtype.varchar(20), null:false, uppercase: false, suppresslist: true},
				itemproptype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				itemproptype_order: { text: 'Order', type: dbtype.int(7), default:0, suppresslist: true },
				itemproptype_isitem: { caption:'Available at', text: 'Item', type: dbtype.boolean, null: false, default: '0' , suppresslist: true},
				itemproptype_isitemstock: { text: 'Item Stock', type: dbtype.boolean, null: false, default: '0' , suppresslist: true },
				itemproptype_isitemasset: { text: 'Item Asset', type: dbtype.boolean, null: false, default: '0' , suppresslist: true },
				itemproptype_ispropitemdisabled: {caption:'Editor', text: 'Disabled in Item', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: {labelWidth: '300px'}},
				itemproptype_ispropitemstockdisabled: { text: 'Disabled in Stock', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: {labelWidth: '300px'}},
				itemproptype_ispropitemassetdisabled: { text: 'Disabled in Asset', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: {labelWidth: '300px'}},
			},

			defaultsearch : ['itemproptype_id', 'itemproptype_name'],

			uniques: {
				'itemproptype_name' : ['itemproptype_name']
			}			
		}
	},

	schema: {
		title: 'Properties Type',
		header: 'mst_itemproptype',
		detils: {}
	}
	
}

