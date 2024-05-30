let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function cbo_coareportcol_id_dataloading(criteria, options) {
	var coareport_id = form.getValue(obj.cbo_coareport_id);
	criteria.coareport_id = coareport_id;
}	

export function cbo_coareportcol_id_selected(value, display, record, args) {
	console.log(record);

	form.setValue(obj.txt_coareport_col, record.coareport_col);
	form.setValue(obj.txt_coa_dk, record.coa_dk);
}