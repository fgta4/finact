let editor, form, obj, opt;

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_generate = $('#pnl_edit-btn_generate');


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


export function form_updatebuttonstate(record) {
	var button_commit_on = false;	
	var button_uncommit_on = false;	
	var button_generate_on = false;	

	if (record.budgetdeptprop_isgenerate==1) {
		// semua tombol mati
		form.lock(true);
	} else {
		if (record.budgetdeptprop_iscommit==1) {
			button_commit_on = false;
			button_uncommit_on = true;
			button_generate_on = true;
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_generate_on = false;
		}
	}

	btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');		
	btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
	btn_generate.linkbutton(button_generate_on ? 'enable' : 'disable');		
}


export function do_other_action(args) {
	if (args.action==='generate') {
		args.xtion_version = '1.1';
		args.act_url = `${global.modulefullname}/xtion-generate`;
		args.act_msg_quest = `Apakah anda yakin akan generate budget no ${args.id} ?`;
		args.act_msg_result = `budget telah di generate.`;
		args.act_do = (result) => {
			console.log(result);

			obj.chk_budgetdeptprop_isgenerate.checkbox('check');

			form.commit();

			btn_uncommit.linkbutton('disable');
			btn_generate.linkbutton('disable');
		}
	} else {
		args.cancel = true;
	}
}