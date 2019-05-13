
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', articlesTable => {
        console.log("I made an article table!")
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.string('body').notNullable();
        articlesTable.integer('votes').defaultTo(0);
        articlesTable.string('topic').references('topics.slug');
        articlesTable.string('author').references('users.username');
        articlesTable.string('created_at').defaultTo(new Date())
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles'); 
};
