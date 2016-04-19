var timeOut = 1000;
var corruption_parameters = {
    positionWidth: 0,
    positionHeight: 0
};

var corrupt_options = ["corrupt-long", "corrupt-short", "corrupt-xlong", "corrupt-xshort", "corrupt-normal"];

function startCorrupt() {
    setTimeout(goCorrupt, 2000);
}


function goCorrupt() {
    corruption_parameters.positionWidth = $(".corruption").innerWidth() / 32;
    corruption_parameters.positionHeight = $(".corruption").innerHeight() / 32;
    for (var i = 0; i < corruption_parameters.positionWidth; i++) {
        for (var j = 0; j < corruption_parameters.positionHeight; j++) {
            var corrupt_option = corrupt_options[Math.floor(Math.random() * corrupt_options.length)];
            setTimeout("corrupt('" + corrupt_option + "'," + i + "," + j + ")", Math.floor(Math.random() * timeOut));
            if (timeOut < 1000)
                timeOut = timeOut + 10;
        }
    }
}

function corrupt(corrupt_option, i, j) {
    $(".corruption").append("<div class='corrupted " + corrupt_option + "' style='margin-left:" + (i * 32) + "px;margin-top:" + (j * 32) + "px'></div>")
}
