var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemassetmove-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			




const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemassetmove_id: $('#pnl_edit-txt_itemassetmove_id'),
	cbo_inquiry_id: $('#pnl_edit-cbo_inquiry_id'),
	chk_itemassetmove_isunreferenced: $('#pnl_edit-chk_itemassetmove_isunreferenced'),
	cbo_itemassetmovemodel_id: $('#pnl_edit-cbo_itemassetmovemodel_id'),
	cbo_itemassetmovetype_id: $('#pnl_edit-cbo_itemassetmovetype_id'),
	dt_itemassetmove_dtstart: $('#pnl_edit-dt_itemassetmove_dtstart'),
	dt_itemassetmove_dtexpected: $('#pnl_edit-dt_itemassetmove_dtexpected'),
	dt_itemassetmove_dtend: $('#pnl_edit-dt_itemassetmove_dtend'),
	txt_itemassetmove_descr: $('#pnl_edit-txt_itemassetmove_descr'),
	cbo_user_dept_id: $('#pnl_edit-cbo_user_dept_id'),
	cbo_from_site_id: $('#pnl_edit-cbo_from_site_id'),
	cbo_from_room_id: $('#pnl_edit-cbo_from_room_id'),
	cbo_from_empl_id: $('#pnl_edit-cbo_from_empl_id'),
	cbo_to_dept_id: $('#pnl_edit-cbo_to_dept_id'),
	cbo_to_site_id: $('#pnl_edit-cbo_to_site_id'),
	cbo_to_room_id: $('#pnl_edit-cbo_to_room_id'),
	cbo_to_empl_id: $('#pnl_edit-cbo_to_empl_id'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_itemassetmove_version: $('#pnl_edit-txt_itemassetmove_version'),
	chk_itemassetmove_isdateinterval: $('#pnl_edit-chk_itemassetmove_isdateinterval'),
	chk_itemassetmove_isdept: $('#pnl_edit-chk_itemassetmove_isdept'),
	chk_itemassetmove_isemployee: $('#pnl_edit-chk_itemassetmove_isemployee'),
	chk_itemassetmove_issite: $('#pnl_edit-chk_itemassetmove_issite'),
	chk_itemassetmove_isroom: $('#pnl_edit-chk_itemassetmove_isroom'),
	chk_itemassetmove_isreturn: $('#pnl_edit-chk_itemassetmove_isreturn'),
	chk_itemassetmove_iscommit: $('#pnl_edit-chk_itemassetmove_iscommit'),
	txt_itemassetmove_commitby: $('#pnl_edit-txt_itemassetmove_commitby'),
	txt_itemassetmove_commitdate: $('#pnl_edit-txt_itemassetmove_commitdate'),
	chk_itemassetmove_issend: $('#pnl_edit-chk_itemassetmove_issend'),
	txt_itemassetmove_sendby: $('#pnl_edit-txt_itemassetmove_sendby'),
	txt_itemassetmove_senddate: $('#pnl_edit-txt_itemassetmove_senddate'),
	chk_itemassetmove_isrcv: $('#pnl_edit-chk_itemassetmove_isrcv'),
	txt_itemassetmove_rcvby: $('#pnl_edit-txt_itemassetmove_rcvby'),
	txt_itemassetmove_rcvdate: $('#pnl_edit-txt_itemassetmove_rcvdate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form;
let rowdata;

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
		primary: obj.txt_itemassetmove_id,
		autoid: true,
		logview: 'trn_itemassetmove',
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
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			







	new fgta4slideselect(obj.cbo_inquiry_id, {
		title: 'Pilih inquiry_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiry_id,
		fieldValue: 'inquiry_id',
		fieldValueMap: 'inquiry_id',
		fieldDisplay: 'inquiry_descr',
		fields: [
			{mapping: 'inquiry_id', text: 'inquiry_id'},
			{mapping: 'inquiry_descr', text: 'inquiry_descr'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_inquiry_id_dataloading === 'function') {
				hnd.cbo_inquiry_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({inquiry_id:'--NULL--', inquiry_descr:'NONE'});	
			if (typeof hnd.cbo_inquiry_id_dataloaded === 'function') {
				hnd.cbo_inquiry_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_inquiry_id_selected === 'function') {
					hnd.cbo_inquiry_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemassetmovemodel_id, {
		title: 'Pilih itemassetmovemodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemassetmovemodel_id,
		fieldValue: 'itemassetmovemodel_id',
		fieldValueMap: 'itemassetmovemodel_id',
		fieldDisplay: 'itemassetmovemodel_name',
		fields: [
			{mapping: 'itemassetmovemodel_id', text: 'itemassetmovemodel_id'},
			{mapping: 'itemassetmovemodel_name', text: 'itemassetmovemodel_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_itemassetmovemodel_id_dataloading === 'function') {
				hnd.cbo_itemassetmovemodel_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_itemassetmovemodel_id_dataloaded === 'function') {
				hnd.cbo_itemassetmovemodel_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemassetmovemodel_id_selected === 'function') {
					hnd.cbo_itemassetmovemodel_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemassetmovetype_id, {
		title: 'Pilih itemassetmovetype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemassetmovetype_id,
		fieldValue: 'itemassetmovetype_id',
		fieldValueMap: 'itemassetmovetype_id',
		fieldDisplay: 'itemassetmovetype_name',
		fields: [
			{mapping: 'itemassetmovetype_id', text: 'itemassetmovetype_id'},
			{mapping: 'itemassetmovetype_name', text: 'itemassetmovetype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_itemassetmovetype_id_dataloading === 'function') {
				hnd.cbo_itemassetmovetype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_itemassetmovetype_id_dataloaded === 'function') {
				hnd.cbo_itemassetmovetype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemassetmovetype_id_selected === 'function') {
					hnd.cbo_itemassetmovetype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_user_dept_id, {
		title: 'Pilih user_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,
		fieldValue: 'user_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_user_dept_id_dataloading === 'function') {
				hnd.cbo_user_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_user_dept_id_dataloaded === 'function') {
				hnd.cbo_user_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_user_dept_id_selected === 'function') {
					hnd.cbo_user_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_from_site_id, {
		title: 'Pilih from_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_from_site_id,
		fieldValue: 'from_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_from_site_id_dataloading === 'function') {
				hnd.cbo_from_site_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_from_site_id_dataloaded === 'function') {
				hnd.cbo_from_site_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_from_site_id_selected === 'function') {
					hnd.cbo_from_site_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_from_room_id, {
		title: 'Pilih from_room_id',
		returnpage: this_page_id,
		api: $ui.apis.load_from_room_id,
		fieldValue: 'from_room_id',
		fieldValueMap: 'room_id',
		fieldDisplay: 'room_name',
		fields: [
			{mapping: 'room_id', text: 'room_id'},
			{mapping: 'room_name', text: 'room_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_from_room_id_dataloading === 'function') {
				hnd.cbo_from_room_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_from_room_id_dataloaded === 'function') {
				hnd.cbo_from_room_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_from_room_id_selected === 'function') {
					hnd.cbo_from_room_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_from_empl_id, {
		title: 'Pilih from_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_from_empl_id,
		fieldValue: 'from_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_from_empl_id_dataloading === 'function') {
				hnd.cbo_from_empl_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
			if (typeof hnd.cbo_from_empl_id_dataloaded === 'function') {
				hnd.cbo_from_empl_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_from_empl_id_selected === 'function') {
					hnd.cbo_from_empl_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_to_dept_id, {
		title: 'Pilih to_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_to_dept_id,
		fieldValue: 'to_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_to_dept_id_dataloading === 'function') {
				hnd.cbo_to_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_to_dept_id_dataloaded === 'function') {
				hnd.cbo_to_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_to_dept_id_selected === 'function') {
					hnd.cbo_to_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_to_site_id, {
		title: 'Pilih to_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_to_site_id,
		fieldValue: 'to_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_to_site_id_dataloading === 'function') {
				hnd.cbo_to_site_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_to_site_id_dataloaded === 'function') {
				hnd.cbo_to_site_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_to_site_id_selected === 'function') {
					hnd.cbo_to_site_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_to_room_id, {
		title: 'Pilih to_room_id',
		returnpage: this_page_id,
		api: $ui.apis.load_to_room_id,
		fieldValue: 'to_room_id',
		fieldValueMap: 'room_id',
		fieldDisplay: 'room_name',
		fields: [
			{mapping: 'room_id', text: 'room_id'},
			{mapping: 'room_name', text: 'room_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_to_room_id_dataloading === 'function') {
				hnd.cbo_to_room_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_to_room_id_dataloaded === 'function') {
				hnd.cbo_to_room_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_to_room_id_selected === 'function') {
					hnd.cbo_to_room_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_to_empl_id, {
		title: 'Pilih to_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_to_empl_id,
		fieldValue: 'to_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_to_empl_id_dataloading === 'function') {
				hnd.cbo_to_empl_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
			if (typeof hnd.cbo_to_empl_id_dataloaded === 'function') {
				hnd.cbo_to_empl_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_to_empl_id_selected === 'function') {
					hnd.cbo_to_empl_id_selected(value, display, record, args);
				}
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
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_doc_id_dataloading === 'function') {
				hnd.cbo_doc_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_doc_id_dataloaded === 'function') {
				hnd.cbo_doc_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_doc_id_selected === 'function') {
					hnd.cbo_doc_id_selected(value, display, record, args);
				}
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
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
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
		if (result.record.inquiry_id==null) { result.record.inquiry_id='--NULL--'; result.record.inquiry_descr='NONE'; }
		if (result.record.from_empl_id==null) { result.record.from_empl_id='--NULL--'; result.record.from_empl_name='NONE'; }
		if (result.record.to_empl_id==null) { result.record.to_empl_id='--NULL--'; result.record.to_empl_name='NONE'; }

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
			.setValue(obj.cbo_inquiry_id, record.inquiry_id, record.inquiry_descr)
			.setValue(obj.cbo_itemassetmovemodel_id, record.itemassetmovemodel_id, record.itemassetmovemodel_name)
			.setValue(obj.cbo_itemassetmovetype_id, record.itemassetmovetype_id, record.itemassetmovetype_name)
			.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name)
			.setValue(obj.cbo_from_site_id, record.from_site_id, record.from_site_name)
			.setValue(obj.cbo_from_room_id, record.from_room_id, record.from_room_name)
			.setValue(obj.cbo_from_empl_id, record.from_empl_id, record.from_empl_name)
			.setValue(obj.cbo_to_dept_id, record.to_dept_id, record.to_dept_name)
			.setValue(obj.cbo_to_site_id, record.to_site_id, record.to_site_name)
			.setValue(obj.cbo_to_room_id, record.to_room_id, record.to_room_name)
			.setValue(obj.cbo_to_empl_id, record.to_empl_id, record.to_empl_name)
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
		data.itemassetmove_isunreferenced = '0'
		data.itemassetmove_dtstart = global.now()
		data.itemassetmove_dtexpected = global.now()
		data.itemassetmove_dtend = global.now()
		data.itemassetmove_version = 0
		data.itemassetmove_isdateinterval = '0'
		data.itemassetmove_isdept = '0'
		data.itemassetmove_isemployee = '0'
		data.itemassetmove_issite = '0'
		data.itemassetmove_isroom = '0'
		data.itemassetmove_isreturn = '0'
		data.itemassetmove_iscommit = '0'
		data.itemassetmove_issend = '0'
		data.itemassetmove_isrcv = '0'

		data.inquiry_id = '--NULL--'
		data.inquiry_descr = 'NONE'
		data.itemassetmovemodel_id = '0'
		data.itemassetmovemodel_name = '-- PILIH --'
		data.itemassetmovetype_id = '0'
		data.itemassetmovetype_name = '-- PILIH --'
		data.user_dept_id = '0'
		data.user_dept_name = '-- PILIH --'
		data.from_site_id = '0'
		data.from_site_name = '-- PILIH --'
		data.from_room_id = '0'
		data.from_room_name = '-- PILIH --'
		data.from_empl_id = '--NULL--'
		data.from_empl_name = 'NONE'
		data.to_dept_id = '0'
		data.to_dept_name = '-- PILIH --'
		data.to_site_id = '0'
		data.to_site_name = '-- PILIH --'
		data.to_room_id = '0'
		data.to_room_name = '-- PILIH --'
		data.to_empl_id = '--NULL--'
		data.to_empl_name = 'NONE'
		data.doc_id = 'ASTMOVE'
		data.doc_name = 'ASTMOVE'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.createnew(data, options)


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

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.itemassetmove_commitby);
		rec_commitdate.html(record.itemassetmove_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.itemassetmove_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			form.lock(false);
		} 
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
			
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'itemassetmove_iscommit';
	updategriddata[col_commit] = record.itemassetmove_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_itemassetmove_id
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
	// options.skipmappingresponse = ['inquiry_id', 'from_empl_id', 'to_empl_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
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
	form.setValue(obj.cbo_inquiry_id, result.dataresponse.inquiry_descr!=='--NULL--' ? result.dataresponse.inquiry_id : '--NULL--', result.dataresponse.inquiry_descr!=='--NULL--'?result.dataresponse.inquiry_descr:'NONE')
	form.setValue(obj.cbo_from_empl_id, result.dataresponse.from_empl_name!=='--NULL--' ? result.dataresponse.from_empl_id : '--NULL--', result.dataresponse.from_empl_name!=='--NULL--'?result.dataresponse.from_empl_name:'NONE')
	form.setValue(obj.cbo_to_empl_id, result.dataresponse.to_empl_name!=='--NULL--' ? result.dataresponse.to_empl_id : '--NULL--', result.dataresponse.to_empl_name!=='--NULL--'?result.dataresponse.to_empl_name:'NONE')

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



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
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

	var id = obj.txt_itemassetmove_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/itemassetmove.xprint?id=' + id;

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


	var docname = 'Item Asset Move'
	var txt_version = obj.txt_itemassetmove_version;
	var chk_iscommit = obj.chk_itemassetmove_iscommit;
	
	
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

		

	
		

	}


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
	
	