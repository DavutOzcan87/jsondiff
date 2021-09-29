import { jsonDiffService } from "./../../src/components/jsonDiffService";

test("second test", () => {
  expect(true).toBe(true);
});

test("should return empty object if both empty", () => {
  const first = {};
  const second = {};
  var result = jsonDiffService.findDiffs(first, second);
  expect(result).toStrictEqual({
    key: "$",
    children: [],
  });
});

test("should return removed if a field is removed", () => {
  const first = {
    name: "test",
  };
  const second = {};
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        key: "$.name",
        isRemoved: true,
      },
    ],
  });
});

test("should add new fields", () => {
  const first = {};
  const second = {
    name: "test",
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        key: "$.name",
        isAdd: true,
      },
    ],
  });
});

test("should find add and removed ", () => {
  const first = {
    name: "test",
  };
  const second = {
    isTrue: false,
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        key: "$.name",
        isRemoved: true,
      },
      {
        key: "$.isTrue",
        isAdd: true,
      },
    ],
  });
});

test("should add index", () => {
  const first = {
    name: "test",
    salary: 50,
  };
  const second = {
    name: "test",
    age: 21,
    salary: 50,
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        isAdd: true,
        index: 1,
      },
    ],
  });
});

test("should add index when removed", () => {
  const first = {
    name: "test",
    salary: 50,
    age: 21,
  };
  const second = {
    name: "test",
    salary: 50,
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        isRemoved: true,
        index: 2,
      },
    ],
  });
});

test("should add value lenght", () => {
  const first = {};
  const second = {
    salary: 50,
    isNew: true,
    str: "someteststring",
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      { valueLength: 2, type: "number" },
      { valueLength: 4, type: "boolean" },
      { valueLength: 14, type: "string" },
    ],
  });
});

test("should calculate for tested objects fields", () => {
  const first = {
    father: {
      name: "test",
    },
  };
  const second = {
    father: {
      name: "test",
      age: 25,
    },
  };

  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    key: "$",
    children: [
      {
        isAdd: true,
        dimension: {
          startLineNumber: 4,
          startColumn: 5,
          endLineNumber: 4,
          endColumn: 12,
        },
      },
    ],
  });
});
