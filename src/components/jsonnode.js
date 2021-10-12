class JsonArray {
    constructor(key) {
        this.key = key;
        this.children = [];
        this.dimension = new Dimension(1, 1, 0, 0);
        this.type = "array";
    }

    addChildren(parsed) {
        this.children.push(parsed);
        this.dimension.expand(parsed.dimension);
    }

    onChildsFinilized() {
        this.dimension.endLineNumber++;
    }

    isPrimitive() {
        return false;
    }
}

class JsonObject {
    constructor(key) {
        this.key = key;
        this.children = [];
        this.dimension = new Dimension(1, 1, 0, 0);
        this.type = "object";
    }

    addChildren(parsed) {
        this.children.push(parsed);
        this.dimension.expand(parsed.dimension);
    }

    onChildsFinilized() {
        this.dimension.endLineNumber++;
    }
    isPrimitive() {
        return false;
    }
}

class JsonPrimitive {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        let length = JSON.stringify(value).length;
        if (key.length > 0) {
            length += key.length + 4;
        }
        this.dimension = new Dimension(1, 1, 1, length + 1);
        this.children = [];
        this.type = "primitive";
    }

    isPrimitive() {
        return true;
    }
}

class Dimension {
    constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
        this.startLineNumber = startLineNumber;
        this.startColumn = startColumn;
        this.endLineNumber = endLineNumber;
        this.endColumn = endColumn;
    }

    shift(point) {
        this.startLineNumber += point.line;
        this.endLineNumber += point.line;
        this.startColumn += point.column;
        this.endColumn += point.column;
    }

    expand(dimension) {
        this.endLineNumber = Math.max(this.endLineNumber, dimension.endLineNumber);
        this.endColumn = Math.max(this.endColumn, dimension.endColumn);
    }
}

class Point {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}

const parse = function (obj) {
    return parseInternal(obj, new Point(0, 0), "");
};

const parseInternal = function (obj, point, key) {
    console.log("parse object called", obj);
    if (obj === null || obj == undefined) {
        return EMPTY;
    }

    if (Array.isArray(obj)) {
        return parseArray(obj, point, key);
    } else if (typeof obj === "object") {
        return parseOnject(obj, point, key);
    } else {
        return parsePrimitive(obj, point, key);
    }
};

function parseOnject(obj, point, key) {
    let result = new JsonObject(key);
    result.dimension.shift(point);
    let currentPoint = new Point(point.line, point.column + TAB_SIZE);
    for (let [key, value] of Object.entries(obj)) {
        currentPoint = new Point(currentPoint.line + 1, currentPoint.column);
        let child = parseInternal(value, currentPoint, key);
        result.addChildren(child);
        currentPoint.line = child.dimension.endLineNumber - 1;
    }
    result.onChildsFinilized();
    return result;
}

function parseArray(obj, point, key) {
    let result = new JsonArray(key);
    result.dimension.shift(point);
    let currentPoint = new Point(point.line, point.column + TAB_SIZE);
    let index = 0;
    for (let [key, value] of Object.entries(obj)) {
        currentPoint = new Point(currentPoint.line + 1, currentPoint.column);
        let child = parseInternal(value, currentPoint, index);
        index += 1;
        result.addChildren(child);
        currentPoint.line = child.dimension.endLineNumber - 1;
    }
    result.onChildsFinilized();
    return result;
}

function parsePrimitive(primitive, point, key) {
    let result = new JsonPrimitive(key, primitive);
    result.dimension.shift(point);
    return result;
}

const EMPTY = {
    dimensin: new Dimension(0, 0, 0, 0),
    children: []
};

const TAB_SIZE = 4;

export { parse };
