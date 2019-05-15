const express = require("express");
const topicsRouter = express.Router()
const { getTopics } = require("../controllers/topicsController")
const { methodNotAllowed } = require("../errors/index")

topicsRouter.route("/").get(getTopics).all(methodNotAllowed)

module.exports = topicsRouter