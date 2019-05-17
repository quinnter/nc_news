const express = require("express");
const articlesRouter = express.Router()
const { 
    getArticles, 
    getArticleById, 
    patchArticleById, 
    getArticleComments,
    postArticleComment
 } = require("../controllers/articlesController")
 const { methodNotAllowed } = require("../errors/index")

articlesRouter.route("/").get(getArticles).all(methodNotAllowed)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById)
.all(methodNotAllowed)

articlesRouter.route("/:article_id/comments")
.get(getArticleComments)
.post(postArticleComment)

module.exports = articlesRouter