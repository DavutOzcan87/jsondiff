

export interface JsonElement {
    children: JsonElement[];
    dimension: Dimension;
    type: string;
    key: string | number;
}


export class JsonArray implements JsonElement {
    children: JsonElement[] = [];
    dimension = new Dimension(1, 1, 0, 0);
    type = "array";
    key: string | number;
    constructor(key: string | number) {
        this.key = key;
    }

    addChildren(parsed: JsonElement) {
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

export class JsonObject implements JsonElement {
    children: JsonElement[] = [];
    dimension = new Dimension(1, 1, 0, 0);
    type = "object";
    key: string | number = "";
    constructor(key: string | number) {
        this.key = key;
    }

    addChildren(parsed: JsonElement) {
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

export class JsonPrimitive implements JsonElement {
    dimension: Dimension;
    key: string | number;
    value: any;
    children = [];
    type = "primitive";
    constructor(key: string | number, value: any) {
        this.key = key;
        this.value = value;
        let length = JSON.stringify(value).length;
        const strValue = this.key as string;
        if (strValue != undefined && strValue.length > 0) {
            length += strValue.length + 4;
        }

        this.dimension = new Dimension(1, 1, 1, length + 1);
    }

    isPrimitive() {
        return true;
    }
}

export class Dimension {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    constructor(startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) {
        this.startLineNumber = startLineNumber;
        this.startColumn = startColumn;
        this.endLineNumber = endLineNumber;
        this.endColumn = endColumn;
    }

    shift(point: Point) {
        this.startLineNumber += point.line;
        this.endLineNumber += point.line;
        this.startColumn += point.column;
        this.endColumn += point.column;
    }

    expand(dimension: Dimension) {
        this.endLineNumber = Math.max(this.endLineNumber, dimension.endLineNumber);
        this.endColumn = Math.max(this.endColumn, dimension.endColumn);
    }
}

export class Point {
    constructor(public line: number, public column: number) {
    }
}

export function parse(obj: any) {
    return parseInternal(obj, new Point(0, 0), "");
};

const parseInternal = function (obj: any, point: Point, key: string | number) {
    console.log("parse object called", obj);
    // if (obj === null || obj == undefined) {
    //     return EMPTY;
    // }

    if (Array.isArray(obj)) {
        return parseArray(obj, point, key);
    } else if (typeof obj === "object" && obj != null && obj != undefined) {
        return parseOnject(obj, point, key);
    } else {
        return parsePrimitive(obj, point, key);
    }
};

function parseOnject(obj: any, point: Point, key: string | number) {
    const result = new JsonObject(key);
    result.dimension.shift(point);
    let currentPoint = new Point(point.line, point.column + TAB_SIZE);
    for (const [key, value] of Object.entries(obj)) {
        currentPoint = new Point(currentPoint.line + 1, currentPoint.column);
        const child = parseInternal(value, currentPoint, key);
        result.addChildren(child);
        currentPoint.line = child.dimension.endLineNumber - 1;
    }
    result.onChildsFinilized();
    return result;
}

function parseArray(obj: any[], point: Point, key: string | number) {
    const result = new JsonArray(key);
    result.dimension.shift(point);
    let currentPoint = new Point(point.line, point.column + TAB_SIZE);
    let index = 0;
    for (const [key, value] of Object.entries(obj)) {
        currentPoint = new Point(currentPoint.line + 1, currentPoint.column);
        const child = parseInternal(value, currentPoint, index);
        index += 1;
        result.addChildren(child);
        currentPoint.line = child.dimension.endLineNumber - 1;
    }
    result.onChildsFinilized();
    return result;
}

function parsePrimitive(primitive: any, point: Point, key: string | number) {
    const result = new JsonPrimitive(key, primitive);
    result.dimension.shift(point);
    return result;
}

const EMPTY = {
    dimension: new Dimension(0, 0, 0, 0),
    children: []
};

const TAB_SIZE = 4;

