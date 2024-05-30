var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './itemclass-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')






const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemclass_id: $('#pnl_edit-txt_itemclass_id'),
	cbo_itemmodel_id: $('#pnl_edit-cbo_itemmodel_id'),
	txt_itemclass_name: $('#pnl_edit-txt_itemclass_name'),
	chk_itemclass_isdisabled: $('#pnl_edit-chk_itemclass_isdisabled'),
	chk_itemclass_isadvproces: $('#pnl_edit-chk_itemclass_isadvproces'),
	txt_itemclass_descr: $('#pnl_edit-txt_itemclass_descr'),
	cbo_itemclassgroup_id: $('#pnl_edit-cbo_itemclassgroup_id'),
	cbo_itemmanage_id: $('#pnl_edit-cbo_itemmanage_id'),
	cbo_owner_unit_id: $('#pnl_edit-cbo_owner_unit_id'),
	cbo_owner_dept_id: $('#pnl_edit-cbo_owner_dept_id'),
	cbo_maintainer_dept_id: $('#pnl_edit-cbo_maintainer_dept_id'),
	cbo_unitmeasurement_id: $('#pnl_edit-cbo_unitmeasurement_id'),
	txt_itemclass_minassetvalue: $('#pnl_edit-txt_itemclass_minassetvalue'),
	cbo_inquiry_accbudget_id: $('#pnl_edit-cbo_inquiry_accbudget_id'),
	cbo_nr_coa_id: $('#pnl_edit-cbo_nr_coa_id'),
	cbo_lr_coa_id: $('#pnl_edit-cbo_lr_coa_id'),
	cbo_depremodel_id: $('#pnl_edit-cbo_depremodel_id'),
	txt_itemclass_depreage: $('#pnl_edit-txt_itemclass_depreage'),
	txt_itemclass_depreresidu: $('#pnl_edit-txt_itemclass_depreresidu'),
	chk_itemclass_isallowoverqty: $('#pnl_edit-chk_itemclass_isallowoverqty'),
	chk_itemclass_isallowoverdays: $('#pnl_edit-chk_itemclass_isallowoverdays'),
	chk_itemclass_isallowovertask: $('#pnl_edit-chk_itemclass_isallowovertask'),
	chk_itemclass_isallowovervalue: $('#pnl_edit-chk_itemclass_isallowovervalue'),
	chk_itemclass_isallowunbudget: $('#pnl_edit-chk_itemclass_isallowunbudget'),
	chk_itemclass_isindependentsetting: $('#pnl_edit-chk_itemclass_isindependentsetting'),
	chk_itemmodel_isintangible: $('#pnl_edit-chk_itemmodel_isintangible'),
	chk_itemmodel_issellable: $('#pnl_edit-chk_itemmodel_issellable'),
	chk_itemmodel_isnonitem: $('#pnl_edit-chk_itemmodel_isnonitem'),
	chk_itemmodel_ishasmainteinerdept: $('#pnl_edit-chk_itemmodel_ishasmainteinerdept'),
	chk_itemmanage_isasset: $('#pnl_edit-chk_itemmanage_isasset'),
	chk_depremodel_isautocalc: $('#pnl_edit-chk_depremodel_isautocalc'),
	chk_itemmanage_isbyassetowner: $('#pnl_edit-chk_itemmanage_isbyassetowner'),
	chk_itemmanage_isbystockowner: $('#pnl_edit-chk_itemmanage_isbystockowner'),
	chk_itemmanage_isbynonitemowner: $('#pnl_edit-chk_itemmanage_isbynonitemowner'),
	chk_itemmanage_isbypartnerselect: $('#pnl_edit-chk_itemmanage_isbypartnerselect')
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
		primary: obj.txt_itemclass_id,
		autoid: true,
		logview: 'mst_itemclass',
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


	obj.cbo_itemmodel_id.name = 'pnl_edit-cbo_itemmodel_id'		
	new fgta4slideselect(obj.cbo_itemmodel_id, {
		title: 'Pilih Model Item',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmodel_id,
		fieldValue: 'itemmodel_id',
		fieldDisplay: 'itemmodel_name',
		fields: [
			{mapping: 'itemmodel_id', text: 'itemmodel_id'},
			{mapping: 'itemmodel_name', text: 'itemmodel_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemmodel_id_selected === 'function') {
					hnd.cbo_itemmodel_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_itemclassgroup_id.name = 'pnl_edit-cbo_itemclassgroup_id'		
	new fgta4slideselect(obj.cbo_itemclassgroup_id, {
		title: 'Pilih Group Class',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclassgroup_id,
		fieldValue: 'itemclassgroup_id',
		fieldDisplay: 'itemclassgroup_name',
		fields: [
			{mapping: 'itemclassgroup_id', text: 'itemclassgroup_id'},
			{mapping: 'itemclassgroup_name', text: 'itemclassgroup_name'}
		],

	})				
				
	obj.cbo_itemmanage_id.name = 'pnl_edit-cbo_itemmanage_id'		
	new fgta4slideselect(obj.cbo_itemmanage_id, {
		title: 'Pilih Item Manage',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmanage_id,
		fieldValue: 'itemmanage_id',
		fieldDisplay: 'itemmanage_name',
		fields: [
			{mapping: 'itemmanage_id', text: 'itemmanage_id'},
			{mapping: 'itemmanage_name', text: 'itemmanage_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_itemmanage_id_selected === 'function') {
					hnd.cbo_itemmanage_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_owner_unit_id.name = 'pnl_edit-cbo_owner_unit_id'		
	new fgta4slideselect(obj.cbo_owner_unit_id, {
		title: 'Pilih Unit',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_unit_id,
		fieldValue: 'owner_unit_id',
		fieldDisplay: 'owner_unit_name',
		fieldValueMap: 'unit_id',
		fieldDisplayMap: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'}
		],

	})				
				
	obj.cbo_owner_dept_id.name = 'pnl_edit-cbo_owner_dept_id'		
	new fgta4slideselect(obj.cbo_owner_dept_id, {
		title: 'Pilih Owner Dept',
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
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_owner_dept_id_dataloading === 'function') {
				hnd.cbo_owner_dept_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_owner_dept_id_selected === 'function') {
					hnd.cbo_owner_dept_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_maintainer_dept_id.name = 'pnl_edit-cbo_maintainer_dept_id'		
	new fgta4slideselect(obj.cbo_maintainer_dept_id, {
		title: 'Pilih Maintainer Dept',
		returnpage: this_page_id,
		api: $ui.apis.load_maintainer_dept_id,
		fieldValue: 'maintainer_dept_id',
		fieldDisplay: 'maintainer_dept_name',
		fieldValueMap: 'dept_id',
		fieldDisplayMap: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_maintainer_dept_id_dataloading === 'function') {
				hnd.cbo_maintainer_dept_id_dataloading(criteria, options);
			}						
		},					

	})				
				
	obj.cbo_unitmeasurement_id.name = 'pnl_edit-cbo_unitmeasurement_id'		
	new fgta4slideselect(obj.cbo_unitmeasurement_id, {
		title: 'Pilih Maasurement',
		returnpage: this_page_id,
		api: $ui.apis.load_unitmeasurement_id,
		fieldValue: 'unitmeasurement_id',
		fieldDisplay: 'unitmeasurement_name',
		fields: [
			{mapping: 'unitmeasurement_id', text: 'unitmeasurement_id'},
			{mapping: 'unitmeasurement_name', text: 'unitmeasurement_name'}
		],

	})				
				
	obj.cbo_inquiry_accbudget_id.name = 'pnl_edit-cbo_inquiry_accbudget_id'		
	new fgta4slideselect(obj.cbo_inquiry_accbudget_id, {
		title: 'Pilih Budget untuk Inquiry',
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
				
	obj.cbo_nr_coa_id.name = 'pnl_edit-cbo_nr_coa_id'		
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
			
			if (typeof hnd.cbo_nr_coa_id_dataloading === 'function') {
				hnd.cbo_nr_coa_id_dataloading(criteria, options);
			}						
		},					

	})				
				
	obj.cbo_lr_coa_id.name = 'pnl_edit-cbo_lr_coa_id'		
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
			
			if (typeof hnd.cbo_lr_coa_id_dataloading === 'function') {
				hnd.cbo_lr_coa_id_dataloading(criteria, options);
			}						
		},					

	})				
				
	obj.cbo_depremodel_id.name = 'pnl_edit-cbo_depremodel_id'		
	new fgta4slideselect(obj.cbo_depremodel_id, {
		title: 'Pilih depremodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_depremodel_id,
		fieldValue: 'depremodel_id',
		fieldDisplay: 'depremodel_name',
		fields: [
			{mapping: 'depremodel_id', text: 'depremodel_id'},
			{mapping: 'depremodel_name', text: 'depremodel_name'}
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
		if (result.record.itemclassgroup_id==null) { result.record.itemclassgroup_id='--NULL--'; result.record.itemclassgroup_name='NONE'; }
		if (result.record.maintainer_dept_id==null) { result.record.maintainer_dept_id='--NULL--'; result.record.maintainer_dept_name='NONE'; }
		if (result.record.inquiry_accbudget_id==null) { result.record.inquiry_accbudget_id='--NULL--'; result.record.inquiry_accbudget_name='NONE'; }
		if (result.record.nr_coa_id==null) { result.record.nr_coa_id='--NULL--'; result.record.settl_coa_name='NONE'; }
		if (result.record.lr_coa_id==null) { result.record.lr_coa_id='--NULL--'; result.record.cost_coa_name='NONE'; }
		if (result.record.depremodel_id==null) { result.record.depremodel_id='--NULL--'; result.record.depremodel_name='NONE'; }

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
			.setValue(obj.cbo_itemmodel_id, record.itemmodel_id, record.itemmodel_name)
			.setValue(obj.cbo_itemclassgroup_id, record.itemclassgroup_id, record.itemclassgroup_name)
			.setValue(obj.cbo_itemmanage_id, record.itemmanage_id, record.itemmanage_name)
			.setValue(obj.cbo_owner_unit_id, record.owner_unit_id, record.owner_unit_name)
			.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.owner_dept_name)
			.setValue(obj.cbo_maintainer_dept_id, record.maintainer_dept_id, record.maintainer_dept_name)
			.setValue(obj.cbo_unitmeasurement_id, record.unitmeasurement_id, record.unitmeasurement_name)
			.setValue(obj.cbo_inquiry_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name)
			.setValue(obj.cbo_nr_coa_id, record.nr_coa_id, record.settl_coa_name)
			.setValue(obj.cbo_lr_coa_id, record.lr_coa_id, record.cost_coa_name)
			.setValue(obj.cbo_depremodel_id, record.depremodel_id, record.depremodel_name)
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
		data.itemclass_isdisabled = '0'
		data.itemclass_isadvproces = '0'
		data.itemclass_minassetvalue = 0
		data.itemclass_depreage = 0
		data.itemclass_depreresidu = 0
		data.itemclass_isallowoverqty = '0'
		data.itemclass_isallowoverdays = '0'
		data.itemclass_isallowovertask = '0'
		data.itemclass_isallowovervalue = '0'
		data.itemclass_isallowunbudget = '0'
		data.itemclass_isindependentsetting = '0'
		data.itemmodel_isintangible = '0'
		data.itemmodel_issellable = '0'
		data.itemmodel_isnonitem = '0'
		data.itemmodel_ishasmainteinerdept = '0'
		data.itemmanage_isasset = '0'
		data.depremodel_isautocalc = '0'
		data.itemmanage_isbyassetowner = '0'
		data.itemmanage_isbystockowner = '0'
		data.itemmanage_isbynonitemowner = '0'
		data.itemmanage_isbypartnerselect = '0'

		data.itemmodel_id = '0'
		data.itemmodel_name = '-- PILIH --'
		data.itemclassgroup_id = '--NULL--'
		data.itemclassgroup_name = 'NONE'
		data.itemmanage_id = '0'
		data.itemmanage_name = '-- PILIH --'
		data.owner_unit_id = '0'
		data.owner_unit_name = '-- PILIH --'
		data.owner_dept_id = '0'
		data.owner_dept_name = '-- PILIH --'
		data.maintainer_dept_id = '--NULL--'
		data.maintainer_dept_name = 'NONE'
		data.unitmeasurement_id = '0'
		data.unitmeasurement_name = '-- PILIH --'
		data.inquiry_accbudget_id = '--NULL--'
		data.inquiry_accbudget_name = 'NONE'
		data.nr_coa_id = '--NULL--'
		data.settl_coa_name = 'NONE'
		data.lr_coa_id = '--NULL--'
		data.cost_coa_name = 'NONE'
		data.depremodel_id = '--NULL--'
		data.depremodel_name = 'NONE'

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

		$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_itemclass_id
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
	// options.skipmappingresponse = ['itemclassgroup_id', 'maintainer_dept_id', 'inquiry_accbudget_id', 'nr_coa_id', 'lr_coa_id', 'depremodel_id', ];
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
	form.setValue(obj.cbo_itemclassgroup_id, result.dataresponse.itemclassgroup_name!=='--NULL--' ? result.dataresponse.itemclassgroup_id : '--NULL--', result.dataresponse.itemclassgroup_name!=='--NULL--'?result.dataresponse.itemclassgroup_name:'NONE')
	form.setValue(obj.cbo_maintainer_dept_id, result.dataresponse.maintainer_dept_name!=='--NULL--' ? result.dataresponse.maintainer_dept_id : '--NULL--', result.dataresponse.maintainer_dept_name!=='--NULL--'?result.dataresponse.maintainer_dept_name:'NONE')
	form.setValue(obj.cbo_inquiry_accbudget_id, result.dataresponse.inquiry_accbudget_name!=='--NULL--' ? result.dataresponse.inquiry_accbudget_id : '--NULL--', result.dataresponse.inquiry_accbudget_name!=='--NULL--'?result.dataresponse.inquiry_accbudget_name:'NONE')
	form.setValue(obj.cbo_nr_coa_id, result.dataresponse.settl_coa_name!=='--NULL--' ? result.dataresponse.nr_coa_id : '--NULL--', result.dataresponse.settl_coa_name!=='--NULL--'?result.dataresponse.settl_coa_name:'NONE')
	form.setValue(obj.cbo_lr_coa_id, result.dataresponse.cost_coa_name!=='--NULL--' ? result.dataresponse.lr_coa_id : '--NULL--', result.dataresponse.cost_coa_name!=='--NULL--'?result.dataresponse.cost_coa_name:'NONE')
	form.setValue(obj.cbo_depremodel_id, result.dataresponse.depremodel_name!=='--NULL--' ? result.dataresponse.depremodel_id : '--NULL--', result.dataresponse.depremodel_name!=='--NULL--'?result.dataresponse.depremodel_name:'NONE')

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




