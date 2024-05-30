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
				


const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_settl_id: $('#pnl_edit-txt_settl_id'),
	txt_settl_ref: $('#pnl_edit-txt_settl_ref'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	dt_settl_date: $('#pnl_edit-dt_settl_date'),
	cbo_billinpaym_id: $('#pnl_edit-cbo_billinpaym_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_settl_descr: $('#pnl_edit-txt_settl_descr'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_adv_valfrg: $('#pnl_edit-txt_adv_valfrg'),
	txt_adv_valfrgrate: $('#pnl_edit-txt_adv_valfrgrate'),
	txt_adv_validr: $('#pnl_edit-txt_adv_validr'),
	txt_rmb_valfrg: $('#pnl_edit-txt_rmb_valfrg'),
	txt_rmb_valfrgrate: $('#pnl_edit-txt_rmb_valfrgrate'),
	txt_rmb_validr: $('#pnl_edit-txt_rmb_validr'),
	txt_ret_valfrg: $('#pnl_edit-txt_ret_valfrg'),
	txt_ret_valfrgrate: $('#pnl_edit-txt_ret_valfrgrate'),
	txt_ret_validr: $('#pnl_edit-txt_ret_validr'),
	txt_inquiry_id: $('#pnl_edit-txt_inquiry_id'),
	cbo_paym_jurnal_id: $('#pnl_edit-cbo_paym_jurnal_id'),
	cbo_paym_jurnaldetil_id: $('#pnl_edit-cbo_paym_jurnaldetil_id'),
	cbo_adv_coa_id: $('#pnl_edit-cbo_adv_coa_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_settl_version: $('#pnl_edit-txt_settl_version'),
	chk_settl_iscommit: $('#pnl_edit-chk_settl_iscommit'),
	txt_settl_commitby: $('#pnl_edit-txt_settl_commitby'),
	txt_settl_commitdate: $('#pnl_edit-txt_settl_commitdate'),
	chk_settl_isapprovalprogress: $('#pnl_edit-chk_settl_isapprovalprogress'),
	chk_settl_isapproved: $('#pnl_edit-chk_settl_isapproved'),
	txt_settl_approveby: $('#pnl_edit-txt_settl_approveby'),
	txt_settl_approvedate: $('#pnl_edit-txt_settl_approvedate'),
	chk_settl_isdeclined: $('#pnl_edit-chk_settl_isdeclined'),
	txt_settl_declineby: $('#pnl_edit-txt_settl_declineby'),
	txt_settl_declinedate: $('#pnl_edit-txt_settl_declinedate'),
	chk_settl_ispost: $('#pnl_edit-chk_settl_ispost'),
	txt_settl_postby: $('#pnl_edit-txt_settl_postby'),
	txt_settl_postdate: $('#pnl_edit-txt_settl_postdate')
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
		primary: obj.txt_settl_id,
		autoid: true,
		logview: 'trn_settl',
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
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_billinpaym_id, {
		title: 'Pilih billinpaym_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-billinpaym`,
		fieldValue: 'billinpaym_id',
		fieldValueMap: 'billinpaym_id',
		fieldDisplay: 'billinpaym_caption',
		fields: [
			{mapping: 'billinpaym_id', text: 'ID'},
			{mapping: 'billinpaym_descr', text: 'Descr'},
			{mapping: 'partner_name', text: 'Partner'},
			{mapping: 'billinpaym_totalidr', text: 'Amount'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billinpaym_id:'--NULL--', billinpaym_caption:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			console.log(record);
			if (value!=args.PreviousValue ) {	
				form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
				form.setValue(obj.txt_settl_descr, record.billinpaym_descr);
				form.setValue(obj.txt_adv_valfrg, record.billinpaym_totalfrg);
				form.setValue(obj.txt_adv_validr, record.billinpaym_totalidr);
				form.setValue(obj.cbo_paym_jurnal_id, record.paym_jurnal_id, record.paym_jurnal_caption);
				form.setValue(obj.cbo_paym_jurnaldetil_id, record.paym_jurnaldetil_id, record.paym_jurnaldetil_caption);
				form.setValue(obj.txt_inquiry_id, record.inquiry_id);
				form.setValue(obj.cbo_adv_coa_id, record.adv_coa_id, record.adv_coa_name);

			}
		}
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
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
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
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_paym_jurnal_id, {
		title: 'Pilih paym_jurnal_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-jurnal`,
		fieldValue: 'paym_jurnal_id',
		fieldValueMap: 'jurnal_id',
		fieldDisplay: 'paym_jurnal_caption',
		fields: [
			{mapping: 'jurnal_id', text: 'jurnal_id'},
			{mapping: 'jurnal_descr', text: 'jurnal_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({jurnal_id:'--NULL--', jurnal_caption:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_paym_jurnaldetil_id, {
		title: 'Pilih paym_jurnaldetil_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-jurnaldetil`,
		fieldValue: 'paym_jurnaldetil_id',
		fieldValueMap: 'jurnaldetil_id',
		fieldDisplay: 'paym_jurnaldetil_caption',
		fields: [
			{mapping: 'jurnaldetil_id', text: 'jurnaldetil_id'},
			{mapping: 'jurnaldetil_descr', text: 'jurnaldetil_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({jurnaldetil_id:'--NULL--', jurnaldetil_caption:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_adv_coa_id, {
		title: 'Pilih adv_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_adv_coa_id,
		fieldValue: 'adv_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
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
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
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

export function getForm() {
	return form
}


export function open(data, rowid, viewmode=true, fn_callback) {

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.billinpaym_id==null) { result.record.billinpaym_id='--NULL--'; result.record.billinpaym_caption='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		if (result.record.paym_jurnal_id==null) { result.record.paym_jurnal_id='--NULL--'; result.record.paym_jurnal_descr='NONE'; }
		if (result.record.paym_jurnaldetil_id==null) { result.record.paym_jurnaldetil_id='--NULL--'; result.record.paym_jurnaldetil_descr='NONE'; }
		if (result.record.adv_coa_id==null) { result.record.adv_coa_id='--NULL--'; result.record.adv_coa_name='NONE'; }
		if (result.record.dept_id==null) { result.record.dept_id='--NULL--'; result.record.dept_name='NONE'; }

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

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_periodemo_id, record.periodemo_id, record.periodemo_name)
			.setValue(obj.cbo_billinpaym_id, record.billinpaym_id, record.billinpaym_caption)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name)
			.setValue(obj.cbo_paym_jurnal_id, record.paym_jurnal_id, record.paym_jurnal_descr)
			.setValue(obj.cbo_paym_jurnaldetil_id, record.paym_jurnaldetil_id, record.paym_jurnaldetil_descr)
			.setValue(obj.cbo_adv_coa_id, record.adv_coa_id, record.adv_coa_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   



		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)

		// tampilkan form untuk data editor
		fn_callback()
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
		data.settl_date = global.now()
		data.adv_valfrg = 0
		data.adv_valfrgrate = 0
		data.adv_validr = 0
		data.rmb_valfrg = 0
		data.rmb_valfrgrate = 0
		data.rmb_validr = 0
		data.ret_valfrg = 0
		data.ret_valfrgrate = 0
		data.ret_validr = 0
		data.settl_version = 0
		data.settl_iscommit = '0'
		data.settl_isapprovalprogress = '0'
		data.settl_isapproved = '0'
		data.settl_isdeclined = '0'
		data.settl_ispost = '0'

		data.periodemo_id = '0'
		data.periodemo_name = '-- PILIH --'
		data.billinpaym_id = '--NULL--'
		data.billinpaym_caption = 'NONE'
		data.partner_id = '--NULL--'
		data.partner_name = 'NONE'
		data.curr_id = '0'
		data.curr_name = '-- PILIH --'
		data.paym_jurnal_id = '--NULL--'
		data.paym_jurnal_caption = 'NONE'
		data.paym_jurnaldetil_id = '--NULL--'
		data.paym_jurnaldetil_caption = 'NONE'
		data.adv_coa_id = '--NULL--'
		data.adv_coa_name = 'NONE'
		data.dept_id = '--NULL--'
		data.dept_name = 'NONE'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id


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
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.settl_commitby);
		rec_commitdate.html(record.settl_commitdate);
		
		rec_approveby.html(record.settl_approveby);
		rec_approvedate.html(record.settl_approvedate);
		rec_declineby.html(record.settl_declineby);
		rec_declinedate.html(record.settl_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.settl_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.settl_isdeclined=="1" || record.settl_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.settl_isapproved=="1" || record.settl_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.settl_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.settl_iscommit=="1") {
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

	var col_commit = 'settl_iscommit';
	updategriddata[col_commit] = record.settl_iscommit;	
	
	var col_approveprogress = 'settl_isapprovalprogress';
	var col_approve = 'settl_isapprove'
	var col_decline = "settl_isdeclined"
	updategriddata[col_approveprogress] = record.settl_isapprovalprogress;
	updategriddata[col_approve] = record.settl_isapproved;
	updategriddata[col_decline] = record.settl_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_settl_id
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
	// options.skipmappingresponse = ['billinpaym_id', 'partner_id', 'paym_jurnal_id', 'paym_jurnaldetil_id', 'adv_coa_id', 'dept_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

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
	/*
	form.setValue(obj.cbo_billinpaym_id, result.dataresponse.billinpaym_caption!=='--NULL--' ? result.dataresponse.billinpaym_id : '--NULL--', result.dataresponse.billinpaym_caption!=='--NULL--'?result.dataresponse.billinpaym_caption:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')
	form.setValue(obj.cbo_paym_jurnal_id, result.dataresponse.paym_jurnal_descr!=='--NULL--' ? result.dataresponse.paym_jurnal_id : '--NULL--', result.dataresponse.paym_jurnal_descr!=='--NULL--'?result.dataresponse.paym_jurnal_descr:'NONE')
	form.setValue(obj.cbo_paym_jurnaldetil_id, result.dataresponse.paym_jurnaldetil_descr!=='--NULL--' ? result.dataresponse.paym_jurnaldetil_id : '--NULL--', result.dataresponse.paym_jurnaldetil_descr!=='--NULL--'?result.dataresponse.paym_jurnaldetil_descr:'NONE')
	form.setValue(obj.cbo_adv_coa_id, result.dataresponse.adv_coa_name!=='--NULL--' ? result.dataresponse.adv_coa_id : '--NULL--', result.dataresponse.adv_coa_name!=='--NULL--'?result.dataresponse.adv_coa_name:'NONE')
	form.setValue(obj.cbo_dept_id, result.dataresponse.dept_name!=='--NULL--' ? result.dataresponse.dept_id : '--NULL--', result.dataresponse.dept_name!=='--NULL--'?result.dataresponse.dept_name:'NONE')

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

	var id = obj.txt_settl_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/settl.xprint?id=' + id;

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


	var docname = 'undefined'
	var txt_version = obj.txt_settl_version;
	var chk_iscommit = obj.chk_settl_iscommit;
	
	var chk_isapprovalprogress = obj.chk_settl_isapprovalprogress;	
	var chk_isapprove = obj.chk_settl_isapproved;
	var chk_isdeclined = obj.chk_settl_isdeclined;
		
	
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
	
	