var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editbillinform-title')
const btn_edit = $('#pnl_editbillinform-btn_edit')
const btn_save = $('#pnl_editbillinform-btn_save')
const btn_delete = $('#pnl_editbillinform-btn_delete')
const btn_prev = $('#pnl_editbillinform-btn_prev')
const btn_next = $('#pnl_editbillinform-btn_next')
const btn_addnew = $('#pnl_editbillinform-btn_addnew')
const chk_autoadd = $('#pnl_editbillinform-autoadd')


const pnl_form = $('#pnl_editbillinform-form')
const obj = {
	txt_paymentscdbillin_id: $('#pnl_editbillinform-txt_paymentscdbillin_id'),
	cbo_billinpaym_id: $('#pnl_editbillinform-cbo_billinpaym_id'),
	dt_billinpaym_date: $('#pnl_editbillinform-dt_billinpaym_date'),
	dt_billinpaym_datescd: $('#pnl_editbillinform-dt_billinpaym_datescd'),
	txt_billinpaym_descr: $('#pnl_editbillinform-txt_billinpaym_descr'),
	cbo_curr_id: $('#pnl_editbillinform-cbo_curr_id'),
	txt_billinpaym_frgrate: $('#pnl_editbillinform-txt_billinpaym_frgrate'),
	txt_billinpaym_itemfrg: $('#pnl_editbillinform-txt_billinpaym_itemfrg'),
	txt_billinpaym_itemidr: $('#pnl_editbillinform-txt_billinpaym_itemidr'),
	txt_billinpaym_ppnfrg: $('#pnl_editbillinform-txt_billinpaym_ppnfrg'),
	txt_billinpaym_ppnidr: $('#pnl_editbillinform-txt_billinpaym_ppnidr'),
	txt_billinpaym_pphfrg: $('#pnl_editbillinform-txt_billinpaym_pphfrg'),
	txt_billinpaym_pphidr: $('#pnl_editbillinform-txt_billinpaym_pphidr'),
	cbo_acc_fin: $('#pnl_editbillinform-cbo_acc_fin'),
	cbo_bankrekening_id: $('#pnl_editbillinform-cbo_bankrekening_id'),
	txt_billin_id: $('#pnl_editbillinform-txt_billin_id'),
	txt_paymentscd_id: $('#pnl_editbillinform-txt_paymentscd_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_paymentscdbillin_id,
		autoid: true,
		logview: 'trn_paymentscdbillin',
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




	obj.cbo_billinpaym_id.name = 'pnl_editbillinform-cbo_billinpaym_id'		
	new fgta4slideselect(obj.cbo_billinpaym_id, {
		title: 'Pilih billinpaym_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billinpaym_id,
		fieldValue: 'billinpaym_id',
		fieldValueMap: 'billinpaym_id',
		fieldDisplay: 'billinpaym_descr',
		fields: [
			{mapping: 'billinpaym_id', text: 'billinpaym_id'},
			{mapping: 'billinpaym_descr', text: 'billinpaym_descr'},
		],
		OnDataLoading: (criteria, options) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			
	obj.cbo_curr_id.name = 'pnl_editbillinform-cbo_curr_id'		
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
		OnDataLoading: (criteria, options) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			

	obj.cbo_acc_fin.name = 'pnl_editbillinform-cbo_acc_fin'		
	new fgta4slideselect(obj.cbo_acc_fin, {
		title: 'Pilih acc_fin',
		returnpage: this_page_id,
		api: $ui.apis.load_acc_fin,
		fieldValue: 'acc_fin',
		fieldValueMap: 'accfin_id',
		fieldDisplay: 'accfin_name',
		fields: [
			{mapping: 'accfin_id', text: 'accfin_id'},
			{mapping: 'accfin_name', text: 'accfin_name'},
		],
		OnDataLoading: (criteria, options) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({accfin_id:'--NULL--', accfin_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})	


	obj.cbo_bankrekening_id.name = 'pnl_editbillinform-cbo_bankrekening_id'		
	new fgta4slideselect(obj.cbo_bankrekening_id, {
		title: 'Pilih bankrekening_id',
		returnpage: this_page_id,
		api: $ui.apis.load_bankrekening_id,
		fieldValue: 'bankrekening_id',
		fieldValueMap: 'bankrekening_id',
		fieldDisplay: 'bankrekening_name',
		fields: [
			{mapping: 'bankrekening_id', text: 'bankrekening_id'},
			{mapping: 'bankrekening_name', text: 'bankrekening_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})	



	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

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
					$ui.getPages().show('pnl_editbillingrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editbillingrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editbillingrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editbillingrid'].handler.scrolllast()
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
	txt_title.html(hdata.paymentscd_descr)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/billin-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*

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
		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_billinpaym_id, record.billinpaym_id, record.billinpaym_descr)
			.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 



		form.commit()
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
		data.paymentscd_id= hdata.paymentscd_id
		data.billin_value = 0

		data.billinpaym_date = global.now()
		data.billinpaym_datescd = global.now()
		data.billinpaym_frgrate = 0
		data.billinpaym_itemfrg = 0
		data.billinpaym_itemidr = 0
		data.billinpaym_ppnfrg = 0
		data.billinpaym_ppnidr = 0
		data.billinpaym_pphfrg = 0
		data.billinpaym_pphidr = 0

			data.billinpaym_id = '0'
			data.billinpaym_descr = '-- PILIH --'
			data.curr_id = '0'
			data.curr_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editbillingrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/billin-save`

	// options.skipmappingresponse = [];
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

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*

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
	form.rowid = $ui.getPages().ITEMS['pnl_editbillingrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/billin-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editbillingrid', ()=>{
		$ui.getPages().ITEMS['pnl_editbillingrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_paymentscdbillin_id
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
	var record = $ui.getPages().ITEMS['pnl_editbillingrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editbillingrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}