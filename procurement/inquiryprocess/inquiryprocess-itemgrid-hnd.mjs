let grd_list, opt;
var this_page_id;
var this_page_options;


const btn_process = $(`<a id="pnl_edititemgrid-process" href="javascript:void(0)" class="easyui-linkbutton c8">Process All</a>`).insertAfter('#pnl_edititemgrid-removechecked');



let header_data;


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	// $.parser.parse('.pnl_edititemgrid-control');




	btn_process.linkbutton({ onClick: () => { btn_process_click() } });


	fn_callback();
}


export function OpenDetil(data, result, options) {
	header_data = data;


	$('.pnl_edititemgrid-control').show();
	$('#pnl_edititemgrid-removechecked').hide();
	$('#pnl_edititemgrid-addrow').hide();


	// inquiry_isprepared
	// console.log(data);
	// tambah tombol
	// $('#pnl_edititemgrid-removechecked').append()
	
	// btn_process.linkbutton('disable');

}


async function btn_process_click() {



	var apiurl = `${global.modulefullname}/xtion-process`
	var args = {id: header_data.inquiry_id, param:{}}

	try {
		var result = await $ui.apicall(apiurl, args)
		
		if (result.success===true) {
			$ui.ShowMessage(`[INFO]Inquiry no ${header_data.inquiry_id} telah berhasil diproses`, {
				'Ok': () => {
					$ui.getPages().show('pnl_list', ()=>{
						// console.log('btn_load');
						var grd_list = $ui.getPages().ITEMS['pnl_list'].handler.getObject('grd_list');
						grd_list.doLoad();
					})
				}
			})
		}
		
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]Error on processing data')
	}
}