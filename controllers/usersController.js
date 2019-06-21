const { selectUsers, selectUser, insertUser } = require("../models/usersModels")

exports.getUsers = (req, res, next) => {
  selectUsers(req.query)
  .then(users => {
      res.status(200).send({ users })
  })
}

exports.getUser = (req, res, next) => {
  const { username } = req.params
  selectUser(username)
  .then(user => {
      res.status(200).send({ user })
  })
  .catch(next)
}

exports.postUser = (req, res, next) => {
  const { username, name } = req.body
  const newUserKeys = { username, name }
  insertUser(newUserKeys)
  .then(([user]) => {
    res.status(201).send( { user })
  })
  .catch(next)
}