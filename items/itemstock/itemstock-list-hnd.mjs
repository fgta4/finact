import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'



let grd_list, opt;
var this_page_id;
var this_page_options;

const cbo_search_dept = $('#pnl_list-cbo_search_dept');
const cbo_search_itemgroup = $('#pnl_list-cbo_search_itemgroup');



export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_dept: 1,
			cbo_search_itemgroup: 1

		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})



	cbo_search_dept.name = 'pnl_list-cbo_search_dept'	
	new fgta4slideselect(cbo_search_dept, {
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
			criteria.dept_isstockowner = 1;
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
			console.log(global.setup);
			cbo_search_dept.combo('setValue', global.setup.dept_id);
			cbo_search_dept.combo('setText', global.setup.dept_name);
			parallelProcess.setFinished('cbo_search_dept');
		}
	});



	cbo_search_itemgroup.name = 'pnl_list-cbo_search_itemgroup'	
	cbo_search_itemgroup.comp = new fgta4slideselect(cbo_search_itemgroup, {
		title: 'Pilih Item Group',
		returnpage: this_page_id,
		api: $ui.apis.load_itemgroup_id,

		fieldValue: 'itemgroup_id',
		fieldValueMap: 'itemgroup_id',
		fieldDisplay: 'itemgroup_name',
		fields: [
			{ mapping: 'itemgroup_name', text: 'Item Group' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ itemgroup_id: '--ALL--', itemgroup_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			cbo_search_itemgroup.combo('setValue', '--ALL--');
			cbo_search_itemgroup.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_itemgroup');
		},

		OnRowRender: (tr) => {
			cbo_search_itemgroup_OnRowRender(tr);
		}
	});


	fn_callback();
}

	

function cbo_search_itemgroup_OnRowRender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = cbo_search_itemgroup.comp.obj.getGridList().DATA[dataid]

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='itemgroup_name') {
			// console.log(record.deptgroup_level);
			var indent = record.itemgroup_level * 15;
			$(td).css("padding-left", `${indent}px`);
			if (record.itemgroup_isparent=='1') {
				$(td).css('font-weight', 'bold');
			}
		}
	})
}


export function customsearch(options) {
	options.api = `${global.modulefullname}/list-bydept`;
	options.criteria.dept_id = cbo_search_dept.combo('getValue');
	var search_itemgroup = cbo_search_itemgroup.combo('getValue');
	if (search_itemgroup!='--ALL--') {
		options.criteria.itemgroup_id = search_itemgroup;
	}
	
}