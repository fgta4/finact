var this_page_id;
var this_page_options;

import * as hnd from  './itemstock-positiongrid-hnd.mjs'

const tbl_list = $('#pnl_editpositiongrid-tbl_list');
const txt_title = $('#pnl_editpositiongrid-title');
const pnl_control = $('.pnl_editpositiongrid-control');
const btn_removechecked  = $('#pnl_editpositiongrid-removechecked');
const btn_addrow = $('#pnl_editpositiongrid-addrow');

let grd_list = {};
let header_data = {};
let last_scrolltop = 0;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;
	
	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	});	
	grd_list.doLoad = () => {
		OpenDetil(header_data);
	}
	grd_list.getHeaderData = () => {
		return header_data;
	}


	btn_removechecked.linkbutton({
		onClick: () => { btn_removechecked_click() }
	});

	btn_addrow.linkbutton({
		onClick: () => { btn_addrow_click() }
	});

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	});

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	});

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	});	

	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			pnl_control.hide()
		} else {
			pnl_control.show()
		}
	});

	document.addEventListener('scroll', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				grd_list.nextpageload();
			}			
		}
	});	

	if (typeof hnd.init==='function') {
		hnd.init({
			grd_list: grd_list,
			opt: opt,
			header_data: header_data
		}, ()=>{})
	}	

}

export function getObject(name) {
	switch (name) {
		case 'grd_list' : return grd_list;
		case 'page_id' : return this_page_id;
		case 'page_options' : return this_page_options;
		case 'last_scrolltop' : return last_scrolltop;
	}
}

export function OnSizeRecalculated(width, height) {
}



export function createnew(data, options) {
	// pada saat membuat data baru di header
	grd_list.clear();
	header_data = data;

	txt_title.html(data.itemstock_name)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'new');
		}
	}
}


export function OpenDetil(data) {
	// saat di klik di edit utama, pada detil information

	grd_list.clear();
	header_data = data;

	txt_title.html(data.itemstock_name)
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.setupTitle === 'function') {
			hnd.setupTitle(txt_title, header_data, 'open');
		}
	}

	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/position-list`
		options.criteria['id'] = data.itemstock_id

		if (typeof hnd!=='undefined') { 
			if (typeof hnd.customsearch === 'function') {
				hnd.customsearch(options);
			}
		}
	}
	var fn_listloaded = async (result, options) => {
		// console.log(result)

		var detilform = $ui.getPages().ITEMS['pnl_editpositionform'].handler.getForm()

		if (detilform.AllowAddRecord) {
			btn_addrow.show()
		} else {
			btn_addrow.hide()
		}

		if (detilform.AllowRemoveRecord) {
			btn_removechecked.show()
		} else {
			btn_removechecked.hide();
		}

		setTimeout(()=>{
			var checkcolumns = document.querySelectorAll('#pnl_editpositiongrid-tbl_list .rowcheck');
			
			for (var c of checkcolumns) {
				if (detilform.AllowRemoveRecord) {
					c.classList.remove('hidden');
				} else {
					c.classList.add('hidden');
				}
			}

			var selectbutton = document.getElementById('pnl_editpositiongrid-tbl_list-selectall-button');
			if (detilform.AllowRemoveRecord) {
				selectbutton.classList.remove('hidden');
			} else {
				selectbutton.classList.add('hidden');
			}
		},100);


		if (typeof hnd!=='undefined') { 
			if (typeof hnd.OpenDetil === 'function') {
				hnd.OpenDetil(data, result, options);
			}
		}


	}

	grd_list.listload(fn_listloading, fn_listloaded)	
}

export function scrolllast() {
	$(window).scrollTop(last_scrolltop)
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

export function getGrid() {
	return grd_list
}


function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	last_scrolltop = $(window).scrollTop()
	$ui.getPages().show('pnl_editpositionform', () => {
		$ui.getPages().ITEMS['pnl_editpositionform'].handler.open(record, trid, header_data)
	})	
}

function grd_list_cellclick(td, ev) {

}

function grd_list_cellrender(td) {
	if (typeof hnd!=='undefined') { 
		if (typeof hnd.grd_list_cellrender === 'function') {
			hnd.grd_list_cellrender({td:td, mapping:td.mapping, text:td.innerHTML});
		}
	}
}

function grd_list_rowrender(tr) {

	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (typeof hnd!=='undefined') { 
			if (typeof hnd.grd_list_rowrender === 'function') {
				hnd.grd_list_rowrender({tr:tr, td:td, record:record, mapping:mapping, dataid:dataid, i:i});
			}
		}
	});
		
}


function btn_removechecked_click() {
	$ui.ShowMessage("[QUESTION]Apakah anda akan menghapus baris terpilih ?" , {
		yes: () => {
			grd_list.removechecked({
				OnRemoving : async (options) => {
					var apiurl = `${global.modulefullname}/position-delete`
					var args = {data: options.data, options: {}}
					try {
						let result = await $ui.apicall(apiurl, args)
					} catch (err) {
						console.log(err)
						$ui.ShowMessage('[ERROR]'+err.message);
					}
				}
			})
		},
		no: () => {}
	})
}


function btn_addrow_click() {
	$ui.getPages().show('pnl_editpositionform', ()=>{
		$ui.getPages().ITEMS['pnl_editpositionform'].handler.createnew(header_data)
	})	
}