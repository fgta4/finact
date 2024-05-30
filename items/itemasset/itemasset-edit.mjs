var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemasset_id: $('#pnl_edit-txt_itemasset_id'),
	txt_itemasset_name: $('#pnl_edit-txt_itemasset_name'),
	txt_itemasset_serial: $('#pnl_edit-txt_itemasset_serial'),
	cbo_item_id: $('#pnl_edit-cbo_item_id'),
	cbo_itemassetstatus_id: $('#pnl_edit-cbo_itemassetstatus_id'),
	txt_itemasset_statusnote: $('#pnl_edit-txt_itemasset_statusnote'),
	chk_itemasset_ischeckout: $('#pnl_edit-chk_itemasset_ischeckout'),
	chk_itemasset_ismoveable: $('#pnl_edit-chk_itemasset_ismoveable'),
	chk_itemasset_isdisabled: $('#pnl_edit-chk_itemasset_isdisabled'),
	chk_itemasset_iswrittenof: $('#pnl_edit-chk_itemasset_iswrittenof'),
	txt_itemasset_descr: $('#pnl_edit-txt_itemasset_descr'),
	txt_itemasset_merk: $('#pnl_edit-txt_itemasset_merk'),
	txt_itemasset_type: $('#pnl_edit-txt_itemasset_type'),
	cbo_itemclass_id: $('#pnl_edit-cbo_itemclass_id'),
	txt_itemasset_baselocation: $('#pnl_edit-txt_itemasset_baselocation'),
	cbo_site_id: $('#pnl_edit-cbo_site_id'),
	cbo_owner_dept_id: $('#pnl_edit-cbo_owner_dept_id'),
	cbo_maintainer_dept_id: $('#pnl_edit-cbo_maintainer_dept_id'),
	cbo_location_dept_id: $('#pnl_edit-cbo_location_dept_id'),
	cbo_location_site_id: $('#pnl_edit-cbo_location_site_id'),
	cbo_location_room_id: $('#pnl_edit-cbo_location_room_id'),
	cbo_location_empl_id: $('#pnl_edit-cbo_location_empl_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	dt_itemasset_purchasedate: $('#pnl_edit-dt_itemasset_purchasedate'),
	dt_itemasset_lastsupportdate: $('#pnl_edit-dt_itemasset_lastsupportdate'),
	txt_itemasset_purchasevalue: $('#pnl_edit-txt_itemasset_purchasevalue'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_itemasset_purchasevalue_idr: $('#pnl_edit-txt_itemasset_purchasevalue_idr'),
	cbo_asset_coa_id: $('#pnl_edit-cbo_asset_coa_id'),
	cbo_depremodel_id: $('#pnl_edit-cbo_depremodel_id'),
	cbo_cost_coa_id: $('#pnl_edit-cbo_cost_coa_id'),
	txt_itemasset_depreage: $('#pnl_edit-txt_itemasset_depreage'),
	txt_itemasset_depreresidu: $('#pnl_edit-txt_itemasset_depreresidu'),
	txt_itemasset_currentvalue_idr: $('#pnl_edit-txt_itemasset_currentvalue_idr'),
	dt_itemasset_currentvalue_date: $('#pnl_edit-dt_itemasset_currentvalue_date'),
	txt_itemasset_usevaluerate: $('#pnl_edit-txt_itemasset_usevaluerate'),
	txt_itemasset_writeoffby: $('#pnl_edit-txt_itemasset_writeoffby'),
	txt_itemasset_writeoffdate: $('#pnl_edit-txt_itemasset_writeoffdate'),
	txt_itemasset_writeoffref: $('#pnl_edit-txt_itemasset_writeoffref')
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
		primary: obj.txt_itemasset_id,
		autoid: true,
		logview: 'mst_itemasset',
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








	new fgta4slideselect(obj.cbo_item_id, {
		title: 'Pilih item_id',
		returnpage: this_page_id,
		api: $ui.apis.load_item_id,
		fieldValue: 'item_id',
		fieldValueMap: 'item_id',
		fieldDisplay: 'item_name',
		fields: [
			{mapping: 'item_id', text: 'item_id'},
			{mapping: 'item_name', text: 'item_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemassetstatus_id, {
		title: 'Pilih itemassetstatus_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemassetstatus_id,
		fieldValue: 'itemassetstatus_id',
		fieldValueMap: 'itemassetstatus_id',
		fieldDisplay: 'itemassetstatus_name',
		fields: [
			{mapping: 'itemassetstatus_id', text: 'itemassetstatus_id'},
			{mapping: 'itemassetstatus_name', text: 'itemassetstatus_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclass_id,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_site_id, {
		title: 'Pilih site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,
		fieldValue: 'site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_owner_dept_id, {
		title: 'Pilih owner_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_dept_id,
		fieldValue: 'owner_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_maintainer_dept_id, {
		title: 'Pilih maintainer_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_maintainer_dept_id,
		fieldValue: 'maintainer_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_location_dept_id, {
		title: 'Pilih location_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_location_dept_id,
		fieldValue: 'location_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_location_site_id, {
		title: 'Pilih location_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_location_site_id,
		fieldValue: 'location_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_location_room_id, {
		title: 'Pilih location_room_id',
		returnpage: this_page_id,
		api: $ui.apis.load_location_room_id,
		fieldValue: 'location_room_id',
		fieldValueMap: 'room_id',
		fieldDisplay: 'room_name',
		fields: [
			{mapping: 'room_id', text: 'room_id'},
			{mapping: 'room_name', text: 'room_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({room_id:'--NULL--', room_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_location_empl_id, {
		title: 'Pilih location_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_location_empl_id,
		fieldValue: 'location_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
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
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
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
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_asset_coa_id, {
		title: 'Pilih asset_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_asset_coa_id,
		fieldValue: 'asset_coa_id',
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
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_depremodel_id, {
		title: 'Pilih depremodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_depremodel_id,
		fieldValue: 'depremodel_id',
		fieldValueMap: 'depremodel_id',
		fieldDisplay: 'depremodel_name',
		fields: [
			{mapping: 'depremodel_id', text: 'depremodel_id'},
			{mapping: 'depremodel_name', text: 'depremodel_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_cost_coa_id, {
		title: 'Pilih cost_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_cost_coa_id,
		fieldValue: 'cost_coa_id',
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
		if (result.record.location_room_id==null) { result.record.location_room_id='--NULL--'; result.record.location_room_name='NONE'; }
		if (result.record.location_empl_id==null) { result.record.location_empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.asset_coa_id==null) { result.record.asset_coa_id='--NULL--'; result.record.asset_coa_name='NONE'; }
		if (result.record.cost_coa_id==null) { result.record.cost_coa_id='--NULL--'; result.record.cost_coa_name='NONE'; }

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
			.setValue(obj.cbo_item_id, record.item_id, record.item_name)
			.setValue(obj.cbo_itemassetstatus_id, record.itemassetstatus_id, record.itemassetstatus_name)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_site_id, record.site_id, record.site_name)
			.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.owner_dept_name)
			.setValue(obj.cbo_maintainer_dept_id, record.maintainer_dept_id, record.maintainer_dept_name)
			.setValue(obj.cbo_location_dept_id, record.location_dept_id, record.dept_name)
			.setValue(obj.cbo_location_site_id, record.location_site_id, record.site_name)
			.setValue(obj.cbo_location_room_id, record.location_room_id, record.location_room_name)
			.setValue(obj.cbo_location_empl_id, record.location_empl_id, record.empl_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name)
			.setValue(obj.cbo_asset_coa_id, record.asset_coa_id, record.asset_coa_name)
			.setValue(obj.cbo_depremodel_id, record.depremodel_id, record.depremodel_name)
			.setValue(obj.cbo_cost_coa_id, record.cost_coa_id, record.cost_coa_name)
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
		data.itemasset_ischeckout = '0'
		data.itemasset_ismoveable = '0'
		data.itemasset_isdisabled = '0'
		data.itemasset_iswrittenof = '0'
		data.itemasset_purchasedate = global.now()
		data.itemasset_lastsupportdate = global.now()
		data.itemasset_purchasevalue = 0
		data.itemasset_purchasevalue_idr = 0
		data.itemasset_depreage = 0
		data.itemasset_depreresidu = 0
		data.itemasset_currentvalue_idr = 0
		data.itemasset_currentvalue_date = global.now()
		data.itemasset_usevaluerate = 0

		data.item_id = '0'
		data.item_name = '-- PILIH --'
		data.itemassetstatus_id = '0'
		data.itemassetstatus_name = '-- PILIH --'
		data.itemclass_id = '0'
		data.itemclass_name = '-- PILIH --'
		data.site_id = '0'
		data.site_name = '-- PILIH --'
		data.owner_dept_id = '0'
		data.owner_dept_name = '-- PILIH --'
		data.maintainer_dept_id = '0'
		data.maintainer_dept_name = '-- PILIH --'
		data.location_dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.location_site_id = '0'
		data.site_name = '-- PILIH --'
		data.location_room_id = '--NULL--'
		data.location_room_name = 'NONE'
		data.location_empl_id = '--NULL--'
		data.empl_name = 'NONE'
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.curr_id = '0'
		data.curr_name = '-- PILIH --'
		data.asset_coa_id = '--NULL--'
		data.asset_coa_name = 'NONE'
		data.depremodel_id = '0'
		data.depremodel_name = '-- PILIH --'
		data.cost_coa_id = '--NULL--'
		data.cost_coa_name = 'NONE'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editspecgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editdepregrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editbookinggrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmovinggrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmaintenancegrid'].handler.createnew(data, options)


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
	var objid = obj.txt_itemasset_id
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
	// options.skipmappingresponse = ['location_room_id', 'location_empl_id', 'asset_coa_id', 'cost_coa_id', ];
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
	form.setValue(obj.cbo_location_room_id, result.dataresponse.location_room_name!=='--NULL--' ? result.dataresponse.location_room_id : '--NULL--', result.dataresponse.location_room_name!=='--NULL--'?result.dataresponse.location_room_name:'NONE')
	form.setValue(obj.cbo_location_empl_id, result.dataresponse.empl_name!=='--NULL--' ? result.dataresponse.location_empl_id : '--NULL--', result.dataresponse.empl_name!=='--NULL--'?result.dataresponse.empl_name:'NONE')
	form.setValue(obj.cbo_asset_coa_id, result.dataresponse.asset_coa_name!=='--NULL--' ? result.dataresponse.asset_coa_id : '--NULL--', result.dataresponse.asset_coa_name!=='--NULL--'?result.dataresponse.asset_coa_name:'NONE')
	form.setValue(obj.cbo_cost_coa_id, result.dataresponse.cost_coa_name!=='--NULL--' ? result.dataresponse.cost_coa_id : '--NULL--', result.dataresponse.cost_coa_name!=='--NULL--'?result.dataresponse.cost_coa_name:'NONE')

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




