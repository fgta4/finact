import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


let grd_list, opt;
var this_page_id;
var this_page_options;

const btn_reindex = $('#pnl_list-btn_reindex');
const cbo_search_dept = $('#pnl_list-cbo_search_dept');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	btn_reindex.linkbutton({
		onClick: () => { btn_reindex_click() }
	})


		
	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_dept: 1,
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})



	cbo_search_dept.name = 'pnl_list-cbo_search_dept'	
	cbo_search_dept.comp = new fgta4slideselect(cbo_search_dept, {
		title: 'Pilih Dept',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,

		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{ mapping: 'dept_name', text: 'Dept' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
			criteria.dept_isitemowner = 1;
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ dept_id: '--ALL--', dept_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			console.log(global.setup);
			cbo_search_dept.combo('setValue', '--ALL--');
			cbo_search_dept.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_dept');
		},
		// OnRowRender: (tr) => {
		// 	cbo_search_dept_OnRowRender(tr);
		// }
	});

	fn_callback();
}


async function btn_reindex_click() {
	
	var apiurl = `${global.modulefullname}/xtion-reindex`
	var args = {options: {}}

	try {
		$ui.mask('wait..');
		let result = await $ui.apicall(apiurl, args)
		if (result.success) {
			grd_list.doLoad();
		}
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
	

}


export function grd_list_rowrender(row) {
	//{tr:tr, td:td, record:record, mapping:mapping, dataid:dataid, i:i}
	var record = row.record;
	var td = row.td;
	var mapping = row.mapping;
	if (mapping=='itemgroup_name') {
		var indent = record.itemgroup_level * 15;
		$(td).css("padding-left", `${indent}px`);
		if (record.itemgroup_isparent=='1') {
			$(td).css('font-weight', 'bold');
		}
	}

}