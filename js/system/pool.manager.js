/**
*
**/
var stack = {};
function pool ( $target, pluginName, options  ){
	/*console.group ( "Pool requested"  );
	console.log ( "target: 		", $target );
	console.log ( "pluginName:  ", pluginName );
	console.log ( "options: 	", options );
	console.groupEnd();*/
	//	
	var tmpStack = {};
	$target[pluginName](options);
	// Get the API to the plugin object
	var api = $target.data(pluginName);
	tmpStack.pluginName 	= pluginName;
	tmpStack.api 			= api;
	tmpStack.target			= $target;
	//
	stack[pluginName] 		= tmpStack;
	tmpStack				= null;
}

/**
*
**/
function callApi ( pluginName, method, option ){
	/*console.group ( "CallApi requested"  );
	console.log ( "pluginName:  ", pluginName );
	console.log ( "method:  	", method );
	console.log ( "options: 	", option );
	console.groupEnd();*/
	stack[pluginName].api[method](option);
}

