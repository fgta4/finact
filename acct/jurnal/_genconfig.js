'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jurnal",
	autoid: true,
	idprefix: 'JV',
	printing: true,
	committer: true,

	jsonOverwrite: true,
	commitOverwrite: false,
	uncommitOverwrite: false,
	approvalOverwrite: false,
	xprintOverwrite: false,

	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		program untuk entry jurnal manual dan view semua jurnal
	`,

	variance: {
		"view" : {title:"Jurnal (View)"},
		"entry" : {
			title:"Jurnal (Entry)", 
			data: {
				jurnalsource:{id:"MANUAL"} 
			}
		},
		"posting" : {
			title:"Jurnal (Posting)",
			data: {}
		},
		"unposting" : {
			title:"Jurnal (Unposting)",
			data: {}
		},
		"link" : {
			title:"Jurnal Link",
			data: {}
		},
		"unlink" : {
			title:"Jurnal UnLink",
			data: {}
		},
	},

	persistent: {
		'trn_jurnal': {
			comment: 'Daftar Jurnal',
			primarykeys: ['jurnal_id'],
			data: {
				jurnal_id: { text: 'ID', type: dbtype.varchar(30), null: false},



				jurnalsource_id: {
					text:'Source', type: dbtype.varchar(10), null:false, suppresslist: true,  
					options:{required:true,invalidMessage:'Source harus diisi', prompt:'-- PILIH --', disabled:true},
					comp: comp.Combo({
						title: 'Pilih Sumber Jurnal',
						table: 'mst_jurnalsource', 
						api: 'finact/master/jurnalsource/list',
						field_value: 'jurnalsource_id', field_display: 'jurnalsource_name', 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},	

				jurnaltype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, suppresslist: true,  
					options:{required:true,invalidMessage:'Jurnal Type harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Type Jurnal',
						table: 'mst_jurnaltype', 
						api: 'finact/master/jurnaltype/list',
						field_value: 'jurnaltype_id', field_display: 'jurnaltype_name', 
						field_mappings: [
							`{mapping: 'jurnaltype_id', text: 'ID', hidden: true}`,
							`{mapping: 'jurnaltype_name', text: 'Type', style: 'width: auto'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},				

				jurnal_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				jurnal_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },
			
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Periode Buku',
						table: 'mst_periodemo',
						api: 'finact/master/periodemo/list',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						field_mappings: [
							`{mapping: 'periodemo_id', text: 'ID', hidden: true}`,
							`{mapping: 'periodemo_name', text: 'Periode', style: 'width: auto'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},
			
				jurnal_date: { text: 'Date', type: dbtype.date, null: false },
				jurnal_datedue: { 
					class: 'pnl_edit-duedatepanel hidden',
					text: 'Due Date', type: dbtype.date, null: false, suppresslist: true, options: {} 
				},

				jurnal_valfrg: { 
					class: 'pnl_edit-valuepanel',
					text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,   options: { required: true } },
			
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Mata Uang',
						table: 'mst_curr', 
						api: 'ent/general/curr/list-with-currentrate',
						field_value: 'curr_id', field_display: 'curr_name', 
						field_mappings: [
							`{mapping: 'curr_id', text: 'ID', hidden: true}`,
							`{mapping: 'curr_name', text: 'Curency', style: 'width: auto'}`,
							`{mapping: 'curr_rate', text: 'Rate', style: 'width: 100px; text-align:right', formatter: 'row_format_number'}`,
						], 
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				jurnal_valfrgrate: { 
					class: 'pnl_edit-valuepanel pnl_edit-valuepanel-rate',
					text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true,  options: { required: true } },
				jurnal_validr: { 
					class: 'pnl_edit-valuepanel',
					text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false,  
					options: { required: true, disabled: true } 
				},

				coa_id: {
					section: section.Begin('Account & Sub Account', {additionalclass:'pnl_edit-subspanel'}),
					text:'Account', type: dbtype.varchar(20), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Mata Uang',
						table: 'mst_coa', 
						api: 'finact/master/coa/list',
						field_value: 'coa_id', field_display: 'coa_name', 
						field_mappings: [
							`{mapping: 'coa_id', text: 'ID', style: 'width: 100px'}`,
							`{mapping: 'coa_name', text: 'Account', style: 'width: auto'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Sub Account Unit',
						table: 'mst_unit',
						api: 'ent/organisation/unit/list',
						field_value: 'unit_id', field_display: 'unit_name',
						field_mappings : [
							`{mapping: 'unit_id', text: 'ID', style: 'width: 100px'}`,
							`{mapping: 'unit_name', text: 'Unit', style: 'width: auto'}`,
						],
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Default Sub Account Departemen',
						table: 'mst_dept', 
						api: 'ent/organisation/dept/list',
						field_value: 'dept_id', field_display: 'dept_name', 
						field_mappings: [
							`{mapping: 'dept_id', text: 'ID', style: 'width: 100px', hidden: true}`,
							`{mapping: 'dept_name', text: 'Dept', style: 'width: auto'}`,
							`{mapping: 'depttype_name', text: 'Type', style: 'width: 200px'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},
				partner_id: {
					section: section.End('Account & Sub Account'),
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Partner',
						table: 'mst_partner', 
						api: 'ent/affiliation/partner/list',
						field_value: 'partner_id', field_display: 'partner_name', 
						field_mappings: [
							`{mapping: 'partner_id', text: 'ID', style: 'width: 100px', hidden: true}`,
							`{mapping: 'partner_name', text: 'Partner', style: 'width: auto'}`,
							`{mapping: 'partnertype_name', text: 'Type', style: 'width: 200px'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},


				project_id: {
					suppresslist: true, hidden: true,
					options:{prompt:'NONE'},
					text:'Partner', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_project', 
						field_value: 'project_id', field_display: 'project_name', 
						api: 'finact/master/project/list'
					})
				},

				jurnaltype_col: { 
					section: section.Begin('Setting'),
					text: 'Column', type: dbtype.varchar(1), null: false, default:`'D'`, suppresslist: true, 
					options: {disabled: true}
				},
				
				jurnal_isindependentsetting: { caption:'Current Setting', text: 'Independent', type: dbtype.boolean, null: false, default: '0', suppresslist:true, options:{disabled:true,  labelWidth:'150px'} },
				jurnaltype_ishasduedate: { text: 'Due Date', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				jurnaltype_ishasheadvalue: {  text: 'Header Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasheadaccount: { text: 'Header Account', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },

				jurnaltype_ishasheadunit: {  text: 'Header Unit', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasheaddept: {  text: 'Header Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasheadpartner: {  text: 'Header Partner', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasdetunit: {  text: 'Detil Unit', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasdetdept: {  text: 'Detil Dept', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true, labelWidth:'150px'} },
				jurnaltype_ishasdetpartner: {  
					section: section.End(),
					text: 'Detil Partner', type: dbtype.boolean, null: false, default: '0', suppresslist: true, 
					options:{disabled: true, labelWidth:'150px'} 
				},

				jurnal_version: {
					section: section.Begin('Status'),
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				jurnal_iscommit: { caption:'Status', text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				jurnal_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				jurnal_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				jurnal_ispost: { text: 'Posted', type: dbtype.boolean, null: false, default: '0', suppresslist: false, unset:true, options: { disabled: true } },
				jurnal_postby: { text: 'Post By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				jurnal_postdate: { text: 'Post Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				jurnal_isclose: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				jurnal_closeby: { text: 'Closed By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				jurnal_closedate: { text: 'Closed Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				jurnal_islinked: { text: 'Linked', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, hidden: true, options: { disabled: true } },
				jurnal_isresponded : { text: 'Responded', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, hidden: true, options: { disabled: true } },

				jurnal_isagingclose: { text: 'Aging Closed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, unset:true, options: { disabled: true, labelWidth: 'auto' } },
				jurnal_agingcloseby: { text: 'Closed By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				jurnal_agingclosedate: { 
					section: section.End(),
					text: 'Closed Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true
				},
			},
			
			defaultsearch: ['jurnal_id', 'jurnal_descr']
		},

		'trn_jurnaldetil' : {
			comment: 'Jurnal Detil',
			primarykeys: ['jurnaldetil_id'],		
			data: {

				jurnaldetil_id: { 
					text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, hidden: true,
					after: `
					<?php require_once __DIR__ . '/jurnal-detilform-linkdata.phtml'; ?>
					`
				},

				jurnaldetil_isprelinked: { text: 'PreLinked', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true } },
				jurnaldetil_descr: { 
					text: 'Descr', type: dbtype.varchar(255), null: false, 
					options: { required: true, invalidMessage: 'Descr harus diisi' } 
				},

				jurnaldetil_valfrg: { 
					text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Mata Uang',
						table: 'mst_curr', 
						api: 'ent/general/curr/list-with-currentrate',
						field_value: 'curr_id', field_display: 'curr_name', 						
						field_mappings: [
							`{mapping: 'curr_id', text: 'ID', hidden: true}`,
							`{mapping: 'curr_name', text: 'Curency', style: 'width: auto'}`,
							`{mapping: 'curr_rate', text: 'Rate', style: 'width: 100px; text-align:right', formatter: 'row_format_number'}`,
						], 
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				jurnaldetil_valfrgrate: { 
					text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},
				jurnaldetil_validr: { 
					text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true, disabled: true } 
				},


				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Account harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Account',
						table: 'mst_coa', 
						api: 'finact/master/coa/list',
						field_value: 'coa_id', field_display: 'coa_name', 
						field_mappings: [
							`{mapping: 'coa_id', text: 'ID', style: 'width: 100px'}`,
							`{mapping: 'coa_name', text: 'Account', style: 'width: auto'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Sub Account Unit',
						table: 'mst_unit',
						api: 'ent/organisation/unit/list',
						field_value: 'unit_id', field_display: 'unit_name',
						field_mappings : [
							`{mapping: 'unit_id', text: 'ID', style: 'width: 100px'}`,
							`{mapping: 'unit_name', text: 'Unit', style: 'width: auto'}`,
						],
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: false,
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Sub Account Departemen',
						table: 'mst_dept', 
						api: 'ent/organisation/dept/list',
						field_value: 'dept_id', field_display: 'dept_name', 
						field_mappings: [
							`{mapping: 'dept_id', text: 'ID', hidden: true}`,
							`{mapping: 'dept_name', text: 'Dept', style: 'width: 200px'}`,
							`{mapping: 'depttype_name', text: 'Type'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: false,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Sub Account Partner',
						table: 'mst_partner', 
						api: 'ent/affiliation/partner/list',
						field_value: 'partner_id', field_display: 'partner_name', 
						field_mappings: [
							`{mapping: 'partner_id', text: 'ID', style: 'width: 100px', hidden: true}`,
							`{mapping: 'partner_name', text: 'Partner', style: 'width: auto'}`,
							`{mapping: 'partnertype_name', text: 'Type', style: 'width: 200px'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				project_id: {
					suppresslist: true, hidden: true,
					options:{prompt:'NONE'},
					text:'Project', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_project', 
						field_value: 'project_id', field_display: 'project_name', 
						api: 'finact/master/project/list'
					})
				},

				jurnaldetil_outstanding_frg: { 
					text: 'Outstanding Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, 
					unset:true, hidden: true, options: { required: true, disabled: true }
				},
				jurnaldetil_outstanding_idr: { 
					text: 'Outstanding IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, 
					unset:true, hidden: true,  options: { required: true, disabled: true } 
				},
				jurnaldetil_id_ref: { 
					text: 'Jurnal Reference', type: dbtype.varchar(14), null: true, suppresslist: true, 
					reference: {table: 'trn_jurnaldetil', field_value: 'jurnaldetil_id', field_display:'jurnaldetil_descr',  field_display_name:'jurnaldetil__ref_descr'}, 
					unset:true, options: { disabled: true }
				},
				jurnaldetil_head: { 
					text: 'Column', type: dbtype.int(1), null: false, default:0, suppresslist: true, 
					unset:true, hidden: true, options: { disabled: true }
				},
				jurnaldetil_blockorder: { 
					text: 'BlockOrder', type: dbtype.int(1), null: false, default:0, suppresslist: true, 
					unset:true, hidden: true, options: { disabled: true }
				},
				jurnal_id: { text: 'Jurnal', type: dbtype.varchar(30), null: false },
			},
			
			/*
			uniques : {
				jurnaldetil_id_ref: ['jurnaldetil_id_ref'],
			},
			*/

		}


	},

	schema: {
		title: "Jurnal",
		header: 'trn_jurnal',
		detils: {
			'detil': {
				title: 'Detil Jurnal', table: 'trn_jurnaldetil', form: true, headerview: 'jurnal_descr', 
				editorHandler: true,
				listHandler: true
			},
			'preview' : {
				title: 'Preview', table: 'trn_jurnal', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			},
			'link' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Link', table: 'trn_jurnal', form: false, 
				tabvisible: false
			},
		},
		xtions: {
			post: {
				buttonname: 'btn_post',
				buttontext: 'Post'
			},
			unpost: {
				buttonname: 'btn_unpost',
				buttontext: 'UnPost'
			}
		},
	}


}


/*



CREATE TABLE `trn_jurnal` (
	`jurnal_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_datedue` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`coa_id` varchar(20)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30)  , 
	`jurnal_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`jurnal_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnalsource_id` varchar(10) NOT NULL , 
	`jurnal_version` int(4) NOT NULL DEFAULT 0, 
	`jurnal_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_commitby` varchar(14)  , 
	`jurnal_commitdate` datetime  , 
	`jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_postby` varchar(14)  , 
	`jurnal_postdate` datetime  , 
	`jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	INDEX(`jurnal_isagingclose`),
	INDEX(`jurnal_date`),
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';

ALTER TABLE `trn_jurnal` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnal` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnal` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD KEY `jurnaltype_id` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD KEY `jurnalsource_id` (`jurnalsource_id`);

ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnaltype` FOREIGN KEY (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);
ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_jurnalsource` FOREIGN KEY (`jurnalsource_id`) REFERENCES `mst_jurnalsource` (`jurnalsource_id`);





CREATE TABLE `trn_jurnaldetil` (
	`jurnaldetil_id` varchar(14) NOT NULL , 
	`jurnaldetil_descr` varchar(255) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_outstandingidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_id_ref` varchar(14)  , 
	`jurnaldetil_dk` varchar(1) NOT NULL DEFAULT 'D', 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnaldetil` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `jurnal_id` (`jurnal_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `jurnaldetil_id_ref` (`jurnaldetil_id_ref`);

ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnaldetil` FOREIGN KEY (`jurnaldetil_id_ref`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);






CREATE VIEW view_get_jurnal_reference AS 
select 
distinct JREF.jurnal_id
from
trn_jurnaldetil JCUR inner join trn_jurnaldetil JREF on JCUR.jurnaldetil_id_ref = JREF.jurnaldetil_id


CREATE VIEW view_get_jurnal_response AS 
select 
distinct JRES.jurnal_id
from
trn_jurnaldetil JCUR inner join trn_jurnaldetil JRES on JCUR.jurnaldetil_id = JRES.jurnaldetil_id_ref;





CREATE VIEW view_jurnal AS
SELECT
A.jurnal_id,
A.jurnal_date,
A.jurnal_datedue, 
A.jurnal_descr, 
A.jurnal_ispost,
A.jurnal_isclose,
A.jurnal_isagingclose, 
B.jurnaldetil_id,
B.jurnaldetil_id_ref,
B.jurnaldetil_dk,
B.jurnaldetil_descr,
B.jurnaldetil_valfrg,
B.jurnaldetil_validr,
B.jurnaldetil_outstandingidr,
B.coa_id,
C.coatype_id,
C.coa_dk,
C.coa_name,
D.coamodel_id,
D.coamodel_isaging, 
B.dept_id,
B.partner_id,
B.curr_id,
A.periodemo_id
from trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id
				  inner join mst_coa C on C.coa_id = B.coa_id 
				  inner join mst_coamodel D on D.coamodel_id = C.coamodel_id 



*/