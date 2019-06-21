const data = require('../data/index');
const { createRef, commentsWithArticleId, formatDate, renameKeys } = require("../../utils/formatting-functions")

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(data.topicsData)
        .into('topics')
        .returning('*')
    })
    .then(() => {
      return knex
        .insert(data.usersData)
        .into('users')
        .returning('*')
    })
    .then(() => {
      const formattedArticles = formatDate(data.articlesData)
      return knex
        .insert(formattedArticles)
        .into('articles')
        .returning('*')
    })
    .then((insertedArticles) => {
      const formattedComments = formatDate(data.commentsData)
      const commentsWithAuthorKey = renameKeys(formattedComments, "created_by", "author")
      const commentsWithArticle = renameKeys(commentsWithAuthorKey, "belongs_to", "article_id")
      const articleLookup = createRef(insertedArticles, "title", "article_id")
      const completedComments = commentsWithArticleId(commentsWithArticle, articleLookup)
      return knex
        .insert(completedComments)
        .into('comments')
        .returning('*')
    })
};
