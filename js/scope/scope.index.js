/**
 *
 **/
$(function() {

	console.group("Scope Index started!");

	try {

		//---
		var options = {
			openLayer: ['#mainImage img', "#mainImage button", "#container h1"]
		};
		//---
		pool($("body"), "zoomLight", options);
		//---
		pool($("#test"), "testPlugin", {});

		//Example button enabled open layer
		//callApi ( "zoomLight", "openLayer", "#mainImage button" );

		//Example delayed button enabled open layer
		/*setTimeout ( function (){
			callApi ( "zoomLight", "openLayer", "#mainImage button" );
		}, 10000);*/

		//Example delayed change src
		/*setTimeout ( function (){
			//callApi ( "zoomLight", "changeSrc", "images/41340481nd_15n_fsad_h.jpg" );//Error
			callApi ( "zoomLight", "changeSrc", "images/41340481nd_15n_f_h.jpg" );
		}, 3000);*/

	} catch (e) {
		//console.error(e);
		console.error("Scope Index error!");
		console.error(e);
	}

	console.groupEnd();

});