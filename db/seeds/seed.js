const  data  = require('../data/index');

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
};
