

class RangeConverterService {
    convert(diffElements){
        if(diffElements === undefined || diffElements === null)
            return [];
        return diffElements.map(o=> this.map(o));
    }

    map(diffElement){
        let tabLen = 5;
        let brachetLen = diffElement.type === "string" ? 2:0;
        let startLineNumber = diffElement.index+2;
        let startColumn = tabLen;
        let endLineNumber = diffElement.index+2;
        let endColumn = diffElement.key.length-1 +startColumn+2+diffElement.valueLength + brachetLen +1 ;
        let className = "";
        return {
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn,
            className
        }
    }
}



const ranceConverterService = new RangeConverterService();

export {ranceConverterService}