import { Range } from "monaco-editor";
import { Diff, jsonDiffService } from "./jsonDiffService";
import { samples } from "./samples";
import { editor } from "monaco-editor";
import { JsonParseException } from "./exceptions";
import { JsonArray, JsonElement, JsonObject, JsonPrimitive } from "./jsonnode";


class State {
    first: any;
    second: any;
    diffs: Diff[] = [];
    parsedFirst?: JsonElement = undefined;
    parsedSecond?: JsonElement = undefined;
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
        const diffResult = jsonDiffService.findDiffs(state.first, state.second);
        state.diffs = diffResult.diff;
        state.parsedFirst = diffResult.left;
        state.parsedSecond = diffResult.right;

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

    showDiff() {
        console.log("show diff");
        //TODO unit test
        const data = this.getReducedLeft();
        console.log("reduced left", data);
        this.writeFormatted(data, this.leftEditor());
        //this.compare();
    }
    getReducedLeft(): any {
        console.log("state", state);
        const ids = state.diffs.map(o => o.jsonelementId);
        return this.toJsonFiltered(state.parsedFirst, ids);
    }
    toJsonFiltered(parsedFirst: JsonElement | undefined, ids: string[]): any {
        if (parsedFirst instanceof JsonPrimitive) {
            return (parsedFirst as JsonPrimitive).value;
        } else if (parsedFirst instanceof JsonObject) {
            const result: any = {};
            parsedFirst.children
                .filter(item => ids.includes(item.id))
                .forEach((value, index, arr) => {
                    const strKey = value.key as string;
                    result[strKey] = this.toJsonFiltered(value, ids);
                });
            return result;
        } else if (parsedFirst instanceof JsonArray) {
            const result: any[] = [];
            parsedFirst.children
                .filter(item => ids.includes(item.id))
                .forEach((item, index) => {
                    result.push(this.toJsonFiltered(item, ids));
                });
            return result;
        }
    }
}

const editorService = new EditorService();

export { editorService };
