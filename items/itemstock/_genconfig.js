'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Stock",
	autoid: true,

	persistent: {
		'mst_itemstock': {
			comment: 'Daftar Item Stock',
			primarykeys: ['itemstock_id'],
			data: {
				
				itemstock_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				itemgroup_id: {
					text:'Group', type: dbtype.varchar(15), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_itemgroup', 
						field_value: 'itemgroup_id', field_display: 'itemgroup_name', field_display_name: 'itemgroup_name', 
						api: 'finact/items/itemgroup/list'})					
				},

				itemstock_code: { text: 'Uniq Code', type: dbtype.varchar(150), null: false, options: { required: true, invalidMessage: 'Code Uniq (bydept) harus diisi' } },
				itemstock_name: { text: 'Nama Item', type: dbtype.varchar(150), null: false, options: { required: true, invalidMessage: 'Nama item harus diisi' } },
				itemstock_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(150), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Nama item harus diisi' } },
				itemstock_descr: { text: 'Descr', type: dbtype.varchar(2500), suppresslist: true },
				itemstock_couchdbid: {text:'CouchDb.Id', type: dbtype.varchar(255), null:true, suppresslist: true}, // id di couchdb
				itemstock_picture: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				unitmeasurement_id: { 
					text: 'Unit of Measurement', 
					type: dbtype.varchar(10),  null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_unitmeasurement', 
						field_value: 'unitmeasurement_id', field_display: 'unitmeasurement_name', 
						api: 'ent/general/unitmeasurement/list'})
				},	

		

				dept_id: {
					text: 'Owner Dept', type: dbtype.varchar(30), null:false, suppresslist: false,
					tips: 'Owner Dept yang akan manage item ini',
					autobylogin: 'dept',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},	

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},


				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null:false,  suppresslist: true,
					options:{required:true,invalidMessage:'Unit harus diisi', prompt:'-- PILIH --'},
					// tips: 'Maintainer Dept yang akan manage distribusi tipe item ini',
					// tipstype: 'visible',
					//options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', field_display_name: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false							
					})				
				},

				itemstock_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemstock_ishascompound: { text: 'Has Compound', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'300px'} },
				itemstock_issellable: { text: 'Sellable', type: dbtype.boolean, null: false, default:0, suppresslist: true },


				itemstock_priceori: {
					section: section.Begin('Basic Pricing & Values'),
					text:'Original Price', type: dbtype.decimal(16,0), null:false, default: 0, suppresslist: true, unset:true, options: { disabled: true }},
				itemstock_priceadj: { text: 'Adjustment', type: dbtype.decimal(16,0), suppresslist: true, unset:true, options: { disabled: true }},
				itemstock_priceadjdate: { text: 'Adjustment Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } },
				itemstock_grossprice: { text: 'Gross Price', type: dbtype.decimal(16,0), suppresslist: true },
				itemstock_isdiscvalue: {text: 'Discount Using Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				itemstock_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, suppresslist: true},
				itemstock_discval: {text:'Disc Value', type: dbtype.decimal(16,0),  null:false, default: 0, suppresslist: true},
				itemstock_sellprice: { text: 'Sell Price', type: dbtype.decimal(16,0), suppresslist: true },
				itemstock_estcost: { 
					section: section.End(),
					text: 'Estimated Cost', type: dbtype.decimal(12,0), suppresslist: true },


				itemstock_weight: {
					section: section.Begin('Weight & Dimension'),
					text:'Weight (Kg)', type: dbtype.decimal(8,2), null:false, default: 0, suppresslist: true},
				itemstock_length : {text: 'Length (cm)', type: dbtype.decimal(8,2), null:false, default: 0, suppresslist: true},
				itemstock_width : {text: 'Width (cm)', type: dbtype.decimal(8,2), null:false, default: 0, suppresslist: true},
				itemstock_height : {
					section: section.End(),
					text: 'Height (cm)', type: dbtype.decimal(8,2), null:false, default: 0, suppresslist: true },

				itemstock_lastqty: { 
					section: section.Begin('Inventory'),
					text: 'LastQty', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastvalue: { text: 'LastValue', type: dbtype.decimal(16,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastqtyupdate: { text: 'Last Qty UpDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } },
				itemstock_isupdating: {  text: 'Updating', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: { disabled: true }},
				itemstock_updatebatch: { 
					section: section.End(),
					text: 'Last Batch Update', type: dbtype.varchar(30), null: true, suppresslist: true, options: { disabled: true } },


				itemstock_lastrecvid: { 
					section: section.Begin('Last Receiving', 'defbottomborder'),
					text: 'Last Recv Id', type: dbtype.varchar(90), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastrecvdate: { text: 'Last Recv Date', type: dbtype.date, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } },
				itemstock_lastrecvqty: { text: 'Last Recv Qty', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastcost: { text: 'Last Cost', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastcostdate: { 
					section: section.End(),
					text: 'Last Cost Date', type: dbtype.date, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } },





				/*
				itemctg_id: {
					text:'Category', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_itemctg', 
						field_value: 'itemctg_id', field_display: 'itemctg_name', field_display_name: 'itemctg_name', 
						api: 'finact/items/itemctg/list'})					
				},
				*/



				

				itemstock_ref: { text: 'Ref', type: dbtype.varchar(90), suppresslist: true, options: {disabled: true}, hidden:true },
				itemstock_refname: { text: 'RefName', type: dbtype.varchar(200), suppresslist: true, options: {disabled: true}, hidden:true },
				itemstock_uploadbatchcode: { text: 'UploadBatch', type: dbtype.varchar(32), suppresslist: true, options: {disabled: true}, hidden:true },

			},

			defaultsearch : ['itemstock_id', 'itemstock_code', 'itemstock_name'],
			uniques: {
				'itemstock_code': ['dept_id', 'itemstock_code']
			},

		},



		'mst_itemstockposition' : {
			comment: 'Posisi stok saat ini',
			primarykeys: ['itemstockposition_id'],
			data: {
				itemstockposition_id: { text: 'ID', type: dbtype.varchar(15),  null: false },

				itemstockposition_date: { 
					text: 'Saldo Date', type: dbtype.datetime, comp: comp.Textbox(),
					unset:true,  
					options: { disabled: true }, 
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true,
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unit', field_value: 'unit_id'}
				},

				site_id: {
					text: 'Site', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_site', field_value: 'site_id'}
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true,  suppresslist: true,
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_dept', field_value: 'dept_id'}
				},

				brand_id: {
					text: 'Brand', type: dbtype.varchar(14), null: true,  suppresslist: true,
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_brand', field_value: 'brand_id'}
				},

				unitmeasurement_id: {
					text: 'Unit Measurement', type: dbtype.varchar(10), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unitmeasurement', field_value: 'unitmeasurement_id'}
				},

				itemstocksaldo_qty: {text:'Qty', type: dbtype.decimal(14,2), null:false, default: 0, options: { disabled: true }},
				itemstocksaldo_value: {text:'Value', type: dbtype.decimal(16,2), null:false, default: 0, options: { disabled: true }},

				itemstockposition_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: { disabled: true }},
				itemstockposition_updatebatch: { 
					text: 'Last Batch Update', type: dbtype.varchar(30), null: true, suppresslist: true, options: { disabled: true } },


				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false },
			},

			uniques: {
				'itemstockposition_location': ['itemstock_id', 'unit_id', 'brand_id', 'site_id', 'dept_id', 'unitmeasurement_id']
			},
		},


		'mst_itemstockcompound' : {
			comment: 'Stock Setting',
			primarykeys: ['itemstockcompound_id'],
			data: {	
				itemstockcompound_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				itemstock_compound: { 
					text: 'Item', type: dbtype.varchar(14), null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_compound_name',
						api: 'local: list'
					})				
				},
				itemstockcompound_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0 },
				unitmeasurement_id: { 
					text: 'Unit of Measurement', 
					type: dbtype.varchar(10),  null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_unitmeasurement', 
						field_value: 'unitmeasurement_id', field_display: 'unitmeasurement_name', 
						api: 'ent/general/unitmeasurement/list'})
				},

				itemstock_ismode1: { text: 'Mode 1', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode2: { text: 'Mode 2', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode3: { text: 'Mode 3', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode4: { text: 'Mode 4', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode5: { text: 'Mode 5', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode6: { text: 'Mode 6', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				itemstock_ismode7: { text: 'Mode 7', type: dbtype.boolean, null: false, default: '0', suppresslist: true },


				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), null: false, hidden: true },

			}
		},


		'mst_itemstockconversion' : {
			comment: 'Stock Setting',
			primarykeys: ['itemstockconversion_id'],
			data: {	
				itemstockconversion_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				itemstockconversion_order: { text: 'Order', type: dbtype.int(4), default:0, suppresslist: true },

				unitmeasurement_id: { 
					text: 'Unit of Measurement', 
					type: dbtype.varchar(10),  null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_unitmeasurement', 
						field_value: 'unitmeasurement_id', field_display: 'unitmeasurement_name', 
						api: 'ent/general/unitmeasurement/list'})
				},

				itemstock_conversion: { 
					text: 'Convert To', type: dbtype.varchar(14), null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_conversion_name',
						api: 'local: list'
					})				
				},	

				itemstockconversion_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0 },

				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), null: false, hidden: true },
			}
		},



		'mst_itemstockprop' : {
			primarykeys: ['itemstockprop_id'],
			comment: 'Daftar Properties Item',
			data: {
				itemstockprop_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},	
				itemproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), null: false, 
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemproptype',
						field_value: 'itemproptype_id', field_display: 'itemproptype_name',
						api: 'finact/items/itemproptype/list'
					})
				},
				itemstockprop_keys: {text:'ID', type: dbtype.varchar(90), null:false},	
				itemstockprop_value: {text:'Value', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), null: false, hidden: true },
			},
			uniques: {
				itemstockprop_keys: ['itemstock_id', 'itemproptype_id', 'itemstockprop_keys']
			}
		},

		'mst_itemstockbarcode' : {
			primarykeys: ['itemstockbarcode_id'],
			comment: 'Daftar barcode itemstock',
			data: {
				itemstockbarcode_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				itemstockbarcode_text: {text:'Barcode', type: dbtype.varchar(26), null:true},
				brand_id: {
					text:'Brand', type: dbtype.varchar(10), null:true, suppresslist: true,
					reference: {table: 'mst_brand', field_value: 'brand_id'},
					options: {disabled: true},
					unset: true
				},
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false, hidden: true },
			},
			uniques: {itemstockbarcode_brand: ['brand_id', 'itemstockbarcode_text']}
		},


		'mst_itemstockpic' : {
			primarykeys: ['itemstockpic_id'],
			comment: 'Daftar Picture Category Merch Item',
			data: {
				itemstockpic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				itemstockpic_couchdbid: {text:'CouchDb.Id', type: dbtype.varchar(255), null:true}, // id di couchdb
				itemstockpic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				itemstockpic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				itemstockpic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				itemstockpic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false, hidden: true },	
			},
			uniques: {}
		},


		
		/*
		'mst_itemstocksetting' : {
			comment: 'Stock Setting',
			primarykeys: ['itemstocksetting_id'],
			data: {
				itemstocksetting_id: { text: 'ID', type: dbtype.varchar(14),  null: false },
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:true, 
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				itemstock_minqty: { text: 'Min Qty', type: dbtype.decimal(14, 0) },
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false, hidden: true },
			}			
		},
		*/


		'trn_itemstockmoving' : {
			comment: 'Moving Stock',
			primarykeys: ['itemstockmoving_id'],
			data: {
				itemstockmoving_id: { text: 'ID', type: dbtype.varchar(15),  null: false },

				periodemo_id: {
					text: 'Periode', type: dbtype.varchar(6), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_periodemo', field_value: 'periodemo_id'}
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unit', field_value: 'unit_id'}
				},

				itemmvmodel_id: { 
					text: 'Model', type: dbtype.varchar(10),
					unset: true,
					options: {disabled: true},
					reference: {table: 'mst_itemmvmodel', field_value: 'itemmvmodel_id'}
				},
				
				itemstockmoving_date: { 
					text: 'Last Recv Date', type: dbtype.datetime, comp: comp.Textbox(),
					unset:true,  
					options: { disabled: true }, 
				},

				site_id: {
					text: 'Site', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_site', field_value: 'site_id'}
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_dept', field_value: 'dept_id'}
				},

				brand_id: {
					text: 'Brand', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_brand', field_value: 'brand_id'}
				},

				unitmeasurement_id: {
					text: 'Unit Measurement', type: dbtype.varchar(10), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unitmeasurement', field_value: 'unitmeasurement_id'}
				},

				itemstock_id: {
					text: 'ItemStock', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id'}
				},

				itemstockmoving_qty: {text:'Qty', type: dbtype.decimal(16,2), null:false, default: 0},
				itemstockmoving_value: {text:'Value', type: dbtype.decimal(16,2), null:false, default: 0},

				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false },
			}			
		},




		'mst_itemstocksaldo' : {
			comment: 'Saldo akhir stok pada akhir bulan',
			primarykeys: ['itemstocksaldo_id'],
			data: {
				itemstocksaldo_id: { text: 'ID', type: dbtype.varchar(15),  null: false },
				
				periodemo_id: {
					text: 'Periode', type: dbtype.varchar(6), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_periodemo', field_value: 'periodemo_id'}
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unit', field_value: 'unit_id'}
				},


				itemstockunitclose_id : {
					text: 'Closing Id', type: dbtype.varchar(15), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_itemstockunitclose', field_value: 'itemstockunitclose_id'}
				},

				itemstocksaldo_date: { 
					text: 'Saldo Date', type: dbtype.datetime, comp: comp.Textbox(),
					unset:true,  
					options: { disabled: true }, 
				},

				itemstocksaldo_dategen: { 
					text: 'Generate Date', type: dbtype.datetime, comp: comp.Textbox(),
					unset:true,  
					options: { disabled: true }, 
				},



				site_id: {
					text: 'Site', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_site', field_value: 'site_id'}
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_dept', field_value: 'dept_id'}
				},

				brand_id: {
					text: 'Brand', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_brand', field_value: 'brand_id'}
				},

				unitmeasurement_id: {
					text: 'Unit Measurement', type: dbtype.varchar(10), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_unitmeasurement', field_value: 'unitmeasurement_id'}
				},

				itemstock_id: {
					text: 'ItemStock', type: dbtype.varchar(14), null: true, 
					unset:true,  
					options: { disabled: true }, 
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id'}
				},				


				itemstocksaldo_qty: {text:'Qty', type: dbtype.decimal(16,2), null:false, default: 0},
				itemstocksaldo_value: {text:'Value', type: dbtype.decimal(16,2), null:false, default: 0},

				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14),  null: false },
			}	
		},
 	},	

	 

	schema: {
		title: 'Item Stock',
		header: 'mst_itemstock',
		detils: {
			'barcode' : {title: 'Barcode', table: 'mst_itemstockbarcode', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true },
			'prop': {title: 'Properties', table: 'mst_itemstockprop', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true  },
			'position' : {title: 'Stock Position', table: 'mst_itemstockposition', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true},
			'compound' : {title: 'Compound', table: 'mst_itemstockcompound', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true},
			'conversion' : {title: 'Conversion', table: 'mst_itemstockconversion', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true },
			// 'related': {title: 'Related Item', table: 'mst_itemstockrelated', form: true, headerview: 'itemstock_name' ,editorHandler: true,listHandler: true},
			'picture': {title: 'Picture', table: 'mst_itemstockpic', form: true, headerview: 'itemstock_name',editorHandler: true,listHandler: true },

			// 'setting' : {title: 'Setting', table: 'mst_itemstocksetting', form: true, headerview: 'itemstock_name' },
			// 'moving' : {title: 'Moving', table: 'trn_itemstockmoving', form: true, headerview: 'itemstock_name' },
			// 'saldo' : {title: 'Saldo', table: 'mst_itemstocksaldo', form: true, headerview: 'itemstock_name' },
		}
	}

}	