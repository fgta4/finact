let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	obj.chk_inquirytype_isdateinterval.checkbox({ onChange: (checked) => { chk_inquirytype_isdateinterval_changed(checked) }});
	obj.chk_inquirytype_isallowunbudget.checkbox({ onChange: (checked) => { chk_inquirytype_isallowunbudget_changed(checked) }});
	obj.chk_inquirytype_isallowadvance.checkbox({ onChange: (checked) => { chk_inquirytype_isallowadvance_changed(checked) }});
	obj.chk_inquirytype_isemplaspartner.checkbox({ onChange: (checked) => { chk_inquirytype_isemplaspartner_changed(checked) }});

	obj.chk_inquiry_isunbudgetted.checkbox({ onChange: (checked) => { chk_inquiry_isunbudgetted_changed(checked) }});
	obj.chk_inquiry_isadvance.checkbox({ onChange: (checked) => { chk_inquiry_isadvance_changed(checked) }});

	obj.chk_paymtype_isviabank.checkbox({ onChange: (checked) => { chk_paymtype_isviabank_changed(checked) }});

}


export function form_newdata(data, options) {

	data.empl_id = global.setup.empl_id;
	data.empl_name = global.setup.empl_name;
	data.partner_id = '0';
	data.partner_name = '-- PILIH --';

	if (global.setup.partner_id!=null && global.setup.partner_id!="") {
		data.partner_id = global.setup.partner_id;
		data.partner_name = global.setup.partner_name;
	} 



	console.log(global.setup);

	options.OnNewData = () => {
		formrow_step1_setVisible(false);
		obj.cbo_empl_id.partner = {
			id: data.partner_id,
			name: data.partner_name
		}
	}

	formrow_step1_setVisible(false);
	
}

export function form_dataopening(result, options) {
	if (result.record.paymtype_id==null) { result.record.paymtype_id='--NULL--'; result.record.paymtype_name='NONE'; }
	if (result.record.projbudget_id==null) { result.record.projbudget_id='--NULL--'; result.record.projbudget_name='NONE'; }
}

export function form_dataopened(result, options) {
	formrow_step1_setVisible(true);
	obj.cbo_empl_id.partner = {
		id: result.partner_id,
		name: result.partner_name
	}

	chk_inquirytype_isdateinterval_changed();
	chk_inquirytype_isallowunbudget_changed();
	chk_inquirytype_isallowadvance_changed();
	chk_inquirytype_isemplaspartner_changed();

	chk_inquiry_isunbudgetted_changed();
	chk_inquiry_isadvance_changed();
	chk_paymtype_isviabank_changed();

	formrow_step1_setVisible(true);
}


export function cbo_inquirytype_id_selected(value, display, record, args) {
	console.log(record);

	form.setValue(obj.cbo_request_dept_id, record.related_dept_id, record.related_dept_name);


	// setting
	form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
	form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
	form.setValue(obj.chk_inquiryselect_isshowitemasset, toBool(record.inquiryselect_isshowitemasset));
	form.setValue(obj.chk_inquiryselect_isshowitem, toBool(record.inquiryselect_isshowitem));
	form.setValue(obj.chk_inquiryselect_isshowitemstock, toBool(record.inquiryselect_isshowitemstock));
	form.setValue(obj.chk_inquiryselect_isshowpartner, toBool(record.inquiryselect_isshowpartner));
	form.setValue(obj.chk_inquiryselect_isshowitemclass, toBool(record.inquiryselect_isshowitemclass));
	form.setValue(obj.chk_inquiryselect_isitemclassdisabled, toBool(record.inquiryselect_isitemclassdisabled));
	form.setValue(obj.chk_inquirytype_isuseqty, toBool(record.inquirytype_isuseqty));
	form.setValue(obj.chk_inquirytype_isusedays, toBool(record.inquirytype_isusedays));
	form.setValue(obj.chk_inquirytype_isusetask, toBool(record.inquirytype_isusetask));
	form.setValue(obj.chk_inquirytype_isdateinterval, toBool(record.inquirytype_isdateinterval));
	form.setValue(obj.chk_inquirytype_istoberequest, toBool(record.inquirytype_istoberequest));
	form.setValue(obj.chk_inquirytype_isautorequest, toBool(record.inquirytype_isautorequest));
	form.setValue(obj.chk_inquirytype_isautoorder, toBool(record.inquirytype_isautoorder));
	form.setValue(obj.chk_inquirytype_ismovinginit, toBool(record.inquirytype_ismovinginit));
	form.setValue(obj.chk_inquirytype_islimitqty, toBool(record.inquirytype_islimitqty));
	form.setValue(obj.chk_inquirytype_islimitdays, toBool(record.inquirytype_islimitdays));
	form.setValue(obj.chk_inquirytype_islimittask, toBool(record.inquirytype_islimittask));
	form.setValue(obj.chk_inquirytype_islimitvalue, toBool(record.inquirytype_islimitvalue));
	form.setValue(obj.chk_inquirytype_isallowoverbudget, toBool(record.inquirytype_isallowoverbudget));
	form.setValue(obj.chk_inquirytype_isallowunbudget, toBool(record.inquirytype_isallowunbudget));
	form.setValue(obj.chk_inquirytype_isallowitemunbudget, toBool(record.inquirytype_isallowitemunbudget));
	form.setValue(obj.chk_inquirytype_isallowadvance, toBool(record.inquirytype_isallowadvance));
	form.setValue(obj.chk_inquirytype_isemplaspartner, toBool(record.inquirytype_isemplaspartner));
	form.setValue(obj.txt_inquirytype_maxadvancevalue, record.inquirytype_maxadvancevalue);

	chk_inquirytype_isdateinterval_changed();
	chk_inquirytype_isallowunbudget_changed();
	chk_inquirytype_isallowadvance_changed();
	chk_inquirytype_isemplaspartner_changed();


	chk_inquiry_isunbudgetted_changed();
	chk_inquiry_isadvance_changed();
	chk_paymtype_isviabank_changed();


	formrow_step1_setVisible(true);
}





export function cbo_empl_id_dataloading(criteria, options) {
	criteria.enabled = 1;
	criteria.getpartnerid = 1;
}



export function cbo_empl_id_selected(value, display, record, args) {

	console.log('cbo_empl_id_selected');
	obj.cbo_empl_id.partner = {
		id: record.partner_id,
		name: record.partner_name
	}

	var isemplaspartner = form.getValue(obj.chk_inquirytype_isemplaspartner);
	if (isemplaspartner) {
		set_partner_by_empl();
	}
}


export function cbo_partner_id_dataloading(criteria, options) {
	criteria.enabled = 1;
}

export function cbo_partner_id_selected(value, display, record, args) {
	form.setValue(obj.txt_partner_name, record.partner_name);
	
}

export function cbo_paymtype_id_selected(value, display, record, args) {
	form.setValue(obj.chk_paymtype_isviabank , !toBool(record.paymtype_iscash) );
}


export function cbo_partnerbank_id_dataloading(criteria, options) {
	var partner_id = form.getValue(obj.cbo_partner_id);
	criteria.id = partner_id;
}


export function cbo_partnerbank_id_selected(value, display, record, args) {
	form.setValue(obj.txt_paymto_bankacc, record.partnerbank_accnum);
	form.setValue(obj.txt_paymto_bankaccname, record.partnerbank_accname);
	form.setValue(obj.txt_paymto_bankname, record.bank_name);
}

export function cbo_partnercontact_id_dataloading(criteria, options) {
	var partner_id = form.getValue(obj.cbo_partner_id);
	criteria.id = partner_id;
}

export function cbo_partnercontact_id_selected(value, display, record, args) {
	console.log(record);
	form.setValue(obj.txt_partnercontact_upname, record.partnercontact_name);
	form.setValue(obj.txt_partnercontact_position, record.partnercontact_position);
	form.setValue(obj.txt_partnercontact_upphone, record.partnercontact_mobilephone);
	form.setValue(obj.txt_partnercontact_email, record.partnercontact_email);
	form.setValue(obj.txt_deliver_upname, record.partnercontact_name);
	form.setValue(obj.txt_deliver_uptelp, record.partnercontact_mobilephone);
}

export function cbo_site_id_dataloading(criteria, options) {
	criteria.getcityid = true;
}

export function cbo_site_id_selected(value, display, record, args) {
	form.setValue(obj.txt_deliver_siteaddress, record.site_address);
	form.setValue(obj.txt_deliver_city, record.city_name);
}


function chk_inquirytype_isdateinterval_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquirytype_isdateinterval);
	}

	if (checked) {
		$('#pnl_edit-inquiry_dtstart .form_label_col').html('Date Start');
		$('#pnl_edit-inquiry_dtend').show();
	} else {
		$('#pnl_edit-inquiry_dtstart .form_label_col').html('Date');
		$('#pnl_edit-inquiry_dtend').hide();
	}
}

function chk_inquirytype_isallowunbudget_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquirytype_isallowunbudget);
	}

	if (checked) {
		// inquiry boleh unbudget
		form.setDisable(obj.chk_inquiry_isunbudgetted, false)
	} else {
		// tidak boleh unbudget
		form.setDisable(obj.chk_inquiry_isunbudgetted, true)
		form.setValue(obj.chk_inquiry_isunbudgetted, false);
	}
}

function chk_inquirytype_isallowadvance_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquirytype_isallowadvance);
	}

	if (checked) {
		// inquiry boleh request advance
		form.setDisable(obj.chk_inquiry_isadvance, false)
	} else {
		// tidak boleh over request advance
		form.setDisable(obj.chk_inquiry_isadvance, true)
		form.setValue(obj.chk_inquiry_isadvance, false);
	}
}

function chk_inquirytype_isemplaspartner_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquirytype_isemplaspartner);
	}	

	if (checked) {
		form.setDisable(obj.cbo_partner_id, true);
	} else {
		form.setDisable(obj.cbo_partner_id, false);
	}
}


function chk_inquiry_isunbudgetted_changed(checked) {
	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)


	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquiry_isunbudgetted);
	}

	if (checked) {
		// unbudget: tidak harus isi projbudget
		form.setDisable(obj.cbo_projbudget_id, true);
		form.setDisable(obj.cbo_projbudgettask_id, true);


		obj.cbo_projbudget_id.revalidate(optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_projbudget_id, promptOptional.value, promptOptional.text);
		};

		formrow_budgetpanel_setVisible(false);
	} else {
		// budgetted: wajib mengisi projbudget
		form.setDisable(obj.cbo_projbudget_id, false);
		form.setDisable(obj.cbo_projbudgettask_id, false);

		obj.cbo_projbudget_id.revalidate(mandatoryValidation('pnl_edit-cbo_projbudget_id', 'Budget harus diisi'));
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_projbudget_id, promptMandatory.value, promptMandatory.text);
		}

		formrow_budgetpanel_setVisible(true);
	}

}

function chk_inquiry_isadvance_changed(checked) {
	console.log('chk_inquiry_isadvance_changed');

	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)

	if (checked===undefined) {
		checked = form.getValue(obj.chk_inquiry_isadvance);
	}


	var curr_empl_id = form.getValue(obj.cbo_empl_id);
	var curr_partner_id = form.getValue(obj.cbo_partner_id);
	var curr_paymtype_id = form.getValue(obj.cbo_paymtype_id);

	if (checked) {
		// responsible employee: mandatory
		// partner: mandatory
		// tipe pembayaran: mandatory
		// partnercontact: mandatory
		obj.cbo_empl_id.revalidate(mandatoryValidation('pnl_edit-cbo_empl_id', 'Responsible employee harus diisi'));
		obj.cbo_partner_id.revalidate(mandatoryValidation('pnl_edit-cbo_partner_id', 'Partner harus diisi'));
		obj.cbo_paymtype_id.revalidate(mandatoryValidation('pnl_edit-cbo_paymtype_id', 'Tipe Pembayaran harus diisi'));
		obj.cbo_partnercontact_id.revalidate(mandatoryValidation('pnl_edit-cbo_partnercontact_id', 'Contact harus diisi'));
		if (!form.isEventSuspended()) {
			if (curr_empl_id==promptOptional.value) {
				form.setValue(obj.cbo_empl_id, promptMandatory.value, promptMandatory.text);
			}

			if (curr_partner_id==promptOptional.value) {
				form.setValue(obj.cbo_partner_id, promptMandatory.value, promptMandatory.text);
			}

			if (curr_paymtype_id==promptOptional.value) {
				form.setValue(obj.cbo_paymtype_id, promptMandatory.value, promptMandatory.text);
			}
		}

		var isemplaspartner = form.getValue(obj.chk_inquirytype_isemplaspartner);
		if (isemplaspartner) {
			set_partner_by_empl();
		}

		// munculkan paymentpanel
		formrow_paymentpanel_setVisible(true);

	} else {
		// partner: optional
		// responsible employee: optional
		// tipe pembayaran: optional
		// partnercontact: optional
		obj.cbo_empl_id.revalidate(optionalValidation());
		obj.cbo_partner_id.revalidate(optionalValidation());
		obj.cbo_paymtype_id.revalidate(optionalValidation());
		obj.cbo_partnercontact_id.revalidate(optionalValidation());
		if (!form.isEventSuspended()) {
			if (curr_empl_id==promptMandatory.value) {
				form.setValue(obj.cbo_empl_id, promptOptional.value, promptOptional.text);
			}

			if (curr_partner_id==promptMandatory.value || curr_partner_id=='0' || curr_partner_id==0) {
				form.setValue(obj.cbo_partner_id, promptOptional.value, promptOptional.text);
			} 

			if (curr_paymtype_id==promptMandatory.value  || curr_paymtype_id=='0' || curr_paymtype_id==0) {
				form.setValue(obj.cbo_paymtype_id, promptOptional.value, promptOptional.text);
			}
		}

		// sembunyikan paymentpanel
		formrow_paymentpanel_setVisible(false);
	}
}

function chk_paymtype_isviabank_changed(checked) {
	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)

	if (checked===undefined) {
		checked = form.getValue(obj.chk_paymtype_isviabank);
	}

	if (checked) {
		// cbo_partnerbank_id: mandatory
		form.setDisable(obj.cbo_partnerbank_id, false);
		obj.cbo_partnerbank_id.revalidate(mandatoryValidation('pnl_edit-cbo_partnerbank_id', 'Account bank harus diisi'));
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_partnerbank_id, promptMandatory.value, promptMandatory.text);
		}

		formrow_bankpanel_setVisible(true);
	} else {
		// cbo_partnerbank_id: optional
		form.setDisable(obj.cbo_partnerbank_id, true);
		obj.cbo_partnerbank_id.revalidate(optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_partnerbank_id, promptOptional.value, promptOptional.text);
			form.setValue(obj.txt_paymto_bankacc, "");
			form.setValue(obj.txt_paymto_bankaccname, "");
			form.setValue(obj.txt_paymto_bankname, "");
		};

		formrow_bankpanel_setVisible(false);
	}
}


function set_partner_by_empl() {
	if (obj.cbo_empl_id.partner.id!='0' || obj.cbo_empl_id.partner.id!=0 || obj.cbo_empl_id.partner.id!='' ) {
		form.setValue(obj.cbo_partner_id, obj.cbo_empl_id.partner.id, obj.cbo_empl_id.partner.name);
	}
}


function formrow_step1_setVisible(visible) {
	var formrows = document.querySelectorAll('.head-step2');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('head-step2-hidden');
		} else {
			el.classList.add('head-step2-hidden');
		}
		
	}

	if (visible) {
		form.setDisable(obj.cbo_inquirytype_id, true);
	} else {
		form.setDisable(obj.cbo_inquirytype_id, false);
	}
}

function formrow_paymentpanel_setVisible(visible) {
	var formrows = document.querySelectorAll('.paymentpanel');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('paymentpanel-hidden');
		} else {
			el.classList.add('paymentpanel-hidden');
		}
	}		
}

function formrow_bankpanel_setVisible(visible) {
	var formrows = document.querySelectorAll('.bankpanel');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('bankpanel-hidden');
		} else {
			el.classList.add('bankpanel-hidden');
		}
	}	
}

function formrow_budgetpanel_setVisible(visible) {
	var formrows = document.querySelectorAll('.budgetpanel');
	for (var el of formrows) {
		if (visible) {
			el.classList.remove('budgetpanel-hidden');
		} else {
			el.classList.add('budgetpanel-hidden');
		}
	}	
}

function toBool(value) {
	return value==1 ? true : false;
}
	
function optionalValidation() {
	return {
		required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
		validType: null,
	}
}	

function mandatoryValidation(elid, invalidmessage) {
	return {
		required: true, invalidMessage:  invalidmessage, prompt: form.getDefaultPrompt(true).text,
		validType: `requiredcombo['${elid}']`,
	}
}