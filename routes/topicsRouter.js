const express = require("express");
const topicsRouter = express.Router()
const { getTopics, getTopicBySlug, postTopic } = require("../controllers/topicsController")
const { methodNotAllowed } = require("../errors/index")

topicsRouter.route("/")
.get(getTopics)
.post(postTopic)
.all(methodNotAllowed)

topicsRouter.route("/:slug")
.get(getTopicBySlug)
.all(methodNotAllowed)

module.exports = topicsRouter