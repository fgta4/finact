import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'



let grd_list, opt;
var this_page_id;
var this_page_options;


const cbo_search_dept = $('#pnl_list-cbo_search_dept');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;


	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_dept_created: 1
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})


	cbo_search_dept.name = 'pnl_list-cbo_search_dept'	
	new fgta4slideselect(cbo_search_dept, {
		title: 'Pilih Department',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,

		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{ mapping: 'dept_name', text: 'Departemen' },
		],
		OnDataLoading: (criteria) => {
			console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			// if (global.setup.empluser_allowviewalldept=='1') {
			// 	result.records.unshift({ dept_id: 'ALL', dept_name: 'ALL' });
			// }
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			btn_load_click();
		},
		OnCreated: () => {
			cbo_search_dept.combo('setValue', global.setup.dept_id);
			cbo_search_dept.combo('setText', global.setup.dept_name);
			parallelProcess.setFinished('cbo_search_dept_created');
			console.log(global.setup);
		}
	});



	$('#pnl_list-btn_new').hide();


	//


	// pnl_edititemgrid-removechecked

	// pnl_edititemgrid-control

	fn_callback();
}

