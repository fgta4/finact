let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}



export function form_newdata(data, options) {
	var cbo_search_site = $('#pnl_list-cbo_search_site');
	var site_id = 	cbo_search_site.combo('getValue');
	var site_name = cbo_search_site.combo('getText');

	data.site_id = site_id
	data.site_name = site_name
}



export function action_completed(action, result) {
	// console.log(result);
	$ui.getPages().ITEMS['pnl_list'].handler.getCustomHandler().updatesaldo(
		result.saldo.awal, result.saldo.mutasi, result.saldo.akhir
	);
}
	
	