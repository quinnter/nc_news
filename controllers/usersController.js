const { selectUsers, selectUser } = require("../models/usersModels")

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
  .catch(err => {
    console.log(err)
  })
}