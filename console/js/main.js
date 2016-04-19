


function cursorIndicator() {
    if ($(".cursor-indicator").length)
        $(".cursor-indicator").remove();
    else
        $(".command-input").append("<span class='cursor-indicator'>B</span>");
    setTimeout(cursorIndicator, 250);
}

function insertLine(document, event) {
    var input = $(document);
    processByEvent(input, event);
}

function processByEvent(document, event) {
    // TO-DO Events:
    // TAB
    // Up, Down, Left, Right
    // Enter
    // Backspace
    //To-Do Commands
    // --help
    // --list
    console.log("event");
}
