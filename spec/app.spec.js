process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const chaiThings = require("chai-things");
chai.use(chaiSorted);
chai.should();
chai.use(chaiThings)

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
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
    it("GET status: 200, and returns an array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("topics");
        });
    });
    it('GET /:slug status: 200, returns a single topic ', () => {
      return request(app)
        .get("/api/topics/mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.topic.slug).to.eql("mitch")
        })
    });
    it('GET /:not_a_topic status: 404, returns a Not Found Error', () => {
      return request(app)
        .get("/api/topics/banana")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql('Route Not Found')
        })
    });
    it('POST status 201 - returns new topic', () => {
      return request(app)
        .post("/api/topics")
        .send({
          slug: "Testing",
          description: "Testing is a good way to make good code"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.topic).to.have.keys("slug", "description")
        })
    });
    it("PUT/DELETE status: 405 - responds with Method Not Allowed", () => {
      return request(app)
        .delete("/api/topics")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed");
        });
    });
  });

  describe("/api/articles", () => {
    it("GET status: 200, and returns an object with an array of articles with all keys and comment count, with a limit of ten articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty("articles");
          expect(body.articles).to.have.lengthOf(10);
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
          body.articles.should.have.all.property("author", "icellusedkars")
          expect(body.articles).to.have.lengthOf(6)
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
    it("GET /articles?order=asc: status: 200, order is ascending", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.ascendingBy("created_at")
        })
    });
    it("GET /articles?order=not_an_order: status: 200, defaults to desc", () => {
      return request(app)
        .get("/api/articles?order=not_an_order")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.descendingBy("created_at")
        })
    });
    it('POST/articles status 200 returns new article', () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "A very interesting Article",
          body: "This article is very interesting because I say it is!",
          topic: "mitch",
          username: "icellusedkars"
        })
        .then(({ body }) => {
          expect(body.article).to.have.keys(
            "author",
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "created_at"
          )
        })
    });
    it("PATCH /api/articles - status: 405 - responds with Method Not Allowed", () => {
      return request(app)
        .patch("/api/articles")
        .send({ not: "allowed" })
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed");
        });
    });
    it("GET /articles?author= status: 404, returns Route Not Found", () => {
      return request(app)
        .get("/api/articles?author=NOTANAUTHOR9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    });
    it("GET /articles?topic= status: 404, returns Route Not Found", () => {
      return request(app)
        .get("/api/articles?topic=NOTATOPIC9999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    });
  });

  describe("/api/articles/:article_id", () => {
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
    it("GET /articles/not_valid_id - status 404 - responds with Invalid ID", () => {
      return request(app)
        .get("/api/articles/99999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
    it("GET /articles/wrong_value_type - status 400 - responds with Invalid ID", () => {
      return request(app)
        .get("/api/articles/not_a_number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Invalid ID")
        })
    })
    it("PATCH /articles/:article_id - status 200 - responds with updated incremented vote", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.eql(110)
        })
    })
    it("PATCH /articles/:article_id - status 200 - responds with updated decremented vote", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.eql(90)
        })
    })
    it("PATCH /articles/:article_id - status 404 - responds with Route Not Found", () => {
      return request(app)
        .patch("/api/articles/999999")
        .send({ inc_votes: -2 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
    it("PATCH /articles/:article_id - status 200 - incomplete request returns unchanged article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "valid" })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          )
        })
    })
    it('DELETE /articles/:article_id - status 204 - deletes article by id', () => {
      return request(app)
        .delete("/api/articles/2")
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({})
        })
    });
  })

  describe("/api/articles/:article_id/comments", () => {
    it("GET /:article_id/comments - status 200 - returns a list of comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.lengthOf(10)
          expect(body.comments).to.be.descendingBy("created_at")
        })
    })
    it("GET /:article_id/comments - status 200 - returns a list of comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.lengthOf(0)
        })
    })
    it("GET /invalid_article/comments - status 404 - returns with Route Not Found", () => {
      return request(app)
        .get("/api/articles/999999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
    it("GET /:article_id/comments?sort_by=votes - status 200 - returns comments sorted by votes ", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("votes")
        })
    })
    it("GET /:article_id/comments?order=asc - status 200 - returns comments sorted ascendingly ", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.ascendingBy("created_at")
        })
    })
    it("POST /:article_id/comments - status 201 - returns new comment with all keys ", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "icellusedkars",
          body: "I enjoyed this content very much"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).to.have.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "article_id",
            "body"
          )
        })
    })
    it("POST /not_an_id/comments - status 400 - responds with Key Violation", () => {
      return request(app)
        .post("/api/articles/999999/comments")
        .send({
          username: "icellusedkars",
          body: "I enjoyed this content very much"
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Key Violation")
        })
    })
    it("POST /:article_id/comments - status 400 - responds with Cannot Be Null", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ wrong: "input" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql("Cannot Be Null")
        })
    })
  })

  describe("/api/comments/:comment_id", () => {
    it("PATCH /comments/:comment_id - status 200 - returns comments with updated votes", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.eql(26)
        })
    })
    it("PATCH /comments/:comment_id - status 404 - responds with Route Not Found", () => {
      return request(app)
        .patch("/api/comments/999999")
        .send({ inc_votes: -2 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
    it("PATCH /comments/:comment_id - status 200 - when patch send is invalid returns unchanged comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ not: "allowed" })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.have.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "article_id",
            "body")
        })
    })
    it("DELETE /comments/:comment_id - status 204 - deletes specified comment", () => {
      return request(app)
        .delete("/api/comments/2")
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({})
        })
    })
    it("DELETE /comments/:not_valid_id - status 404 - when comment ID doesnt exist", () => {
      return request(app)
        .delete("/api/comments/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
  })

  describe("/api/users", () => {
    it('GET status 200 - returns a list of users', () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).to.have.lengthOf(4)
        })
    });
    it("GET /:username - status 200 - returns the specific user object that matches username", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.user.username).to.eql("icellusedkars")
        })
    })
    it("GET /:username - status 404 - when user does not exist responds with 404", () => {
      return request(app)
        .get("/api/users/NOTAUSER999999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
    it('POST / status 201 - returns new user', () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "TheTester",
          name: "Tim"
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user).to.have.keys("username", "name", "avatar_url")
        })
    });
    it('PUT/DELETE - status 405 - methods not allowed return with 405', () => {
      return request(app)
        .put("/api/users")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.eql("Method Not Allowed")
        })
    });
  })

});
