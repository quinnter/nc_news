const { 
  selectArticles, 
  selectArticleById, 
  updateArticleVotes, 
  selectArticleComments, 
  insertArticleComment 
} = require("../models/articlesModel")

exports.getArticles = (req, res, next) => {
  selectArticles(req.query)
  .then(articles => {
      res.status(200).send({ articles })
  })
  .catch(next)
}

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params 
  selectArticleById(article_id)
  .then(article => {
    res.status(200).send({ article })
  })
  .catch(next)
}

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body
  updateArticleVotes(article_id, inc_votes)
  .then(article => {
    res.status(200).send({ article })
  })
  .catch(next)
}

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params
  const { sort_by, order } = req.query
  selectArticleComments(article_id, sort_by, order)
  .then(comments => {
    res.status(200).send({ comments })
  })
  .catch(next)
}

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params
  const { username, body } = req.body
  const newCommentKeys = { article_id, author: username, body }
  insertArticleComment(newCommentKeys)
  .then(([comment]) => {
    if (!comment) return Promise.reject({ code : '23503'})
     else res.status(201).send({ comment })
  })
  .catch(next)
}