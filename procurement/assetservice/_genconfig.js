'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Asset Service",
  autoid: false,

  persistent: {
    'trn_assetservice': {
		comment: 'Asset Service',
		primarykeys: ['assetservice_id'],
		data: {
			assetservice_id: { text: 'ID', type: dbtype.varchar(14), null: false },
			itemasset_id: { 
				text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, 
				options: { prompt: 'NONE', disabled:true }, 
				comp: comp.Combo({
					table: 'mst_itemasset',
					field_value: 'itemasset_id', field_display: 'itemasset_name',
					api: 'local: list-get-itemasset'
				})				
			},
			
			itemclass_id: { 
				text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
				options: { required: true, invalidMessage: 'Itemclass harus diisi', disabled:true }, 
				comp: comp.Combo({
					table: 'mst_itemclass',
					field_value: 'itemclass_id', field_display: 'itemclass_name',
					api: 'local: list-get-itemclass'
				})				
			},
			assetservice_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
			assetservice_date: {text:'Service Date', type: dbtype.date, null:false},
			assetservice_dateest: {text:'Completion Est Date ', type: dbtype.date, null:false},
			assetservice_datecompletion: {text:'Actual Completion Date ', type: dbtype.date, null:false},

			partner_id: {
				text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
				options: { prompt: 'NONE' ,disabled:true } ,
				comp: comp.Combo({
					table: 'mst_partner', 
					field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
					api: 'local: list-get-partner'
				})
			},

			coa_id: {
				text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
				options: { prompt: 'NONE', disabled:true } ,
				comp: comp.Combo({
					table: 'mst_coa',
					field_value: 'coa_id', field_display: 'coa_name',
					api: 'finact/master/coa/list'
				})
			},

			orderout_id: {
				text: 'Order', type: dbtype.varchar(30), null: true, suppresslist: true,
				options: { prompt: 'NONE', disabled:true},
				comp: comp.Combo({
					table: 'trn_orderout',
					field_value: 'orderout_id', field_display: 'orderout_descr', field_display_name: 'orderout_descr',
					api: 'finact/procurement/orderout/list'
				})
			},

			assetservice_isrecv: {text:'Received', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
			assetservice_recvby: {text:'ReceivedBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
			assetservice_recvdate: {text:'ReceivedDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
			recv_id: { text: 'Recv', type: dbtype.varchar(30), null: false, options: {disabled:true} },			
		},
		defaultsearch: ['billtype_id', 'billtype_name'],

    }
  },

  schema: {
    header: 'trn_assetservice',
    detils: {
    }
  }
}