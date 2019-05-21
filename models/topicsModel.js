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
  // console.log(topics, "<----- og topic")
  const myQuery = connection
  .select(
    "topics.slug",
    "topics.description"
  )
  .from("topics")
  .where("slug", topics);

return myQuery
  .then(topic => {
    // console.log(topic, "<--- end of select topic")
    return topic
  })
}