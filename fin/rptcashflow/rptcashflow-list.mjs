var this_page_id;
var this_page_options;

import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'


const dt_report_date = $('#pnl_list-dt_report_date');
const cbo_report_type = $('#pnl_list-cbo_report_type');
const cbo_dept_id = $('#pnl_list-cbo_dept_id');
const cbo_project_id = $('#pnl_list-cbo_project_id');
const cbo_partner_id = $('#pnl_list-cbo_partner_id');

const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')

const PILIH = '-- PILIH --';

let last_scrolltop = 0
let rpt = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	rpt = new fgta4report(obj_report, {
		OnReportLoaded: () => { /* obj_report_loaded() */ }
	})
	

	btn_load.linkbutton({ onClick: () => { btn_load_click(); } });
	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });
	btn_export.linkbutton({ onClick: () => { btn_export_click(); } });

	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');
	

	dt_report_date.datebox('setValue', global.now());
	cbo_report_type.combobox({onChange: (newValue,oldValue)=>{
		if (newValue!=oldValue) {
			cbo_report_type_changed(newValue);
		}
	}})
	cbo_report_type_changed('summary');



	cbo_dept_id.name = 'pnl_list-cbo_dept_id'	
	new fgta4slideselect(cbo_dept_id, {
		title: 'Filter',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_name',
		fieldDisplay: 'dept_name',
		fields: [
			{ mapping: 'dept_id', text: 'Id' },
			{ mapping: 'dept_name', text: 'Name' },
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ dept_id: PILIH, dept_name: PILIH });
		},
		OnSelected: (value, display, record, options) => {
			
			cbo_dept_id.value = value;
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_dept_id.combo('setValue', PILIH);
			cbo_dept_id.combo('setText', PILIH);
		}
	});


	cbo_partner_id.name = 'pnl_list-cbo_partner_id'	
	new fgta4slideselect(cbo_partner_id, {
		title: 'Filter',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_name',
		fieldDisplay: 'partner_name',
		fields: [
			{ mapping: 'partner_id', text: 'Id' },
			{ mapping: 'partner_name', text: 'Name' },
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ partner_id: PILIH, partner_name: PILIH });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			cbo_partner_id.value = value;
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_partner_id.combo('setValue', PILIH);
			cbo_partner_id.combo('setText', PILIH);
		}
	});



	cbo_project_id.name = 'pnl_list-cbo_project_id'	
	new fgta4slideselect(cbo_project_id, {
		title: 'Filter',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_name',
		fieldDisplay: 'project_name',
		fields: [
			{ mapping: 'project_id', text: 'Id' },
			{ mapping: 'project_name', text: 'Name' },
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ project_id: PILIH, project_name: PILIH });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			cbo_project_id.value = value;
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_project_id.combo('setValue', PILIH);
			cbo_project_id.combo('setText', PILIH);
		}
	});


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

}

function cbo_report_type_changed(rpttype) {
	switch (rpttype) {
		case 'bydept':
			cbo_dept_id.next().show();
			cbo_partner_id.next().hide();
			cbo_project_id.next().hide();
			break;
			
		case 'bypartner':
			cbo_dept_id.next().hide();
			cbo_partner_id.next().show();
			cbo_project_id.next().hide();
			break;
	
		case 'byproject':
			cbo_dept_id.next().hide();
			cbo_partner_id.next().hide();
			cbo_project_id.next().show();
			break;

		default: // summary
			cbo_dept_id.next().hide();
			cbo_partner_id.next().hide();
			cbo_project_id.next().hide();
	}
}



export function OnSizeRecalculated(width, height) {
	var rpt_container = document.getElementById('rpt_container');
	var report_height = height - rpt_container.offsetTop;
	rpt_container.style.height = `${report_height}px`;
}

function obj_report_loading() {
	console.log('report loading');
	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');
	btn_load.linkbutton('disable');
	btn_load.linkbutton({text:'Wait... '});
	document.body.style.cursor = 'wait';
	
}

function obj_report_loaded() {
	console.log('report loaded');
	btn_export.linkbutton('enable');
	btn_print.linkbutton('enable');
	btn_load.linkbutton('enable');
	btn_load.linkbutton({text:'Load'});
	document.body.style.cursor = 'default';
}


function btn_load_click() {
	var dt = dt_report_date.datebox('getValue');
	var rpttype = cbo_report_type.combobox('getValue');
	window.dispatchEvent(new Event('resize'));


	// btn_load.linkbutton('disable');
	try {
		if (dt=='') {
			throw 'Tanggal belum diisi';
		}


		var irpt = obj_report[0];
		if (typeof irpt.contentWindow.ReportReset === 'function') {
			irpt.contentWindow.ReportReset();
			irpt.contentWindow.document.body.style.cursor = 'wait';
		}

		var MAX_LOAD_WAIT = 600;
		var ci = 0;
		obj_report_loading();
		let loadingcheck = setInterval(()=>{
			ci++;
			if (ci>=MAX_LOAD_WAIT) {
				clearInterval(loadingcheck);
				obj_report_loaded();
			}
			
			// cek apakah sudah selesai loading
			if (typeof irpt.contentWindow.ReportIsLoaded === 'function') {
				var loaded = irpt.contentWindow.ReportIsLoaded();
				console.log(loaded);
				if (loaded===true) {
					clearInterval(loadingcheck);
					obj_report_loaded();
				}
			}
		} , 1000);

		var dept_id = cbo_dept_id.value ;
		var partner_id = cbo_partner_id.value ;
		var project_id = cbo_project_id.value ;
		var param = {
			dt:dt, 
			rpttype: rpttype,
			dept_id: dept_id,
			partner_id: partner_id,
			project_id: project_id
		};

		console.log(param);
		loadReportSummary(param);


	} catch (err) {
		$ui.ShowMessage('[WARNING]' + err);
		return;
	} finally {
	
	}
	
}

function btn_print_click() {
	rpt.print();
}

function btn_export_click() {
	rpt.export('obj_reporttable', 'ReportTable.xlsx', 'TrialBalance');
}


function loadReportSummary(param) {
	console.log(param)
	try {
		switch (param.rpttype) {
			case 'bydept':

				if (param.dept_id==PILIH || param.dept_id==null) {
					throw 'Departemen belum dipilih';
				}
				loadReportSummary_bydept(param);
				break;
				
			case 'bypartner':
				if (param.partner_id==PILIH || param.partner_id==null) {
					throw 'Partner belum dipilih';
				}
				loadReportSummary_bypartner(param);
				break;
			
			case 'byproject':
				if (param.project_id==PILIH || param.project_id==null) {
					throw 'Project belum dipilih';
				}
				loadReportSummary_byproject(param);
				break;

			case 'summarydept':
				loadReportSummary_summarydept(param);
				break;

			case 'summaryproject':
				loadReportSummary_summaryproject(param);
				break;
	

			default: // summary
				loadReportSummary_summary(param);
		}
	} catch (err) {
		throw err;
	}
}


async function loadReportSummary_summary(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.01'  + '?template=format-01-a3';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}

async function loadReportSummary_bydept(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.01'  + '?template=format-01-a4';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}

async function loadReportSummary_bypartner(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.01'  + '?template=format-01-a4';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}


async function loadReportSummary_byproject(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.01'  + '?template=format-01-a4';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}


async function loadReportSummary_summarydept(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.02'  + '?template=format-01-a4-landscape';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}


async function loadReportSummary_summaryproject(param) {
	var reportmodule = window.global.modulefullname + '/rptcashflow.xprint.02'  + '?template=format-01-a4-landscape';
	
	var pageloadparam = {
		param: param
	}; //paramerer pada saat page load php
	
	rpt.load(reportmodule, pageloadparam);
}