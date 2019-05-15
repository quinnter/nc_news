const connection = require('../db/connection')

exports.selectArticles = ({
  sort_by,
  order,
  author,
  topic
}) => {
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
  .modify(query => {
    if (author) query.where("articles.author", author)
    if (topic) query.where("articles.topic", topic)
  })
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .orderBy(sort_by || "created_at", order || "desc")
  .then(articles => {
      return articles
  })
}

exports.selectArticleById = (article_id) => {
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
    .from("articles")
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .where("articles.article_id", article_id)
    .first()
    .then(article => {
      if (!article) return Promise.reject({ code: 400 })
      return article
    })
}

exports.updateArticleVotes = (article_id, inc_votes) => {
  return connection
  .into("articles")
  .where("article_id", article_id)
  .update({'votes': inc_votes})
  .returning('*')
  .then(article => {
    return article
  })
}