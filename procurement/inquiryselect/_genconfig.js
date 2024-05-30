'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Inquiry Select",
	autoid: false,

	persistent: {
		'mst_inquiryselect': {
			comment: 'Daftar Cara Pemilihan Item Inquiry',
			primarykeys: ['inquiryselect_id'],
			data: {
				inquiryselect_id: { text: 'ID', type: dbtype.varchar(1), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				inquiryselect_name: { text: 'Select Method', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Select Method harus diisi' } },
				inquiryselect_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				inquiryselect_isshowitemasset: { text: 'Show Itemasset', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
				inquiryselect_isshowitem: { text: 'Show Item', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
				inquiryselect_isshowitemstock: { text: 'Show Itemstock', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
				inquiryselect_isshowpartner: { text: 'Show Partner', type: dbtype.boolean, null: false, default: '0', suppresslist:true,  options:{ labelWidth:'300px'} },
				inquiryselect_isshowitemclass: { text: 'Show Itemclass', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
				inquiryselect_isitemclassdisabled: { text: 'Itemclass Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{ labelWidth:'300px'} },
			},

			uniques: {
				'inquiryselect_name': ['inquiryselect_name']
			},
			defaultsearch: ['inquiryselect_id', 'inquiryselect_name'],

			values: [

				{inquiryselect_id:'A', inquiryselect_name:'ASSET SELECTION', inquiryselect_isshowitemasset:'1', inquiryselect_isshowitem:'0', inquiryselect_isshowitemstock:'0', inquiryselect_isshowpartner:'0',  inquiryselect_isshowitemclass:'1', inquiryselect_isitemclassdisabled:'1'},
				{inquiryselect_id:'C', inquiryselect_name:'CLASS SELECTION', inquiryselect_isshowitemasset:'0', inquiryselect_isshowitem:'0', inquiryselect_isshowitemstock:'0', inquiryselect_isshowpartner:'0',  inquiryselect_isshowitemclass:'1', inquiryselect_isitemclassdisabled:'0'},
				{inquiryselect_id:'I', inquiryselect_name:'ITEM SELECTION', inquiryselect_isshowitemasset:'0', inquiryselect_isshowitem:'1', inquiryselect_isshowitemstock:'0', inquiryselect_isshowpartner:'0',  inquiryselect_isshowitemclass:'1', inquiryselect_isitemclassdisabled:'1'},
				{inquiryselect_id:'P', inquiryselect_name:'PARTNER SELECTION', inquiryselect_isshowitemasset:'0', inquiryselect_isshowitem:'0', inquiryselect_isshowitemstock:'0', inquiryselect_isshowpartner:'1',  inquiryselect_isshowitemclass:'1', inquiryselect_isitemclassdisabled:'1'},
				{inquiryselect_id:'S', inquiryselect_name:'STOCK SELECTION', inquiryselect_isshowitemasset:'0', inquiryselect_isshowitem:'0', inquiryselect_isshowitemstock:'1', inquiryselect_isshowpartner:'0',  inquiryselect_isshowitemclass:'1', inquiryselect_isitemclassdisabled:'1'},

			]
		},

	},

	schema: {
		header: 'mst_inquiryselect',
		detils: {
		}
	}


}