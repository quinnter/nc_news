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
  return connection
  .select('*')
  .from("users")
  .where({ username })
  .first()
  .then(user => {
    if (user === undefined) return Promise.reject({code: 404})
    return user
  })
}

exports.insertUser =  newUserKeys => {
  return connection
  .into("users")
  .insert(newUserKeys)
  .returning("*")
}