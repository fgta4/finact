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

	
	