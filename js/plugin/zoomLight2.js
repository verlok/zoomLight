;(function($) {
    // wrap code within anonymous function: a private namespace

    // replace '$zoomLight2' and '$zoomLight2' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element
    function $zoomLight2(elem, options) {

        console.log ( "$zoomLight2: Constructor called!" );

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);

        // default options
        var defaults = {
            isMobile        : !(navigator.userAgent.match(/mobile/i) === null),
            zoomOpenClass   : 'zoomLayerVisible',
            $body           : $('body'), 
            $zoomLayer      : $('#zoomLayer'),
            $openLayer      : '#mainImage img',
            $closeLayer     : '#zoomLayer',
            $zlImg          : $("#zoomLayer img"),
            $mainImage      : $('#mainImage'),
            $openZoomBtn    : $('#mainImage').find('button'),
            interval        : null
        };

        // mix in the passed-in options with the default options
        self.options = $.extend({}, defaults, options);

        //Trace if is mobile
        console.log ( "$zoomLight2: Mobile mode %c" + self.options.isMobile, "font-weight:bold; color: red;" );

        // just some private data
        //self.count = 1;

        //
        init();

        // initialize this plugin
        function init() {
            console.log ( "$zoomLight2: Init called!" );
            // Set listener open layer
            openLayer ();
            // Set listener close layer
            closeLayer ();
        }

        //---
        function openLayer (target){
            console.log ( "$zoomLight2: OpenLayer called!" );
            var tmpTarget = test ( target, self.options.$openLayer );
            handler ( tmpTarget, "click", function(){
                self.options.$body.addClass(self.options.zoomOpenClass);
                //Desktop mode
                desktopMode ();
            });
        }

        //---
        function closeLayer (target){
            console.log ( "$zoomLight2: CloseLayer called!" );
            var tmpTarget = test ( target, self.options.$closeLayer );
            handler ( tmpTarget, "click", function(){
                self.options.$body.removeClass(self.options.zoomOpenClass);
                destroy();
            });
        }

        //---
        function test ( target, def ){
            return typeof(target) !== undefined && ( typeof(target) === "string" || typeof(target) === "object" ) ? target : def;
        }

        //--- 
        function handler (target, action, fallback){
            console.groupCollapsed ( "$zoomLight2: Handler called!" );
            console.log ( "target: ", target );
            console.log ( "action:  %c" + action, "font-weight:bold; color: red;" );
            console.log ( "fallback:", fallback );
            console.groupEnd();
            if ( typeof(target) === "string" ){
                $(target).bind(action, fallback);
            }else{
                for ( var i = 0; i < target.length; i++ ){
                    $(target[i]).bind(action, fallback);
                }
            }
        }

        //---
        function desktopMode (){
            console.log ( "%c$zoomLight2: DesktopMode called!", "font-weight:bold; color: red;" );
            if ( !self.options.isMobile ){
                setupMoveImage ();
            }
        }

        //---
        function setupMoveImage (){

            //Do not delete
            $("body, html").scrollTop(0);

            //temporary
            self.options.$zoomLayer.css( { "overflow":"hidden" } );//"display":"block", 
            self.options.$zlImg.css("position","absolute");


            //Setup info object
            var info = {
                        imgW        : self.options.$zlImg.width(),
                        imgH        : self.options.$zlImg.height(),
                        wW          : $(window).width(),
                        wH          : $(window).height(),
                        top         : 0,
                        left        : 0,
                        coordinate  : {"left":0,"top":0}
                    }
            info.top        = (info.wH-info.imgH)/2;
            info.left       = (info.wW-info.imgW)/2;
            info.coordinate.left = info.left;
            info.coordinate.top  = info.top;

            //Center image
            self.options.$zlImg.css( { "top": info.top,"left": info.left } );
            console.groupCollapsed ( "$zoomLight2: Image Centered!" );
            console.log({"top":info.top, "left":info.left});
            console.groupEnd();

            //---
            setTimeout ( function () {

                //
                info = bindMouse (info);
                //
                animation (info);
                //
                resize ( info );

            }, 500 );

        }

        //---
        function bindMouse (info){
            console.groupCollapsed ( "$zoomLight2: BindMouse called!" );//
            console.log ( info );
            //---
            self.options.$zoomLayer.bind("mousemove", function (event){
                info.coordinate.left = Math.floor((info.left*2) * (event.pageX/info.wW));
                info.coordinate.top  = Math.floor((info.top*2)  * (event.pageY/info.wH));
                return info.coordinate;
            });
            console.groupEnd();
            return info;
        }

        //---
        function animation (info){
            console.groupCollapsed ( "$zoomLight2: Animation called!" );//
            console.log ( info );
            //Set interval animation without jquery animation
            self.options.interval = setInterval ( function (){
                //console.log ( "$zoomLight2: SetInterval work!" );
                info.wW > info.imgW ? info.coordinate.left = info.left : null;
                info.wH > info.imgH ? info.coordinate.top  = info.top : null;
                //
                self.options.$zlImg.css({ "top":info.coordinate.top, "left":info.coordinate.left });
            },1);//not enter values ​​below 1, IE7 / 8 do not support it
            console.groupEnd();
        }

        //---
        function resize (info){
            console.groupCollapsed ( "$zoomLight2: Window resize called!" );//
            console.log ( info );
            //Update space
            $(window).resize(function(){
                info.imgW   = self.options.$zlImg.width();
                info.imgH   = self.options.$zlImg.height();
                info.wW     = $(window).width();
                info.wH     = $(window).height();
                info.top    = (info.wH-info.imgH)/2;
                info.left   = (info.wW-info.imgW)/2;
            });
            console.groupEnd();
        }

        //---
        function destroy (){
            console.groupCollapsed ( "$zoomLight2: Destroy called!" );//
            //
            unbindMouse ();
            //
            clearAnimation  ();

            console.groupEnd();
        }

        //---
        function unbindMouse (){
            console.log ( "$zoomLight2: UnbindMouse called!" );//
            //---
            self.options.$zoomLayer.unbind("mousemove");
        }

        //---
        function clearAnimation (){
            console.log ( "$zoomLight2: ClearAnimation called!" );//
            //Clear interval animation 
            clearTimeout(self.options.interval);
        }

        //---
        var API = {};
        API.openLayer    = openLayer;
        API.closeLayer   = closeLayer;
        API.destroy      = destroy;
        return API;    

    }

    // attach the plugin to jquery namespace
    $.fn.$zoomLight2 = function(options) {

        console.group ( "$zoomLight2 Plugin started!" );//groupCollapsed
        return this.each(function() {
            console.log ( "$zoomLight2: Instantiated!" );
            // prevent multiple instantiation
            if (!$(this).data('$zoomLight2')){
                $(this).data('$zoomLight2', new $zoomLight2(this, options));
            }
        });
        console.groupEnd();

    };

})(jQuery);