let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function do_other_action(args) {
	switch (args.action) {
		case 'addnext' :
			args.param = {},
			args.act_url = `${global.modulefullname}/xtion-addnext`;
			args.act_msg_quest = `Apakah anda yakin akanmembuat periode berikutnya ?`;
			args.act_msg_result = `Periode telah berhasil dibuat.`;
			args.act_do = (result) => {
				form.commit();
			}
			break;

		case 'close':
			args.param = {},
			args.act_url = `${global.modulefullname}/xtion-close`;
			args.act_msg_quest = `Apakah anda yakin close periode ini ?`;
			args.act_msg_result = `Periode telah berhasil diclose.`;
			args.act_do = (result) => {
				form.setValue(obj.chk_periodemo_isclosed, true);
				form.commit();
			}			
			break;

		case 'reopen':
			args.param = {},
			args.act_url = `${global.modulefullname}/xtion-reopen`;
			args.act_msg_quest = `Apakah anda yakin reopen periode ini ?`;
			args.act_msg_result = `Periode telah berhasil direopen.`;
			args.act_do = (result) => {
				form.setValue(obj.chk_periodemo_isclosed, false);
				form.commit();
			}			
			break;
	}
}	

export function form_updategridstate(updategriddata, record) {
	updategriddata.periodemo_isclosed = record.periodemo_isclosed;
}
	