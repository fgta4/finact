let grd_list, opt;
var this_page_id;
var this_page_options;

const btn_download = $('#pnl_list-btn_download');
const obj_pastebox = $('#pnl_list-obj_pastebox');


var header_data;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	btn_download.linkbutton({
		onClick: () => {
			btn_download_click();
		}
	});

	obj_pastebox[0].addEventListener('paste', (e) => {
		obj_pastebox_action(e);
	});


	document.addEventListener('OnViewModeChanged', (e)=>{
		var viewmode = e.detail.viewmode;
		if (viewmode) {
			$('.head-editable-toggle').hide();
		} else {
			$('.head-editable-toggle').show();
		}
	});

	fn_callback();
}


export function OpenDetil(data, result, options) {
	header_data = data;
}


function btn_download_click() {
	$ui.ShowMessage('[INFO]Anda dapat download template budget di<br><a target="_blank" href="https://docs.google.com/spreadsheets/d/1oZdfR3JWnw42IGuSdSLPS_APiSoHAJl-gRvf-MSx3rU/edit#gid=0">https://docs.google.com/spreadsheets/d/1oZdfR3JWnw42IGuSdSLPS_APiSoHAJl-gRvf-MSx3rU/edit#gid=0</a>.');
}

function obj_pastebox_action(e) {
	var clipboardData = e.clipboardData || window.clipboardData;
	var pastedData = clipboardData.getData('Text');
	$ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
		"OK": async () => {
			obj_pastebox.hide();
			obj_pastebox.html('');
			obj_pastebox_paste(pastedData, (err, result)=>{
				obj_pastebox.show();
				if (err) {
					$ui.ShowMessage("[ERROR]"+err.message);
				} else {
					console.log(result);
					grd_list.doLoad(); // reload grid
				}
			});
		},
		"Cancel": () => {
			obj_pastebox.html('');
		}
	})
}

function obj_pastebox_paste(pastedData, fn_callback) {
	var colspattern = "BUDGETACCOUNT $ DEPT $ JAN $ FEB $ MAR $ APR $ MAY $ JUN $ JUL $ AGS $ SEP $ OCT $ NOV $ DES";
	var rows = pastedData.split("\n");
	var err, data;
	
	var i = 0;

	try {
		var budgetdeptprop_id = header_data.budgetdeptprop_id;
		data = {
			budgetdeptprop_id: budgetdeptprop_id,
			rows: []
		}
	
		for (var row of rows) {
			if (row === "") continue;
			var cells = row.split("\t");
			if (i==0) {
				var headpatt = cells.join(' $ ').trim();
				if (headpatt.toUpperCase()!=colspattern.toUpperCase()) {
					console.log(headpatt.toUpperCase());
					console.log(colspattern.toUpperCase());
					throw new Error('Format data tidak sesuai');
				}
			} else {
				var coabudget_id = cells[0];
				var dept_id = cells[1];
				var vsc = 2;
				var values = {
					"month_01": cells[vsc+0],
					"month_02": cells[vsc+1],
					"month_03": cells[vsc+2],
					"month_04": cells[vsc+3],
					"month_05": cells[vsc+4],
					"month_06": cells[vsc+5],
					"month_07": cells[vsc+6],
					"month_08": cells[vsc+7],
					"month_09": cells[vsc+8],
					"month_10": cells[vsc+9],
					"month_11": cells[vsc+10],
					"month_12": cells[vsc+11]
				};

				data.rows.push({
					coabudget_id: coabudget_id,
					dept_id: dept_id,
					values: values
				})
			}
			i++;
		}

		// upload ke system
		upload(data, (err, result)=>{
			if (err) {
				if (typeof(fn_callback)==='function') {
					fn_callback(err);
				}
			} else {
				if (typeof(fn_callback)==='function') {
					fn_callback(null, result);
				}
			}
		})
	} catch (err) {
		if (typeof(fn_callback)==='function') {
			fn_callback(err);
		}
	}
}

async function upload(data, fn_callback) {
	var apiurl = `${global.modulefullname}/xtion-upload`
	var args = {data: data, options: {}}
	try {
		var result = await $ui.apicall(apiurl, args)
		if (result.success!==true) {
			if (result.message==null) {
				console.error('undefined error saat upload');
			}
			throw new Error(result.message);
		}

		if (typeof(fn_callback)==='function') {
			fn_callback(null, result);
		}
	} catch (err) {
		if (typeof(fn_callback)==='function') {
			fn_callback(err, null);
		}
	}
}