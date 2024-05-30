var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'




const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const pnl_entry = $('#pnl_edit-entry');
const pnl_billin_id = $('#pnl_edit-billin_id');
const pnl_billinpaym_id = $('#pnl_edit-billinpaym_id');
const pnl_ap_jurnal_id = $('#pnl_edit-ap_jurnal_id');
const pnl_partner_id = $('#pnl_edit-partner_id');
const pnl_jurnal_valfrgrate = $('#pnl_edit-jurnal_valfrgrate');
const pnl_jurnal_validr = $('#pnl_edit-jurnal_validr');


const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_jurnal_id: $('#pnl_edit-txt_jurnal_id'),
	txt_jurnal_ref: $('#pnl_edit-txt_jurnal_ref'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	dt_jurnal_date: $('#pnl_edit-dt_jurnal_date'),
	cbo_billin_id: $('#pnl_edit-cbo_billin_id'),
	cbo_billinpaym_id: $('#pnl_edit-cbo_billinpaym_id'),
	txt_ap_jurnal_id: $('#pnl_edit-txt_ap_jurnal_id'),
	txt_jurnal_descr: $('#pnl_edit-txt_jurnal_descr'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_jurnal_valfrg: $('#pnl_edit-txt_jurnal_valfrg'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_jurnal_valfrgrate: $('#pnl_edit-txt_jurnal_valfrgrate'),
	txt_jurnal_validr: $('#pnl_edit-txt_jurnal_validr'),
	cbo_jurnaltype_id: $('#pnl_edit-cbo_jurnaltype_id'),
	cbo_jurnalsource_id: $('#pnl_edit-cbo_jurnalsource_id'),
	txt_jurnal_version: $('#pnl_edit-txt_jurnal_version'),
	chk_jurnal_iscommit: $('#pnl_edit-chk_jurnal_iscommit'),
	txt_jurnal_commitby: $('#pnl_edit-txt_jurnal_commitby'),
	txt_jurnal_commitdate: $('#pnl_edit-txt_jurnal_commitdate'),
	chk_jurnal_ispost: $('#pnl_edit-chk_jurnal_ispost'),
	txt_jurnal_postby: $('#pnl_edit-txt_jurnal_postby'),
	txt_jurnal_postdate: $('#pnl_edit-txt_jurnal_postdate'),
	chk_jurnal_isclose: $('#pnl_edit-chk_jurnal_isclose'),
	chk_jurnal_isagingclose: $('#pnl_edit-chk_jurnal_isagingclose')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form = {}

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
		primary: obj.txt_jurnal_id,
		autoid: true,
		logview: 'trn_jurnal',
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
	})



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	obj.txt_jurnal_valfrg.numberbox({ onChange: (newvalue, oldvalue) =>  { txt_jurnal_valfrg_valuechanged(newvalue, oldvalue); } })
	obj.txt_jurnal_valfrgrate.numberbox({ onChange: (newvalue, oldvalue) =>  { txt_jurnal_valfrgrate_valuechanged(newvalue, oldvalue); } })



	new fgta4slideselect(obj.cbo_jurnaltype_id, {
		title: 'Pilih jurnaltype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_jurnaltype_id,
		fieldValue: 'jurnaltype_id',
		fieldValueMap: 'jurnaltype_id',
		fieldDisplay: 'jurnaltype_name',
		fields: [
			{mapping: 'jurnaltype_id', text: 'jurnaltype_id'},
			{mapping: 'jurnaltype_name', text: 'jurnaltype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.jurnaltype_isdisabled = '0';
			criteria.jurnalmodel_id = 'PV';
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			pnl_entry_show(true);
			if (record.jurnaltype_id=='MAN-PV' || record.jurnaltype_id=='PV-DIRECT') {
				form_reference(false);
				pnl_billin_id.hide();
				pnl_billinpaym_id.hide();
				pnl_ap_jurnal_id.hide();
				form.setValue(obj.cbo_partner_id, '0', '-- PILIH --');
				form.setValue(obj.cbo_billin_id, '--NULL--', 'NONE');
				form.setValue(obj.cbo_billinpaym_id, '--NULL--', 'NONE');
				form.setDisable(obj.txt_jurnal_valfrg, false);
			} else {
				form_reference(true);
				pnl_billin_id.show();
				pnl_billinpaym_id.show();
				if (record.jurnaltype_id=='PV-ADVPAYM') {
					pnl_ap_jurnal_id.hide();
				} else if (record.jurnaltype_id=='PV-APPAYM') {
					pnl_ap_jurnal_id.show();
				} else {
					pnl_ap_jurnal_id.hide();
				}
				form.setValue(obj.cbo_partner_id, '0', '-- PILIH --');
				form.setValue(obj.cbo_billin_id, '0', '-- PILIH --');
				form.setValue(obj.cbo_billinpaym_id, '0', '-- PILIH --');
				form.setValue(obj.cbo_curr_id, '0', '-- PILIH --');
				form.setValue(obj.txt_jurnal_descr , '');
				form.setValue(obj.txt_jurnal_valfrg, 0);
				form.setValue(obj.txt_jurnal_valfrgrate, 0);
				form.setValue(obj.txt_jurnal_validr, 0);
				form.setDisable(obj.txt_jurnal_valfrg, true);
			}
		}
	})	

	new fgta4slideselect(obj.cbo_periodemo_id, {
		title: 'Pilih periodemo_id',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,
		fieldValue: 'periodemo_id',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{mapping: 'periodemo_id', text: 'periodemo_id'},
			{mapping: 'periodemo_name', text: 'periodemo_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_billin_id, {
		title: 'Pilih Permintaan Pembayaran',
		returnpage: this_page_id,
		api: $ui.apis.load_billin_id,
		fieldValue: 'billin_id',
		fieldValueMap: 'billin_id',
		fieldDisplay: 'billin_descr',
		fields: [
			{mapping: 'billin_id', text: 'billin_id'},
			{mapping: 'partner_name', text: 'partner_name'},
			{mapping: 'billin_descr', text: 'billin_descr'},
			{mapping: 'curr_id', text: 'Curr'},
			{mapping: 'billin_valfrg', text: 'Total'}
		],
		OnDataLoading: (criteria) => {
			// var jurnaltype_id = form.getValue(obj.cbo_jurnaltype_id);
			// if (jurnaltype_id=='PV-ADVPAYM') {
			// 	criteria.billtype_id = 'ADV';
			// } else if (jurnaltype_id=='PV-APPAYM') {
			// 	criteria.billtype_id = 'INV';
			// }
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billin_id:'--NULL--', billin_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			// form.setValue(obj.cbo_billinpaym_id, '0', '-- PILIH --');
			// form.setValue(obj.txt_jurnal_descr  , record.billin_descr);
			// form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name);
			// form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
			// form.setValue(obj.txt_jurnal_valfrg, record.billin_valfrg);
			// form.setValue(obj.txt_jurnal_valfrgrate, record.curr_rate);
			// recalculate_value_idr();
		}
	});				

	
	new fgta4slideselect(obj.cbo_billinpaym_id, {
		title: 'Pilih Term Permintaan yang akan diproses',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-billinpaym`,
		fieldValue: 'billinpaym_id',
		fieldValueMap: 'billinpaym_id',
		fieldDisplay: 'billinpaym_descr',
		fields: [
			{mapping: 'billinpaym_id', text: 'ID'},
			{mapping: 'billinpaym_descr', text: 'Descr'},
			{mapping: 'billinpaym_total', text: 'Total'},
			{mapping: 'curr_id', text: 'Curr'},
		],
		OnDataLoading: (criteria) => {
			var jurnaltype_id = form.getValue(obj.cbo_jurnaltype_id);
			if (jurnaltype_id=='PV-ADVPAYM') {
				criteria.billtype_id = 'ADV';
			} else if (jurnaltype_id=='PV-APPAYM') {
				criteria.billtype_id = 'INV';
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billin_id:'--NULL--', billin_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.cbo_billin_id, record.billin_id, record.billin_descr);
			form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name);
			form.setValue(obj.txt_jurnal_descr  , record.billinpaym_descr);
			form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
			form.setValue(obj.txt_jurnal_valfrg, record.billinpaym_totalfrg);
			form.setValue(obj.txt_jurnal_valfrgrate, record.curr_rate);
			recalculate_value_idr();
		}
	});


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
			// result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'}
		],
		OnDataLoading: (criteria) => {
			// criteria.localandforeign_limit = 'USD';
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			if (record.curr_islocal=='1') {
				form.setDisable(obj.txt_jurnal_valfrgrate, true);
			} else {
				form.setDisable(obj.txt_jurnal_valfrgrate, false);
			}
			form.setValue(obj.txt_jurnal_valfrgrate, record.curr_rate);
			recalculate_value_idr();
		}
	})				
				
			
				
	new fgta4slideselect(obj.cbo_jurnalsource_id, {
		title: 'Pilih jurnalsource_id',
		returnpage: this_page_id,
		api: $ui.apis.load_jurnalsource_id,
		fieldValue: 'jurnalsource_id',
		fieldValueMap: 'jurnalsource_id',
		fieldDisplay: 'jurnalsource_name',
		fields: [
			{mapping: 'jurnalsource_id', text: 'jurnalsource_id'},
			{mapping: 'jurnalsource_name', text: 'jurnalsource_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
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

}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {

	pnl_entry_show(false);
	form.setDisable(obj.cbo_jurnaltype_id, true);

	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		console.log(result);

		updatefilebox(result.record);

		if (result.record.billin_id==null) { result.record.billin_id='--NULL--'; result.record.billin_descr='NONE'; }
		if (result.record.billinpaym_id==null) { result.record.billinpaym_id='--NULL--'; result.record.billinpaym_descr='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_periodemo_id, result.record.periodemo_id, result.record.periodemo_name)
			.setValue(obj.cbo_billin_id, result.record.billin_id, result.record.billin_descr)
			.setValue(obj.cbo_billinpaym_id, result.record.billinpaym_id, result.record.billinpaym_descr)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_jurnaltype_id, result.record.jurnaltype_id, result.record.jurnaltype_name)
			.setValue(obj.cbo_jurnalsource_id, result.record.jurnalsource_id, result.record.jurnalsource_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		updatebuttonstate(result.record)


	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {

	pnl_entry.hide();
	form.setDisable(obj.cbo_jurnaltype_id, false);
	form.setDisable(obj.txt_jurnal_valfrgrate, true);

	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.jurnal_date = global.setup.jurnal_date
		data.jurnal_valfrg = 0
		data.jurnal_valfrgrate = global.setup.curr_rate;
		data.jurnal_validr = 0
		data.jurnal_version = 0
		data.jurnal_iscommit = '0'
		data.jurnal_ispost = '0'
		data.jurnal_isclose = '0'
		data.jurnal_isagingclose = '0'

		data.periodemo_id = global.setup.periodemo_id
		data.periodemo_name = global.setup.periodemo_name
		data.billin_id = '--NULL--'
		data.billin_descr = 'NONE'
		data.billinpaym_id = '--NULL--'
		data.billinpaym_descr = 'NONE'
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.curr_id = global.setup.curr_id
		data.curr_name = global.setup.curr_name;
		data.jurnaltype_id = '0'
		data.jurnaltype_name = '-- PILIH --'
		data.jurnalsource_id = global.setup.jurnalsource_id
		data.jurnalsource_name = global.setup.jurnalsource_name


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
		$ui.getPages().ITEMS['pnl_editreferencegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editresponsegrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		if (pnlname=="pnl_editpayment") {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData(), form.rowid)
		} else {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
		}
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.jurnal_commitby);
		rec_commitdate.html(record.jurnal_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.jurnal_iscommit=="1") {
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

	var col_commit = 'jurnal_iscommit';
	updategriddata[col_commit] = record.jurnal_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_jurnal_id
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

	options.skipmappingresponse = ["billin_id", "billinpaym_id", "partner_id"];


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

	form.setValue(obj.cbo_billin_id, result.dataresponse.billin_descr!=='--NULL--' ? result.dataresponse.billin_id : '--NULL--', result.dataresponse.billin_descr!=='--NULL--'?result.dataresponse.billin_descr:'NONE')
	form.setValue(obj.cbo_billinpaym_id, result.dataresponse.billinpaym_descr!=='--NULL--' ? result.dataresponse.billinpaym_id : '--NULL--', result.dataresponse.billinpaym_descr!=='--NULL--'?result.dataresponse.billinpaym_descr:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_jurnal_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/payment.xprint?id=' + id;

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


	var docname = 'undefined'
	var txt_version = obj.txt_jurnal_version;
	var chk_iscommit = obj.chk_jurnal_iscommit;
	
	
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
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
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
				updaterecordstatus(result.dataresponse);
				args.act_do(result);
				updatebuttonstate(result.dataresponse);
				updategridstate(result.dataresponse);
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
	
	
function form_reference(isreferenced) {
	if (isreferenced) {
		obj.cbo_billin_id.combo('enable');
		form.setDisable(obj.cbo_billin_id, false);

		obj.cbo_partner_id.combo('disable');
		form.setValue(obj.cbo_partner_id, '--NULL--', 'NONE');
		form.setDisable(obj.cbo_partner_id, true);

		obj.cbo_curr_id.combo('disable');
		form.setValue(obj.cbo_curr_id, '0', '-- PILIH --');
		form.setDisable(obj.cbo_curr_id, true);

	} else {
		obj.cbo_billin_id.combo('disable');
		form.setValue(obj.cbo_billin_id, '--NULL--', 'NONE');
		form.setDisable(obj.cbo_billin_id, true);

		obj.cbo_partner_id.combo('enable');
		form.setDisable(obj.cbo_partner_id, false);

		obj.cbo_curr_id.combo('enable');
		form.setDisable(obj.cbo_curr_id, false);
	}
}

function txt_jurnal_valfrg_valuechanged(newvalue, oldvalue) {
	recalculate_value_idr();
}

function txt_jurnal_valfrgrate_valuechanged(newvalue, oldvalue) {
	recalculate_value_idr();
}

function recalculate_value_idr() {
	var value = form.getValue(obj.txt_jurnal_valfrg);
	var rate = form.getValue(obj.txt_jurnal_valfrgrate);
	var idr = value * rate;
	form.setValue(obj.txt_jurnal_validr, idr);
}



function pnl_entry_show(isnewdocument) {
	pnl_entry.show();
	if (isnewdocument) {
		pnl_billin_id.show();
		pnl_ap_jurnal_id.show();
		pnl_partner_id.show();
		pnl_jurnal_valfrgrate.show();
		pnl_jurnal_validr.show();
	} else {
		pnl_billin_id.hide();
		pnl_ap_jurnal_id.hide();
		pnl_partner_id.hide();
		pnl_jurnal_valfrgrate.hide();
		pnl_jurnal_validr.hide();
	}
	form.setDisable(obj.txt_jurnal_valfrg, true);
	form.setDisable(obj.cbo_curr_id, true);
	
}