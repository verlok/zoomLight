var application = {
	"pool": pool,
	"callApi": callApi,
	"viewApi": viewApi,
	"stack": []
};
//console.log(application)

/**
 *
 **/

function pool($target, pluginName, options) {
	//console.group ( "Pool requested"  );
	//console.log ( "target: 		", $target );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "options: 	", options );
	//console.groupEnd();
	//	
	var tmpStack = {};
	$target[pluginName](options);
	// Get the API to the plugin object
	var api = $target.data(pluginName);
	tmpStack.pluginName = pluginName;
	tmpStack.api = api;
	tmpStack.target = $target;
	//
	application.stack[pluginName] = tmpStack;
	tmpStack = null;
}

/**
 *
 **/

function callApi(pluginName, method, option) {
	//console.group ( "Call Api requested"  );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "method:  	", method );
	//console.log ( "options: 	", option );
	//console.groupEnd();
	application.stack[pluginName].api[method](option);
}

/**
 *
 **/

function viewApi(pluginName, functionShow) {
	//console.group ( "View Api requested"  );
	//console.log ( "pluginName:  ", pluginName );
	//console.log ( "method:  	", method );
	//console.log ( "options: 	", option );
	//console.groupEnd();
	if (typeof(application.stack[pluginName]) !== "undefined") {
		if (Object.keys(application.stack[pluginName].api).length === 0) {
			console.log("Sorry no API found!");
		} else {
			console.log(application.stack[pluginName].api);
			if (typeof(functionShow) !== "undefined" && functionShow) {
				for (var i in application.stack[pluginName].api) {
					console.log(application.stack[pluginName].api[i]);
				}
			}
		}
	} else {
		console.log("Sorry no PLUGIN found!");
	}

}