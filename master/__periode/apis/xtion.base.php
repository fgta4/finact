<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/apps/finact/acct/jurnal/apis/xtion.jurnal.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


class PeriodeXtionBase extends WebAPI {

	function get_periode_upper($periodemo_id) {
		return (object)[
			"exist" => true,
			"isclosed" => false
		];
	}

	function get_periode_lower($periodemo_id) {
		return (object)[
			"exist" => true,
			"isclosed" => true
		];
	}

}