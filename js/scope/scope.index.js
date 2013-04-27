/**
*
**/
$(function() {

	console.group ( "Scope Index started!" );
    
	try {

		//---
		var options = {
			$openLayer	: ['#mainImage img', "#mainImage button"]
		};
		//---
		pool ( $("body"), "zoomLight", options );
		//---
		callApi ( "zoomLight", "openLayer", "#mainImage button" );

	}catch (e){
		//console.error(e);
		console.error ( "Scope Index error!" );
	}
	
	console.groupEnd();

});

