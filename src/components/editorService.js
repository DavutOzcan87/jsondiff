import { Range } from "monaco-editor";
import { jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";
import { JsonParseException } from "./exceptions";
import store from "./store";
var decorations = [{ range: new Range(3, 5, 3, 14), options: { inlineClassName: "newLine" } }];


class EditorService {
    constructor() {
        this.editors = {};
        this.leftIds = undefined;
        this.rightIds = undefined;
        this._diffs = [];

    }

    get diffCount() {
        return this._diffs.length;
    }

    leftEditor() {
        return this.editors["editor-left"];
    }

    rightEditor() {
        return this.editors["editor-right"];
    }

    loadSampleData(sampleIndex) {
        this.leftEditor().setValue(JSON.stringify(samples[sampleIndex].left, undefined, 4));
        this.rightEditor().setValue(JSON.stringify(samples[sampleIndex].right, undefined, 4));
    }
    compare() {

        this.clear();
        let first = this.parseLeftDocument();
        let second = this.parseRightDocument();
        this.writeFormatted(first, this.leftEditor());
        this.writeFormatted(second, this.rightEditor());
        let diffs = jsonDiffService.findDiffs(first, second).diff;
        this._diffs = diffs;
        console.log("diffs", diffs);
        let rightDecorations = this._extratRightDecorations(diffs);
        let leftEditorDecorations = this._extractLeftDecorations(diffs);
        console.log("right decorations", rightDecorations);
        console.log("leftDecorations", leftEditorDecorations);
        this.rightIds = this.rightEditor().deltaDecorations([], rightDecorations);
        this.leftIds = this.leftEditor().deltaDecorations([], leftEditorDecorations);



    }

    parseRightDocument() {
        try {
            return JSON.parse(this.rightEditor().getValue());
        } catch (e) {
            throw new JsonParseException(e, "Cannot parse right document");
        }

    }

    parseLeftDocument() {
        try {
            return JSON.parse(this.leftEditor().getValue());

        } catch (e) {
            throw new JsonParseException(e, "Cannot parse left document");
        }

    }
    clear() {
        //this.rightEditor().deltaDecorations(["newLine"], [{}]);
        if (this.leftIds) {
            this.leftEditor().deltaDecorations(this.leftIds, []);
        }
        if (this.rightIds) {
            this.rightEditor().deltaDecorations(this.rightIds, []);
        }
    }

    writeFormatted(obj, editor) {
        editor.setValue(JSON.stringify(obj, undefined, 4));
    }

    _extratRightDecorations(diffs) {
        return diffs
            .filter(o => o.isAdd === true || o.isValueChanged === true)
            .map(o => {
                return {
                    range: new Range(o.startLineNumber, o.startColumn, o.endLineNumber, o.endColumn),
                    options: { inlineClassName: o.isValueChanged === true ? "valueChanged" : "newLine" }
                };
            });
    }

    _extractLeftDecorations(diffs) {
        return diffs
            .filter(o => o.isRemoved === true)
            .map(o => {
                return {
                    range: new Range(o.startLineNumber, o.startColumn, o.endLineNumber, o.endColumn),
                    options: { inlineClassName: "missingLine" }
                };
            });
    }
}

const editorService = new EditorService();

export { editorService };
