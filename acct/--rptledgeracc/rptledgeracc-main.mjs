var this_page_id;
var this_page_options;

import { fgta4report } from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'
import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'

const cbo_reporttype = $('#pnl_report-cbo_reporttype');
const cbo_filter = $('#pnl_report-cbo_filter');
const lbl_filtercaption = $('#pnl_report-lbl_filtercaption');
const dt_report_date = $('#pnl_report-dt_report_date');
const btn_export = $('#pnl_report-btn_export');
const btn_print = $('#pnl_report-btn_print');
const btn_load = $('#pnl_report-btn_load');
const obj_report = $('#pnl_report-obj_reportiframe');




let last_scrolltop = 0
let rpt = {}

var report_title;
var report_subtitle;
var report_generatedate;
var report_sheetname;
var report_filename;
var report_descr;
var report_properties;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	window.resetState = () => {
		setTimeout(()=>{
			document.body.style.cursor = 'default'
			btn_load.linkbutton('enable');
		}, 2000);
	}

	window.getReportProperties = () => {
		return report_properties;
	}


	rpt = new fgta4report(obj_report, {
		OnReportLoaded: (iframe) => { obj_report_loaded(iframe) },
		OnReportLoadingError: (err) => {  obj_report_loadingerror(err) },
	})

	// assign data loader function
	rpt.prepareData = async (param) => { return await rpt_prepareData(param); }
	rpt.loadReportData = async (param) => { return rpt_loadReportData(param) }




	btn_load.linkbutton('disable');
	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_reporttype: 1,
		},
		onFinished: () => {
			btn_load.linkbutton('enable');
		}
	})

	cbo_reporttype.name = 'pnl_report-cbo_reporttype'	
	cbo_reporttype.comp = new fgta4slideselect(cbo_reporttype, {
		title: 'Pilih Type Report',
		returnpage: this_page_id,
		api: 'fgta/framework/fgoptionlist/list',
		fieldValue: 'optionlist_id',
		fieldValueMap: 'optionlist_id',
		fieldDisplay: 'optionlist_name',
		fields: [
			{ mapping: 'optionlist_name', text: 'Report Type' },
		],
		OnDataLoading: (criteria, options) => {
			console.log('loading...');
			criteria.optionlist_tag = global.setup.optionlist_tag;
			options.sortData = {
				optionlist_order: 'ASC'
			}
		},
		OnDataLoaded: (result, options) => {
			console.log(result);

		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false;
			cbo_reporttype_selected(record);
		},
		OnCreated: () => {
			var record = {
				optionlist_id: global.setup.defaultReportType[0],
				optionlist_name: global.setup.defaultReportType[1],
				optionlist_data: global.setup.defaultReportType[2],
			};
			cbo_reporttype.combo('setValue', global.setup.defaultReportType[0]);
			cbo_reporttype.combo('setText', global.setup.defaultReportType[1]);
			cbo_reporttype_selected(record);

			parallelProcess.setFinished('cbo_reporttype');
		},
	});


	cbo_filter.name = 'pnl_report-cbo_filter'	
	cbo_filter.comp = new fgta4slideselect(cbo_filter, {
		title: '<div id="pnl_report-lbl_filterprompt">Pilih</div>',
		returnpage: this_page_id,
		api: 'ent/general/selector/list',
		fieldValue: 'selector_id',
		fieldValueMap: 'selector_id',
		fieldDisplay: 'selector_text',
		fields: [
			{ mapping: 'selector_text', text: 'Name' },
		],
		OnDataLoading: (criteria, options) => {
			var optiondata = cbo_reporttype.optiondata;
			options.selector = optiondata.filter;
		},
		OnDataLoaded: (result, options) => {
			var optiondata = cbo_reporttype.optiondata;
			if (optiondata.filter==null) {
				$('#pnl_report-lbl_filterprompt').html(`Pilih`);
			} else {
				$('#pnl_report-lbl_filterprompt').html(optiondata.filterprompt);
			}
		},

		OnSelected: (value, display, record, options) => {
			options.flashhighlight = false;
		},

		OnCreated: () => {
			cbo_filter.combo('setValue', '--NULL--');
			cbo_filter.combo('setText', '--PILIH--');

		}

		
	});



	dt_report_date.datebox('setValue', window.global.setup.defaultDate);

	btn_load.linkbutton({ onClick: () => { btn_load_click(); } });
	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });
	btn_export.linkbutton({ onClick: () => { btn_export_click(); } });

	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

}


export function OnSizeRecalculated(width, height) {
	var rpt_container = document.getElementById('pnl_report-rpt_container');
	var report_height = height - rpt_container.offsetTop;
	console.log('h', report_height);
	rpt_container.style.height = `${report_height}px`;
}

function cbo_reporttype_selected(record) {
	var optiondata = JSON.parse(record.optionlist_data);

	console.log(optiondata);

	cbo_reporttype.optiondata = optiondata;
	if (optiondata.filter==null) {
		// pnl_filter.hide();
		lbl_filtercaption.html('Filter');
		cbo_filter.combo('disable');
		cbo_filter.combo('setValue', '--NULL--');
		cbo_filter.combo('setText', 'ALL');
	} else {
		// pnl_filter.show();
		lbl_filtercaption.html(optiondata.filtercaption);
		cbo_filter.combo('enable');
		cbo_filter.combo('setValue', '--NULL--');
		cbo_filter.combo('setText', '--PILIH--');
	}
}


function obj_report_loaded(iframe) {
	if (typeof iframe.contentWindow.onReportLoaded === 'function') {
		iframe.contentWindow.onReportLoaded(()=>{
			console.log('report loaded');
			document.body.style.cursor = 'default'
			rpt.reportloaded();
			btn_load.linkbutton('enable');
			btn_export.linkbutton('enable');
			btn_print.linkbutton('enable');
		})
	}
}

function obj_report_loadingerror(err) {
	console.error(err);
	document.body.style.cursor = 'default'
	btn_load.linkbutton('enable');
	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');

}


function btn_load_click() {
	var dt = dt_report_date.datebox('getValue');
	var reportmodule = window.global.modulefullname + '/rptledgeracc.xprint?renderto=printtemplate.phtml&format=print-format-01-a4-potrait';
	var optiondata = cbo_reporttype.optiondata;


	if (optiondata.filter!=null) {
		var filtervalue = cbo_filter.combo('getValue');
		if (filtervalue=='--NULL--') {
			$ui.ShowMessage('[WARNING]' + optiondata.filtercaption + ' belum dipilih');
			return;
		}
	}

	var args = {
		param: {
			dt: dt,
			filtervalue: cbo_filter.combo('getValue'),
			optiondata: optiondata
		}
	}

	document.body.style.cursor = 'wait'
	btn_load.linkbutton('disable');
	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');

	window.rpt = rpt;
	rpt.load(reportmodule, args);
}

function btn_print_click() {
	rpt.print();
}

function btn_export_click() {
	var wbprops = {
		subject: 'Laporan Keuangan',
		title:  cbo_reporttype.optiondata.rpttitle,
		creator: global.setup.userfullname,
		company:  global.setup.companyname,
		description: report_descr,
		// keywords:  ''
	};
	rpt.export('obj_reporttable', report_filename, report_sheetname, wbprops);
}


async function rpt_prepareData(param) {
	var apiurl = `${global.modulefullname}/xtion-preparedata`
	var args = {
		param: param
	}
	try {
		var result = await $ui.apicall(apiurl, args);
		report_title = result.report_title;
		report_subtitle = result.report_subtitle;
		report_generatedate = result.report_generatedate;
		report_sheetname = result.report_sheetname;
		report_filename = result.report_filename;
		report_descr = result.report_descr;
		report_properties = result.report_properties;
		return result;
	} catch (err) {
		$ui.ShowMessage('[ERROR]'+err.message);
		throw err;
	}
}

async function rpt_loadReportData(param) {
	console.log('LOAD REPORT DATA');

	var apiurl = `${global.modulefullname}/xtion-loadreportdata`
	var args = {
		param: param
	}
	try {
		var result = await $ui.apicall(apiurl, args);
		return result.records;
	} catch (err) {
		$ui.ShowMessage('[ERROR]'+err.message);
		throw err;
	}
}