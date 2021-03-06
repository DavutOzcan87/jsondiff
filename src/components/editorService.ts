import { Range } from "monaco-editor";
import { Diff, jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";
import { editor } from "monaco-editor";
import { JsonParseException } from "./exceptions";
import { JsonArray, JsonElement, JsonObject, JsonPrimitive } from "./jsonnode";
import { viewModel, state } from "./editor-service-viewmodel";




class EditorService {
    editors: {
        'editor-left'?: any,
        'editor-right'?: any
    };
    leftIds: string[];
    rightIds: string[];
    constructor() {
        this.editors = {};
        this.leftIds = [];
        this.rightIds = [];

    }

    get diffCount() {
        return state.diffs.length;
    }

    leftEditor(): editor.IStandaloneCodeEditor {
        return this.editors["editor-left"];
    }

    rightEditor(): editor.IStandaloneCodeEditor {
        return this.editors["editor-right"];
    }

    loadSampleData(sampleIndex: any) {
        this.leftEditor().setValue(JSON.stringify(samples[sampleIndex].left, undefined, 4));
        this.rightEditor().setValue(JSON.stringify(samples[sampleIndex].right, undefined, 4));
    }
    compare() {
        this.clear();
        const leftObject = this.parseLeftDocument();
        const rightObject = this.parseRightDocument();
        this.writeFormatted(leftObject, this.leftEditor());
        this.writeFormatted(rightObject, this.rightEditor());
        viewModel.compare(leftObject, rightObject);

        console.log("diffs", state.diffs);
        const rightDecorations = this._extratRightDecorations(state.diffs);
        const leftEditorDecorations = this._extractLeftDecorations(state.diffs);
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
        //viewModel.resetState();
    }

    writeFormatted(obj: any, editor: any) {
        editor.setValue(JSON.stringify(obj, undefined, 4));
    }

    _extratRightDecorations(diffs: any) {
        return diffs
            .filter((o: any) => o.isAdd === true || o.isValueChanged === true)
            .map((o: any) => {
                return {
                    range: new Range(o.startLineNumber, o.startColumn, o.endLineNumber, o.endColumn),
                    options: { inlineClassName: o.isValueChanged === true ? "valueChanged" : "newLine" }
                };
            });
    }

    _extractLeftDecorations(diffs: any) {
        return diffs
            .filter((o: any) => o.isRemoved === true)
            .map((o: any) => {
                return {
                    range: new Range(o.startLineNumber, o.startColumn, o.endLineNumber, o.endColumn),
                    options: { inlineClassName: "missingLine" }
                };
            });
    }

    showDiff() {
        console.log("show diff");
        //TODO unit test
        viewModel.calculateReducedJson();
        console.log("reduced left", state.reducedLeft);
        this.writeFormatted(state.reducedLeft, this.leftEditor());
        this.writeFormatted(state.reducedRight, this.rightEditor());
        const compareResult = viewModel.compareImmutable(state.reducedLeft, state.reducedRight);
        const rightDecorations = this._extratRightDecorations(compareResult.diffs);
        const leftEditorDecorations = this._extractLeftDecorations(compareResult.diffs);
        console.log("right decorations", rightDecorations);
        console.log("leftDecorations", leftEditorDecorations);
        this.rightIds = this.rightEditor().deltaDecorations([], rightDecorations);
        this.leftIds = this.leftEditor().deltaDecorations([], leftEditorDecorations);
        //this.compare();
    }


    showOriginal() {
        this.writeFormatted(state.first, this.leftEditor());
        this.writeFormatted(state.second, this.rightEditor());
        const rightDecorations = this._extratRightDecorations(state.diffs);
        const leftEditorDecorations = this._extractLeftDecorations(state.diffs);
        console.log("right decorations", rightDecorations);
        console.log("leftDecorations", leftEditorDecorations);
        this.rightIds = this.rightEditor().deltaDecorations([], rightDecorations);
        this.leftIds = this.leftEditor().deltaDecorations([], leftEditorDecorations);
    }

    getCounts(): { adds: number, removes: number, valueChanges: number } {
        return {
            adds: state.diffs.filter(o => o.isAdd).length,
            removes: state.diffs.filter(o => o.isRemoved).length,
            valueChanges: state.diffs.filter(o => o.isValueChanged).length
        }
    }

    showOriginalValues() {
        this.writeFormatted(state.first, this.leftEditor());
        this.writeFormatted(state.second, this.rightEditor());
    }

}

const editorService = new EditorService();

export { editorService };
