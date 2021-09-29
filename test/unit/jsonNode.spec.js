import { parseObject } from "../../src/components/jsonnode";

test("should parse flat object", () => {
  const sample = {
    name: "test",
    age: 25,
  };
  let parsed = parseObject(sample);
  expect(parsed).toMatchObject({
    dimension: {
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 4,
      endColumn: 17,
    },
  });
});

test("should parse primitive object", () => {
  const sample = 25;
  let parsed = parseObject(sample);
  expect(parsed).toMatchObject({
    dimension: {
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 1,
      endColumn: 3,
    },
    children: [],
    type: "primitive",
  });
});
