const connection = require('../db/connection')

exports.selectTopics = () => {
return connection
  .select('*')
  .from('topics')
  .then(topics => {
    if (!topics) return Promise.reject({ code: 404 })
      return topics
  })
}

exports.selectTopic = (topics) => {
  return connection
  .select(
    "topics.slug",
    "topics.description"
    )
    .from("topics")
    .where("topics.slug", topics)
    .first()
    .then(topic => {
    return topic
  })
}