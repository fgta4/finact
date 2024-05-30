'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Recv",
	autoid: true,
	icon : "icon-receive-white.svg",
	backcolor : "#74789e",
	idprefix: 'RV', 
	printing: true,	
	committer: true,
	// approval: true,
	// doc_id: 'ORDEROUT',	


	persistent: {
		'trn_recv': {
			comment: 'Daftar Penerimaan',
			primarykeys: ['recv_id'],
			data: {
				recv_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, hidden: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},	

				orderout_id: {
					text: 'Order', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Order inquiry harus diisi' },
					comp: comp.Combo({
						table: 'trn_orderout',
						field_value: 'orderout_id', field_display: 'orderout_descr', field_display_name: 'orderout_descr',
						api: 'finact/procurement/orderout/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_site_id, record.site_id, record.site_name)
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
				form.setValue(obj.txt_recv_descr, record.orderout_descr)
				form.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
				form.setValue(obj.cbo_recv_dept_id, record.recv_dept_id, record.recv_dept_id)
				form.setValue(obj.txt_trxmodel_id, record.trxmodel_id)
				form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
				form.setValue(obj.txt_inquiryselect_id, record.inquiryselect_id);
				form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
				form.setValue(obj.txt_owner_dept_id, record.owner_dept_id);
				form.setValue(obj.txt_orderout_dept_id, record.orderout_dept_id);
				form.setValue(obj.txt_user_dept_id, record.user_dept_id);
				form.setValue(obj.txt_project_id, record.project_id);
				form.setValue(obj.txt_projecttask_id, record.projecttask_id);
				form.setValue(obj.txt_projbudget_id, record.projbudget_id);
				form.setValue(obj.txt_projbudgettask_id, record.projbudgettask_id);						
						`
					})
				},
										
				recv_ref: { text: 'Reference', type: dbtype.varchar(90), null: false, options: { } },
				recv_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				recv_date: {text:'Date Receive', type: dbtype.date, null:false},

				partner_id: {
					text:'Receive From', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

	
				site_id: {
					text:'Receive At', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},

				empl_id: {
					text:'Receive By', type: dbtype.varchar(30), null:true, 
					options: { required: true, invalidMessage: 'Receive By harus diisi'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},				

				recv_dept_id: {
					text: 'Receiver Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'recv_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				trxmodel_id: {
					text:'Model Trx', type: dbtype.varchar(10), null:false, suppresslist: true, 
					reference: {table: 'mst_trxmodel', field_value: 'trxmodel_id'},
					options: {disabled: true}
				},
				
				inquirymodel_id: { text: 'Inquiry Model', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquirymodel', field_value: 'inquirymodel_id'}, options: { required: true, invalidMessage: 'Inquiry Model harus diisi', disabled: true } },
				inquiryselect_id: { text: 'Inquiry Select', type: dbtype.varchar(1),  null: false, suppresslist: true, reference: {table: 'mst_inquiryselect', field_value: 'inquiryselect_id'}, options: { required: true, invalidMessage: 'Inquiry Select harus diisi', disabled: true } },
				itemmanage_id: { text: 'Item Manage As', type: dbtype.varchar(2),  null: false, suppresslist: true, reference: {table: 'mst_itemmanage', field_value: 'itemmanage_id'}, options: { required: true, invalidMessage: 'Item Manage Model harus diisi', disabled: true } },
				owner_dept_id: { text: 'Owner Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Owner Dept harus diisi', disabled: true } },
				orderout_dept_id: { text: 'Orderout Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Orderout Dept harus diisi', disabled: true } },
				user_dept_id: { text: 'User Dept', type: dbtype.varchar(30),  null: false, suppresslist: true, reference: {table: 'mst_dept', field_value: 'dept_id'}, options: { required: true, invalidMessage: 'Owner Dept harus diisi', disabled: true } },

				project_id: { text: 'Project', type: dbtype.varchar(30),  null: true, suppresslist: true, reference: {table: 'mst_project', field_value: 'project_id'}, options: { disabled: true } },
				projecttask_id: { text: 'Project Task', type: dbtype.varchar(14),  null: true, suppresslist: true, reference: {table: 'mst_projecttask', field_value: 'projecttask_id'}, options: { disabled: true } },
				projbudget_id: { text: 'Budget', type: dbtype.varchar(30),  null: true, suppresslist: true, reference: {table: 'mst_projbudget', field_value: 'projbudget_id'}, options: { disabled: true } },
				projbudgettask_id: { text: 'Budget Task', type: dbtype.varchar(14),  null: true, suppresslist: true, reference: {table: 'mst_projbudgettask', field_value: 'projbudgettask_id'}, options: { disabled: true } },


				recv_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				recv_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				recv_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				recv_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				recv_isrecv: {text:'Received', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				recv_recvby: {text:'ReceivedBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				recv_recvdate: {text:'ReceivedDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				recv_ispost: {text:'Post', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				recv_postby: {text:'PostBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				recv_postdate: {text:'PostDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
			},
			
			defaultsearch: ['recv_id', 'recv_descr']
		},


		'trn_recvitem' : {
			comment: 'Item yang di receive',
			primarykeys: ['recvitem_id'],		
			data: {
				recvitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'local: list-get-itemasset'
					})				
				},

				item_id: { 
					text: 'Item', type: dbtype.varchar(14),  null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'local: list-get-item'
					})				
				},

				itemstock_id: { 
					text: 'Item Stock', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'local: list-get-itemstock'
					})				
				},				

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true,  suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14),  null: false,  suppresslist: true,
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				recvitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				recvitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				recvitem_value: { text: 'Value', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				curr_id: {
					text:'Currency', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'mst_curr', field_value: 'curr_id'},
					options: {disabled: true}
				},
				recvitem_idr: { text: 'IDR', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, options: {disabled: true}},
				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},

				orderout_id: {
					text:'Order Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_orderout', field_value: 'orderout_id'},
					options: {disabled: true}
				},

				orderoutitem_id: {
					text:'Order Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_orderoutitem', field_value: 'orderoutitem_id'},
					options: {disabled: true}
				},

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

				recv_id: { text: 'Order', type: dbtype.varchar(30), null: false },
			}
		},	
		
		'trn_recvitemreg' : {
			comment: 'Item yang di receive',
			primarykeys: ['recvitemreg_id'],		
			data: {
				recvitemreg_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				recvitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { disabled: true }},

				recvitem_serial: { text: 'Serial', type: dbtype.varchar(90), null: true,  options: { required: true, invalidMessage: 'serial harus diisi' } },

				item_id: { text: 'Item', type: dbtype.varchar(14), null:false, default:0, suppresslist: true, reference: {table: 'mst_item', field_value: 'item_id'}, options: {disabled: true}},
				itemclass_id: { text: 'Itemclass', type: dbtype.varchar(14), null:false, default:0, suppresslist: true, reference: {table: 'mst_itemclass', field_value: 'itemclass_id'}, options: {disabled: true}},

				recvitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				recvitem_value: { text: 'Value', type: dbtype.int(14,0), null:false, default:0, suppresslist: true},
				recvitem_idr: { text: 'IDR', type: dbtype.int(14,0), null:false, default:0, suppresslist: true},
			
				curr_id: { text: 'Curr', type: dbtype.varchar(10), null:false, default:0, suppresslist: true, reference: {table: 'mst_curr', field_value: 'curr_id'}, options: {disabled: true}},

				accbudget_id: { text: 'Acc Budget', type: dbtype.varchar(20),  null: true, suppresslist: true, reference: {table: 'mst_accbudget', field_value: 'accbudget_id'}, options: {disabled: true}},
				coa_id: { text: 'COA', type: dbtype.varchar(17),  null: true, suppresslist: true, reference: {table: 'mst_coa', field_value: 'coa_id'}, options: {disabled: true}},

				orderout_id: {
					text:'Order Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_orderout', field_value: 'orderout_id'},
					options: {disabled: true}
				},

				orderoutitem_id: {
					text:'Order Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_orderoutitem', field_value: 'orderoutitem_id'},
					options: {disabled: true}
				},

				request_id: {
					text:'Request Ref', type: dbtype.varchar(30), null:true, suppresslist: true, 
					reference: {table: 'trn_request', field_value: 'request_id'},
					options: {disabled: true}
				},

				requestitem_id: {
					text:'Request Detil Ref', type: dbtype.varchar(14), null:true, suppresslist: true, 
					reference: {table: 'trn_requestitem', field_value: 'requestitem_id'},
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

				recv_id: { text: 'Order', type: dbtype.varchar(30), null: false },

			}
		}

	},

	schema: {
		header: 'trn_recv',
		detils: {
			'items' : {title: 'Items', table: 'trn_recvitem', form: true, headerview: 'recvitem_descr' },
			'register' : {title: 'Registration', table: 'trn_recvitemreg', form: true, headerview: 'recvitem_descr' },
			'multiadd' : {title: 'Multi Add', table: 'trn_recvitem', form: false, headerview: 'recvitem_descr' }

			/* TODO:
			tambahkan referensi untuk additional cost via order
			*/ 
		}
	}


}