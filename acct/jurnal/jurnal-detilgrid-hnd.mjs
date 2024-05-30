let grd_list, opt;
var this_page_id;
var this_page_options;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	
	fn_callback();
}

export function setupTitle(txt_title, header_data) {
	txt_title[0].classList.remove('fgta-page-subtitle');
	var title = '';

	title += `
		<div style="font-weight: bold; font-size: 1.2em">${header_data.jurnal_id}</div>
		<div style="font-style: italic; font-size: 1.2em; margin-bottom: 15px">${header_data.jurnal_descr}</div>
	`;

	txt_title.html(title);

}	

export function grd_list_rowrender(row) {
	if (row.mapping=='jurnaldetil_descr-mobile') {
		var content = `
			<div class="grd-lst-id">${row.record.coa_name}</div>
			<div class="grd-lst-desc">${row.record.jurnaldetil_descr}</div>
		`;
		row.td.innerHTML = content;
	}
}	

export function OpenDetil(data, result, options) {
	console.log(result);
	var recordtotalvalue = result.recordtotalvalue ?? 0;
	$('.detil_totalvalue').html(recordtotalvalue.toLocaleString('en-US'));
}
