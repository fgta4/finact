let editor;
let form;
let obj;
let opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;
}

export function cbo_jurnaltype_id_selected(value, display, record, args) {
	form_format_baseon_jurnaltype(value)
}


function form_format_baseon_jurnaltype(jurnaltype_id) {
	switch (jurnaltype_id) {
		case 'OR-BILLOUT':
			form.setDisable(obj.cbo_temprecv_id, true);
			form.setDisable(obj.cbo_billout_id, false);
			break;

		default:
			form.setDisable(obj.cbo_temprecv_id, false);
			form.setDisable(obj.cbo_billout_id, false);
	}
}



export function form_value_recalculate() {
	if (form.isEventSuspended()) {
		return;
	}
	
	console.log('test');
}