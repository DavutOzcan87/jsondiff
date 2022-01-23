import { Range } from "monaco-editor";
import { jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";
import { editor } from "monaco-editor";
import { JsonParseException } from "./exceptions";


class State {
    first: any;
    second: any;
    diffs: any;
};

const state = new State();

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
        state.first = this.parseLeftDocument();
        state.second = this.parseRightDocument();
        this.writeFormatted(state.first, this.leftEditor());
        this.writeFormatted(state.second, this.rightEditor());
        state.diffs = jsonDiffService.findDiffs(state.first, state.second).diff;
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
}

const editorService = new EditorService();

export { editorService };
