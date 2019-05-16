const connection = require('../db/connection')

exports.selectEndPoints = () => {
    return connection
    .then(json => {
        return json
    })
}