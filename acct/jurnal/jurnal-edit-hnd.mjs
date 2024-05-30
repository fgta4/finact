let editor, form, obj, opt;

const btn_commit = $('#pnl_edit-btn_commit');
const btn_uncommit = $('#pnl_edit-btn_uncommit');
const btn_post = $('#pnl_edit-btn_post');
const btn_unpost = $('#pnl_edit-btn_unpost');


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	obj.txt_jurnal_valfrg.numberbox({ onChange: (oldval, newval) => { txt_jurnal_valfrg_changed(oldval, newval) }});
	obj.txt_jurnal_valfrgrate.numberbox({ onChange: (oldval, newval) => { txt_jurnal_valfrgrate_changed(oldval, newval) }});

	obj.chk_jurnaltype_ishasduedate.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasduedate_changed(checked) }});
	obj.chk_jurnaltype_ishasheadvalue.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheadvalue_changed(checked) }});
	obj.chk_jurnaltype_ishasheadaccount.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheadaccount_changed(checked) }});
	
	obj.chk_jurnaltype_ishasheadunit.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheadunit_changed(checked) }});
	obj.chk_jurnaltype_ishasheaddept.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheaddept_changed(checked) }});
	obj.chk_jurnaltype_ishasheadpartner.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasheadpartner_changed(checked) }});

	obj.chk_jurnaltype_ishasdetunit.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasdetunit_changed(checked) }});
	obj.chk_jurnaltype_ishasdetdept.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasdetdept_changed(checked) }});
	obj.chk_jurnaltype_ishasdetpartner.checkbox({ onChange: (checked) => { chk_jurnaltype_ishasdetpartner_changed(checked) }});



	$('.pnl_edit-valuepanel').hide(); // sembunyikan foreign rate karna default IDR
}

export function form_getHeaderData(header_data) {
	var curr_name = obj.cbo_curr_id.combo('getText');
	var coa_name = obj.cbo_coa_id.combo('getText');
	var unit_name = obj.cbo_unit_id.combo('getText');
	var dept_name = obj.cbo_dept_id.combo('getText');
	var partner_name = obj.cbo_partner_id.combo('getText');

	header_data.curr_name = curr_name;
	header_data.coa_name = coa_name;
	header_data.unit_name = unit_name;
	header_data.dept_name = dept_name;
	header_data.partner_name = partner_name;

}

export function form_newdata(data, options) {

	if (global.setup.variancedata.jurnalsource!=null) {
		data.jurnalsource_id = global.setup.variancedata.jurnalsource.id;
		data.jurnalsource_name = global.setup.variancedata.jurnalsource.text;
	}

	form.setDisable(obj.cbo_jurnaltype_id, false);

	data.curr_id = global.setup.local_curr_id;
	data.curr_name = global.setup.local_curr_id;
	data.jurnal_valfrgrate = 1;

	options.OnNewData = () => {
		chk_jurnaltype_ishasduedate_changed();
		chk_jurnaltype_ishasheadvalue_changed();
		chk_jurnaltype_ishasheadaccount_changed();
		chk_jurnaltype_ishasheadunit_changed();
		chk_jurnaltype_ishasheaddept_changed();
		chk_jurnaltype_ishasheadpartner_changed();

		var curr_id = form.getValue(obj.cbo_curr_id);
		cbo_curr_id_changed(curr_id);

		form_updatebuttonstate(data);
	}
}

export function form_dataopening(result, options) {
	if (result.record.coa_id==null) { result.record.coa_id='--NULL--'; result.record.coa_name='NONE'; }
	if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }
	if (result.record.dept_id==null) { result.record.dept_id='--NULL--'; result.record.dept_name='NONE'; }
	if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
}

export function form_dataopened(result, options) {
	chk_jurnaltype_ishasduedate_changed();
	chk_jurnaltype_ishasheadvalue_changed();
	chk_jurnaltype_ishasheadaccount_changed();
	chk_jurnaltype_ishasheadunit_changed();
	chk_jurnaltype_ishasheaddept_changed();
	chk_jurnaltype_ishasheadpartner_changed();

	form.setDisable(obj.cbo_jurnaltype_id, true);

	var curr_id = form.getValue(obj.cbo_curr_id);
	cbo_curr_id_changed(curr_id);

	// nilai total dari detil
	$('.detil_totalvalue').html(result.record.jurnaldetil_validr.toLocaleString('en-US'));
}	

export function form_datasaved(result, rowdata, options) {
	form.setDisable(obj.cbo_jurnalsource_id, true);
	form.setDisable(obj.cbo_jurnaltype_id, true);
}

export function form_updatebuttonstate(record) {
	console.log('update button state');
	// console.log(record);

	if (record.jurnal_isclose=='1') {
		btn_commit.linkbutton('disable');
		btn_uncommit.linkbutton('disable');
		btn_post.linkbutton('disable');
		btn_unpost.linkbutton('disable');
	} else if (record.jurnal_ispost=='1') {
		btn_commit.linkbutton('disable');
		btn_uncommit.linkbutton('disable');
		btn_post.linkbutton('disable');
		btn_unpost.linkbutton('enable');
	} else if (record.jurnal_iscommit=='1') {
		btn_commit.linkbutton('disable');
		btn_uncommit.linkbutton('enable');
		btn_post.linkbutton('enable');
		btn_unpost.linkbutton('disable');
	} else {
		btn_commit.linkbutton('enable');
		btn_uncommit.linkbutton('disable');
		btn_post.linkbutton('disable');
		btn_unpost.linkbutton('disable');
	}

}



export function cbo_jurnaltype_id_dataloading(criteria, options) {
	options.mode = 'by-jurnalsource';
	
	var jurnalsource_id = obj.cbo_jurnalsource_id.combobox('getValue');
	criteria.jurnalsource_id = jurnalsource_id;

	options.sortData = {
		jurnaltype_name: 'ASC'
	}
}	

export function cbo_jurnaltype_id_selected(value, display, record, args) {
	form.setValue(obj.txt_jurnaltype_col, record.jurnaltype_col);
	form.setValue(obj.chk_jurnaltype_ishasduedate, form.toBool(record.jurnaltype_ishasduedate ));	
	form.setValue(obj.chk_jurnaltype_ishasheadvalue, form.toBool(record.jurnaltype_ishasheadvalue));	
	form.setValue(obj.chk_jurnaltype_ishasheadaccount, form.toBool(record.jurnaltype_ishasheadaccount));	
	form.setValue(obj.chk_jurnaltype_ishasheadunit, form.toBool(record.jurnaltype_ishasheadunit ));
	form.setValue(obj.chk_jurnaltype_ishasheaddept, form.toBool(record.jurnaltype_ishasheaddept ));
	form.setValue(obj.chk_jurnaltype_ishasheadpartner, form.toBool(record.jurnaltype_ishasheadpartner ));
	form.setValue(obj.chk_jurnaltype_ishasdetunit, form.toBool(record.jurnaltype_ishasdetunit ));
	form.setValue(obj.chk_jurnaltype_ishasdetdept, form.toBool(record.jurnaltype_ishasdetdept ));
	form.setValue(obj.chk_jurnaltype_ishasdetpartner, form.toBool(record.jurnaltype_ishasdetpartner ));

	chk_jurnaltype_ishasduedate_changed();
	chk_jurnaltype_ishasheadvalue_changed();
	chk_jurnaltype_ishasheadaccount_changed();
	chk_jurnaltype_ishasheadunit_changed();
	chk_jurnaltype_ishasheaddept_changed();
	chk_jurnaltype_ishasheadpartner_changed();

}

export function cbo_periodemo_id_dataloading(criteria, options) {
	criteria.periodemo_isclosed = 0;
	options.sortData = {
		periodemo_id: 'DESC'
	}
}


export function cbo_curr_id_selected(value, display, record, args) {
	var curr_id = record.curr_id;
	var curr_rate = record.curr_rate;
	form.setValue(obj.txt_jurnal_valfrgrate, curr_rate);
	cbo_curr_id_changed(curr_id);
	value_changed();

	var ishasheadaccount = form.getValue(obj.chk_jurnaltype_ishasheadaccount);
	if (ishasheadaccount) {
		if (curr_id != obj.cbo_coa_id.curr_id) {
			obj.cbo_coa_id.reset();
		}
	}
}

export function cbo_coa_id_dataloading(criteria, options) {
	options.mode = 'by-jurnaltype';
	
	var curr_id = obj.cbo_curr_id.combo('getValue');
	var jurnaltype_id = obj.cbo_jurnaltype_id.combo('getValue');
	var jurnaltype_col = form.getValue(obj.txt_jurnaltype_col);

	criteria.coa_isdisabled = 0;
	criteria.curr_id = curr_id;
	criteria.jurnaltype_id = jurnaltype_id;
	criteria.jurnaltype_col = jurnaltype_col;

	options.sortData = {
		coa_id: 'ASC'
	}
}

export function cbo_coa_id_selected(value, display, record, args) {
	obj.cbo_coa_id.curr_id = record.curr_id;
}

export function cbo_unit_id_dataloading(criteria, options) {
	criteria.unit_isdisabled = 0;
	options.sortData = {
		unit_name: 'ASC'
	}
}

export function cbo_dept_id_dataloading(criteria, options) {
	criteria.dept_isdisabled = 0;
	options.sortData = {
		dept_name: 'ASC'
	}
}

export function cbo_partner_id_dataloading(criteria, options) {
	criteria.partner_isdisabled = 0;
	options.sortData = {
		partner_name: 'ASC'
	}
}

export function form_datasaving(data, options) {
	//var header_data = form.getHeaderData();
	console.log('saving check');
	if (data.jurnaltype_ishasheadvalue) {
		var idr = parseFloat(data.jurnal_validr);
		if (idr<=0) {
			options.cancel = true
			$ui.ShowMessage('[WARNING]Value Jurnal belum diisi')
		}
	}
}

export function do_other_action(args) {
	switch (args.action) {
		case 'post' :
			args.xtion_version = '1.1';
			args.act_url = `${global.modulefullname}/xtion-post`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Posting</b> jurnal no ${args.id} ?`;
			args.act_msg_result = `jurnal no ${args.id} telah di posting.`;
			args.act_do = (result) => {
				//obj.chk_ispost.checkbox('check');
				form.commit();
			}
			break;

		case 'unpost' :
			args.xtion_version = '1.1';
			args.act_url = `${global.modulefullname}/xtion-unpost`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Posting</b> jurnal no ${args.id} ?`;
			args.act_msg_result = `jurnal no ${args.id} telah di un-posting.`;
			args.act_do = (result) => {
				//obj.chk_ispost.checkbox('check');
				form.commit();
			}
			break;
	}
}

export function form_updategridstate(updategriddata, record) {
	//var updategriddata = {}
	updategriddata['jurnal_ispost'] = record.jurnal_ispost;	
	updategriddata['jurnal_isclose'] = record.jurnal_isclose;	
	//$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
}


export function form_printing(args) {
	// PV-MAN
	console.log(args);

	var module = window.global.modulefullname;
	var renderto = 'formtemplate-standard.phtml';
	var format = 'format-01-a4-potrait';
	var printform = 'jurnalpv';


	if (args.id.substring(0, 2)=='PV') {
		args.reportmodule = `${module}/${printform}.xprint?renderto=${renderto}&format=${format}`
	}
}



function cbo_curr_id_changed(curr_id) {
	if (curr_id==global.setup.local_curr_id) {
		console.log('local currency');
		form.setDisable(obj.txt_jurnal_valfrgrate, true);
	} else {
		console.log('foreign currency');
		form.setDisable(obj.txt_jurnal_valfrgrate, false);
	}
}
	

function  txt_jurnal_valfrg_changed(oldval, newval) {
	value_changed();
}

function txt_jurnal_valfrgrate_changed(oldval, newval) {
	value_changed();
}

function value_changed() {
	var value = form.getValue(obj.txt_jurnal_valfrg);
	var rate = form.getValue(obj.txt_jurnal_valfrgrate);
	var idr = value*rate;
	form.setValue(obj.txt_jurnal_validr, idr);
}



function chk_jurnaltype_ishasheadvalue_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheadvalue);
	}
	if (checked) {
		$('.pnl_edit-valuepanel').show();
	} else {
		$('.pnl_edit-valuepanel').hide();
	}
}

function chk_jurnaltype_ishasduedate_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasduedate);
	}

	if (checked) {
		$('.pnl_edit-duedatepanel').show();
	} else {
		$('.pnl_edit-duedatepanel').hide();
	}
}

function chk_jurnaltype_ishasheadaccount_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheadaccount);
	}

	if (checked) {
		$('.pnl_edit-subspanel').show();
		// subs mandatory
		obj.cbo_coa_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_coa_id', 'COA harus diisi'));
		obj.cbo_unit_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_unit_id', 'Unit harus diisi'));
		obj.cbo_dept_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_dept_id', 'Dept harus diisi'));
	} else {
		console.log('ok');
		$('.pnl_edit-subspanel').hide();
		// subs optional
		obj.cbo_coa_id.revalidate(form.optionalValidation());
		obj.cbo_unit_id.revalidate(form.optionalValidation());
		obj.cbo_dept_id.revalidate(form.optionalValidation());
	}

}


function chk_jurnaltype_ishasheadunit_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheadunit);
	}

	if (checked) {
		obj.cbo_unit_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_unit_id', 'Unit harus diisi'));
	} else {
		obj.cbo_unit_id.revalidate(form.optionalValidation());
	}

}

function  chk_jurnaltype_ishasheaddept_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheaddept);
	}

	if (checked) {
		obj.cbo_dept_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_dept_id', 'Dept harus diisi'));
	} else {
		obj.cbo_dept_id.revalidate(form.optionalValidation());
	}
}


function  chk_jurnaltype_ishasheadpartner_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_jurnaltype_ishasheadpartner);
	}

	if (checked) {
		obj.cbo_partner_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_partner_id', 'Partner harus diisi'));
	} else {
		obj.cbo_partner_id.revalidate(form.optionalValidation());
	}
}



function chk_jurnaltype_ishasdetunit_changed(checked) {

}

function chk_jurnaltype_ishasdetdept_changed(checked) {

}

function chk_jurnaltype_ishasdetpartner_changed(checked) {

}


