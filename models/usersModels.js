const connection = require('../db/connection')

exports.selectUsers = () => {
console.log('in the users model')
return connection
  .select('*')
  .from('users')
  .then(users => {
      return users
  })
}

// exports.selectUser = () => {
// return connection
//   .select('')
// }