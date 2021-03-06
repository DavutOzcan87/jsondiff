import { JsonElement, JsonPrimitive, parse } from "./jsonnode";
import { ranceConverterService } from "./rangeConverterService";
export class Diff {
    isAdd = false;
    isRemoved = false;
    isValueChanged = false;
    startLineNumber = 0;
    startColumn = 0;
    endLineNumber = 0;
    endColumn = 0;
    jsonelementId = "";
    originValueJsonElementId = ""
};

export class DiffResult {
    diff: Diff[] = [];
    left?: JsonElement = undefined;
    right?: JsonElement = undefined;
}
class JsonDiffService {
    findDiffs(first: any, second: any): DiffResult {
        return this.diffsUsingTree(first, second);
    }

    diffsUsingTree(first: any, second: any): DiffResult {
        console.log("diff using tree called");
        const left = parse(first);
        const right = parse(second);
        console.log("left", left);
        console.log("right", right);
        const diff = this.getDiffOfNodes(left, right);
        return {
            diff: diff,
            left,
            right
        };
    }

    getDiffOfNodes(left: JsonElement, right: JsonElement): Diff[] {
        if (left.isPrimitive() === false && right.isPrimitive() === false) {
            return this.getDiffOfComposite(left, right);
        } else {
            return this.getDiffOfPrimitive(left as JsonPrimitive, right as JsonPrimitive);
        }
    }

    getDiffOfComposite(left: JsonElement, right: JsonElement): Diff[] {
        const leftItems = left.children.reduce((prev, current) => prev.set(current.key, current), new Map());
        const rightItems = right.children.reduce((prev, current) => prev.set(current.key, current), new Map());
        let result: Diff[] = [];
        for (const [key, value] of leftItems.entries()) {
            if (rightItems.has(key)) {
                result = result.concat(this.getDiffOfNodes(value, rightItems.get(key)));
            } else {
                result.push(this.removed(value));
            }
        }

        for (const [key, value] of rightItems.entries()) {
            if (!leftItems.has(key)) {
                result.push(this.added(value));
            }
        }
        return result;
    }

    added(node: JsonElement): Diff {
        return {
            isAdd: true,
            startLineNumber: node.dimension.startLineNumber,
            startColumn: node.dimension.startColumn,
            endLineNumber: node.dimension.endLineNumber,
            endColumn: node.dimension.endColumn,
            jsonelementId: node.id
        } as Diff;
    }

    removed(node: JsonElement): Diff {
        return {
            isRemoved: true,
            startLineNumber: node.dimension.startLineNumber,
            startColumn: node.dimension.startColumn,
            endLineNumber: node.dimension.endLineNumber,
            endColumn: node.dimension.endColumn,
            jsonelementId: node.id
        } as Diff;
    }

    getDiffOfPrimitive(left: JsonPrimitive, right: JsonPrimitive): Diff[] {
        if (left.value !== right.value) {
            const diff = {
                isValueChanged: true,
                startLineNumber: right.dimension.startLineNumber,
                startColumn: right.dimension.startColumn,
                endLineNumber: right.dimension.endLineNumber,
                endColumn: right.dimension.endColumn,
                jsonelementId: right.id,
                originValueJsonElementId: left.id
            } as Diff;
            return [diff];
        } else return [];
    }
}

const jsonDiffService = new JsonDiffService();

export { jsonDiffService };
