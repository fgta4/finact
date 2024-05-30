'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'PO', 
	printing: true,	
	committer: true,
	approval: true,
	dept_id_field: 'process_dept_id',
	doc_id: 'PURCHASEORDER',	


	persistent: {
		'trn_orderout': {
			comment: 'Daftar Order Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['orderout_id'],
			data: {
				orderout_id: { text: 'ID', type: dbtype.varchar(30), null: false },

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, hidden: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},


				request_id: {
					text: 'Request', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'trn_request',
						field_value: 'request_id', field_display: 'request_descr', field_display_name: 'request_descr',
						api: 'local: get-request-outstanding',
						OnSelectedScript: `
				console.log(record);		

				if (record.projecttask_id==null || record.projecttask_id=='--NULL--') { record.projecttask_id='--NULL--'; record.projecttask_name='NONE'; }
				if (record.projbudget_id==null || record.projbudget_id=='--NULL--') { record.projbudget_id='--NULL--'; record.projbudget_name='NONE'; }
				if (record.projbudgettask_id==null || record.projbudgettask_id=='--NULL--') { record.projbudgettask_id='--NULL--'; record.projbudgettask_name='NONE'; }
				
				form.setValue(obj.cbo_inquiry_id, record.inquiry_id, record.inquiry_descr);
				form.setValue(obj.cbo_inquirytype_id, record.inquirytype_id, record.inquirytype_name);
				form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
				form.setValue(obj.txt_orderout_descr, record.inquiry_descr)
				form.setValue(obj.dt_orderout_dtstart, global.now(from_sql_date(record.request_dtstart)));
				form.setValue(obj.dt_orderout_dtend, global.now(from_sql_date(record.request_dtend)));
				form.setValue(obj.cbo_project_id, record.project_id, record.project_name);
				form.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name);
				form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name);
				form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);
				form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
				form.setValue(obj.txt_inquiryselect_id, record.inquiryselect_id);
				form.setValue(obj.txt_owner_dept_id, record.owner_dept_id);
				form.setValue(obj.cbo_request_dept_id, record.request_dept_id, record.request_dept_name);
				form.setValue(obj.txt_orderout_dept_id, record.orderout_dept_id);
				form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
				form.setValue(obj.cbo_doc_id, record.orderout_doc_id, record.orderout_doc_name);
				form.setValue(obj.chk_orderout_isdateinterval, record.request_isdateinterval=='1'?true:false);
				form.setValue(obj.chk_orderout_isitemdeptuser, record.request_isitemdeptuser=='1'?true:false);
				form.setValue(obj.chk_orderout_isitemdeptowner, record.request_isitemdeptowner=='1'?true:false);
				form.setValue(obj.cbo_site_id, record.site_id, record.site_name);
				form.setValue(obj.txt_deliver_siteaddress, record.deliver_siteaddress);
				form.setValue(obj.txt_deliver_city, record.deliver_city);
				form.setValue(obj.txt_deliver_upname, record.deliver_upname);
				form.setValue(obj.txt_deliver_uptelp, record.deliver_uptelp);		
				form.setValue(obj.cbo_recv_dept_id, record.owner_dept_id,  record.owner_dept_name );						
						`
					})
				},
				orderout_isunref: {text:'Un Requested', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'}},

				inquirytype_id: {
					text: 'Inquiry Type', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'type inquiry harus diisi' , disabled: true},
					comp: comp.Combo({
						table: 'mst_inquirytype',
						field_value: 'inquirytype_id', field_display: 'inquirytype_name',
						api: 'finact/procurement/inquirytype/list'
					})
				},

				trxmodel_id: { 
					text: 'Model Trx', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Trx harus diisi', disabled: true }, 
					comp: comp.Combo({
						table: 'mst_trxmodel',
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'
					})				
				},

				request_dept_id: {
					text: 'Request Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen Requestor harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'request_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},


				orderout_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderout_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				orderout_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},


				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate',
						OnSelectedScript: `
				form.setValue(obj.txt_curr_rate, record.curr_rate)
						`
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, suppresslist: true, default:0},


				ppn_taxtype_id: { text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},

				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
			
				},



				partner_id: {
					section: section.Begin('Partner'),  // , 'defbottomborder'
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

				ordercontract_id: {
					text: 'Order Contract', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_ordercontract',
						field_value: 'ordercontract_id', field_display: 'ordercontract_descr',
						api: 'finact/procurement/ordercontract/list'
					})
				},

				orderout_quot: { text: 'Quotation Ref', type: dbtype.varchar(90), null: false},

				paymtype_id: {
					text: 'Tipe Pembayaran', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Pembayaran harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_paymtype',
						field_value: 'paymtype_id', field_display: 'paymtype_name',
						api: 'finact/master/paymtype/list'
					})
				},

				partnerbank_id: {
					text:'Partner Bank', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partnerbank', 
						field_value: 'partnerbank_id', field_display: 'partnerbank_accnum',  field_display_name: 'partnerbank_accnum',
						api: 'ent/affiliation/partner/bank-list',
						OnSelectedScript: `
				form.setValue(obj.txt_partnerbank_name, record.partnerbank_accname)
				form.setValue(obj.txt_partnerbank_bankacc, record.partnerbank_accnum)
				form.setValue(obj.txt_partnerbank_bankaccname, record.partnerbank_accname)
				form.setValue(obj.txt_partnerbank_name, record.bank_name)
						`
					})
				},
				partnerbank_name: {text:'Paymto Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnerbank_bankacc: {text:'Paymto Account', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnerbank_bankaccname: {text:'Paymto Account Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnerbank_bankname: {text:'Paymto Bank Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},

				partnercontact_id: {
					text:'Partner Contact', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partnercontact', 
						field_value: 'partnercontact_id', field_display: 'partnercontact_name',  field_display_name: 'partnercontact_name',
						api: 'ent/affiliation/partner/contact-list',
						OnSelectedScript: `
				form.setValue(obj.txt_partnercontact_upname, record.partnercontact_name)
				form.setValue(obj.txt_partnercontact_position, record.partnercontact_position)
				form.setValue(obj.txt_partnercontact_upphone, record.partnercontact_mobilephone)
				form.setValue(obj.txt_partnercontact_email, record.partnercontact_email)		
						`
					})
				},
				partnercontact_upname: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnercontact_position: {text:'Position', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnercontact_upphone: {text:'HP', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnercontact_email: {
					section: section.End(),
					text:'Email', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{validType: ['email'],disabled:true}},






				project_id: {
					section: section.Begin('Budget'),
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { prompt: 'NONE', disabled: true },
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
						field_value: 'projbudgettask_id', field_display: 'projecttask_name',  field_display_name: 'projecttask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},

				orderout_isunbudgetted: { 
					section: section.End(),
					text: 'UnBudgetted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} 
				},
	




				site_id: {
					section: section.Begin('Deliver To'),
					text:'Site', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},

				user_dept_id: {
					text: 'User Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				recv_dept_id: {
					text: 'Receiver Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'recv_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				deliver_siteaddress: {text:'To Address', type: dbtype.varchar(250), null:true, suppresslist: true, uppercase: false},
				deliver_city: {text:'To City', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_upname: {text:'To UP Name', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				deliver_uptelp: {
					section: section.End(),
					text:'To UP Telp', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true
				},







				inquiry_id: {
					section: section.Begin('Order Information'),
					text: 'Inquiry', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE', disabled: true},
					comp: comp.Combo({
						table: 'trn_inquiry',
						field_value: 'inquiry_id', field_display: 'inquiry_descr', field_display_name: 'inquiry_descr',
						api: 'finact/procurement/inquiry/list',
						OnSelectedScript: `
						`
					})
				},

				orderout_ismultirequest: { text: 'Allow Multiple Request', type: dbtype.boolean, null: false, default: '0', suppresslist: true, hidden:true, options: {labelWidth: '300px'} },




				inquirymodel_id: { text: 'Inquiry Model', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquirymodel', field_value: 'inquirymodel_id'}, options: { required: true, invalidMessage: 'Inquiry Model harus diisi', disabled: true } },
				inquiryselect_id: { text: 'Inquiry Select', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquiryselect', field_value: 'inquiryselect_id'}, options: { required: true, invalidMessage: 'Inquiry Select harus diisi', disabled: true } },
				itemmanage_id: { text: 'Item Manage As', type: dbtype.varchar(2),  null: false, suppresslist: true, reference: {table: 'mst_itemmanage', field_value: 'itemmanage_id'}, options: { required: true, invalidMessage: 'Item Manage Model harus diisi', disabled: true } },
				owner_dept_id: { text: 'Owner Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Owner Dept harus diisi', disabled: true } },
				orderout_dept_id: { text: 'Orderout Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Orderout Dept harus diisi', disabled: true } },
				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},
				orderout_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				orderout_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				orderout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				orderout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				orderout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				orderout_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				orderout_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				orderout_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				orderout_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				orderout_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				orderout_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				orderout_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				orderout_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				orderout_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				orderout_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				orderout_isadvance: { text: 'Use Advance Request', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} , hidden: true},
				orderout_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
				orderout_isitemdeptuser: { text: 'Item Related to User Dept', type: dbtype.boolean, null: false, default: '0',  suppresslist: true,options: { labelWidth: '300px' , disabled: true} },
				orderout_isitemdeptowner: { 
					section: section.End(),
					text: 'Item Related to Owner Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth: '300px' , disabled: true} },

			},
			
			defaultsearch: ['orderout_id', 'orderout_descr']
		},



		'trn_orderoutitem' : {
			comment: 'Item yang di request',
			primarykeys: ['orderoutitem_id'],		
			data: {
				orderoutitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'local: list-get-itemasset'
					})				
				},

				item_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'local: list-get-item'
					})				
				},

				itemstock_id: { 
					text: 'Item Stock', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'local: list-get-itemstock'
					})				
				},				

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				orderoutitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderoutitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				orderoutitem_days: { text: 'Days', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				orderoutitem_task: { text: 'Task', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				orderoutitem_rate: { text: 'Rate', type: dbtype.decimal(12,2), null:false, default:0},
				orderoutitem_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate',
						OnSelectedScript: `
				form.setValue(obj.txt_curr_rate, record.curr_rate)
						`
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0},


				orderoutitem_idr: { text: 'IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				projbudgetdet_id: {
					text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_projbudgetdet',
						view: 'view_projbudgetdetacc', field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
						api: 'finact/budget/projbudget/list-projbudgetdetacc'
					})
				},

				orderoutitem_isoverbudget: { text: 'Over Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },
				orderoutitem_isunbudget: { text: 'UnBudget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },

				orderoutitem_budgetavailable: { 
					section: section.Begin('Information'),
					text: 'Budget Available', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}
				},
				orderoutitem_budgetqtyavailable: { text: 'Budget Qty Available', type: dbtype.int(16), null:false, default:0, suppresslist: true, options: {disabled: true}},
				orderoutitem_budgetdaysavailable: { text: 'Budget Days Available', type: dbtype.int(16), null:false, default:0, suppresslist: true, options: {disabled: true}},
				orderoutitem_budgettaskavailable: { text: 'Budget Task Available', type: dbtype.int(16), null:false, default:0, suppresslist: true, options: {disabled: true}},



				orderoutitem_isuseqty: { caption:'Metric', text: 'Use Qty', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_isusedays: { text: 'Use Days', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_isusetask: { text: 'Use Task', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_islimitqty: { caption:'Restric To Budget', text: 'Limit Qty', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_islimitdays: { text: 'Limit Days', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_islimittask: { text: 'Limit Task', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_islimitvalue: { text: 'Limit Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_isallowoverbudget: { text: 'Allow Over Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_isallowunbudget: { text: 'Allow UnBudget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px', disabled: true} },
				orderoutitem_qtyavailable: { text: 'Stock Available', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {disabled: true}},

				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},


				request_id: {
					text:'Request Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_request', field_value: 'request_id'},
					options: {disabled: true}
				},

				requestitem_id: {
					text:'Request Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_requestdetil', field_value: 'requestitem_id'},
					options: {disabled: true}
				},

				inquiry_id: {
					text:'Inquiry Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_inquiry', field_value: 'inquiry_id'},
					options: {disabled: true}
				},

				inquiryitem_id: {
					text:'Inquiry Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_inquirydetil', field_value: 'inquirydetil_id'},
					options: {disabled: true}
				},

				orderout_id: { text: 'Order', type: dbtype.varchar(30), null: false },
			}
		},



		'trn_orderoutfiles' : {
			primarykeys: ['orderoutfiles_id'],
			comment: 'Daftar FIle Inquiry',
			data: {
				orderoutfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				orderoutfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				orderoutfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				orderoutfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				orderout_id: {text:'Orderout', type: dbtype.varchar(14), null:false},		
			},
			defaultsearch: ['orderoutfiles_descr'],
			uniques: {
				'orderout_doc' : ['orderout_id', 'doctype_id']
			}
		},
		
		

	},

	schema: {
		header: 'trn_orderout',
		detils: {
			// 'request' : {title: 'Request', table: 'trn_orderoutreq', form: true, headerview: 'orderout_descr' },
			'items' : {title: 'Items', table: 'trn_orderoutitem', form: true, headerview: 'orderout_descr' },
			'multiadd' : {title: 'Items Add', table: 'trn_orderoutitem', form: false, headerview: 'orderout_descr', hidden: true },
			'files': {title: 'Files', table: 'trn_orderoutfiles', form: true, headerview: 'orderout_descr' }

		}
	}


}