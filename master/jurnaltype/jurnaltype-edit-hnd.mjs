let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	obj.chk_jurnaltype_ishasheadaccount.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheadaccount_changed(checked) }});
}

export function form_newdata(data, options) {
	options.OnNewData = () => {
		chk_jurnaltype_ishasheadaccount_changed();
	}
}

export function form_dataopened(result, options) {
	chk_jurnaltype_ishasheadaccount_changed();
}	
	

function chk_jurnaltype_ishasheadaccount_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheadaccount);
	}

	if (checked) {
		form.setDisable(obj.chk_jurnaltype_ishasheadpartner, false);
	} else {
		form.setDisable(obj.chk_jurnaltype_ishasheadpartner, true);
		form.setValue(obj.chk_jurnaltype_ishasheadpartner, false);	
	}
}