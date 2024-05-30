export const _ASSET_SELECTION_ = 'A';
export const _CLASS_SELECTION_ = 'C';
export const _ITEM_SELECTION_ = 'I';
export const _PARTNER_SELECTION_ = 'P'
export const _STOCK_SELECTION_ = 'S';



export function format_by_selection(inquiryselect_id)  {
	// available 
	var forms = {
		header: $ui.getPages().ITEMS['pnl_edit'].handler.getForm(),
		items: $ui.getPages().ITEMS['pnl_edititemsform'].handler.getForm()
	}

	forms.isdateinterval = forms.header.getValue(forms.header.ITEMS.chk_request_isdateinterval)
	console.log(forms.isdateinterval)

	switch (inquiryselect_id) {
		case _ASSET_SELECTION_: formformat_asset_select(forms); break;
		case _CLASS_SELECTION_: formformat_class_select(forms); break;
		case _ITEM_SELECTION_: formformat_item_select(forms); break;
		case _PARTNER_SELECTION_: formformat_partner_select(forms); break;
		case _STOCK_SELECTION_: formformat_stock_select(forms); break;
		default: formformat_class_select(forms); break;
	}

	if (forms.isdateinterval) {
		$('.pnl-requestitem_days').show();
		$('.pnl-requestitem_task').show();
	} else {
		$('.pnl-requestitem_days').hide();
		$('.pnl-requestitem_task').hide();
	}

}


export function format_by_dateinterval(isdateinterval) {
	if (isdateinterval) {
		$('.pnl-request_dtend').show();
		$('.pnl-request_dtstart .form_label_col').html('Date Start')
	} else {
		$('.pnl-request_dtend').hide();
		$('.pnl-request_dtstart .form_label_col').html('Date')
	}
}

export function format_by_inquiryreference(isreferenced) {
	if (isreferenced) {
		$('.pnl-request_isunref').hide();
	} else {
		$('.pnl-request_isunref').show();
	}
}

export function format_by_budgetreference(isbudgetted) {
	if (isbudgetted) {
		$('.pnl-requestitem_isunbudget').hide();
	} else {
		$('.pnl-requestitem_isunbudget').show();
	}
}



export function inquiry_changed(selected) {
	var uiHeadForm = $ui.getPages().ITEMS['pnl_edit'].handler.getForm();
	var record = selected;
	var isreferenced = !(selected.inquiry_id=='--NULL--')

	format_by_inquiryreference(isreferenced)
	if (selected.inquiry_id=='--NULL--') {
		uiHeadForm.ITEMS.cbo_inquirytype_id.reset();
		uiHeadForm.ITEMS.cbo_user_dept_id.reset();
		uiHeadForm.ITEMS.cbo_project_id.reset();
		uiHeadForm.ITEMS.cbo_projecttask_id.reset()
		uiHeadForm.ITEMS.cbo_projbudget_id.reset()
		uiHeadForm.ITEMS.cbo_projbudgettask_id.reset()

		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_inquirytype_id, false);
		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_user_dept_id, false);
		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_project_id, false);
		
	} else {
		uiHeadForm.setValue(uiHeadForm.ITEMS.chk_request_isunref, false)

		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_inquirytype_id, record.inquirytype_id, record.inquirytype_name)
		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_user_dept_id, record.dept_id, record.dept_name)
		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_project_id, record.project_id, record.project_name)
		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_inquirytype_id, true);
		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_user_dept_id, true);
		uiHeadForm.setDisable(uiHeadForm.ITEMS.cbo_project_id, true);

		// yang bisa diganti
		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_projecttask_id, record.projecttask_id, record.projecttask_name)
		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
		uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name)
		


	}
	inquirytype_changed(record);

}


export function inquirytype_changed(selected) {
	var uiHeadForm = $ui.getPages().ITEMS['pnl_edit'].handler.getForm();
	var record = selected;
	var isdateinterval = (record.inquirymodel_isdateinterval=="1")

	format_by_dateinterval(isdateinterval)
	format_by_selection(record.inquiryselect_id);

	uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);
	uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_process_dept_id, record.process_dept_id, record.process_dept_name);
	uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_inquiryselect_id, record.inquiryselect_id, record.inquiryselect_name);
	uiHeadForm.setValue(uiHeadForm.ITEMS.cbo_doc_id, record.request_doc_id, record.request_doc_name);
	uiHeadForm.setValue(uiHeadForm.ITEMS.txt_orderout_doc_id, record.orderout_doc_id);
	uiHeadForm.setValue(uiHeadForm.ITEMS.chk_request_isdateinterval, isdateinterval);
 
}


export function trxmodel_changed(selected) {
	var uiHeadForm = $ui.getPages().ITEMS['pnl_edit'].handler.getForm();
	var record = selected;
	var isdateinterval = (record.trxmodel_isdateinterval=="1")

	format_by_dateinterval(isdateinterval)

	uiHeadForm.setValue(uiHeadForm.ITEMS.chk_request_isdateinterval, isdateinterval);
	uiHeadForm.setValue(uiHeadForm.ITEMS.txt_orderout_doc_id, record.orderout_doc_id);
}


export function projbudgetdet_changed(selected) {
	var uiItemForm = $ui.getPages().ITEMS['pnl_edititemsform'].handler.getForm();
	var record = selected;
	var isbudgetted = record.projbudgetdet_id=='--NULL--' ? false : true;

	format_by_budgetreference(isbudgetted)
	uiItemForm.setValue(uiItemForm.ITEMS.txt_accbudget_id, record.accbudget_id);
	uiItemForm.setValue(uiItemForm.ITEMS.txt_coa_id, record.coa_id);
}

 
function formformat_asset_select(forms) {
	$('.pnl-itemasset_id').show();
	$('.pnl-itemstock_id').hide();
	$('.pnl-item_id').hide();
	$('.pnl-partner_id').hide();
	$('.pnl-requestitem_qty').hide();
	forms.header.setDisable(forms.items.ITEMS.cbo_itemclass_id, true)
}

function formformat_class_select(forms) {
	$('.pnl-itemasset_id').hide();
	$('.pnl-itemstock_id').hide();
	$('.pnl-item_id').hide();
	$('.pnl-partner_id').hide();
	$('.pnl-requestitem_qty').show();
	forms.header.setDisable(forms.items.ITEMS.cbo_itemclass_id, false)
}

function formformat_item_select(forms) {
	$('.pnl-itemasset_id').hide();
	$('.pnl-itemstock_id').hide();
	$('.pnl-item_id').show();
	$('.pnl-partner_id').hide();
	$('.pnl-requestitem_qty').show();
	forms.header.setDisable(forms.items.ITEMS.cbo_itemclass_id, true)
}

function formformat_partner_select(forms) {
	$('.pnl-itemasset_id').hide();
	$('.pnl-itemstock_id').hide();
	$('.pnl-item_id').hide();
	$('.pnl-partner_id').show();
	$('.pnl-requestitem_qty').hide();
	forms.header.setDisable(forms.items.ITEMS.cbo_itemclass_id, false)
}

function formformat_stock_select(forms) {
	$('.pnl-itemasset_id').hide();
	$('.pnl-itemstock_id').show();
	$('.pnl-item_id').hide();
	$('.pnl-partner_id').hide();
	$('.pnl-requestitem_qty').show();
	forms.header.setDisable(forms.items.ITEMS.cbo_itemclass_id, true)
}
