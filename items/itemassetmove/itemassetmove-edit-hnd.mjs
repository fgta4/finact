let editor, form, obj, opt;


const comp_inquiryref_id = $('.cbo_inquiry_id');
const comp_itemassetmovetype_id = $('.cbo_itemassetmovetype_id');

const comp_itemassetmove_dtexpected = $('.dt_itemassetmove_dtexpected');
const comp_itemassetmove_dtend = $('.dt_itemassetmove_dtend');


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	obj.chk_itemassetmove_isunreferenced.checkbox({ onChange: (checked) => { chk_itemassetmove_isunreferenced_check(checked) }});
	obj.chk_itemassetmove_isdateinterval.checkbox({ onChange: (checked) => { chk_itemassetmove_isdateinterval_changed(checked) }});
	obj.chk_itemassetmove_isemployee.checkbox({ onChange: (checked) => { chk_itemassetmove_isemployee_changed(checked) }});
	obj.chk_itemassetmove_isdept.checkbox({ onChange: (checked) => { chk_itemassetmove_isdept_changed(checked) }});
	obj.chk_itemassetmove_issite.checkbox({ onChange: (checked) => { chk_itemassetmove_issite_changed(checked) }});
	obj.chk_itemassetmove_isroom.checkbox({ onChange: (checked) => { chk_itemassetmove_isroom_changed(checked) }});

	
}


export function cbo_inquiry_id_selected(value, display, record, args) {

	//console.log(record);
	form.setValue(obj.cbo_itemassetmovemodel_id, record.itemassetmovemodel_id, record.itemassetmovemodel_name);
	form.setValue(obj.cbo_itemassetmovetype_id, '0', '-- PILIH --')
}

export function cbo_itemassetmovemodel_id_selected(value, display, record, args) {

	form.setValue(obj.cbo_itemassetmovetype_id, '0', '-- PILIH --')
}

export function cbo_itemassetmovetype_id_selected(value, display, record, args) {

	form.setValue(obj.chk_itemassetmove_isdateinterval, record.itemassetmovetype_isdateinterval);

	form.setValue(obj.chk_itemassetmove_isdept, record.itemassetmovetype_isdept);
	form.setValue(obj.chk_itemassetmove_isemployee, record.itemassetmovetype_isemployee);
	form.setValue(obj.chk_itemassetmove_issite, record.itemassetmovetype_issite);
	form.setValue(obj.chk_itemassetmove_isroom, record.itemassetmovetype_isroom);


	//chk_itemassetmove_isdateinterval_changed(record.itemassetmovetype_isemployee=='1' ? true : false);
}

export function cbo_itemassetmovetype_id_dataloading(criteria) {

	criteria.itemassetmovemodel_id = form.getValue(obj.cbo_itemassetmovemodel_id) //obj.cbo_itemassetmovemodel_id.combo('getValue')
}

export function form_dataopened(result, options) {

	//console.log(result.record);
	chk_itemassetmove_isdateinterval_changed(result.record.itemassetmove_isdateinterval=='1' ? true : false);

	chk_itemassetmove_isunreferenced_check(result.record.itemassetmove_isunreferenced=='1' ? true : false);

	chk_itemassetmove_isdept_changed(result.record.itemassetmove_isdept=='1' ? true : false);
	chk_itemassetmove_isemployee_changed(result.record.itemassetmove_isemployee=='1' ? true : false);
	chk_itemassetmove_issite_changed(result.record.itemassetmove_issite=='1' ? true : false);
	chk_itemassetmove_isroom_changed(result.record.itemassetmove_isroom=='1' ? true : false);
}



function chk_itemassetmove_isunreferenced_check(checked) {
	if (checked) {
		// id tidak wajib diisi
		comp_inquiryref_id.addClass('hidden');
		//comp_itemassetmovetype_id.removeClass('hidden')

		obj.cbo_inquiry_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});

		obj.cbo_itemassetmovemodel_id.revalidate({
			required: true, invalidMessage:  'Asset Move Model harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_itemassetmovemodel_id']", disabled: false
		});	

	} else {
		// id wajib diisi
		comp_inquiryref_id.removeClass('hidden');
		//comp_itemassetmovetype_id.addClass('hidden')

		obj.cbo_inquiry_id.revalidate({
			required: true, invalidMessage:  'Inquiry harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_inquiry_id']",
		});	

		obj.cbo_itemassetmovemodel_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null, disabled: true
		});

	}
}


function chk_itemassetmove_isdateinterval_changed(checked) {
	if (checked) {
		
		$('.dt_itemassetmove_dtstart .form_label_col').html('Date Start');
		
		comp_itemassetmove_dtexpected.removeClass('hidden')
		comp_itemassetmove_dtend.removeClass('hidden')
	} else {
	
		$('.dt_itemassetmove_dtstart .form_label_col').html('Date');

		comp_itemassetmove_dtexpected.addClass('hidden')
		comp_itemassetmove_dtend.addClass('hidden')
	}
}

function chk_itemassetmove_isdept_changed(checked) {
	if (checked) {
		// id tidak wajib diisi
		obj.cbo_to_dept_id.revalidate({
			required: true, invalidMessage:  'Dept harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_to_dept_id']",
		});	

	} else {
		// id wajib diisi
		obj.cbo_to_dept_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});

	}
}

function chk_itemassetmove_isemployee_changed(checked) {
	if (checked) {
		// id tidak wajib diisi
		obj.cbo_to_empl_id.revalidate({
			required: true, invalidMessage:  'Employee harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_to_empl_id']",
		});	

	} else {
		// id wajib diisi
		obj.cbo_to_empl_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});

	}
}

function chk_itemassetmove_issite_changed(checked) {
	if (checked) {
		// id tidak wajib diisi
		obj.cbo_to_site_id.revalidate({
			required: true, invalidMessage:  'Site harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_to_site_id']",
		});	

	} else {
		// id wajib diisi
		obj.cbo_to_site_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});

	}
}

function chk_itemassetmove_isroom_changed(checked) {
	if (checked) {
		// id tidak wajib diisi
		obj.cbo_to_room_id.revalidate({
			required: true, invalidMessage:  'Room harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edit-cbo_to_room_id']",
		});	

	} else {
		// id wajib diisi
		obj.cbo_to_room_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});

	}
}

