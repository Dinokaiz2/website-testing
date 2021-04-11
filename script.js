import "./js/skulpt.js";
import "./js/skulpt-stdlib.js";

let code;
jQuery.get("./code.py", text => code = text);

setup();
$("#run-button").on("click", runCode);

function runCode() {
    $("#output-text").empty();
    Sk.misceval.asyncToPromise(
        () => Sk.importMainWithBody("<stdin>", false, code, true) // runs the code
    ).then(
        () => console.log("success"),
        err => console.log(err.toString())
    );
}

function setup() {
    let basePath = "https://cdn.rawgit.com/Petlja/pygame4skulpt/3435847b/pygame/";
    Sk.externalLibraries = {
        "pygame": {
            path: basePath + "__init__.js",
        },
        "pygame.display": {
            path: basePath + "display.js",
        },
        "pygame.draw": {
            path: basePath + "draw.js",
        },
        "pygame.event": {
            path: basePath + "event.js",
        },
        "pygame.font": {
            path: basePath + "font.js",
        },
        "pygame.image": {
            path: basePath + "image.js",
        },
        "pygame.key": {
            path: basePath + "key.js",
        },
        "pygame.mouse": {
            path: basePath + "mouse.js",
        },
        "pygame.time": {
            path: basePath + "time.js",
        },
        "pygame.transform": {
            path: basePath + "transform.js",
        },
        "pygame.version": {
            path: basePath + "version.js",
        },
    };
    Sk.configure({
        output: printOutput, // Tell Skulpt what to do with the program's output
        read: builtinRead
    });
    Sk.main_canvas = document.getElementById("output-canvas");
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "output-canvas";
}

function printOutput(text) {
    $("#output-text").append(text);
}

function builtinRead(file) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][file] === undefined)
        throw "File not found: " + file;
    return Sk.builtinFiles["files"][file];
}