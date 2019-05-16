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
  .then(updatedVotes => {
    res.status(200).send({ updatedVotes })
  })
  .catch(next)
}

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params
  const { sort_by, order } = req.query
  selectArticleComments(article_id, sort_by, order)
  .then(articleComments => {
    res.status(200).send({ articleComments })
  })
  .catch(next)
}

exports.postArticleComment = (req, res, next) => {
  insertArticleComment()
}