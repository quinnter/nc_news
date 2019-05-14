const { expect } = require("chai");
const {
  createRef,
  commentsWithArticleId,
  formatDate,
  renameKeys
} = require("../utils/formatting-functions");

describe("createRef", () => {
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

describe("formatDate", () => {
    it("returns an empty array when an empty array is passed", () => {
        const input = [];
        const actual = formatDate(input);
        const expected = [];
        expect(actual).to.eql(expected);
    })
    it("returns an array of objects where the created_at key value is parsed", () => {
        const input = [{
            title: 'Moustache',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'Have you seen the size of that thing?',
            created_at: 154700514171,
          }];
        const actual = formatDate(input);
        const expected = [{
            title: 'Moustache',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'Have you seen the size of that thing?',
            created_at: 'Tue, 26 Nov 1974 12:21:54 GMT',
          }];
        expect(actual).to.eql(expected);
    })

describe("renameKeys", () => {
    it("returns new empty array when input is an empty array", () => {
        const input = [];
        const keyToChange = "";
        const newKey = "";
        const actual = renameKeys(input, keyToChange, newKey );
        const expected = [];
        expect(actual).to.eql(expected);
    })
    it("returns an object with the keys changed", () => {
        const input = [{
            body: 'git push origin master',
            belongs_to: 'Living in the shadow of a great man',
            created_by: 'icellusedkars',
            votes: 0,
            created_at: 1227530163389,
          }, 
          {
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
          }];
        const keyToChange = "belongs_to";
        const newKey = "article_id";
        const actual = renameKeys(input, keyToChange, newKey );
        const expected = [{
            body: 'git push origin master',
            article_id: 'Living in the shadow of a great man',
            created_by: 'icellusedkars',
            votes: 0,
            created_at: 1227530163389,
          },
          {
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            article_id: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
          }];
        expect(actual).to.eql(expected);
    })
  })
})

describe.only("commentsWithArticleId", () => {
    it("returns new empty array when passed an empty array ", () => {
        const comments = [];
        const articleLookup = {};
        const actual = commentsWithArticleId(comments, articleLookup);
        const expected = [];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(comments);
    })
    it("returns new array when passed an array of objects and a lookup object ", () => {
        const comments = [ { article_id: 'Living in the shadow of a great man',
            author: 'butter_bridge',
            body: 'This morning, I showered for nine minutes.',
            votes: 16,
            created_at: 'Sun, 26 Nov 2000 12:36:03 GMT' } ];
        const articleLookup = {'Living in the shadow of a great man': 1};
        const actual = commentsWithArticleId(comments, articleLookup);
        const expected = [ { article_id: 1,
            author: 'butter_bridge',
            body: 'This morning, I showered for nine minutes.',
            votes: 16,
            created_at: 'Sun, 26 Nov 2000 12:36:03 GMT' } ];
        expect(actual).to.eql(expected);
        expect(actual).to.not.equal(comments);
    })
})