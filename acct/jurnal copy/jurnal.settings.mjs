export function setup(opt) {
	opt.settings = {
		buttons: {
			edit: {el:$('#pnl_edit-btn_edit'), visible: false},
			save: {el:$('#pnl_edit-btn_save'), visible: false},
			delete: {el:$('#pnl_edit-btn_delete'), visible: false},
			new: {el:$('#pnl_list-btn_new'), visible: false},
			
			commit: {el:$('#pnl_edit-btn_commit'), visible: false},
			uncommit: {el:$('#pnl_edit-btn_uncommit'), visible: false},
			post: {el:$('#pnl_edit-btn_post'), visible: false},
			unpost: {el:$('#pnl_edit-btn_unpost'), visible: false},
			
			link: {el:$('#pnl_editdetilform-btn_link'), visible: false},
			unlink: {el:$('#pnl_editdetilform-btn_unlink'), visible: false},
		}
	}

	var buttons = opt.settings.buttons;
	if (opt.variancename=='entry') {
		buttons.edit.visible = true;
		buttons.save.visible = true;
		buttons.delete.visible = true;
		buttons.new.visible = true;
		buttons.commit.visible = true;
		buttons.uncommit.visible = true;
	} else if (opt.variancename=='posting') {	
		buttons.post.visible = true;
	} else if (opt.variancename=='unposting') {	
		buttons.unpost.visible = true;
	} else if (opt.variancename=='link') {	
		buttons.link.visible = true;
	} else if (opt.variancename=='unlink') {	
		buttons.unlink.visible = true;
	} else {

	}

	for (var btnname in buttons) {
		var btn = buttons[btnname];
		if (btn.visible===false) {
			btn.el.hide();
		}
	}
	
}