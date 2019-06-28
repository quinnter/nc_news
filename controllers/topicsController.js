const { selectTopics, selectOneTopic, insertTopic } = require("../models/topicsModel")

exports.getTopics = (req, res, next) => {
  selectTopics(req.query)
    .then(topics => {
      res.status(200).send({ topics })
    })
    .catch(next)
}

exports.getTopicBySlug = (req, res, next) => {
  selectOneTopic(req.params)
    .then(topic => {
      res.status(200).send({ topic })
    })
    .catch(next)
}

exports.postTopic = (req, res, next) => {
  const { slug, description } = req.body
  const newTopicKeys = { slug, description }
  insertTopic(newTopicKeys)
    .then(([topic]) => {
      res.status(201).send({ topic })
    })
    .catch(next)
}
