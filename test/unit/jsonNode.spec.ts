import { Dimension, parse } from '../../src/components/jsonnode'

function dim(startLineNumber, startColumn, endLineNumber, endColumn) {
    return { startLineNumber, startColumn, endLineNumber, endColumn } as Dimension;
}

test("should parse flat object", () => {
    const sample = {
        name: "test",
        age: 25
    };
    let parsed = parse(sample);
    expect(parsed).toMatchObject({
        type: "object",
        children: [
            {
                dimension: dim(2, 5, 2, 19)
            },
            {
                dimension: dim(3, 5, 3, 14)
            }
        ]
    });
});

test("should parse flat objects dimension", () => {
    const sample = {
        name: "test",
        age: 25
    };
    let parsed = parse(sample);
    expect(parsed).toMatchObject({
        type: "object",
        dimension: {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 4,
            endColumn: 19
        }
    });
});

test("should parse primitive object", () => {
    const sample = 25;
    let parsed = parse(sample);
    expect(parsed).toMatchObject({
        dimension: {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 1,
            endColumn: 3
        },
        children: [],
        type: "primitive"
    });
});

test("should parse flat array with primitives", () => {
    const sample = [1, 22, 333, 4444];
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        dimension: dim(1, 1, 6, 9),
        type: "array",
        children: [
            {
                dimension: dim(2, 5, 2, 6)
            },
            {
                dimension: dim(3, 5, 3, 7)
            },
            {
                dimension: dim(4, 5, 4, 8)
            },
            {
                dimension: dim(5, 5, 5, 9)
            }
        ]
    });
});


test("should parse flat array with primitives case 2", () => {
    const sample = [1];
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        dimension: dim(1, 1, 3, 6),
        type: "array",
    });
});

test("should parse array with objects", () => {
    const sample = [
        {
            name: "test",
            age: 25
        }
    ];
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        dimension: dim(1, 1, 6, 23),
        type: "array",
        children: [
            {
                dimension: dim(2, 5, 5, 23)
            }
        ]
    });
});

test("should parse nested objects", () => {
    const sample = {
        name: "test",
        father: {
            name: "father",
            age: 45
        },
        mother: {
            name: "julia",
            age: 55,
            isFemale: true
        }
    };
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        //dimension: dim(1, 1, 12, 25),
        children: [
            {
                dimension: dim(2, 5, 2, 19)
            },
            {
                dimension: dim(3, 5, 6, 25)
            },
            {
                dimension: dim(7, 5, 11, 25)
            }
        ]
    });
});


test("should set array index as key", () => {
    const sample = [1, 22, 333, 4444];
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        dimension: dim(1, 1, 6, 9),
        type: "array",
        children: [
            {
                key: 0
            },
            {
                key: 1
            },
            {
                key: 2
            },
            {
                key: 3
            }
        ]
    });
});


test('should parse object with null value', () => {
    const sample = {
        age: null
    };
    const parsed = parse(sample);
    expect(parsed).toMatchObject({
        //dimension: dim(1, 1, 12, 25),
        children: [
            {
                dimension: dim(2, 5, 2, 16)
            }
        ]
    });
});