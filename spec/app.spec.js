process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

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

  describe("/api/articles", () => {
    it("GET status: 200, and returns a table of articles with all keys and comment count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("articles");
          expect(body.articles[0]).to.contain.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
        });
    });
    it("GET /articles?author= status: 200, returns articles by the author param", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.eql("icellusedkars")
        })
   });
   it("GET /articles?topic= status: 200, returns articles by the topic param", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.eql("mitch")
      })
    });
  it("GET /articles status: 200, default returns articles sorted by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.descendingBy("created_at")
      })
    });
  it("GET /articles?sort_by=not_a_column status: 400, returns Undefined Column", () => {
    return request(app)
      .get("/api/articles?sort_by=not_a_column")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Undefined Column")
      })
    });  
  });

  describe("/api/articles/:article_id ", () => {
    it("GET /articles/:article_id - status 200 - returns one article with matching ID ", () => {
      return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).to.have.keys(
          "article_id",
          "title",
          "body",
          "votes",
          "topic",
          "author",
          "created_at",
          "comment_count"
        )
      }) 
    })
    it("GET /articles/not_valid_id - status 400 - responds with Invalid ID", () => {
      return request(app)
      .get("/api/articles/99999999")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Invalid ID")
      })
    })
    it.only("PATCH /articles/:article_id - status 200 - responds with updated incremented object", () => {
      return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        console.log(body)
        expect(body.updatedVotes[0].votes).to.eql(110)
      })
    })
    
  })

});
