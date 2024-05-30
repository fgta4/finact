'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tagihan Keluar",
	autoid: true,
	idprefix: 'AR',
	printing: true,
	icon: "icon-billout-white.svg",
	backcolor: "#7d7aa9",
	committer: true,
	doc_id: 'BILLOUT',
	jsonOverwrite: true,
	commitOverwrite: false,
	uncommitOverwrite: false,
	approvalOverwrite: false,
	xprintOverwrite: false,
	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		Tagihan Keluar
	`,


	variance: {
		"view" : {title:"Billout (View)"},
		"entry" : {
			title:"Billout (Entry)", 
			data: {}
		},
		"post" : {
			title:"Billout (Post)",
			data: {}
		},
		"unpost" : {
			title:"Billout (UnPost)",
			data: {}
		}
	},

	persistent: {
		'trn_billout': {
			comment: 'Daftar Tagihan Keluar',
			primarykeys: ['billout_id'],
			data: {
				billout_id: { 
					text: 'ID', type: dbtype.varchar(30), null: false, 
					options: { required: true, invalidMessage: 'ID harus diisi' } 
				},

				billtype_id: {
					text:'Type', type: dbtype.varchar(3), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Type Bill', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_billtype', 
						field_value: 'billtype_id', field_display: 'billtype_name', 
						api: 'finact/master/billtype/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				billout_ref: { 
					text: 'Ref', type: dbtype.varchar(255)
				},

				billout_descr: { 
					text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } 
				},
				
				billout_date: { 
					text: 'Date', type: dbtype.date, null: false, suppresslist: true
				},
				billout_datedue: { 
					text: 'Due Date', type: dbtype.date, null: false
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				billout_isunreferenced: {
					text:'Unreferenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'}
				},


				orderin_id: { 
					text: 'Order in', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					// options: { required: true, invalidMessage: 'Orderin harus diisi' }, 
					comp: comp.Combo({
						table: 'trn_orderin', 
						field_value: 'orderin_id', field_display: 'orderin_descr', field_display_name: 'orderin_descr', 
						api: 'finact/sales/orderin/list-selector',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				orderinterm_id: { 
					text: 'Term', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					// options: { required: true, invalidMessage: 'Term Orderin harus diisi' }, 
					comp: comp.Combo({
						table: 'trn_orderinterm', 
						field_value: 'orderinterm_id', field_display: 'orderinterm_descr', field_display_name: 'orderinterm_descr', 
						api: 'finact/sales/orderin/terms',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},


				billout_isdp: {
					text:'Is Down Payment Bill', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth:'300px'}
				},


				partner_id: {
					text:'Customer', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false					
					})
				},	

				billout_value: { 
					text: 'Bill Value', type: dbtype.decimal(16,2), null: false, default:0, options: { disabled: true} 
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'
					
					})
				},
				billout_frgrate: { 
					text: 'Foreign Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } 
				},
				billout_valueidr: { 
					text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},

				billout_ppnidr: { 
					text: 'PPN IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},

				billout_dppidr: { 
					text: 'DPP IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},


				/* Dept pembuat invoice */
				owner_dept_id: {
					text: 'Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					initialvalue: {id: 'BILLOUT', text: 'BILLOUT'},
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},				

				billout_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				billout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				billout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				billout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				billout_ispost: {text:'Posted', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				billout_postby: {text:'Posted By', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				billout_postdate: {text:'Posted Date', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			},
			
			defaultsearch: ['billout_id', 'billout_descr']
		},


		'trn_billoutdetil' : {
			comment: 'Bill out Detil',
			primarykeys: ['billoutdetil_id'],		
			data: {
				billoutdetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				billoutrowtype_id: { text: 'Row Type', type: dbtype.varchar(3), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Row Type' }, 
					comp: comp.Combo({
						table: 'mst_billoutrowtype', 
						field_value: 'billoutrowtype_id', field_display: 'billoutrowtype_name', field_display_name: 'billoutrowtype_name', 
						api: 'finact/fin/billoutrowtype/list'})				
				
				},	

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:true,  suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})					
				},


				billoutdetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				billoutdetil_value: { 
					text: 'Bill Value', type: dbtype.decimal(16,2), null: false, default:0, options: { disabled: true} 
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'
					
					})
				},
				billoutdetil_frgrate: { 
					text: 'Foreign Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } 
				},
				billoutdetil_valueidr: { 
					text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},

				billoutdetil_ppnidr: { 
					text: 'PPN IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},

				billoutdetil_dppidr: { 
					text: 'DPP IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } 
				},

				coa_id: {
					text: 'Item COA', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt:'NONE', disabled: true },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/coa/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},			
				
				billout_id: { text: 'Bill ID', type: dbtype.varchar(30), null: false, hidden: true },

			}
		}
		
	},

	schema: {
		title: 'Bill Out',
		header: 'trn_billout',
		detils: {
			'detil': {
				title: 'Detil', table: 'trn_billoutdetil', form: true, headerview: 'billout_descr', 
				editorHandler: true, listHandler: true
			},

			'preview' : {
				title: 'Preview', table: 'trn_billoutdetil', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			},
		},

		xtions: {
			post: {
				buttonname: 'btn_post',
				buttontext: 'Post',
			},
			unpost: {
				buttonname: 'btn_unpost',
				buttontext: 'UnPost',
			},

		}

	}


}

