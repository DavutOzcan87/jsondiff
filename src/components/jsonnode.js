class JsonArray {}

class JsonObject {
    constructor(key) {
        this.key = key;
        this.children = [];
        this.dimension = new Dimension(0, 0, 0, 0);
        this.type = "object";
    }

    addChildren(parsed) {
        this.children.push(parsed);
    }
}

class JsonPrimitive {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        let length = JSON.stringify(value).length;
        this.dimension = new Dimension(1, 1, 1, length + 1);
        this.children = [];
        this.type = "primitive";
    }

    shift(lineNumber) {
        this.dimension.startLineNumber += lineNumber;
        this.dimension.endLineNumber += lineNumber;
    }
}

class Dimension {
    constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
        this.startLineNumber = startLineNumber;
        this.startColumn = startColumn;
        this.endLineNumber = endLineNumber;
        this.endColumn = endColumn;
    }
}

const parse = function(obj) {
    return parseInternal(obj, 0);
};

const parseInternal = function(obj, startLine) {
    console.log("parse object called", obj);
    if (obj === null || obj == undefined) {
        return EMPTY;
    }

    if (typeof obj === "object") {
        return parseOnject(obj, startLine);
    } else if (Array.isArray(obj)) {
        return EMPTY;
    } else {
        return parsePrimitive(obj, startLine);
    }
};

function parseOnject(obj, startLine) {
    let result = new JsonObject("");
    let currentLine = startLine + 1;
    for (let [key, value] of Object.entries(obj)) {
        result.addChildren(parseInternal(value, currentLine));
        currentLine++;
    }
    return result;
}

function parsePrimitive(primitive, startLineNumber) {
    let result = new JsonPrimitive("", primitive);
    result.shift(startLineNumber);
    return result;
}

const EMPTY = {
    dimensin: new Dimension(0, 0, 0, 0),
    children: []
};

export { parse };
