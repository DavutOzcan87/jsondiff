import { parse } from "./jsonnode";


const ROOT = "$";

class DiffElement {

    constructor() {
        this.key = undefined;
        this.index = undefined;
        this.isRemoved = false;
        this.isAddd = false;
        //this.children=[];
    }


}


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
        const result = {
            key: "$",
            children: []
        };
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
                result.children.push(temp);
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
                result.children.push(temp);
            }
        }


        return result;
    }

}

const jsonDiffService = new JsonDiffService();

export {
    jsonDiffService
}