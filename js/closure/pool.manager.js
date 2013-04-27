/**
*
**/
var stack = {};
function pool ( $target, pluginName, options  ){
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
	stack[pluginName].api[method](option);
}

