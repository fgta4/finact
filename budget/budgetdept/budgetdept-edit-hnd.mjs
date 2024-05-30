let editor, form, obj, opt;

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

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