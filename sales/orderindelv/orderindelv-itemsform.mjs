var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

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
	txt_orderindelvitem_id: $('#pnl_edititemsform-txt_orderindelvitem_id'),
	cbo_itemclass_id: $('#pnl_edititemsform-cbo_itemclass_id'),
	txt_orderinitem_descr: $('#pnl_edititemsform-txt_orderinitem_descr'),
	txt_orderinitem_qty: $('#pnl_edititemsform-txt_orderinitem_qty'),
	txt_orderinitem_price: $('#pnl_edititemsform-txt_orderinitem_price'),
	txt_orderinitem_pricediscpercent: $('#pnl_edititemsform-txt_orderinitem_pricediscpercent'),
	txt_orderinitem_pricediscvalue: $('#pnl_edititemsform-txt_orderinitem_pricediscvalue'),
	txt_orderinitem_subtotal: $('#pnl_edititemsform-txt_orderinitem_subtotal'),
	cbo_accbudget_id: $('#pnl_edititemsform-cbo_accbudget_id'),
	cbo_coa_id: $('#pnl_edititemsform-cbo_coa_id'),
	txt_orderindelv_id: $('#pnl_edititemsform-txt_orderindelv_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_orderindelvitem_id,
		autoid: true,
		logview: 'trn_orderindelvitem',
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
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_itemclass_id_dataloading === 'function') {
					hnd.cbo_itemclass_id_dataloading(criteria);
				}
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_itemclass_id_dataloaded === 'function') {
					hnd.cbo_itemclass_id_dataloaded(result, options);
				}
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				console.log(record);		
				form.setValue(obj.cbo_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name)
				form.setValue(obj.cbo_coa_id, record.settl_coa_id, record.settl_coa_name)		
						
				if (typeof hnd!=='undefined') {  
					if (typeof hnd.cbo_itemclass_id_selected === 'function') {
						hnd.cbo_itemclass_id_selected(value, display, record, args);
					}
				}
			}			
		}
	})				
			
	obj.cbo_accbudget_id.name = 'pnl_edititemsform-cbo_accbudget_id'		
	new fgta4slideselect(obj.cbo_accbudget_id, {
		title: 'Pilih accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_accbudget_id,
		fieldValue: 'accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_accbudget_id_dataloading === 'function') {
					hnd.cbo_accbudget_id_dataloading(criteria);
				}
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({accbudget_id:'--NULL--', accbudget_name:'NONE'});	
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_accbudget_id_dataloaded === 'function') {
					hnd.cbo_accbudget_id_dataloaded(result, options);
				}
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd!=='undefined') {  
					if (typeof hnd.cbo_accbudget_id_selected === 'function') {
						hnd.cbo_accbudget_id_selected(value, display, record, args);
					}
				}
			}			
		}
	})				
			
	obj.cbo_coa_id.name = 'pnl_edititemsform-cbo_coa_id'		
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_coa_id_dataloading === 'function') {
					hnd.cbo_coa_id_dataloading(criteria);
				}
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_coa_id_dataloaded === 'function') {
					hnd.cbo_coa_id_dataloaded(result, options);
				}
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd!=='undefined') {  
					if (typeof hnd.cbo_coa_id_selected === 'function') {
						hnd.cbo_coa_id_selected(value, display, record, args);
					}
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
	txt_title.html(hdata.orderindelv_descr)
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
		if (record.accbudget_id==null) { record.accbudget_id='--NULL--'; record.accbudget_name='NONE'; }
		if (record.coa_id==null) { record.coa_id='--NULL--'; record.coa_name='NONE'; }

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
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_accbudget_id, record.accbudget_id, record.accbudget_name)
			.setValue(obj.cbo_coa_id, record.coa_id, record.coa_name)
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
		data.orderindelv_id= hdata.orderindelv_id
		data.items_value = 0

		data.orderinitem_qty = 0
		data.orderinitem_price = 0
		data.orderinitem_pricediscpercent = 0
		data.orderinitem_pricediscvalue = 0
		data.orderinitem_subtotal = 0

		data.itemclass_id = '0'
		data.itemclass_name = '-- PILIH --'
		data.accbudget_id = '--NULL--'
		data.accbudget_name = 'NONE'
		data.coa_id = '--NULL--'
		data.coa_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edititemsgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/items-save`

	// options.skipmappingresponse = ['accbudget_id', 'coa_id', ];
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
	form.setValue(obj.cbo_accbudget_id, result.dataresponse.accbudget_name!=='--NULL--' ? result.dataresponse.accbudget_id : '--NULL--', result.dataresponse.accbudget_name!=='--NULL--'?result.dataresponse.accbudget_name:'NONE')
	form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')

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
	var objid = obj.txt_orderindelvitem_id
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