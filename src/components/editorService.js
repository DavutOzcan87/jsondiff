import {Range} from 'monaco-editor'

const leftSample = {
    name:"John",
    age:33,
    hobbies:["reading"]
};

const rightSample={
    name:"John",
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
        this.rightEditor().deltaDecorations([], decorations);
    }
    clear(){
        this.rightEditor().deltaDecorations([],[{}]);
    }   
}

const editorService = new EditorService();

export { editorService };