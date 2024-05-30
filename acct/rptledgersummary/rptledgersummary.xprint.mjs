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

	var saldoawal_idr = parseFloat(row.saldoawal_idr).toLocaleString('en-US');
	var debet_idr = parseFloat(row.debet_idr).toLocaleString('en-US');
	var kredit_idr = parseFloat(row.kredit_idr).toLocaleString('en-US');
	var saldoakhir_idr = parseFloat(row.saldoakhir_idr).toLocaleString('en-US');
	
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

	tr.innerHTML = `
		<td class="${cellclass} col-no"><div class="cell-row-breaker">${row.cache_rownumber}</div></td>
		<td class="${cellclass} col-hidden" ${excelstyle_weight}>${row.coa_rowtype}</td>
		<td class="${cellclass} col-coa" ${excelstyle_weight}>${row.coa_id}</td>
		<td class="${cellclass} col-hidden" ${excelstyle_weight}>${row.coa_parent}</td>
		<td class="${cellclass} col-hidden" ${excelstyle_weight}>${row.coa_level}</td>
		<td class="${cellclass} col-descr" style="${style_descr}" ${excelstyle_weight} ${excelstyle_indent}>${row.coa_name}</td>
		<td class="${cellclass} col-amount" style="${style_amount}">${saldoawal_idr}</td>
		<td class="${cellclass} col-amount" style="${style_amount}">${debet_idr}</td>
		<td class="${cellclass} col-amount" style="${style_amount}">${kredit_idr}</td>
		<td class="${cellclass} col-amount" style="${style_amount}">${saldoakhir_idr}</td>
	`;
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



