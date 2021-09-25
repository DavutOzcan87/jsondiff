

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
        valueLength:4
    };
    var result = ranceConverterService.convert([sample]);
    expect(result).toMatchObject([{
            startLineNumber: 2,
            startColumn: 5,
            endLineNumber: 2,
            endColumn: 18
        }]);
});

test('should calculate case ', () => {
    let sample = {key: '$.age', isAdd: true, index: 1, valueLength: 2, type: 'number'};
    var result = ranceConverterService.convert([sample]);
    expect(result).toMatchObject([{
            startLineNumber: 3,
            startColumn: 5,
            endLineNumber: 3,
            endColumn: 14
        }]);
});