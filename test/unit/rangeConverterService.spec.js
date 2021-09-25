

import {ranceConverterService } from './../../src/components/rangeConverterService'

test('should return empty if array is empty', () => {
    var result = ranceConverterService.convert([]);
    expect(result).toEqual([]);
});


test('should calculate start stop indexes for single field' , ()=>{
    const sample = {
        key:"$.name",
        isRemoved: true,
        index: 0,
        type:"string",
        valueLenght:4
    };
    var result = ranceConverterService.convert([sample]);
    expect(result).toMatchObject([{
            startLineNumber: 2,
            startColumn: 5,
            endLineNumber: 2,
            endColumn: 18
        }]);
});