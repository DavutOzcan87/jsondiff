import { Range } from "monaco-editor";
import { jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";

var decorations = [{ range: new Range(3, 5, 3, 14), options: { inlineClassName: "newLine" } }];

class EditorService {
    constructor() {
        this.editors = {};
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
        let first = JSON.parse(this.leftEditor().getValue());
        let second = JSON.parse(this.rightEditor().getValue());

        let diffs = jsonDiffService.findDiffs(first, second).diff;
        console.log("diffs", diffs);

        let rightDecorations = this._extratRightDecorations(diffs);
        let leftEditorDecorations = this._extractLeftDecorations(diffs);
        console.log("right decorations", rightDecorations);
        console.log("leftDecorations", leftEditorDecorations);
        this.rightEditor().deltaDecorations([], rightDecorations);
        this.leftEditor().deltaDecorations([], leftEditorDecorations);
    }
    clear() {
        this.rightEditor().deltaDecorations(["newLine"], [{}]);
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
