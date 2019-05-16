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

  describe.only("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints[0]).to.eql({
            'topics': 'these are topics',
            'articles': 'these are articles',
            'comments': 'these are comments',
            'users': 'these are users'
          });
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
    it("PATCH /articles/:article_id - status 200 - responds with updated incremented vote", () => {
      return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedVotes[0].votes).to.eql(110)
      })
    })
    it("PATCH /articles/:article_id - status 200 - responds with updated decremented vote", () => {
      return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedVotes[0].votes).to.eql(90)
      })
    })
    it("PATCH /articles/:article_id - status 404 - responds with Route Not Found", () => {
      return request(app)
      .patch("/api/articles/999999")
      .send({ inc_votes: -2})
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found")
      })
    })
    it("PATCH /articles/:article_id - status 400 - responds with Invalid ID", () => {
      return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Invalid ID")
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
  })

  describe("/api/articles/:article_id/comments", () => {
    it("GET /:article_id/comments - status 200 - returns", () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.articleComments[0]).to.have.keys(
          "comment_id",
          "votes",
          "created_at",
          "author",
          "body"
        )
      })
    })
    it("GET /invalid_article/comments - status 404 - returns with Route Not Found", () => {
      return request(app)
      .get("/api/articles/99999999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found")
      })
    })
    it("GET /:article_id/comments - status 200 - default returns comments sorted by date ", () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.articleComments).to.be.descendingBy("created_at")
      })
    })
    it("GET /:article_id/comments?sort_by=votes - status 200 - returns comments sorted by votes ", () => {
      return request(app)
      .get("/api/articles/1/comments?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.articleComments).to.be.descendingBy("votes")
      })
    })
    it("GET /:article_id/comments?order=asc - status 200 - returns comments sorted ascendingly ", () => {
      return request(app)
      .get("/api/articles/1/comments?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articleComments).to.be.ascendingBy("created_at")
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
        expect(body.newComment[0]).to.have.keys(
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
    it("PATCH /comments/:comment_id - status 201 - returns comments with updated votes", () => {
      return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 10 })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment[0].votes).to.eql(26)
      })
    })
    it("PATCH /comments/:comment_id - status 404 - responds with Route Not Found", () => {
      return request(app)
      .patch("/api/comments/999999")
      .send({ inc_votes: -2})
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found")
      })
    })
    it("PATCH /comments/:comment_id - status 400 - when patch send is invalid responds with Invalid ID", () => {
      return request(app)
      .patch("/api/comments/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.eql("Invalid ID")
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
      .delete("/api/comments/999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found")
      })
    })
  })

  describe("/api/users", () => {
    it("GET /:username - status 200 - returns the specific user object that matches username", () => {
      return request(app)
      .get("/api/users/icellusedkars")
      .expect(200)
      .then(({ body }) => {
        expect(body.user.username).to.eql("icellusedkars")
      })
    })
    it("GET /:username - status 404 - when user does not exist responds with ", () => {
      return request(app)
      .get("/api/users/icellusedkarsss")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.eql("Route Not Found")
      })
    })
  })

});
