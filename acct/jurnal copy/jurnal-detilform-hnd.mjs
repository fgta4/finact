const btn_edit = $('#pnl_editdetilform-btn_edit');
const btn_link = $('#pnl_editdetilform-btn_link');
const btn_unlink = $('#pnl_editdetilform-btn_unlink');

let editor, form, obj, opt;
let caneditdetil = false;


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	obj.txt_jurnaldetil_valfrg.numberbox({ 
		onChange: (oldval, newval) => { txt_jurnaldetil_valfrg_changed(oldval, newval) }
	});
	obj.txt_jurnaldetil_valfrgrate.numberbox({ 
		onChange: (oldval, newval) => { txt_jurnaldetil_valfrgrate_changed(oldval, newval) }
	});


	btn_link.linkbutton({
		onClick: () => { btn_link_click() }
	});

	btn_unlink.linkbutton({
		onClick: () => { btn_unlink_click() }
	});


	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			caneditdetil = false;
		} else {
			caneditdetil = true;
		}
	});

	form.AllowAddRecord = false;
	form.AllowRemoveRecord = false;
	form.AllowEditRecord = false;

	if (opt.variancename=='entry') {
		form.AllowAddRecord = true;
		form.AllowRemoveRecord = true;
		form.AllowEditRecord = true;
	}

}



export function setupTitle(txt_title, header_data, state) {
	txt_title[0].classList.remove('fgta-page-subtitle');
	var title = '';


	if (state=='new') {
		console.log('new');
	}

	title += `
		<div style="font-weight: bold; font-size: 1.2em">${header_data.jurnal_id}</div>
		<div style="font-style: italic; font-size: 1.2em; margin-bottom: 15px">${header_data.jurnal_descr}</div>
	`;

	txt_title.html(title);

}	

export function form_gettingdata(data) {
	data.curr_name = obj.cbo_curr_id.combo('getText');
	data.coa_name = obj.cbo_coa_id.combo('getText');
	data.unit_name = obj.cbo_unit_id.combo('getText');
	data.dept_name = obj.cbo_dept_id.combo('getText');
	data.partner_name = obj.cbo_partner_id.combo('getText');
	data.project_name = obj.cbo_project_id.combo('getText');

	data.unit_name = data.unit_id=='--NULL--'?'-':data.unit_name;
	data.dept_name = data.dept_id=='--NULL--'?'-':data.dept_name;
	data.partner_name = data.partner_id=='--NULL--'?'-':data.partner_name;
	data.project_name = data.project_id=='--NULL--'?'-':data.project_name;

}

export function form_newdata(data, options) {
	var header_data = form.getHeaderData();

	console.log('DETIL NEW');

	data.jurnaldetil_descr = header_data.jurnal_descr;
	data.curr_id = header_data.curr_id;
	data.curr_name = header_data.curr_name;
	data.jurnaldetil_valfrgrate = header_data.jurnal_valfrgrate;

	if (header_data.jurnaltype_ishasdetunit) {
		obj.cbo_unit_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_unit_id', 'Unit harus diisi'));
	} else {
		obj.cbo_unit_id.revalidate(form.optionalValidation());
	}

	if (header_data.jurnaltype_ishasdetdept) {
		obj.cbo_dept_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_dept_id', 'Dept harus diisi'));
	} else {
		obj.cbo_dept_id.revalidate(form.optionalValidation());
	}

	if (header_data.jurnaltype_ishasdetpartner) {
		obj.cbo_partner_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_partner_id', 'Partner harus diisi'));
	} else {
		obj.cbo_partner_id.revalidate(form.optionalValidation());
	}
	options.OnNewData = () => {
		obj.cbo_unit_id.reset();
		obj.cbo_dept_id.reset();
		obj.cbo_partner_id.reset();

		var curr_id = form.getValue(obj.cbo_curr_id);
		cbo_curr_id_changed(curr_id);

	}
}

export function form_dataopening(result, options) {
	var header_data = form.getHeaderData();

	console.log('test');

	var def_unit_name = header_data.jurnaltype_ishasdetunit ? '-- PILIH --' : 'NONE';
	var def_dept_name = header_data.jurnaltype_ishasdetdept ? '-- PILIH --' : 'NONE';
	var def_partner_name = header_data.jurnaltype_ishasdetpartner ? '-- PILIH --' : 'NONE';

	if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name=def_unit_name; }
	if (result.record.dept_id==null) { result.record.dept_id='--NULL--'; result.record.dept_name=def_dept_name; }
	if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name=def_partner_name; }
}

export function form_dataopened(result, options) {

	console.log('DETIL OPENED');
	console.log(result);
	var linkallowed = result.record.linkallowed;
	
	var header_data = form.getHeaderData();
	if (result.record.jurnaldetil_head!=0) {
		btn_edit.linkbutton('disable');
		btn_link.linkbutton('disable');
		btn_unlink.linkbutton('disable');
	} else {
		if (caneditdetil) {
			btn_edit.linkbutton('enable');
		}

		if (header_data.jurnaltype_ishasdetunit) {
			obj.cbo_unit_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_unit_id', 'Unit harus diisi'));
		} else {
			obj.cbo_unit_id.revalidate(form.optionalValidation());
		}

		if (header_data.jurnaltype_ishasdetdept) {
			obj.cbo_dept_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_dept_id', 'Dept harus diisi'));
		} else {
			obj.cbo_dept_id.revalidate(form.optionalValidation());
		}

		if (header_data.jurnaltype_ishasdetpartner) {
			obj.cbo_partner_id.revalidate(form.mandatoryValidation('pnl_editdetilform-cbo_partner_id', 'Partner harus diisi'));
		} else {
			obj.cbo_partner_id.revalidate(form.optionalValidation());
		}

		cbo_curr_id_changed(result.record.curr_id);
		if (result.record.jurnaldetil_id_ref!=null) {
			btn_link.linkbutton('disable');
			btn_unlink.linkbutton('enable');
		} else {
			btn_link.linkbutton('enable');
			btn_unlink.linkbutton('disable');
		}
	}


	// override button link unlink
	if (!linkallowed) {
		btn_link.linkbutton('disable');
		btn_unlink.linkbutton('disable');
	}
}

export function cbo_curr_id_selected(value, display, record, args) {
	var curr_id = record.curr_id;
	var curr_rate = record.curr_rate;
	form.setValue(obj.txt_jurnaldetil_valfrgrate, curr_rate);
	cbo_curr_id_changed(curr_id);
	value_changed();

	if (curr_id != obj.cbo_coa_id.curr_id) {
		obj.cbo_coa_id.reset();
	}
}
	
export function cbo_coa_id_dataloading(criteria, options) {
	options.mode = 'by-jurnaltype';
	
	var header_data = form.getHeaderData();
	var curr_id = obj.cbo_curr_id.combo('getValue');
	var jurnaltype_id = header_data.jurnaltype_id;

	var jurnaltype_col = header_data.jurnaltype_col;



	criteria.coa_isdisabled = 0;
	criteria.curr_id = curr_id;
	criteria.jurnaltype_id = jurnaltype_id;

	// ambil lawan dari header
	if (jurnaltype_col=='D') {
		criteria.jurnaltype_col = 'K';
	} else if (jurnaltype_col=='K') {
		criteria.jurnaltype_col = 'D';
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
	var idr = parseFloat(data.jurnaldetil_validr);
	if (idr==0) {
		options.cancel = true
		$ui.ShowMessage('[WARNING]Value Jurnal belum diisi')
	}
}

export function form_datasaved(result, rowdata, options) {
	var recordtotalvalue = result.recordtotalvalue ?? 0;
	$('.detil_totalvalue').html(recordtotalvalue.toLocaleString('en-US'));
}	

function cbo_curr_id_changed(curr_id) {
	if (curr_id==global.setup.local_curr_id) {
		console.log('local currency');
		form.setDisable(obj.txt_jurnaldetil_valfrgrate, true);
	} else {
		console.log('foreign currency');
		form.setDisable(obj.txt_jurnaldetil_valfrgrate, false);
	}
}

function  txt_jurnaldetil_valfrg_changed(oldval, newval) {
	value_changed();
}

function txt_jurnaldetil_valfrgrate_changed(oldval, newval) {
	value_changed();
}	

function value_changed() {
	var value = form.getValue(obj.txt_jurnaldetil_valfrg);
	var rate = form.getValue(obj.txt_jurnaldetil_valfrgrate);
	var idr = value*rate;
	form.setValue(obj.txt_jurnaldetil_validr, idr);
}


function btn_link_click() {
	var data = form.getData();
	$ui.getPages().show('pnl_editlink', ()=>{
		var args = { data: data, form: form, obj: obj }
		$ui.getPages().ITEMS['pnl_editlink'].handler.setupJurnalTobeLinked(args);
	})
}

function btn_unlink_click() {
	$ui.ShowMessage('[QUESTION]Apakah anda akan link jurnal ?', {
		'Cancel': ()=>{},
		'Ok': () => {
			unlinkjurnal();
		}, 
	})
}

async function unlinkjurnal() {
	var data = form.getData();

	try {
		var apiurl = `${global.modulefullname}/xtion-jurnalunlink`
		var args = {
			id: data.jurnaldetil_id
		}
		var result = await $ui.apicall(apiurl, args)
		if (result.success) {
			form.setValue(obj.txt_jurnaldetil_id_ref, '');
			form.commit();
			btn_unlink.linkbutton('disable');
		} else {
			throw new Error(result.message);
		}
	} catch (err) {
		$ui.ShowMessage('[ERROR]'+err.message);
	}
}