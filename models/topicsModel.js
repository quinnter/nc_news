const connection = require('../db/connection')

exports.selectTopics = () => {
console.log('in the topic model')
return connection
  .select('*')
  .from('topics')
  .then(topics => {
      return topics
  })

}