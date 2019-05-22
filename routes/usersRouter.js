const express = require("express");
const usersRouter = express.Router()
const { getUsers, getUser } = require("../controllers/usersController")
const { methodNotAllowed } = require("../errors/index")

usersRouter.route("/").get(getUsers)
usersRouter.route("/:username").get(getUser).all(methodNotAllowed)

module.exports = usersRouter