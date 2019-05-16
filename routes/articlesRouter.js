const express = require("express");
const articlesRouter = express.Router()
const { 
    getArticles, 
    getArticleById, 
    patchArticleById, 
    getArticleComments
 } = require("../controllers/articlesController")

articlesRouter.route("/").get(getArticles)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById)

articlesRouter.route("/:article_id/comments")
.get(getArticleComments)
.post(postArticleComment)

module.exports = articlesRouter