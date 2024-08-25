let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

	


export function cbo_itemgroup_parent_dataloading(criteria, options) {
	criteria.itemgroup_isparent = 1
}

export function cbo_itemgroup_parent_selected(value, display, record, args) {
	form.setValue(obj.cbo_itemmodel_id, record.itemmodel_id, record.itemmodel_name)
}