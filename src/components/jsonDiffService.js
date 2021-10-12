import { parse } from "./jsonnode";
import { ranceConverterService } from './rangeConverterService'







class JsonDiffService {
    findDiffs(first, second) {
        return this.diffsUsingTree(first, second);

        // let children = [];
        // const firstFieldNames = Object.getOwnPropertyNames(first);
        // const secondFieldNames = Object.getOwnPropertyNames(second);
        // for (const [index, name] of firstFieldNames.entries()) {
        //     if (!secondFieldNames.includes(name)) {
        //         let temp = {
        //             isRemoved: true,
        //             key: "$." + name,
        //             index,
        //             valueLength: first[name].toString().lenght,
        //             type: typeof first[name]
        //         }
        //         children.push(temp);
        //     }
        // }
        // for (const [index, name] of secondFieldNames.entries()) {
        //     if (!firstFieldNames.includes(name)) {
        //         let temp = {
        //             key: "$." + name,
        //             isAdd: true,
        //             index,
        //             valueLength: second[name].toString().length,
        //             type: typeof second[name]
        //         };
        //         children.push(temp);
        //     }
        // }

        // let ranges = this.toRange(children);
        // const result = {
        //     diff: ranges
        // };
        // console.log("result", result);
        // return result;
    }

    toRange(children) {
        let diffs = ranceConverterService.convert(children);
        for (let index = 0; index < children.length; index++) {
            diffs[index].isAdd = children[index].isAdd;
            diffs[index].isRemoved = children[index].isRemoved;
        }
        return diffs;
    }

    diffsUsingTree(first, second) {
        console.log("diff using tree called");
        const left = parse(first);
        const right = parse(second);
        console.log("left", left);
        console.log("right", right);
        let diff = this.getDiffOfNodes(left, right);
        return {
            diff: diff
        };
    }

    getDiffOfNodes(left, right) {
        if (left.isPrimitive() === false && right.isPrimitive() === false) {
            return this.getDiffOfComposite(left, right);
        } else {
            return this.getDiffOfPrimitive(left, right);
        }
    }

    getDiffOfComposite(left, right) {
        let leftItems = left.children.reduce((prev, current) => prev.set(current.key, current), new Map());
        let rightItems = right.children.reduce((prev, current) => prev.set(current.key, current), new Map());
        let result = [];
        for (let [key, value] of leftItems.entries()) {
            if (rightItems.has(key)) {
                result.push(this.getDiffOfNodes(value, rightItems.get(key)));
            } else {
                result.push(this.removed(value));
            }
        }

        for (let [key, value] of rightItems.entries()) {
            if (!leftItems.has(key)) {
                result.push(this.added(value));
            }
        }
        return result;
    }

    added(node) {
        return {
            isAdd: true,
            startLineNumber: node.dimension.startLineNumber,
            startColumn: node.dimension.startColumn,
            endLineNumber: node.dimension.endLineNumber,
            endColumn: node.dimension.endColumn
        }
    }

    removed(node) {
        return {
            isRemoved: true,
            startLineNumber: node.dimension.startLineNumber,
            startColumn: node.dimension.startColumn,
            endLineNumber: node.dimension.endLineNumber,
            endColumn: node.dimension.endColumn
        }
    }

    getDiffOfPrimitive(left, right) {
        if (left.value !== right.value) {
            return {
                isRemoved: true,
                startLineNumber: right.dimension.startLineNumber,
                startColumn: right.dimension.startColumn,
                endLineNumber: right.dimension.endLineNumber,
                endColumn: right.dimension.endColumn
            }
        }
        else return [];
    }

}

const jsonDiffService = new JsonDiffService();

export {
    jsonDiffService
}