
import {jsonDiffService} from './../../src/components/jsonDiffService'


test('second test',()=>{
    expect(true).toBe(true);
});

test('should return empty object if both empty', () => {
    const first = {};
    const second = {};
    var result = jsonDiffService.findDiffs(first,second);
    expect(result).toStrictEqual({}); 
});

test('should return removed if a field is removed',()=>{
    const first = {
        "name":"test"
    };
    const second = {};
    const result = jsonDiffService.findDiffs(first,second);
    expect(result).toEqual(
        {
            key:"$.name",
            isRemoved:true
        }
    );
});