var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemmove-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			




const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemmove_id: $('#pnl_edit-txt_itemmove_id'),
	cbo_itemmvmodel_id: $('#pnl_edit-cbo_itemmvmodel_id'),
	chk_itemmove_isunreferenced: $('#pnl_edit-chk_itemmove_isunreferenced'),
	txt_itemmove_descr: $('#pnl_edit-txt_itemmove_descr'),
	dt_itemmove_dtfr: $('#pnl_edit-dt_itemmove_dtfr'),
	dt_itemmove_dtto: $('#pnl_edit-dt_itemmove_dtto'),
	cbo_fr_site_id: $('#pnl_edit-cbo_fr_site_id'),
	cbo_fr_dept_id: $('#pnl_edit-cbo_fr_dept_id'),
	cbo_to_site_id: $('#pnl_edit-cbo_to_site_id'),
	cbo_to_dept_id: $('#pnl_edit-cbo_to_dept_id'),
	cbo_inquiry_id: $('#pnl_edit-cbo_inquiry_id'),
	cbo_orderout_id: $('#pnl_edit-cbo_orderout_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	txt_itemmove_version: $('#pnl_edit-txt_itemmove_version'),
	chk_itemmove_iscommit: $('#pnl_edit-chk_itemmove_iscommit'),
	txt_itemmove_commitby: $('#pnl_edit-txt_itemmove_commitby'),
	txt_itemmove_commitdate: $('#pnl_edit-txt_itemmove_commitdate'),
	chk_itemmove_issend: $('#pnl_edit-chk_itemmove_issend'),
	txt_itemmove_sendby: $('#pnl_edit-txt_itemmove_sendby'),
	txt_itemmove_senddate: $('#pnl_edit-txt_itemmove_senddate'),
	chk_itemmove_isrcv: $('#pnl_edit-chk_itemmove_isrcv'),
	txt_itemmove_rcvby: $('#pnl_edit-txt_itemmove_rcvby'),
	txt_itemmove_rcvdate: $('#pnl_edit-txt_itemmove_rcvdate')
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
		primary: obj.txt_itemmove_id,
		autoid: true,
		logview: 'trn_itemmove',
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
			







	new fgta4slideselect(obj.cbo_itemmvmodel_id, {
		title: 'Pilih itemmvmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmvmodel_id,
		fieldValue: 'itemmvmodel_id',
		fieldValueMap: 'itemmvmodel_id',
		fieldDisplay: 'itemmvmodel_name',
		fields: [
			{mapping: 'itemmvmodel_id', text: 'itemmvmodel_id'},
			{mapping: 'itemmvmodel_name', text: 'itemmvmodel_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_itemmvmodel_id_dataloading === 'function') {
				hnd.cbo_itemmvmodel_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_itemmvmodel_id_dataloaded === 'function') {
				hnd.cbo_itemmvmodel_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemmvmodel_id_selected === 'function') {
					hnd.cbo_itemmvmodel_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_fr_site_id, {
		title: 'Pilih fr_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_fr_site_id,
		fieldValue: 'fr_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_fr_site_id_dataloading === 'function') {
				hnd.cbo_fr_site_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({site_id:'--NULL--', site_name:'NONE'});	
			if (typeof hnd.cbo_fr_site_id_dataloaded === 'function') {
				hnd.cbo_fr_site_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_fr_site_id_selected === 'function') {
					hnd.cbo_fr_site_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_fr_dept_id, {
		title: 'Pilih fr_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_fr_dept_id,
		fieldValue: 'fr_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_fr_dept_id_dataloading === 'function') {
				hnd.cbo_fr_dept_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
			if (typeof hnd.cbo_fr_dept_id_dataloaded === 'function') {
				hnd.cbo_fr_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_fr_dept_id_selected === 'function') {
					hnd.cbo_fr_dept_id_selected(value, display, record, args);
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
				hnd.cbo_to_site_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({site_id:'--NULL--', site_name:'NONE'});	
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
				hnd.cbo_to_dept_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
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
				hnd.cbo_inquiry_id_dataloading(criteria, options);
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
				
	new fgta4slideselect(obj.cbo_orderout_id, {
		title: 'Pilih orderout_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderout_id,
		fieldValue: 'orderout_id',
		fieldValueMap: 'orderout_id',
		fieldDisplay: 'orderout_descr',
		fields: [
			{mapping: 'orderout_id', text: 'orderout_id'},
			{mapping: 'orderout_descr', text: 'orderout_descr'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_orderout_id_dataloading === 'function') {
				hnd.cbo_orderout_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({orderout_id:'--NULL--', orderout_descr:'NONE'});	
			if (typeof hnd.cbo_orderout_id_dataloaded === 'function') {
				hnd.cbo_orderout_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_orderout_id_selected === 'function') {
					hnd.cbo_orderout_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih unit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_unit_id_dataloading === 'function') {
				hnd.cbo_unit_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({unit_id:'--NULL--', unit_name:'NONE'});	
			if (typeof hnd.cbo_unit_id_dataloaded === 'function') {
				hnd.cbo_unit_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_unit_id_selected === 'function') {
					hnd.cbo_unit_id_selected(value, display, record, args);
				}
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
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_dept_id_dataloading === 'function') {
				hnd.cbo_dept_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
			if (typeof hnd.cbo_dept_id_dataloaded === 'function') {
				hnd.cbo_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dept_id_selected === 'function') {
					hnd.cbo_dept_id_selected(value, display, record, args);
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
		if (result.record.fr_site_id==null) { result.record.fr_site_id='--NULL--'; result.record.fr_site_name='NONE'; }
		if (result.record.fr_dept_id==null) { result.record.fr_dept_id='--NULL--'; result.record.to_dept_name='NONE'; }
		if (result.record.to_site_id==null) { result.record.to_site_id='--NULL--'; result.record.to_site_name='NONE'; }
		if (result.record.to_dept_id==null) { result.record.to_dept_id='--NULL--'; result.record.to_dept_name='NONE'; }
		if (result.record.inquiry_id==null) { result.record.inquiry_id='--NULL--'; result.record.inquiry_descr='NONE'; }
		if (result.record.orderout_id==null) { result.record.orderout_id='--NULL--'; result.record.orderout_descr='NONE'; }
		if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }
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
			.setValue(obj.cbo_itemmvmodel_id, record.itemmvmodel_id, record.itemmvmodel_name)
			.setValue(obj.cbo_fr_site_id, record.fr_site_id, record.fr_site_name)
			.setValue(obj.cbo_fr_dept_id, record.fr_dept_id, record.to_dept_name)
			.setValue(obj.cbo_to_site_id, record.to_site_id, record.to_site_name)
			.setValue(obj.cbo_to_dept_id, record.to_dept_id, record.to_dept_name)
			.setValue(obj.cbo_inquiry_id, record.inquiry_id, record.inquiry_descr)
			.setValue(obj.cbo_orderout_id, record.orderout_id, record.orderout_descr)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
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
		data.itemmove_isunreferenced = '1'
		data.itemmove_dtfr = global.now()
		data.itemmove_dtto = global.now()
		data.itemmove_version = 0
		data.itemmove_iscommit = '0'
		data.itemmove_issend = '0'
		data.itemmove_isrcv = '0'

		data.itemmvmodel_id = '0'
		data.itemmvmodel_name = '-- PILIH --'
		data.fr_site_id = '--NULL--'
		data.fr_site_name = 'NONE'
		data.fr_dept_id = '--NULL--'
		data.to_dept_name = 'NONE'
		data.to_site_id = '--NULL--'
		data.to_site_name = 'NONE'
		data.to_dept_id = '--NULL--'
		data.to_dept_name = 'NONE'
		data.inquiry_id = '--NULL--'
		data.inquiry_descr = 'NONE'
		data.orderout_id = '--NULL--'
		data.orderout_descr = 'NONE'
		data.unit_id = '--NULL--'
		data.unit_name = 'NONE'
		data.dept_id = '--NULL--'
		data.dept_name = 'NONE'

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

		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.createnew(data, options)


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

		rec_commitby.html(record.itemmove_commitby);
		rec_commitdate.html(record.itemmove_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.itemmove_iscommit=="1") {
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

	var col_commit = 'itemmove_iscommit';
	updategriddata[col_commit] = record.itemmove_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_itemmove_id
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
	// options.skipmappingresponse = ['fr_site_id', 'fr_dept_id', 'to_site_id', 'to_dept_id', 'inquiry_id', 'orderout_id', 'unit_id', 'dept_id', ];
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
	form.setValue(obj.cbo_fr_site_id, result.dataresponse.fr_site_name!=='--NULL--' ? result.dataresponse.fr_site_id : '--NULL--', result.dataresponse.fr_site_name!=='--NULL--'?result.dataresponse.fr_site_name:'NONE')
	form.setValue(obj.cbo_fr_dept_id, result.dataresponse.to_dept_name!=='--NULL--' ? result.dataresponse.fr_dept_id : '--NULL--', result.dataresponse.to_dept_name!=='--NULL--'?result.dataresponse.to_dept_name:'NONE')
	form.setValue(obj.cbo_to_site_id, result.dataresponse.to_site_name!=='--NULL--' ? result.dataresponse.to_site_id : '--NULL--', result.dataresponse.to_site_name!=='--NULL--'?result.dataresponse.to_site_name:'NONE')
	form.setValue(obj.cbo_to_dept_id, result.dataresponse.to_dept_name!=='--NULL--' ? result.dataresponse.to_dept_id : '--NULL--', result.dataresponse.to_dept_name!=='--NULL--'?result.dataresponse.to_dept_name:'NONE')
	form.setValue(obj.cbo_inquiry_id, result.dataresponse.inquiry_descr!=='--NULL--' ? result.dataresponse.inquiry_id : '--NULL--', result.dataresponse.inquiry_descr!=='--NULL--'?result.dataresponse.inquiry_descr:'NONE')
	form.setValue(obj.cbo_orderout_id, result.dataresponse.orderout_descr!=='--NULL--' ? result.dataresponse.orderout_id : '--NULL--', result.dataresponse.orderout_descr!=='--NULL--'?result.dataresponse.orderout_descr:'NONE')
	form.setValue(obj.cbo_unit_id, result.dataresponse.unit_name!=='--NULL--' ? result.dataresponse.unit_id : '--NULL--', result.dataresponse.unit_name!=='--NULL--'?result.dataresponse.unit_name:'NONE')
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

	var id = obj.txt_itemmove_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/itemmove.xprint?id=' + id;

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


	var docname = 'Item Moving'
	var txt_version = obj.txt_itemmove_version;
	var chk_iscommit = obj.chk_itemmove_iscommit;
	
	
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
	
	