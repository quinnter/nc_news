const connection = require('../db/connection')

exports.selectUsers = () => {
return connection
  .select('*')
  .from('users')
  .then(users => {
      return users
  })
}

exports.selectUser = (username) => {
console.log(username)
  return connection
  .select('*')
  .from("users")
  .where({ username })
  .first()
  .then(user => {
    console.log(user)
    return user
  })
}