
exports.up = function(knex, Promise) {
    return knex.schema.createTable('topics', topicsTable => {
        console.log("I made a topics table!")
        topicsTable.string('slug').unique().primary();
        topicsTable.string('description').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('topics');
};
