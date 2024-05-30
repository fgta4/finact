<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class SCENARIO {
	public static $id;
	public static $username;
	public static $param;

	public static function Run() {
		require __DIR__ . '/../apis/xtion-importhemoving.php';
		
		
		
		SCENARIO::$username = '5effbb0a0f7d1';  // MANAGER
		// SCENARIO::$username = '5facb8a36127f';  // GM
		// SCENARIO::$username = '5facb8bebf826';  // DIREKTUR
		
		
		SCENARIO::$param = (object)[
			'region_id' => '03700',
			'ym' => '2022-01'
		];
		
		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => SCENARIO::$username
				];
			}			
		};
		$API->useotp = false;
		$API->reqinfo = (object)['modulefullname'=>'finact/items/itemmove'];
		$result = $API->execute(SCENARIO::$param);
	}
}


console::class(new class($args) extends clibase {
	function execute() {
		SCENARIO::Run();
	}
});
