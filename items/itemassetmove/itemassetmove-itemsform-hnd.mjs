let editor, form, obj, opt;


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	
}

export function cbo_itemasset_id_selected(value, display, record, args) {

	console.log(form);
	//form.setValue(obj.cbo_item_id, record.item_id, record.item_name);
	form.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name);
	//form.setValue(obj.cbo_itemassetmovetype_id, '0', '-- PILIH --')
}
