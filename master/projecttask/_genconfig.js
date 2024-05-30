'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project Task",
	autoid: true,

	persistent: {
		'mst_projecttask': {
			comment: 'Daftar Task Project',
			primarykeys: ['projecttask_id'],
			data: {
				projecttask_id: {
					text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false,
					options: { required: true, invalidMessage: 'ID harus diisi', disabled: true }
				},
				projecttask_name: { text: 'Task Name', type: dbtype.varchar(90), uppercase: true, null: false, options: { required: true, invalidMessage: 'Nama Task Project harus diisi' } },
				projecttask_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				projecttask_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				projecttask_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},
				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},
				dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Owner Departemen harus diisi' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id',
						field_display: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				}
			},
		
			defaultsearch: ['projecttask_id', 'projecttask_name'],
			uniques: {
				'projecttask_name': ['projecttask_name']
			}
		},


		'mst_projecttaskempl' : {
			comment: 'Personil yang mengerjakan project task',
			primarykeys: ['projecttaskempl_id'],		
			data: {
				projecttaskempl_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				role_id: { 
					text: 'Role', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Role harus diisi' }, 
					comp: comp.Combo({
						table: 'fgt_role', 
						field_value: 'role_id', field_display: 'role_name', field_display_name: 'role_name', 
						api: 'fgta/framework/fgrole/list'})				
				
				},
				empl_id: {
					text:'Employee', type: dbtype.varchar(14), null:false, uppercase: true,
					options: { required: true, invalidMessage: 'Employee harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', field_display_name: 'empl_name', 
						api: 'hrms/master/empl/list'})
				},						
				projecttask_id: {text:'Project', type: dbtype.varchar(14), null:false, uppercase: true},		
			}			
		}
	},

	schema: {
		header: 'mst_projecttask',
		detils: {
			'empl': {title: 'Personil', table: 'mst_projecttaskempl', form: true, headerview: 'projecttask_name' },
		}
	}
}