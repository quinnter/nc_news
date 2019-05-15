const { selectUsers, selectUser } = require("../models/usersModels")

exports.getUsers = (req, res, next) => {
console.log("in the user controller")
  selectUsers(req.query)
  .then(users => {
      res.status(200).send({ users })
  })
}

// exports.getUser = (req, res, next) => {
//   console.log(req.params)
//     selectUser(req.query)
//   .then(user => {
//       res.status(200).send({ user })
//   })
// }