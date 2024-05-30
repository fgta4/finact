'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

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
					text: 'Inquiry Type', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'type inquiry harus diisi' },
					comp: comp.Combo({
						table: 'mst_inquirytype',
						field_value: 'inquirytype_id', field_display: 'inquirytype_name',
						api: 'finact/procurement/inquirytype/list',

						OnSelectedScript: `
				console.log(record);	
				form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
				form.setValue(obj.txt_inquiryselect_id, record.inquiryselect_id);
				form.setValue(obj.txt_owner_dept_id, record.owner_dept_id);
				form.setValue(obj.txt_request_doc_id, record.request_doc_id);
				form.setValue(obj.txt_orderout_dept_id, record.orderout_dept_id);
				form.setValue(obj.txt_orderout_doc_id, record.orderout_doc_id);
				form.setValue(obj.txt_trxmodel_id, record.trxmodel_id);
				form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
				form.setValue(obj.chk_inquiry_isdateinterval, record.inquirytype_isdateinterval=='1'?true:false);
				form.setValue(obj.chk_inquiry_isitemdeptuser, record.inquirytype_isdeptuser=='1'?true:false);
				form.setValue(obj.chk_inquiry_isitemdeptowner, record.inquirytype_isdeptowner=='1'?true:false);
				form.setValue(obj.chk_inquiry_istoberequest, record.inquirytype_istoberequest=='1'?true:false);
				form.setValue(obj.txt_inquiry_maxadvancevalue, record.inquirytype_maxadvancevalue);
				form.setValue(obj.chk_inquiry_isallowadvance, record.inquirytype_isallowadvance=='1'?true:false);
`						
					}),
					

				},

				inquiry_descr: { text: 'Descr', type: dbtype.varchar(255), options: { required: true, invalidMessage: 'Descr harus diisi' } },

				inquiry_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				inquiry_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},

				user_dept_id: {
					text: 'User Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				empl_id: {
					text:'Responsible Empl', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},

				inquiry_isadvance: { text: 'Request Advance Payment', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				projecttask_id: {
					text: 'Project Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},

				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null:true,  suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_notes', field_display_name:'projbudgettask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},

				inquiry_isunbudgetted: { text: 'UnBudgetted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },

				site_id: {
					text:'Deliver To', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				deliver_siteaddress: {text:'To Address', type: dbtype.varchar(250), null:true, suppresslist: true, uppercase: false},
				deliver_city: {text:'To City', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_upname: {text:'To UP Name', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_uptelp: {text:'To UP Telp', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},


				inquirymodel_id: { 
					text: 'Inquiry Model', type: dbtype.varchar(1),  null: false, suppresslist: true, 
					reference: {table: 'mst_inquirymodel', field_value: 'inquirymodel_id', field_display:'inquirymodel_name',  field_display_name:'inquirymodel_name'}, 
					options: { required: true, invalidMessage: 'Inquiry Model harus diisi', disabled: true } 
				},

				inquiryselect_id: { 
					text: 'Inquiry Select', type: dbtype.varchar(1),  null: false, suppresslist: true, 
					reference: {table: 'mst_inquiryselect', field_value: 'inquiryselect_id', field_display:'inquiryselect_name',  field_display_name:'inquiryselect_name'}, 
					options: { required: true, invalidMessage: 'Inquiry Select harus diisi', disabled: true } 
				},


				related_dept_id: { 
					text: 'Related Dept', type: dbtype.varchar(30), null: false, suppresslist: true, 
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name',  field_display_name:'related_dept_name'}, 
					options: { required: true, invalidMessage: 'Related Dept harus diisi', disabled: true } 
				},

				owner_dept_id: { 
					text: 'Owner Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, 
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name',  field_display_name:'owner_dept_name'}, 
					options: { required: true, invalidMessage: 'Owner Dept harus diisi', disabled: true } 
				},

				request_doc_id: { 
					text: 'Request Doc', type: dbtype.varchar(30),  null: false, suppresslist: true, 
					reference: {table: 'mst_doc', field_value: 'doc_id', field_display:'doc_name',  field_display_name:'request_doc_name'}, 
					options: { required: true, invalidMessage: 'Rquest Doc harus diisi', disabled: true, disabled: true}
				},


				orderout_dept_id: { 
					text: 'Orderout Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, 
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name',  field_display_name:'orderout_dept_name'}, 
					options: { required: true, invalidMessage: 'Orderout Dept harus diisi', disabled: true } 
				},


				orderout_doc_id: { 
					text: 'Orderout Doc', type: dbtype.varchar(30),  null: false, suppresslist: true, 
					reference: {table: 'mst_doc', field_value: 'doc_id', field_display:'doc_name',  field_display_name:'orderout_doc_name'}, 
					options: { required: true, invalidMessage: 'Orderout Doc harus diisi', disabled: true, disabled: true}
				},


				trxmodel_id: { 
					text: 'TrxModel', type: dbtype.varchar(30),  null: false, suppresslist: true, 
					reference: {table: 'mst_trxmodel', field_value: 'trxmodel_id', field_display:'trxmodel_name',  field_display_name:'trxmodel_name'}, 
					options: { required: true, invalidMessage: 'TrxModel harus diisi', disabled: true, disabled: true}
				},


				itemmanage_id: { 
					text: 'Item Manage As', type: dbtype.varchar(2),  null: false, suppresslist: true, 
					reference: {table: 'mst_itemmanage', field_value: 'itemmanage_id', field_display:'itemmanage_name',  field_display_name:'itemmanage_name'}, 
					options: { required: true, invalidMessage: 'Item Manage Model harus diisi', disabled: true } 
				},


				inquiry_rejectnotes: { text: 'Reject Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, options:{disabled: true} },

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				inquiry_selectfield: {text:'Doc Version', type: dbtype.varchar(6), null:false, default:'000000', suppresslist: true, options:{disabled:true}},
				inquiry_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				inquiry_maxadvancevalue: { text: 'Max Advance Value', type: dbtype.decimal(12,0), null: false, default: '0', suppresslist: true, options:{disabled:true} },
				inquiry_isallowadvance: { text: 'Allow using Advance Request', type: dbtype.boolean, null: false, default: '0',suppresslist: true,  options: { labelWidth: '300px', disabled:true } },
				inquiry_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				inquiry_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
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
				inquiry_isreject: {text:'Reject', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				inquiry_rejectby: { text: 'Reject By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				inquiry_rejectdate: { text: 'Reject Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				inquiry_iscomplete: {text:'Complete', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				inquiry_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				inquiry_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				inquiry_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				inquiry_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
				inquiry_isitemdeptuser: { text: 'Item Related to User Dept', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' , disabled: true } },
				inquiry_isitemdeptowner: { text: 'Item Related to Owner Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px',  disabled: true } },
				inquiry_istoberequest: { text: 'Mark As To be Request', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px',  disabled: true } },
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
					text:'Asset', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_itemasset', 
						field_value: 'itemasset_id', field_display: 'itemasset_name', field_display_name: 'itemasset_name', 
						api: 'finact/items/itemasset/list'})					
				},

				item_id: {
					text:'Item', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_item', 
						field_value: 'item_id', field_display: 'item_name', field_display_name: 'item_name', 
						api: 'finact/items/item/list'})					
				},

				itemstock_id: {
					text:'Item Stock', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_itemstock', 
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_name', 
						api: 'finact/items/itemstock/list'})					
				},
				
				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-approved'})
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},

				inquirydetil_descr: { text: 'Descr', type: dbtype.varchar(255), null:true, suppresslist: true},

				inquirydetil_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				inquirydetil_days: { text: 'Days', type: dbtype.int(4), null:false, default:0},
				inquirydetil_task: { text: 'Task', type: dbtype.int(4), null:false, default:0},
				inquirydetil_estrate: { text: 'Est.Rate', type: dbtype.decimal(12,0), null:false, default:0},
				inquirydetil_estvalue: { text: 'Est.Value', type: dbtype.int(14,0), null:false, default:0},

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
			'item': {title: 'Item', table: 'trn_inquirydetil', form: true, headerview: 'inquiry_descr' },
			'files': {title: 'Files', table: 'trn_inquiryfiles', form: true, headerview: 'inquiry_descr' }
		}
	}

}


/*

ALTER TABLE `trn_inquiry` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `trn_inquiry` ADD CONSTRAINT `fk_trn_inquiry_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);


*/