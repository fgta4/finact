var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_editmultiadd-tbl_list');
const txt_title = $('#pnl_editmultiadd-title');
const txt_search = $('#pnl_editmultiadd-txt_search')
const btn_load = $('#pnl_editmultiadd-btn_load')
const btn_apply = $('.pnl_editmultiadd-apply')
const chk_stay = $('#pnl_editmultiadd-stay')

let grd_list = {};
let header_data = {};

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;
	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		// OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		// OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	});	


	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	btn_apply.linkbutton({
		onClick: () => { btn_apply_click() }
	})


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
}


export function LoadData(data) {
	txt_search.textbox('resize', '100%');
	grd_list.clear();

	if (data!=null) {
		txt_title.html(data.dept_name)
		header_data = data;
		txt_search.textbox('setText', '');
	}

	console.log('test');

	var fn_listloading = async (options) => {
		var search = txt_search.textbox('getText')

		options.api = `${global.modulefullname}/list-getbillinpaym`
		//options.criteria.accbudgetformat_id = header_data.accbudgetformat_id;
		options.criteria.search = search;
	}

	var fn_listloaded = async (result, options) => {
		console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)	
}




function grd_list_rowformatting(tr) {

}

function grd_list_cellrender(td) {

}

function grd_list_rowrender(tr) {

}


function btn_load_click() {
	LoadData();
}

function btn_apply_click() {


	var stay = chk_stay.prop("checked")

	grd_list.IterateChecked({
		OnIterating : async (options) => {
			console.log(options)
			var apiurl = `${global.modulefullname}/billinpaym-add`
			var args = {data: options.data, options: {}}

			args.data.paymentscd_id = header_data.paymentscd_id;
			try {
				let result = await $ui.apicall(apiurl, args)
				if (stay) {
					grd_list.removerow(result._trid);
				}
			} catch (err) {
				console.log(err)
			}
		},

		OnIterated: async (args) => {
			
			if (!stay) {
				$ui.getPages().show('pnl_editbillingrid', ()=>{
					$ui.getPages().ITEMS['pnl_editbillingrid'].handler.OpenDetil(header_data)
				})
			}



		}


	})
}