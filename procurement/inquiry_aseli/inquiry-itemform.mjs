var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_edititemform-title')
const btn_edit = $('#pnl_edititemform-btn_edit')
const btn_save = $('#pnl_edititemform-btn_save')
const btn_delete = $('#pnl_edititemform-btn_delete')
const btn_prev = $('#pnl_edititemform-btn_prev')
const btn_next = $('#pnl_edititemform-btn_next')
const btn_addnew = $('#pnl_edititemform-btn_addnew')
const chk_autoadd = $('#pnl_edititemform-autoadd')


const pnl_inquirydetil_qty = $('#pnl_edititemform-inquirydetil_qty');
const pnl_inquirydetil_days = $('#pnl_edititemform-inquirydetil_days');
const pnl_inquirydetil_task = $('#pnl_edititemform-inquirydetil_task');

const pnl_form = $('#pnl_edititemform-form')
const obj = {
	txt_inquirydetil_id: $('#pnl_edititemform-txt_inquirydetil_id'),
	cbo_itemasset_id: $('#pnl_edititemform-cbo_itemasset_id'),
	cbo_item_id: $('#pnl_edititemform-cbo_item_id'),
	cbo_itemstock_id: $('#pnl_edititemform-cbo_itemstock_id'),
	cbo_partner_id: $('#pnl_edititemform-cbo_partner_id'),
	cbo_itemclass_id: $('#pnl_edititemform-cbo_itemclass_id'),
	cbo_empl_id: $('#pnl_edititemform-cbo_empl_id'),
	cbo_hrgrd_id: $('#pnl_edititemform-cbo_hrgrd_id'),
	txt_inquirydetil_descr: $('#pnl_edititemform-txt_inquirydetil_descr'),
	txt_inquirydetil_qty: $('#pnl_edititemform-txt_inquirydetil_qty'),
	txt_inquirydetil_days: $('#pnl_edititemform-txt_inquirydetil_days'),
	txt_inquirydetil_task: $('#pnl_edititemform-txt_inquirydetil_task'),
	txt_inquirydetil_estrate: $('#pnl_edititemform-txt_inquirydetil_estrate'),
	txt_inquirydetil_estvalue: $('#pnl_edititemform-txt_inquirydetil_estvalue'),
	txt_inquirydetil_value: $('#pnl_edititemform-txt_inquirydetil_value'),
	cbo_projbudgetdet_id: $('#pnl_edititemform-cbo_projbudgetdet_id'),
	chk_inquirydetil_isoverbudget: $('#pnl_edititemform-chk_inquirydetil_isoverbudget'),
	chk_inquirydetil_isunbudget: $('#pnl_edititemform-chk_inquirydetil_isunbudget'),
	txt_inquirydetil_budgetavailable: $('#pnl_edititemform-txt_inquirydetil_budgetavailable'),
	txt_inquirydetil_budgetqtyavailable: $('#pnl_edititemform-txt_inquirydetil_budgetqtyavailable'),
	txt_inquirydetil_budgetdaysavailable: $('#pnl_edititemform-txt_inquirydetil_budgetdaysavailable'),
	txt_inquirydetil_budgettaskavailable: $('#pnl_edititemform-txt_inquirydetil_budgettaskavailable'),
	chk_inquirydetil_isadvproces: $('#pnl_edititemform-chk_inquirydetil_isadvproces'),
	chk_inquirydetil_isuseqty: $('#pnl_edititemform-chk_inquirydetil_isuseqty'),
	chk_inquirydetil_isusedays: $('#pnl_edititemform-chk_inquirydetil_isusedays'),
	chk_inquirydetil_isusetask: $('#pnl_edititemform-chk_inquirydetil_isusetask'),
	chk_inquirydetil_islimitqty: $('#pnl_edititemform-chk_inquirydetil_islimitqty'),
	chk_inquirydetil_islimitdays: $('#pnl_edititemform-chk_inquirydetil_islimitdays'),
	chk_inquirydetil_islimittask: $('#pnl_edititemform-chk_inquirydetil_islimittask'),
	chk_inquirydetil_islimitvalue: $('#pnl_edititemform-chk_inquirydetil_islimitvalue'),
	txt_inquirydetil_qtyavailable: $('#pnl_edititemform-txt_inquirydetil_qtyavailable'),
	chk_inquirydetil_isallowoverbudget: $('#pnl_edititemform-chk_inquirydetil_isallowoverbudget'),
	chk_inquirydetil_isallowunbudget: $('#pnl_edititemform-chk_inquirydetil_isallowunbudget'),

	txt_accbudget_id: $('#pnl_edititemform-txt_accbudget_id'),
	txt_coa_id: $('#pnl_edititemform-txt_coa_id'),
	txt_inquiry_id: $('#pnl_edititemform-txt_inquiry_id')
}


let form
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_inquirydetil_id,
		autoid: true,
		logview: 'trn_inquirydetil',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)

	obj.chk_inquirydetil_isunbudget.checkbox({ onChange: (checked) => { chk_inquirydetil_isunbudget_changed(checked) }});



	obj.cbo_itemasset_id.name = 'pnl_edititemform-cbo_itemasset_id'		
	new fgta4slideselect(obj.cbo_itemasset_id, {
		title: 'Pilih itemasset_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-itemasset`,
		fieldValue: 'itemasset_id',
		fieldValueMap: 'itemasset_id',
		fieldDisplay: 'itemasset_name',
		fields: [
			{mapping: 'itemasset_id', text: 'itemasset_id'},
			{mapping: 'itemasset_name', text: 'itemasset_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.inquirytype_id = header_data.inquirytype_id;
			criteria.request_dept_id = header_data.request_dept_id
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemasset_id:'--NULL--', itemasset_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
				cbo_itemclass_id_selected(record.itemclass_id, (res)=>{

				});
			}			
		}
	})				

	obj.cbo_itemstock_id.name = 'pnl_edititemform-cbo_itemstock_id'		
	new fgta4slideselect(obj.cbo_itemstock_id, {
		title: 'Pilih itemstock_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-itemstock`,
		fieldValue: 'itemstock_id',
		fieldValueMap: 'itemstock_id',
		fieldDisplay: 'itemstock_name',
		fields: [
			{mapping: 'itemstock_id', text: 'itemstock_id'},
			{mapping: 'itemstock_name', text: 'itemstock_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.inquirytype_id = header_data.inquirytype_id;
		},
		OnDataLoaded : (result, options) => {
			// result.records.unshift({itemstock_id:'--NULL--', itemstock_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
				cbo_itemclass_id_selected(record.itemclass_id, (res)=>{

				});
			}			
		}
	})		
	
	obj.cbo_item_id.name = 'pnl_edititemform-cbo_item_id'		
	new fgta4slideselect(obj.cbo_item_id, {
		title: 'Pilih item_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-item`,
		fieldValue: 'item_id',
		fieldValueMap: 'item_id',
		fieldDisplay: 'item_name',
		fields: [
			{mapping: 'item_id', text: 'item_id'},
			{mapping: 'item_name', text: 'item_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.inquirytype_id = header_data.inquirytype_id;
			if (header_data.inquiry_isitemdeptowner) {
				criteria.dept_id = header_data.owner_dept_id;
			} else if (header_data.inquiry_isitemdeptuser) {
				criteria.dept_id = header_data.user_dept_id;
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({item_id:'--NULL--', item_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
				form.setValue(obj.txt_inquirydetil_descr, record.item_name);
				form.setValue(obj.txt_inquirydetil_estrate, record.item_stdcost)


				txt_inquirydetil_valuechanged();
				cbo_itemclass_id_selected(record.itemclass_id, (res)=>{});
			}			
		}
	})	
		
			
	obj.cbo_partner_id.name = 'pnl_edititemform-cbo_partner_id'		
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-partner`,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'ID'},
			{mapping: 'partner_name', text: 'Name'},
			{mapping: 'partnertype_name', text: 'Type'},
		],
		OnDataLoading: (criteria) => {
			var inquirytype_id = header_data.inquirytype_id;
			criteria.inquirytype_id = inquirytype_id;
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
				cbo_itemclass_id_selected(record.itemclass_id, (res)=>{

				});
			}			
		}
	})				
			
	obj.cbo_itemclass_id.name = 'pnl_edititemform-cbo_itemclass_id'		
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-itemclass`,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
		],
		OnDataLoading: (criteria) => {
			// console.log(header_data)
			criteria.itemmanage_id = header_data.itemmanage_id;
			criteria.inquirytype_id = header_data.inquirytype_id;
			if (header_data.inquiry_isitemdeptowner) {
				criteria.dept_id = header_data.owner_dept_id;
			}
			// 

		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				cbo_itemclass_id_selected(value, (res)=>{

				});
			}			
		}
	})				
			


	obj.cbo_empl_id.name = 'pnl_edititemform-cbo_empl_id'
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria, options) => {
			criteria.dept_id = header_data.user_dept_id;
			criteria.isdisabled = 0
		},
		OnDataLoaded : (result, options) => {
			// result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {	
				// console.log(record)	
				form.setValue(obj.cbo_hrgrd_id, record.hrgrd_id, record.hrgrd_name);
			}
		}
	})

	obj.cbo_projbudgetdet_id.name = 'pnl_edititemform-cbo_projbudgetdet_id'		
	new fgta4slideselect(obj.cbo_projbudgetdet_id, {
		title: 'Pilih projbudgetdet_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-budgetavailable`,
		fieldValue: 'projbudgetdet_id',
		fieldValueMap: 'projbudgetdet_id',
		fieldDisplay: 'projbudgetdet_descr',
		fields: [
			{mapping: 'projbudgetdet_id', text: 'projbudgetdet_id'},
			{mapping: 'projbudgetdet_descr', text: 'projbudgetdet_descr'},
		],
		OnDataLoading: (criteria) => {
			var itemclass_id = form.getValue(obj.cbo_itemclass_id);
			criteria.itemclass_id = itemclass_id;
			criteria.projbudget_id = header_data.projbudget_id;
			criteria.exclude_inquirydetil_id = '';
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgetdet_id:'--NULL--', projbudgetdet_descr:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {

			}			
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() } })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

	obj.txt_inquirydetil_qty.numberbox({ onChange: (newvalue, oldvalue) =>  { txt_inquirydetil_valuechanged(newvalue, oldvalue); } })
	obj.txt_inquirydetil_days.numberbox({ onChange: (newvalue, oldvalue) => { txt_inquirydetil_valuechanged(newvalue, oldvalue); } })
	obj.txt_inquirydetil_task.numberbox({ onChange: (newvalue, oldvalue) => { txt_inquirydetil_valuechanged(newvalue, oldvalue); } })
	obj.txt_inquirydetil_estrate.numberbox({ onChange: (newvalue, oldvalue) => { txt_inquirydetil_valuechanged(newvalue, oldvalue); } })


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
	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_edititemgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_edititemgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_edititemgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_edititemgrid'].handler.scrolllast()
				})
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
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})
}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.inquiry_descr)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/item-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.itemasset_id==null) { result.record.itemasset_id='--NULL--'; result.record.itemasset_name='NONE'; }
		if (result.record.item_id==null) { result.record.item_id='--NULL--'; result.record.item_name='NONE'; }
		if (result.record.itemstock_id==null) { result.record.itemstock_id='--NULL--'; result.record.itemstock_name='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		if (result.record.projbudgetdet_id==null) { result.record.projbudgetdet_id='--NULL--'; result.record.projbudgetdet_descr='NONE'; }
		if (result.record.empl_id==null) { result.record.empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.hrgrd_id==null) { result.record.hrgrd_id='--NULL--'; result.record.hrgrd_name='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_itemasset_id, result.record.itemasset_id, result.record.itemasset_name)
			.setValue(obj.cbo_item_id, result.record.item_id, result.record.item_name)
			.setValue(obj.cbo_itemstock_id, result.record.itemstock_id, result.record.itemstock_name)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_itemclass_id, result.record.itemclass_id, result.record.itemclass_name)
			.setValue(obj.cbo_projbudgetdet_id, result.record.projbudgetdet_id, result.record.projbudgetdet_descr)
			.setValue(obj.cbo_empl_id, result.record.empl_id, result.record.empl_id)
			.setValue(obj.cbo_hrgrd_id, result.record.hrgrd_id, result.record.hrgrd_name)
			.setViewMode()
			.rowid = rowid


		chk_inquirydetil_isunbudget_changed(result.record.inquirydetil_isunbudget==1?true:false);
		set_overbudget(header_data.inquiry_isallowoverbudget==1?true:false);
		format_item_metric(
			result.record.inquirydetil_isuseqty==1 ? true : false
		  , result.record.inquirydetil_isusedays==1 ? true : false
		  , result.record.inquirydetil_isusetask==1 ? true : false
	 	 );

		form.commit()	
		form.SuspendEvent(false);
		form_prepare(result.record)

		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.inquiry_id= hdata.inquiry_id
		data.item_value = 0

		data.inquirydetil_qty = 1
		data.inquirydetil_days = 1
		data.inquirydetil_task = 1
		data.inquirydetil_estrate = 0
		data.inquirydetil_estvalue = 0
		data.inquirydetil_value = 0
		data.inquirydetil_budgetavailable = 0
		data.inquirydetil_budgetqtyavailable = 0
		data.inquirydetil_budgetdaysavailable = 0
		data.inquirydetil_budgettaskavailable = 0
		data.inquirydetil_qtyavailable = 0
		data.inquirydetil_isuseqty = 1;
		data.inquirydetil_isusedays = 1;
		data.inquirydetil_isusetask = 1;
		data.inquirydetil_islimitqty = 1;
		data.inquirydetil_islimitdays = 1;
		data.inquirydetil_islimittask = 1;
		data.inquirydetil_islimitvalue = 1;
		data.inquirydetil_isunbudget = 0;



		data.itemasset_id = '--NULL--'
		data.itemasset_name = 'NONE'
		data.item_id = '--NULL--'
		data.item_name = 'NONE'
		data.itemstock_id = '--NULL--'
		data.itemstock_name = 'NONE'
		data.partner_id = header_data.partner_id
		data.partner_name = header_data.partner_name
		data.itemclass_id = '0'
		data.itemclass_name = '-- PILIH --'
		data.projbudgetdet_id = '--NULL--'
		data.projbudgetdet_descr = 'NONE'
		data.empl_id = header_data.empl_id
		data.empl_name = header_data.empl_name
		data.hrgrd_id = '--NULL--'
		data.hrgrd_name = 'NONE'


		chk_inquirydetil_isunbudget_changed(data.inquirydetil_isunbudget==1?true:false);
		set_overbudget(header_data.inquiry_isallowoverbudget==1?true:false);
		format_item_metric(
			data.inquirydetil_isuseqty==1 ? true : false
		  , data.inquirydetil_isusedays==1 ? true : false
		  , data.inquirydetil_isusetask==1 ? true : false
	 	 );


		form_prepare(data)

		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edititemgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/item-save`


	// options.cancel = true;
	var isoverbudget = form.getValue(obj.chk_inquirydetil_isoverbudget);
	var isunbudget = form.getValue(obj.chk_inquirydetil_isunbudget);
	var budget_available =  Number(form.getValue(obj.txt_inquirydetil_budgetavailable));
	var budget_qty_available =  Number(form.getValue(obj.txt_inquirydetil_budgetqtyavailable));
	var budget_days_available =  Number(form.getValue(obj.txt_inquirydetil_budgetdaysavailable));
	var budget_task_available =  Number(form.getValue(obj.txt_inquirydetil_budgettaskavailable));
	var inquiry_proposed = Number(form.getValue(obj.txt_inquirydetil_estvalue));
	var inquiry_qty_proposed = Number(form.getValue(obj.txt_inquirydetil_qty));
	var inquiry_days_proposed = Number(form.getValue(obj.txt_inquirydetil_days));
	var inquiry_task_proposed = Number(form.getValue(obj.txt_inquirydetil_task));


	var isuseqty = form.getValue(obj.chk_inquirydetil_isuseqty);
	var isusedays = form.getValue(obj.chk_inquirydetil_isusedays);
	var isusetask = form.getValue(obj.chk_inquirydetil_isusetask);
	var islimitqty = form.getValue(obj.chk_inquirydetil_islimitqty);
	var islimitdays = form.getValue(obj.chk_inquirydetil_islimitdays);
	var islimittask = form.getValue(obj.chk_inquirydetil_islimittask);
	var islimitvalue = form.getValue(obj.chk_inquirydetil_islimitvalue);


	islimitqty = !isuseqty ? false : islimitqty;
	islimitdays = !isusedays ? false : islimitdays;
	islimittask = !isusetask ? false : islimittask;

	
	if (!isunbudget) {


		if (islimitvalue) {
			if (budget_available<inquiry_proposed) {
				// budgetnya kurang
				if (!isoverbudget) {
					options.cancel = true;
					$ui.ShowMessage("[WARNING]Value Inquiry over budget");
					return;
				}
			}
		}
	
		if (islimitqty) {
			if (budget_qty_available<inquiry_qty_proposed) {
				if (!isoverbudget) {
					options.cancel = true;
					$ui.ShowMessage("[WARNING]Qty Inquiry over budget");
					return;
				}
			} 
		}
	
		if (islimitdays) {
			if (budget_days_available<inquiry_days_proposed) {
				if (!isoverbudget) {
					options.cancel = true;
					$ui.ShowMessage("[WARNING]Days Inquiry over budget");
					return;
				}
			} 
		}
	
		if (islimittask) {
			if (budget_task_available<inquiry_task_proposed) {
				if (!isoverbudget) {
					options.cancel = true;
					$ui.ShowMessage("[WARNING]Task Inquiry over budget");
					return;
				}
			} 
		}


		
	}




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

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)
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
	form.rowid = $ui.getPages().ITEMS['pnl_edititemgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/item-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_edititemgrid', ()=>{
		$ui.getPages().ITEMS['pnl_edititemgrid'].handler.removerow(form.rowid)
	})
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
}


function form_idsetup(options) {
	var objid = obj.txt_inquirydetil_id
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



function form_prepare(data) {
	if ($.find('.inquiryselect.class.disabled').length>0) {
		form.setDisable(obj.cbo_itemclass_id, true);
	} else {
		form.setDisable(obj.cbo_itemclass_id, false);
	}
}

function btn_addnew_click() {
	createnew(header_data)
}




function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edititemgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edititemgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}


function txt_inquirydetil_valuechanged(newvalue, oldvalue) {
	if (form.isEventSuspended()) {
		return;
	}

	var inquirydetil_qty =  parseFloat(obj.txt_inquirydetil_qty.numberbox('getValue'));
	var inquirydetil_days =  parseFloat(obj.txt_inquirydetil_days.numberbox('getValue'));
	var inquirydetil_task =  parseFloat(obj.txt_inquirydetil_task.numberbox('getValue'));
	var inquirydetil_estrate =  parseFloat(obj.txt_inquirydetil_estrate.numberbox('getValue'));
	var total = inquirydetil_qty * inquirydetil_days * inquirydetil_task * inquirydetil_estrate;
	form.setValue(obj.txt_inquirydetil_estvalue, total);
	form.setValue(obj.txt_inquirydetil_value, total);
}

async function cbo_itemclass_id_selected(value, fn_callback) {
	// TODO: ambil data budget
	// console.log('ambil data budget');


	var apiurl = `${global.modulefullname}/get-budgetavailable`
	var args = {
		options: {
			criteria: {
				itemclass_id: value,
				projbudget_id: header_data.projbudget_id,
				inquiry_id: header_data.inquiry_id,
				exclude_inquirydetil_id: ''
			}
		}
	}

	// console.log(args.options.criteria)

	try {
		$ui.mask('wait..');
		var result = await $ui.apicall(apiurl, args);
		if (result.records.length==0) {
			// TODO: kalau budgetnya nggak ada
			console.log('informasi itemclass gak ada')
		} else {
			// console.log(result);

			var projbudgetdet = result.records[0];
			console.log(projbudgetdet);

			if (projbudgetdet.projbudgetdet_id!=null && projbudgetdet.projbudgetdet_id!=''&& projbudgetdet.projbudgetdet_id!='--NULL--') {
				form.setValue(obj.cbo_projbudgetdet_id, projbudgetdet.projbudgetdet_id, projbudgetdet.projbudgetdet_descr);
				form.setValue(obj.txt_inquirydetil_budgetavailable, projbudgetdet.budget_available)
				form.setValue(obj.txt_inquirydetil_budgetqtyavailable, projbudgetdet.budget_qty_available)
				form.setValue(obj.txt_inquirydetil_budgetdaysavailable, projbudgetdet.budget_days_available)
				form.setValue(obj.txt_inquirydetil_budgettaskavailable, projbudgetdet.budget_task_available)
			} else {
				obj.cbo_projbudgetdet_id.reset();
				form.setValue(obj.txt_inquirydetil_budgetavailable, '0');
				form.setValue(obj.txt_inquirydetil_budgetqtyavailable, '0');
				form.setValue(obj.txt_inquirydetil_budgetdaysavailable, '0');
				form.setValue(obj.txt_inquirydetil_budgettaskavailable, '0');
			}

			if (projbudgetdet.coa_id!=null && projbudgetdet.coa_id!=''&& projbudgetdet.coa_id!='--NULL--') {
				form.setValue(obj.txt_coa_id, projbudgetdet.coa_id)
			} else {
				form.setValue(obj.txt_coa_id, '');
			}

			if (projbudgetdet.accbudget_id!=null && projbudgetdet.accbudget_id!=''&& projbudgetdet.accbudget_id!='--NULL--') {
				form.setValue(obj.txt_accbudget_id, projbudgetdet.accbudget_id)
			} else {
				form.setValue(obj.txt_accbudget_id, '');
			}


			form.setValue(obj.chk_inquirydetil_isadvproces, projbudgetdet.itemclass_isadvproces)
			form.setValue(obj.chk_inquirydetil_isuseqty, projbudgetdet.inquirytype_isuseqty);
			form.setValue(obj.chk_inquirydetil_isusedays, projbudgetdet.inquirytype_isusedays);
			form.setValue(obj.chk_inquirydetil_isusetask, projbudgetdet.inquirytype_isusetask);
			form.setValue(obj.chk_inquirydetil_islimitqty, projbudgetdet.inquirytype_islimitqty);
			form.setValue(obj.chk_inquirydetil_islimitdays, projbudgetdet.inquirytype_islimitdays);
			form.setValue(obj.chk_inquirydetil_islimittask, projbudgetdet.inquirytype_islimittask);
			form.setValue(obj.chk_inquirydetil_islimitvalue, projbudgetdet.inquirytype_islimitvalue);
			form.setValue(obj.chk_inquirydetil_isallowoverbudget, projbudgetdet.inquirytype_isallowoverbudget);
			form.setValue(obj.chk_inquirydetil_isallowunbudget, projbudgetdet.inquirytype_isallowunbudget);

			var isadvproces = form.getValue(obj.chk_inquirydetil_isadvproces);
			if (isadvproces) {
				// form.setValue()
			}
			

			format_item_metric(
				  projbudgetdet.inquirytype_isuseqty==1 ? true : false
				, projbudgetdet.inquirytype_isusedays==1 ? true : false
				, projbudgetdet.inquirytype_isusetask==1 ? true : false
			);
			set_overbudget(projbudgetdet.inquirytype_isallowoverbudget==1 ? true : false);
			set_unbudget(projbudgetdet.inquirytype_isallowunbudget==1 ? true : false);

		}	

		// console.log(result.records[0]);
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}




function set_overbudget(isoverbudget) {
	if (!isoverbudget) {
		form.setDisable(obj.chk_inquirydetil_isoverbudget, true);
	} else {
		form.setDisable(obj.chk_inquirydetil_isoverbudget, false);
	}
}



function set_unbudget(isunbudget) {
	if (!isunbudget) {
		form.setDisable(obj.chk_inquirydetil_isunbudget, true);
	} else {
		form.setDisable(obj.chk_inquirydetil_isunbudget, false);
	}
}

function format_item_metric(isuseqty, isusedays, isusetask) {
	// console.log(isuseqty, isusedays, isusetask)

	var inquiry_qty_proposed = Number(form.getValue(obj.txt_inquirydetil_qty));
	var inquiry_days_proposed = Number(form.getValue(obj.txt_inquirydetil_days));
	var inquiry_task_proposed = Number(form.getValue(obj.txt_inquirydetil_task));

	if (inquiry_qty_proposed!=1) {
		pnl_inquirydetil_qty.show();
	} else {
		if (isuseqty) {
			pnl_inquirydetil_qty.show();
		} else {
			pnl_inquirydetil_qty.hide();
		}
	}

	if (inquiry_days_proposed!=1) {
		pnl_inquirydetil_days.show();
	} else {
		if (isusedays) {
			pnl_inquirydetil_days.show();
		} else {
			pnl_inquirydetil_days.hide();
		}
	}

	if (inquiry_task_proposed!=1) {
		pnl_inquirydetil_task.show();
	} else {
		if (isusetask) {
			pnl_inquirydetil_task.show();
		} else {
			pnl_inquirydetil_task.hide();
		}
	}


}



function chk_inquirydetil_isunbudget_changed(checked) {
	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)

	if (checked) {
		obj.cbo_projbudgetdet_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_projbudgetdet_id, promptOptional.value, promptOptional.text);
		};
	} else {
		obj.cbo_projbudgetdet_id.revalidate({
			required: true, invalidMessage:  'Tidak ada allokasi budget untuk item yg dipilih', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edititemform-cbo_projbudgetdet_id']",
		});
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_projbudgetdet_id, promptMandatory.value, promptMandatory.text);
		}

	}

}

