
const obj_reporttable_body = $('#obj_reporttable_tbody');
const obj_reporttable_thead_loadingmessage = $('#obj_reporttable_thead_loadingmessage');


export async function init(opt) {
	setTimeout(()=>{
		console.log('init page...');
		if (typeof (global.window_fn_print) === 'function') {
			var param = {
				report_height: '1000'			}
			global.window_fn_print(param);
		}
	}, 500);


	generateReport(global.reportparameter);

	window.ReportIsLoadedStatus = false;
	window.ReportIsLoaded = () => {
		return window.ReportIsLoadedStatus;
	}

	window.ReportReset = () => {
		window.ReportIsLoadedStatus = false;
		document.body.style.cursor = 'wait';
		scrollTo(0, 0);
		obj_reporttable_body.html("");
	}
}



async function generateReport(param) {
	
	var apiurl = `${global.modulefullname}/get-01-labarugi`
	var apiurlcache = `${global.modulefullname}/get-01-labarugi-cache`
	switch (global.reportparameter.rpttype) {
		case 'summarydept':
			apiurl = `${global.modulefullname}/get-05-labarugisummarydept`
			apiurlcache = `${global.modulefullname}/get-05-labarugisummarydept-cache`
			$('#obj_reporttable_colgroup01').html('Dept');
			break;
		
		case 'summaryproject':
			apiurl = `${global.modulefullname}/get-06-labarugisummaryproject`
			apiurlcache = `${global.modulefullname}/get-06-labarugisummaryproject-cache`
			$('#obj_reporttable_colgroup01').html('Project');
			break;	

	}


	
	var args = {
		options: {
			criteria: {
				dt : param.dt
			}
		}
	}

	try {

		obj_reporttable_thead_loadingmessage[0].style.display='block';
		document.body.style.cursor = 'wait';

		
		var result = await $ui.apicall(apiurl, args);
		var totalrecord = result.cacheinfo.totalrecord;
		var pagesize = result.cacheinfo.pagesize;
		var cacheid = result.cacheinfo.cacheid;
		console.log(result.cacheinfo);


		var pagecount = Math.ceil(totalrecord/pagesize);
		

		// console.log(pagecount);


		for (var i=0; i<pagecount; i++) {
			var offset = i*pagesize;
			var args = { options: {
				page: i,
				totalrecord: totalrecord,
				offset: offset,
				maxrow: pagesize,
				criteria: {
					cache_id: cacheid
				}
			}};

			// console.log(args.options);
			var result = await $ui.apicall(apiurlcache, args);
			console.log('render page', i)

			for (var row of result.records) {
				var rowtpl = format_row(row);
				$(rowtpl).appendTo(obj_reporttable_body);
			}
			scrollTo(0, document.body.scrollHeight);

		}

		// Finishing Report
		setTimeout(()=>{
			apply_page_info();

			// end of report generate, set loaded
			console.log('report generated.')
			document.body.style.cursor = 'default';
			window.ReportIsLoadedStatus = true;
			scrollTo(0, 0);
			obj_reporttable_thead_loadingmessage[0].style.display='none';
		}, 500);


	} catch (err) {
		console.log(err)
		// $('#pnl_editbilloutgrid-error').html(err.errormessage);
	}

}



// function format_number(val) {
// 	return val;
// }

function format_row(row) {
	// console.log(row);
	var rowclass = 'rptrow-basic';

	switch (row.coa_rowtype) {
		case 'H':
			break;

		case 'I' :
			break;	

		case 'T':
			rowclass +=  ' rptrow-subtotalrow';
	
	}

	if (row.coa_isbold=='1') {
		rowclass +=  ' rptrow-bold';
	}


	var RowData = {
		Color: 'FFFFFF',
		Class: rowclass,
		rownumber: row.cache_rownumber,
		coa_id: row.coa_id,
		coa_level: row.coa_level,
		coa_name: row.coa_name,
		group01: '',
		saldoawal: format_number(row.saldoawal_idr),
		debet: row.mutasi_idr >= 0 ? format_number(row.mutasi_idr) : 0,
		kredit: row.mutasi_idr < 0 ? format_number(row.mutasi_idr) : 0,
		saldoakhir: format_number(row.saldoakhir_idr),
	}
	if (row.coa_isvalue=='0') {
		RowData.saldoawal = '&nbsp;';
		RowData.debet = '&nbsp;';
		RowData.kredit = '&nbsp;';
		RowData.saldoakhir = '&nbsp;';
	}



	var coa_name_rowstyle =`padding-left: ${4*row.coa_level}mm`;


	var rowtemplate = `
		<tr>
			<td class="${RowData.Class}" data-fill-color='${RowData.Color}'>${RowData.rownumber}</th>
			<td class="${RowData.Class}" data-fill-color='${RowData.Color}'>${RowData.coa_id}</th>
			<td class="${RowData.Class}" style="${coa_name_rowstyle}" data-fill-color='${RowData.Color}'>${RowData.coa_name}</th>
			<td class="${RowData.Class} rptrow-group01" data-fill-color='${RowData.Color}'>${RowData.group01}</th>
			<td class="${RowData.Class} rptrow-value" data-fill-color='${RowData.Color}'>${RowData.saldoawal}</th>
			<td class="${RowData.Class} rptrow-value" data-fill-color='${RowData.Color}'>${RowData.debet}</th>
		</tr>
	`;

	return rowtemplate;

}


