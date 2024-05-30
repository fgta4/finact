export function set_cbo_user_dept_id(obj) {

	new fgta4slideselect(obj.cbo_user_dept_id, {
		title: 'Pilih user_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,
		fieldValue: 'user_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.isparent = 0;
			criteria.isdisabled = 0;
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				obj.cbo_empl_id.reset()	
				obj.cbo_project_id.reset();
				obj.cbo_projecttask_id.reset();
				obj.cbo_projbudget_id.reset();
				obj.cbo_projbudgettask_id.reset();
			}
		}
	})					
}