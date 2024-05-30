var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editdetilform-title')
const btn_edit = $('#pnl_editdetilform-btn_edit')
const btn_save = $('#pnl_editdetilform-btn_save')
const btn_delete = $('#pnl_editdetilform-btn_delete')
const btn_prev = $('#pnl_editdetilform-btn_prev')
const btn_next = $('#pnl_editdetilform-btn_next')
const btn_addnew = $('#pnl_editdetilform-btn_addnew')
const chk_autoadd = $('#pnl_editdetilform-autoadd')


const pnl_form = $('#pnl_editdetilform-form')
const obj = {
	txt_billindetil_id: $('#pnl_editdetilform-txt_billindetil_id'),
	cbo_rowitem_id: $('#pnl_editdetilform-cbo_rowitem_id'),
	cbo_taxtype_id: $('#pnl_editdetilform-cbo_taxtype_id'),
	cbo_itemclass_id: $('#pnl_editdetilform-cbo_itemclass_id'),
	cbo_projbudgetdet_id: $('#pnl_editdetilform-cbo_projbudgetdet_id'),
	txt_billindetil_descr: $('#pnl_editdetilform-txt_billindetil_descr'),
	txt_billindetil_valfrg: $('#pnl_editdetilform-txt_billindetil_valfrg'),
	cbo_curr_id: $('#pnl_editdetilform-cbo_curr_id'),
	txt_billindetil_valfrgrate: $('#pnl_editdetilform-txt_billindetil_valfrgrate'),
	txt_billindetil_validr: $('#pnl_editdetilform-txt_billindetil_validr'),
	txt_billindetil_valavailable: $('#pnl_editdetilform-txt_billindetil_valavailable'),
	cbo_projbudget_id: $('#pnl_editdetilform-cbo_projbudget_id'),
	cbo_projbudgettask_id: $('#pnl_editdetilform-cbo_projbudgettask_id'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	cbo_coa_id: $('#pnl_editdetilform-cbo_coa_id'),
	txt_billin_id: $('#pnl_editdetilform-txt_billin_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_billindetil_id,
		autoid: true,
		logview: 'trn_billindetil',
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




	obj.cbo_rowitem_id.name = 'pnl_editdetilform-cbo_rowitem_id'		
	new fgta4slideselect(obj.cbo_rowitem_id, {
		title: 'Pilih rowitem_id',
		returnpage: this_page_id,
		api: $ui.apis.load_rowitem_id,
		fieldValue: 'rowitem_id',
		fieldValueMap: 'rowtype_id',
		fieldDisplay: 'rowtype_name',
		fields: [
			{mapping: 'rowtype_id', text: 'rowtype_id'},
			{mapping: 'rowtype_name', text: 'rowtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_taxtype_id.name = 'pnl_editdetilform-cbo_taxtype_id'		
	new fgta4slideselect(obj.cbo_taxtype_id, {
		title: 'Pilih taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_taxtype_id,
		fieldValue: 'taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_itemclass_id.name = 'pnl_editdetilform-cbo_itemclass_id'		
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
		OnDataLoading: (criteria) => {
			criteria.dept_id = header_data.dept_id
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclass_id:'--NULL--', itemclass_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_projbudgetdet_id.name = 'pnl_editdetilform-cbo_projbudgetdet_id'		
	new fgta4slideselect(obj.cbo_projbudgetdet_id, {
		title: 'Pilih projbudgetdet_id',
		returnpage: this_page_id,
		api:  `${global.modulefullname}/get-projbudgetdet-available`, // $ui.apis.load_projbudgetdet_id,
		fieldValue: 'projbudgetdet_id',
		fieldValueMap: 'projbudgetdet_id',
		fieldDisplay: 'projbudgetdet_descr',
		fields: [
			{mapping: 'projbudgetdet_id', text: 'ID'},
			{mapping: 'projbudgetdet_descr', text: 'Descr'},
			{mapping: 'projbudgetdet_available', text: 'Available', formatter: "row_format_number", style: "width: 100px; text-align: right" },
		],
		OnDataLoading: (criteria) => {
			criteria.projbudget_id = form.getValue(obj.cbo_projbudget_id);
			criteria.in_exclude_billingdetil_id = form.getValue(obj.txt_billindetil_id);
			criteria.itemclass_id = form.getValue(obj.cbo_itemclass_id);
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgetdet_id:'--NULL--', projbudgetdet_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.cbo_accbudget_id, record.accbudget_id, record.accbudget_name)
			form.setValue(obj.cbo_coa_id, record.coa_id, record.coa_name)
			form.setValue(obj.txt_billindetil_valavailable, record.projbudgetdet_available)

			console.log('test');
			var avaialable = parseFloat(record.projbudgetdet_available)
			var curr_rate = parseFloat(form.getValue(obj.txt_billindetil_valfrgrate))
			var value = avaialable/curr_rate;

			form.setValue(obj.txt_billindetil_valfrg, value);
			form.setValue(obj.txt_billindetil_validr, value);


		}
	})				
			
	obj.cbo_curr_id.name = 'pnl_editdetilform-cbo_curr_id'		
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
			
	obj.cbo_projbudget_id.name = 'pnl_editdetilform-cbo_projbudget_id'		
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudget_id:'--NULL--', projbudget_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_projbudgettask_id.name = 'pnl_editdetilform-cbo_projbudgettask_id'		
	new fgta4slideselect(obj.cbo_projbudgettask_id, {
		title: 'Pilih projbudgettask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudgettask_id,
		fieldValue: 'projbudgettask_id',
		fieldValueMap: 'projbudgettask_id',
		fieldDisplay: 'projecttask_name',
		fields: [
			{mapping: 'projbudgettask_id', text: 'projbudgettask_id'},
			{mapping: 'projecttask_name', text: 'projecttask_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgettask_id:'--NULL--', projecttask_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_accbudget_id.name = 'pnl_editdetilform-cbo_accbudget_id'		
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({accbudget_id:'--NULL--', accbudget_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_coa_id.name = 'pnl_editdetilform-cbo_coa_id'		
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
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
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



	obj.txt_billindetil_valfrg.numberbox({ onChange: (newvalue, oldvalue) => {  txt_billindetil_valfrg_valuechanged(newvalue, oldvalue); } })


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
					$ui.getPages().show('pnl_editdetilgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editdetilgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.scrolllast()
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
	txt_title.html(hdata.billin_descr)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		console.log(result.record);


		if (result.record.taxtype_id==null) { result.record.taxtype_id='--NULL--'; result.record.taxtype_name='NONE'; }
		if (result.record.itemclass_id==null) { result.record.itemclass_id='--NULL--'; result.record.itemclass_name='NONE'; }
		if (result.record.projbudgetdet_id==null) { result.record.projbudgetdet_id='--NULL--'; result.record.projbudgetdet_descr='NONE'; }
		if (result.record.projbudget_id==null) { result.record.projbudget_id='--NULL--'; result.record.projbudget_name='NONE'; }
		if (result.record.projbudgettask_id==null) { result.record.projbudgettask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.accbudget_id==null) { result.record.accbudget_id='--NULL--'; result.record.accbudget_name='NONE'; }
		if (result.record.coa_id==null) { result.record.coa_id='--NULL--'; result.record.coa_name='NONE'; }


		// console.log('xx');
		// if (result.record.projbudgetdet_id!=null && result.record.projbudgetdet_descr=='') {
		// 	result.record.projbudgetdet_descr = result.record.accbudget_name
		// } else {
		// 	result.record.projbudgetdet_descr = 'NONE';
		// }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_rowitem_id, result.record.rowitem_id, result.record.rowtype_name)
			.setValue(obj.cbo_taxtype_id, result.record.taxtype_id, result.record.taxtype_name)
			.setValue(obj.cbo_itemclass_id, result.record.itemclass_id, result.record.itemclass_name)
			.setValue(obj.cbo_projbudgetdet_id, result.record.projbudgetdet_id, result.record.projbudgetdet_descr)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_projbudget_id, result.record.projbudget_id, result.record.projbudget_name)
			.setValue(obj.cbo_projbudgettask_id, result.record.projbudgettask_id, result.record.projecttask_name)
			.setValue(obj.cbo_accbudget_id, result.record.accbudget_id, result.record.accbudget_name)
			.setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
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
		data.billin_id= hdata.billin_id
		data.detil_value = 0

		console.log(header_data);

		data.billindetil_valfrg = 0
		data.billindetil_valfrgrate = header_data.billin_valfrgrate
		data.billindetil_validr = 0
		data.billindetil_valavailable = 0;

		data.rowitem_id = '0'
		data.rowtype_name = '-- PILIH --'
		data.taxtype_id = '--NULL--'
		data.taxtype_name = 'NONE'
		data.itemclass_id = '--NULL--'
		data.itemclass_name = 'NONE'
		data.projbudgetdet_id = '--NULL--'
		data.projbudgetdet_descr = 'NONE'
		data.curr_id = header_data.curr_id
		data.curr_name = header_data.curr_name;
		
		data.projbudget_id = header_data.projbudget_id // '--NULL--'
		data.projbudget_name = header_data.projbudget_name //'NONE'
		
		
		data.projbudgettask_id = '--NULL--'
		data.projecttask_name = 'NONE'
		data.accbudget_id = '--NULL--'
		data.accbudget_name = 'NONE'
		data.coa_id = '--NULL--'
		data.coa_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`


	// cek
	try {
		var idr =  parseFloat(form.getValue(obj.txt_billindetil_validr))
		var avaialable = parseFloat(form.getValue(obj.txt_billindetil_valavailable))

		if (idr>avaialable) {
			throw new Error('Budget yang tersedia kurang dari yang di ajukan. silakan revisi budget terlebih dahulu');
		}

	} catch (err) {
		options.cancel= true;
		$ui.ShowMessage("[WARNING]"+err.message);
		return;
	}


	options.skipmappingresponse = [
		'taxtype_id', 'itemclass_id', 'projbudgetdet_id', 'projbudget_id', 'projbudgettask_id', 'accbudget_id', 'coa_id',
	]
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)


	if (result.dataresponse.projbudgetdet_id!=null && result.dataresponse.projbudgetdet_descr=='') {
		result.dataresponse.projbudgetdet_descr = result.dataresponse.accbudget_name
	} else {
		result.dataresponse.projbudgetdet_descr = 'NONE';
	}

	form.setValue(obj.cbo_taxtype_id, result.dataresponse.taxtype_name!=='--NULL--' ? result.dataresponse.taxtype_id : '--NULL--', result.dataresponse.taxtype_name!=='--NULL--'?result.dataresponse.taxtype_name:'NONE')
	form.setValue(obj.cbo_itemclass_id, result.dataresponse.itemclass_name!=='--NULL--' ? result.dataresponse.itemclass_id : '--NULL--', result.dataresponse.itemclass_name!=='--NULL--'?result.dataresponse.itemclass_name:'NONE')
	form.setValue(obj.cbo_projbudgetdet_id, result.dataresponse.projbudgetdet_descr!=='--NULL--' ? result.dataresponse.projbudgetdet_id : '--NULL--', result.dataresponse.projbudgetdet_descr!=='--NULL--'?result.dataresponse.projbudgetdet_descr:'NONE')
	form.setValue(obj.cbo_projbudget_id, result.dataresponse.projbudget_name!=='--NULL--' ? result.dataresponse.projbudget_id : '--NULL--', result.dataresponse.projbudget_name!=='--NULL--'?result.dataresponse.projbudget_name:'NONE')
	form.setValue(obj.cbo_projbudgettask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projbudgettask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_accbudget_id, result.dataresponse.accbudget_name!=='--NULL--' ? result.dataresponse.accbudget_id : '--NULL--', result.dataresponse.accbudget_name!=='--NULL--'?result.dataresponse.accbudget_name:'NONE')
	form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')




	form.rowid = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/detil-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editdetilgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_billindetil_id
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
	var record = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}


function txt_billindetil_valfrg_valuechanged(newvalue, oldvalue) {
	form_recalculate();
}

function form_recalculate() {
	var rate = parseFloat(form.getValue(obj.txt_billindetil_valfrgrate))
	var value =  parseFloat(form.getValue(obj.txt_billindetil_valfrg))
	var idr = value * rate;
	form.setValue(obj.txt_billindetil_validr, idr);
}