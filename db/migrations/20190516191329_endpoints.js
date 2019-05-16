exports.up = function(knex, Promise) {
    return knex.schema.createTable('endpoints', endpointsTable => {
        endpointsTable.string('topics').primary();
        endpointsTable.string('articles');
        endpointsTable.string('comments');
        endpointsTable.string('users');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('endpoints');
  };
  