class EditorService {
    constructor(){
        this.editors={};

    }
    leftEditor(){
        return this.editors['editor-left'];
    }

    rightEditor(){
        return this.editors['right-editor'];
    }
}

const editorService = new EditorService();

export { editorService };