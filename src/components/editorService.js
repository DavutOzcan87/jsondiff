import { Range } from "monaco-editor";
import { jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";

var decorations = [{ range: new Range(3, 5, 3, 14), options: { inlineClassName: "newLine" } }];

class EditorService {
    constructor() {
        this.editors = {};
        this.leftIds = undefined;
        this.rightIds = undefined;

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
        throw "invalid data";
        // this.clear();
        // let first = JSON.parse(this.leftEditor().getValue());
        // let second = JSON.parse(this.rightEditor().getValue());
        // this.writeFormatted(first, this.leftEditor());
        // this.writeFormatted(second, this.rightEditor());
        // let diffs = jsonDiffService.findDiffs(first, second).diff;
        // console.log("diffs", diffs);
        // let rightDecorations = this._extratRightDecorations(diffs);
        // let leftEditorDecorations = this._extractLeftDecorations(diffs);
        // console.log("right decorations", rightDecorations);
        // console.log("leftDecorations", leftEditorDecorations);
        // this.rightIds = this.rightEditor().deltaDecorations([], rightDecorations);
        // this.leftIds = this.leftEditor().deltaDecorations([], leftEditorDecorations);

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
