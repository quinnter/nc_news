const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const topicsRouter = require("./topicsRouter")
const articlesRouter = require("./articlesRouter")
const usersRouter = require("./usersRouter")
const commentsRouter = require("./commentsRouter")

apiRouter
  .route('/')
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter)
apiRouter.use("/articles", articlesRouter)
apiRouter.use("/comments", commentsRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;
