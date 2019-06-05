const { selectTopics, selectTopic } = require("../models/topicsModel")

exports.getTopics = (req, res, next) => {
  selectTopics(req.query)
  .then(topics => {
      res.status(200).send({ topics })
  })
}

exports.getTopicBySlug = (req, res, next) => {
  selectTopic(req.query)
  .then(topic => {
    res.status(200).send({ topic })
  })
}
