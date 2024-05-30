let form, obj, opt;

export function init (param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;


	$('#pnl_edit-btn_edit').hide();
	$('#pnl_edit-btn_print').hide();
	$('#pnl_edit-btn_commit').hide();
	$('#pnl_edit-btn_uncommit').hide();
	$('#pnl_edit-btn_approve').hide();
	$('#pnl_edit-btn_decline').hide();
	$('#pnl_edit-btn_delete').hide();
}