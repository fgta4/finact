let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;	

	
	obj.chk_inquirytype_isallowunbudget.checkbox({ 
		onChange: (checked) => { 
			chk_inquirytype_isallowunbudget_changed(checked) 
		}
	});

}



export function cbo_inquirymodel_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);		
	form.setValue(obj.chk_inquirytype_isdateinterval, record.inquirymodel_isdateinterval=='1'?true:false);
	form.setValue(obj.chk_inquirytype_isqtybreakdown, record.inquirymodel_isqtybreakdown=='1'?true:false);
	form.setValue(obj.chk_inquirytype_ispartnerheader, record.inquirymodel_ispartnerheader=='1'?true:false);
}


export function cbo_inquiryselect_id_selected(value, display, record, args) {
	form.setValue(obj.chk_inquiryselect_isshowitemasset, record.inquiryselect_isshowitemasset=='1'?true:false);
	form.setValue(obj.chk_inquiryselect_isshowitem, record.inquiryselect_isshowitem=='1'?true:false);
	form.setValue(obj.chk_inquiryselect_isshowitemstock, record.inquiryselect_isshowitemstock=='1'?true:false);
	form.setValue(obj.chk_inquiryselect_isshowpartner, record.inquiryselect_isshowpartner=='1'?true:false);
	form.setValue(obj.chk_inquiryselect_isshowitemclass, record.inquiryselect_isshowitemclass=='1'?true:false);
	form.setValue(obj.chk_inquiryselect_isitemclassdisabled, record.inquiryselect_isitemclassdisabled=='1'?true:false);
}



function chk_inquirytype_isallowunbudget_changed(checked) {
	if (checked) {
		form.setDisable(obj.chk_inquirytype_isallowitemunbudget, true);
		form.setValue(obj.chk_inquirytype_isallowitemunbudget, true);
	} else {
		form.setDisable(obj.chk_inquirytype_isallowitemunbudget, false);
	}
}
