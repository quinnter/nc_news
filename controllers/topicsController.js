const { selectTopics } = require("../models/topicsModel")

exports.getTopics = (req, res, next) => {
console.log("in the topic controller")
  selectTopics(req.query)
  .then(topics => {
      res.status(200).send({ topics })
  })
}
