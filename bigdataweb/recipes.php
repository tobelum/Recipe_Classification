<?php
/**
*/
include_once("adb.php");
/**
*Diagnosis class
*/
class recipe extends adb{
	function recipe(){
	}
	
	
	
	/**
	*gets recipe's nutrients based on the filter
	*@param string mixed condition to filter. If  false, then filter will not be applied
	*@return boolean true if successful, else false
	*/
	function getRecipe($filter=false){
		$strQuery="select Name, energy,fat,saturatedfat,transfat,cholestrol,carbohydrates,sugars,fiber,proteins,salt,sodium,vitamina,vitaminc,calcium,iron
					from recipes";
		if($filter!=false){
			$strQuery=$strQuery . " where $filter limit 12";
		}
		return $this->query($strQuery);
	}
	
	/**
	*Searches for diagnosis by specificPatient_id 
	*@param string text search text
	*@return boolean true if successful, else false
	*/
	function searchRecipe($text=false){
		$filter=false;
		if($text!=false){
			$filter="Name like '%$text%'";
		}
		
		return $this->getRecipe($filter);
	}
	

	}
?>