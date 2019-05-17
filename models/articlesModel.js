const connection = require('../db/connection')

exports.selectArticles = ({
  sort_by,
  order,
  author,
  topic
}) => {
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
    if (order !== "asc" || order !== "desc") order = "desc"
  })
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .orderBy(sort_by || "created_at", order || "desc")
  .returning("*")
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
      if (!article) return Promise.reject({ code : 404 })
      return article
    })
}

exports.updateArticleVotes = (article_id, inc_votes) => {
  if(!inc_votes || typeof inc_votes !== 'number'){
    return Promise.reject({code : 400})
  }
  return connection
  .into("articles")
  .where("article_id", article_id)
  .increment({'votes': inc_votes})
  .returning('*')
  .then(article => {
    if (article.length === 0) return Promise.reject({ code: 404})
    return article
  })
}

exports.selectArticleComments = (article_id, sort_by, order) => {
  return connection
  .select(
    'comments.comment_id',
    'comments.votes',
    'comments.created_at',
    'comments.author',
    'comments.body'
  )
  .from("comments")
  .where({ article_id })
  .orderBy(sort_by || "created_at", order || "desc")
  .then(articleComments => {
    if (!articleComments.length) return Promise.reject({ code : 404 })
    return articleComments
  })
}

exports.insertArticleComment = ( newCommentKeys ) => {
  return connection
  .into("comments")
  .insert(newCommentKeys)
  .returning('*')
}