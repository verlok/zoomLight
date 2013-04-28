;
(function($) {
    // wrap code within anonymous function: a private namespace

    // replace 'testPlugin' and 'testPlugin' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element

    function testPlugin(elem, options) {

        console.log("TestPlugin: Constructor");

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);
        //
        init();

        // initialize this plugin

        function init() {
            console.log("TestPlugin: Init");
        }

        //---

        function testPublicMethod() {
            console.log("TestPlugin: Test Public Method"); //
        }

        //---
        var API = {};
        API.testPublicMethod = testPublicMethod;
        return API;

    }

    // attach the plugin to jquery namespace
    $.fn.testPlugin = function(options) {
        return this.each(function() {
            console.group("%cTestPlugin Plugin started!", "font-weight:bold; color: blue;"); //groupCollapsed
            // prevent multiple instantiation
            if (!$(this).data('testPlugin')) {
                $(this).data('testPlugin', new testPlugin(this, options));
            }
            console.groupEnd();
        });

    };

})(jQuery);