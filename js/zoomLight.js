;(function($) {
    // wrap code within anonymous function: a private namespace

    // replace 'MyPlugin' and 'myplugin' below in your own plugin...

    // constructor function for the logical object bound to a
    // single DOM element
    function zoomLight(elem, options) {

        // remember this object as self
        var self = this;
        // remember the DOM element that this object is bound to
        self.$elem = $(elem);

        // default options
        var defaults = {
            msg: "You clicked me!"
        };
        // mix in the passed-in options with the default options
        self.options = $.extend({}, defaults, options);

        // just some private data
        self.count = 1;

        init();

        // initialize this plugin
        function init() {

            // set click handler
            self.$elem.click(click_handler);
        }

        // private click handler
        function click_handler(event) {
            alert(self.options.msg + " " + self.count);
            self.count += 1;
        }

        // public method to change msg
        function change_msg(msg) {
            self.options.msg = msg;
        }

        // define the public API
        var API = {};
        API.change_msg = change_msg;
        return API;
    }

    // attach the plugin to jquery namespace
    $.fn.zoomLight = function(options) {
        return this.each(function() {
            // prevent multiple instantiation
            if (!$(this).data('zoomLight'))
                $(this).data('zoomLight', new MyPlugin(this, options));
        });
    };
})(jQuery);