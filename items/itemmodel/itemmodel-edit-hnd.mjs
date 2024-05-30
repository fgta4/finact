let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	obj.chk_itemmodel_ismultidept.checkbox({ onChange: (checked) => { chk_itemmodel_ismultidept_changed(checked) }});
	obj.chk_depremodel_isautocalc.checkbox({ onChange: (checked) => { chk_depremodel_isautocalc_changed(checked) }});
	
}

export function form_newdata(data, options) {
	var header_data = form.getHeaderData();
	options.OnNewData = () => {
		chk_itemmodel_ismultidept_changed(header_data.itemmodel_ismultidept);
	}
}

export function form_dataopened(result, options) {
	chk_itemmodel_ismultidept_changed();
	chk_depremodel_isautocalc_changed();
}

export function cbo_itemmanage_id_selected(value, display, record, args) {
	form.setValue(obj.chk_itemmanage_isasset, form.toBool(record.itemmanage_isasset));
}

export function cbo_depremodel_id_selected(value, display, record, args) {
	form.setValue(obj.chk_depremodel_isautocalc, form.toBool(record.depremodel_isautocalc));
}

export function cbo_dept_id_dataloading(criteria, options) {
	criteria.dept_isitemowner = 1;

}

function chk_itemmodel_ismultidept_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_itemmodel_ismultidept);
	}

	if (checked) {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_dept_id.revalidate(form.optionalValidation());
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_dept_id, promptOptional.value, promptOptional.text);
		}
	} else {
		var promptMandatory = form.getDefaultPrompt(true)
		obj.cbo_dept_id.revalidate(form.mandatoryValidation(obj.cbo_dept_id.name, 'Dept harus diisi'));
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_dept_id, promptMandatory.value, promptMandatory.text);
		}
	}
}	

function chk_depremodel_isautocalc_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_depremodel_isautocalc);
	}

	var formrows = document.querySelectorAll('.deprevaluepanel');
	for (var el of formrows) {
		if (checked) {
		} else {
			el.classList.add('deprevaluepanel-hidden');

		}
	}
}