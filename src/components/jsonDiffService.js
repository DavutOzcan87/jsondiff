import { parse } from "./jsonnode";
import { ranceConverterService } from './rangeConverterService'




function diffsUsingTree(first, second) {
    console.log("diff using tree called");
    const left = parse(first);
    const right = parse(second);
    console.log("left", left);
    console.log("right", right);
}


class JsonDiffService {
    findDiffs(first, second) {
        diffsUsingTree(first, second);

        let children = [];
        const firstFieldNames = Object.getOwnPropertyNames(first);
        const secondFieldNames = Object.getOwnPropertyNames(second);
        for (const [index, name] of firstFieldNames.entries()) {
            if (!secondFieldNames.includes(name)) {
                let temp = {
                    isRemoved: true,
                    key: "$." + name,
                    index,
                    valueLength: first[name].toString().lenght,
                    type: typeof first[name]
                }
                children.push(temp);
            }
        }
        for (const [index, name] of secondFieldNames.entries()) {
            if (!firstFieldNames.includes(name)) {
                let temp = {
                    key: "$." + name,
                    isAdd: true,
                    index,
                    valueLength: second[name].toString().length,
                    type: typeof second[name]
                };
                children.push(temp);
            }
        }

        let ranges = this.toRange(children);
        const result = {
            key: "$",
            children: children,
            diff: ranges
        };
        console.log("result", result);
        return result;
    }

    toRange(children) {
        let diffs = ranceConverterService.convert(children);
        for (let index = 0; index < children.length; index++) {
            diffs[index].isAdd = children[index].isAdd;
            diffs[index].isRemoved = children[index].isRemoved;
        }
        return diffs;
    }

}

const jsonDiffService = new JsonDiffService();

export {
    jsonDiffService
}