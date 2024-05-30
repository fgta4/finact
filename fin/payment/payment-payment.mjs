var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_editpayment-btn_edit')
const btn_save = $('#pnl_editpayment-btn_save')
const btn_delete = $('#pnl_editpayment-btn_delete')


const pnl_paymto_bankacc  = $('#pnl_editpayment-paymto_bankacc');
const pnl_paymto_bankaccname  = $('#pnl_editpayment-paymto_bankaccname');
const pnl_paymto_bankname  = $('#pnl_editpayment-paymto_bankname');
const pnl_paymto_gironum  = $('#pnl_editpayment-paymto_gironum');
const pnl_paymto_girodate  = $('#pnl_editpayment-paymto_girodate');


const pnl_entry = $('#pnl_editpayment-entry')
const pnl_form = $('#pnl_editpayment-form')
const obj = {
	txt_jurnal_id: $('#pnl_editpayment-txt_jurnal_id'),
	cbo_billin_id: $('#pnl_editpayment-cbo_billin_id'),
	cbo_partner_id: $('#pnl_editpayment-cbo_partner_id'),
	cbo_dept_id: $('#pnl_editpayment-cbo_dept_id'),

	cbo_paymtype_id: $('#pnl_editpayment-cbo_paymtype_id'),
	txt_paymto_name: $('#pnl_editpayment-txt_paymto_name'),

	txt_paymto_bankacc: $('#pnl_editpayment-txt_paymto_bankacc'),
	txt_paymto_bankaccname: $('#pnl_editpayment-txt_paymto_bankaccname'),
	txt_paymto_bankname: $('#pnl_editpayment-txt_paymto_bankname'),
	txt_paymto_gironum: $('#pnl_editpayment-txt_paymto_gironum'),
	dt_paymto_girodate: $('#pnl_editpayment-dt_paymto_girodate'),
	txt_paymto_upname: $('#pnl_editpayment-txt_paymto_upname'),
	txt_paymto_upposition: $('#pnl_editpayment-txt_paymto_upposition'),
	txt_paymto_upphone: $('#pnl_editpayment-txt_paymto_upphone'),
	cbo_bankrekening_id: $('#pnl_editpayment-cbo_bankrekening_id'),

	cbo_coa_id: $('#pnl_editpayment-cbo_coa_id'),
	cbo_accfin_id: $('#pnl_editpayment-cbo_accfin_id'),


	txt_jurnal_valfrg: $('#pnl_editpayment-txt_jurnal_valfrg'),
	cbo_curr_id: $('#pnl_editpayment-cbo_curr_id'),
	txt_jurnal_valfrgrate: $('#pnl_editpayment-txt_jurnal_valfrgrate'),
	txt_jurnal_validr: $('#pnl_editpayment-txt_jurnal_validr'),

}

let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	
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
		
	})

	
	new fgta4slideselect(obj.cbo_billin_id, {
		title: 'Pilih billin_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billin_id,
		fieldValue: 'billin_id',
		fieldValueMap: 'billin_id',
		fieldDisplay: 'billin_descr',
		fields: [
			{mapping: 'billin_id', text: 'billin_id'},
			{mapping: 'billin_descr', text: 'billin_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billin_id:'--NULL--', billin_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
		}
	});

	new fgta4slideselect(obj.cbo_paymtype_id, {
		title: 'Pilih paymtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_paymtype_id,
		fieldValue: 'paymtype_id',
		fieldValueMap: 'paymtype_id',
		fieldDisplay: 'paymtype_name',
		fields: [
			{mapping: 'paymtype_id', text: 'paymtype_id'},
			{mapping: 'paymtype_name', text: 'paymtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			pnl_entry.show();
			formatform_bypaymtype(record.paymtype_id);			
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
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	});
	

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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})
	
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
			result.records.unshift({bankrekening_id:'--NULL--', bankrekening_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.cbo_coa_id, record.coa_id, record.coa_name);
		}
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
			{mapping: 'curr_name', text: 'curr_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
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


	new fgta4slideselect(obj.cbo_accfin_id, {
		title: 'Pilih accfin_id',
		returnpage: this_page_id,
		api: $ui.apis.load_accfin_id,
		fieldValue: 'accfin_id',
		fieldValueMap: 'accfin_id',
		fieldDisplay: 'accfin_name',
		fields: [
			{mapping: 'accfin_id', text: 'accfin_id'},
			{mapping: 'accfin_name', text: 'accfin_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})
	


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			// ev.detail.cancel = true;
			// $ui.getPages().show('pnl_edit')
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_edit', ()=>{})					
				})
			} else {
				$ui.getPages().show('pnl_edit', ()=>{})
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
		} else {
			form.lock(false)
		}
	})	
}




export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data, rowid) {
	open(data, rowid, data);
}


export function open(data, rowid, hdata) {

	// txt_title.html(hdata.jurnal_descr)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/open-payment`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		// console.log(record);
		if (record.paymtype_id==null) {
			pnl_entry.hide();
			// form.setValue(obj.cbo_dept_id, global.setup.dept_id, global.setup.dept_name);
			// form.createnew(async (data, options)=>{
			// 	data.dept_id = global.setup.dept_id;
			// 	data.dept_name = global.setup.dept_name;
			// });
		} else {
			pnl_entry.show();
			formatform_bypaymtype(record.paymtype_id);
		}
		// pnl_entry
		// if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		// if (result.record.bankrekening_id==null) { result.record.bankrekening_id='--NULL--'; result.record.bankrekening_name='NONE'; }
		// if (result.record.coa_id==null) { result.record.coa_id='--NULL--'; result.record.coa_name='NONE'; }
		// if (result.record.dept_id==null) { result.record.dept_id='--NULL--'; result.record.dept_name='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			// .setValue(obj.cbo_periodemo_id, result.record.periodemo_id, result.record.periodemo_name)
			// .setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			// .setValue(obj.cbo_paymtype_id, result.record.paymtype_id, result.record.paymtype_name)
			// .setValue(obj.cbo_bankrekening_id, result.record.bankrekening_id, result.record.bankrekening_name)
			// .setValue(obj.cbo_accfin_id, result.record.accfin_id, result.record.accfin_name)
			// .setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			// .setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
			// .setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			// .setValue(obj.cbo_jurnaltype_id, result.record.jurnaltype_id, result.record.jurnaltype_name)
			// .setValue(obj.cbo_jurnalsource_id, result.record.jurnalsource_id, result.record.jurnalsource_name)
			.commit()
			.setViewMode()
			.rowid = rowid

		form.SuspendEvent(false);
	


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


function form_viewmodechanged(viewonly) {
	if (viewonly) {
	} else {
		var coa_id = form.getValue(obj.cbo_coa_id);
		var accfin_id = form.getValue(obj.cbo_accfin_id);
		var dept_id = form.getValue(obj.cbo_dept_id);
		if (coa_id=='') { form.setValue(obj.cbo_coa_id, '0', '-- PILIH --'); }
		if (accfin_id=='') { form.setValue(obj.cbo_accfin_id, '0', '-- PILIH --'); }
		if (dept_id=='') { form.setValue(obj.cbo_dept_id, global.setup.dept_id, global.setup.dept_name)}
	}
}

function form_idsetup(options) {
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/save-payment`;

	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server

	// options.skipmappingresponse = ["partner_id"];
	// options.skipmappingresponse = ["bankrekening_id"];
	// options.skipmappingresponse = ["coa_id"];
	// options.skipmappingresponse = ["dept_id"];

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

	// form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')
	// form.setValue(obj.cbo_bankrekening_id, result.dataresponse.bankrekening_name!=='--NULL--' ? result.dataresponse.bankrekening_id : '--NULL--', result.dataresponse.bankrekening_name!=='--NULL--'?result.dataresponse.bankrekening_name:'NONE')
	// form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')
	// form.setValue(obj.cbo_dept_id, result.dataresponse.dept_name!=='--NULL--' ? result.dataresponse.dept_id : '--NULL--', result.dataresponse.dept_name!=='--NULL--'?result.dataresponse.dept_name:'NONE')

	// form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
}

function formatform_bypaymtype(paymtype_id) {
	if (paymtype_id=='TR') {  // TRANSFER
		pnl_paymto_bankacc.show();
		pnl_paymto_bankaccname.show();
		pnl_paymto_bankname.show();
		pnl_paymto_gironum.hide();
		pnl_paymto_girodate.hide();
	} else if (paymtype_id=='GI') { // GIRO/CEK
		pnl_paymto_bankacc.hide();
		pnl_paymto_bankaccname.hide();
		pnl_paymto_bankname.hide();
		pnl_paymto_gironum.show();
		pnl_paymto_girodate.show();
	} else { // CASH
		pnl_paymto_bankacc.hide();
		pnl_paymto_bankaccname.hide();
		pnl_paymto_bankname.hide();
		pnl_paymto_gironum.hide();
		pnl_paymto_girodate.hide();
	}

}