var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editbillform-title')
const btn_edit = $('#pnl_editbillform-btn_edit')
const btn_save = $('#pnl_editbillform-btn_save')
const btn_delete = $('#pnl_editbillform-btn_delete')
const btn_prev = $('#pnl_editbillform-btn_prev')
const btn_next = $('#pnl_editbillform-btn_next')
const btn_addnew = $('#pnl_editbillform-btn_addnew')
const chk_autoadd = $('#pnl_editbillform-autoadd')


const pnl_form = $('#pnl_editbillform-form')
const obj = {
	txt_jurnaldetil_id: $('#pnl_editbillform-txt_jurnaldetil_id'),
	cbo_partner_id: $('#pnl_editbillform-cbo_partner_id'),
	cbo_temprecv_id: $('#pnl_editbillform-cbo_temprecv_id'),
	cbo_ref_jurnaldetil_id: $('#pnl_editbillform-cbo_ref_jurnaldetil_id'),
	txt_jurnaldetil_descr: $('#pnl_editbillform-txt_jurnaldetil_descr'),
	txt_jurnaldetil_valfrg: $('#pnl_editbillform-txt_jurnaldetil_valfrg'),
	cbo_curr_id: $('#pnl_editbillform-cbo_curr_id'),
	txt_jurnaldetil_valfrgrate: $('#pnl_editbillform-txt_jurnaldetil_valfrgrate'),
	txt_jurnaldetil_validr: $('#pnl_editbillform-txt_jurnaldetil_validr'),
	cbo_coa_id: $('#pnl_editbillform-cbo_coa_id'),
	cbo_dept_id: $('#pnl_editbillform-cbo_dept_id'),
	txt_jurnal_id: $('#pnl_editbillform-txt_jurnal_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_jurnaldetil_id,
		autoid: true,
		logview: 'trn_jurnaldetil',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)




	obj.cbo_partner_id.name = 'pnl_editbillform-cbo_partner_id'		
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
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_temprecv_id.name = 'pnl_editbillform-cbo_temprecv_id'		
	new fgta4slideselect(obj.cbo_temprecv_id, {
		title: 'Pilih temprecv_id',
		returnpage: this_page_id,
		api: $ui.apis.load_temprecv_id,
		fieldValue: 'temprecv_id',
		fieldValueMap: 'temprecv_id',
		fieldDisplay: 'temprecv_descr',
		fields: [
			{mapping: 'temprecv_id', text: 'temprecv_id'},
			{mapping: 'temprecv_descr', text: 'temprecv_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({temprecv_id:'--NULL--', temprecv_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_ref_jurnaldetil_id.name = 'pnl_editbillform-cbo_ref_jurnaldetil_id'		
	new fgta4slideselect(obj.cbo_ref_jurnaldetil_id, {
		title: 'Pilih ref_jurnaldetil_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ref_jurnaldetil_id,
		fieldValue: 'ref_jurnaldetil_id',
		fieldValueMap: 'jurnaldetil_id',
		fieldDisplay: 'jurnaldetil_descr',
		fields: [
			{mapping: 'jurnaldetil_id', text: 'jurnaldetil_id'},
			{mapping: 'jurnaldetil_descr', text: 'jurnaldetil_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({jurnaldetil_id:'--NULL--', jurnaldetil_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_curr_id.name = 'pnl_editbillform-cbo_curr_id'		
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
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_coa_id.name = 'pnl_editbillform-cbo_coa_id'		
	new fgta4slideselect(obj.cbo_coa_id, {
		title: 'Pilih coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coa_id,
		fieldValue: 'coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_dept_id.name = 'pnl_editbillform-cbo_dept_id'		
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
				
		},
		OnSelected: (value, display, record) => {}
	})				
			


	btn_addnew.linkbutton({
		onClick: () => { btn_addnew_click() }
	})

	btn_prev.linkbutton({
		onClick: () => { btn_prev_click() }
	})

	btn_next.linkbutton({
		onClick: () => { btn_next_click() }
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
	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editbillgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editbillgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editbillgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editbillgrid'].handler.scrolllast()
				})
			}
		
		}		
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})
	
	
	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			form.lock(true)
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})
}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.jurnal_descr)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/bill-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.temprecv_id==null) { result.record.temprecv_id='--NULL--'; result.record.temprecv_descr='NONE'; }
		if (result.record.ref_jurnaldetil_id==null) { result.record.ref_jurnaldetil_id='--NULL--'; result.record.jurnaldetil_descr='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_temprecv_id, result.record.temprecv_id, result.record.temprecv_descr)
			.setValue(obj.cbo_ref_jurnaldetil_id, result.record.ref_jurnaldetil_id, result.record.jurnaldetil_descr)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.commit()
			.setViewMode()
			.rowid = rowid

		form.SuspendEvent(false);


		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.jurnal_id= hdata.jurnal_id
		data.bill_value = 0

		data.jurnaldetil_valfrg = 0
		data.jurnaldetil_valfrgrate = 0
		data.jurnaldetil_validr = 0

			data.partner_id = '0'
			data.partner_name = '-- PILIH --'
			data.temprecv_id = '--NULL--'
			data.temprecv_descr = 'NONE'
			data.ref_jurnaldetil_id = '--NULL--'
			data.jurnaldetil_descr = 'NONE'
			data.curr_id = '0'
			data.curr_name = '-- PILIH --'
			data.coa_id = '0'
			data.coa_name = '-- PILIH --'
			data.dept_id = '0'
			data.dept_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editbillgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/bill-save`

	options.skipmappingresponse = [temprecv_id, ref_jurnaldetil_id, ];
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_temprecv_id, result.dataresponse.temprecv_descr!=='--NULL--' ? result.dataresponse.temprecv_id : '--NULL--', result.dataresponse.temprecv_descr!=='--NULL--'?result.dataresponse.temprecv_descr:'NONE')
	form.setValue(obj.cbo_ref_jurnaldetil_id, result.dataresponse.jurnaldetil_descr!=='--NULL--' ? result.dataresponse.ref_jurnaldetil_id : '--NULL--', result.dataresponse.jurnaldetil_descr!=='--NULL--'?result.dataresponse.jurnaldetil_descr:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_editbillgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/bill-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editbillgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editbillgrid'].handler.removerow(form.rowid)
	})
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
}


function form_idsetup(options) {
	var objid = obj.txt_jurnaldetil_id
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

function btn_addnew_click() {
	createnew(header_data)
}


function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editbillgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editbillgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}