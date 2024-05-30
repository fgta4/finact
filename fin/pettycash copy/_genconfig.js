'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Pettycash",
	autoid: true,
	committer: true,

	persistent: {
		'trn_pettycash' : {
			comment: 'Daftar Transaksi Pettycash',
			primarykeys: ['pettycash_id'],
			data: {
				pettycash_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				pettycash_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				site_id: {
					text:'Site', type: dbtype.varchar(20), null:false, suppresslist: true,
					options:{required:true, invalidMessage:'Site Biaya harus diisi', prompt:'-- PILIH --', disabled: true },
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list-byuser'})
				},	
				accpettycash_id: {
					text:'Account', type: dbtype.varchar(17), null:false, suppresslist: true,
					options:{required:true, invalidMessage:'Account harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accpettycash', 
						field_value: 'accpettycash_id', field_display: 'accpettycash_name', 
						api: 'finact/master/accpettycash/list'})
				},	
				pettycash_descr: {text:'Descr', type: dbtype.varchar(255), options:{required:true,invalidMessage:'Descr harus diisi'}},


				empl_id: {
					text:'Employee', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/master/empl/list'})
				},

				cust_id: {
					text:'Customer', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_cust', 
						field_value: 'cust_id', field_display: 'cust_name', 
						api: 'crm/master/cust/list'})
				},				

				pettycash_value: { text: 'Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },

				pettycash_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				pettycash_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				pettycash_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				pettycash_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

			}

		}

	},

	schema: {
		title: 'Saldo Awal Pettycash',
		header: 'trn_pettycash',
		detils: {}
	}
}


/*

	function __construct() {
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
	}

	if (!\property_exists($userdata, 'empl_id')) {
		echo "Pettycash tidak dapat dibuka. Kode employee belum di set pada user anda";
		var_dump($userdata);
		throw new \Exception(""); 
	}

	$empl = \FGTA4\utils\SqlUtility::LookupRow($userdata->empl_id, $this->db, 'mst_empl', 'empl_id');	
	$site_id = $empl['site_id'];
	$site_name = \FGTA4\utils\SqlUtility::Lookup($site_id, $this->db, 'mst_site', 'site_id', 'site_name');	



	// parameter=parameter yang bisa diakses langsung dari javascript module
	// dengan memanggil variable global.setup.<namavariable>
	$this->setup = (object)array(
		'print_to_new_window' => false,
		'username' => $userdata->username,
		'site_id' => $site_id,
		'site_name' => $site_name
	);


*/