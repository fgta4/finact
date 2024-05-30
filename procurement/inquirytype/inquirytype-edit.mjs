var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './inquirytype-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')






const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_inquirytype_id: $('#pnl_edit-txt_inquirytype_id'),
	cbo_inquirymodel_id: $('#pnl_edit-cbo_inquirymodel_id'),
	txt_inquirytype_name: $('#pnl_edit-txt_inquirytype_name'),
	chk_inquirytype_isdisabled: $('#pnl_edit-chk_inquirytype_isdisabled'),
	txt_inquirytype_descr: $('#pnl_edit-txt_inquirytype_descr'),
	cbo_inquiryselect_id: $('#pnl_edit-cbo_inquiryselect_id'),
	chk_inquirytype_isperempl: $('#pnl_edit-chk_inquirytype_isperempl'),
	cbo_itemmanage_id: $('#pnl_edit-cbo_itemmanage_id'),
	cbo_related_dept_id: $('#pnl_edit-cbo_related_dept_id'),
	cbo_related_team_id: $('#pnl_edit-cbo_related_team_id'),
	cbo_site_id: $('#pnl_edit-cbo_site_id'),
	cbo_room_id: $('#pnl_edit-cbo_room_id'),
	chk_inquirytype_isallowadvance: $('#pnl_edit-chk_inquirytype_isallowadvance'),
	chk_inquirytype_isemplaspartner: $('#pnl_edit-chk_inquirytype_isemplaspartner'),
	txt_inquirytype_maxadvancevalue: $('#pnl_edit-txt_inquirytype_maxadvancevalue'),
	cbo_owner_dept_id: $('#pnl_edit-cbo_owner_dept_id'),
	cbo_owner_team_id: $('#pnl_edit-cbo_owner_team_id'),
	cbo_orderout_dept_id: $('#pnl_edit-cbo_orderout_dept_id'),
	cbo_orderout_team_id: $('#pnl_edit-cbo_orderout_team_id'),
	cbo_trxmodel_id: $('#pnl_edit-cbo_trxmodel_id'),
	txt_inquiry_title_ina: $('#pnl_edit-txt_inquiry_title_ina'),
	txt_inquiry_title_eng: $('#pnl_edit-txt_inquiry_title_eng'),
	cbo_inquiry_doc_id: $('#pnl_edit-cbo_inquiry_doc_id'),
	txt_request_title_ina: $('#pnl_edit-txt_request_title_ina'),
	txt_request_title_eng: $('#pnl_edit-txt_request_title_eng'),
	cbo_request_doc_id: $('#pnl_edit-cbo_request_doc_id'),
	txt_orderout_title_ina: $('#pnl_edit-txt_orderout_title_ina'),
	txt_orderout_title_eng: $('#pnl_edit-txt_orderout_title_eng'),
	cbo_orderout_doc_id: $('#pnl_edit-cbo_orderout_doc_id'),
	chk_inquiryselect_isshowitemasset: $('#pnl_edit-chk_inquiryselect_isshowitemasset'),
	chk_inquiryselect_isshowitem: $('#pnl_edit-chk_inquiryselect_isshowitem'),
	chk_inquiryselect_isshowitemstock: $('#pnl_edit-chk_inquiryselect_isshowitemstock'),
	chk_inquiryselect_isshowpartner: $('#pnl_edit-chk_inquiryselect_isshowpartner'),
	chk_inquiryselect_isshowitemclass: $('#pnl_edit-chk_inquiryselect_isshowitemclass'),
	chk_inquiryselect_isitemclassdisabled: $('#pnl_edit-chk_inquiryselect_isitemclassdisabled'),
	chk_inquirytype_ispartnerheader: $('#pnl_edit-chk_inquirytype_ispartnerheader'),
	chk_inquirytype_isuseqty: $('#pnl_edit-chk_inquirytype_isuseqty'),
	chk_inquirytype_isusedays: $('#pnl_edit-chk_inquirytype_isusedays'),
	chk_inquirytype_isusetask: $('#pnl_edit-chk_inquirytype_isusetask'),
	chk_inquirytype_islimitqty: $('#pnl_edit-chk_inquirytype_islimitqty'),
	chk_inquirytype_islimitdays: $('#pnl_edit-chk_inquirytype_islimitdays'),
	chk_inquirytype_islimittask: $('#pnl_edit-chk_inquirytype_islimittask'),
	chk_inquirytype_islimitvalue: $('#pnl_edit-chk_inquirytype_islimitvalue'),
	chk_inquirytype_isallowunbudget: $('#pnl_edit-chk_inquirytype_isallowunbudget'),
	chk_inquirytype_isallowitemunbudget: $('#pnl_edit-chk_inquirytype_isallowitemunbudget'),
	chk_inquirytype_isallowoverbudget: $('#pnl_edit-chk_inquirytype_isallowoverbudget'),
	chk_inquirytype_isdeptuser: $('#pnl_edit-chk_inquirytype_isdeptuser'),
	chk_inquirytype_isdeptowner: $('#pnl_edit-chk_inquirytype_isdeptowner'),
	chk_inquirytype_isdeptmaintainer: $('#pnl_edit-chk_inquirytype_isdeptmaintainer'),
	chk_inquirytype_isqtybreakdown: $('#pnl_edit-chk_inquirytype_isqtybreakdown'),
	chk_inquirytype_istoberequest: $('#pnl_edit-chk_inquirytype_istoberequest'),
	chk_inquirytype_isautorequest: $('#pnl_edit-chk_inquirytype_isautorequest'),
	chk_inquirytype_isautoorder: $('#pnl_edit-chk_inquirytype_isautoorder'),
	chk_inquirytype_ismovinginit: $('#pnl_edit-chk_inquirytype_ismovinginit'),
	chk_inquirytype_isdateinterval: $('#pnl_edit-chk_inquirytype_isdateinterval')
}




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
		primary: obj.txt_inquirytype_id,
		autoid: true,
		logview: 'mst_inquirytype',
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
			undefined			
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}

	// Generator: Print Handler not exist
	// Generator: Commit Handler not exist
	// Generator: Approval Handler not exist
	// Generator: Xtion Handler not exist
	// Generator: Object Handler not exist

	// Generator: Upload Handler not exist


	obj.cbo_inquirymodel_id.name = 'pnl_edit-cbo_inquirymodel_id'		
	new fgta4slideselect(obj.cbo_inquirymodel_id, {
		title: 'Pilih inquirymodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquirymodel_id,
		fieldValue: 'inquirymodel_id',
		fieldDisplay: 'inquirymodel_name',
		fields: [
			{mapping: 'inquirymodel_id', text: 'inquirymodel_id'},
			{mapping: 'inquirymodel_name', text: 'inquirymodel_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_inquirymodel_id_selected === 'function') {
					hnd.cbo_inquirymodel_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_inquiryselect_id.name = 'pnl_edit-cbo_inquiryselect_id'		
	new fgta4slideselect(obj.cbo_inquiryselect_id, {
		title: 'Pilih inquiryselect_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiryselect_id,
		fieldValue: 'inquiryselect_id',
		fieldDisplay: 'inquiryselect_name',
		fields: [
			{mapping: 'inquiryselect_id', text: 'inquiryselect_id'},
			{mapping: 'inquiryselect_name', text: 'inquiryselect_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_inquiryselect_id_selected === 'function') {
					hnd.cbo_inquiryselect_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_itemmanage_id.name = 'pnl_edit-cbo_itemmanage_id'		
	new fgta4slideselect(obj.cbo_itemmanage_id, {
		title: 'Pilih itemmanage_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmanage_id,
		fieldValue: 'itemmanage_id',
		fieldDisplay: 'itemmanage_name',
		fields: [
			{mapping: 'itemmanage_id', text: 'itemmanage_id'},
			{mapping: 'itemmanage_name', text: 'itemmanage_name'}
		],

	})				
				
	obj.cbo_related_dept_id.name = 'pnl_edit-cbo_related_dept_id'		
	new fgta4slideselect(obj.cbo_related_dept_id, {
		title: 'Pilih related_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_related_dept_id,
		fieldValue: 'related_dept_id',
		fieldDisplay: 'related_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_related_team_id.name = 'pnl_edit-cbo_related_team_id'		
	new fgta4slideselect(obj.cbo_related_team_id, {
		title: 'Pilih related_team_id',
		returnpage: this_page_id,
		api: $ui.apis.load_related_team_id,
		fieldValue: 'related_team_id',
		fieldDisplay: 'related_team_name',
		fieldValueMap: 'team_id',
		fieldDisplayMap: 'team_name',
		fields: [
			{mapping: 'team_id', text: 'team_id'},
			{mapping: 'team_name', text: 'team_name'}
		],

	})				
				
	obj.cbo_site_id.name = 'pnl_edit-cbo_site_id'		
	new fgta4slideselect(obj.cbo_site_id, {
		title: 'Pilih site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,
		fieldValue: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'}
		],

	})				
				
	obj.cbo_room_id.name = 'pnl_edit-cbo_room_id'		
	new fgta4slideselect(obj.cbo_room_id, {
		title: 'Pilih room_id',
		returnpage: this_page_id,
		api: $ui.apis.load_room_id,
		fieldValue: 'room_id',
		fieldDisplay: 'room_name',
		fields: [
			{mapping: 'room_id', text: 'room_id'},
			{mapping: 'room_name', text: 'room_name'}
		],

	})				
				
	obj.cbo_owner_dept_id.name = 'pnl_edit-cbo_owner_dept_id'		
	new fgta4slideselect(obj.cbo_owner_dept_id, {
		title: 'Pilih owner_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_dept_id,
		fieldValue: 'owner_dept_id',
		fieldDisplay: 'owner_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_owner_team_id.name = 'pnl_edit-cbo_owner_team_id'		
	new fgta4slideselect(obj.cbo_owner_team_id, {
		title: 'Pilih owner_team_id',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_team_id,
		fieldValue: 'owner_team_id',
		fieldDisplay: 'owner_team_name',
		fieldValueMap: 'team_id',
		fieldDisplayMap: 'team_name',
		fields: [
			{mapping: 'team_id', text: 'team_id'},
			{mapping: 'team_name', text: 'team_name'}
		],

	})				
				
	obj.cbo_orderout_dept_id.name = 'pnl_edit-cbo_orderout_dept_id'		
	new fgta4slideselect(obj.cbo_orderout_dept_id, {
		title: 'Pilih orderout_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderout_dept_id,
		fieldValue: 'orderout_dept_id',
		fieldDisplay: 'orderout_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_orderout_team_id.name = 'pnl_edit-cbo_orderout_team_id'		
	new fgta4slideselect(obj.cbo_orderout_team_id, {
		title: 'Pilih orderout_team_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderout_team_id,
		fieldValue: 'orderout_team_id',
		fieldDisplay: 'owner_team_name',
		fieldValueMap: 'team_id',
		fieldDisplayMap: 'team_name',
		fields: [
			{mapping: 'team_id', text: 'team_id'},
			{mapping: 'team_name', text: 'team_name'}
		],

	})				
				
	obj.cbo_trxmodel_id.name = 'pnl_edit-cbo_trxmodel_id'		
	new fgta4slideselect(obj.cbo_trxmodel_id, {
		title: 'Pilih trxmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_trxmodel_id,
		fieldValue: 'trxmodel_id',
		fieldDisplay: 'trxmodel_name',
		fields: [
			{mapping: 'trxmodel_id', text: 'trxmodel_id'},
			{mapping: 'trxmodel_name', text: 'trxmodel_name'}
		],

	})				
				
	obj.cbo_inquiry_doc_id.name = 'pnl_edit-cbo_inquiry_doc_id'		
	new fgta4slideselect(obj.cbo_inquiry_doc_id, {
		title: 'Pilih inquiry_doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiry_doc_id,
		fieldValue: 'inquiry_doc_id',
		fieldDisplay: 'inquiry_doc_name',
		fieldValueMap: 'doc_id',
		fieldDisplayMap: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'}
		],

	})				
				
	obj.cbo_request_doc_id.name = 'pnl_edit-cbo_request_doc_id'		
	new fgta4slideselect(obj.cbo_request_doc_id, {
		title: 'Pilih request_doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_request_doc_id,
		fieldValue: 'request_doc_id',
		fieldDisplay: 'request_doc_name',
		fieldValueMap: 'doc_id',
		fieldDisplayMap: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'}
		],

	})				
				
	obj.cbo_orderout_doc_id.name = 'pnl_edit-cbo_orderout_doc_id'		
	new fgta4slideselect(obj.cbo_orderout_doc_id, {
		title: 'Pilih orderout_doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderout_doc_id,
		fieldValue: 'orderout_doc_id',
		fieldDisplay: 'orderout_doc_name',
		fieldValueMap: 'doc_id',
		fieldDisplayMap: 'doc_name',
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
		if (result.record.related_team_id==null) { result.record.related_team_id='--NULL--'; result.record.related_team_name='NONE'; }
		if (result.record.site_id==null) { result.record.site_id='--NULL--'; result.record.site_name='NONE'; }
		if (result.record.room_id==null) { result.record.room_id='--NULL--'; result.record.room_name='NONE'; }
		if (result.record.owner_dept_id==null) { result.record.owner_dept_id='--NULL--'; result.record.owner_dept_name='NONE'; }
		if (result.record.owner_team_id==null) { result.record.owner_team_id='--NULL--'; result.record.owner_team_name='NONE'; }
		if (result.record.orderout_team_id==null) { result.record.orderout_team_id='--NULL--'; result.record.owner_team_name='NONE'; }

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
			.setValue(obj.cbo_inquirymodel_id, record.inquirymodel_id, record.inquirymodel_name)
			.setValue(obj.cbo_inquiryselect_id, record.inquiryselect_id, record.inquiryselect_name)
			.setValue(obj.cbo_itemmanage_id, record.itemmanage_id, record.itemmanage_name)
			.setValue(obj.cbo_related_dept_id, record.related_dept_id, record.related_dept_name)
			.setValue(obj.cbo_related_team_id, record.related_team_id, record.related_team_name)
			.setValue(obj.cbo_site_id, record.site_id, record.site_name)
			.setValue(obj.cbo_room_id, record.room_id, record.room_name)
			.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.owner_dept_name)
			.setValue(obj.cbo_owner_team_id, record.owner_team_id, record.owner_team_name)
			.setValue(obj.cbo_orderout_dept_id, record.orderout_dept_id, record.orderout_dept_name)
			.setValue(obj.cbo_orderout_team_id, record.orderout_team_id, record.owner_team_name)
			.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name)
			.setValue(obj.cbo_inquiry_doc_id, record.inquiry_doc_id, record.inquiry_doc_name)
			.setValue(obj.cbo_request_doc_id, record.request_doc_id, record.request_doc_name)
			.setValue(obj.cbo_orderout_doc_id, record.orderout_doc_id, record.orderout_doc_name)
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
		data.inquirytype_isdisabled = '0'
		data.inquirytype_isperempl = '0'
		data.inquirytype_isallowadvance = '0'
		data.inquirytype_isemplaspartner = '0'
		data.inquirytype_maxadvancevalue = 0
		data.inquiryselect_isshowitemasset = '0'
		data.inquiryselect_isshowitem = '0'
		data.inquiryselect_isshowitemstock = '0'
		data.inquiryselect_isshowpartner = '0'
		data.inquiryselect_isshowitemclass = '0'
		data.inquiryselect_isitemclassdisabled = '0'
		data.inquirytype_ispartnerheader = '0'
		data.inquirytype_isuseqty = '0'
		data.inquirytype_isusedays = '0'
		data.inquirytype_isusetask = '0'
		data.inquirytype_islimitqty = '0'
		data.inquirytype_islimitdays = '0'
		data.inquirytype_islimittask = '0'
		data.inquirytype_islimitvalue = '0'
		data.inquirytype_isallowunbudget = '0'
		data.inquirytype_isallowitemunbudget = '0'
		data.inquirytype_isallowoverbudget = '0'
		data.inquirytype_isdeptuser = '0'
		data.inquirytype_isdeptowner = '0'
		data.inquirytype_isdeptmaintainer = '0'
		data.inquirytype_isqtybreakdown = '0'
		data.inquirytype_istoberequest = '0'
		data.inquirytype_isautorequest = '0'
		data.inquirytype_isautoorder = '0'
		data.inquirytype_ismovinginit = '0'
		data.inquirytype_isdateinterval = '0'

		data.inquirymodel_id = '0'
		data.inquirymodel_name = '-- PILIH --'
		data.inquiryselect_id = '0'
		data.inquiryselect_name = '-- PILIH --'
		data.itemmanage_id = '0'
		data.itemmanage_name = '-- PILIH --'
		data.related_dept_id = '0'
		data.related_dept_name = '-- PILIH --'
		data.related_team_id = '--NULL--'
		data.related_team_name = 'NONE'
		data.site_id = '--NULL--'
		data.site_name = 'NONE'
		data.room_id = '--NULL--'
		data.room_name = 'NONE'
		data.owner_dept_id = '--NULL--'
		data.owner_dept_name = 'NONE'
		data.owner_team_id = '--NULL--'
		data.owner_team_name = 'NONE'
		data.orderout_dept_id = '0'
		data.orderout_dept_name = '-- PILIH --'
		data.orderout_team_id = '--NULL--'
		data.owner_team_name = 'NONE'
		data.trxmodel_id = '0'
		data.trxmodel_name = '-- PILIH --'
		data.inquiry_doc_id = '0'
		data.inquiry_doc_name = '-- PILIH --'
		data.request_doc_id = '0'
		data.request_doc_name = '-- PILIH --'
		data.orderout_doc_id = '0'
		data.orderout_doc_name = '-- PILIH --'

		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}




		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editpartnertypegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmodeltransaksigrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_edititemclassgrid'].handler.createnew(data, options)


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


	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini


	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini


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
	var objid = obj.txt_inquirytype_id
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
	// options.skipmappingresponse = ['related_team_id', 'site_id', 'room_id', 'owner_dept_id', 'owner_team_id', 'orderout_team_id', ];
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
	form.setValue(obj.cbo_related_team_id, result.dataresponse.related_team_name!=='--NULL--' ? result.dataresponse.related_team_id : '--NULL--', result.dataresponse.related_team_name!=='--NULL--'?result.dataresponse.related_team_name:'NONE')
	form.setValue(obj.cbo_site_id, result.dataresponse.site_name!=='--NULL--' ? result.dataresponse.site_id : '--NULL--', result.dataresponse.site_name!=='--NULL--'?result.dataresponse.site_name:'NONE')
	form.setValue(obj.cbo_room_id, result.dataresponse.room_name!=='--NULL--' ? result.dataresponse.room_id : '--NULL--', result.dataresponse.room_name!=='--NULL--'?result.dataresponse.room_name:'NONE')
	form.setValue(obj.cbo_owner_dept_id, result.dataresponse.owner_dept_name!=='--NULL--' ? result.dataresponse.owner_dept_id : '--NULL--', result.dataresponse.owner_dept_name!=='--NULL--'?result.dataresponse.owner_dept_name:'NONE')
	form.setValue(obj.cbo_owner_team_id, result.dataresponse.owner_team_name!=='--NULL--' ? result.dataresponse.owner_team_id : '--NULL--', result.dataresponse.owner_team_name!=='--NULL--'?result.dataresponse.owner_team_name:'NONE')
	form.setValue(obj.cbo_orderout_team_id, result.dataresponse.owner_team_name!=='--NULL--' ? result.dataresponse.orderout_team_id : '--NULL--', result.dataresponse.owner_team_name!=='--NULL--'?result.dataresponse.owner_team_name:'NONE')

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




