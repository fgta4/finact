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
		form.setValue(obj.txt_budgetdeptyear_year, global.now().substring(6,10));
	}	
}


export function form_updatebuttonstate(record) {
	var button_commit_on = false;	
	var button_uncommit_on = false;	
	
	if (record.budgetdeptyear_isapprove==1) {
		// semua tombol mati
		form.lock(true);
	} else {
		if (record.budgetdeptyear_iscommit==1) {
			button_commit_on = false;
			button_uncommit_on = true;
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
		}
	}

	btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');		
	btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');	

}	


export function cbo_coabudget_id_dataloading(criteria, options) {
	criteria.owner_dept_id = form.get
}