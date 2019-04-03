<?php
	if (!isset($_REQUEST['cmd'])) {
		echo '{"result": 0, "message": "Command not entered"}';
	}
	else {$command = $_REQUEST['cmd'];
		switch($command) {
			case 1:
			searchRecipe();
			break;

			default:
			echo "wrong cmd";
			break;
		}
	}


function searchRecipe(){
	if ($_REQUEST['Name']=="") {
		echo '{"result":0, "message": "No Name was given}';
		return;
	}
	
	include_once("recipes.php");
	$obj = new recipe();
	$name = $_REQUEST['Name'];
	$result = $obj->searchRecipe($name);

	//print($result);

	if ($result==false) {
		echo '{"result":0 ,"message": "Could not load Recipes"}';
	}
	else {
		$row=$obj->fetch();
		echo '{"result":1,"pool":[';
		while($row){
			echo json_encode($row);

			$row=$obj->fetch();
			if($row!=false){
				echo ",";
			}
		}
		echo "]}";	
	}
}


?>