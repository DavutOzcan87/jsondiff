
const ROOT="$";

class DiffElement{

    constructor(){
        this.key=undefined;
        this.index= undefined;
        this.isRemoved =false;
        this.isAddd=false;
        //this.children=[];
    }


}

class JsonDiffService{
    findDiffs(first,second){
        const result = {    
        };
        const firstFieldNames = Object.getOwnPropertyNames(first);
        const secondFieldNames = Object.getOwnPropertyNames(second);
        for (const prop of Object.getOwnPropertyNames(first)) {
            if(!secondFieldNames.includes(prop)){
                result.isRemoved = true;
                result.key = "$."+prop;
            }
        }
        return result;
    }
    
}

const jsonDiffService = new JsonDiffService();

export {
    jsonDiffService
}