let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

	
export function cbo_dept_id_dataloading(criteria, options) {
	criteria.dept_isitemowner = 1;
}	