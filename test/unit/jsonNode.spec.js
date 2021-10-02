import { parse } from "../../src/components/jsonnode";

function dim(startLineNumber, startColumn, endLineNumber, endColumn) {
    return { startLineNumber, startColumn, endLineNumber, endColumn };
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
