var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemstock-edit-hnd.mjs'

const txt_caption = $('#pnl_edit-caption')


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const fl_itemstock_picture_img = $('#pnl_edit-fl_itemstock_picture_img');
const fl_itemstock_picture_lnk = $('#pnl_edit-fl_itemstock_picture_link');				
				

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemstock_id: $('#pnl_edit-txt_itemstock_id'),
	cbo_itemgroup_id: $('#pnl_edit-cbo_itemgroup_id'),
	cbo_itemclass_id: $('#pnl_edit-cbo_itemclass_id'),
	txt_itemstock_code: $('#pnl_edit-txt_itemstock_code'),
	txt_itemstock_name: $('#pnl_edit-txt_itemstock_name'),
	txt_itemstock_nameshort: $('#pnl_edit-txt_itemstock_nameshort'),
	txt_itemstock_descr: $('#pnl_edit-txt_itemstock_descr'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_unitmeasurement_id: $('#pnl_edit-cbo_unitmeasurement_id'),
	txt_itemstock_couchdbid: $('#pnl_edit-txt_itemstock_couchdbid'),
	fl_itemstock_picture: $('#pnl_edit-fl_itemstock_picture'),
	chk_itemstock_isdisabled: $('#pnl_edit-chk_itemstock_isdisabled'),
	chk_itemstock_ishascompound: $('#pnl_edit-chk_itemstock_ishascompound'),
	chk_itemstock_issellable: $('#pnl_edit-chk_itemstock_issellable'),
	txt_itemstock_priceori: $('#pnl_edit-txt_itemstock_priceori'),
	txt_itemstock_priceadj: $('#pnl_edit-txt_itemstock_priceadj'),
	txt_itemstock_priceadjdate: $('#pnl_edit-txt_itemstock_priceadjdate'),
	txt_itemstock_grossprice: $('#pnl_edit-txt_itemstock_grossprice'),
	chk_itemstock_isdiscvalue: $('#pnl_edit-chk_itemstock_isdiscvalue'),
	txt_itemstock_disc: $('#pnl_edit-txt_itemstock_disc'),
	txt_itemstock_discval: $('#pnl_edit-txt_itemstock_discval'),
	txt_itemstock_sellprice: $('#pnl_edit-txt_itemstock_sellprice'),
	txt_itemstock_estcost: $('#pnl_edit-txt_itemstock_estcost'),
	txt_itemstock_weight: $('#pnl_edit-txt_itemstock_weight'),
	txt_itemstock_length: $('#pnl_edit-txt_itemstock_length'),
	txt_itemstock_width: $('#pnl_edit-txt_itemstock_width'),
	txt_itemstock_height: $('#pnl_edit-txt_itemstock_height'),
	txt_itemstock_lastqty: $('#pnl_edit-txt_itemstock_lastqty'),
	txt_itemstock_lastvalue: $('#pnl_edit-txt_itemstock_lastvalue'),
	txt_itemstock_lastqtyupdate: $('#pnl_edit-txt_itemstock_lastqtyupdate'),
	chk_itemstock_isupdating: $('#pnl_edit-chk_itemstock_isupdating'),
	txt_itemstock_updatebatch: $('#pnl_edit-txt_itemstock_updatebatch'),
	txt_itemstock_lastrecvid: $('#pnl_edit-txt_itemstock_lastrecvid'),
	txt_itemstock_lastrecvdate: $('#pnl_edit-txt_itemstock_lastrecvdate'),
	txt_itemstock_lastrecvqty: $('#pnl_edit-txt_itemstock_lastrecvqty'),
	txt_itemstock_lastcost: $('#pnl_edit-txt_itemstock_lastcost'),
	txt_itemstock_lastcostdate: $('#pnl_edit-txt_itemstock_lastcostdate'),
	txt_itemstock_ref: $('#pnl_edit-txt_itemstock_ref'),
	txt_itemstock_refname: $('#pnl_edit-txt_itemstock_refname'),
	txt_itemstock_uploadbatchcode: $('#pnl_edit-txt_itemstock_uploadbatchcode')
}




let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	txt_caption.template = txt_caption.html();
	var disableedit = false;


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_itemstock_id,
		autoid: true,
		logview: 'mst_itemstock',
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


	obj.fl_itemstock_picture.filebox({
		onChange: function(value) {
			var files = obj.fl_itemstock_picture.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_itemstock_picture_img.attr('src', e.target.result);
							fl_itemstock_picture_img.show();
							fl_itemstock_picture_lnk.hide();
						}
					} else {
						fl_itemstock_picture_img.hide();
						fl_itemstock_picture_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
		}
	})				
				


	obj.cbo_itemgroup_id.name = 'pnl_edit-cbo_itemgroup_id'		
	new fgta4slideselect(obj.cbo_itemgroup_id, {
		title: 'Pilih itemgroup_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemgroup_id,
		fieldValue: 'itemgroup_id',
		fieldDisplay: 'itemgroup_name',
		fields: [
			{mapping: 'itemgroup_id', text: 'itemgroup_id'},
			{mapping: 'itemgroup_name', text: 'itemgroup_name'}
		],

	})				
				
	obj.cbo_itemclass_id.name = 'pnl_edit-cbo_itemclass_id'		
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclass_id,
		fieldValue: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'}
		],

	})				
				
	obj.cbo_dept_id.name = 'pnl_edit-cbo_dept_id'		
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

	})				
				
	obj.cbo_unit_id.name = 'pnl_edit-cbo_unit_id'		
	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih Unit',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'}
		],

	})				
				
	obj.cbo_unitmeasurement_id.name = 'pnl_edit-cbo_unitmeasurement_id'		
	new fgta4slideselect(obj.cbo_unitmeasurement_id, {
		title: 'Pilih unitmeasurement_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unitmeasurement_id,
		fieldValue: 'unitmeasurement_id',
		fieldDisplay: 'unitmeasurement_name',
		fields: [
			{mapping: 'unitmeasurement_id', text: 'unitmeasurement_id'},
			{mapping: 'unitmeasurement_name', text: 'unitmeasurement_name'}
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

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', '');
	caption = caption.replace('{{STATE_END}}', ' View');
	txt_caption.html(caption);


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
			.setValue(obj.cbo_itemgroup_id, record.itemgroup_id, record.itemgroup_name)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_unitmeasurement_id, record.unitmeasurement_id, record.unitmeasurement_name)
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

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', 'Create New ');
	caption = caption.replace('{{STATE_END}}', '');
	txt_caption.html(caption);


	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.itemstock_isdisabled = '0'
		data.itemstock_ishascompound = '0'
		data.itemstock_issellable = '0'
		data.itemstock_priceori = 0
		data.itemstock_priceadj = 0
		data.itemstock_grossprice = 0
		data.itemstock_isdiscvalue = '0'
		data.itemstock_disc = 0
		data.itemstock_discval = 0
		data.itemstock_sellprice = 0
		data.itemstock_estcost = 0
		data.itemstock_weight = 0
		data.itemstock_length = 0
		data.itemstock_width = 0
		data.itemstock_height = 0
		data.itemstock_lastqty = 0
		data.itemstock_lastvalue = 0
		data.itemstock_isupdating = '0'
		data.itemstock_lastrecvqty = 0
		data.itemstock_lastcost = 0

		data.itemgroup_id = '0'
		data.itemgroup_name = '-- PILIH --'
		data.itemclass_id = '0'
		data.itemclass_name = '-- PILIH --'
		data.dept_id = global.setup.dept_id
		data.dept_name = global.setup.dept_name
		data.unit_id = '0'
		data.unit_name = '-- PILIH --'
		data.unitmeasurement_id = '0'
		data.unitmeasurement_name = '-- PILIH --'

		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}


		fl_itemstock_picture_img.hide();
		fl_itemstock_picture_lnk.hide();	
		obj.fl_itemstock_picture.filebox('clear');		
				


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editbarcodegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpropgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpositiongrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editcompoundgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editconversiongrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpicturegrid'].handler.createnew(data, options)


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

		obj.fl_itemstock_picture.filebox('clear');			
		if (record.itemstock_picture_doc!=undefined) {
			if (record.itemstock_picture_doc.type.startsWith('image')) {
				fl_itemstock_picture_lnk.hide();
				fl_itemstock_picture_img.show();
				fl_itemstock_picture_img.attr('src', record.itemstock_picture_doc.attachmentdata);
			} else {
				fl_itemstock_picture_img.hide();
				fl_itemstock_picture_lnk.show();
				fl_itemstock_picture_lnk[0].onclick = () => {
					fl_itemstock_picture_lnk.attr('download', record.itemstock_picture_doc.name);
					fl_itemstock_picture_lnk.attr('href', record.itemstock_picture_doc.attachmentdata);
				}
			}	
		} else {
			fl_itemstock_picture_img.hide();
			fl_itemstock_picture_lnk.hide();			
		}				
				

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
	var updategriddata = {}

	// apabila ada keperluan untuk update state grid list di sini


	if (typeof hnd.form_updategridstate == 'function') {
		hnd.form_updategridstate(updategriddata, record);
	}

	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);

}

function form_viewmodechanged(viewmode) {

	var caption = txt_caption.template;
	if (viewmode) {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' View');
	} else {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' Edit');
	}
	txt_caption.html(caption);


	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_itemstock_id
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
	// options.skipmappingresponse = [];
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
	var rowdata = {
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




