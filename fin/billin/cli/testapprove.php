<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class TEST {
	public static $id;
	public static $username;

	public function RunSkenario() {
		require __DIR__ . '/../apis/xtion-approve.php';
		TEST::$id = 'PA20120005';
		TEST::$username =  '5effbb0a0f7d1';
		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => TEST::$username
				];
			}			
		};
		$result = $API->execute(TEST::$id);
	}
}


console::class(new class($args) extends cli {
	function execute() {
		TEST::RunSkenario();
	}
});
