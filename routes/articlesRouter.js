const express = require("express");
const articlesRouter = express.Router()
const { 
    getArticles,
    postArticle, 
    getArticleById, 
    patchArticleById, 
    getArticleComments,
    postArticleComment,
    deleteArticleById
 } = require("../controllers/articlesController")
 const { methodNotAllowed } = require("../errors/index")

articlesRouter.route("/")
.get(getArticles)
.post(postArticle)
.all(methodNotAllowed)

articlesRouter.route("/:article_id")
.get(getArticleById)
.patch(patchArticleById)
.delete(deleteArticleById)
.all(methodNotAllowed)

articlesRouter.route("/:article_id/comments")
.get(getArticleComments)
.post(postArticleComment)

module.exports = articlesRouter