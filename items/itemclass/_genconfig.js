'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Class",
	autoid: true,
	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		klasifikasi barang
	`,

	persistent: {
		'mst_itemclass': {
			comment: 'Daftar Klasifikasi Item',
			primarykeys: ['itemclass_id'],
			data: {
				itemclass_id: { text: 'ID', type: dbtype.varchar(14), null: false},
				
				itemmodel_id: { 
					text: 'Model', type: dbtype.varchar(10), uppercase: true, null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi' } ,
					comp: comp.Combo({
						title: 'Pilih Model Item',
						table: 'mst_itemmodel', 
						field_value: 'itemmodel_id', field_display: 'itemmodel_name', field_display_name: 'itemmodel_name', 
						api: 'finact/items/itemmodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},					
				
			
				itemmanage_id: {
					text:'Manage As', type: dbtype.varchar(2), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'Order Doc harus diisi' },
					comp: comp.Combo({
						title: 'Pilih Item Manage',
						table: 'mst_itemmanage', 
						tips: 'Perlakuan item yang diterima pada saat order diselesaikan.',
						tipstype: 'visible',
						field_value: 'itemmanage_id', field_display: 'itemmanage_name',  field_display_name: 'itemmanage_name',
						api: 'finact/items/itemmanage/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},

				itemclass_name: { text: 'Item Class Name', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Klasifikasi item harus diisi' } },


				itemclass_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemclass_isadvproces: { text: 'Process as Advance', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },
				itemclass_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },



				itemclassgroup_id: {
					text:'Class Group', type: dbtype.varchar(17), null:true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						title: 'Pilih Group Class',
						table: 'mst_itemclassgroup', 
						field_value: 'itemclassgroup_id', field_display: 'itemclassgroup_name', field_display_name: 'itemclassgroup_name', 
						api: 'finact/items/itemclassgroup/list'
					})					
				},

				owner_unit_id: {
					text: 'Default Unit', type: dbtype.varchar(10), null:true,  suppresslist: true,
					options:{prompt:'NONE'},
					tips: 'apabila dikosongkan, saat transaksi, unit akan diisi sesuai data unit pada transaksi',
					tipstype: 'visible',
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', field_display_name: 'owner_unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false							
					})				
				},

				owner_dept_id: {
					text: 'Default Owner Dept', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options:{prompt:'NONE'},
					tips: 'apabila dikosongkan, saat transaksi, dept akan diisi sesuai data dept pada transaksi',
					tipstype: 'visible',
					comp: comp.Combo({
						title: 'Pilih Owner Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true					
					})				
				},



				maintainer_dept_id: {
					text: 'Maintainer', type: dbtype.varchar(30), null:true,  suppresslist: true,
					tips: 'Maintainer Dept yang akan manage distribusi tipe item ini',
					tipstype: 'visible',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Maintainer Dept',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'maintainer_dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false							
					})				
				},

				
				unitmeasurement_id: { 
					text: 'Unit of Measurement', 
					type: dbtype.varchar(10),  null: false, suppresslist: true,
					options: {required:true, invalidMessage:'Unit Measurement harus diisi' },
					comp: comp.Combo({
						title: 'Pilih Maasurement',
						table: 'mst_unitmeasurement', 
						field_value: 'unitmeasurement_id', field_display: 'unitmeasurement_name', 
						api: 'ent/general/unitmeasurement/list'
					})
				},				





				itemclass_minassetvalue: { 
					class: 'assetpanel assetpanel-hide',	
					text: 'If Value More Than', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true 
				},

				inquiry_accbudget_id: {
					text: 'Inquiry Budget', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						title: 'Pilih Budget untuk Inquiry',
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'inquiry_accbudget_name', 
						api: 'finact/master/accbudget/list'
					})
				},

				nr_coa_id: {
					text: 'Account BS', type: dbtype.varchar(17), null: true, suppresslist: true,
					tips: 'Ivnentory / Persediaan, Asset',
					tipstype: 'visible',
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						title: 'Pilih COA Neraca',
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'settl_coa_name', 
						api: 'finact/master/coa/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},

				lr_coa_id: {
					text: 'Account IS', type: dbtype.varchar(17), null: true, suppresslist: true,
					tips: 'Account Cost / Amortisasi / Depresiasi (asset)',
					tipstype: 'visible',
					options: { prompt:'NONE' },
					comp: comp.Combo({
						title: 'Pilih COA Laba Rugi',
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},			
				
				depremodel_id: { 
					class: 'assetpanel assetpanel-hide',	
					text: 'Depresiasi', 
					type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_depremodel', 
						field_value: 'depremodel_id', field_display: 'depremodel_name', field_display_name: 'depremodel_name', 
						api: 'finact/master/depremodel/list'
					})				
				},	

				itemclass_depreage: { 
					class: 'assetpanel assetpanel-hide',	
					text: 'Depre Age', type: dbtype.int(2), null:false, default:5, suppresslist: true 
				},
				itemclass_depreresidu: { 
					class: 'assetpanel assetpanel-hide',	
					text: 'Depre Residu', type: dbtype.decimal(11,2), null:false, default:1, suppresslist: true 
				},

				itemclass_isallowoverqty: { caption:'Budget Restriction', text: 'Allow over qty from Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				itemclass_isallowoverdays: { text: 'Allow over days from Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				itemclass_isallowovertask: { text: 'Allow over task from Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				itemclass_isallowovervalue: { text: 'Allow over value from Budgett', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				itemclass_isallowunbudget: { text: 'Allow Request UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},




				itemclass_isindependentsetting: { 
					section: section.Begin('Item Settings'),
					caption:'Current Setting', text: 'Independent', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{labelWidth:'300px'} 
				},
				itemmodel_isintangible: { 
					text: 'Intangiable', type: dbtype.boolean, null: false, default:0, suppresslist: true, options: {disabled:true, labelWidth:'300px'} },
				itemmodel_issellable: { text: 'Sellable', type: dbtype.boolean, null: false, default:0, suppresslist: true, options: {disabled:true, labelWidth:'300px'} },
				itemmodel_isnonitem: { text: 'Non Item', type: dbtype.boolean, null: false, default:0, suppresslist: true, options: {disabled:true, labelWidth:'300px'} },
				itemmodel_ishasmainteinerdept: { text: 'Has Maintainer Dept', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				itemmanage_isasset: { text: 'Manage As Asset ', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled: true, labelWidth:'300px'}},
				depremodel_isautocalc: { 
					text: 'Auto Calculate Depre', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled: true, labelWidth:'300px'}
				},

				itemmanage_isbyassetowner: {
					caption:'Dept Filter', text:'By Asset Owner', type: dbtype.boolean, null:false, default:'0',  suppresslist: true, options:{labelWidth:'300px', disabled: true}},
				itemmanage_isbystockowner: {text:'By Stock Owner', type: dbtype.boolean, null:false, default:'0',  suppresslist: true, options:{labelWidth:'300px', disabled: true}},
				itemmanage_isbynonitemowner: {text:'By Non Item Owner', type: dbtype.boolean, null:false, default:'0', suppresslist: true,  options:{labelWidth:'300px', disabled: true}},
				itemmanage_isbypartnerselect: {
					section: section.End(),
					text:'By Partner Selector', type: dbtype.boolean, null:false, default:'0',  suppresslist: true, options:{labelWidth:'300px', disabled: true}},
				

			},

			uniques: {
				'itemclass_name': ['itemclass_name']
			},

			defaultsearch: ['itemclass_id', 'itemclass_name']
		},


		
		'mst_itemclassaccbudget' : {
			comment: 'Account yang direlasikan ke itemclass ini',
			primarykeys: ['itemclassaccbudget_id'],
			data: {
				itemclassaccbudget_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				
				projectmodel_id: {
					text: 'Project Model', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'ID harus diisi' , prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_projectmodel', field_value: 'projectmodel_id', field_display: 'projectmodel_name', 
						api: 'finact/master/projectmodel/list'
					})
				},

				inquiry_accbudget_id: {
					text:'Inquiry Budget Account', type: dbtype.varchar(20), null:false,
					options:{required:true,invalidMessage:'Account Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'inquiry_accbudget_name', 
						api: 'finact/master/accbudget/list'
					})
				},

				nr_coa_id: {
					text: 'Account BS', type: dbtype.varchar(17), null: true, suppresslist: true,
					tips: 'Ivnentory / Persediaan, Asset',
					tipstype: 'visible',
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						title: 'Pilih COA Neraca',
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'settl_coa_name', 
						api: 'finact/master/coa/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},

				lr_coa_id: {
					text: 'Account IS', type: dbtype.varchar(17), null: true, suppresslist: true,
					tips: 'Account Cost / Amortisasi / Depresiasi (asset)',
					tipstype: 'visible',
					options: { prompt:'NONE' },
					comp: comp.Combo({
						title: 'Pilih COA Laba Rugi',
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},			
		
				itemclass_id: {text:'Item', type: dbtype.varchar(14), null:false},	
			},

			// uniques: {
			// 	'itemclassaccbudget_pair': ['itemclass_id', 'projecttype_id']
			// },

		},


		'mst_itemclassfiles' : {
			primarykeys: ['itemclassfiles_id'],
			comment: 'Daftar FIle Inquiry',
			data: {
				itemclassfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				itemclassfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				itemclassfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				itemclassfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				itemclass_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},		
			},
			defaultsearch: ['itemclassfiles_descr']
		},


	},

	schema: {
		header: 'mst_itemclass',
		detils: {
			'account': {
				title: 'Account Ovveride by Project Type', table: 'mst_itemclassaccbudget', form: true, headerview: 'itemclass_name', 
				editorHandler: true,
				listHandler: true
			},
			'files': {
				title: 'Files', table: 'mst_itemclassfiles', form: true, headerview: 'itemclass_name', 
				editorHandler: true,
				listHandler: true
			},
		}
	}


}