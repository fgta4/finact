'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project",
	autoid: true,
	icon : "icon-project-white.svg",
	idprefix: 'PJ',
	printing: true,

	persistent: {
		'mst_project': {
			comment: 'Daftar Project',
			primarykeys: ['project_id'],
			data: {
				project_id: {text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi', disabled: true }},

				projectmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Type Project harus diisi' },
					comp: comp.Combo({
						table: 'mst_projectmodel', field_value: 'projectmodel_id', field_display: 'projectmodel_name',
						api: 'finact/master/projectmodel/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_projecttype_id, record.projecttype_id, record.projecttype_name)		
						`
					})
				},

				project_name: { text: 'Project Name', type: dbtype.varchar(90), uppercase: true, null: false, options: { required: true, invalidMessage: 'Nama Project harus diisi' } },
				project_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },

				dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Owner Departemen harus diisi' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id',
						field_display: 'dept_name',
						api: 'ent/organisation/dept/list-selector'
					})
				},
				project_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				project_isallowalldept: { text: 'Visible to All Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },

				orderin_id: {
					text: 'Based on Order In', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'trn_orderin', field_value: 'orderin_id', field_display: 'orderin_descr',
						api: 'finact/sales/orderin/list'
					})
				},

				projecttype_id: {
					text: 'Type', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Type Project harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_projecttype', field_value: 'projecttype_id', field_display: 'projecttype_name',
						api: 'finact/master/projecttype/list'
					})
				},

			},
			defaultsearch: ['project_id', 'project_name'],
			uniques: {
				'project_name': ['project_name']
			}
		},

		'mst_projectdept' : {
			primarykeys: ['projectdept_id'],
			comment: 'Daftar dept yang bisa akses suatu project',
			data: {				
				projectdept_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				dept_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					text:'Dept', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list-selector'})
				},
				project_id: {text:'Project', type: dbtype.varchar(30), null:false}
			},

			uniques: {
				'projectdept_pair' : ['project_id', 'dept_id']
			}

		},

		'mst_projecttask': {
			comment: 'Daftar Task Project',
			primarykeys: ['projecttask_id'],
			data: {
				projecttask_id: {text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi', disabled: true } },
				projecttask_name: { text: 'Task Name', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Nama Task Project harus diisi' } },
				projecttask_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				projecttask_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				projecttask_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},
				dept_id: {text:'Dept', type: dbtype.varchar(30), null:false, options: { required: true, disabled: true}},
				project_id: {text:'Project', type: dbtype.varchar(30), null:false}
			},
			uniques: {
				'projecttask_name': ['project_id', 'projecttask_name']
			}
		},

	},

	schema: {
		title: 'Project',
		header: 'mst_project',
		detils: {
			'task' : {title: 'Task', table:'mst_projecttask', form: true, headerview:'project_name'},  
			'dept' : {title: 'Visible to Dept', table:'mst_projectdept', form: true, headerview:'project_name'},  
		}
		
	}
}


/*


ALTER TABLE `mst_projecttask` ADD KEY `project_id` (`project_id`);
ALTER TABLE `mst_projecttask` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);


*/