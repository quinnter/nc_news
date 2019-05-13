
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', commentsTable => {
        console.log("I made an article table!")
        commentsTable.increments('comment_id').primary();
        commentsTable.string('author').references('users.username');
        commentsTable.integer('article_id').references('articles.article_id');
        commentsTable.integer('votes').defaultTo(0);
        commentsTable.string('created_at').defaultTo(new Date())
        commentsTable.string('body');
      });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comments'); 
};
