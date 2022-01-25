

import { state, viewModel } from '../../src/components/editor-service-viewmodel'

test("first test", () => {
    console.log("OK");
});


test("should create reduced json when diff is removal", () => {
    const first = {
        name: "test",
        age: 14
    };
    const second = {
        age: 14
    };
    viewModel.compare(first, second);
    viewModel.calculateReducedJson();
    expect(state.reducedLeft).toMatchObject({
        name: "test"
    });
    expect(state.reducedRight).toMatchObject({});
});


test("should calculate reduced when changed object is nested", () => {
    const first = {
        id: "test",
        owner: {
            name: "davut",
            age: 34,
            job: "dev"
        }
    };
    const second = {
        id: "test",
        owner: {
            age: 35,
            surname: "ozcan",
            job: "dev"
        }
    };
    viewModel.compare(first, second);
    viewModel.calculateReducedJson();
    expect(state.reducedLeft).toMatchObject(
        {
            owner: {
                name: "davut",
                age: 34
            }
        }
    );
    expect(state.reducedRight).toMatchObject(
        {
            owner: {
                age: 35,
                surname: "ozcan"
            }
        }
    );
});