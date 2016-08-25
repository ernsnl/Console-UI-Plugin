(function($) {

    // Console Class Definition
    var ConsoleCls = function(obj, settings) {
        this.console_elem = obj;
        this.console_settings = settings;
        this.init();
    };

    // Init a Class which will create the Console
    ConsoleCls.prototype.init = function() {
        this.defineProperties();
        $(this.console_elem).append(this.console_settings.console_welcome_message);
        $(this.console_elem).append("<p class='command-line'>" + "<span class='console_directory_message'>" + this.console_settings.console_directory_message + ": </span>" + "</p>");

        //Adding Element for Necessary Console Behaviors
        this.addInputBox();
        this.setCursorIndicator();
    };

    // For Defining CSS Properties
    ConsoleCls.prototype.defineProperties = function() {
        if (this.console_settings.use_custom_height)
            $(this.console_elem).css("height", this.console_settings.custom_height);
        else
            $(this.console_elem).css("height", 400);

        $(this.console_elem).addClass(this.console_settings.class_name);
    };

    ConsoleCls.prototype.addInputBox = function() {
        if ($(this.console_elem).find(".console-input-box").length > 0) {
            $(this.console_elem).find(".console-input-box").remove();
        } else {
            $(this.console_elem).find(".command-line").append("<input type='text' class='console-input-box'/>");
            $(this.console_elem).find(".console-input-box").keypress(function(event) {
                this.handleKeyPress(event);
            });
        }
    };

    // Creating a cursor indicator for console application
    ConsoleCls.prototype.setCursorIndicator = function() {
        if ($(this.console_elem).find(".cursor-indicator").length > 0) {
            $(this.console_elem).find(".cursor-indicator").remove();
        } else {
            $(this.console_elem).find(".command-line").append("<span class='cursor-indicator active-console'></span>");
        }
    };


    ConsoleCls.prototype.handleKeyPress = function(event) {
        console.log('Key Pressed');
    };

    $.fn.console = function(options) {
        // This is the easiest way to have default options.
        var settings = $.extend({}, $.fn.console.defaults, options);
        return this.each(function() {
            var console = new ConsoleCls(this, settings);
        });
    };

})(jQuery);

// Defaults settings
$.fn.console.defaults = {
    class_name: "console",
    console_welcome_message: "Welcome the Console",
    console_directory_message: "Example/ConsolePlugin",
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
