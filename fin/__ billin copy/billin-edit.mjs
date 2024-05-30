var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				
const pnl_trxmodel_id = $('#pnl_edit-trxmodel_id')
const pnl_billin_taxcode = $('#pnl_edit-billin_taxcode')
const pnl_orderout_id = $('#pnl_edit-orderout_id')
const pnl_recv_id = $('#pnl_edit-recv_id')
const pnl_billin_valfrgrate = $('#pnl_edit-billin_valfrgrate')
const pnl_banktransfer = $('#pnl_edit-banktransfer')
const pnl_entry = $('#pnl_edit-entry')
const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_billin_id: $('#pnl_edit-txt_billin_id'),
	cbo_billtype_id: $('#pnl_edit-cbo_billtype_id'),
	txt_billin_ref: $('#pnl_edit-txt_billin_ref'),
	txt_billin_descr: $('#pnl_edit-txt_billin_descr'),
	cbo_project_id: $('#pnl_edit-cbo_project_id'),
	cbo_projecttask_id: $('#pnl_edit-cbo_projecttask_id'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	dt_billin_date: $('#pnl_edit-dt_billin_date'),
	dt_billin_datedue: $('#pnl_edit-dt_billin_datedue'),
	cbo_trxmodel_id: $('#pnl_edit-cbo_trxmodel_id'),
	txt_billin_taxcode: $('#pnl_edit-txt_billin_taxcode'),
	cbo_orderout_id: $('#pnl_edit-cbo_orderout_id'),
	cbo_recv_id: $('#pnl_edit-cbo_recv_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_process_dept_id: $('#pnl_edit-cbo_process_dept_id'),
	cbo_projbudget_id: $('#pnl_edit-cbo_projbudget_id'),
	cbo_projbudgettask_id: $('#pnl_edit-cbo_projbudgettask_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_partnercontact_id: $('#pnl_edit-cbo_partnercontact_id'),
	txt_paymto_name: $('#pnl_edit-txt_paymto_name'),
	cbo_paymtype_id: $('#pnl_edit-cbo_paymtype_id'),
	cbo_partnerbank_id: $('#pnl_edit-cbo_partnerbank_id'),
	txt_paymto_bankacc: $('#pnl_edit-txt_paymto_bankacc'),
	txt_paymto_bankaccname: $('#pnl_edit-txt_paymto_bankaccname'),
	txt_paymto_bankname: $('#pnl_edit-txt_paymto_bankname'),
	txt_paymto_upname: $('#pnl_edit-txt_paymto_upname'),
	txt_paymto_upposition: $('#pnl_edit-txt_paymto_upposition'),
	txt_paymto_upphone: $('#pnl_edit-txt_paymto_upphone'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_billin_valfrgrate: $('#pnl_edit-txt_billin_valfrgrate'),
	txt_billin_valfrg: $('#pnl_edit-txt_billin_valfrg'),
	txt_billin_validr: $('#pnl_edit-txt_billin_validr'),
	txt_billin_notes: $('#pnl_edit-txt_billin_notes'),
	txt_billin_version: $('#pnl_edit-txt_billin_version'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	chk_billin_iscommit: $('#pnl_edit-chk_billin_iscommit'),
	txt_billin_commitby: $('#pnl_edit-txt_billin_commitby'),
	txt_billin_commitdate: $('#pnl_edit-txt_billin_commitdate'),
	chk_billin_isapprovalprogress: $('#pnl_edit-chk_billin_isapprovalprogress'),
	chk_billin_isapproved: $('#pnl_edit-chk_billin_isapproved'),
	txt_billin_approveby: $('#pnl_edit-txt_billin_approveby'),
	txt_billin_approvedate: $('#pnl_edit-txt_billin_approvedate'),
	chk_billin_isdeclined: $('#pnl_edit-chk_billin_isdeclined'),
	txt_billin_declineby: $('#pnl_edit-txt_billin_declineby'),
	txt_billin_declinedate: $('#pnl_edit-txt_billin_declinedate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


let form;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_billin_id,
		autoid: true,
		logview: 'trn_billin',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	})



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_decline.linkbutton({ onClick: () => {
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var reason = $(`#${id}`).textbox('getValue');
				btn_action_click({ action: 'decline', reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var obj_reason = $(`#${id}`);
			var txt = obj_reason.textbox('textbox');
			txt[0].maxLength = 255;
			txt[0].classList.add('declinereasonbox');
			txt[0].addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.css('text-align', 'center');
			txt.focus();
		})
	}});				
				




	new fgta4slideselect(obj.cbo_billtype_id, {
		title: 'Pilih billtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billtype_id,
		fieldValue: 'billtype_id',
		fieldValueMap: 'billtype_id',
		fieldDisplay: 'billtype_name',
		fields: [
			{mapping: 'billtype_id', text: 'billtype_id'},
			{mapping: 'billtype_name', text: 'billtype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.billtype_direction = 'IN';
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				formformat_bybilltype(record.billtype_id);
				
				form.setValue(obj.cbo_dept_id, '0', '-- PILIH --')
				reset_dept_related();
			}
		}
	})				


	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {

		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelecting: (value, display, record, arg) => {},
		OnSelected: (value, display, record, arg) => {
			if (value != arg.PreviousValue) {
				reset_dept_related()
			}
		}
	})	


	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih project_id',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.dept_id = form.getValue(obj.cbo_dept_id)
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, arg) => {
			if (value != arg.PreviousValue) {
				form.setValue(obj.cbo_projecttask_id, '--NULL--', 'NONE')
				form.setValue(obj.cbo_projbudget_id, '--NULL--', 'NONE')
				form.setValue(obj.cbo_projbudgettask_id, '--NULL--', 'NONE')
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projecttask_id, {
		title: 'Pilih projecttask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projecttask_id,
		fieldValue: 'projecttask_id',
		fieldValueMap: 'projecttask_id',
		fieldDisplay: 'projecttask_name',
		fields: [
			{mapping: 'projecttask_id', text: 'projecttask_id'},
			{mapping: 'projecttask_name', text: 'projecttask_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.project_id = form.getValue(obj.cbo_project_id)
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projecttask_id:'--NULL--', projecttask_name:'NONE'});	
		},
		OnSelected: (value, display, record, arg) => {
			if (value != arg.PreviousValue) {
				form.setValue(obj.cbo_projbudgettask_id, '', '')
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_periodemo_id, {
		title: 'Pilih periodemo_id',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,
		fieldValue: 'periodemo_id',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{mapping: 'periodemo_id', text: 'periodemo_id'},
			{mapping: 'periodemo_name', text: 'periodemo_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_trxmodel_id, {
		title: 'Pilih trxmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_trxmodel_id,
		fieldValue: 'trxmodel_id',
		fieldValueMap: 'trxmodel_id',
		fieldDisplay: 'trxmodel_name',
		fields: [
			{mapping: 'trxmodel_id', text: 'trxmodel_id'},
			{mapping: 'trxmodel_name', text: 'trxmodel_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.trxmodel_direction = 'OUT'
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({trxmodel_id:'--NULL--', trxmodel_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {
		}
	})				
				
	new fgta4slideselect(obj.cbo_orderout_id, {
		title: 'Pilih Order',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-orderout`,
		fieldValue: 'orderout_id',
		fieldValueMap: 'orderout_id',
		fieldDisplay: 'orderout_descr',
		fields: [
			{mapping: 'orderout_id', text: 'orderout_id'},
			{mapping: 'orderout_descr', text: 'orderout_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			if (obj.cbo_orderout_id.ismandatory) {
			} else {
				result.records.unshift({orderout_id:'--NULL--', orderout_descr:'NONE'});
			}
		},
		OnSelected: (value, display, record, arg) => {
			console.log(record);
			
			if (value != arg.PreviousValue) {
				form.setValue(obj.cbo_recv_id, '--NULL--', 'NONE')
				form.setValue(obj.cbo_partner_id, '0', '-- PILIH --')
				if (record.recv_id!=null) {
					form.setValue(obj.cbo_recv_id, record.recv_id, record.recv_descr)
				} else {
					obj.cbo_recv_id.reset();
				}
				form.setValue(obj.cbo_project_id, record.project_id, record.project_name)
				form.setValue(obj.txt_billin_descr, record.orderout_descr)
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name)

				if (record.projbudget_id!=null) {
					form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
				} else {
					obj.cbo_projbudget_id.reset();
				}
				if (record.projbudgettask_id!=null) {
					form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_descr)
				} else {
					obj.cbo_projbudgettask_id.reset();
				}
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
				form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_rate)
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_recv_id, {
		title: 'Pilih Receiving',
		returnpage: this_page_id,
		api: $ui.apis.load_recv_id,
		fieldValue: 'recv_id',
		fieldValueMap: 'recv_id',
		fieldDisplay: 'recv_descr',
		fields: [
			{mapping: 'recv_id', text: 'recv_id'},
			{mapping: 'recv_descr', text: 'recv_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({recv_id:'--NULL--', recv_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
			
				
	new fgta4slideselect(obj.cbo_process_dept_id, {
		title: 'Pilih process_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_process_dept_id,
		fieldValue: 'process_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_projbudget_id, {
		title: 'Pilih projbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudget_id,
		fieldValue: 'projbudget_id',
		fieldValueMap: 'projbudget_id',
		fieldDisplay: 'projbudget_name',
		fields: [
			{mapping: 'projbudget_id', text: 'projbudget_id'},
			{mapping: 'projbudget_name', text: 'projbudget_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.project_id = form.getValue(obj.cbo_project_id)
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudget_id:'--NULL--', projbudget_name:'NONE'});	
		},
		OnSelected: (value, display, record, arg) => {
			if (value != arg.PreviousValue) {
				form.setValue(obj.cbo_projbudgettask_id, '', '')
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projbudgettask_id, {
		title: 'Pilih projbudgettask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudgettask_id,
		fieldValue: 'projbudgettask_id',
		fieldValueMap: 'projbudgettask_id',
		fieldDisplay: 'projbudgettask_name',
		fields: [
			{mapping: 'projbudgettask_id', text: 'projbudgettask_id'},
			{mapping: 'projbudgettask_name', text: 'projbudgettask_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.id = form.getValue(obj.cbo_projbudget_id)
			criteria.projecttask_id = form.getValue(obj.cbo_projecttask_id)
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgettask_id:'--NULL--', projbudgettask_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.txt_paymto_name, record.partner_name)
		}
	})
	
	new fgta4slideselect(obj.cbo_partnercontact_id, {
		title: 'Pilih Contact Partner',
		returnpage: this_page_id,
		api: $ui.apis.load_partnercontact_id,
		fieldValue: 'partnercontact_id',
		fieldValueMap: 'partnercontact_id',
		fieldDisplay: 'partnercontact_name',
		fields: [
			{mapping: 'partnercontact_id', text: 'ID'},
			{mapping: 'partnercontact_name', text: 'Nama'},
			{mapping: 'partnercontact_position', text: 'Position'},
		],
		OnDataLoading: (criteria) => {
			criteria.id = form.getValue(obj.cbo_partner_id);
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.txt_paymto_upname, record.partnercontact_name)
			form.setValue(obj.txt_paymto_upposition, record.partnercontact_position)
			form.setValue(obj.txt_paymto_upphone, record.partnercontact_mobilephone)
		}
	})	

	new fgta4slideselect(obj.cbo_partnerbank_id, {
		title: 'Pilih Bank Partner',
		returnpage: this_page_id,
		api: $ui.apis.load_partnerbank_id,
		fieldValue: 'partnerbank_id',
		fieldValueMap: 'partnerbank_id',
		fieldDisplay: 'partnerbank_accnum',
		fields: [
			{mapping: 'partnerbank_id', text: 'ID'},
			{mapping: 'partnerbank_accnum', text: 'Account'},
			{mapping: 'partnerbank_accname', text: 'Account Name'},
			{mapping: 'bank_name', text: 'Bank'},
		],
		OnDataLoading: (criteria) => {
			criteria.id = form.getValue(obj.cbo_partner_id);
		},
		OnDataLoaded : (result, options) => {
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.txt_paymto_bankacc, record.partnerbank_accnum)
			form.setValue(obj.txt_paymto_bankaccname, record.partnerbank_accname)
			form.setValue(obj.txt_paymto_bankname, record.bank_name)
		}
	})	


				
	new fgta4slideselect(obj.cbo_paymtype_id, {
		title: 'Pilih paymtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_paymtype_id,
		fieldValue: 'paymtype_id',
		fieldValueMap: 'paymtype_id',
		fieldDisplay: 'paymtype_name',
		fields: [
			{mapping: 'paymtype_id', text: 'paymtype_id'},
			{mapping: 'paymtype_name', text: 'paymtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			formformat_bypaymtype(record.paymtype_id, record);

		}
	})				
				
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih Currency',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {
			formformat_bycurr(record.curr_id, record);
			form.setValue(obj.txt_billin_valfrgrate, record.curr_rate);
		}

	})				
				
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldValueMap: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {}
	})				
				

	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})

	//button state

}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {

	form.setDisable(obj.cbo_billtype_id, true);

	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		formformat_bybilltype(result.record.billtype_id, result.record);
		formformat_bypaymtype(result.record.paymtype_id, result.record);
		formformat_bycurr(result.record.curr_id, result.record);

		console.log(result.record);

		updatefilebox(result.record);

		if (result.record.projecttask_id==null) { result.record.projecttask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.trxmodel_id==null) { result.record.trxmodel_id='--NULL--'; result.record.trxmodel_name='NONE'; }
		if (result.record.orderout_id==null) { result.record.orderout_id='--NULL--'; result.record.orderout_descr='NONE'; }
		if (result.record.recv_id==null) { result.record.recv_id='--NULL--'; result.record.recv_descr='NONE'; }
		if (result.record.projbudget_id==null) { result.record.projbudget_id='--NULL--'; result.record.projbudget_name='NONE'; }
		if (result.record.projbudgettask_id==null) { result.record.projbudgettask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.partnerbank_id==null) { result.record.partnerbank_id='--NULL--'; result.record.partnerbank_accnum='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_billtype_id, result.record.billtype_id, result.record.billtype_name)
			.setValue(obj.cbo_project_id, result.record.project_id, result.record.project_name)
			.setValue(obj.cbo_projecttask_id, result.record.projecttask_id, result.record.projecttask_name)
			.setValue(obj.cbo_periodemo_id, result.record.periodemo_id, result.record.periodemo_name)
			.setValue(obj.cbo_trxmodel_id, result.record.trxmodel_id, result.record.trxmodel_name)
			.setValue(obj.cbo_orderout_id, result.record.orderout_id, result.record.orderout_descr)
			.setValue(obj.cbo_recv_id, result.record.recv_id, result.record.recv_descr)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.setValue(obj.cbo_process_dept_id, result.record.process_dept_id, result.record.process_dept_name)
			.setValue(obj.cbo_projbudget_id, result.record.projbudget_id, result.record.projbudget_name)
			.setValue(obj.cbo_projbudgettask_id, result.record.projbudgettask_id, result.record.projecttask_name)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_partnerbank_id, result.record.partnerbank_id, result.record.partnerbank_accnum)
			.setValue(obj.cbo_partnercontact_id, result.record.partnercontact_id, result.record.partnercontact_name)
			.setValue(obj.cbo_paymtype_id, result.record.paymtype_id, result.record.paymtype_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_doc_id, result.record.doc_id, result.record.doc_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		updatebuttonstate(result.record)
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {

	form.setDisable(obj.cbo_billtype_id, false);

	form.createnew(async (data, options)=>{
		// console.log(global.setup);
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.billin_date = global.now()
		data.billin_datedue = global.now()
		data.billin_valfrgrate = 0
		data.billin_valfrg = 0
		data.billin_validr = 0
		data.billin_version = 0
		data.billin_iscommit = '0'
		data.billin_isapprovalprogress = '0'
		data.billin_isapproved = '0'
		data.billin_isdeclined = '0'

		data.billtype_id = '0'
		data.billtype_name = '-- PILIH --'
		data.project_id = '0'
		data.project_name = '-- PILIH --'
		data.projecttask_id = '--NULL--'
		data.projecttask_name = 'NONE'
		data.periodemo_id = '0'
		data.periodemo_name = '-- PILIH --'
		data.trxmodel_id = '0'
		data.trxmodel_name = '-- PILIH --'
		data.orderout_id = '--NULL--'
		data.orderout_descr = 'NONE'
		data.recv_id = '--NULL--'
		data.recv_descr = 'NONE'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.process_dept_id = global.setup.dept_id
		data.process_dept_name = global.setup.dept_name
		data.projbudget_id = '0'
		data.projbudget_name = '-- PILIH --'
		data.projbudgettask_id = '--NULL--'
		data.projbudgettask_name = 'NONE'
		data.projecttask_name = 'NONE'
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.partnercontact_id = '0'
		data.partnercontact_name = '-- PILIH --'
		data.partnerbank_id = '--NULL--'
		data.partnerbank_name = 'NONE'
		data.paymtype_id = '0'
		data.paymtype_name = '-- PILIH --'
		data.curr_id = '0'
		data.curr_name = '-- PILIH --'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id


		formformat_bybilltype();
		formformat_bypaymtype();
		formformat_bycurr();



		rec_commitby.html('');
		rec_commitdate.html('');
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		




		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpaymgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		var header_data = form.getData()
		header_data.projbudget_name = obj.cbo_projbudget_id.combo('getText');
		header_data.curr_name = obj.cbo_curr_id.combo('getText');
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.billin_commitby);
		rec_commitdate.html(record.billin_commitdate);
		
		rec_approveby.html(record.billin_approveby);
		rec_approvedate.html(record.billin_approvedate);
		rec_declineby.html(record.billin_declineby);
		rec_declinedate.html(record.billin_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.billin_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.billin_isdeclined=="1" || record.billin_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.billin_isapproved=="1" || record.billin_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.billin_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.billin_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(false);
		} 
	
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
				
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'billin_iscommit';
	updategriddata[col_commit] = record.billin_iscommit;	
	
	var col_approveprogress = 'billin_isapprovalprogress';
	var col_approve = 'billin_isapprove'
	var col_decline = "billin_isdeclined"
	updategriddata[col_approveprogress] = record.billin_isapprovalprogress;
	updategriddata[col_approve] = record.billin_isapproved;
	updategriddata[col_decline] = record.billin_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_billin_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server


	options.skipmappingresponse = [
	 	  "projecttask_id"
		, "trxmodel_id"
		, "purchorder_id"
		, "purchrecv_id"
		, "projbudget_id"
		, "projbudgettask_id"
		, "partnerbank_id"
	];	

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_projecttask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projecttask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_trxmodel_id, result.dataresponse.trxmodel_name!=='--NULL--' ? result.dataresponse.trxmodel_id : '--NULL--', result.dataresponse.trxmodel_name!=='--NULL--'?result.dataresponse.trxmodel_name:'NONE')
	form.setValue(obj.cbo_orderout_id, result.dataresponse.orderout_descr!=='--NULL--' ? result.dataresponse.orderout_id : '--NULL--', result.dataresponse.orderout_descr!=='--NULL--'?result.dataresponse.orderout_descr:'NONE')
	form.setValue(obj.cbo_recv_id, result.dataresponse.recv_descr!=='--NULL--' ? result.dataresponse.recv_id : '--NULL--', result.dataresponse.recv_descr!=='--NULL--'?result.dataresponse.recv_descr:'NONE')
	form.setValue(obj.cbo_projbudget_id, result.dataresponse.projbudget_name!=='--NULL--' ? result.dataresponse.projbudget_id : '--NULL--', result.dataresponse.projbudget_name!=='--NULL--'?result.dataresponse.projbudget_name:'NONE')
	form.setValue(obj.cbo_projbudgettask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projbudgettask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_partnerbank_id, result.dataresponse.partnerbank_accnum!=='--NULL--' ? result.dataresponse.partnerbank_id : '--NULL--', result.dataresponse.partnerbank_accnum!=='--NULL--'?result.dataresponse.partnerbank_accnum:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_billin_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/billin.xprint?id=' + id;

	var print_to_new_window = global.setup.print_to_new_window;
	var debug = false;
	var debug = false;
	if (debug || print_to_new_window) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	






async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Bill'
	var txt_version = obj.txt_billin_version;
	var chk_iscommit = obj.chk_billin_iscommit;
	
	var chk_isapprovalprogress = obj.chk_billin_isapprovalprogress;	
	var chk_isapprove = obj.chk_billin_isapproved;
	var chk_isdeclined = obj.chk_billin_isdeclined;
		
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
			chk_isapprove.checkbox('uncheck');
		
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
			chk_isapprove.checkbox('uncheck');
			chk_isdeclined.checkbox('uncheck');
		
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
				form.commit();
			}
			break;		
			
	}


	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				updaterecordstatus(result.dataresponse);
				args.act_do(result);
				updatebuttonstate(result.dataresponse);
				updategridstate(result.dataresponse);
				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	


function formformat_bybilltype(billtype_id, record) {
	var view_pnl_entry = false;
	var view_txt_billin_taxcode = false;
	var view_cbo_orderout_id = false;
	var view_cbo_recv_id = false;
	var orderout_is_mandatory = false;

	if (billtype_id=='ADV') {
		view_pnl_entry = true;
		view_txt_billin_taxcode = false;
		view_cbo_orderout_id = false;
		view_cbo_recv_id = false; 
		orderout_is_mandatory = false
	} else if (billtype_id=='INV') {
		view_pnl_entry = true;
		view_txt_billin_taxcode = true;
		view_cbo_orderout_id = true;
		view_cbo_recv_id = true; 
		orderout_is_mandatory = true
	} else if (billtype_id=='RMB') {
		view_pnl_entry = true;
		view_txt_billin_taxcode = false;
		view_cbo_orderout_id = false;
		view_cbo_recv_id = false; 
		orderout_is_mandatory = false
	} 

	if (view_pnl_entry) { pnl_entry.show() } else { pnl_entry.hide() }
	if (view_txt_billin_taxcode) { pnl_billin_taxcode.show() } else { pnl_billin_taxcode.hide() }
	if (view_cbo_orderout_id) { pnl_orderout_id.show() } else { pnl_orderout_id.hide() }
	if (view_cbo_recv_id) { pnl_recv_id.show() } else { pnl_recv_id.hide() }
	// if (view_cbo_orderout_id) { pnl_orderout_id.show() } else { pnl_orderout_id.show() }
	// if (view_cbo_recv_id) { pnl_recv_id.show() } else { pnl_recv_id.show() }


	obj.cbo_orderout_id.ismandatory = orderout_is_mandatory;
	if (obj.cbo_orderout_id.ismandatory) {
		obj.cbo_orderout_id.revalidate({
			required: true,
			invalidMessage:  'Order harus harus diisi',
			validType: "requiredcombo['pnl_edit-cbo_orderout_id']",
			prompt: '-- PILIH --'
		});
	} else {
		obj.cbo_orderout_id.revalidate({
			required: false,
			invalidMessage:  null,
			validType: null,
			prompt: 'NONE'
		});
	}


}

function formformat_bypaymtype(paymtype_id, record) {
	var view_pnl_banktransfer = false;

	if (paymtype_id=='TR' || paymtype_id=='GI') {
		view_pnl_banktransfer = true
	} else {
		view_pnl_banktransfer = false
	} 

	if (view_pnl_banktransfer) {pnl_banktransfer.show()} else {pnl_banktransfer.hide()}
}
	
function formformat_bycurr(curr_id, record) {
	var view_pnl_billin_valfrgrate = false;
	if (record) {
		if (record.curr_islocal=='1') {
			view_pnl_billin_valfrgrate = false;
		} else {
			view_pnl_billin_valfrgrate = true;
		}
	} else {
		view_pnl_billin_valfrgrate = false
	}
	if (view_pnl_billin_valfrgrate) {pnl_billin_valfrgrate.show()} else {pnl_billin_valfrgrate.hide()}
}

function reset_dept_related() {
	// if (obj.cbo_orderout_id.ismandatory) {
	// 	form.setValue(obj.cbo_orderout_id, '0', '-- PILIH --');
	// } else {
	// 	form.setValue(obj.cbo_orderout_id, '--NULL--', 'NONE');
	// }


	obj.cbo_orderout_id.reset();

	obj.cbo_projbudget_id.reset();

	form.setValue(obj.cbo_recv_id, '--NULL--', 'NONE')
	form.setValue(obj.cbo_project_id, '0', '-- PILIH --')
	form.setValue(obj.cbo_projecttask_id, '--NULL--', 'NONE')
	form.setValue(obj.cbo_trxmodel_id, '0', '-- PILIH --')
	// form.setValue(obj.cbo_projbudget_id, '--NULL--', 'NONE')
	form.setValue(obj.cbo_projbudgettask_id, '--NULL--', 'NONE')
	form.setValue(obj.cbo_partner_id, '0', '-- PILIH --')
	form.setValue(obj.cbo_curr_id, '0', '-- PILIH --')

	form.setValue(obj.txt_billin_valfrgrate, 1);
	formformat_bycurr()
}
	
