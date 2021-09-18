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
        alert("Not Implemented Yet");
    }   
}

const editorService = new EditorService();

export { editorService };