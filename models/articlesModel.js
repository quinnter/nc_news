const connection = require('../db/connection')

exports.selectArticles = () => {
console.log('in the article model')
return connection
  .select('*')
  .from('articles')
  .then(articles => {
      return articles
  })
}