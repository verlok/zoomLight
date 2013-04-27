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
		//Example button enabled open layer
		//callApi ( "zoomLight", "openLayer", "#mainImage button" );
		//Example delayed button enabled open layer
		/*setTimeout ( function (){
			callApi ( "zoomLight", "openLayer", "#mainImage button" );
		}, 10000);*/
		setTimeout ( function (){
			callApi ( "zoomLight", "changeSrc", "http://hidefwalls.com/wp-content/g/hd-2/car1.jpg" );
		}, 3000);
	}catch (e){
		//console.error(e);
		console.error ( "Scope Index error!" );
	}
	
	console.groupEnd();

});

