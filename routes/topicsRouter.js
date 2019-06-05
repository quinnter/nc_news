const express = require("express");
const topicsRouter = express.Router()
const { getTopics, getTopicBySlug } = require("../controllers/topicsController")
const { methodNotAllowed } = require("../errors/index")

topicsRouter.route("/").get(getTopics).all(methodNotAllowed)

topicsRouter.route("/:slug").get(getTopicBySlug).all(methodNotAllowed)

module.exports = topicsRouter