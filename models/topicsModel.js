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

exports.selectTopic = (topic) => {
return connection
  .select(
    "topics.slug",
    "topics.description"
  )
  .from("topics")
  .where("slug", topic)
  .then(topic => {
    return topic
  })
}