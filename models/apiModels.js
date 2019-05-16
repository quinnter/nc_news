const connection = require('../db/connection')

exports.selectEndPoints = () => {
console.log("in the model")
    return connection
    .into('endpoints')
    .select('*')
    .returning('*')
}