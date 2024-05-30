let	form, obj, opt;


export function init(param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;

	obj.chk_itemmanage_isasset.checkbox({ onChange: (checked) => { chk_itemmanage_isasset_changed(checked) }});
	obj.chk_itemmodel_ishasmainteinerdept.checkbox({ onChange: (checked) => { chk_itemmodel_ishasmainteinerdept_changed(checked) }});
	obj.chk_depremodel_isautocalc.checkbox({ onChange: (checked) => { chk_depremodel_isautocalc_changed(checked) }});
	obj.chk_itemclass_isindependentsetting.checkbox({ onChange: (checked) => { chk_chk_itemclass_isindependentsetting_changed(checked) }});

}


export function form_newdata(data, options) {
	options.OnNewData = () => {
		chk_itemmodel_ishasmainteinerdept_changed();
	}
}



export function form_dataopened(result, options) {
	chk_itemmodel_ishasmainteinerdept_changed();
}


export function cbo_itemmodel_id_selected(value, display, record, args) {
	console.log(record);

	var itemmodel_ismultidept = record.itemmodel_ismultidept;

	// itemclass setting
	form.setValue(obj.chk_itemmodel_isintangible, form.toBool(record.itemmodel_isintangible ));	
	form.setValue(obj.chk_itemmodel_issellable, form.toBool(record.itemmodel_issellable ));	
	form.setValue(obj.chk_itemmodel_isnonitem, form.toBool(record.itemmodel_isnonitem ));	
	form.setValue(obj.chk_itemmodel_ishasmainteinerdept, form.toBool(record.itemmodel_ishasmainteinerdept ));	
	form.setValue(obj.chk_itemmanage_isasset, form.toBool(record.itemmanage_isasset ));	
	form.setValue(obj.chk_depremodel_isautocalc, form.toBool(record.depremodel_isautocalc ));	

	form.setValue(obj.chk_itemmanage_isbyassetowner, form.toBool(record.itemmanage_isbyassetowner ));	
	form.setValue(obj.chk_itemmanage_isbystockowner, form.toBool(record.itemmanage_isbystockowner ));	
	form.setValue(obj.chk_itemmanage_isbynonitemowner, form.toBool(record.itemmanage_isbynonitemowner ));	
	form.setValue(obj.chk_itemmanage_isbypartnerselect, form.toBool(record.itemmanage_isbypartnerselect ));	

	form.setValue(obj.cbo_depremodel_id, record.depremodel_id, record.depremodel_name);
	form.setValue(obj.cbo_itemmanage_id, record.itemmanage_id, record.itemmanage_name);

	if (itemmodel_ismultidept) {
		obj.cbo_owner_dept_id.reset();
		obj.cbo_maintainer_dept_id.reset();
	} else {
		form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name);
		form.setValue(obj.cbo_maintainer_dept_id, record.dept_id, record.dept_name);
	}
	
	chk_itemmodel_ishasmainteinerdept_changed();
}

export function cbo_itemmanage_id_selected(value, display, record, args) {
	form.setValue(obj.chk_itemmanage_isbyassetowner, form.toBool(record.itemmanage_isbyassetowner ));	
	form.setValue(obj.chk_itemmanage_isbystockowner, form.toBool(record.itemmanage_isbystockowner ));	
	form.setValue(obj.chk_itemmanage_isbynonitemowner, form.toBool(record.itemmanage_isbynonitemowner ));	
	form.setValue(obj.chk_itemmanage_isbypartnerselect, form.toBool(record.itemmanage_isbypartnerselect ));	

	chk_itemmodel_ishasmainteinerdept_changed();
}

export function cbo_owner_dept_id_dataloading(criteria, options) {
	// criteria.dept_isitemowner = 1;
	var isbyassetowner_checked = form.getValue(obj.chk_itemmanage_isbyassetowner);
	var isbystockowner_checked = form.getValue(obj.chk_itemmanage_isbystockowner);
	var isbynonitemowner_checked = form.getValue(obj.chk_itemmanage_isbynonitemowner);
	var isbypartnerselect_checked = form.getValue(obj.chk_itemmanage_isbypartnerselect);
	
	if (isbyassetowner_checked) {
		criteria.dept_isassetowner = 1;
	}

	if (isbystockowner_checked) {
		criteria.dept_isstockowner = 1;
	}

	if (isbynonitemowner_checked) {
		criteria.dept_isnonitemowner = 1;
	}

	if (isbypartnerselect_checked) {
		criteria.dept_ispartnerselect = 1;
	}

}

export function cbo_maintainer_dept_id_dataloading(criteria, options) {
	criteria.dept_isitemaintainer = 1;
}

export function form_dataopening(result, options) {
	if (result.record.cbo_maintainer_dept_id==null) { result.record.cbo_maintainer_dept_id='--NULL--'; result.record.cbo_maintainer_dept_name='NONE'; }

	if (result.itemclass_isindependentsetting==1) {
		chk_chk_itemclass_isindependentsetting_changed(true);
	} else {
		chk_chk_itemclass_isindependentsetting_changed(false);
	}
}



function chk_itemmanage_isasset_changed(checked) {

}

function chk_itemmodel_ishasmainteinerdept_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_itemmodel_ishasmainteinerdept);
	}

	if (checked) {
		obj.cbo_maintainer_dept_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_maintainer_dept_id', 'Dept maintainer harus diisi'));
	} else {
		obj.cbo_maintainer_dept_id.revalidate(form.optionalValidation());
	}
}

function  chk_depremodel_isautocalc_changed(checked) {
	
}

function chk_chk_itemclass_isindependentsetting_changed(checked) {
	var disabled = checked ? false : true;
	form.setDisable(obj.chk_itemmodel_isintangible, disabled);
	form.setDisable(obj.chk_itemmodel_issellable, disabled);
	form.setDisable(obj.chk_itemmodel_isnonitem, disabled);
	form.setDisable(obj.chk_itemmodel_ishasmainteinerdept, disabled);
	form.setDisable(obj.chk_itemmanage_isasset, disabled);
	form.setDisable(obj.chk_depremodel_isautocalc, disabled);
}

