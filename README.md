# nc_news

This is my API for my NC News project that I completed at Northcoders during the backend block. This is a database that stores articles, topics, comments, and users. 

The project is hosted on Heroku and can be visited [here](https://lauraq-nc-news.herokuapp.com/api) where all the endpoints and example responses can be seen.

---

## Built With
[PSQL](https://www.postgresql.org/docs/9.2/app-psql.html)

[KnexJs](https://knexjs.org/)

[Express](https://expressjs.com/)

[Node](https://nodejs.org/en/)

[npm](https://www.npmjs.com/get-npm)

[Mocha](https://mochajs.org/)

[Chai](https://www.chaijs.com/)

---

## Getting Started

To get a copy of the project up and running on your machine to test, follow these instructions.

Make sure you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed on your machine, then clone this repository

```
git clone https://github.com/quinnter/nc_news.git
```

Navigate to the correct directory and install node dependencies

```bash
npm i

Run the "setup:dbs" script

```bash
npm run setup:dbs
```

Run the "seed:run" script

```bash
npm run seed:run
```

Run a local version

```
npm run start
```

Then use an API testing tool like [Insomnia](https://support.insomnia.rest/) to test the different API endpoints locally.

When you are done using the server use ctrl + c

To run test use the script

```
npm test
```

---

### Available Routes and Methods

```http
GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles


GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELTE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users
POST /api/users

GET /api/users/:username

```

---


