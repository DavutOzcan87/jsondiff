import {Range} from 'monaco-editor'
import {ranceConverterService} from './rangeConverterService'
import {jsonDiffService} from './jsonDiffService'
const leftSample = {
    name:"John",
    hasChild: false,
    hobbies:["reading"]
};

const rightSample={
    hasChild: true,
    age:35,
    hobbies:["walking"]
}

var decorations = [
	{ range: new Range(3,5,3,14), options: { inlineClassName: 'newLine' }}
];

class EditorService {
    constructor(){
        this.editors={};

    }
    leftEditor(){
        return this.editors['editor-left'];
    }

    rightEditor(){
        return this.editors['editor-right'];
    }

    loadSampleData(){
        this.leftEditor().setValue(JSON.stringify(leftSample,undefined,4));
        this.rightEditor().setValue(JSON.stringify(rightSample,undefined,4));
    }
    compare(){
        let first = JSON.parse(this.leftEditor().getValue());
        let second = JSON.parse(this.rightEditor().getValue());

        let diffs = jsonDiffService.findDiffs(first,second).children;
        console.log("diffs",diffs);
        let onlyAdditions = diffs.filter(o=> o.isAdd === true);
        let ranges = ranceConverterService.convert(onlyAdditions);
        let decorations = ranges.map(o=> {
           return { range: new Range(o.startLineNumber,o.startColumn,o.endLineNumber,o.endColumn), options: { inlineClassName: 'newLine' }};
        } );
        console.log("decorations",decorations);
        this.rightEditor().deltaDecorations([],decorations);
    }
    clear(){
        this.rightEditor().deltaDecorations(["newLine"],[{}]);
    }   
}

const editorService = new EditorService();

export { editorService };