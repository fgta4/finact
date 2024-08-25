let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	setTimeout(() => {
		var cbo_itemgroup_id_options = obj.cbo_itemgroup_id.getOptions();
		var cbo_itemgroup_id_grid = obj.cbo_itemgroup_id.getGridList();
		cbo_itemgroup_id_options.OnRowRender = (tr) => {
			cbo_itemgroup_id_rowrender(cbo_itemgroup_id_grid, tr)
		}

		console.log('ready')
	}, 300)

	
}

	

function cbo_itemgroup_id_rowrender(grd_list, tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='itemgroup_name') {
			var indent = 10 + ((record.itemgroup_level-1) * 15);
			$(td).css("padding-left", `${indent}px`);
			if (record.itemgroup_isparent=='1') {
				$(td).css('font-weight', 'bold');
			}
		}
	})

}