var consoleDefaults = {
    class_name: "console",
    console_welcome_message: "Welcome the Console",
    console_directory: {
        "main": {
            "dir1": {},
            "dir2": {},
            'alert': function() {
                alert('aa');
            }
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
    this.selectedElement = document.querySelector(selector);
    this.settings = consoleDefaults;
    this.navigationOrder = [];
    // TO DO: Expand Controls for settings
    if (settings != null && typeof settings === "object")
        this.settings = settings;

    // TO DO: ADD MAIN Command
    // TO DO: DEFINE MAIN DIR
    this.commands = {
        'cd': {},
        'ls': {},
        'Ctrl': {},
        '!!': {},
        'date': {},
        'cal': {},
        'reboot': {},
        'history': {}
    };
    this.directory = this.settings.console_directory;

    self = this;

    this.currentDir = Object.keys(self.settings.console_directory)[0];
    this.navigationOrder.push(self.currentDir);
    this.currentDirNavigation = self.getNavigationDirectory(self.currentDir);

    // Creation of General Command Line
    this.commandLine = this.createCommandLine();
    // Init Console for  Element
    self.init(this.selectedElement);
};

ConsoleCls.prototype.changeCurrentDir = function() {

};

ConsoleCls.prototype.getNavigationDirectory = function() {
    var navigationArray = [];
    for (var key in self.directory[self.currentDir]) {
        if (self.directory[self.currentDir][key] != null && typeof self.directory[self.currentDir][key] !== 'undefined' &&
            typeof self.directory[self.currentDir][key] === 'object' && typeof self.directory[self.currentDir][key] != 'function') {
            navigationArray.push(key);
            console.log(key);
        }
    };
};

ConsoleCls.prototype.getCurrentDirSpan = function() {
    var span = self.currentDocument.createElement("span");
    span.appendChild(self.currentDocument.createTextNode(self.currentDir + ": "));
    span.classList.add("console_directory_message");

    return span;
};

ConsoleCls.prototype.createCommandLine = function(type) {
    var p = self.currentDocument.createElement("p");

    p.appendChild(self.getCurrentDirSpan());

    var inputBox = self.currentDocument.createElement("input");
    if (type === undefined || type == "" || type == null) {
        inputBox.type = "text";
    } else {
        inputBox.type = type;
    }
    inputBox.classList.add("console-input-box");
    inputBox.addEventListener("keypress", self.handleKeyPress);
    p.appendChild(inputBox);

    // Creating a cursor indicator for console application
    span = self.currentDocument.createElement("span");
    span.classList.add("cursor-indicator", "active-console");
    p.appendChild(span);

    p.classList.add("command-line");
    return p;
};

ConsoleCls.prototype.appendCommandLine = function(inputText) {
    var p = self.currentDocument.createElement("p");
    p.appendChild(self.getCurrentDirSpan());

    var span = self.currentDocument.createElement("span");
    span.appendChild(self.currentDocument.createTextNode(inputText));
    p.appendChild(span);

    var currentCommandLine = self.currentDocument.querySelector(".command-line");
    self.selectedElement.insertBefore(p, currentCommandLine);
};

// Init a Class which will create the Console
ConsoleCls.prototype.init = function(element) {
    this.defineProperties(element);
    element.appendChild(this.currentDocument.createTextNode(this.settings.console_welcome_message));
    element.appendChild(self.createCommandLine());
    self.currentDocument.querySelector(".console-input-box").focus();
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

ConsoleCls.prototype.handleKeyPress = function(event) {
    // TO DO: Custom key press function

    // Order of key stroke : Custom Dir Special -> Custom General Special -> Default Dir Special -> Default
    // Unchangable ones: Enter, Delete, Home, End, Up, Down, Left, PageUp, PageDown, Backspace

    // Movement: Up, Down, Left, Right, Home, End, PageUp, PageDown,
    // Deleting: Delete, Backspace
    // Handling: Enter,
    // Rest: Currently input
    if (event.keyCode == 13) {
        self.appendCommandLine(self.currentDocument.querySelector(".console-input-box").value);
        self.currentDocument.querySelector(".console-input-box").value = "";
        self.currentDocument.querySelector(".console-input-box").style.width = 5 + 'px';
        self.handleCommands('Enter');
    }
    else{
      var currentWidth = self.currentDocument.querySelector(".console-input-box").offsetWidth;
      self.currentDocument.querySelector(".console-input-box").style.width = currentWidth + 12 + 'px';
    }
    console.log('Key Pressed');
};

ConsoleCls.prototype.handleCommands = function(cmd) {
    console.log('Command Triggered: ' + cmd);
};
