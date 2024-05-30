let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	
}

	
export function form_newdata(data, options) {
	var header_data = form.getHeaderData();
	options.OnNewData = () => {
		formrow_itemselect_setup(header_data);
	}
}	



export function form_dataopened(result, options) {
	var header_data = form.getHeaderData();

	formrow_itemselect_setup(header_data);
}


export function cbo_itemstock_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name);
}



function formrow_itemselect_setup(header_data) {
	console.log('formrow_itemselect_setup');
	formrow_showitemasset(header_data.inquiryselect_isshowitemasset);
	formrow_showitem(header_data.inquiryselect_isshowitem);
	formrow_showitemstock(header_data.inquiryselect_isshowitemstock);
	formrow_showpartner(header_data.inquiryselect_isshowpartner);
	formrow_showitemclass(header_data.inquiryselect_isshowitemclass);
	formrow_disableitemclass(header_data.inquiryselect_isitemclassdisabled);
}


function cboitem_set_mandatory(cbo, mandatoryMessage) {
	if (mandatoryMessage===false) {
		var promptOptional = form.getDefaultPrompt(false)
		cbo.revalidate(form.optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(cbo, promptOptional.value, promptOptional.text);
		}
	} else {
		var promptMandatory = form.getDefaultPrompt(true)
		cbo.revalidate(form.mandatoryValidation(cbo.name, mandatoryMessage));
		if (!form.isEventSuspended()) {
			form.setValue(cbo, promptMandatory.value, promptMandatory.text);
		}
	}
}


function formrow_showitemasset(visible) {
	var formrows = document.querySelectorAll('.detilitemassetrow');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('el-hidden');
		} else {
			el.classList.add('el-hidden');
		}
	}
	cboitem_set_mandatory(obj.cbo_itemasset_id, visible?'Item Asset harus diisi':false);
}

function formrow_showitem(visible) {
	var formrows = document.querySelectorAll('.detilitemrow');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('el-hidden');
		} else {
			el.classList.add('el-hidden');
		}
	}
	cboitem_set_mandatory(obj.cbo_item_id, visible?'Item harus diisi':false);
}

function formrow_showitemstock(visible) {
	var formrows = document.querySelectorAll('.detilitemstockrow');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('el-hidden');
		} else {
			el.classList.add('el-hidden');
		}
	}	
	cboitem_set_mandatory(obj.cbo_itemstock_id, visible?'Item Stock harus diisi':false);
}

function formrow_showpartner(visible) {
	var formrows = document.querySelectorAll('.detilpartnerrow');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('el-hidden');
		} else {
			el.classList.add('el-hidden');
		}
	}	
	cboitem_set_mandatory(obj.cbo_partner_id, visible?'Partner harus diisi':false);
}

function formrow_showitemclass(visible) {
	var formrows = document.querySelectorAll('.detilclassrow');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('el-hidden');
		} else {
			el.classList.add('el-hidden');
		}
	}	
	cboitem_set_mandatory(obj.cbo_itemclass_id, visible?'Itemclass harus diisi':false);
}

function formrow_disableitemclass(disabled) {
	if (disabled) {
		form.setDisable(obj.cbo_itemclass_id, true);
	} else {
		form.setDisable(obj.cbo_itemclass_id, false);
	}
}
