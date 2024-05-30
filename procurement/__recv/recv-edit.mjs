var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_post = $('#pnl_edit-btn_post')
			



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_recv_id: $('#pnl_edit-txt_recv_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_orderout_id: $('#pnl_edit-cbo_orderout_id'),
	txt_recv_ref: $('#pnl_edit-txt_recv_ref'),
	txt_recv_descr: $('#pnl_edit-txt_recv_descr'),
	dt_recv_date: $('#pnl_edit-dt_recv_date'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_site_id: $('#pnl_edit-cbo_site_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	cbo_recv_dept_id: $('#pnl_edit-cbo_recv_dept_id'),
	txt_trxmodel_id: $('#pnl_edit-txt_trxmodel_id'),
	txt_inquirymodel_id: $('#pnl_edit-txt_inquirymodel_id'),
	txt_inquiryselect_id: $('#pnl_edit-txt_inquiryselect_id'),
	txt_itemmanage_id: $('#pnl_edit-txt_itemmanage_id'),
	txt_owner_dept_id: $('#pnl_edit-txt_owner_dept_id'),
	txt_request_dept_id: $('#pnl_edit-txt_request_dept_id'),
	txt_orderout_dept_id: $('#pnl_edit-txt_orderout_dept_id'),
	txt_user_dept_id: $('#pnl_edit-txt_user_dept_id'),
	txt_project_id: $('#pnl_edit-txt_project_id'),
	txt_projecttask_id: $('#pnl_edit-txt_projecttask_id'),
	txt_projbudget_id: $('#pnl_edit-txt_projbudget_id'),
	txt_projbudgettask_id: $('#pnl_edit-txt_projbudgettask_id'),
	txt_recv_version: $('#pnl_edit-txt_recv_version'),
	chk_recv_iscommit: $('#pnl_edit-chk_recv_iscommit'),
	txt_recv_commitby: $('#pnl_edit-txt_recv_commitby'),
	txt_recv_commitdate: $('#pnl_edit-txt_recv_commitdate'),
	chk_recv_isrecv: $('#pnl_edit-chk_recv_isrecv'),
	txt_recv_recvby: $('#pnl_edit-txt_recv_recvby'),
	txt_recv_recvdate: $('#pnl_edit-txt_recv_recvdate'),
	chk_recv_ispost: $('#pnl_edit-chk_recv_ispost'),
	txt_recv_postby: $('#pnl_edit-txt_recv_postby'),
	txt_recv_postdate: $('#pnl_edit-txt_recv_postdate'),

	txt_recvitem_totalvalue: $('#pnl_edit-txt_recvitem_totalvalue'),
	txt_curr_id: $('#pnl_edit-txt_curr_id'),
	txt_curr_rate: $('#pnl_edit-txt_curr_rate'),
	txt_recvitem_totalidr: $('#pnl_edit-txt_recvitem_totalidr'),
	txt_ppn_taxtype_id: $('#pnl_edit-txt_ppn_taxtype_id'),
	txt_ppn_value: $('#pnl_edit-txt_ppn_value'),
	chk_ppn_isinclude: $('#pnl_edit-chk_ppn_isinclude'),
	txt_pph_taxtype_id: $('#pnl_edit-txt_pph_taxtype_id'),
	txt_pph_value: $('#pnl_edit-txt_pph_value'),
	chk_pph_isinclude: $('#pnl_edit-chk_pph_isinclude'),
	txt_recvitem_totalvaluenett: $('#pnl_edit-txt_recvitem_totalvaluenett'),
	txt_recvitem_totalvalueppn: $('#pnl_edit-txt_recvitem_totalvalueppn'),
	txt_recvitem_totalvaluepph: $('#pnl_edit-txt_recvitem_totalvaluepph'),
	txt_recvitem_totalidrnett: $('#pnl_edit-txt_recvitem_totalidrnett'),
	txt_recvitem_totalidrppn: $('#pnl_edit-txt_recvitem_totalidrppn'),
	txt_recvitem_totalidrpph: $('#pnl_edit-txt_recvitem_totalidrpph')

}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_recv_id,
		autoid: true,
		logview: 'trn_recv',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	})



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
	btn_post.linkbutton({ onClick: () => { btn_action_click({ action: 'post' }); } });			





	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih unit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({unit_id:'--NULL--', unit_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_orderout_id, {
		title: 'Pilih orderout_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-orderout-outstanding`,
		fieldValue: 'orderout_id',
		fieldValueMap: 'orderout_id',
		fieldDisplay: 'orderout_descr',
		fields: [
			{mapping: 'orderout_id', text: 'orderout_id'},
			{mapping: 'orderout_descr', text: 'orderout_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_site_id, record.site_id, record.site_name)
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
				form.setValue(obj.txt_recv_descr, record.orderout_descr)
				form.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
				form.setValue(obj.cbo_recv_dept_id, record.recv_dept_id, record.recv_dept_id)
				form.setValue(obj.txt_trxmodel_id, record.trxmodel_id)
				form.setValue(obj.txt_inquirymodel_id, record.inquirymodel_id);
				form.setValue(obj.txt_inquiryselect_id, record.inquiryselect_id);
				form.setValue(obj.txt_itemmanage_id, record.itemmanage_id);
				form.setValue(obj.txt_owner_dept_id, record.owner_dept_id);
				form.setValue(obj.txt_request_dept_id, record.request_dept_id);
				form.setValue(obj.txt_orderout_dept_id, record.orderout_dept_id);
				form.setValue(obj.txt_user_dept_id, record.user_dept_id);
				form.setValue(obj.txt_project_id, record.project_id);
				form.setValue(obj.txt_projecttask_id, record.projecttask_id);
				form.setValue(obj.txt_projbudget_id, record.projbudget_id);
				form.setValue(obj.txt_projbudgettask_id, record.projbudgettask_id);	
				

				form.setValue(obj.txt_curr_id, record.curr_id);
				form.setValue(obj.txt_curr_rate, record.curr_rate);
				form.setValue(obj.txt_ppn_taxtype_id, record.ppn_taxtype_id);
				form.setValue(obj.txt_ppn_value, record.ppn_value);
				form.setValue(obj.chk_ppn_isinclude, record.ppn_isinclude=='1'?true:false);
				form.setValue(obj.txt_pph_taxtype_id, record.pph_taxtype_id);
				form.setValue(obj.txt_pph_value, record.pph_value);
				form.setValue(obj.chk_pph_isinclude, record.pph_isinclude=='1'?true:false);



										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/list-get-partner`,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_site_id, {
		title: 'Pilih site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,
		fieldValue: 'site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_recv_dept_id, {
		title: 'Pilih recv_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_recv_dept_id,
		fieldValue: 'recv_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				

	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})

	//button state

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}


export function open(data, rowid, viewmode=true, fn_callback) {

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }
		if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }

		*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}
  		updaterecordstatus(record)

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_orderout_id, record.orderout_id, record.orderout_descr)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_site_id, record.site_id, record.site_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_recv_dept_id, record.recv_dept_id, record.recv_dept_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   



		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)

		// tampilkan form untuk data editor
		fn_callback()
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.recv_date = global.now()
		data.recv_version = 0
		data.recv_iscommit = '0'
		data.recv_isrecv = '0'
		data.recv_ispost = '0'


		data.recvitem_totalvalue = 0;
		data.curr_rate = 1;
		data.recvitem_totalidr = 0;
		
		data.recvitem_totalvaluenett = 0;
		data.recvitem_totalvalueppn = 0;
		data.recvitem_totalvaluepph = 0;
		data.recvitem_totalidrnett = 0;
		data.recvitem_totalidrppn = 0;
		data.recvitem_totalidrpph = 0;
	


		data.unit_id = '--NULL--'
		data.unit_name = 'NONE'
		data.orderout_id = '0'
		data.orderout_descr = '-- PILIH --'
		data.partner_id = '--NULL--'
		data.partner_name = 'NONE'
		data.site_id = '0'
		data.site_name = '-- PILIH --'
		data.empl_id = '0'
		data.empl_name = '-- PILIH --'
		data.recv_dept_id = '0'
		data.recv_dept_name = '-- PILIH --'


		rec_commitby.html('');
		rec_commitdate.html('');
		




		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
			



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editregistergrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.recv_commitby);
		rec_commitdate.html(record.recv_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_post_on = false;	
		var form_lock = false;
		

		if (record.recv_ispost=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_post_on = false;
			form_lock = true;

		} else if (record.recv_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_post_on = true;
			form_lock = true;

		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_post_on = false;
			form_lock = false; 

		} 

		



		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
		// btn_post.linkbutton(button_post_on ? 'enable' : 'disable');		

		form.lock(form_lock);	
			
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'recv_iscommit';
	updategriddata[col_commit] = record.recv_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_recv_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	// options.skipmappingresponse = ['unit_id', 'partner_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)
	/*
	form.setValue(obj.cbo_unit_id, result.dataresponse.unit_name!=='--NULL--' ? result.dataresponse.unit_id : '--NULL--', result.dataresponse.unit_name!=='--NULL--'?result.dataresponse.unit_name:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_recv_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/recv.xprint?id=' + id;

	var print_to_new_window = global.setup.print_to_new_window;
	var debug = false;
	var debug = false;
	if (debug || print_to_new_window) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	






async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Receive'
	var txt_version = obj.txt_recv_version;
	var chk_iscommit = obj.chk_recv_iscommit;
	var chk_ispost = obj.chk_recv_ispost;
	
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		case 'post' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_ispost.checkbox('check');
				form.commit();
			}			

			
	}


	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				if ( err.message.startsWith('[ERROR]')) {
					$ui.ShowMessage(err.message);	
				} else {
					$ui.ShowMessage('[WARNING]' + err.message);	
				}

			} else {
				updaterecordstatus(result.dataresponse);
				args.act_do(result);
				updatebuttonstate(result.dataresponse);
				updategridstate(result.dataresponse);
				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	
	
	