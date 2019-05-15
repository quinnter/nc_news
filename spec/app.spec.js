process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    it("ANY /not_a_route - status:404 - responds with Route Not Found Error", () => {
      return request(app)
        .get("/api/not_a_route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found");
        });
    });
    it("ANY /api - status:405 - responds with Method Not Allowed", () => {
      return request(app)
        .post("/api")
        .send({ not: "allowed" })
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed");
        });
    });
  });

  describe("/api/topics", () => {
    it("GET status: 200, and returns a table of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("topics");
        });
    });
    it("POST/PUT/DELETE status: 405 - responds with Method Not Allowed", () => {
      return request(app)
        .post("/api/topics")
        .send({ not: "allowed!!!" })
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed");
        });
    });
  });

  describe.only("/api/articles", () => {
    it("GET status: 200, and returns a table of articles with all keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          console.log(body.articles[0]);
          expect(body).to.haveOwnProperty("articles");
          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });
  });

  describe("/api/users", () => {
    it("GET status: 200, and returns a table of articles", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("users");
        });
    });
    it("GET status: 200, and returns a single user", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("jonny");
        });
    });
  });
});
