process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe.only('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    it("ANY /not_a_route - status:404 - responds with Route Not Found Error", () => {
      return request(app)
        .get('/api/not_a_route')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql("Route Not Found")
        })
    })
  });

  describe('/api/topics', () => {
    it('GET status: 200, and returns a table of topics', () => {
      return request(app)
       .get('/api/topics')
       .expect(200)
       .then(({ body }) => {
         expect(body).to.haveOwnProperty("topics")
       })
    })
  })

  describe('/api/articles', () => {
    it('GET status: 200, and returns a table of articles', () => {
      return request(app)
       .get('/api/articles')
       .expect(200)
       .then(({ body }) => {
         expect(body).to.haveOwnProperty("articles")
       })
    })
  })


  describe('/api/users', () => {
    it('GET status: 200, and returns a table of articles', () => {
      return request(app)
       .get('/api/users')
       .expect(200)
       .then(({ body }) => {
         expect(body).to.haveOwnProperty("users")
       })
    })
    it('GET status: 200, and returns a single user', () => {
      return request(app)
       .get('/api/users/butter_bridge')
       .expect(200)
       .then(({ body }) => {
         expect(body).to.haveOwnProperty("jonny")
       })
    })
  })

});
