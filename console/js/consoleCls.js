var consoleDefaults = {
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
    custom_height: 0
};


// Console Class Definition
var self;
var ConsoleCls = function(selector, settings) {
    this.currentDocument = document;
    this.selector = selector;
    this.selectedElements = document.querySelectorAll(selector);
    this.settings = consoleDefaults;
    // TO DO: Expand Controls for settings
    if (settings != null && typeof settings === "object")
        this.settings = settings;


    this.currentDir = this.settings.console_directory;
    // Creation of General Command Line
    this.commandLine = this.createCommandLine();





    // TO DO: ADD MAIN Command
    // TO DO: DEFINE MAIN DIR
    this.commands = [];
    this.directory = {};


    self = this;
    // Init Console for every Element
    this.selectedElements.forEach(function(element, index) {
        self.init(element);
    });
};

ConsoleCls.prototype.self = function() {
    return this;
}

ConsoleCls.prototype.createCommandLine = function(type) {
    var p = this.currentDocument.createElement("p");

    var span = this.currentDocument.createElement("span");
    span.appendChild(this.currentDocument.createTextNode(this.currentDir + ": "));
    span.classList.add("console_directory_message");
    p.appendChild(span);

    var inputBox = this.currentDocument.createElement("input");
    if (type === undefined || type == "" || type == null) {
        inputBox.type = "text";
    } else {
        inputBox.type = type;
    }
    inputBox.classList.add("console-input-box");
    inputBox.addEventListener("keypress", self.handleKeyPress);
    p.appendChild(inputBox);

    span = this.currentDocument.createElement("span");
    span.classList.add("cursor-indicator","active-console");
    p.appendChild(span);

    p.classList.add("command-line");
    return p;
};

// Init a Class which will create the Console
ConsoleCls.prototype.init = function(element) {
    this.defineProperties(element);
    element.appendChild(this.currentDocument.createTextNode(this.settings.console_welcome_message));
    element.appendChild(self.createCommandLine());
    // TO DO: ADD SETTING COMMANDS
    // TO DO: ADD DIR SPECIAL COMMANDS
};

// For Defining CSS Properties
ConsoleCls.prototype.defineProperties = function(element) {
    // TO DO: Expand Controls for Custom Height
    if (this.settings.use_custom_height)
        element.style.height = this.settings.custom_height + 'px';
    else
        element.style.height = 400 + 'px';

    element.classList.add(this.settings.class_name);
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
    if (event.keyCode == 13) {
        self.handleCommands('Enter');
    }
    console.log('Key Pressed');
};

ConsoleCls.prototype.handleCommands = function(cmd) {
    console.log('Command Triggered: ' + cmd);

};
