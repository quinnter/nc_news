const { selectEndPoints } = require("../models/apiModels")

exports.getEndPoints = (req, res, next) => {
    selectEndPoints(req.query)
    .then(endpoints => {
        res.status(200).send({ endpoints })
    })
    .catch(next)
}