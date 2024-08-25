var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemclass-accountform-hnd.mjs'

const reload_header_modified = true;

const txt_caption = $('#pnl_editaccountform-caption')
const txt_title = $('#pnl_editaccountform-title')
const btn_edit = $('#pnl_editaccountform-btn_edit')
const btn_save = $('#pnl_editaccountform-btn_save')
const btn_delete = $('#pnl_editaccountform-btn_delete')
const btn_prev = $('#pnl_editaccountform-btn_prev')
const btn_next = $('#pnl_editaccountform-btn_next')
const btn_addnew = $('#pnl_editaccountform-btn_addnew')
const chk_autoadd = $('#pnl_editaccountform-autoadd')


const pnl_form = $('#pnl_editaccountform-form')
const obj = {
	txt_itemclassaccbudget_id: $('#pnl_editaccountform-txt_itemclassaccbudget_id'),
	cbo_projectmodel_id: $('#pnl_editaccountform-cbo_projectmodel_id'),
	cbo_inquiry_accbudget_id: $('#pnl_editaccountform-cbo_inquiry_accbudget_id'),
	cbo_nr_coa_id: $('#pnl_editaccountform-cbo_nr_coa_id'),
	cbo_lr_coa_id: $('#pnl_editaccountform-cbo_lr_coa_id'),
	txt_itemclass_id: $('#pnl_editaccountform-txt_itemclass_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	txt_caption.template = txt_caption.html();

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_itemclassaccbudget_id,
		autoid: true,
		logview: 'mst_itemclassaccbudget',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnGettingData: (data) => { form_gettingdata(data) },

	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)





	obj.cbo_projectmodel_id.name = 'pnl_editaccountform-cbo_projectmodel_id'		
	new fgta4slideselect(obj.cbo_projectmodel_id, {
		title: 'Pilih projectmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projectmodel_id,
		fieldValue: 'projectmodel_id',
		fieldDisplay: 'projectmodel_name',
		fields: [
			{mapping: 'projectmodel_id', text: 'projectmodel_id'},
			{mapping: 'projectmodel_name', text: 'projectmodel_name'}
		],

	})				
			
	obj.cbo_inquiry_accbudget_id.name = 'pnl_editaccountform-cbo_inquiry_accbudget_id'		
	new fgta4slideselect(obj.cbo_inquiry_accbudget_id, {
		title: 'Pilih inquiry_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiry_accbudget_id,
		fieldValue: 'inquiry_accbudget_id',
		fieldDisplay: 'inquiry_accbudget_name',
		fieldValueMap: 'accbudget_id',
		fieldDisplayMap: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'}
		],

	})				
			
	obj.cbo_nr_coa_id.name = 'pnl_editaccountform-cbo_nr_coa_id'		
	new fgta4slideselect(obj.cbo_nr_coa_id, {
		title: 'Pilih COA Neraca',
		returnpage: this_page_id,
		api: $ui.apis.load_nr_coa_id,
		fieldValue: 'nr_coa_id',
		fieldDisplay: 'settl_coa_name',
		fieldValueMap: 'coa_id',
		fieldDisplayMap: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_nr_coa_id_dataloading === 'function') {
					hnd.cbo_nr_coa_id_dataloading(criteria, options);
				}
			}						
		},					

	})				
			
	obj.cbo_lr_coa_id.name = 'pnl_editaccountform-cbo_lr_coa_id'		
	new fgta4slideselect(obj.cbo_lr_coa_id, {
		title: 'Pilih COA Laba Rugi',
		returnpage: this_page_id,
		api: $ui.apis.load_lr_coa_id,
		fieldValue: 'lr_coa_id',
		fieldDisplay: 'cost_coa_name',
		fieldValueMap: 'coa_id',
		fieldDisplayMap: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd!=='undefined') { 
				if (typeof hnd.cbo_lr_coa_id_dataloading === 'function') {
					hnd.cbo_lr_coa_id_dataloading(criteria, options);
				}
			}						
		},					

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
		var element = document.activeElement;
		element.blur();
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editaccountgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editaccountgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.scrolllast()
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

	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt
		})
	}

}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	header_data = hdata

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', '');
	caption = caption.replace('{{STATE_END}}', ' View');
	txt_caption.html(caption);

	txt_title.html(header_data.itemclass_name)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'open');
		}
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/account-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*
		if (record.nr_coa_id==null) { record.nr_coa_id='--NULL--'; record.settl_coa_name='NONE'; }
		if (record.lr_coa_id==null) { record.lr_coa_id='--NULL--'; record.cost_coa_name='NONE'; }

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

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_projectmodel_id, record.projectmodel_id, record.projectmodel_name)
			.setValue(obj.cbo_inquiry_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name)
			.setValue(obj.cbo_nr_coa_id, record.nr_coa_id, record.settl_coa_name)
			.setValue(obj.cbo_lr_coa_id, record.lr_coa_id, record.cost_coa_name)
			.setViewMode()
			.rowid = rowid



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


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		form.commit()
		form.SuspendEvent(false);



	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', 'Create New ');
	caption = caption.replace('{{STATE_END}}', '');
	txt_caption.html(caption);

	txt_title.html(header_data.itemclass_name)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'new');
		}
	}

	form.createnew(async (data, options)=>{
		data.itemclass_id = hdata.itemclass_id
		data.account_value = 0


		data.projectmodel_id = '0'
		data.projectmodel_name = '-- PILIH --'
		data.inquiry_accbudget_id = '0'
		data.inquiry_accbudget_name = '-- PILIH --'
		data.nr_coa_id = '--NULL--'
		data.settl_coa_name = 'NONE'
		data.lr_coa_id = '--NULL--'
		data.cost_coa_name = 'NONE'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editaccountgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/account-save`

	// options.skipmappingresponse = ['nr_coa_id', 'lr_coa_id', ];
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
	console.error(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
	if (options.supress_error_dialog!=true) {
		$ui.ShowMessage('[ERROR]'+err.message);
	}
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*
	form.setValue(obj.cbo_nr_coa_id, result.dataresponse.settl_coa_name!=='--NULL--' ? result.dataresponse.nr_coa_id : '--NULL--', result.dataresponse.settl_coa_name!=='--NULL--'?result.dataresponse.settl_coa_name:'NONE')
	form.setValue(obj.cbo_lr_coa_id, result.dataresponse.cost_coa_name!=='--NULL--' ? result.dataresponse.lr_coa_id : '--NULL--', result.dataresponse.cost_coa_name!=='--NULL--'?result.dataresponse.cost_coa_name:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_editaccountgrid'].handler.updategrid(data, form.rowid)
	var rowdata = {
		data: data,
		rowid: form.rowid
	}

	
	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		if (currentRowdata!=null) {
			$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
			});	
		}
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/account-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editaccountgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		if (currentRowdata!=null) {
			$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
			});	
		}

	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}


function form_gettingdata(data) {
	if (hnd!=null) {
		if (typeof hnd.form_gettingdata == 'function') {
			hnd.form_gettingdata(data);
		}
	}
}

function form_viewmodechanged(viewonly) {

	console.log('View Mode changed');
	var caption = txt_caption.template;

	if (viewonly) {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' View');
		txt_caption.html(caption);

		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		var currcaption = txt_caption.html();
		if (currcaption.substring(0,10)!='Create New') {
			caption = caption.replace('{{STATE_BEG}}', '');
			caption = caption.replace('{{STATE_END}}', ' Edit');
			txt_caption.html(caption);
		} 

		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
	


	if (typeof hnd.form_viewmodechanged == 'function') {
		hnd.form_viewmodechanged(viewonly);
	}
}


function form_idsetup(options) {
	var objid = obj.txt_itemclassaccbudget_id
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
	var record = $ui.getPages().ITEMS['pnl_editaccountgrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editaccountgrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}