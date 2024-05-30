'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Asset Move",
	autoid: true,
	backcolor : "#dd9a49",
	idprefix: 'MV', 
	printing: true,	

	persistent: {
		'trn_itemassetmove': {
			comment: 'Perubahan Lokasi Asset',
			primarykeys: ['itemassetmove_id'],
			data: {
				itemassetmove_id: { text: 'ID', type: dbtype.varchar(30), null: false},

				inquiry_id: {
					text: 'Inquiry', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_inquiry',
						field_value: 'inquiry_id', field_display: 'inquiry_descr',
						api: 'finact/procurement/inquiry/list',
						OnSelectedScript: `
							console.log(record);
			
							if (record.projecttask_id==null || record.projecttask_id=='--NULL--') { record.projecttask_id='--NULL--'; record.projecttask_name='NONE'; }
							if (record.projbudget_id==null || record.projbudget_id=='--NULL--') { record.projbudget_id='--NULL--'; record.projbudget_name='NONE'; }
							if (record.projbudgettask_id==null || record.projbudgettask_id=='--NULL--') { record.projbudgettask_id='--NULL--'; record.projbudgettask_name='NONE'; }
					
							form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
							form.setValue(obj.txt_itemassetmove_descr, record.inquiry_descr)
							form.setValue(obj.dt_itemassetmove_dtstart, global.now(from_sql_date(record.inquiry_dtstart)));
							form.setValue(obj.dt_itemassetmove_dtend, global.now(from_sql_date(record.inquiry_dtend)));
			
							form.setValue(obj.cbo_from_site_id, record.site_id, record.site_name);
							form.setValue(obj.cbo_to_site_id, record.site_id, record.site_name);
							form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
			
			
							form.setValue(obj.cbo_project_id, record.project_id, record.project_name);
							form.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name);
							form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name);
							form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name);						
						
						`
					})
				},

				itemassetmove_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				itemassetmove_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},

				itemassetmove_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				from_site_id: {
					text:'From', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'from_site_name', 
						api: 'ent/location/site/list'})				
				},

				to_site_id: {
					text:'To', type: dbtype.varchar(30), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', field_display_name: 'to_site_name', 
						api: 'ent/location/site/list'})				
				},

				user_dept_id: {
					text: 'User Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen User harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},
				empl_id: {
					text:'Responsible Empl', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,suppresslist: true,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				projecttask_id: {
					text: 'Project Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},

				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name', field_display_name: 'projbudget_name',
						api: 'finact/budget/projbudget/list'
					})
				},

				projbudgettask_id: {
					text: 'Budget Task', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_projbudgettask',
						field_value: 'projbudgettask_id', field_display: 'projecttask_notes',  field_display_name: 'projbudgettask_name',
						api: 'finact/budget/projbudget/task-list'
					})
				},
			},
			
			defaultsearch: ['itemassetmove_id', 'itemassetmove_descr']
		},


		'trn_itemassetmovedetil': {
			comment: 'Daftar Request Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['itemassetmovedetil_id'],
			data: {
				itemassetmovedetil_id: { text: 'ID', type: dbtype.varchar(30), null: false},
				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'finact/items/itemasset/list'
					})				
				},
				itemassetmovedetil_descr: { text: 'Descr', type: dbtype.varchar(90), null: false },
				itemassetmove_id: { text: 'Asset Move ID', type: dbtype.varchar(30), null: false },
			}
		},		

	},

	schema: {
		header: 'trn_itemassetmove',
		detils: {
			'items' : {title: 'Items', table: 'trn_itemassetmovedetil', form: true, headerview: 'itemassetmove_descr' },
			'multiadd' : {title: 'Items', table: 'trn_itemassetmovedetil', form: false, headerview: 'itemassetmove_descr' },

		}
	}


}
