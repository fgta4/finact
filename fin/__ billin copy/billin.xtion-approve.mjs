export async function Approve(id, param, fn_callback) {
	// console.log(corpbudget_id + 'commit');
	var apiurl = `${global.modulefullname}/xtion-approve`
	var args = {
		id: id,
		param: param
	}

	console.log(apiurl, args);
	$ui.mask('wait...')
	try {

		$ui.forceclosemask = true;
		var result = await $ui.apicall(apiurl, args);
		console.log('result', result);
		if (typeof fn_callback == 'function') {
			fn_callback(null, true);
		}



		$ui.unmask();
	} catch (err) {
		$ui.unmask();
		console.log(err)
		$ui.ShowMessage("[ERROR] " + err.errormessage);
	}

}