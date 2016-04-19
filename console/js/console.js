(function($) {

    $.fn.console = function(options) {


        // This is the easiest way to have default options.
        var settings = $.extend({}, $.fn.console.defaults, options);

        return this.each(function() {
            var elem = $(this);
            $.fn.console.create(elem, settings);
            setCursorIndicator(elem);
        });

    };

}(jQuery));

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

$.fn.console.create = function(elem, settings) {
    $.fn.console.define_properties(elem, settings);

    elem.append(settings.console_welcome_message);
    elem.append("<p class='command-line'>" + "<span class='console_directory_message'>" + settings.console_directory_message + ": </span>" + "</p>");
};

$.fn.console.define_properties = function(elem, settings) {
    if (elem.innerWidth() < 600)
        throw "Element width cannot be smaller than 600 px";
    if (settings.use_custom_height)
        elem.css("height", settings.custom_height);
    else
        elem.css("height", 400);

    elem.addClass(settings.class_name);
};

function setCursorIndicator(elem) {
    if ($(elem).find(".cursor-indicator").length > 0) {
        $(elem).find(".cursor-indicator").remove();
    } else {
        $(elem).find(".command-line").append("<span class='cursor-indicator'>B</span>");
    }
}
