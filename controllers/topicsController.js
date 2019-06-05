const { selectTopics, selectOneTopic } = require("../models/topicsModel")

exports.getTopics = (req, res, next) => {
  selectTopics(req.query)
  .then(topics => {
      res.status(200).send({ topics })
  })
}

exports.getTopicBySlug = (req, res, next) => {
  console.log(req.params)
  selectOneTopic(req.params)
  .then(topic => {
    console.log(topic)
    res.status(200).send({ topic })
  })
}
