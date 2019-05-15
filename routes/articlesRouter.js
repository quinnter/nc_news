const express = require("express");
const articlesRouter = express.Router()
const { getArticles, getArticleById, patchArticleById } = require("../controllers/articlesController")

articlesRouter.route("/").get(getArticles)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById)

module.exports = articlesRouter