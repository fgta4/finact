var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_orderintype_id: $('#pnl_edit-txt_orderintype_id'),
	txt_orderintype_name: $('#pnl_edit-txt_orderintype_name'),
	txt_orderintype_descr: $('#pnl_edit-txt_orderintype_descr'),
	cbo_trxmodel_id: $('#pnl_edit-cbo_trxmodel_id'),
	chk_orderintype_isdateinterval: $('#pnl_edit-chk_orderintype_isdateinterval'),
	cbo_ppn_taxtype_id: $('#pnl_edit-cbo_ppn_taxtype_id'),
	txt_ppn_taxvalue: $('#pnl_edit-txt_ppn_taxvalue'),
	chk_ppn_include: $('#pnl_edit-chk_ppn_include'),
	cbo_pph_taxtype_id: $('#pnl_edit-cbo_pph_taxtype_id'),
	txt_pph_taxvalue: $('#pnl_edit-txt_pph_taxvalue'),
	cbo_arunbill_coa_id: $('#pnl_edit-cbo_arunbill_coa_id'),
	cbo_ar_coa_id: $('#pnl_edit-cbo_ar_coa_id'),
	chk_ar_coa_isbypartnertype: $('#pnl_edit-chk_ar_coa_isbypartnertype'),
	cbo_dp_coa_id: $('#pnl_edit-cbo_dp_coa_id'),
	cbo_sales_coa_id: $('#pnl_edit-cbo_sales_coa_id'),
	cbo_salesdisc_coa_id: $('#pnl_edit-cbo_salesdisc_coa_id'),
	cbo_ppn_coa_id: $('#pnl_edit-cbo_ppn_coa_id'),
	cbo_ppnsubsidi_coa_id: $('#pnl_edit-cbo_ppnsubsidi_coa_id'),
	cbo_pph_coa_id: $('#pnl_edit-cbo_pph_coa_id')
}




let form;

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
		primary: obj.txt_orderintype_id,
		autoid: false,
		logview: 'mst_orderintype',
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
	})








	new fgta4slideselect(obj.cbo_trxmodel_id, {
		title: 'Pilih trxmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_trxmodel_id,
		fieldValue: 'trxmodel_id',
		fieldValueMap: 'trxmodel_id',
		fieldDisplay: 'trxmodel_name',
		fields: [
			{mapping: 'trxmodel_id', text: 'trxmodel_id'},
			{mapping: 'trxmodel_name', text: 'trxmodel_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.trxmodel_direction='IN'			
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppn_taxtype_id, {
		title: 'Pilih ppn_taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppn_taxtype_id,
		fieldValue: 'ppn_taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.taxmodel_id='PPN'			
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (record.taxtype_id=='--NULL--') {
					form.setValue(obj.txt_ppn_taxvalue, 0)
					form.setValue(obj.chk_ppn_include, 0)
				} else {
					form.setValue(obj.txt_ppn_taxvalue, record.taxtype_value)
					form.setValue(obj.chk_ppn_include, record.taxtype_include)
				}
						
										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_pph_taxtype_id, {
		title: 'Pilih pph_taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_pph_taxtype_id,
		fieldValue: 'pph_taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.taxmodel_id='PPH'			
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (record.taxtype_id=='--NULL--') {		
					form.setValue(obj.txt_pph_taxvalue, 0)
				} else {
					form.setValue(obj.txt_pph_taxvalue, record.taxtype_value)
				}
										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_arunbill_coa_id, {
		title: 'Pilih arunbill_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_arunbill_coa_id,
		fieldValue: 'arunbill_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ar_coa_id, {
		title: 'Pilih ar_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ar_coa_id,
		fieldValue: 'ar_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_dp_coa_id, {
		title: 'Pilih dp_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dp_coa_id,
		fieldValue: 'dp_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_sales_coa_id, {
		title: 'Pilih sales_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sales_coa_id,
		fieldValue: 'sales_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_salesdisc_coa_id, {
		title: 'Pilih salesdisc_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_salesdisc_coa_id,
		fieldValue: 'salesdisc_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppn_coa_id, {
		title: 'Pilih ppn_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppn_coa_id,
		fieldValue: 'ppn_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppnsubsidi_coa_id, {
		title: 'Pilih ppnsubsidi_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppnsubsidi_coa_id,
		fieldValue: 'ppnsubsidi_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_pph_coa_id, {
		title: 'Pilih pph_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_pph_coa_id,
		fieldValue: 'pph_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}


export function open(data, rowid, viewmode=true, fn_callback) {

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.ppn_taxtype_id==null) { result.record.ppn_taxtype_id='--NULL--'; result.record.ppn_taxtype_name='NONE'; }
		if (result.record.pph_taxtype_id==null) { result.record.pph_taxtype_id='--NULL--'; result.record.pph_taxtype_name='NONE'; }
		if (result.record.salesdisc_coa_id==null) { result.record.salesdisc_coa_id='--NULL--'; result.record.salesdisc_coa_name='NONE'; }
		if (result.record.ppn_coa_id==null) { result.record.ppn_coa_id='--NULL--'; result.record.ppn_coa_name='NONE'; }
		if (result.record.ppnsubsidi_coa_id==null) { result.record.ppnsubsidi_coa_id='--NULL--'; result.record.ppnsubsidi_coa_name='NONE'; }
		if (result.record.pph_coa_id==null) { result.record.pph_coa_id='--NULL--'; result.record.pph_coa_name='NONE'; }

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
			.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name)
			.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id, record.ppn_taxtype_name)
			.setValue(obj.cbo_pph_taxtype_id, record.pph_taxtype_id, record.pph_taxtype_name)
			.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id, record.arunbill_coa_name)
			.setValue(obj.cbo_ar_coa_id, record.ar_coa_id, record.ar_coa_name)
			.setValue(obj.cbo_dp_coa_id, record.dp_coa_id, record.dp_coa_name)
			.setValue(obj.cbo_sales_coa_id, record.sales_coa_id, record.sales_coa_name)
			.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id, record.salesdisc_coa_name)
			.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id, record.ppn_coa_name)
			.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name)
			.setValue(obj.cbo_pph_coa_id, record.pph_coa_id, record.pph_coa_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   



		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)

		// tampilkan form untuk data editor
		fn_callback()
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
		data.orderintype_isdateinterval = '0'
		data.ppn_taxvalue = 0
		data.ppn_include = '0'
		data.pph_taxvalue = 0
		data.ar_coa_isbypartnertype = '0'

		data.trxmodel_id = '0'
		data.trxmodel_name = '-- PILIH --'
		data.ppn_taxtype_id = '--NULL--'
		data.ppn_taxtype_name = 'NONE'
		data.pph_taxtype_id = '--NULL--'
		data.pph_taxtype_name = 'NONE'
		data.arunbill_coa_id = '0'
		data.arunbill_coa_name = '-- PILIH --'
		data.ar_coa_id = '0'
		data.ar_coa_name = '-- PILIH --'
		data.dp_coa_id = '0'
		data.dp_coa_name = '-- PILIH --'
		data.sales_coa_id = '0'
		data.sales_coa_name = '-- PILIH --'
		data.salesdisc_coa_id = '--NULL--'
		data.salesdisc_coa_name = 'NONE'
		data.ppn_coa_id = '--NULL--'
		data.ppn_coa_name = 'NONE'
		data.ppnsubsidi_coa_id = '--NULL--'
		data.ppnsubsidi_coa_name = 'NONE'
		data.pph_coa_id = '--NULL--'
		data.pph_coa_name = 'NONE'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editrefgrid'].handler.createnew(data, options)


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


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_orderintype_id
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
	// options.skipmappingresponse = ['ppn_taxtype_id', 'pph_taxtype_id', 'salesdisc_coa_id', 'ppn_coa_id', 'ppnsubsidi_coa_id', 'pph_coa_id', ];
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
	form.setValue(obj.cbo_ppn_taxtype_id, result.dataresponse.ppn_taxtype_name!=='--NULL--' ? result.dataresponse.ppn_taxtype_id : '--NULL--', result.dataresponse.ppn_taxtype_name!=='--NULL--'?result.dataresponse.ppn_taxtype_name:'NONE')
	form.setValue(obj.cbo_pph_taxtype_id, result.dataresponse.pph_taxtype_name!=='--NULL--' ? result.dataresponse.pph_taxtype_id : '--NULL--', result.dataresponse.pph_taxtype_name!=='--NULL--'?result.dataresponse.pph_taxtype_name:'NONE')
	form.setValue(obj.cbo_salesdisc_coa_id, result.dataresponse.salesdisc_coa_name!=='--NULL--' ? result.dataresponse.salesdisc_coa_id : '--NULL--', result.dataresponse.salesdisc_coa_name!=='--NULL--'?result.dataresponse.salesdisc_coa_name:'NONE')
	form.setValue(obj.cbo_ppn_coa_id, result.dataresponse.ppn_coa_name!=='--NULL--' ? result.dataresponse.ppn_coa_id : '--NULL--', result.dataresponse.ppn_coa_name!=='--NULL--'?result.dataresponse.ppn_coa_name:'NONE')
	form.setValue(obj.cbo_ppnsubsidi_coa_id, result.dataresponse.ppnsubsidi_coa_name!=='--NULL--' ? result.dataresponse.ppnsubsidi_coa_id : '--NULL--', result.dataresponse.ppnsubsidi_coa_name!=='--NULL--'?result.dataresponse.ppnsubsidi_coa_name:'NONE')
	form.setValue(obj.cbo_pph_coa_id, result.dataresponse.pph_coa_name!=='--NULL--' ? result.dataresponse.pph_coa_id : '--NULL--', result.dataresponse.pph_coa_name!=='--NULL--'?result.dataresponse.pph_coa_name:'NONE')

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
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}




