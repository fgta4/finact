let editor, form, obj, opt;


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function cbo_itemassetmovemodel_id_selected(value, display, record, args) {

	//console.log(record);
	form.setValue(obj.chk_itemassetmovetype_isdateinterval, record.itemassetmovemodel_isdateinterval);
	form.setValue(obj.chk_itemassetmovetype_isdept, record.itemassetmovemodel_isdept);
	form.setValue(obj.chk_itemassetmovetype_isemployee, record.itemassetmovemodel_isemployee);
	form.setValue(obj.chk_itemassetmovetype_issite, record.itemassetmovemodel_issite);
	form.setValue(obj.chk_itemassetmovetype_isroom, record.itemassetmovemodel_isroom);
}