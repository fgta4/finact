import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


let grd_list, opt;
var this_page_id;
var this_page_options;

const cbo_search_periodemo = $('#pnl_list-cbo_search_periodemo');
const btn_filter = $('#pnl_list-btn_filter');
const btn_new = $('#pnl_list-btn_new')

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	



	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_periodemo: 1,
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})


	cbo_search_periodemo.name = 'pnl_list-cbo_search_periodemo'	
	cbo_search_periodemo.comp = new fgta4slideselect(cbo_search_periodemo, {
		title: 'Pilih Periode',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,
		fieldValue: 'periodemo_id',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{ mapping: 'periodemo_name', text: 'Periode' },
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
			//criteria.dept_isitemowner = 1;
			options.sortData = {
				periodemo_id: 'DESC'
			}
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ periodemo_id: '--ALL--', periodemo_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			// console.log(global.setup);
			cbo_search_periodemo.combo('setValue', '--ALL--');
			cbo_search_periodemo.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_periodemo');
		},
		// OnRowRender: (tr) => {
		// 	cbo_search_dept_OnRowRender(tr);
		// }
	});
	

	btn_filter.linkbutton({
		onClick: () => { btn_filter_click() }
	})
	
	fn_callback();
}


function btn_filter_click() {
	// $ui.getPages().show('pnl_editfilter', ()=>{
	// 	// $ui.getPages().ITEMS['pnl_editpreview'].handler.PreviewForm({});
	// })
}
	
export function list_loading(options) {
	options.sortData = {
		jurnal_date: 'DESC'
	}

	if (opt.variancename=='posting') {
		options.criteria.jurnal_iscommit = 1;
		options.criteria.jurnal_ispost = 0;
	} else if (opt.variancename=='unposting') {
		options.criteria.jurnal_ispost = 1;
		options.criteria.jurnal_isclose = 0;
	} else if (opt.variancename=='link') {
		options.criteria.jurnal_ispost = 1;
	} else if (opt.variancename=='unlink') {
		options.criteria.jurnal_ispost = 1;
	}
}

export function grd_list_rowrender(row) {

	var status_unbalance;
	var status_emptyrows;
	var status_commit;
	var status_posted;
	var status_closed;
	var status_islinked;
	var status_isresponded;


	if (row.mapping=='jurnal_descr-mobile' || row.mapping=='jurnal_status-desktop') {
		// console.log(row);

		status_unbalance = row.record.jurnaldetil_validr!=0 ? '<div class="status-button unbalance">ub</div>' : '';
		status_emptyrows = row.record.jurnaldetil_rowcount==0 ? '<div class="status-button emptyrows">er</div>' : '';
		status_commit = row.record.jurnal_iscommit==1 ? '<div class="status-button commit">c</div>' : '';
		status_posted = row.record.jurnal_ispost==1 ? '<div class="status-button posted">P</div>' : '';
		status_closed = row.record.jurnal_isclose==1 ? '<div class="status-button closed">x</div>' : '';
		status_islinked = row.record.jurnal_islinked>0 ? '<div class="status-button linked">L</div>' : '';
		status_isresponded = row.record.jurnal_isresponded>0 ? '<div class="status-button responded">R</div>' : '';
	}


	if (row.mapping=='jurnal_descr-mobile') {
		var content = `
			<div class="grd-cell-sub">
				<div class="grd-lst-id">${row.record.jurnal_id}</div>
				${status_unbalance}
				${status_emptyrows}
				${status_commit}
				${status_posted}
				${status_islinked}
				${status_isresponded}
				${status_closed}
			</div>	
			<div class="grd-lst-desc">${row.record.jurnal_descr}</div>
			<div class="grd-lst-per">${row.record.periodemo_name}, ${row.record.jurnal_date}</div>
		`;
		row.td.innerHTML = content;
	} else if (row.mapping=='jurnal_status-desktop') {
		var content = `<div class="grd-cell-sub" style="justify-content: center">
			${status_unbalance}
			${status_emptyrows}
			${status_commit}
			${status_posted}
			${status_islinked}			
			${status_isresponded}
			${status_closed}
		`;
		row.td.innerHTML = content;
	}

	if (global.setup.variancename=='entry') {
		if (row.record.jurnal_isclose) {
			row.td.classList.add('jurnal-list-close');
		} else if (row.record.jurnal_ispost==1) {
			row.td.classList.add('jurnal-list-post');
		} else if (row.record.jurnal_iscommit==1) {
			row.td.classList.add('jurnal-list-commit');
		}
	}
}	