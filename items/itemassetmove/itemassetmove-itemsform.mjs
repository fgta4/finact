var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemassetmove-itemsform-hnd.mjs'

const reload_header_modified = true;


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
	txt_itemassetmovedetil_id: $('#pnl_edititemsform-txt_itemassetmovedetil_id'),
	cbo_itemasset_id: $('#pnl_edititemsform-cbo_itemasset_id'),
	cbo_item_id: $('#pnl_edititemsform-cbo_item_id'),
	cbo_itemclass_id: $('#pnl_edititemsform-cbo_itemclass_id'),
	txt_itemassetmovedetil_qty: $('#pnl_edititemsform-txt_itemassetmovedetil_qty'),
	cbo_send_itemassetstatus_id: $('#pnl_edititemsform-cbo_send_itemassetstatus_id'),
	txt_itemassetmovedetil_senddescr: $('#pnl_edititemsform-txt_itemassetmovedetil_senddescr'),
	cbo_recv_itemassetstatus_id: $('#pnl_edititemsform-cbo_recv_itemassetstatus_id'),
	txt_itemassetmovedetil_recvdescr: $('#pnl_edititemsform-txt_itemassetmovedetil_recvdescr'),
	txt_itemassetmove_id: $('#pnl_edititemsform-txt_itemassetmove_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_itemassetmovedetil_id,
		autoid: true,
		logview: 'trn_itemassetmovedetil',
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
	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)





	obj.cbo_itemasset_id.name = 'pnl_edititemsform-cbo_itemasset_id'		
	new fgta4slideselect(obj.cbo_itemasset_id, {
		title: 'Pilih itemasset_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemasset_id,
		fieldValue: 'itemasset_id',
		fieldValueMap: 'itemasset_id',
		fieldDisplay: 'itemasset_name',
		fields: [
			{mapping: 'itemasset_id', text: 'itemasset_id'},
			{mapping: 'itemasset_name', text: 'itemasset_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_itemasset_id_dataloading === 'function') {
				hnd.cbo_itemasset_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_itemasset_id_dataloaded === 'function') {
				hnd.cbo_itemasset_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemasset_id_selected === 'function') {
					hnd.cbo_itemasset_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_item_id.name = 'pnl_edititemsform-cbo_item_id'		
	new fgta4slideselect(obj.cbo_item_id, {
		title: 'Pilih item_id',
		returnpage: this_page_id,
		api: $ui.apis.load_item_id,
		fieldValue: 'item_id',
		fieldValueMap: 'item_id',
		fieldDisplay: 'item_name',
		fields: [
			{mapping: 'item_id', text: 'item_id'},
			{mapping: 'item_name', text: 'item_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_item_id_dataloading === 'function') {
				hnd.cbo_item_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({item_id:'--NULL--', item_name:'NONE'});	
			if (typeof hnd.cbo_item_id_dataloaded === 'function') {
				hnd.cbo_item_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_item_id_selected === 'function') {
					hnd.cbo_item_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_itemclass_id.name = 'pnl_edititemsform-cbo_itemclass_id'		
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclass_id,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_itemclass_id_dataloading === 'function') {
				hnd.cbo_itemclass_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclass_id:'--NULL--', itemclass_name:'NONE'});	
			if (typeof hnd.cbo_itemclass_id_dataloaded === 'function') {
				hnd.cbo_itemclass_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemclass_id_selected === 'function') {
					hnd.cbo_itemclass_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_send_itemassetstatus_id.name = 'pnl_edititemsform-cbo_send_itemassetstatus_id'		
	new fgta4slideselect(obj.cbo_send_itemassetstatus_id, {
		title: 'Pilih send_itemassetstatus_id',
		returnpage: this_page_id,
		api: $ui.apis.load_send_itemassetstatus_id,
		fieldValue: 'send_itemassetstatus_id',
		fieldValueMap: 'itemassetstatus_id',
		fieldDisplay: 'itemassetstatus_name',
		fields: [
			{mapping: 'itemassetstatus_id', text: 'itemassetstatus_id'},
			{mapping: 'itemassetstatus_name', text: 'itemassetstatus_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_send_itemassetstatus_id_dataloading === 'function') {
				hnd.cbo_send_itemassetstatus_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_send_itemassetstatus_id_dataloaded === 'function') {
				hnd.cbo_send_itemassetstatus_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_send_itemassetstatus_id_selected === 'function') {
					hnd.cbo_send_itemassetstatus_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_recv_itemassetstatus_id.name = 'pnl_edititemsform-cbo_recv_itemassetstatus_id'		
	new fgta4slideselect(obj.cbo_recv_itemassetstatus_id, {
		title: 'Pilih recv_itemassetstatus_id',
		returnpage: this_page_id,
		api: $ui.apis.load_recv_itemassetstatus_id,
		fieldValue: 'recv_itemassetstatus_id',
		fieldValueMap: 'itemassetstatus_id',
		fieldDisplay: 'itemassetstatus_name',
		fields: [
			{mapping: 'itemassetstatus_id', text: 'itemassetstatus_id'},
			{mapping: 'itemassetstatus_name', text: 'itemassetstatus_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_recv_itemassetstatus_id_dataloading === 'function') {
				hnd.cbo_recv_itemassetstatus_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemassetstatus_id:'--NULL--', itemassetstatus_name:'NONE'});	
			if (typeof hnd.cbo_recv_itemassetstatus_id_dataloaded === 'function') {
				hnd.cbo_recv_itemassetstatus_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_recv_itemassetstatus_id_selected === 'function') {
					hnd.cbo_recv_itemassetstatus_id_selected(value, display, record, args);
				}
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
	txt_title.html(hdata.itemassetmove_descr)
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
		if (record.item_id==null) { record.item_id='--NULL--'; record.item_name='NONE'; }
		if (record.itemclass_id==null) { record.itemclass_id='--NULL--'; record.itemclass_name='NONE'; }
		if (record.recv_itemassetstatus_id==null) { record.recv_itemassetstatus_id='--NULL--'; record.recv_itemassetstatus_name='NONE'; }

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
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_send_itemassetstatus_id, record.send_itemassetstatus_id, record.send_itemassetstatus_name)
			.setValue(obj.cbo_recv_itemassetstatus_id, record.recv_itemassetstatus_id, record.recv_itemassetstatus_name)
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
		data.itemassetmove_id= hdata.itemassetmove_id
		data.items_value = 0

		data.itemassetmovedetil_qty = 0

		data.itemasset_id = '0'
		data.itemasset_name = '-- PILIH --'
		data.item_id = '--NULL--'
		data.item_name = 'NONE'
		data.itemclass_id = '--NULL--'
		data.itemclass_name = 'NONE'
		data.send_itemassetstatus_id = '0'
		data.send_itemassetstatus_name = '-- PILIH --'
		data.recv_itemassetstatus_id = '--NULL--'
		data.recv_itemassetstatus_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edititemsgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/items-save`

	// options.skipmappingresponse = ['item_id', 'itemclass_id', 'recv_itemassetstatus_id', ];
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
	form.setValue(obj.cbo_item_id, result.dataresponse.item_name!=='--NULL--' ? result.dataresponse.item_id : '--NULL--', result.dataresponse.item_name!=='--NULL--'?result.dataresponse.item_name:'NONE')
	form.setValue(obj.cbo_itemclass_id, result.dataresponse.itemclass_name!=='--NULL--' ? result.dataresponse.itemclass_id : '--NULL--', result.dataresponse.itemclass_name!=='--NULL--'?result.dataresponse.itemclass_name:'NONE')
	form.setValue(obj.cbo_recv_itemassetstatus_id, result.dataresponse.recv_itemassetstatus_name!=='--NULL--' ? result.dataresponse.recv_itemassetstatus_id : '--NULL--', result.dataresponse.recv_itemassetstatus_name!=='--NULL--'?result.dataresponse.recv_itemassetstatus_name:'NONE')

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

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/items-delete`
	
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_edititemsgrid', ()=>{
		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	
	
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
	var objid = obj.txt_itemassetmovedetil_id
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