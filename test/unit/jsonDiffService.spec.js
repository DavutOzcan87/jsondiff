
import {jsonDiffService} from './../../src/components/jsonDiffService'


test('second test',()=>{
    expect(true).toBe(true);
});

test('should return empty object if both empty', () => {
    const first = {};
    const second = {};
    var result = jsonDiffService.findDiffs(first,second);
    expect(result).toStrictEqual({
        key:"$",
        children:[]
    }); 
});

test('should return removed if a field is removed',()=>{
    const first = {
        "name":"test"
    };
    const second = {};
    const result = jsonDiffService.findDiffs(first,second);
    expect(result).toEqual(
        {
            key:"$",
            children:[
                {
                    key:"$.name",
                    isRemoved:true
                }
            ]
        }
    );
});

test('should add new fields',()=>{
    const first = {
    };
    const second = {
        "name":"test"
    };
    const result = jsonDiffService.findDiffs(first,second);
    expect(result).toEqual(
        {
            key:"$",
            children:[
                {
                    key:"$.name",
                    isAdd:true
                }
            ]
        }
    );
});