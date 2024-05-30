var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_coa_id: $('#pnl_edit-txt_coa_id'),
	txt_coa_name: $('#pnl_edit-txt_coa_name'),
	txt_coa_nameshort: $('#pnl_edit-txt_coa_nameshort'),
	chk_coa_isdisabled: $('#pnl_edit-chk_coa_isdisabled'),
	txt_coa_descr: $('#pnl_edit-txt_coa_descr'),
	txt_coa_dk: $('#pnl_edit-txt_coa_dk'),
	cbo_coagroup_id: $('#pnl_edit-cbo_coagroup_id'),
	cbo_coamodel_id: $('#pnl_edit-cbo_coamodel_id'),
	cbo_coatype_id: $('#pnl_edit-cbo_coatype_id'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		btn_edit.linkbutton('disable');
	//		disableedit = true;
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_coa_id,
		autoid: false,
		logview: 'mst_coa',
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
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_coagroup_id, {
		title: 'Pilih coagroup_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coagroup_id,
		fieldValue: 'coagroup_id',
		fieldValueMap: 'coagroup_id',
		fieldDisplay: 'coagroup_name',
		fields: [
			{mapping: 'coagroup_id', text: 'coagroup_id'},
			{mapping: 'coagroup_name', text: 'coagroup_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_coamodel_id, {
		title: 'Pilih coamodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coamodel_id,
		fieldValue: 'coamodel_id',
		fieldValueMap: 'coamodel_id',
		fieldDisplay: 'coamodel_name',
		fields: [
			{mapping: 'coamodel_id', text: 'coamodel_id'},
			{mapping: 'coamodel_name', text: 'coamodel_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_coatype_id, {
		title: 'Pilih coatype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coatype_id,
		fieldValue: 'coatype_id',
		fieldValueMap: 'coatype_id',
		fieldDisplay: 'coatype_name',
		fields: [
			{mapping: 'coatype_id', text: 'coatype_id'},
			{mapping: 'coatype_name', text: 'coatype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
		
	
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih Currency',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'ID'},
			{mapping: 'curr_name', text: 'Currency'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({curr_id:'--NULL--', curr_name:'NONE'});			
		},
		OnSelected: (value, display, record, arg) => {
			if (value != arg.PreviousValue) {
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



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.curr_id==null) { result.record.curr_id='--NULL--'; result.record.curr_name='NONE'; }

		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_coagroup_id, result.record.coagroup_id, result.record.coagroup_name)
			.setValue(obj.cbo_coamodel_id, result.record.coamodel_id, result.record.coamodel_name)
			.setValue(obj.cbo_coatype_id, result.record.coatype_id, result.record.coatype_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
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
		$ui.ShowMessage(err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
			data.coa_dk = 0

			data.coagroup_id = '0'
			data.coagroup_name = '-- PILIH --'
			data.coamodel_id = '0'
			data.coamodel_name = '-- PILIH --'
			data.coatype_id = '0'
			data.coatype_name = '-- PILIH --'
			data.curr_id = '--NULL--'
			data.curr_name = 'NONE'


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}




function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini
}


function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_coa_id
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
	options.skipmappingresponse = [
		"curr_id"
	];	

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
	form.setValue(obj.cbo_curr_id, result.dataresponse.curr_name!=='--NULL--' ? result.dataresponse.curr_id : '--NULL--', result.dataresponse.curr_name!=='--NULL--'?result.dataresponse.curr_name:'NONE')


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

