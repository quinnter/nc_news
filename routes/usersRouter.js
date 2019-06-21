const express = require("express");
const usersRouter = express.Router()
const { getUsers, getUser, postUser } = require("../controllers/usersController")
const { methodNotAllowed } = require("../errors/index")

usersRouter.route("/")
.get(getUsers)
.post(postUser)
.all(methodNotAllowed)

usersRouter.route("/:username")
.get(getUser)
.all(methodNotAllowed)

module.exports = usersRouter