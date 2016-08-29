// TO DO: ADDING AJAX

(function($) {
    $.fn.console = function(options) {
        // This is the easiest way to have default options.
        var settings = $.extend({}, $.fn.console.defaults, options);
        return this.each(function() {
          console.log(this);
            var consoleP = new ConsoleCls(this, settings);
            consoleP.init();
        });
    };

})(jQuery);

// Defaults settings
$.fn.console.defaults = {
    class_name: "console",
    console_welcome_message: "Welcome the Console",
    console_directory: {
        "main": {
            "dir1": {},
            "dir2": {}
        }
    },
    showLineNumbers: true,
    use_custom_height: false,
    custom_height: 0,
};
