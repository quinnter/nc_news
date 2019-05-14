const { expect } = require("chai");
const {
  createRef,
  createArticleUsername,
  createArticleTopic,
  formatDate
} = require("../utils/formatting-functions");

describe.only("createRef", () => {
    it("returns empty object when empty array is passed", () => {
        const input = [];
        const key = "";
        const value = "";
        const actual = createRef(input, key, value);
        const expected = {};
        expect(actual).to.eql(expected);
    })
    it("returns an object with key value pairs that match the arguments", () => {
        const input = [
        { forename: "firstname-b", surname: "lastname-b", age: 30, owner_id: 1 },
        { forename: "firstname-c", surname: "lastname-c", age: 21, owner_id: 2 }];
        const key = "forename";
        const value = "owner_id";
        const actual = createRef(input, key, value);
        const expected = { "firstname-b": 1, "firstname-c": 2 };
        expect(actual).to.eql(expected);
    })
})

describe(" ", () => {
    it(" ", () => {

    })
})