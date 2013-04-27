$(function() {

	var ua = navigator.userAgent.toLowerCase();
	var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4)));

	var zoomOpenClass = 'zoomLayerVisible',
		$body = $('body'),
		$zoomLayer = $('#zoomLayer'),
		$mainImage = $('#mainImage'),
		$openZoomBtn = $mainImage.find('button'),
		$smallImage = $mainImage.find('img');

	$openZoomBtn
		.add($smallImage)
		.on('click', function() {
			$body.addClass(zoomOpenClass);
			isDesktopMode(); 
		});

	$zoomLayer
		.on('click', function() {
			$body.removeClass(zoomOpenClass);
		});

		//isDesktopMode() 

	function isDesktopMode (){
	
 	    console.count("isDesktopMode");
 
		$("body, html").scrollTop(0);

		//Desktop
		if ( isDesktop ){

			console.groupCollapsed("Start desktop mode ");
			

			//---
			isDesktop = false;

			//temporary
			$("#zoomLayer").css( { "overflow":"hidden" } );//"display":"block", 
			$("#zoomLayer img").css("position","absolute");
			console.log("temporary mode enabled");

			//Setup vars
			var $zlImg 		= $("#zoomLayer img"),
				imgW 		= $zlImg.width(),
				imgH 		= $zlImg.height(),
				wW 			= $(window).width(),
				wH 			= $(window).height(),
				top 		= (wH-imgH)/2,
				left 		= (wW-imgW)/2,
				coordinate	= {"left":left,"top":top}
				resized 	= false,
				info		= {};

			//---
			$(document).bind("keypress",function(e) { 
				console.groupCollapsed("Keypress Event ");
 	    		console.count("Number of times keypress: ");
 	    		console.log ( "KeyCode: " + e.keyCode);
			    //if (e.which == 13) { $('.save').click(); }    // enter (works as expected)
			    // esc   (does not work)
			    if (e.keyCode  == 27) { 
			    	$body.removeClass(zoomOpenClass);
			    	console.log ( "Required action: close zoom");
			    }else if (e.keyCode  == 122 || e.keyCode  == 114 ) { 
			    	console.log ( "Required action: resize image");
			    	$("#resize").trigger("click");
			    }
				console.groupEnd();
			});


			//Center image
			$zlImg.css( { "top": top,"left": left } );
			console.log("Image Centered ", {"top":top, "left":left});

			//---
			setTimeout ( function () { 

				//---
				$("#zoomLayer").bind("mousemove", function (event){
					coordinate.left = Math.floor((left*2) * (event.pageX/wW));
					coordinate.top  = Math.floor((top*2)  * (event.pageY/wH));
					//Basic mouse move image without jquery animation
					//$zlImg.css({ "top":coordinate.top, "left":coordinate.left });
					//jQuery swing easy animation
					/*$zlImg.stop(true).animate({
				        'top': coordinate.top,
				        'left': coordinate.left
				    }, 1, 'swing');*/
				});

				//Set interval animation without jquery animation
				var i = setInterval ( function (){
					if ( !resized ){
						wW > imgW ? coordinate.left = left : null;
						wH > imgH ? coordinate.top = top : null;
						//
						$zlImg.css({ "top":coordinate.top, "left":coordinate.left });
					}
				},1);//not enter values ​​below 1, IE7 / 8 do not support it


				//Update space
				$(window).resize(function(){
					imgW= $zlImg.width();
					imgH= $zlImg.height();
					wW 	= $(window).width();
					wH 	= $(window).height();
					top = (wH-imgH)/2;
					left= (wW-imgW)/2;
				});

			}, 500 );

			//
			$("#resize").bind("click",function(e){
				e.preventDefault();
				e.stopImmediatePropagation();

				var param1 = {"delay":0};
				var param2 = {"delay":0};

				if( !resized ){

					resized = true;

					var resizeW = imgW > imgH;

					info.width = $zlImg.width();
					info.height = $zlImg.height();

					if ( resizeW ){

						$zlImg.css("height","auto");

						param1 = { "target":$zlImg, "option":{"width":wW}, "fallback": $(window).resize(), "time": 250, "delay":0 };
						customAnimation ( param1 );

						param2 = { "target":$zlImg, "option":{"width":wW}, "fallback": null, "time": 250, "delay":250 };
						customAnimation ( param2 );

					}else{

						$zlImg.css("width","auto");

						param1 = { "target":$zlImg, "option":{"height":wH}, "fallback": $(window).resize(), "time": 250, "delay":0 };
						customAnimation ( param1 );

						param2 = { "target":$zlImg, "option":{"width":wW}, "fallback": null, "time": 250, "delay":250 };
						customAnimation ( param2 );

					}

				}else{

					param1 = { "target":$zlImg, "option":{"width":info.width,"height" : info.height}, "fallback": function (){ 
																													$(window).resize();
																													wW > imgW ? coordinate.left = left : null; 
																													wH > imgH ? coordinate.top = top : null;
																												}, "time": 250, "delay":0 };
					customAnimation ( param1 );

					param2 = { "target":$zlImg, "option":{"width":wW}, "fallback": function (){ 
																						$(window).resize();
																						wW > imgW ? coordinate.left = left : null;
																						wH > imgH ? coordinate.top = top : null;
																					}, "time": 250, "delay":250 };
					customAnimation ( param2 );
					
				}
								
			});

			console.groupEnd();

		}

		function customAnimation ( param ){
			param.target ? (param.target).delay(param.delay).animate ( param.option, param.time, param.fallback ) : null;
		}

	}

}());