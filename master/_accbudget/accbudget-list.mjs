import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
const cbo_search_model = $('#pnl_list-cbo_search_model');
const cbo_search_type = $('#pnl_list-cbo_search_type');
const cbo_search_report = $('#pnl_list-cbo_search_report');

const btn_load = $('#pnl_list-btn_load')
const btn_new = $('#pnl_list-btn_new')


let grd_list = {}

let last_scrolltop = 0

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	txt_search.textbox('textbox').bind('keypress', (evt)=>{
		if (evt.key==='Enter') {
			btn_load_click(self)
		}
	})
	

	btn_load.linkbutton({ onClick: () => { btn_load_click() } })
	btn_new.linkbutton({ onClick: () => { btn_new_click() } })


	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_report_created: 1,
			cbo_search_type_created: 1,
			cbo_search_model_created: 1
		},
		onFinished: () => {
			btn_load_click();
		}
	})

	cbo_search_report.name = 'pnl_list-cbo_search_report'	
	new fgta4slideselect(cbo_search_report, {
		title: 'Pilih Type',
		returnpage: this_page_id,
		api: $ui.apis.load_coareport_id,

		fieldValue: 'coareport_id',
		fieldValueMap: 'coareport_id',
		fieldDisplay: 'coareport_name',
		fields: [
			{ mapping: 'coareport_name', text: 'Report' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ coareport_id: 'ALL', coareport_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			cbo_search_type.combo('setValue', 'ALL');
			cbo_search_type.combo('setText', 'ALL');

			options.flashhighlight = false
			btn_load_click();
		},
		OnCreated: () => {
			cbo_search_report.combo('setValue', 'ALL');
			cbo_search_report.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_report_created');
		}
	});



	cbo_search_model.name = 'pnl_list-cbo_search_type'	
	new fgta4slideselect(cbo_search_type, {
		title: 'Pilih Type',
		returnpage: this_page_id,
		api: $ui.apis.load_coatype_id,

		fieldValue: 'coatype_id',
		fieldValueMap: 'coatype_id',
		fieldDisplay: 'coatype_name',
		fields: [
			{ mapping: 'coatype_name', text: 'Type', style:"width: 200px" },
			{ mapping: 'coareport_name', text: 'Report' },
		],
		OnDataLoading: (criteria) => {
			var coareport_id = cbo_search_report.combo('getValue');
			if (coareport_id!='ALL') {
				criteria.coareport_id = coareport_id
			}
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ coatype_id: 'ALL', coatype_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			btn_load_click();
		},
		OnCreated: () => {
			cbo_search_type.combo('setValue', 'ALL');
			cbo_search_type.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_type_created');
		}
	});


	cbo_search_model.name = 'pnl_list-cbo_search_model'	
	new fgta4slideselect(cbo_search_model, {
		title: 'Pilih Model',
		returnpage: this_page_id,
		api: $ui.apis.load_coamodel_id,

		fieldValue: 'coamodel_id',
		fieldValueMap: 'coamodel_id',
		fieldDisplay: 'coamodel_name',
		fields: [
			{ mapping: 'coamodel_name', text: 'Model' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ coamodel_id: 'ALL', coamodel_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			btn_load_click();
		},
		OnCreated: () => {
			cbo_search_model.combo('setValue', 'ALL');
			cbo_search_model.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_model_created');
		}
	});

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	


	document.addEventListener('scroll', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				grd_list.nextpageload();
			}			
		}
	})	
	

	// btn_load_click()
}


export function OnSizeRecalculated(width, height) {
}


export function updategrid(data, trid) {
	if (trid==null) {
		grd_list.fill([data])
		trid = grd_list.getLastId()
		
	} else {
		grd_list.update(trid, data)
	}

	return trid
}


export function removerow(trid) {
	grd_list.removerow(trid)
}

export function scrolllast() {
	$(window).scrollTop(last_scrolltop)

}

function btn_load_click() {

	grd_list.clear()

	var fn_listloading = async (options) => {
		var search = txt_search.textbox('getText')
		if (search!='') {
			options.criteria['search'] = search
		}


		var coareport_id = cbo_search_report.combo('getValue');
		var coatype_id = cbo_search_type.combo('getValue');
		var coamodel_id = cbo_search_model.combo('getValue');
		
		if (coareport_id!='ALL') {
			options.criteria.coareport_id = coareport_id;
		}

		if (coatype_id!='ALL') {
			options.criteria.coatype_id = coatype_id;
		}

		if (coamodel_id!='ALL') {
			options.criteria.coamodel_id = coamodel_id;
		} 

		// console.log(options.criteria);
		// switch (this_page_options.variancename) {
		// 	case 'commit' :
		//		break;
		// }

	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}

function btn_new_click() {
	$ui.getPages().ITEMS['pnl_edit'].handler.createnew()
	$ui.getPages().show('pnl_edit')	
}


function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	var viewmode = true
	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS['pnl_edit'].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show('pnl_edit')	
		}
	})
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	// var text = td.innerHTML
	// if (td.mapping == 'id') {
	// 	// $(td).css('background-color', 'red')
	// 	td.innerHTML = `<a href="javascript:void(0)">${text}</a>`
	// }
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		// var mapping = td.getAttribute('mapping')
		// if (mapping=='id') {
		// 	if (!record.disabled) {
		// 		td.classList.add('fgtable-rowred')
		// 	}
		// }
		if (record.disabled=="1" || record.disabled==true) {
			td.classList.add('fgtable-row-disabled')
		} else {
			td.classList.remove('fgtable-row-disabled')
		}
	})
}

