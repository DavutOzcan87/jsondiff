class JsonArray {}

class JsonObject {}

class JsonPrimitive {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    let length = JSON.stringify(value).length;
    this.dimension = new Dimension(1, 1, 1, length + 1);
    this.children = [];
    this.type = "primitive";
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
  console.log("parse object called", obj);
  if (obj === null || obj == undefined) return EMPTY;

  if (typeof obj === "object") {
  } else if (Array.isArray(obj)) {
    return EMPTY;
  } else {
    return parsePrimitive(obj);
  }
};

function parsePrimitive(primitive) {
  return new JsonPrimitive("", primitive);
}

const EMPTY = {
  dimensin: new Dimension(0, 0, 0, 0),
  children: [],
};

export { parse };
