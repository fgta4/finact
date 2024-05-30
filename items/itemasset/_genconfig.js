'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Asset",
	autoid: true,
	icon : "icon-asset-white.svg",
	backcolor : "#2c313b",

	persistent: {
		'mst_itemasset': {
			comment: 'Daftar Item Asset',
			primarykeys: ['itemasset_id'],
			data: {

				// Main Data
				itemasset_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemasset_name: { text: 'Asset Name', type: dbtype.varchar(150), null: false, options: { required: true, invalidMessage: 'Nama Klasifikasi item harus diisi' } },
				itemasset_serial: { text: 'Serial', type: dbtype.varchar(30), null: true },
				item_id: {
					text:'Item', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Item harus diisi', prompt:'-- PILIH --' } ,
					comp: comp.Combo({
						table: 'mst_item', 
						field_value: 'item_id', field_display: 'item_name', field_display_name: 'item_name', 
						api: 'finact/items/item/list'})					
				},
				itemassetstatus_id: {
					text:'Status', type: dbtype.varchar(2), null:false, suppresslist: true,
					options: { required: true, invalidMessage: 'Status harus diisi', prompt:'-- PILIH --' } ,
					comp: comp.Combo({
						table: 'mst_itemassetstatus', 
						field_value: 'itemassetstatus_id', field_display: 'itemassetstatus_name', field_display_name: 'itemassetstatus_name', 
						api: 'finact/items/itemassetstatus/list'})					
				},
				itemasset_statusnote: { text: 'Status Note', type: dbtype.varchar(255), suppresslist: true },
				itemasset_ischeckout: { text: 'Checked Out', type: dbtype.boolean, null: false, default: '0', tips:'true: sedang dipakai', suppresslist: true },
				itemasset_ismoveable: { text: 'Movable', type: dbtype.boolean, null: false, default: '0', tips:'true: bisa dipinjam-pinjamkan', suppresslist: true },
				itemasset_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemasset_iswrittenof: { text: 'Writen Off', type: dbtype.boolean, null: false, default: '0', options:{disabled:true} },


				// Brief
				itemasset_descr: { 
					section: section.Begin('Breif'),	
					text: 'Descr', type: dbtype.varchar(255), suppresslist: true 
				},
				itemasset_merk: { text: 'Merk', type: dbtype.varchar(255), suppresslist: true },
				itemasset_type: { text: 'Type', type: dbtype.varchar(255), suppresslist: true },
				itemclass_id: {
					section: section.End(),
					text:'Class', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi', disabled: true } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},


				
				// Asset Base Location
				itemasset_baselocation: { 
					section: section.Begin('Base Location'),	
					text: 'Base Location', type: dbtype.varchar(255), suppresslist: true, tips:'untuk fix asset (tanah, bangunan) diisi alamat',  tipstype: 'visible' 
				},
				site_id: {
					text: 'Site', type: dbtype.varchar(30), null:true, suppresslist: true,
					tips: 'Site dimana item ini dialokasian pada saat diterima / home base asset',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				owner_dept_id: {
					text: 'Owner Dept', type: dbtype.varchar(30), null:true, suppresslist: false,
					tips: 'Dept sebagai owner asset ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name', 
						api: 'ent/organisation/dept/list'})				
				},
				maintainer_dept_id: {
					section: section.End(),
					text: 'Maintainer Dept', type: dbtype.varchar(30), null:true,  suppresslist: false,
					tips: 'Maintainer Dept yang akan manage item ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'maintainer_dept_name', 
						api: 'ent/organisation/dept/list'})				
				},




				// Asset Current Location
				location_dept_id: {
					section: section.Begin('Current Location'),	
					text: 'Loc.Dept', type: dbtype.varchar(30), null:true, suppresslist: true,
					tips: 'Departmen dimana asset saat ini berada',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},
				location_site_id: {
					text: 'Loc.Site', type: dbtype.varchar(30), null:true,  suppresslist: true,
					tips: 'Site dimana asset saat ini berada',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				location_room_id: {
					text: 'Room', type: dbtype.varchar(30), null:true,  suppresslist: true,
					tips: 'Ruangan dimana asset saat ini berada',
					tipstype: 'visible',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_room', 
						field_value: 'room_id', field_display: 'room_name', field_display_name: 'location_room_name', 
						api: 'ent/location/room/list'})				
				},
				location_empl_id: {
					section: section.End(),
					text:'Empl', type: dbtype.varchar(14), null:true, suppresslist: true,
					tips: 'PIC asset saat ini',
					tipstype: 'visible',					
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', field_display_name: 'empl_name', 
						api: 'hrms/master/empl/list'})
				},	



				// Purchase Info
				partner_id: {
					section: section.Begin('Purchase Info'),	
					text:'Vendor', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner harus diisi', prompt: '-- PILIH --' }, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved'})
				},
				itemasset_purchasedate: {text:'Purchase Date', type: dbtype.date, null:false, suppresslist: true, tips:'Tanggal terima asset',  tipstype: 'visible'},
				itemasset_lastsupportdate: {text:'Last Support Date', type: dbtype.date, null:false, suppresslist: true, tips:'Tanggal terakhir support / garansi',  tipstype: 'visible'},
				itemasset_purchasevalue: { text: 'Purchase Value', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, options: { required: true}},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				itemasset_purchasevalue_idr: { 
					section: section.End(),
					text: 'Purchase Value IDR', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, options: { required: true}
				},


				// Asset Info
				asset_coa_id: {
					section: section.Begin('Asset Info'),	
					text:'Account Asset', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'asset_coa_name', 
						api: 'finact/master/coa/list'})
				},
				depremodel_id: { 
					text: 'Depresiasi', 
					type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_depremodel', 
						field_value: 'depremodel_id', field_display: 'depremodel_name', field_display_name: 'depremodel_name', 
						api: 'finact/master/depremodel/list'})				
				},
				cost_coa_id: {
					text:'Account Biaya', type: dbtype.varchar(20), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					tips: 'pos biaya / akumulasi penyusutan pada saat depresiasi/amortisasi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list'})
				},
				itemasset_depreage: { text: 'Depre Age', type: dbtype.int(2), null:false, default:5, suppresslist: true},
				itemasset_depreresidu: { text: 'Depre Residu', type: dbtype.decimal(11,2), null:false, default:1, suppresslist: true },
				itemasset_currentvalue_idr: { text: 'NBV', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true, options: { required: true}},
				itemasset_currentvalue_date: {text:'NBV Date', type: dbtype.date, null:false, default:'NOW()', suppresslist: true},
				itemasset_usevaluerate: { text: 'Use Value Rate', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},
				itemasset_writeoffby: { text: 'WriteOfff By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				itemasset_writeoffdate: { text: 'WriteOff Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				itemasset_writeoffref: { 
					section: section.End(),
					text: 'WriteOff Ref', type: dbtype.varchar(30), suppresslist: true, unset:true, options: { disabled: true }, hidden: true 
				},

			},

			uniques: {
				'itemasset_serial': ['itemasset_serial']
			},
			defaultsearch: ['itemasset_id', 'itemasset_name']

		},


		'mst_itemassetspec' : {
			comment: 'Spesifikasi item asset',
			primarykeys: ['itemassetspec_id'],		
			data: {
				itemassetspec_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				itemassetspec_value: {text:'Value', type: dbtype.varchar(90), null:false},
				itemspec_id: { 
					text: 'Spec', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Item Spesifikasi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemspec', 
						field_value: 'itemspec_id', field_display: 'itemspec_name', field_display_name: 'itemspec_name', 
						api: 'finact/asset/itemspec/list'})				
				
				},
				itemspec_isnumber: { text: 'Number', type: dbtype.boolean, null: false, default:0, suppresslist: true, options:{disabled:true}},
				itemasset_id: {text:'Item', type: dbtype.varchar(14), null:false, uppercase: true},		
			}
		},



		'trn_inquiryfiles' : {
			primarykeys: ['inquiryfiles_id'],
			comment: 'Daftar FIle Inquiry',
			data: {
				inquiryfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				inquiryfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				inquiryfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				inquiryfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				inquiry_id: {text:'Inquiry', type: dbtype.varchar(14), null:false},		
			},
			defaultsearch: ['inquiryfiles_descr'],
			uniques: {
				'inquiryfiles_doc' : ['inquiry_id', 'doctype_id']
			}
		},


		'mst_itemassetdepre': {
			comment: 'Daftar Depresiasi Item Asset',
			primarykeys: ['itemassetdepre_id'],
			data: {
				itemassetdepre_id: {text:'ID', type: dbtype.varchar(14), null:false},
				itemassetdepre_date: {text:'Date', type: dbtype.date, null:false},
				itemassetdepre_value: { text: 'Value', type: dbtype.decimal(11,2), null:false, default:0, options: { required: true}},
				itemassetdepre_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true },
				itemasset_id: { text: 'Asset ID', type: dbtype.varchar(14), uppercase: true, null: false }
			}
		},

		'mst_itemassetbooking': {
			comment: 'Daftar Booking',
			primarykeys: ['itemassetbooking_id'],
			data: {
				itemassetbooking_id: {text:'ID', type: dbtype.varchar(14), null:false},
				itemassetbooking_date: {text:'Date', type: dbtype.date, null:false},
				assetbooking_id: { text: 'Booking Ref', type: dbtype.varchar(14), null: true, uppercase: true },
				assetbooking_id: { text: 'Moving Ref', type: dbtype.varchar(14), null: true, uppercase: true },
				itemasset_id: { text: 'Asset ID', type: dbtype.varchar(14), uppercase: true, null: false }
			}
		},


		'log_itemassetmoving': {
			comment: 'Log Moving Item Asset',
			primarykeys: ['itemassetmoving_id'],
			data: {
				itemassetmoving_id: {text:'ID', type: dbtype.varchar(14), null:false},
				itemassetmoving_date: {text:'Date', type: dbtype.date, null:false},
				itemassetmoving_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true },
				itemassetmoving_typename: { text: 'Type', type: dbtype.varchar(150), null: true, uppercase: true },
				dept_name: { text: 'Dept', type: dbtype.varchar(150), null: true, uppercase: true },
				site_name: { text: 'Site', type: dbtype.varchar(150), null: true, uppercase: true },
				empl_name: { text: 'PIC', type: dbtype.varchar(150), null: true, uppercase: true },
				itemasset_id: { text: 'Asset ID', type: dbtype.varchar(14), uppercase: true, null: false },
			}
		},

		'log_itemassetmaintenace': {
			comment: 'Log Maintenance Item Asset',
			primarykeys: ['itemassetmaintenace_id'],
			data: {
				itemassetmaintenace_id: {text:'ID', type: dbtype.varchar(14), null:false},
				itemassetmaintenace_date: {text:'Date', type: dbtype.date, null:false},
				itemassetmaintenace_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true },
				itemassetmaintenace_typename: { text: 'Type', type: dbtype.varchar(150), null: true, uppercase: true },
				itemassetmaintenace_status: { text: 'Status', type: dbtype.varchar(150), null: true, uppercase: true },
				partner_name:  { text: 'Partner', type: dbtype.varchar(150), null: true, uppercase: true },
				itemasset_id: { text: 'Asset ID', type: dbtype.varchar(14), uppercase: true, null: false },
			}
		},

		'log_itemassetfail': {
			comment: 'Log Failure Item Asset',
			primarykeys: ['itemassetfail_id'],
			data: {
				itemassetfail_id: {text:'ID', type: dbtype.varchar(14), null:false},
				itemassetfail_date: {text:'Date', type: dbtype.date, null:false},
				itemassetfail_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true },
				itemassetfail_descr: { text: 'Descr', type: dbtype.varchar(150), null: true, uppercase: true },
				empl_name:  { text: 'Reporter', type: dbtype.varchar(150), null: true, uppercase: true },
				itemasset_id: { text: 'Asset ID', type: dbtype.varchar(14), uppercase: true, null: false },
			}
		},

	},

	schema: {
		header: 'mst_itemasset',
		detils: {
			'spec': {title: 'Spesifikasi', table: 'mst_itemassetspec', form: true, headerview: 'itemasset_name' },
			'files': {title: 'Files', table: 'trn_inquiryfiles', form: true, headerview: 'inquiry_descr' },
			'depre': {title: 'Depresiasi', table: 'mst_itemassetdepre', form: true, headerview: 'itemasset_name' },
			'booking': {title: 'Booking', table: 'mst_itemassetbooking', form: true, headerview: 'itemasset_name' },
			'moving': {title: 'Moving Log', table: 'log_itemassetmoving', form: true, headerview: 'itemasset_name' },
			'maintenance': {title: 'Maintenance Log', table: 'log_itemassetmaintenace', form: true, headerview: 'itemasset_name' },
		}
	}


}