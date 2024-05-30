export async function init(opt) {
	setTimeout(()=>{
		console.log('init page...');
		// adjustPage();
		if (typeof (global.window_fn_print) === 'function') {
			var param = {
				report_height: '1000'
			}
			global.window_fn_print(param);
		}

	}, 500);
}
