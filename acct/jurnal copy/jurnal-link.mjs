var this_page_id;

const tbl_list = $('#pnl_editlink-tbl_list');
const btn_load = $('#pnl_editlink-btn_load');
const btn_link = $('#pnl_editdetilform-btn_link');
const txt_search = $('#pnl_editlink-txt_search');

const ref = {
	jurnal_id: $('#pnl_editlink-jurnal_id'),
	jurnaldetil_id: $('#pnl_editlink-jurnaldetil_id'),
	jurnaldetil_descr: $('#pnl_editlink-jurnaldetil_descr'),
	coa_name: $('#pnl_editlink-coa_name'),
	unit_name: $('#pnl_editlink-unit_name'),
	dept_name: $('#pnl_editlink-dept_name'),
	partner_name: $('#pnl_editlink-partner_name'),
	project_name: $('#pnl_editlink-project_name'),
	jurnal_value: $('#pnl_editlink-jurnal_value')
}


let grd_list = {}

var form;
var obj;

export async function init(opt) {
	this_page_id = opt.id
	

	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})
	grd_list.doLoad = () => {
		btn_load_click();
	}

	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_editdetilform')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}

export function setupJurnalTobeLinked(args) {
	console.log('set jurnal data');
	console.log(args.data);


	form = args.form;
	obj = args.obj;

	var d = args.data;
	ref.jurnal_id.html(d.jurnal_id);
	ref.jurnaldetil_id.html(d.jurnaldetil_id);
	ref.jurnaldetil_descr.html(d.jurnaldetil_descr);
	ref.coa_name.html(`[${d.coa_id}] ${d.coa_name}`);
	ref.unit_name.html(d.unit_name);
	ref.dept_name.html(d.dept_name);
	ref.partner_name.html(d.partner_name);
	ref.project_name.html(d.project_name);

	var jurnaldetil_validr = parseFloat(d.jurnaldetil_validr).toLocaleString('en-US');
	var jurnaldetil_valfrg = parseFloat(d.jurnaldetil_valfrg).toLocaleString('en-US');
	
	if (d.curr_id==global.setup.local_curr_id) {
		ref.jurnal_value.html(parseFloat(d.jurnaldetil_validr).toLocaleString('en-US'));
	} else {
		ref.jurnal_value.html(`IDR ${jurnaldetil_validr}&nbsp;&nbsp;&nbsp;${d.curr_id} ${jurnaldetil_valfrg}`);
	}

}

function grd_list_rowformatting(tr) {}

function grd_list_rowclick(tr, ev) {
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]


	// TODO: cek apakah nilai jari jurnal yang dipilih memenuhi syarat
	// abs nilai yang dipilih harus lebih kecil dari nilai abs jurnal yang akan di link


	$ui.ShowMessage('[QUESTION]Apakah anda akan link jurnal ?', {
		'Cancel': ()=>{},
		'Ok': () => {
			linkjurnal(record);
		}, 
	})

}

function grd_list_cellclick(td, ev) {}
function grd_list_cellrender(td) {}
function grd_list_rowrender(tr) {}

function btn_load_click() {
	grd_list.clear()

	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/xtion-jurnallink-list`
		var search = txt_search.textbox('getText')
		if (search!='') {
			options.criteria['search'] = search
		}

		var jurnaldetil_id = form.getValue(obj.txt_jurnaldetil_id);
		options.criteria['jurnaldetil_id'] = jurnaldetil_id;

	}

	var fn_listloaded = async (result, options) => {
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}

async function linkjurnal(record) {
	console.log('LINK JURNAL');

	try {
		var apiurl = `${global.modulefullname}/xtion-jurnallink`
		var args = {data: {
			jurnaldetil_id: ref.jurnaldetil_id.html(),
			jurnaldetil_id_ref: record.jurnaldetil_id
		}}
		
		var result = await $ui.apicall(apiurl, args)

		if (result.success) {
			form.setValue(obj.txt_jurnaldetil_id_ref, args.data.jurnaldetil_id_ref);
			form.commit();
			$ui.getPages().show('pnl_editdetilform');
			btn_link.linkbutton('disable');
		} else {
			throw new Error(result.message);
		}
	} catch (err) {
		$ui.ShowMessage('[ERROR]'+err.message);
	}
}

