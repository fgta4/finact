var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './inquiry-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_inquiry_id: $('#pnl_edit-txt_inquiry_id'),
	cbo_inquirytype_id: $('#pnl_edit-cbo_inquirytype_id'),
	cbo_request_dept_id: $('#pnl_edit-cbo_request_dept_id'),
	txt_inquiry_descr: $('#pnl_edit-txt_inquiry_descr'),
	dt_inquiry_dtstart: $('#pnl_edit-dt_inquiry_dtstart'),
	dt_inquiry_dtend: $('#pnl_edit-dt_inquiry_dtend'),
	cbo_user_dept_id: $('#pnl_edit-cbo_user_dept_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	chk_inquiry_isadvance: $('#pnl_edit-chk_inquiry_isadvance'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_partner_name: $('#pnl_edit-txt_partner_name'),
	cbo_paymtype_id: $('#pnl_edit-cbo_paymtype_id'),
	chk_paymtype_isviabank: $('#pnl_edit-chk_paymtype_isviabank'),
	cbo_partnerbank_id: $('#pnl_edit-cbo_partnerbank_id'),
	txt_paymto_bankacc: $('#pnl_edit-txt_paymto_bankacc'),
	txt_paymto_bankaccname: $('#pnl_edit-txt_paymto_bankaccname'),
	txt_paymto_bankname: $('#pnl_edit-txt_paymto_bankname'),
	cbo_partnercontact_id: $('#pnl_edit-cbo_partnercontact_id'),
	txt_partnercontact_upname: $('#pnl_edit-txt_partnercontact_upname'),
	txt_partnercontact_position: $('#pnl_edit-txt_partnercontact_position'),
	txt_partnercontact_upphone: $('#pnl_edit-txt_partnercontact_upphone'),
	txt_partnercontact_email: $('#pnl_edit-txt_partnercontact_email'),
	cbo_project_id: $('#pnl_edit-cbo_project_id'),
	cbo_projecttask_id: $('#pnl_edit-cbo_projecttask_id'),
	chk_inquiry_isunbudgetted: $('#pnl_edit-chk_inquiry_isunbudgetted'),
	cbo_projbudget_id: $('#pnl_edit-cbo_projbudget_id'),
	cbo_projbudgettask_id: $('#pnl_edit-cbo_projbudgettask_id'),
	cbo_site_id: $('#pnl_edit-cbo_site_id'),
	txt_deliver_siteaddress: $('#pnl_edit-txt_deliver_siteaddress'),
	txt_deliver_city: $('#pnl_edit-txt_deliver_city'),
	txt_deliver_upname: $('#pnl_edit-txt_deliver_upname'),
	txt_deliver_uptelp: $('#pnl_edit-txt_deliver_uptelp'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_inquiry_version: $('#pnl_edit-txt_inquiry_version'),
	txt_inquiry_rejectnotes: $('#pnl_edit-txt_inquiry_rejectnotes'),
	txt_inquirymodel_id: $('#pnl_edit-txt_inquirymodel_id'),
	txt_itemmanage_id: $('#pnl_edit-txt_itemmanage_id'),
	chk_inquiry_isindependentsetting: $('#pnl_edit-chk_inquiry_isindependentsetting'),
	chk_inquiryselect_isshowitemasset: $('#pnl_edit-chk_inquiryselect_isshowitemasset'),
	chk_inquiryselect_isshowitem: $('#pnl_edit-chk_inquiryselect_isshowitem'),
	chk_inquiryselect_isshowitemstock: $('#pnl_edit-chk_inquiryselect_isshowitemstock'),
	chk_inquiryselect_isshowpartner: $('#pnl_edit-chk_inquiryselect_isshowpartner'),
	chk_inquiryselect_isshowitemclass: $('#pnl_edit-chk_inquiryselect_isshowitemclass'),
	chk_inquiryselect_isitemclassdisabled: $('#pnl_edit-chk_inquiryselect_isitemclassdisabled'),
	chk_inquirytype_isuseqty: $('#pnl_edit-chk_inquirytype_isuseqty'),
	chk_inquirytype_isusedays: $('#pnl_edit-chk_inquirytype_isusedays'),
	chk_inquirytype_isusetask: $('#pnl_edit-chk_inquirytype_isusetask'),
	chk_inquirytype_isdateinterval: $('#pnl_edit-chk_inquirytype_isdateinterval'),
	chk_inquirytype_istoberequest: $('#pnl_edit-chk_inquirytype_istoberequest'),
	chk_inquirytype_isautorequest: $('#pnl_edit-chk_inquirytype_isautorequest'),
	chk_inquirytype_isautoorder: $('#pnl_edit-chk_inquirytype_isautoorder'),
	chk_inquirytype_ismovinginit: $('#pnl_edit-chk_inquirytype_ismovinginit'),
	chk_inquirytype_islimitqty: $('#pnl_edit-chk_inquirytype_islimitqty'),
	chk_inquirytype_islimitdays: $('#pnl_edit-chk_inquirytype_islimitdays'),
	chk_inquirytype_islimittask: $('#pnl_edit-chk_inquirytype_islimittask'),
	chk_inquirytype_islimitvalue: $('#pnl_edit-chk_inquirytype_islimitvalue'),
	chk_inquirytype_isallowunbudget: $('#pnl_edit-chk_inquirytype_isallowunbudget'),
	chk_inquirytype_isallowitemunbudget: $('#pnl_edit-chk_inquirytype_isallowitemunbudget'),
	chk_inquirytype_isallowoverbudget: $('#pnl_edit-chk_inquirytype_isallowoverbudget'),
	chk_inquirytype_isallowadvance: $('#pnl_edit-chk_inquirytype_isallowadvance'),
	chk_inquirytype_isemplaspartner: $('#pnl_edit-chk_inquirytype_isemplaspartner'),
	txt_inquirytype_maxadvancevalue: $('#pnl_edit-txt_inquirytype_maxadvancevalue'),
	chk_inquiry_iscommit: $('#pnl_edit-chk_inquiry_iscommit'),
	txt_inquiry_commitby: $('#pnl_edit-txt_inquiry_commitby'),
	txt_inquiry_commitdate: $('#pnl_edit-txt_inquiry_commitdate'),
	chk_inquiry_isapprovalprogress: $('#pnl_edit-chk_inquiry_isapprovalprogress'),
	chk_inquiry_isapproved: $('#pnl_edit-chk_inquiry_isapproved'),
	txt_inquiry_approveby: $('#pnl_edit-txt_inquiry_approveby'),
	txt_inquiry_approvedate: $('#pnl_edit-txt_inquiry_approvedate'),
	chk_inquiry_isdeclined: $('#pnl_edit-chk_inquiry_isdeclined'),
	txt_inquiry_declineby: $('#pnl_edit-txt_inquiry_declineby'),
	txt_inquiry_declinedate: $('#pnl_edit-txt_inquiry_declinedate'),
	chk_inquiry_ispreparing: $('#pnl_edit-chk_inquiry_ispreparing'),
	chk_inquiry_isprepared: $('#pnl_edit-chk_inquiry_isprepared'),
	txt_inquiry_preparedby: $('#pnl_edit-txt_inquiry_preparedby'),
	txt_inquiry_prepareddate: $('#pnl_edit-txt_inquiry_prepareddate'),
	chk_inquiry_isreject: $('#pnl_edit-chk_inquiry_isreject'),
	txt_inquiry_rejectby: $('#pnl_edit-txt_inquiry_rejectby'),
	txt_inquiry_rejectdate: $('#pnl_edit-txt_inquiry_rejectdate'),
	chk_inquiry_iscomplete: $('#pnl_edit-chk_inquiry_iscomplete'),
	chk_inquiry_isclose: $('#pnl_edit-chk_inquiry_isclose'),
	txt_inquiry_closeby: $('#pnl_edit-txt_inquiry_closeby'),
	txt_inquiry_closedate: $('#pnl_edit-txt_inquiry_closedate'),
	chk_inquiry_isautogenerated: $('#pnl_edit-chk_inquiry_isautogenerated')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;

	if (opt.settings.btn_edit_visible===false) {
		btn_edit.hide();
	} 

	if (opt.settings.btn_save_visible===false) {
		btn_save.hide();
	} 

	if (opt.settings.btn_delete_visible===false) {
		btn_delete.hide();
	} 

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_inquiry_id,
		autoid: true,
		logview: 'trn_inquiry',
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
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}


	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	


	btn_commit.linkbutton({ onClick: async () => { 
		var args = { action: 'commit', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

	btn_uncommit.linkbutton({ onClick: async () => { 
		var args = { action: 'uncommit', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

			


	btn_approve.linkbutton({ onClick: async () => { 
		var args = { action: 'approve', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

	btn_decline.linkbutton({ onClick: async () => {
		var args = { action: 'decline', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
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
				btn_action_click({ action: args.action, param: args.param, reason: reason }); 
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
				
	// Generator: Xtion Handler not exist
	// Generator: Object Handler not exist

	// Generator: Upload Handler not exist


	obj.cbo_inquirytype_id.name = 'pnl_edit-cbo_inquirytype_id'		
	new fgta4slideselect(obj.cbo_inquirytype_id, {
		title: 'Pilih Type Inquiry',
		returnpage: this_page_id,
		api: $ui.apis.load_inquirytype_id,
		fieldValue: 'inquirytype_id',
		fieldDisplay: 'inquirytype_name',
		fields: [
			{mapping: 'inquirytype_id', text: 'inquirytype_id'},
			{mapping: 'inquirytype_name', text: 'inquirytype_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_inquirytype_id_selected === 'function') {
					hnd.cbo_inquirytype_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_request_dept_id.name = 'pnl_edit-cbo_request_dept_id'		
	new fgta4slideselect(obj.cbo_request_dept_id, {
		title: 'Pilih Departemen Tujuan',
		returnpage: this_page_id,
		api: $ui.apis.load_request_dept_id,
		fieldValue: 'request_dept_id',
		fieldDisplay: 'request_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_user_dept_id.name = 'pnl_edit-cbo_user_dept_id'		
	new fgta4slideselect(obj.cbo_user_dept_id, {
		title: 'Pilih Dept User',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,
		fieldValue: 'user_dept_id',
		fieldDisplay: 'user_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_empl_id.name = 'pnl_edit-cbo_empl_id'		
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih Karyawan',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_empl_id_dataloading === 'function') {
				hnd.cbo_empl_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_empl_id_selected === 'function') {
					hnd.cbo_empl_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_partner_id.name = 'pnl_edit-cbo_partner_id'		
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih Partner',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_partner_id_dataloading === 'function') {
				hnd.cbo_partner_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partner_id_selected === 'function') {
					hnd.cbo_partner_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_paymtype_id.name = 'pnl_edit-cbo_paymtype_id'		
	new fgta4slideselect(obj.cbo_paymtype_id, {
		title: 'Pilih Tipe Pembayaran',
		returnpage: this_page_id,
		api: $ui.apis.load_paymtype_id,
		fieldValue: 'paymtype_id',
		fieldDisplay: 'paymtype_name',
		fields: [
			{mapping: 'paymtype_id', text: 'paymtype_id'},
			{mapping: 'paymtype_name', text: 'paymtype_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_paymtype_id_selected === 'function') {
					hnd.cbo_paymtype_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_partnerbank_id.name = 'pnl_edit-cbo_partnerbank_id'		
	new fgta4slideselect(obj.cbo_partnerbank_id, {
		title: 'Pilih Rekening Bank Tujuan',
		returnpage: this_page_id,
		api: $ui.apis.load_partnerbank_id,
		fieldValue: 'partnerbank_id',
		fieldDisplay: 'partnerbank_accnum',
		fields: [
			{mapping: 'partnerbank_accnum', text: 'Account', style: 'width: 200px'},
			{mapping: 'partnerbank_accname', text: 'Name'},
			{mapping: 'bank_name', text: 'Bank', style: 'width: 200px'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_partnerbank_id_dataloading === 'function') {
				hnd.cbo_partnerbank_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partnerbank_id_selected === 'function') {
					hnd.cbo_partnerbank_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_partnercontact_id.name = 'pnl_edit-cbo_partnercontact_id'		
	new fgta4slideselect(obj.cbo_partnercontact_id, {
		title: 'Pilih Contact',
		returnpage: this_page_id,
		api: $ui.apis.load_partnercontact_id,
		fieldValue: 'partnercontact_id',
		fieldDisplay: 'partnercontact_name',
		fields: [
			{mapping: 'partnercontact_id', text: 'partnercontact_id'},
			{mapping: 'partnercontact_name', text: 'partnercontact_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_partnercontact_id_dataloading === 'function') {
				hnd.cbo_partnercontact_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partnercontact_id_selected === 'function') {
					hnd.cbo_partnercontact_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_project_id.name = 'pnl_edit-cbo_project_id'		
	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih Project',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'}
		],

	})				
				
	obj.cbo_projecttask_id.name = 'pnl_edit-cbo_projecttask_id'		
	new fgta4slideselect(obj.cbo_projecttask_id, {
		title: 'Pilih Task Project',
		returnpage: this_page_id,
		api: $ui.apis.load_projecttask_id,
		fieldValue: 'projecttask_id',
		fieldDisplay: 'projecttask_name',
		fields: [
			{mapping: 'projecttask_id', text: 'projecttask_id'},
			{mapping: 'projecttask_name', text: 'projecttask_name'}
		],

	})				
				
	obj.cbo_projbudget_id.name = 'pnl_edit-cbo_projbudget_id'		
	new fgta4slideselect(obj.cbo_projbudget_id, {
		title: 'Pilih Budget yang akan digunakan',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudget_id,
		fieldValue: 'projbudget_id',
		fieldDisplay: 'projbudget_name',
		fields: [
			{mapping: 'projbudget_id', text: 'projbudget_id'},
			{mapping: 'projbudget_name', text: 'projbudget_name'}
		],

	})				
				
	obj.cbo_projbudgettask_id.name = 'pnl_edit-cbo_projbudgettask_id'		
	new fgta4slideselect(obj.cbo_projbudgettask_id, {
		title: 'Pilih Task Budget',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudgettask_id,
		fieldValue: 'projbudgettask_id',
		fieldDisplay: 'projbudgettask_name',
		fieldDisplayMap: 'projecttask_notes',
		fields: [
			{mapping: 'projbudgettask_id', text: 'projbudgettask_id'},
			{mapping: 'projecttask_notes', text: 'projecttask_notes'}
		],

	})				
				
	obj.cbo_site_id.name = 'pnl_edit-cbo_site_id'		
	new fgta4slideselect(obj.cbo_site_id, {
		title: 'Pilih Lokasi',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,
		fieldValue: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_site_id_dataloading === 'function') {
				hnd.cbo_site_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_site_id_selected === 'function') {
					hnd.cbo_site_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_doc_id.name = 'pnl_edit-cbo_doc_id'		
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'}
		],

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
		var element = document.activeElement;
		element.blur();
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
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
			btn_action_click: (actionargs) => {
				if (typeof btn_action_click == 'function') {
					btn_action_click(actionargs);
				}
			}
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.empl_id==null) { result.record.empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		if (result.record.partnerbank_id==null) { result.record.partnerbank_id='--NULL--'; result.record.partnerbank_accnum='NONE'; }
		if (result.record.partnercontact_id==null) { result.record.partnercontact_id='--NULL--'; result.record.partnercontact_name='NONE'; }
		if (result.record.projecttask_id==null) { result.record.projecttask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.projbudgettask_id==null) { result.record.projbudgettask_id='--NULL--'; result.record.projbudgettask_name='NONE'; }

		*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}
  		updaterecordstatus(record)

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_inquirytype_id, record.inquirytype_id, record.inquirytype_name)
			.setValue(obj.cbo_request_dept_id, record.request_dept_id, record.request_dept_name)
			.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_paymtype_id, record.paymtype_id, record.paymtype_name)
			.setValue(obj.cbo_partnerbank_id, record.partnerbank_id, record.partnerbank_accnum)
			.setValue(obj.cbo_partnercontact_id, record.partnercontact_id, record.partnercontact_name)
			.setValue(obj.cbo_project_id, record.project_id, record.project_name)
			.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name)
			.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
			.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name)
			.setValue(obj.cbo_site_id, record.site_id, record.site_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.inquiry_dtstart = global.now()
		data.inquiry_dtend = global.now()
		data.inquiry_isadvance = '0'
		data.paymtype_isviabank = '0'
		data.inquiry_isunbudgetted = '0'
		data.inquiry_version = 0
		data.inquiry_isindependentsetting = '0'
		data.inquiryselect_isshowitemasset = '0'
		data.inquiryselect_isshowitem = '0'
		data.inquiryselect_isshowitemstock = '0'
		data.inquiryselect_isshowpartner = '0'
		data.inquiryselect_isshowitemclass = '0'
		data.inquiryselect_isitemclassdisabled = '0'
		data.inquirytype_isuseqty = '0'
		data.inquirytype_isusedays = '0'
		data.inquirytype_isusetask = '0'
		data.inquirytype_isdateinterval = '0'
		data.inquirytype_istoberequest = '0'
		data.inquirytype_isautorequest = '0'
		data.inquirytype_isautoorder = '0'
		data.inquirytype_ismovinginit = '0'
		data.inquirytype_islimitqty = '0'
		data.inquirytype_islimitdays = '0'
		data.inquirytype_islimittask = '0'
		data.inquirytype_islimitvalue = '0'
		data.inquirytype_isallowunbudget = '0'
		data.inquirytype_isallowitemunbudget = '0'
		data.inquirytype_isallowoverbudget = '0'
		data.inquirytype_isallowadvance = '0'
		data.inquirytype_isemplaspartner = '0'
		data.inquirytype_maxadvancevalue = 0
		data.inquiry_iscommit = '0'
		data.inquiry_isapprovalprogress = '0'
		data.inquiry_isapproved = '0'
		data.inquiry_isdeclined = '0'
		data.inquiry_ispreparing = '0'
		data.inquiry_isprepared = '0'
		data.inquiry_isreject = '0'
		data.inquiry_iscomplete = '0'
		data.inquiry_isclose = '0'
		data.inquiry_isautogenerated = '0'

		data.inquirytype_id = '0'
		data.inquirytype_name = '-- PILIH --'
		data.request_dept_id = '0'
		data.request_dept_name = '-- PILIH --'
		data.user_dept_id = global.setup.dept_id
		data.user_dept_name = global.setup.dept_name
		data.empl_id = global.setup.empl_id
		data.empl_name = global.setup.empl_name
		data.partner_id = '--NULL--'
		data.partner_name = 'NONE'
		data.paymtype_id = '0'
		data.paymtype_name = '-- PILIH --'
		data.partnerbank_id = '--NULL--'
		data.partnerbank_accnum = 'NONE'
		data.partnercontact_id = '--NULL--'
		data.partnercontact_name = 'NONE'
		data.project_id = '0'
		data.project_name = '-- PILIH --'
		data.projecttask_id = '--NULL--'
		data.projecttask_name = 'NONE'
		data.projbudget_id = '0'
		data.projbudget_name = '-- PILIH --'
		data.projbudgettask_id = '--NULL--'
		data.projbudgettask_name = 'NONE'
		data.site_id = '0'
		data.site_name = '-- PILIH --'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id

		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}

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

		$ui.getPages().ITEMS['pnl_edititemgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage


	if (typeof hnd.form_updatefilebox == 'function') {
		hnd.form_updatefilebox(record);
	}
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

	rec_commitby.html(record.inquiry_commitby);
	rec_commitdate.html(record.inquiry_commitdate);
		
	rec_approveby.html(record.inquiry_approveby);
	rec_approvedate.html(record.inquiry_approvedate);
	rec_declineby.html(record.inquiry_declineby);
	rec_declinedate.html(record.inquiry_declinedate);
			

	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

	/* action button */
	var button_commit_on = false;
	var button_uncommit_on = false;
	var button_approve_on = false;
	var button_decline_on = false;

	
	if (record.inquiry_isfirm=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = false;
		button_decline_on = false;
		form.lock(true);	
	} else if (record.inquiry_isdeclined=="1" || record.inquiry_isuseralreadydeclined=="1") {
		button_commit_on = false;
		button_uncommit_on = true;
		button_approve_on = true;
		button_decline_on = false;
		form.lock(true);	
	} else if (record.inquiry_isapproved=="1" || record.inquiry_isuseralreadyapproved=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = false;
		button_decline_on = true;	
		form.lock(true);	
	} else if (record.inquiry_isapprovalprogress=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = true;
		button_decline_on = true;
		form.lock(true);	
	} else if (record.inquiry_iscommit=="1") {
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
			

	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'inquiry_iscommit';
	updategriddata[col_commit] = record.inquiry_iscommit;	
	
	var col_approveprogress = 'inquiry_isapprovalprogress';
	var col_approve = 'inquiry_isapprove'
	var col_decline = "inquiry_isdeclined"
	updategriddata[col_approveprogress] = record.inquiry_isapprovalprogress;
	updategriddata[col_approve] = record.inquiry_isapproved;
	updategriddata[col_decline] = record.inquiry_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
		

	if (typeof hnd.form_updategridstate == 'function') {
		hnd.form_updategridstate(record);
	}
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_inquiry_id
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
	// options.skipmappingresponse = ['empl_id', 'partner_id', 'partnerbank_id', 'partnercontact_id', 'projecttask_id', 'projbudgettask_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			// console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
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
	/*
	form.setValue(obj.cbo_empl_id, result.dataresponse.empl_name!=='--NULL--' ? result.dataresponse.empl_id : '--NULL--', result.dataresponse.empl_name!=='--NULL--'?result.dataresponse.empl_name:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')
	form.setValue(obj.cbo_partnerbank_id, result.dataresponse.partnerbank_accnum!=='--NULL--' ? result.dataresponse.partnerbank_id : '--NULL--', result.dataresponse.partnerbank_accnum!=='--NULL--'?result.dataresponse.partnerbank_accnum:'NONE')
	form.setValue(obj.cbo_partnercontact_id, result.dataresponse.partnercontact_name!=='--NULL--' ? result.dataresponse.partnercontact_id : '--NULL--', result.dataresponse.partnercontact_name!=='--NULL--'?result.dataresponse.partnercontact_name:'NONE')
	form.setValue(obj.cbo_projecttask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projecttask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_projbudgettask_id, result.dataresponse.projbudgettask_name!=='--NULL--' ? result.dataresponse.projbudgettask_id : '--NULL--', result.dataresponse.projbudgettask_name!=='--NULL--'?result.dataresponse.projbudgettask_name:'NONE')

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data, options) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data, options);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_inquiry_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/inquiry.xprint?id=' + id;

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


	var docname = 'Inquiry'
	var txt_version = obj.txt_inquiry_version;
	var chk_iscommit = obj.chk_inquiry_iscommit;
	
	var chk_isapprovalprogress = obj.chk_inquiry_isapprovalprogress;	
	var chk_isapprove = obj.chk_inquiry_isapproved;
	var chk_isdeclined = obj.chk_inquiry_isdeclined;
		
	
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
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
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
		
	
		default:
			if (typeof hnd.do_other_action == 'function') {
				hnd.do_other_action(args);
			}
	}

	
	if (args.cancel) { return } // batalkan xtion

	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}

				if (typeof hnd.action_done == 'function') {
					hnd.action_done(result, args);
				}

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
	
	