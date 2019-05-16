const connection = require('../db/connection')

exports.selectEndPoints = () => {
    return connection
    .into('endpoints')
    .select('*')
    .returning('*')
}