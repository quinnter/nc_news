const  data  = require('../data/index');
const { createRef, createArticleUsername, createArticleTopic, formatDate } =require("../../utils/formatting-functions")

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
    .then(() => {
      const formattedComments = formatDate(data.commentsData)
      console.log(formattedComments)
      return knex
      .insert(formattedComments)
      .into('comments')
      .returning('*')
    })
};
