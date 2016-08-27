// TO DO: ADDING AJAX

(function($) {

    // Console Class Definition
    var ConsoleCls = function(obj, settings) {
        this.console_elem = obj;
        this.console_settings = settings;

        // TO DO: ADD MAIN Command
        // TO DO: DEFINE MAIN DIR
        this.console_commands = [];
        this.console_dir = {};
    };

    ConsoleCls.prototype.self = function() {
        return this;
    }

    // Init a Class which will create the Console
    ConsoleCls.prototype.init = function() {
        this.defineProperties();
        $(this.console_elem).append(this.console_settings.console_welcome_message);
        $(this.console_elem).append("<p class='command-line'>" + "<span class='console_directory_message'>" + this.console_settings.console_directory + ": </span>" + "</p>");

        // Adding Element for Necessary Console Behaviors
        this.addInputBox();
        this.setCursorIndicator();

        // TO DO: ADD SETTING COMMANDS
        // TO DO: ADD DIR SPECIAL COMMANDS
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
            $(this.console_elem).find(".console-input-box").bind("keypress", this.handleKeyPress);
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
        // TO DO: Custom key press function

        // Order of key stroke : Custom Dir Special -> Custom General Special -> Default Dir Special -> Default
        // Unchangable ones: Enter, Delete, Home, End, Up, Down, Left, PageUp, PageDown, Backspace

        // Movement: Up, Down, Left, Right, Home, End, PageUp, PageDown,
        // Deleting: Delete, Backspace
        // Handling: Enter,
        // Rest: Currently input
        if(event.keyCode == 13){
          this.handleCommands('Enter');
        }
        console.log('Key Pressed');
    };

    ConsoleCls.prototype.handleCommands = function(cmd){
      console.log('Command Triggered: ' + cmd);

    };

    $.fn.console = function(options) {
        // This is the easiest way to have default options.
        var settings = $.extend({}, $.fn.console.defaults, options);
        return this.each(function() {
            var console = new ConsoleCls(this, settings);
            console.init();
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
