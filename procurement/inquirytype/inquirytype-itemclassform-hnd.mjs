let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}


export function cbo_itemclass_id_dataloading(criteria, options) {
	var header_data = form.getHeaderData();
	criteria.itemmanage_id = header_data.itemmanage_id
	criteria.maintainer_dept_id = header_data.related_dept_id;
	if (header_data.owner_dept_id != '--NULL--') {
		criteria.owner_dept_id = header_data.owner_dept_id;
	}
	
}

	
	