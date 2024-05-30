'use strict'

const dbtype = global.dbtype;
const comp = global.comp;


// onDataLoadingHandler: true,
// onDataLoadedHandler: true,
// onSelectingHandler: true,
// onSelectedHandler: true

module.exports = {
	title: "Inquiry",
	autoid: true,
	idprefix: 'NQ', 
	printing: true,	
	icon : "icon-inquiry-white.svg",
	backcolor: "#812640",
	committer: true,
	approval: true,
	dept_id_field: 'user_dept_id',
	doc_id: 'INQUIRY',

	persistent: {
		'trn_inquiry': {
			comment: 'Inquiry item',
			primarykeys: ['inquiry_id'],
			data: {
				inquiry_id: { text: 'ID', type: dbtype.varchar(30), null: false },


				inquirytype_id: {
					class: 'inquirytype-selector',
					text: 'Inquiry Type', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'type inquiry harus diisi' },
					comp: comp.Combo({
						title: 'Pilih Type Inquiry',
						table: 'mst_inquirytype',
						field_value: 'inquirytype_id', field_display: 'inquirytype_name',
						api: 'finact/procurement/inquirytype/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true		
					}),
					

				},

				request_dept_id: {
					class: 'head-step2 head-step2-hidden',
					text: 'Inquiry To', type: dbtype.varchar(30), null: true, 
					options: { disabled: true, required: true, invalidMessage: 'Inquiry To Departemen harus diisi'},
					comp: comp.Combo({
						title: 'Pilih Departemen Tujuan',
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'request_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				
				inquiry_descr: { 
					class: 'head-step2 head-step2-hidden',
					text: 'Descr', type: dbtype.varchar(255), options: { required: true, invalidMessage: 'Descr harus diisi' } },

				inquiry_dtstart: {
					id: 'pnl_edit-inquiry_dtstart',
					class: 'head-step2 head-step2-hidden',
					text:'Date Start', type: dbtype.date, null:false},
				inquiry_dtend: {
					id: 'pnl_edit-inquiry_dtend',
					class: 'head-step2 head-step2-hidden',
					text:'Date End', type: dbtype.date, null:false, suppresslist: true},

					
				user_dept_id: {
					class: 'head-step2 head-step2-hidden',
					text: 'User Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					autobylogin: 'dept',
					comp: comp.Combo({
						title: 'Pilih Dept User',
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				empl_id: {
					class: 'head-step2 head-step2-hidden',
					text:'Responsible Empl', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					autobylogin: 'empl',
					comp: comp.Combo({
						title: 'Pilih Karyawan',
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					
					})
				},


				inquiry_isadvance: { 
					class: 'head-step2 head-step2-hidden',
					text: 'Request Advance Payment', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} 
				},
				

				partner_id: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						title: 'Pilih Partner',
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},


				partner_name: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden', 
					hidden: true,
					text:'Dibayar Kepada', type: dbtype.varchar(60), null:false, suppresslist: true, options: {disabled: true}
				},

				// Informasi Pembayaran
				paymtype_id: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text: 'Tipe Pembayaran', type: dbtype.varchar(6), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Pembayaran harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						title: 'Pilih Tipe Pembayaran',
						table: 'mst_paymtype',
						field_value: 'paymtype_id', field_display: 'paymtype_name',
						api: 'finact/master/paymtype/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},
				paymtype_isviabank: { 
					class: 'head-step2 head-step2-hidden', hidden: true,
					text: 'Via Bank', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true, labelWidth: '300px'} 
				},

				partnerbank_id: {
					class: 'bankpanel bankpanel-hidden paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					suppresslist: true,
					options: { prompt: 'NONE'},
					text:'Bank Account', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						title: 'Pilih Rekening Bank Tujuan',
						table: 'mst_partnerbank', 
						field_value: 'partnerbank_id', field_display: 'partnerbank_accnum', field_display_name: 'partnerbank_accnum',
						field_mappings: [
							`{mapping: 'partnerbank_id', text: 'ID', hidden: true}`,
							`{mapping: 'partnerbank_accnum', text: 'Account', style: 'width: 200px'}`,
							`{mapping: 'partnerbank_accname', text: 'Name'}`,
							`{mapping: 'bank_name', text: 'Bank', style: 'width: 200px'}`,
						], 
						api: 'ent/affiliation/partner/bank-list',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},
				paymto_bankacc: { 
					class: 'bankpanel bankpanel-hidden  paymentpanel paymentpanel-hidden head-step2 head-step2-hidden', hidden: true,
					text: 'Account', type: dbtype.varchar(90), null: true, suppresslist: true, 
					options: {disabled: true}
				},
				paymto_bankaccname: { 
					class: 'bankpanel bankpanel-hidden paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text: 'Nama Account', type: dbtype.varchar(90), null: true, suppresslist: true ,
					options: {disabled: true}
				},
				paymto_bankname: { 
					class: 'bankpanel bankpanel-hidden paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text: 'Nama Bank', type: dbtype.varchar(90), null: true, suppresslist: true,
					options: {disabled: true}
				},
				
				partnercontact_id: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'Partner Contact', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						title: 'Pilih Contact',
						table: 'mst_partnercontact', 
						field_value: 'partnercontact_id', field_display: 'partnercontact_name',  field_display_name: 'partnercontact_name',
						api: 'ent/affiliation/partner/contact-list',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})
				},
				partnercontact_upname: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true},
				partnercontact_position: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'Position', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true},
				partnercontact_upphone: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'HP', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true},
				partnercontact_email: {
					class: 'paymentpanel paymentpanel-hidden head-step2 head-step2-hidden',
					text:'Email', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{validType: ['email']}},




				project_id: {
					class: 'projectpanel head-step2 head-step2-hidden',
					text: 'Project', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						title: 'Pilih Project',
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},


				projecttask_id: {
					class: 'projectpanel head-step2 head-step2-hidden',
					text: 'Project Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						title: 'Pilih Task Project',
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},



				inquiry_isunbudgetted: { 
					class: 'head-step2 head-step2-hidden',
					text: 'UnBudgetted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} 
				},


				projbudget_id: {
					class: 'budgetpanel budgetpanel-hidden head-step2 head-step2-hidden',
					text: 'Budget', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						title: 'Pilih Budget yang akan digunakan',
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					class: 'budgetpanel budgetpanel-hidden head-step2 head-step2-hidden',
					text: 'Budget Task', type: dbtype.varchar(14), null:true,  suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						title: 'Pilih Task Budget',
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_notes', field_display_name:'projbudgettask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},


				site_id: {
					class: 'head-step2 head-step2-hidden',
					text:'Deliver To', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Lokasi',
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list',
						onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})				
				},
				deliver_siteaddress: {
					class: 'head-step2 head-step2-hidden',
					text:'To Address', type: dbtype.varchar(250), null:true, suppresslist: true, uppercase: false},
				deliver_city: {
					class: 'head-step2 head-step2-hidden',
					text:'To City', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_upname: {
					class: 'head-step2 head-step2-hidden',
					text:'To UP Name', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_uptelp: {
					class: 'head-step2 head-step2-hidden',
					text:'To UP Telp', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},



				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				inquiry_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				inquiry_rejectnotes: { text: 'Reject Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, options:{disabled: true} },


				inquirymodel_id: { 
					section: section.Begin('Inquiry Settings'),
					text: 'Inquiry Model', type: dbtype.varchar(1),  null: false, suppresslist: true, 
					reference: {table: 'mst_inquirymodel', field_value: 'inquirymodel_id', field_display:'inquirymodel_name',  field_display_name:'inquirymodel_name'}, 
					options: { required: true, invalidMessage: 'Inquiry Model harus diisi', disabled: true } 
				},

				itemmanage_id: { 
					text: 'Item Manage As', type: dbtype.varchar(2),  null: false, suppresslist: true, 
					reference: {table: 'mst_itemmanage', field_value: 'itemmanage_id', field_display:'itemmanage_name',  field_display_name:'itemmanage_name'}, 
					options: { required: true, invalidMessage: 'Item Manage Model harus diisi', disabled: true } 
				},

				inquiry_isindependentsetting: { caption:'Current Setting', text: 'Independent', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },


				inquiryselect_isshowitemasset: {caption:'Selection', text: 'Show Itemasset', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },
				inquiryselect_isshowitem: { text: 'Show Item', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },
				inquiryselect_isshowitemstock: { text: 'Show Itemstock', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },
				inquiryselect_isshowpartner: { text: 'Show Partner', type: dbtype.boolean, null: false, default: '0', suppresslist:true,  options:{disabled:true,  labelWidth:'300px'} },
				inquiryselect_isshowitemclass: { text: 'Show Itemclass', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },
				inquiryselect_isitemclassdisabled: { text: 'Itemclass Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'300px'} },


				inquirytype_isuseqty: { caption:'Metrics', text: 'Use Qty', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled:true} },
				inquirytype_isusedays: { text: 'Use Days', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled:true} },
				inquirytype_isusetask: { text: 'Use Task', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{disabled:true}},

				inquirytype_isdateinterval: { caption:'Range', text: 'Date Interval', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled:true, labelWidth: '300px' } },

				inquirytype_istoberequest: { caption:'Followup', text: 'Mark As To be Request', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { disabled:true,  labelWidth: '300px' } },
				inquirytype_isautorequest: { text: 'Auto create Request when processed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled:true,  labelWidth: '300px' } },
				inquirytype_isautoorder: { text: 'Auto create Order when processed', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { disabled:true, labelWidth: '300px' } },
				inquirytype_ismovinginit: { text: 'Auto create Moving Init when processed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled:true, labelWidth: '300px' } },


				inquirytype_islimitqty: { caption:'Restrict To Budget', text: 'Limit Qty by Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ disabled:true, labelWidth:'300px'} },
				inquirytype_islimitdays: { text: 'Limit Days by Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ disabled:true, labelWidth:'300px'} },
				inquirytype_islimittask: { text: 'Limit Task by Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				inquirytype_islimitvalue: { text: 'Limit Value By Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				inquirytype_isallowunbudget: { text: 'Allow Request UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				inquirytype_isallowitemunbudget: { text: 'Allow Items UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				inquirytype_isallowoverbudget: { text: 'Allow Request Over Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ disabled:true, labelWidth:'300px'}},
				inquirytype_isallowadvance: { caption:'Advance Request', text: 'Allowed', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled:true, labelWidth: '300px' } },
				inquirytype_isemplaspartner: { caption:'AR Partner', text: 'Use Responsible Employee', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { disabled:true,  labelWidth: '300px' } },
				inquirytype_maxadvancevalue: { 
					section: section.End(),
					text: 'Max Advance Value', type: dbtype.decimal(12,0), null: false, default: '0', suppresslist: true, options: { disabled:true } },
	


				inquiry_iscommit: {
					section: section.Begin('Status'),
					text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				inquiry_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				inquiry_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				inquiry_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				inquiry_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				inquiry_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				inquiry_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				inquiry_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				inquiry_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				inquiry_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				inquiry_ispreparing: {text:'Preparing', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true,options:{disabled:true}},
				inquiry_isprepared: {text:'Prepared', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true,options:{disabled:true}},
				inquiry_preparedby: { text: 'Prepared By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				inquiry_prepareddate: { text: 'Prepared Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				inquiry_isreject: {text:'Reject', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				inquiry_rejectby: { text: 'Reject By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				inquiry_rejectdate: { text: 'Reject Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				inquiry_iscomplete: {text:'Complete', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				inquiry_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				inquiry_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				inquiry_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				inquiry_isautogenerated: { 
					section: section.End(),
					text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
			},

			defaultsearch: ['inquiry_id', 'inquiry_descr'],
			additionalsearch: {
				'owner_dept_id' : "A.owner_dept_id = :owner_dept_id",
				'inquiry_istoberequest' : "A.inquiry_istoberequest = '1'",
			}

		},

		'trn_inquirydetil' : {
			comment: 'Itemclass yang akan di-inquiry',
			primarykeys: ['inquirydetil_id'],		
			data: {
				inquirydetil_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},

				itemasset_id: {
					class: 'detilitemassetrow',
					text:'Asset', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Item Asset harus diisi' } ,
					// options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_itemasset', 
						field_value: 'itemasset_id', field_display: 'itemasset_name', field_display_name: 'itemasset_name', 
						api: 'finact/items/itemasset/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true
					})					
				},

				item_id: {
					class: 'detilitemrow',
					text:'Item', type: dbtype.varchar(14), null:true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Item harus diisi' } ,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_item', 
						field_value: 'item_id', field_display: 'item_name', field_display_name: 'item_name', 
						api: 'finact/items/item/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true				
					})					
				},

				itemstock_id: {
					class: 'detilitemstockrow',
					text:'Item Stock', type: dbtype.varchar(14), null:true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Item Stock harus diisi' } ,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_itemstock', 
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_name', 
						api: 'finact/items/itemstock/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true					
					})					
				},
				
				partner_id: {
					class: 'detilpartnerrow',
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Partner harus diisi' } ,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true					
					})
				},

				itemclass_id: {
					class: 'detilclassrow',
					text:'Class', type: dbtype.varchar(14), null:false,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						onSelectedHandler: true					
					})					
				},

				
				inquirydetil_descr: { text: 'Descr', type: dbtype.varchar(255), null:true, suppresslist: true},

				inquirydetil_qty: { 
					class: 'detilqtyrow el-hidden',
					text: 'Qty', type: dbtype.int(4), null:false, default:0},
				inquirydetil_days: { 
					class: 'detildaysrow el-hidden',
					text: 'Days', type: dbtype.int(4), null:false, default:0},
				inquirydetil_task: { 
					class: 'detiltaskrow el-hidden',
					text: 'Task', type: dbtype.int(4), null:false, default:0},
				inquirydetil_estrate: { text: 'Est.Rate', type: dbtype.decimal(12,0), null:false, default:0},
				inquirydetil_estvalue: { text: 'Est.Value', type: dbtype.int(14,0), null:false, default:0},

				inquirydetil_ref: { text: 'Ref', type: dbtype.varchar(90), null:true, suppresslist: true},
				inquirydetil_refname: { text: 'Ref Name', type: dbtype.varchar(200), null:true, suppresslist: true},

				projbudgetdet_id: {
					text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_projbudgetdet',
						field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
						api: 'finact/budget/projbudget/list-accbudget-byitemclass'
					})
				},

				inquirydetil_isunbudget: { text: 'UnBudgettetd', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },
				inquirydetil_isallowoverbudget: { text: 'Over Budget', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },

				inquirydetil_qtyavailable: { text: 'Qty Available', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {disabled: true}},
				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},

				inquiry_id: {text:'Inquiry', type: dbtype.varchar(14), null:false},		
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


	},

	schema: {
		header: 'trn_inquiry',
		detils: {
			'item': {title: 'Item', table: 'trn_inquirydetil', form: true, headerview: 'inquiry_descr',  editorHandler: true, listHandler: true},
			'files': {title: 'Files', table: 'trn_inquiryfiles', form: true, headerview: 'inquiry_descr' }
		}
	}

}

