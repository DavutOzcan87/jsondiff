import { jsonDiffService } from "./../../src/components/jsonDiffService";

test("second test", () => {
  expect(true).toBe(true);
});



test("should return removed if a field is removed", () => {
  const first = {
    name: "test",
  };
  const second = {};
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    diff: [
      {
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
    diff: [
      {
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
    diff: [
      {
        isRemoved: true,
      },
      {

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

    diff: [
      {
        isAdd: true
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
    diff: [
      {
        isRemoved: true
      },
    ],
  });
});

test("should add multiple additions", () => {
  const first = {};
  const second = {
    salary: 50,
    isNew: true,
    str: "someteststring",
  };
  const result = jsonDiffService.findDiffs(first, second);
  expect(result).toMatchObject({
    diff: [
      { isAdd: true },
      { isAdd: true },
      { isAdd: true },
    ],
  });
});

// test("should calculate for tested objects fields", () => {
//   const first = {
//     father: {
//       name: "test",
//     },
//   };
//   const second = {
//     father: {
//       name: "test",
//       age: 25,
//     },
//   };

//   const result = jsonDiffService.findDiffs(first, second);
//   expect(result).toMatchObject({
//     key: "$",
//     children: [
//       {
//         isAdd: true,
//         dimension: {
//           startLineNumber: 4,
//           startColumn: 5,
//           endLineNumber: 4,
//           endColumn: 12,
//         },
//       },
//     ],
//   });
// });
