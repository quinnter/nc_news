const { selectEndPoints } = require("../models/apiModels")

exports.getEndPoints = (req, res, next) => {
console.log("in the controller")  
  selectEndPoints(req.query)
    .then(endpoints => {
      res.status(200).send({ endpoints })
    })
    .catch(next)
}
