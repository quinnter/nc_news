const express = require("express");
const usersRouter = express.Router()
const { getUsers, getUser } = require("../controllers/usersController")

usersRouter.route("/").get(getUsers)
usersRouter.route("/:username").get(getUser)

module.exports = usersRouter