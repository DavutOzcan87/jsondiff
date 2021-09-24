
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
            key:"$",
            children:[]    
        };
        const firstFieldNames = Object.getOwnPropertyNames(first);
        const secondFieldNames = Object.getOwnPropertyNames(second);
        for (const prop of Object.getOwnPropertyNames(first)) {
            if(!secondFieldNames.includes(prop)){
                let temp = {
                    isRemoved: true,
                    key: "$."+prop
                }
               result.children.push(temp);
            }
        }
        for (const name of secondFieldNames) {
            if(!firstFieldNames.includes(name)){
                let temp = {
                    key: "$."+name,
                    isAdd: true
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