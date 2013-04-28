;
(function($) {
    // wrap code within anonymous function: a private namespace

    // replace 'zoomLight' and 'zoomLight' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element

    function zoomLight(elem, options) {

        console.log("ZoomLight: Constructor");

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);

        // default options
        var defaults = {
            isDesktop: detectAgent(),
            zoomOpenClass: 'zoomLayerVisible',
            openLayer: '#mainImage img',
            closeLayer: '#zoomLayer',
            $preloader: $('#preloader'),
            $body: $('body'),
            $zoomLayer: $('#zoomLayer'),
            $zlImg: $("#zoomLayer #zoomImage"),
            $mainImage: $('#mainImage'),
            $openZoomBtn: $('#mainImage').find('button'),
            interval: null
        };

        // mix in the passed-in options with the default options
        self.options = $.extend({}, defaults, options);

        //Trace if is mobile
        console.log("ZoomLight: Mobile mode %c" + self.options.isDesktop, "font-weight:bold; color: red;");

        // just some private data
        //self.count = 1;

        //
        init();

        // initialize this plugin

        function init() {
            console.log("ZoomLight: Init");
            // Set listener open layer
            openLayer();
            // Set listener close layer
            closeLayer();
        }

        //---

        function detectAgent() {
            console.log("ZoomLight: DetectAgent");
            var promise = false;
            if (navigator.userAgent.match(/mobile/i) !== null) {
                return promise = true;
            } else if (navigator.userAgent.match(/Macintosh/i) !== null) {
                return promise = true;
            }
            return promise;
        }

        //---

        function openLayer(target) {
            console.log("ZoomLight: OpenLayer");
            var tmpTarget = test(target, self.options.openLayer);
            handler(tmpTarget, "click", function() {
                self.options.$body.addClass(self.options.zoomOpenClass);
                //Do not delete
                $("body, html").scrollTop(0);
                //Desktop mode
                if (!self.options.isDesktop) {
                    desktopMode();
                }
            });
        }

        //---

        function closeLayer(target) {
            console.log("ZoomLight: CloseLayer");
            var tmpTarget = test(target, self.options.closeLayer);
            handler(tmpTarget, "click", function() {
                self.options.$body.removeClass(self.options.zoomOpenClass);
                //Desktop mode
                if (!self.options.isDesktop) {
                    destroy();
                }
            });
        }

        //---

        function test(target, def) {
            console.groupCollapsed("ZoomLight: Test");
            var promise = typeof(target) !== undefined && (typeof(target) === "string" || typeof(target) === "object") ? target : def
            console.log("promise: ", promise);
            console.groupEnd();
            return promise;
        }

        //--- 

        function handler(target, action, fallback) {
            console.groupCollapsed("ZoomLight: Handler");
            console.log("target: ", target);
            console.log("action:  %c" + action, "font-weight:bold; color: red;");
            console.log("fallback:", fallback);

            if (typeof(target) === "string") {
                $(target).bind(action, fallback);
            } else {
                for (var i = 0; i < target.length; i++) {
                    var tmp = target[i].replace(/\s+/g, '');
                    //console.log( tmp.substr(tmp.length-3,tmp.length-1) );
                    if (tmp.substr(tmp.length - 3, tmp.length - 1) === "img") {
                        $(target[i]).bind(action, fallback);
                    } else {
                        var id = $(target[i]).data("reference");
                        if (typeof(id) != "undefined") {
                            $(target[i]).bind(action, function() {
                                $("#" + id)[action]();
                            });
                        }
                    }
                }
            }

            console.groupEnd();

        }

        //---

        function changeSrc(src) {
            console.groupCollapsed("ZoomLight: Change Source");
            console.log("src: ", src);

            //
            self.options.$zlImg.fadeOut('slow'); //.css("opacity",0.01);
            self.options.$preloader.fadeIn('slow');
            var img = new Image();
            $(img).load(function() {
                setTimeout(function() {
                    self.options.$preloader.fadeOut('slow');
                    self.options.$zlImg.attr("src", src);
                    $(window).resize();

                    var info = getSpace({});
                    centerImage(info);

                    self.options.$zlImg.fadeIn('slow') //.css("opacity",1);
                }, 2000);
            }).error(function() {
                // notify the user that the image could not be loaded
                self.options.$preloader.fadeOut('slow');
                self.options.$zlImg.fadeIn('slow') //.css("opacity",1);
                console.error("error");
            }).attr('src', src);
            console.groupEnd();
        }

        //---

        function desktopMode() {
            console.log("%cZoomLight: DesktopMode", "font-weight:bold; color: green;");
            setupMoveImage();
        }

        //---

        function setupMoveImage() {

            //temporary
            self.options.$zoomLayer.css({
                "overflow": "hidden"
            }); //"display":"block", 
            self.options.$zlImg.css("position", "absolute");


            //Setup info object
            var info = {
                imgW: self.options.$zlImg.width(),
                imgH: self.options.$zlImg.height(),
                wW: $(window).width(),
                wH: $(window).height(),
                top: 0,
                left: 0,
                coordinate: {
                    "left": 0,
                    "top": 0
                }
            }
            info.top = (info.wH - info.imgH) / 2;
            info.left = (info.wW - info.imgW) / 2;
            info.coordinate.left = info.left;
            info.coordinate.top = info.top;

            //---
            centerImage(info);

            //---
            setTimeout(function() {

                //
                info = bindMouse(info);
                //
                animation(info);
                //
                resize(info);

            }, 500);
        }

        //---

        function centerImage(info) {
            //Center image
            self.options.$zlImg.css({
                "top": info.top,
                "left": info.left
            });
            console.groupCollapsed("ZoomLight: Image Centered!");
            console.log({
                "top": info.top,
                "left": info.left
            });
            console.groupEnd();
        }

        //---

        function bindMouse(info) {
            console.groupCollapsed("ZoomLight: BindMouse"); //
            console.log(info);
            //---
            self.options.$zoomLayer.bind("mousemove", function(event) {
                info.coordinate.left = Math.floor((info.left * 2) * (event.pageX / info.wW));
                info.coordinate.top = Math.floor((info.top * 2) * (event.pageY / info.wH));
                return info.coordinate;
            });
            console.groupEnd();
            return info;
        }

        //---

        function animation(info) {
            console.groupCollapsed("ZoomLight: Animation"); //
            console.log(info);
            //Set interval animation without jquery animation
            self.options.interval = setInterval(function() {
                //console.log ( "ZoomLight: SetInterval work!" );
                info.wW > info.imgW ? info.coordinate.left = info.left : null;
                info.wH > info.imgH ? info.coordinate.top = info.top : null;
                //
                self.options.$zlImg.css({
                    "top": info.coordinate.top,
                    "left": info.coordinate.left
                });
            }, 1); //not enter values ​​below 1, IE7 / 8 do not support it
            console.groupEnd();
        }

        //---

        function resize(info) {
            console.groupCollapsed("ZoomLight: Window resize"); //
            console.log(info);
            //Update space
            $(window).resize(function() {
                getSpace(info);
            });
            console.groupEnd();
        }

        //---

        function getSpace(info) {
            console.groupCollapsed("ZoomLight: Get Space");
            info.imgW = self.options.$zlImg.width();
            info.imgH = self.options.$zlImg.height();
            info.wW = $(window).width();
            info.wH = $(window).height();
            info.top = (info.wH - info.imgH) / 2;
            info.left = (info.wW - info.imgW) / 2;
            console.log("info:", info);
            console.groupEnd();
            return info;
        }

        //---

        function destroy() {
            console.groupCollapsed("ZoomLight: Destroy"); //
            //
            unbindMouse();
            //
            clearAnimation();

            console.groupEnd();
        }

        //---

        function unbindMouse() {
            console.log("ZoomLight: UnbindMouse"); //
            //---
            self.options.$zoomLayer.unbind("mousemove");
        }

        //---

        function clearAnimation() {
            console.log("ZoomLight: ClearAnimation"); //
            //Clear interval animation 
            clearTimeout(self.options.interval);
        }

        //---
        var API = {};
        API.openLayer = openLayer;
        API.closeLayer = closeLayer;
        API.changeSrc = changeSrc;
        return API;

    }

    // attach the plugin to jquery namespace
    $.fn.zoomLight = function(options) {
        return this.each(function() {
            console.group("%cZoomLight Plugin started!", "font-weight:bold; color: blue;"); //groupCollapsed
            // prevent multiple instantiation
            if (!$(this).data('zoomLight')) {
                $(this).data('zoomLight', new zoomLight(this, options));
            }
            console.groupEnd();
        });

    };

})(jQuery);