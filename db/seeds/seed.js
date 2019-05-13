const  data  = require('../data/index');
const { createRef, createArticleUsername } =require("../../utils/formatting-functions")

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
    .then(insertedTopics => {
      const topicLookup = createRef(insertedTopics, "topic", "slug")
      return knex
      .insert(data.usersData)
      .into('users')
      .returning('*')
    })
    .then(insertedUsers => {
      const userLookup = createRef(userLookup, "username", "username")
      return knex 
      .insert(data.articlesData)
      .into('articles')
      .returning('*')
    })
};
