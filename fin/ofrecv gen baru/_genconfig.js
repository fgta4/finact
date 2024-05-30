'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Official Receipt",
	autoid: true,
	idprefix: 'OR',
	printing: true,
	committer: true,

	persistent: {
		'trn_jurnal': {
			comment: 'Daftar Jurnal',
			primarykeys: ['jurnal_id'],
			data: {
				jurnal_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				jurnaltype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Jurnal Type harus diisi', prompt:'-- PILIH --', disabled: true},
					comp: comp.Combo({
						table: 'mst_jurnaltype', 
						field_value: 'jurnaltype_id', field_display: 'jurnaltype_name', 
						api: 'finact/master/jurnaltype/list'})
				},

				jurnal_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list'
					})				
				},				

				jurnal_date: { text: 'Date', type: dbtype.date, null: false },

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, hidden: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},
				
				temprecv_id : {
					text: 'Tanda Terima', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_temprecv',
						field_value: 'temprecv_id', field_display: 'temprecv_descr',
						api: 'finact/collection/temprecv/list'
					})
				},

				ar_jurnaldetil_id: {
					text: 'Outstanding AR', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr',
						api: 'finact/fin/ofrecv/list-getoutstandingar'
					})
				},


				jurnal_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				paymtype_id: {
					text: 'Tipe Pembayaran', type: dbtype.varchar(6), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Pembayaran harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_paymtype',
						field_value: 'paymtype_id', field_display: 'paymtype_name',
						api: 'finact/master/paymtype/list'
					})
				},

				bankrekening_id: { 
					text: 'Rekening Bank', type: dbtype.varchar(20), null: true, suppresslist: true, 
					options: { prompt:'NONE'}, 
					comp: comp.Combo({
						table: 'mst_bankrekening',
						field_value: 'bankrekening_id', field_display: 'bankrekening_name',
						api: 'finact/master/bankrekening/list'
					})				
				},					

				paym_gironum: { text: 'No Giro / Cek', type: dbtype.varchar(90), null: true, suppresslist: true },
				paym_girodate: { text: 'Tgl Cair Giro', type: dbtype.date, null: false, suppresslist: true },



				accfin_id: {
					text: 'Akun Finance', type: dbtype.varchar(20), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Akun Finance harus diisi',   prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accfin',
						field_value: 'accfin_id',
						field_display: 'accfin_name',
						api: 'finact/master/accfin/list'
					})
				},


				jurnal_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true,  hidden: true, options: { required: true , disabled: true} },
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --', disabled: true},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				jurnal_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, hidden: true,  options: { required: true , disabled: true} },
				jurnal_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, hidden: true, options: { required: true , disabled: true} },

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:true, suppresslist: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, hidden: true, 
					options:{prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},				

				jurnalsource_id: {
					text:'Source', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Source harus diisi', prompt:'-- PILIH --', disabled: true},
					comp: comp.Combo({
						table: 'mst_jurnalsource', 
						field_value: 'jurnalsource_id', field_display: 'jurnalsource_name', 
						api: 'finact/master/jurnalsource/list'})
				},	
				
				jurnal_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				jurnal_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				jurnal_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				jurnal_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				jurnal_ispost: { text: 'Posted', type: dbtype.boolean, null: false, default: '0', suppresslist: true, unset:true, options: { disabled: true } },
				jurnal_postby: { text: 'Post By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				jurnal_postdate: { text: 'Post Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				jurnal_isclose: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				jurnal_isagingclose: { text: 'Aging Closed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, unset:true, options: { disabled: true } },
			
			},
			
			defaultsearch: ['jurnal_id', 'jurnal_descr']
		},

		'trn_jurnaldetil' : {
			comment: 'Jurnal Detil',
			primarykeys: ['jurnaldetil_id'],		
			data: {
				jurnaldetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},

				jurnaldetil_id_ref: {
					text: 'Ref', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_jurnaldetil',
						field_value: 'jurnaldetil_id', field_display: 'jurnaldetil_descr',
						api: 'finact/fin/ofrecv/list-getoutstandingar'
					})
				},

				jurnaldetil_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, uppercase: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				jurnaldetil_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				jurnaldetil_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				jurnaldetil_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Account Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: false,
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},

				jurnal_id: { text: 'Jurnal', type: dbtype.varchar(14), null: false },
			}	
		},

		'trn_jurnalreferece': { 
			comment: 'Jurnal Detil',
			primarykeys: ['jurnalreferece_id'],		
			data: {
				jurnalreferece_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				jurnal_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },
				jurnal_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				jurnal_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				jurnal_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				jurnal_id: { text: 'Jurnal', type: dbtype.varchar(14), null: false },
			}
		},

		'trn_jurnalresponse': { 
			comment: 'Jurnal Detil',
			primarykeys: ['jurnalresponse_id'],		
			data: {
				jurnalresponse_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				jurnal_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },
				jurnal_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				jurnal_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				jurnal_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				jurnal_id: { text: 'Jurnal', type: dbtype.varchar(14), null: false },
			}
		}		
	},

	schema: {
		header: 'trn_jurnal',
		detils: {
			'detil': {title: 'Detil', table: 'trn_jurnaldetil', form: true, headerview: 'jurnal_descr' },
			'recv': {title: 'Penerimaan', table: 'trn_jurnaldetil', form: true, headerview: 'jurnal_descr' },
			'reference' : {title:'Reference', table:'trn_jurnalreferece', form: true, headerview: 'jurnal_descr'},
			'response' : {title:'Response', table:'trn_jurnalresponse', form: true, headerview: 'jurnal_descr'}
		}
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