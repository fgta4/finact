var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_edititemsform-title')
const btn_edit = $('#pnl_edititemsform-btn_edit')
const btn_save = $('#pnl_edititemsform-btn_save')
const btn_delete = $('#pnl_edititemsform-btn_delete')
const btn_prev = $('#pnl_edititemsform-btn_prev')
const btn_next = $('#pnl_edititemsform-btn_next')
const btn_addnew = $('#pnl_edititemsform-btn_addnew')
const chk_autoadd = $('#pnl_edititemsform-autoadd')


const pnl_form = $('#pnl_edititemsform-form')
const obj = {
	txt_recvitem_id: $('#pnl_edititemsform-txt_recvitem_id'),
	cbo_itemasset_id: $('#pnl_edititemsform-cbo_itemasset_id'),
	cbo_item_id: $('#pnl_edititemsform-cbo_item_id'),
	cbo_itemstock_id: $('#pnl_edititemsform-cbo_itemstock_id'),
	cbo_partner_id: $('#pnl_edititemsform-cbo_partner_id'),
	cbo_itemclass_id: $('#pnl_edititemsform-cbo_itemclass_id'),
	txt_recvitem_descr: $('#pnl_edititemsform-txt_recvitem_descr'),
	txt_recvitem_qty: $('#pnl_edititemsform-txt_recvitem_qty'),
	txt_recvitem_value: $('#pnl_edititemsform-txt_recvitem_value'),
	txt_curr_id: $('#pnl_edititemsform-txt_curr_id'),
	txt_recvitem_idr: $('#pnl_edititemsform-txt_recvitem_idr'),
	txt_accbudget_id: $('#pnl_edititemsform-txt_accbudget_id'),
	txt_coa_id: $('#pnl_edititemsform-txt_coa_id'),
	txt_orderout_id: $('#pnl_edititemsform-txt_orderout_id'),
	txt_orderoutitem_id: $('#pnl_edititemsform-txt_orderoutitem_id'),
	txt_request_id: $('#pnl_edititemsform-txt_request_id'),
	txt_requestitem_id: $('#pnl_edititemsform-txt_requestitem_id'),
	txt_inquiry_id: $('#pnl_edititemsform-txt_inquiry_id'),
	txt_inquiryitem_id: $('#pnl_edititemsform-txt_inquiryitem_id'),
	txt_recv_id: $('#pnl_edititemsform-txt_recv_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_recvitem_id,
		autoid: true,
		logview: 'trn_recvitem',
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




	obj.cbo_itemasset_id.name = 'pnl_edititemsform-cbo_itemasset_id'		
	new fgta4slideselect(obj.cbo_itemasset_id, {
		title: 'Pilih itemasset_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-itemasset`,
		fieldValue: 'itemasset_id',
		fieldValueMap: 'itemasset_id',
		fieldDisplay: 'itemasset_name',
		fields: [
			{mapping: 'itemasset_id', text: 'itemasset_id'},
			{mapping: 'itemasset_name', text: 'itemasset_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemasset_id:'--NULL--', itemasset_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			
	obj.cbo_item_id.name = 'pnl_edititemsform-cbo_item_id'		
	new fgta4slideselect(obj.cbo_item_id, {
		title: 'Pilih item_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-item`,
		fieldValue: 'item_id',
		fieldValueMap: 'item_id',
		fieldDisplay: 'item_name',
		fields: [
			{mapping: 'item_id', text: 'item_id'},
			{mapping: 'item_name', text: 'item_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({item_id:'--NULL--', item_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			
	obj.cbo_itemstock_id.name = 'pnl_edititemsform-cbo_itemstock_id'		
	new fgta4slideselect(obj.cbo_itemstock_id, {
		title: 'Pilih itemstock_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-itemstock`,
		fieldValue: 'itemstock_id',
		fieldValueMap: 'itemstock_id',
		fieldDisplay: 'itemstock_name',
		fields: [
			{mapping: 'itemstock_id', text: 'itemstock_id'},
			{mapping: 'itemstock_name', text: 'itemstock_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemstock_id:'--NULL--', itemstock_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			
	obj.cbo_partner_id.name = 'pnl_edititemsform-cbo_partner_id'		
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-partner`,
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
			
	obj.cbo_itemclass_id.name = 'pnl_edititemsform-cbo_itemclass_id'		
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-itemclass`,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
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
					$ui.getPages().show('pnl_edititemsgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_edititemsgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.scrolllast()
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
	txt_title.html(hdata.recvitem_descr)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/items-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*
		if (record.itemasset_id==null) { record.itemasset_id='--NULL--'; record.itemasset_name='NONE'; }
		if (record.item_id==null) { record.item_id='--NULL--'; record.item_name='NONE'; }
		if (record.itemstock_id==null) { record.itemstock_id='--NULL--'; record.itemstock_name='NONE'; }
		if (record.partner_id==null) { record.partner_id='--NULL--'; record.partner_name='NONE'; }

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
			.setValue(obj.cbo_itemasset_id, record.itemasset_id, record.itemasset_name)
			.setValue(obj.cbo_item_id, record.item_id, record.item_name)
			.setValue(obj.cbo_itemstock_id, record.itemstock_id, record.itemstock_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
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
		data.recv_id= hdata.recv_id
		data.items_value = 0

		data.recvitem_qty = 0
		data.recvitem_value = 0
		data.recvitem_idr = 0

			data.itemasset_id = '--NULL--'
			data.itemasset_name = 'NONE'
			data.item_id = '--NULL--'
			data.item_name = 'NONE'
			data.itemstock_id = '--NULL--'
			data.itemstock_name = 'NONE'
			data.partner_id = '--NULL--'
			data.partner_name = 'NONE'
			data.itemclass_id = '0'
			data.itemclass_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edititemsgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/items-save`

	// options.skipmappingresponse = ['itemasset_id', 'item_id', 'itemstock_id', 'partner_id', ];
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
	form.setValue(obj.cbo_itemasset_id, result.dataresponse.itemasset_name!=='--NULL--' ? result.dataresponse.itemasset_id : '--NULL--', result.dataresponse.itemasset_name!=='--NULL--'?result.dataresponse.itemasset_name:'NONE')
	form.setValue(obj.cbo_item_id, result.dataresponse.item_name!=='--NULL--' ? result.dataresponse.item_id : '--NULL--', result.dataresponse.item_name!=='--NULL--'?result.dataresponse.item_name:'NONE')
	form.setValue(obj.cbo_itemstock_id, result.dataresponse.itemstock_name!=='--NULL--' ? result.dataresponse.itemstock_id : '--NULL--', result.dataresponse.itemstock_name!=='--NULL--'?result.dataresponse.itemstock_name:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/items-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_edititemsgrid', ()=>{
		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_recvitem_id
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
	var record = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edititemsgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}