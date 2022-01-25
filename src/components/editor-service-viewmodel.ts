import { Diff, jsonDiffService } from "./jsonDiffService";
import { JsonArray, JsonElement, JsonObject, JsonPrimitive } from "./jsonnode";


class State {
    first: any;
    second: any;
    diffs: Diff[] = [];
    parsedFirst?: JsonElement = undefined;
    parsedSecond?: JsonElement = undefined;
    reducedLeft: any;
    reducedRight: any;
};




class EditorServiceViewModel {
    calculateReducedJson() {
        const data = this.getReducedLeft();
        const rightData = this.getReducedRight();
        state.reducedLeft = data;
        state.reducedRight = rightData;
    }
    compare(first: any, second: any) {
        state.first = first;
        state.second = second;
        const diffResult = jsonDiffService.findDiffs(state.first, state.second);
        state.diffs = diffResult.diff;
        state.parsedFirst = diffResult.left;
        state.parsedSecond = diffResult.right;
    }


    getReducedRight() {
        console.log("state", state);
        const ids = state.diffs.map(o => o.jsonelementId);
        return this.toJsonFiltered(state.parsedSecond, ids);
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


};



const state = new State();
const viewModel = new EditorServiceViewModel();


export { viewModel, state }