const connection = require('../db/connection')

exports.selectArticles = () => {
console.log('in the article model')
return connection
  .select(
  'articles.article_id',
  'articles.title',
  'articles.topic',
  'articles.author',
  'articles.created_at',
  'articles.votes',
  'articles.body'
  )
  .count('comments.article_id as comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .then(articles => {
      return articles
  })
}