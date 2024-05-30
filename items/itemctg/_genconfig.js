'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Category",
	autoid: false,

	persistent: {
		
		'mst_itemctg' : {
			primarykeys: ['itemctg_id'],
			comment: 'Daftar Categori Item',
			data: {
				itemctg_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				itemctg_name: {text:'Category Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Categori harus diisi'}},
				itemctg_group: {text:'Group Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				itemmodel_id: { 
					text: 'Model', type: dbtype.varchar(10), uppercase: true, null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemmodel', 
						field_value: 'itemmodel_id', field_display: 'itemmodel_name', field_display_name: 'itemmodel_name', 
						api: 'finact/items/itemmodel/list'})
				
				},	
			},
			defaultsearch : ['itemctg_id', 'itemctg_name', 'itemctg_group'],
			uniques: {
				'itemctg_name' : ['itemctg_name']
			}
		}

	},


	schema: {
		title: 'Item Category',
		header: 'mst_itemctg',
		detils: {
		}
	}

	
}
