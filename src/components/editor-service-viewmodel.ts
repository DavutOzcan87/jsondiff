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

class Reducable {
    hasElement = false;
    key: string | number = "";
    value: any = {};
}


class CompareResult {
    first: any;
    second: any;
    diffs: Diff[] = [];
    parsedFirst?: JsonElement = undefined;
    parsedSecond?: JsonElement = undefined;
}


class EditorServiceViewModel {
    calculateReducedJson() {
        const data = this.getReducedLeft();
        const rightData = this.getReducedRight();
        state.reducedLeft = data;
        state.reducedRight = rightData;
    }
    compare(first: any, second: any) {
        const compareResult = this.compareImmutable(first, second);
        state.first = compareResult.first;
        state.second = compareResult.second;
        state.diffs = compareResult.diffs;
        state.parsedFirst = compareResult.parsedFirst;
        state.parsedSecond = compareResult.parsedSecond;
    }

    compareImmutable(first: any, second: any): CompareResult {
        const result = new CompareResult();
        result.first = first;
        result.second = second;
        const diffResult = jsonDiffService.findDiffs(result.first, result.second);
        result.diffs = diffResult.diff;
        result.parsedFirst = diffResult.left;
        result.parsedSecond = diffResult.right;
        return result;
    }


    getReducedRight() {
        console.log("state", state);
        const idSet = this.changeItemIds();
        return this.toJsonFiltered(state.parsedSecond, id => idSet.has(id)).value;
    }
    getReducedLeft(): any {
        console.log("state", state);
        const idSet = this.changeItemIds();
        return this.toJsonFiltered(state.parsedFirst, id => idSet.has(id)).value;
    }

    private changeItemIds() {
        return state.diffs.reduce((set, item) => {
            set.add(item.jsonelementId);
            if (item.originValueJsonElementId !== undefined && item.originValueJsonElementId.length > 0) {
                set.add(item.originValueJsonElementId);
            }
            return set;
        }, new Set());
    }

    toJsonFiltered(element: JsonElement | undefined, idFilter: (id: string) => boolean): Reducable {
        if (element instanceof JsonPrimitive) {
            return this.toJsonFilteredPrimitive(element as JsonPrimitive, idFilter);
        } else if (element instanceof JsonObject) {
            return this.toJsonFilteredObject(element as JsonObject, idFilter);
        } else if (element instanceof JsonArray) {
            return this.toJsonFilteredArray(element as JsonArray, idFilter);
        } else {
            return {
                hasElement: false,
                key: "",
                value: undefined
            };
        }
    }
    toJsonFilteredArray(arg0: JsonArray, idFilter: (id: string) => boolean): Reducable {
        if (idFilter(arg0.id)) {
            return {
                hasElement: true,
                key: arg0.key,
                value: this.toJsonFiltered(arg0, o => true).value
            };
        } else {
            const result: any[] = [];
            const filteredChildren = arg0.children
                .map(item => this.toJsonFiltered(item, idFilter))
                .filter(item => item.hasElement);
            filteredChildren.forEach(item => {
                result.push(item.value);
            });
            return {
                hasElement: filteredChildren.length > 0,
                key: arg0.key,
                value: result
            };
        }

    }
    toJsonFilteredObject(arg0: JsonObject, idFilter: (id: string) => boolean): Reducable {
        if (idFilter(arg0.id)) {
            return {
                hasElement: true,
                key: arg0.key,
                value: this.toJsonFiltered(arg0, o => true).value
            };
        } else {
            const result: any = {};
            const filteredChildren = arg0.children
                .map(item => this.toJsonFiltered(item, idFilter))
                .filter(item => item.hasElement);
            filteredChildren.forEach(item => {
                const strKey = item.key as string;
                result[strKey] = item.value;
            });
            return {
                hasElement: filteredChildren.length > 0,
                key: arg0.key,
                value: result
            };
        }

    }


    toJsonFilteredPrimitive(arg0: JsonPrimitive, idFilter: (id: string) => boolean): Reducable {
        if (idFilter(arg0.id)) {
            return {
                hasElement: true,
                key: arg0.key,
                value: arg0.value
            };
        } else {
            return {
                hasElement: false
            } as Reducable;
        }
    }


};



const state = new State();
const viewModel = new EditorServiceViewModel();


export { viewModel, state }