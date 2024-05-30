'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Request",
	autoid: true,
	icon: "icon-inquiry-white.svg",
	backcolor : "#dd9a49",
	idprefix: 'PR', 
	printing: true,	
	committer: true,
	approval: true,
	dept_id_field: 'owner_dept_id',
	doc_id: 'PURCHASEREQUEST',	

	persistent: {
		'trn_request': {
			comment: 'Daftar Request Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['request_id'],
			data: {
				request_id: { text: 'ID', type: dbtype.varchar(30), null: false},

				inquiry_id: {
					text: 'Inquiry', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_inquiry',
						field_value: 'inquiry_id', field_display: 'inquiry_descr',
						api: 'finact/procurement/inquiry/list',
						OnSelectedScript: `
				console.log(record);
		
				if (record.projecttask_id==null || record.projecttask_id=='--NULL--') { record.projecttask_id='--NULL--'; record.projecttask_name='NONE'; }
				if (record.projbudget_id==null || record.projbudget_id=='--NULL--') { record.projbudget_id='--NULL--'; record.projbudget_name='NONE'; }
				if (record.projbudgettask_id==null || record.projbudgettask_id=='--NULL--') { record.projbudgettask_id='--NULL--'; record.projbudgettask_name='NONE'; }
				
				form.setValue(obj.cbo_inquirytype_id, record.inquirytype_id, record.inquirytype_name);
				form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
				form.setValue(obj.txt_request_descr, record.inquiry_descr)
				form.setValue(obj.dt_request_dtstart, global.now(from_sql_date(record.inquiry_dtstart)));
				form.setValue(obj.dt_request_dtend, global.now(from_sql_date(record.inquiry_dtend)));
				form.setValue(obj.cbo_project_id, record.project_id, record.project_name);
				form.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name);
				form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name);
				form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);
				form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
				form.setValue(obj.txt_inquiryselect_id, record.inquiryselect_id);
				form.setValue(obj.txt_owner_dept_id, record.owner_dept_id);
				form.setValue(obj.txt_orderout_dept_id, record.orderout_dept_id);
				form.setValue(obj.txt_orderout_doc_id, record.orderout_doc_id);
				form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
				form.setValue(obj.cbo_doc_id, record.request_doc_id, record.request_doc_name);
				form.setValue(obj.chk_request_isdateinterval, record.inquiry_isdateinterval=='1'?true:false);
				form.setValue(obj.chk_request_isitemdeptuser, record.inquiry_isitemdeptuser=='1'?true:false);
				form.setValue(obj.chk_request_isitemdeptowner, record.inquiry_isitemdeptowner=='1'?true:false);
				form.setValue(obj.cbo_site_id, record.site_id, record.site_name);
				form.setValue(obj.txt_deliver_siteaddress, record.deliver_siteaddress);
				form.setValue(obj.txt_deliver_city, record.deliver_city);
				form.setValue(obj.txt_deliver_upname, record.deliver_upname);
				form.setValue(obj.txt_deliver_uptelp, record.deliver_uptelp);

				`
					})
				},
				request_isunref: {text:'Un Referenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { labelWidth: '200px'}},


				inquirytype_id: {
					text: 'Inquiry Type', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'type inquiry harus diisi' },
					comp: comp.Combo({
						table: 'mst_inquirytype',
						field_value: 'inquirytype_id', field_display: 'inquirytype_name',
						api: 'finact/procurement/inquirytype/list',
					})
				},

				user_dept_id: {
					text: 'User Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'type inquiry harus diisi' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				request_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				trxmodel_id: { 
					text: 'Model Trx', type: dbtype.varchar(10), uppercase: true, null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Trx harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel',
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'
					})				
				},

				request_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				request_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},


				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,suppresslist: true,
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
					text: 'Budget', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name', field_display_name: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_notes',  field_display_name: 'projbudgettask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},

				request_isunbudgetted: { text: 'UnBudgetted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },

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



				inquirymodel_id: { text: 'Inquiry Model', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquirymodel', field_value: 'inquirymodel_id'}, options: { required: true, invalidMessage: 'Inquiry Model harus diisi', disabled: true } },
				inquiryselect_id: { text: 'Inquiry Select', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquiryselect', field_value: 'inquiryselect_id'}, options: { required: true, invalidMessage: 'Inquiry Select harus diisi', disabled: true } },
				itemmanage_id: { text: 'Item Manage As', type: dbtype.varchar(2),  null: false, suppresslist: true, reference: {table: 'mst_itemmanage', field_value: 'itemmanage_id'}, options: { required: true, invalidMessage: 'Item Manage Model harus diisi', disabled: true } },
				owner_dept_id: { text: 'Owner Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Owner Dept harus diisi', disabled: true } },
				orderout_dept_id: { text: 'Orderout Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Orderout Dept harus diisi', disabled: true } },
				orderout_doc_id: { text: 'Orderout Doc', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_doc', field_value: 'doc_id'}, options: { required: true, invalidMessage: 'Orderout Doc harus diisi', disabled: true, disabled: true}},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},
				
				request_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				request_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				request_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				request_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				request_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				request_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				request_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				request_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				request_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				request_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				request_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				request_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				request_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				request_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				request_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				request_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
				request_isitemdeptuser: { text: 'Item Related to User Dept', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' , disabled: true} },
				request_isitemdeptowner: { text: 'Item Related to Owner Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px' , disabled: true} },

			},
			
			defaultsearch: ['request_id', 'request_descr'],
			additionalsearch: {

			}
		},


		'trn_requestitem': {
			comment: 'Daftar Request Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['requestitem_id'],
			data: {
				requestitem_id: { text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, suppresslist: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'local: get-itemasset'
					})				
				},

				item_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, suppresslist: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'local: get-item'
					})				
				},

				itemstock_id: { 
					text: 'Item Stock', type: dbtype.varchar(14), uppercase: true, null: true, suppresslist: true,  
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'local: get-itemstock'
					})				
				},				



				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: get-partner'
					})
				},

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, suppresslist: true, 
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				requestitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				requestitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				requestitem_days: { text: 'Days', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				requestitem_task: { text: 'Task', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				requestitem_estrate: { text: 'EstRate', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true },
				requestitem_estvalue: { text: 'Total', type: dbtype.decimal(14,0), null:false, default:0},
				


				projbudgetdet_id: {
					text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_projbudgetdet',
						view: 'view_projbudgetdetacc', field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
						api: 'finact/budget/projbudget/list-accbudget-byitemclass'
					})
				},


				requestitem_isunbudget: { text: 'UnBudgettetd', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },
				requestitem_isallowoverbudget: { text: 'Over Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },
				requestitem_value: { text: 'Value', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				requestitem_budgetavailable: { text: 'Budget Available', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				requestitem_qtyavailable: { text: 'Qty Available', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {disabled: true}},
				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},

				inquiry_id: {
					text:'Inquiry Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_inquiry', field_value: 'inquiry_id'},
					options: {disabled: true}
				},

				inquirydetil_id: {
					text:'Inquiry Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_inquirydetil', field_value: 'inquirydetil_id'},
					options: {disabled: true}
				},

				request_id: { text: 'ID', type: dbtype.varchar(30), null: false },
			}
		},		

	},

	schema: {
		header: 'trn_request',
		detils: {
			'items' : {title: 'Items', table: 'trn_requestitem', form: true, headerview: 'request_descr' },
			'multiadd' : {title: 'Items Add', table: 'trn_requestitem', form: false, headerview: 'request_descr' },
		}
	}


}


/*
ALTER TABLE `trn_purchreqitemasset` ADD KEY `inquiryitemclass_id` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqitemasset` ADD CONSTRAINT `fk_trn_purchreqitemasset_trn_inquiryitemclass` FOREIGN KEY (`inquiryitemclass_id`) REFERENCES `trn_inquiryitemclass` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqitemasset` ADD KEY `inquiryitemasset_id` (`inquiryitemasset_id`);
ALTER TABLE `trn_purchreqitemasset` ADD CONSTRAINT `fk_trn_purchreqitemasset_trn_inquiryitemasset` FOREIGN KEY (`inquiryitemasset_id`) REFERENCES `trn_inquiryitemasset` (`inquiryitemasset_id`);


ALTER TABLE `trn_purchreqitemstock` ADD KEY `inquiryitemclass_id` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqitemstock` ADD CONSTRAINT `fk_trn_purchreqitemstock_trn_inquiryitemclass` FOREIGN KEY (`inquiryitemclass_id`) REFERENCES `trn_inquiryitemclass` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqitemstock` ADD KEY `inquiryitemstock_id` (`inquiryitemstock_id`);
ALTER TABLE `trn_purchreqitemstock` ADD CONSTRAINT `fk_trn_purchreqitemstock_trn_inquiryitemstock` FOREIGN KEY (`inquiryitemstock_id`) REFERENCES `trn_inquiryitemstock` (`inquiryitemstock_id`);



ALTER TABLE `trn_purchreqpartner` ADD KEY `inquiryitemclass_id` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqpartner` ADD CONSTRAINT `fk_trn_purchreqpartner_trn_inquiryitemclass` FOREIGN KEY (`inquiryitemclass_id`) REFERENCES `trn_inquiryitemclass` (`inquiryitemclass_id`);
ALTER TABLE `trn_purchreqpartner` ADD KEY `inquirypartner_id` (`inquirypartner_id`);
ALTER TABLE `trn_purchreqpartner` ADD CONSTRAINT `fk_trn_purchreqpartner_trn_inquirypartner` FOREIGN KEY (`inquirypartner_id`) REFERENCES `trn_inquirypartner` (`inquirypartner_id`);


*/