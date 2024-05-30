let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

	
export function form_newdata(data, options) {
	options.OnNewData = () => {
		var owner_dept_id = global.setup.owner_dept_id;
		var owner_dept_name = global.setup.owner_dept_name;
		form.setValue(obj.cbo_owner_dept_id, owner_dept_id, owner_dept_name);
	}	
}
	