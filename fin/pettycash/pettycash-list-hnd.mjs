import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


let grd_list, opt;
var this_page_id;
var this_page_options;


const dt_search_date = $('#pnl_edit-dt_search_date');
const cbo_search_site = $('#pnl_list-cbo_search_site');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_site_created: 1
		},
		onFinished: () => {
			dt_search_date.datebox('setValue', global.now());
			grd_list.doLoad();
		}
	})

	cbo_search_site.name = 'pnl_list-cbo_search_site'	
	new fgta4slideselect(cbo_search_site, {
		title: 'Pilih Site',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,

		fieldValue: 'site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{ mapping: 'site_name', text: 'Site' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			// result.records.unshift({ site_id: '--NULL--', site_name: '-- PILIH --' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			cbo_search_site.combo('setValue', global.setup.site_id);
			cbo_search_site.combo('setText', global.setup.site_name);
			parallelProcess.setFinished('cbo_search_site_created');
		}
	});

	
	fn_callback();
}

	

export function search_checkparameter() {
	try {
		var site_id = cbo_search_site.combo('getValue');
		if (site_id=='--NULL--') {
			throw new Error('Site belum diisi');
		}

		return true;
	} catch (err) {
		$ui.ShowMessage('[ERROR]'+err.message);
		return false;
	}
}


export function customsearch(options) {
	var search_date = dt_search_date.datebox('getValue');
	var search_site = cbo_search_site.combo('getValue');

	// console.log(search_site, search_date);
	options.criteria.site_id = search_site;
	options.criteria.pettycash_date = search_date;
}


export function listloaded(result, options) {
	console.log(result);

	var awal = result.saldo.awal;
	var mutasi = result.saldo.mutasi;
	var akhir = result.saldo.akhir;

	updatesaldo(awal, mutasi, akhir);
}

export function updatesaldo(awal,mutasi,akhir) {
	$('#pnl_list-txt_saldoawal').html(format_number(awal));
	$('#pnl_list-txt_mutasi').html(format_number(mutasi));
	$('#pnl_list-txt_saldoakhir').html(format_number(akhir));

}

export function grd_list_rowrender(rowdata) {
	// rowdata ==> tr:tr, td:td, record:record, mapping:mapping, dataid:dataid, i:i}
	$(rowdata.td).css("padding-left", '20px');
	if (rowdata.record.pettycash_iscommit=='0' || rowdata.record.pettycash_iscommit==false) {
		rowdata.td.classList.add('skipped_incalculated_row');
	} else {
		rowdata.td.classList.remove('skipped_incalculated_row');
	}
}