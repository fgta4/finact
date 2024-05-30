export async function init(opt) {
	var rpt = new XPrintReport({
		elements: {
			Status: document.getElementById('obj_reporttable_loadingmessage'),
			ReportHeader: document.getElementById('obj_report_header'),
			Table: document.getElementById('obj_reporttable'),
			TableHeader: document.getElementById('obj_reporttable_header'),
			ReportFooter: document.getElementById('obj_report_footer'),
		},
		onGenerate: async (rpt, param) => {
			return await report_generate(rpt, param)
		}
	});
	rpt.CreateMeasure('report-page-measurement');
	rpt.InitializeReport();	

	await rpt.generate(window.global.setup.param);
	if (typeof (window.report_loaded) === 'function') {
		window.report_loaded();
	}
}


async function report_prepare(param) {
	// exekusi API untuk prepare report, masukkan ke table cache, hasilnya adalah id cache, dengan urutan yg final
	if (parent.window.rpt!==undefined) {
		if (typeof parent.window.rpt.prepareData === 'function') {
			var result = await parent.window.rpt.prepareData(param);
			return {
				cacheid: result.cacheid,
				totalrows: result.totalrows,
				recordpagingsize: result.recordpagingsize,
				properties: result.report_properties
			};
		}
	}
}

async function report_getdata(cacheid, offset, limit, totalrows) {
	if (parent.window.rpt!=undefined) {
		if (typeof parent.window.rpt.loadReportData === 'function') {
			var param = {cacheid: cacheid, limit: limit, offset: offset}
			var data = await parent.window.rpt.loadReportData(param)
			return data;
		}
	}
}


function report_format_row(rpt, row, cellclass) {
	// untuk format export ke excel, cek
	// https://github.com/linways/table-to-excel

	var tbody = rpt.options.elements.Table.CurrentTBody;
	var tr = document.createElement('tr');

	var outstanding_idr = parseFloat(row.outstanding_idr).toLocaleString('en-US');
	var due_000_idr = parseFloat(row.due_000_idr).toLocaleString('en-US');
	var due_030_idr = parseFloat(row.due_030_idr).toLocaleString('en-US');
	var due_060_idr = parseFloat(row.due_060_idr).toLocaleString('en-US');
	var due_090_idr = parseFloat(row.due_090_idr).toLocaleString('en-US');
	var due_120_idr = parseFloat(row.due_120_idr).toLocaleString('en-US');
	var due_999_idr = parseFloat(row.due_999_idr).toLocaleString('en-US');


	var excelstyle_weight='';
	var excelstyle_indent='';
	var style_descr ='';
	var style_amount = '';
	if (row.coa_isbold=='1') {
		style_descr += 'font-weight: bold;'
		style_amount += 'font-weight: bold;'
		excelstyle_weight += 'data-f-bold="true"';
	}

	if (row.coa_level>0) {
		var padding = row.coa_level * 2;
		style_descr += `padding-left: ${padding}mm`;
		excelstyle_indent+=`data-a-indent="${row.coa_level}"`;
	}

	var style_row_pad = '';
	var style_row_par = '';
	var style_row_coa = '';
	var style_row_det = '';
	
	// report-row-pad-top
	if (rpt.properties.sp=='det') {
		style_row_par = "report-row-bold";
		style_row_det = "report-row-italic";
	} else if (rpt.properties.sp=='coa') {
		style_row_par = "report-row-bold";
	}

	if (row.block==3) {
		tr.innerHTML = `
			<td class="col-def col-no"><div class="cell-row-breaker">${row.cache_rownumber}</div></td>
			<td class="${style_row_det} col-def col-hidden">${row.block}</td>
			<td class="${style_row_det} col-def col-jurnalid">${row.jurnal_id}</td>
			<td class="${style_row_det} col-def col-date">${row.jurnal_date}</td>
			<td class="${style_row_det} col-def col-due">${row.jurnal_due}</td>
			<td class="${style_row_det} col-def col-descr">${row.jurnaldetil_descr}</td>
			<td class="${style_row_det} col-def col-curr">${row.curr_id}</td>
			<td class="${style_row_det} col-def col-amount">${outstanding_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_000_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_030_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_060_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_090_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_120_idr}</td>
			<td class="${style_row_det} col-def col-amount">${due_999_idr}</td>
		`;
	} else if (row.block==2) {
		tr.innerHTML = `
			<td class="col-def col-no"><div class="cell-row-breaker">${row.cache_rownumber}</div></td>
			<td class="${style_row_coa} col-def col-hidden">${row.block}</td>
			<td class="${style_row_coa} col-def col-coa" colspan="5">${row.coa_name} [${row.coa_id}]</td>
			<td class="${style_row_coa} col-def col-amount">${outstanding_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_000_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_030_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_060_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_090_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_120_idr}</td>
			<td class="${style_row_coa} col-def col-amount">${due_999_idr}</td>
		`;
	} else {

		if (rpt.properties.sp=='det' || rpt.properties.sp=='coa') {
			style_row_pad = 'report-row-pad-top';
		}
		tr.innerHTML = `
			<td class="${style_row_pad} col-def col-no"><div class="cell-row-breaker">${row.cache_rownumber}</div></td>
			<td class="${style_row_pad} ${style_row_par} col-def col-hidden">${row.block}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-partner" colspan="5">${row.partner_name}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${outstanding_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_000_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_030_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_060_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_090_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_120_idr}</td>
			<td class="${style_row_pad} ${style_row_par} col-def col-amount">${due_999_idr}</td>
		`;
	}


	tbody.appendChild(tr);
	return tr;
}


async function report_generate(rpt, param) {
	try {
		console.log('prepare & generate report');
		var reportinfo = await report_prepare(param);
		var recordpagingcount = Math.ceil(reportinfo.totalrows/reportinfo.recordpagingsize);
	
		console.log('loading report data');
		rpt.properties = reportinfo.properties;
		rpt.options.elements.Table.CurrentTBody = document.getElementById('obj_reporttable_body');
		for (var i=0; i<recordpagingcount; i++) {
			var offset = i*reportinfo.recordpagingsize;
	
			var rowtoload_start = offset + 1;
			var rowtoload_end = offset+reportinfo.recordpagingsize;
			rowtoload_end = rowtoload_end > reportinfo.totalrows ? reportinfo.totalrows : rowtoload_end;
			
			rpt.status(`loading rows ${rowtoload_start}-${rowtoload_end} of ${reportinfo.totalrows}`);
			var reportrows = await report_getdata(reportinfo.cacheid, offset, reportinfo.recordpagingsize, reportinfo.totalrows);
			var r = 0;
			for (var row of reportrows) {
				r++;
				var alternatestyle = r%2==0 ? 'cell-row-even' : 'cell-row-odd'; 
				let tr = report_format_row(rpt, row, `cell-default ${alternatestyle}`);
				report_row_claimspace(rpt, tr, `row-${r}`);
			}
		}
	
		// TOTAL
		//let tr = report_format_rowtotal(rpt, {}, 'cell-footer');
		//report_row_claimspace(rpt, tr, `total`);
	
	
		// Report Footer
		var footer = document.getElementById('obj_report_footer');
		footer.classList.remove('report-footer-initial');
		rpt.ClaimSpace(footer, 'footer');
	
		console.log('finalize report');
		rpt.status() // completed
		rpt.finalize();
	} catch (err) {
		var lm = document.getElementById('obj_reporttable_loadingmessage');
		lm.innerHTML = 'Report Error<br>' + err.message;
		document.body.style.cursor = 'default';
		parent.window.resetState();
		throw err;
	}
}

function report_row_claimspace(rpt, tr, descr) {
	var table = rpt.options.elements.Table;
	var tbody = rpt.options.elements.Table.CurrentTBody;
	var claiminfo = rpt.ClaimSpace(tr, descr);
	if (claiminfo.forcebreakbefore) {
		rpt.options.elements.Table.CurrentTBody = document.createElement('tbody');
		tbody = rpt.options.elements.Table.CurrentTBody;
		tbody.classList.add('row-force-pagebreak');
		tbody.appendChild(tr);
		table.appendChild(tbody);
	}
	return tbody;
}



