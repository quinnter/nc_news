const express = require("express");
const articlesRouter = express.Router()
const { getArticles } = require("../controllers/articlesController")

articlesRouter.route("/").get(getArticles)

module.exports = articlesRouter