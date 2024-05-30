var this_page_id;
var this_page_options;


const pnl_paste = $('#pnl_upload-paste-box');

let grd_list = {}
let last_scrolltop = 0

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	document.getElementById('pnl_upload-paste-box').addEventListener('paste', (e) => {
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		e.stopPropagation();
		e.preventDefault();

		PasteFromSpreadsheet(pastedData, (result) => {
			pnl_paste.html('');
		});

	});

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_list', ()=>{
				$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
			})
		}
	});
}


async function PasteFromSpreadsheet(pastedData, fn_callback) {
	var colspattern = "Order & Customer Name & Invoice & Brand & Advertiser & Inv Date & Due Date & Amount";

	$ui.mask('wait...')
	try {

		var data = [];
		var i = 0;
		var rows = pastedData.split("\n");
		for (var row of rows) {
			i++;
			if (row === "") { continue; }
			var cells = row.split("\t");
			if (i==1) {
				CheckFormat(colspattern, cells);
				continue;
			}

			data.push({
				order: cells[0],
				agency: cells[1].toString().trim(),
				invoice: cells[2].toString().trim(),
				brand: cells[3].toString().trim(),
				advertiser: cells[4].toString().trim(),
				invoice_date: cells[5].toString().trim(),
				due_date: cells[6].toString().trim(),
				amount: formatToNumber(cells[7]),
			})		
		}

		var apiurl = `${global.modulefullname}/xtion-paste`
		var args = {
			data: data
		}

		$ui.forceclosemask = true;
		var result = await $ui.apicall(apiurl, args);

		$ui.unmask();
		if (typeof fn_callback==='function') {
			fn_callback(result);
		}
	} catch (err) {
		$ui.unmask();
		console.error(err);
		$ui.ShowMessage("ERROR" + err.errormessage);
	}
}


function CheckFormat(colspattern, firstRowCells) {
	var cells = firstRowCells;

	try {
		var patt = colspattern.split(" & ");
		if (cells.length != patt.length) {
			throw new Error('kolom yang di copy belum sama dengan template');
		}
		
		var formatc = new Array(cells.length);
		for (var c = 0; c < cells.length; c++) {
			formatc[c] = cells[c].trim();
			if (patt[c].toUpperCase() != formatc[c].toUpperCase()) {
				throw new Error('Kolom: ' + patt[c].toUpperCase() + ' belum ada ');
			}
		}
		
	} catch (err) {
		throw err;
	}
}


function formatToNumber(num, locale) {
	const { format } = new Intl.NumberFormat(locale);
	const [, decimalSign] = /^0(.)1$/.exec(format(0.1));
	return +num
		.replace(new RegExp(`[^${decimalSign}\\d]`, 'g'), '')
		.replace(decimalSign, '.');
}